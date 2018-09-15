import mobx, {action, autorun, computed, observable, observe, runInAction, set} from 'mobx';

//mobx.configure({ enforceActions: true }) // don't allow state modifications outside actions

import api from './api'
import {values} from 'lodash';

function normalizeProducts(products){
  return products.map(p => ({
    id: p.Name,
    name: p.Name,
    iconURL: p.iconURL,
    co2_kg: p.CO2_KG,
    co2_100g: Math.round(p.CO2_100g * 1000) / 1000,
    category: p.Category,
    points: Math.round(p.Points * 10) / 10,
  }));
}


class Store {
  @observable basket = [];
	@observable username = localStorage.getItem("username", "Sebastian") || "Sebastian";
	@observable user = {};
	//current adversary of an ongoing challenge
	@observable adversaryName = null;
  @observable products = [];
  @observable users = [];

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

  @action async fetchUserDetails() {
    const e = await api.post("/start", {'username': this.username});
    runInAction(() => {
      set(this.user, e.data.currentUser);
      this.users.replace(values(e.data.userList));
    });
  }

  @computed get productWithLabels() {
    return this.products.map(e => ({
      label: e.name,
      id: e.id,
      ...e,
    }));
  }

  @computed get otherUsers() {
    return this.users.filter(u => u.id !== this.user.id);
  }

  isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
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
//autorun(() => {
  //console.log("user", store.user);
//});
// always keep the current list of all products in memory
store.fetchProductList();
store.fetchUserDetails();
export default store;
