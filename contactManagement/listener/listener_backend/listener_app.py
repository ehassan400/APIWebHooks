import pprint
import requests
from datetime  import datetime
from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
from flask import abort

app = Flask(__name__)
CORS(app)

webhookLog = []

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        pprint.pprint(request.json)
        webhookLog.append({'isTriggered': True, 'date': datetime.now().strftime("%b %d %Y %H:%M:%S"), 'data': request.json})
        return ('success', 200)
    else:
        abort(400)


@app.route('/webhook', methods=['Get'])
def webhook_get():
    if request.method == 'GET':
       return jsonify(webhookLog)
    else:
        abort(400)


if __name__ == '__main__':
    
    app.run(host='0.0.0.0',port=8005)