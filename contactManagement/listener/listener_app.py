import pprint
import requests

from flask import Flask
from flask import request
from flask import abort


app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        pprint.pprint(request.json)
        return ('success', 200)
    else:
        abort(400)


if __name__ == '__main__':
    
    app.run(host='0.0.0.0',port=8005)