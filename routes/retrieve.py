

import string
from . import routes

from flask import Flask, jsonify, request, abort

import util.cfg as cfg
from db.database import database


import requests
from bs4 import BeautifulSoup
import re

"""
{
    "retrieve": [
        {
            "url": "https://archillect.com/318534"
        },
        {
            "url": "https://archillect.com/255736"
        }
    ]
}
"""

# TODO add list of clusters in json payload (i.e. I want to retrieve these links -> stars and add to these clusters)
@routes.route('/retrieve', methods=["POST"])
async def retrieve():
    body = request.get_json()
    print(body)
    
    if not body:
        abort(400, 'No JSON payload supplied. Refer to documentation for request format.')

    if not body["retrieve"]:
        abort(400, 'Incorrect JSON payload format. Refer to documentation for request format.')

    if len(body["retrieve"]) == 0:
        abort(400, 'Incorrect JSON payload format. No destination URLs provided. Refer to documentation for request format.')

    output_stars = []
    for destination in body["retrieve"]:
        print("Starting retrieve: " + destination["url"])

        stars = await urlDisambiguation(destination=destination)
        output_stars.append(stars)
    
    output = {"destination_stars": output_stars}

    return jsonify(output), 200

# TODO maybe this retrieve endpoint starts jobs and returns job ids that you can query with to get status
async def urlDisambiguation(destination: object):

    # https://archillect.com/123456 
    if(re.search("^https?:\/\/archillect\.com\/\d*$", destination["url"])):
        # print("archillect!")

        return await retrieve_archillect(destination)

    elif(re.search("twitter", destination["url"])):
        print("twitter! :D")

    else:
        print("no match")

async def retrieve_archillect(destination):
    page = requests.get(destination["url"])

    # print(page.text)

    soup = BeautifulSoup(page.content, "html.parser")

    image_elements = soup.find_all(id="ii")

    output_stars = {destination['url']: []}
    for image_element in image_elements:
        # there pretty much should just be one image_element in image_elements
        image_url = image_element["src"]

        filename = await download_file(image_url)

        # get source url for the image source
        source_urls = []

        source_parent = soup.find(id="sources")
        for source in source_parent.findChildren("a"):
            print(source)
            source_urls.append(source['href'])
        print(source_urls)

        star, _ = await database.createStar(star_properties=[filename, filename, None, source_urls[0], destination['url']], clusters=[])
        print(star)
        output_stars[destination['url']].append(star)
    return output_stars


async def download_file(url):

    local_filename = url.split('/')[-1]

    # NOTE the stream=True parameter below
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(cfg.FILE_PATH + local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192): 
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk: 
                f.write(chunk)
    return local_filename

    

