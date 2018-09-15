#!flask/bin/python
from flask import Flask, request, jsonify, abort, make_response
from flask_httpauth import HTTPBasicAuth
import json
from pprint import pprint

class User(object):
    def __init__(self):
        self.username=""
        self.badges=[]
        self.points = 0

class Item(object):
	def __init__(self):
		self.Name=""
		self.CO2_Kg=0
		self.CO2_100g = 0
		self.Category=""
		self.iconURL = ""

app = Flask(__name__)
auth = HTTPBasicAuth()
app.config['DEBUG'] = False

isChallengeRunning = False

userOne = User()

almond = Item()
almond.name = "Almond Milk"
almond.score = 1.09
almond.category = "Milk"

productList = []

with open('buhlerFoodprint.json') as f:
    productList = json.load(f)

item = productList[5]

print(item)

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
	return json.dumps(userOne)

@app.route('/getProductList/', methods=['POST'])
def startChallenge():
	return json.dumps(productList)

#start stop
#get shoppin