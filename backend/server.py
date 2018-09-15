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
ongoingChallenge['playerOne'] = ""
ongoingChallenge['playerTwo'] = ""
ongoingChallenge['playerOneScore'] = 0
ongoingChallenge['playerTwoScore'] = 0

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
		newUser['challengePoints'] = basketPoints
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
		oldUser['challengePoints'] = basketPoints
		userList[username] = oldUser

	if ongoingChallenge['state'] == "WaitingForPlayerTwo":
		if ongoingChallenge['playerTwo'] == username:
			ongoingChallenge['playerTwoScore'] = basketPoints
			ongoingChallenge['state'] = "Completed"

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
		thisChallengeUser = userList[thisUsername]
		thisChallengePoints = thisChallengeUser['challengePoints']

		ongoingChallenge['playerOne'] = thisUsername
		ongoingChallenge['playerTwo'] = otherUsername
		ongoingChallenge['playerOneScore'] = thisChallengePoints
		ongoingChallenge['playerTwoScore'] = 0
		ongoingChallenge['state'] = "WaitingForPlayerTwo"

	else:
		print("ERROR! Your challenger doesn't exist!!")
		return make_response(jsonify({'Error!': 'Bad request format! Your challenger does not exist!'}), 400)

	return json.dumps(ongoingChallenge)


def calculatePoints(basket):
	total_co2_basket = 0
	weightBasket = 0

	for product in basket:
		weight = product['Quantity']
		#normalized emissions per product from our database
		CO2_100g = product['CO2_100g']
		#calculate the total absolute emission
		total_co2_basket += CO2_100g * weight/100
		#get the total weight of the Basket
		weightBasket += weight

	weighted_average_co2_basket = 100*total_co2_basket/weightBasket
	# 0.39 is the average of a representative default basket.
	savingsCO2_Basket = 0.39 - weighted_average_co2_basket
	finalPoints = savingsCO2_Basket * 100
	return total_co2_basket, finalPoints
