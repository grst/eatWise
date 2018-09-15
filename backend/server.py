#!flask/bin/python
from flask import Flask, request, jsonify, abort, make_response
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
import json
from random import randint, seed

app = Flask(__name__)
CORS(app)
auth = HTTPBasicAuth()
app.config['DEBUG'] = False
# CORS doesn't support redirects
app.url_map.strict_slashes = False

userList = {}
productList = []

with open('buhlerFoodprint.json') as f:
    productList = json.load(f)

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
		newUser = {}
		newUser['name'] = username
		newUser['points'] = 0
		newUser['badges'] = []
		userId = len(userList)
		newUser['id'] = userId
		userList[username] = newUser
		return json.dumps(newUser)

@app.route('/getProductList/', methods=['GET'])
def getProductList():
	return json.dumps(productList)

@app.route('/buyProducts/<username>', methods=['POST'])
def calculateSum(username):
	seed(42)
	content = request.json
	boughtItems = []

	for i in range(0, len(content)):
		ident = content[i]
		product = productList[ident]
		qty = randint(100,3000)
		newItem = {}
		newItem['Name'] = product['Name']
		newItem['CO2_100g'] = product['CO2_100g']
		newItem['Category'] = product['Category']
		newItem['Quantity'] = qty
		#print("we had " + product['Name'] + " which had " + str(pts) + " points, and we bought " + str(qty) + " of them, which gives us a total of " + str(itemPts))
		boughtItems.append(newItem)

	totalCO2_Basket,basketPoints = calculatePoints(boughtItems)

	if not username in userList:
		newUser = {}
		newUser['name'] = username
		newUser['points'] = basketPoints
		newUser['co2'] = totalCO2_Basket
		newUser['badges'] = []
		userId = len(userList)
		newUser['id'] = userId
		userList[username] = newUser
	else:
		oldUser = userList[username]
		oldUser['points'] = basketPoints
		oldUser['co2'] = totalCO2_Basket

	result = {} 
	result['BoughtItems'] = boughtItems
	result['BasketCO2'] = totalCO2_Basket
	result['BasketPoints'] = basketPoints
	return json.dumps(result)

@app.route('/getChallengeState/<username>', methods=['POST'])
def getChallengeState(username):
	content = request.json
	thisUsername = content['Me'] 
	otherUsername = content['Adversary']
	thisPoints = 0
	otherPoints = 0
	resultStr = ""

	if thisUsername in userList:
		thisUser = userList[thisUsername]
		thisPoints = thisUser['points']
	else:
		print("ERROR! You never saved your own points!!")
		return make_response(jsonify({'Error!': 'Bad request format! Did you save your own points before quering it?'}), 400)

	if not otherUsername in userList:
		resultStr = "Ongoing"
	else:
		otherUser = userList[otherUsername]
		otherPoints = otherUser['points']

		if thisPoints > otherPoints:
			resultStr = "Winner"
		elif otherPoints > thisPoints:
			resultStr = "Looser"
		else:
			resultStr = "Tie!"

	result = {}
	result['ChallengeResult'] = resultStr
	return json.dumps(result)


def calculatePoints(basket):
	CO2sum = 0
	weightBasket = 0 
	print(basket)

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
	finalPoints = 1/totalCO2_Basket
	return totalCO2_Basket,finalPoints
