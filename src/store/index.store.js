import { createStore } from 'vuex';
import products from './modules/products';
import carts from './modules/carts';
import users from './modules/users';
import auth from './modules/auth';

const store = createStore({
  modules: {
    products,
    carts,
    users,
    auth,
  },
  state: {
    cart: [],
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
  },
  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
  },
  getters: {
    cartItems: (state) => state.cart,
  },
});

export default store;
