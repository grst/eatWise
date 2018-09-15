import mobx, {action, autorun, computed, observable, observe, runInAction, set, toJS} from 'mobx';

//mobx.configure({ enforceActions: true }) // don't allow state modifications outside actions

import api from './api'
import {values} from 'lodash';

function normalizeProducts(products){
  return products.map(function(p){
    const obj = {
      id: p.id,
      name: p.Name,
      iconURL: p.iconURL,
      co2_kg: p.CO2_KG,
      co2_100g: Math.round(p.CO2_100g * 1000) / 1000,
      category: p.Category,
    };
    if (p.Quantity !== undefined) {
      obj.quantity = p.Quantity;
    }
    return obj;
  });
}


class Store {
	@observable username = localStorage.getItem("username") || "Sebastian";
	@observable user = JSON.parse(localStorage.getItem("user")) || {};
  @observable products = JSON.parse(localStorage.getItem("products")) || [];
  @observable users = JSON.parse(localStorage.getItem("users")) || [];

	@observable purchase = JSON.parse(localStorage.getItem("purchase")) || {};

	//current adversary of an ongoing challenge
	@observable adversary = JSON.parse(localStorage.getItem("adversary")) || {};
  @observable challengeResult = JSON.parse(localStorage.getItem("challengeResult")) || {
    status: "lost"
  }
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

  @action async buyProducts(products) {
    const data = (await api.post("/buyProducts", {
      username: this.user.username,
      products: products.map(p => p.id),
    })).data;
    runInAction(() => {
      set(this.purchase, {
        boughtItems: normalizeProducts(data.BoughtItems),
        basketPoints: data.BasketPoints,
        basketCO2: data.BasketCO2,
      });
    });
  }

  @action challengeFriend(friend) {
    console.log("Starting challenge with: ", friend.username);
    set(this.adversary, friend);
    api.post('/startChallenge', this.challengeObject());
  }

  @action async updateChallenge() {
    const e = (await api.post('/getChallengeState', this.challengeObject()).data);
  }

  @action async checkForOngoingChallenges() {
    const e = (await api.post('/getOngoingChallenge', {
      username: this.username
    }).data);
    // {"thisUserWasChallenged": false, "challengedBy": "None"}
    set(this.challengeResult, e);
  }

  challengeObject() {
    return  {
      Me: this.username,
      Adversary: this.adversary.username,
    };
  }
  updatePeriod = 800; // in ms
}

const store = new Store();

// cache in local storage
["purchase", "adversary", "user", "users", "products"].forEach(key => {
  console.log(key);
  observe(store[key], () => {
    const value = JSON.stringify(toJS(store[key]));
    localStorage.setItem(key, value);
  });
});
observe(store, "username", () => {
  localStorage.setItem("username", store.username);
});
observe(store, "pageTitle", () => {
  document.title = store.pageTitle;
});
// for debugging
autorun(() => {
  console.log("purchase.watch:", toJS(store.purchase));
});
// always keep the current list of all products in memory
store.fetchProductList();
store.fetchUserDetails();
export default store;
