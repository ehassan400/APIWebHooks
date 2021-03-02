import flask
import json
from flask import request, jsonify
import requests

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# Create some test data for our catalog in the form of a list of dictionaries.
contacts = [
    {'name': 'Eman Hassan',
     'email': 'ehassan@hearsaycorp.com'}
]

createsubscribers_list = []

update_subscribers_list = []

deletesubscribers_list = []

@app.route('/', methods=['GET'])
def home():
    return '''<h1>Hearsay Contacts API and Webhooks</h1>
<p>A prototype API for create, read, update and delete contacts and webhooks for create, update and delete.</p>'''


@app.route('/api/v1/org/1684/contacts/all', methods=['GET'])
def api_all():
    return jsonify(contacts)

@app.route('/api/v1/org/1684/contacts', methods=['POST'])
def api_create_contact():
    record = json.loads(request.data)
    contacts.append(record)
    notify('oncreate', jsonify(contacts[-1]))
    return jsonify(contacts)

@app.route('/api/v1/org/1684/contacts', methods=['PATCH'])
def api_update_contact():
    record = json.loads(request.data)
    for contact in contacts:
        if contact['email'] == record['email']:
            contact['name'] = record['name']
    notify('onupdate', request.data)
    return jsonify(contacts)

@app.route('/api/v1/org/1684/contacts', methods=['DELETE'])
def api_delete_contact():
    record = json.loads(request.data)
    contacts.remove(record)
    notify('ondelete', request.data)
    return jsonify(contacts)

@app.route('/api/v1/org/1684/contacts/webhook', methods=['POST'])
def subscribe_webhooks():
    record = json.loads(request.data)
    listener_url = record.get('listener_url')
    if record['action'] == 'oncreate':
        createsubscribers_list.append(listener_url)
        r = requests.post(listener_url, json="subscribed to oncreate actions")
        return jsonify(createsubscribers_list)
    if record['action'] == 'onupdate':
        update_subscribers_list.append(listener_url)
        r = requests.post(listener_url, json="subscribed to onupdate actions")
        return jsonify(update_subscribers_list)
    if record['action'] == 'ondelete':
        deletesubscribers_list.append(listener_url)
        r = requests.post(listener_url, json="subscribed to ondelete actions")
        return jsonify(deletesubscribers_list)
    else:
        return jsonify(None)

def notify(action, data):
    listeners = []
    if action == 'oncreate':
        listeners = createsubscribers_list
    if action == 'onupdate':
        listeners = update_subscribers_list
    if action == 'ondelete':
        listeners = deletesubscribers_list
    
    for listener in listeners:
        r = requests.post(listener, json=data)

@app.route('/api/v1/org/1684/contacts/webhookTest', methods=['POST'])
def test_hooks():
    record = request.data
    print(record)
    return jsonify(record)

app.run(host='0.0.0.0',port=5008)