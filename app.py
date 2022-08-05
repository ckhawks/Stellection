from routes import *
from flask import Flask
from flask_cors import CORS
import util.cfg as cfg
from util.logger import log
from handlers.error_handler import handleException, handleHTTPException
from werkzeug.exceptions import HTTPException

cfg.loadConfigFile()

log(f"\n  Stellection Cataloger v{cfg.API_VERSION} Loaded  \n")

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes)
app.register_error_handler(Exception, handleException)
app.register_error_handler(HTTPException, handleHTTPException)

if __name__ == '__main__':
    

    if(cfg.ENVIRONMENT == 'test'):
        app.run(debug=True, port=cfg.APP_PORT, host=cfg.APP_ADDRESS)
    else:
        from waitress import serve
        serve(app, host=cfg.APP_ADDRESS, port=cfg.APP_PORT)

        # https://flask.palletsprojects.com/en/1.1.x/server/
    