import {observable, observe} from 'mobx';

class Store {
  @observable basket = [];
	@observable username = localStorage.getItem("username", "Sebastian");
}

const store = new Store();
observe(store, "username", () => {
  console.log("username change");
  localStorage.setItem("username", store.username);
});
export default store;
