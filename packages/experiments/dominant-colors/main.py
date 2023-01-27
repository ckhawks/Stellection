import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt
import PIL
import os

# https://towardsdatascience.com/finding-most-common-colors-in-python-47ea0767a06a
# source https://github.com/mrakelinggar/data-stuffs/blob/master/frequent_color/common%20colors.ipynb

def show_img_compar(img_1, img_2):
    f, ax = plt.subplots(1, 2, figsize=(10,10))
    ax[0].imshow(img_1)
    ax[1].imshow(img_2)
    ax[0].axis('off')
    ax[1].axis('off')
    f.tight_layout()
    plt.show()

img = cv.imread("img/img1.jpg")
img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
img_2 = cv.imread("img/img2.jpg")
img_2 = cv.cvtColor(img_2, cv.COLOR_BGR2RGB)

dim = (500, 300)
# resize image
img = cv.resize(img, dim, interpolation = cv.INTER_AREA)
img_2 = cv.resize(img_2, dim, interpolation = cv.INTER_AREA)

# show_img_compar(img, img_2)

"""
# method 1 - average 
img_temp = img.copy()
img_temp[:,:,0], img_temp[:,:,1], img_temp[:,:,2] = np.average(img, axis=(0,1))

img_temp_2 = img_2.copy()
img_temp_2[:,:,0], img_temp_2[:,:,1], img_temp_2[:,:,2] = np.average(img_2, axis=(0,1))

show_img_compar(img, img_temp)
show_img_compar(img_2, img_temp_2)
"""

# method 2 - most common combination


"""img_temp = img.copy()
unique, counts = np.unique(img_temp.reshape(-1, 3), axis=0, return_counts=True)
img_temp[:,:,0], img_temp[:,:,1], img_temp[:,:,2] = unique[np.argmax(counts)]

img_temp_2 = img_2.copy()
unique, counts = np.unique(img_temp_2.reshape(-1, 3), axis=0, return_counts=True)
img_temp_2[:,:,0], img_temp_2[:,:,1], img_temp_2[:,:,2] = unique[np.argmax(counts)]

show_img_compar(img, img_temp)
show_img_compar(img_2, img_temp_2)"""

""" pieces
print(img.reshape(-1, 3).shape)
img.reshape(-1, 3)

print(img.shape)
img

unique, counts = np.unique(img.reshape(-1, 3), axis=0, return_counts=True)
print(unique)
print(counts)

np.argmax(counts), np.max(counts), np.sum(counts)

unique[np.argmax(counts)]"""

# method 3 - n most common color


"""
from sklearn.cluster import KMeans

clt = KMeans(n_clusters=5)
clt.fit(img.reshape(-1, 3))

def palette(clusters):
    width=300
    palette = np.zeros((50, width, 3), np.uint8)
    steps = width/clusters.cluster_centers_.shape[0]
    for idx, centers in enumerate(clusters.cluster_centers_): 
        palette[:, int(idx*steps):(int((idx+1)*steps)), :] = centers
    return palette

clt_1 = clt.fit(img.reshape(-1, 3))
show_img_compar(img, palette(clt_1))

clt_2 = clt.fit(img_2.reshape(-1, 3))
show_img_compar(img_2, palette(clt_2))"""

# method 3.1 - n most common color + %

from sklearn.cluster import KMeans
from collections import Counter

clt = KMeans(n_clusters=5)
clt.fit(img.reshape(-1, 3))

def palette_perc(k_cluster):
    width = 300
    palette = np.zeros((50, width, 3), np.uint8)
    
    n_pixels = len(k_cluster.labels_)
    counter = Counter(k_cluster.labels_) # count how many pixels per cluster
    perc = {}
    for i in counter:
        perc[i] = np.round(counter[i]/n_pixels, 2)
    perc = dict(sorted(perc.items()))
    
    #for logging purposes
    # print(perc)
    # print(k_cluster.cluster_centers_)

    
    step = 0
    
    for idx, centers in enumerate(k_cluster.cluster_centers_): 
        palette[:, step:int(step + perc[idx]*width+1), :] = centers
        step += int(perc[idx]*width+1)
        
    return palette


"""clt_1 = clt.fit(img.reshape(-1, 3))
show_img_compar(img, palette_perc(clt_1))

clt_2 = clt.fit(img_2.reshape(-1, 3))
show_img_compar(img_2, palette_perc(clt_2))
"""


