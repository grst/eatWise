#!flask/bin/python
from flask import Flask, request, jsonify, abort, make_response
from flask_httpauth import HTTPBasicAuth
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
auth = HTTPBasicAuth()
app.config['DEBUG'] = False

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

@app.route('/stopChallenge', methods=['GET'])
def stopChallenge():
	isChallengeRunning = False
	return "fts"

@app.route('/boughtProducts/', methods=['POST'])
def calculateSum():
	content = request.json
	totalSum = 0
	boughtItems = []

	for i in range(0, len(content)):
		item = content[i]
		ident = item['id']
		product = productList[ident]
		pts = product['Points']
		qty = randint(1,20)
		totalPts = pts*qty
		newItem = {}
		newItem['Name'] = product['Name']
		newItem['Points'] = product['Points']
		newItem['Category'] = product['Category']
		newItem['Quantity'] = qty
		newItem['TotalPoints'] = totalPts		
		#print("we had " + product['Name'] + " which had " + str(pts) + " points, and we bought " + str(qty) + " of them, which gives us a total of " + str(totalPts))
		totalSum = totalSum + totalPts
		boughtItems.append(newItem)

	result = {} 
	result['BoughtItems'] = boughtItems
	result['Sum'] = totalSum
	return json.dumps(result)

#start stop
#get shoppin