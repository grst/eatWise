import {observable} from 'mobx';

class Store {
  @observable basket = [];
	@observable username = "Sebastian";
}

const store = new Store();
export default store;
