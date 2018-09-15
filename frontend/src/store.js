import {observable, observe} from 'mobx';

import defaultProducts from './products';

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

class Store {
  @observable basket = [];
	@observable username = localStorage.getItem("username", "Sebastian") || "Sebastian";
	@observable currentScore = 1234;
	@observable products = normalizedDefaultProducts;
	@observable friends = [];
	@observable purchase = [];
  @observable challengeResult = {
    status: "lost",
  };
  @observable pageTitle = "";
}

const store = new Store();
observe(store, "username", () => {
  localStorage.setItem("username", store.username);
});
observe(store, "pageTitle", () => {
  document.title = store.pageTitle;
});
export default store;
