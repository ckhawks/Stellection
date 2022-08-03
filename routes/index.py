from flask import make_response, jsonify
from . import routes

@routes.route('/')
def index():
    return 'HELLO WORLD BABY'

# @routes.errorhandler(404)
# def not_found(error):
#     return make_response(jsonify({'error': 'Not found'}), 404)