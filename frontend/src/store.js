import {observable, observe} from 'mobx';

import defaultProducts from './products';
import api from './api'

function normalizeProducts(products){
  return products.map(p => ({
    id: p.Name,
    name: p.Name,
    iconURL: p.iconURL,
    co2_kg: p.CO2_KG,
    co2_100g: p.CO2_100g,
    category: p.Category,
  }));
}

const normalizedDefaultProducts = normalizeProducts(defaultProducts);

api.get("/getProductList").then(e => {
  console.log("foo", e);
});


class Store {
  @observable basket = [];
	@observable username = localStorage.getItem("username", "Sebastian") || "Sebastian";
	@observable currentScore = 1234;
	@observable currentCO2 = 34.32;
	@observable currentLevel = "ecofriendly";
	@observable products = normalizedDefaultProducts;
  @observable friends = [
  {
    id: 1,
    name: "Peter",
    description: "EcoFighter"
  },
  {
    id: 2,
    name: "Yustav",
    description: "FoodArmy"
  },
  ];
	@observable purchase = JSON.parse(localStorage.getItem("purchase", "[]")) || [];
  @observable challengeResult = {
    status: "lost",
  };
  @observable pageTitle = "";
}

const store = new Store();
// store username + last purchase in local storage
observe(store, "username", () => {
  localStorage.setItem("username", store.username);
});
observe(store, "purchase", () => {
  localStorage.setItem("purchase", JSON.stringify(store.purchase));
});
observe(store, "pageTitle", () => {
  document.title = store.pageTitle;
});
export default store;
