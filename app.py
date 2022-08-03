from routes import *
from flask import Flask
from flask_cors import CORS
import util.cfg as cfg
from util.debug import log

cfg.loadConfigFile()

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes)

if __name__ == '__main__':
    log(f" --- Stellection Cataloger v{cfg.API_VERSION} --- \n")

    if(cfg.ENVIRONMENT == 'test'):
        app.run(debug=True, port=cfg.APP_PORT, host=cfg.APP_ADDRESS)
    else:
        from waitress import serve
        serve(app, host=cfg.APP_ADDRESS, port=cfg.APP_PORT)

        # https://flask.palletsprojects.com/en/1.1.x/server/