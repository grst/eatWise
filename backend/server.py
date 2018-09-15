#!flask/bin/python
from flask import Flask, request, jsonify, abort, make_response
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import json
from random import randint, seed
import copy

app = Flask(__name__)
CORS(app)
auth = HTTPBasicAuth()
app.config['DEBUG'] = False
# CORS doesn't support redirects
app.url_map.strict_slashes = False

userList = {}
productList = []
ongoingChallenge = {}
ongoingChallenge['state'] = "None"

with open('buhlerFoodprint.json') as f:
    productList = json.load(f)

with open('user.json') as f:
    for user in json.load(f):
        userList[user['username']] = user

@app.route('/')
def basic():
    # show the post with the given id, the id is an integer
    return 'Server is running... If you post something and are logged in to the API, you\'d get a more useful thing'

@app.route('/start/', methods=['POST'])
def initUser():
	content = request.json
	username = content['username']
	newUser = {}
	if username not in userList:
		newUser['name'] = username
		newUser['points'] = 0
		newUser['co2'] = 0
		newUser['description'] = ""
		newUser['badges'] = []
		newUser['avatarURL'] = '/img/avatars/dummy.jpg'
		userId = len(userList)
		newUser['id'] = userId
		userList[username] = newUser
	else:
		newUser = userList[username]
	return json.dumps({
		"currentUser": newUser,
		"userList": userList
	})

@app.route('/getProductList/', methods=['GET'])
def getProductList():
	return json.dumps(productList)

@app.route('/buyProducts/', methods=['POST'])
def calculateBasket():
	seed(42)
	content = request.json
	boughtItems = []
	username = content['username']
	products = content['products'] # simple list of array indices (aka ids)

	for ident in products:
		product = productList[int(ident)]
		qty = randint(100, 3000)
		newItem = copy.deepcopy(product)
		newItem['Quantity'] = qty
		#print("we had " + product['Name'] + " which had " + str(pts) + " points, and we bought " + str(qty) + " of them, which gives us a total of " + str(itemPts))
		boughtItems.append(newItem)

	totalCO2_Basket,basketPoints = calculatePoints(boughtItems)

	if not username in userList:
		newUser = {}
		newUser['name'] = username
		newUser['points'] = basketPoints
		newUser['description'] = ""
		newUser['co2'] = totalCO2_Basket
		newUser['badges'] = []
		newUser['avatarURL'] = '/img/avatars/dummy.jpg'
		userId = len(userList)
		newUser['id'] = userId
		userList[username] = newUser
	else:
		oldUser = userList[username]
		oldBasketPoints = oldUser['points']
		oldCO2Points = oldUser['co2']
		oldUser['points'] = basketPoints + oldBasketPoints
		oldUser['co2'] = totalCO2_Basket + oldCO2Points
		userList[username] = oldUser

	if ongoingChallenge['playerOne'] == username:
		ongoingChallenge['playerOneScore'] = basketPoints
		if ongoingChallenge['playerTwoScore'] > 0:
			ongoingChallenge['state'] == "Completed"
	elif: ongoingChallenge['playerTwo'] == username:
		ongoingChallenge['playerTwoScore'] = basketPoints
		if ongoingChallenge['playerOneScore'] > 0:
			ongoingChallenge['state'] == "Completed"

	result = {}
	result['BoughtItems'] = boughtItems
	result['BasketCO2'] = totalCO2_Basket
	result['BasketPoints'] = basketPoints
	return json.dumps(result)

@app.route('/getOngoingChallenge/', methods=['GET'])
def getOngoingChallenge():
	return json.dumps(ongoingChallenge)

@app.route('/startChallenge/', methods=['POST'])
def startChallenge():
	content = request.json
	thisUsername = content['Me']
	otherUsername = content['Adversary']
	if not thisUsername in userList:
		print("ERROR! You never saved your own points!!")
		return make_response(jsonify({'Error!': 'Bad request format! Did you save your own points before quering it?'}), 400)

	if otherUsername in userList:
		#this should be the standard case. This function is allowed to assume that both you and the adversary are valid players
		ongoingChallenge['playerOne'] = thisUsername
		ongoingChallenge['playerTwo'] = otherUsername
		ongoingChallenge['playerOneScore'] = 0
		ongoingChallenge['playerTwoScore'] = 0
		ongoingChallenge['state'] = "Ongoing"

	else:
		print("ERROR! Your challenger doesn't exist!!")
		return make_response(jsonify({'Error!': 'Bad request format! Your challenger does not exist!'}), 400)

	return json.dumps(ongoingChallenge)


def calculatePoints(basket):
	CO2sum = 0
	weightBasket = 0

	for i in range(0, len(basket)):
		product = basket[i]
		weight = product['Quantity']
		#normalized emissions per product from our database
		CO2_100g = product['CO2_100g']
		#calculate the total absolute emission
		CO2sum = CO2sum + CO2_100g * weight/100
		#get the total weight of the Basket
		weightBasket = weightBasket + weight

	totalCO2_Basket = 100*CO2sum/weightBasket
	# 0.39 has bee developed on a representative default basket.
	savingsCO2_Basket = 0.39 - totalCO2_Basket
	finalPoints = savingsCO2_Basket * 100
	return savingsCO2_Basket, finalPoints
