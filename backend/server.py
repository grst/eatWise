#!flask/bin/python
from flask import Flask, request, jsonify, abort, make_response
from flask_httpauth import HTTPBasicAuth
import json

app = Flask(__name__)
auth = HTTPBasicAuth()
app.config['DEBUG'] = False

isChallengeRunning = False

class User(object):
    def __init__(self):
        self.username=""
        self.badges=[]
        self.points = 0

userOne = User()

@app.route('/')
def basic():
    # show the post with the given id, the id is an integer
    return 'Server is running... If you post something and are logged in to the API, you\'d get a more useful thing'

@auth.get_password
def get_password(username):
    if username == 'jabberwocky':
        return ''
    return None

@app.route('/start/<userName>', methods=['POST'])
def startChallenge(userName):
	userOne.username = userName
	isChallengeRunning = True
	return json.dumps(userOne.__dict__)


#start stop
#get shoppin