def get_dominant_colors_from_img(img):
    k_cluster = clt.fit(img.reshape(-1, 3))

    n_pixels = len(k_cluster.labels_)
    counter = Counter(k_cluster.labels_) # count how many pixels per cluster
    perc = {}
    for i in counter:
        perc[i] = np.round(counter[i]/n_pixels, 2)
    perc = dict(sorted(perc.items()))
    
    #for logging purposes
    # print(perc)
    # print(k_cluster.cluster_centers_)

    # transform data into goal
    """ reference
    goal = [{"percent": 0.42, "rgb": [254, 254, 254]}, {"percent": 0.2, "rgb": [24.5, 25.1, 17.3]}]

    {0: 0.42, 1: 0.2, 2: 0.11, 3: 0.12, 4: 0.15}
    [[254.27255985 254.32610851 254.29865735]
    [ 24.50849408  25.09292724  17.29221658]
    [ 96.83398635  79.61672144  53.08398635]
    [186.90309765 140.11590702  82.2248886 ]
    [191.47885882 203.78823215 210.20304433]]
    {0: 0.54, 1: 0.08, 2: 0.1, 3: 0.1, 4: 0.18}
    [[ 14.89511455  14.26225716  18.91716624]
    [149.29598255 146.16413654 137.69932064]
    [207.97525075 207.61873128 205.54519995]
    [ 99.02152518  98.06730586  91.94234555]
    [ 34.61798133  33.97075869  39.33328316]]
    """

    output = list()

    # for each value in perc
    for i, (k, v) in enumerate(perc.items()):
        cluster = dict()
        # print(f"{i}: '{k}': {v}")
        cluster["percent"] = v
        cluster["rgb"] = k_cluster.cluster_centers_[k]
        output.append(cluster)

    # sort by highest percent
    output = sorted(output, key= lambda y: -y["percent"])

    return output

# print(get_dominant_colors_from_img(img))
# print(get_dominant_colors_from_img(img_2))



# prioritize higher percentages
# python sort takes a lambda for what to sort by so you can tell it to sort by the percent key

"""
rgb1 = sRGBColor(0.1, 0.2, 0.3)
rgb2 = sRGBColor(1, 0.4, 0.2)
lab1 = convert_color(rgb1, LabColor, through_rgb_type=sRGBColor)
lab2 = convert_color(rgb2, LabColor, through_rgb_type=sRGBColor)
# If you are going to convert back to XYZ, make sure you use the same
# RGB color space on the way back.
# xyz2 = convert_color(hsl, XYZColor)

delta_e = delta_e_cie1976(lab1, lab2)
print(delta_e)


# Reference color.
color1 = LabColor(lab_l=0.9, lab_a=16.3, lab_b=-2.22)
# Color to be compared to the reference.
color2 = LabColor(lab_l=0.7, lab_a=14.2, lab_b=-1.80)
# This is your delta E value as a float.
delta_e = delta_e_cie1976(color1, color2)

print(delta_e)
"""

from colormath.color_objects import XYZColor, sRGBColor, LabColor, HSLColor, AdobeRGBColor
from colormath.color_conversions import convert_color
from colormath.color_diff import delta_e_cie1976

# returns delta_e value representing the difference between the two colors
# rgb tuples should be unnormalized (r[0-255], g[0-255], b[0-255])
def compareTwoRGB(rgb1, rgb2):

    # print(rgb1)
    # print(rgb2)

    # normalize RGB
    n_rgb1 = list(map(lambda i: float(i)/255, rgb1))
    n_rgb2 = list(map(lambda i: float(i)/255, rgb2))

    """
    n_rgb1 = list()
    n_rgb2 = list()

    for i in range(len(rgb1)):
        n_rgb1.append(float(rgb1[i])/255)
    for i in range(len(rgb2)):
        n_rgb2.append(float(rgb2[i])/255)
    """
    
    # print(n_rgb1)
    # print(n_rgb2)

    # source https://python-colormath.readthedocs.io/en/latest/conversions.html

    # convert RGB to LabColor
    n_srgb1 = sRGBColor(n_rgb1[0], n_rgb1[1], n_rgb1[2])
    n_srgb2 = sRGBColor(n_rgb2[0], n_rgb2[1], n_rgb2[2])

    # print(n_srgb1)
    # print(n_srgb2)

    lab1 = convert_color(n_srgb1, LabColor, through_rgb_type=sRGBColor)
    lab2 = convert_color(n_srgb2, LabColor, through_rgb_type=sRGBColor)

    delta_e = delta_e_cie1976(lab1, lab2)

    return delta_e

# print(compareTwoRGB([255, 67, 88], [144, 55, 66]))

def get_colors_from_dir(image_dir):
    imgs_color_data = dict()

    images_in_folder = os.listdir(image_dir)
    print(f"Getting color data from {len(images_in_folder)} images in {image_dir}")

    for image_path in images_in_folder:
        imgs_color_data[image_path] = get_dominant_colors_from_img(cv.imread(image_dir + image_path))
        
    return imgs_color_data

def convert_hex_to_rgb(hex):
    hex.lstrip("#")
    return(tuple(int(hex[i:i+2], 16) for i in (0, 2, 4)))

image_dir = "/Users/stellaric/Downloads/testing/"
color_data = get_colors_from_dir(image_dir)

target_color_hex = "ABC123"
target_color_rgb = convert_hex_to_rgb(target_color_hex)
print(f"Searching for HEX {target_color_hex} / {target_color_rgb}")

# for each image we have data for
#   for each color cluster it has
#       compare target color to color cluster
#       add image to output list if match