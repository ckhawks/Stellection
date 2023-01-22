
import json
from flask import render_template, abort, jsonify
from werkzeug.exceptions import HTTPException
import traceback

# https://stackoverflow.com/a/70259840

def handleException(e):
    # pass through HTTP errors
    if isinstance(e, HTTPException):
        return e

    # # now you're handling non-HTTP exceptions only
    print(traceback.format_exc())
    return jsonify({
        "error": {
            "code": 500,
            "name": "Internal Server Error",
            "description": str(e)
            #"description": str(e),
        }
    }), 500
    #return render_template("500_generic.html", e=e), 500


def handleHTTPException(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "error": {
            "code": e.code,
            "name": e.name,
            "description": e.description,
        }
    })
    print(response.data) 
    response.content_type = "application/json"
    return response



