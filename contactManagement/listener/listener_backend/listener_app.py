import pprint
import requests
from datetime import date
from flask import Flask
from flask import request
from flask import abort

app = Flask(__name__)

webhookInfo = {'isTriggered': false, 'date': '', data = None}

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        pprint.pprint(request.json)
        webhookInfo['isTriggered'] = True;
        webhookInfo['date'] = date.today();
        webhookInfo['data'] = request.json;
        return ('success', 200)
    else:
        abort(400)


@app.route('/webhook', methods=['Get'])
def webhook():
    if request.method == 'GET':
       return jsonify(webhookInfo)
    else:
        abort(400)


if __name__ == '__main__':
    
    app.run(host='0.0.0.0',port=8005)