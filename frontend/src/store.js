import mobx, {action, autorun, computed, observable, observe, runInAction} from 'mobx';

//mobx.configure({ enforceActions: true }) // don't allow state modifications outside actions

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


class Store {
  @observable basket = [];
	@observable username = localStorage.getItem("username", "Sebastian") || "Sebastian";
	@observable currentScore = 1234;
	@observable currentCO2 = 34.32;
  @observable products = [];
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

  @action async fetchProductList() {
    const e = await api.get("/getProductList");
    runInAction(() => {
      this.products.replace(normalizeProducts(e.data));
    });
  }

  @computed get productWithLabels() {
    return this.products.map(e => ({
      label: e.name,
      id: e.id,
      ...e,
    }));
  }
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

// for debugging
autorun(() => {
  //console.log("products", store.products.length);
});
// always keep the current list of all products in memory
store.fetchProductList();
export default store;
