import json
from os.path import exists
from util.debug import log

# change the variables in config.json

# access from outside file
FILE_PATH = "files/"
API_VERSION = "0.0.1"
APP_PORT = 5000
APP_ADDRESS = "0.0.0.0"
ENVIRONMENT = "test"
DEBUG = False

# local VARIABLE ONLY
_CONFIG_PATH = "config.json"

# json config reading and writing inspired by
# https://tutswiki.com/read-write-json-config-file-in-python/

def createDefaultConfig():
    default_config = {
        "file_path": FILE_PATH,
        "api_version": API_VERSION,
        "app_port": APP_PORT,
        "app_address": APP_ADDRESS,
        "environment": ENVIRONMENT,
        "debug": DEBUG
    }
    myJSON = json.dumps(default_config, indent=4)

    with open(_CONFIG_PATH, "w") as jsonfile:
        jsonfile.write(myJSON)
        log(f"Wrote default configuration file to `{_CONFIG_PATH}`.")


def loadConfigFile():
    # check if config file exists
    if(not exists(_CONFIG_PATH)):
        log("Configuration file does not exist.")
        # if not, create default
        createDefaultConfig()

    # then load config
    with open(_CONFIG_PATH, "r") as jsonfile:
        data = json.load(jsonfile)
        log("Read config successful")
    log(f"Loaded configuration: {data}")

    global FILE_PATH, API_VERSION, APP_PORT, APP_ADDRESS, ENVIRONMENT, DEBUG

    FILE_PATH = data["file_path"]
    API_VERSION = data["api_version"]
    APP_PORT = data["app_port"]
    APP_ADDRESS = data["app_address"]
    ENVIRONMENT = data["environment"]
    DEBUG = data["debug"]
    