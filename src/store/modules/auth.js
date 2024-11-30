import authService from '../../services/autent';

const state = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.user,
};

const actions = {
  async register({ dispatch }, newUser) {
    await authService.register(newUser); // Registra o usuário
    await dispatch('login', { username: newUser.email, password: newUser.password }); // Faz login automático
  },
  async login({ commit }, user) {
    const response = await authService.login(user);
    const token = response.data.token;
    const userData = { username: user.username, email: user.email };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    commit('setAuth', { token, user: userData });
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    commit('clearAuth');
  },
};

const mutations = {
  setAuth: (state, { token, user }) => {
    state.token = token;
    state.user = user;
  },
  clearAuth: (state) => {
    state.token = '';
    state.user = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
