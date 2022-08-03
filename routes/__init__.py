from flask import Blueprint

routes = Blueprint('routes', __name__)

from .stars import *
from .index import *
from .clusters import *