import util.cfg as cfg

def log(message, debug_message: bool=False):

    # if debug mode is on
    if(cfg.DEBUG):

        # print everything
        print(message)

    else:

        # not in debug mode

        if(not debug_message):
            print(message)
    