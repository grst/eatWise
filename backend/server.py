#!flask/bin/python
from flask import Flask, request, jsonify, abort, make_response
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import json
from random import randint

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
CORS(app)
auth = HTTPBasicAuth()
app.config['DEBUG'] = False
# CORS doesn't support redirects
app.url_map.strict_slashes = False

isChallengeRunning = False

userOne = User()
userTwo = User()

productList = []

with open('buhlerFoodprint.json') as f:
    productList = json.load(f)
# item = productList[5]
# print(item)

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

@app.route('/getProductList/', methods=['GET'])
def getProductList():
	return json.dumps(productList)

@app.route('/boughtProducts/<username>', methods=['POST'])
def calculateSum(username):
	content = request.json
	totalSum = 0
	boughtItems = []

	for i in range(0, len(content)):
		ident = content[i]
		product = productList[ident]
		pts = product['Points']
		qty = randint(1,20)
		itemPts = pts*qty
		newItem = {}
		newItem['Name'] = product['Name']
		newItem['Points'] = product['Points']
		newItem['Category'] = product['Category']
		newItem['Quantity'] = qty
		newItem['ItemPoints'] = itemPts		
		#print("we had " + product['Name'] + " which had " + str(pts) + " points, and we bought " + str(qty) + " of them, which gives us a total of " + str(itemPts))
		totalSum = totalSum + itemPts
		boughtItems.append(newItem)

	result = {} 
	result['BoughtItems'] = boughtItems
	result['Sum'] = totalSum

	if(userOne.points == 0):
		#you are the first person to complete the challenge
		result['Challenge'] = 'Ongoing'
		userOne.Name = username
		userOne.points = totalSum
	else:
		#you're the second one to finish, let's see if you won..
		if(userOne.points>totalSum):
			#the other dude had more points than you did, you loose, sorry lah..
			result['Challenge'] = 'Looser'
		else:
			result['Challenge'] = 'Winner'
		
		userTwo.Name = username
		userTwo.points = totalSum
	
	return json.dumps(result)

#start stop
#get shoppin
