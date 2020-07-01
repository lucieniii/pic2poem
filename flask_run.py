#coding:utf-8

import subprocess
from flask import Flask, request
import os

app = Flask(__name__)


@app.route("/")
def helloworld():
    return '<h1>Hello world!</h1>'

# @app.before_first_request
# def before_first_request():
#     cnt = 0


@app.route("/upload", methods=['POST', 'GET'])
def upload():
    f = request.files.get('file')
    upload_path = os.path.join("/root/tmp/tmp." + f.filename.split(".")[-1])
    f.save(upload_path)
    return upload_path


@app.route("/generate")
def generate():
    img_url = request.args.get("url")
    typeG = request.args.get("typeG")
    print(typeG)
    route = "/root/pic2poem/pic2poem.py"
    out_bytes = subprocess.check_output(['python3', route, img_url, typeG])
    out_text = out_bytes.decode('utf-8')

    return out_text


if __name__ == '__main__':
    cnt = 0
    app.run(host="0.0.0.0", port=8080, debug=True)
