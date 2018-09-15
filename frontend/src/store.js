import mobx, {action, autorun, computed, observable, observe, runInAction} from 'mobx';

//mobx.configure({ enforceActions: true }) // don't allow state modifications outside actions

import api from './api'

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
  @observable products = [];
  @observable friends = [
  {
    id: 1,
    name: "Sebastian",
    description: "EcoFighter",
    avatarURL: "/img/avatars/sebastian.jpg",
  },
  {
    id: 2,
    name: "Gregor",
    description: "Food is my mood.",
    avatarURL: "/img/avatars/gregor.jpg",
  },
  {
    id: 3,
    name: "Mari",
    description: "Sharing is caring.",
    avatarURL: "/img/avatars/mari.jpg",
  },
  {
    id: 4,
    name: "Betiana",
    description: "CheeseSquad",
    avatarURL: "/img/avatars/betiana.jpg",
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

  @action async fetchUserDetails() {
    const e = await api.post("/start", {'username': this.username});
    runInAction(() => {
      this.user = e.data;
    });
  }

  @computed get productWithLabels() {
    return this.products.map(e => ({
      label: e.name,
      id: e.id,
      ...e,
    }));
  }
  @computed get currentUser() {
    // silly search for the currently logged in user
    const user = this.username.toLowerCase();
    const userNames = this.friends.filter(f => f.name.toLowerCase() === user);
    if (userNames.length === 0) {
      return {};
    } else {
      return userNames[0];
    }
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
store.fetchUserDetails();
export default store;
