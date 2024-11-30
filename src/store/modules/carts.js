export default {
  namespaced: true, // Habilita o namespace
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },
  getters: {
    cartItems: (state) => state.cart,
    totalItems: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
};
