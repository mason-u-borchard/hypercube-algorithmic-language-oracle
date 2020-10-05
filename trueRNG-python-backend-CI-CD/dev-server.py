from flask import Flask
import numpy as np
app = Flask(__name__)


@app.route("/numbers/",)
def getByte():
    txt_filenames = open('all_file_names.txt', "r")
    line_list = txt_filenames.read().split('\n')
    print('linelist', line_list)
    txt_filenames.close()
    latest_txt_file = str(line_list[len(line_list) - 2])
    print('last line in list', line_list[len(line_list) - 2])
    print('latest_txt_file', latest_txt_file)
    byte_data = open(latest_txt_file, "r")
    byte_list = byte_data.readlines()
    byte_data.close()
    last_byte = byte_list[len(byte_list) - 1]
    print("Last byte from %s: " % (latest_txt_file), last_byte)
    return str(last_byte)


getByte()


@app.route("/",)
def index():
    return "welcome to the trueRNG python server"


if __name__ == "__main__":
    app.run(host="localhost", port=int("5001"))
