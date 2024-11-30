import authService from '../../services/autent';
import { validateLogin } from '../../utils/validation';
import { handleError } from '../../utils/errorHandler';

const state = {
  token: localStorage.getItem('token') || '', // Token persistido no localStorage
  user: JSON.parse(localStorage.getItem('user')) || null, // Informações do usuário
  status: '', // Status atual da autenticação
};

const getters = {
  isAuthenticated: (state) => !!state.token, // Retorna true se houver token
  authStatus: (state) => state.status,
  currentUser: (state) => state.user, // Retorna informações do usuário autenticado
};

const actions = {
  async login({ commit }, user) {
    try {
      validateLogin(user); // Validações básicas
      const response = await authService.login(user);
      const token = response.data.token;
      const userData = { username: user.username, email: user.email };

      // Armazena token e informações do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      commit('authSuccess', { token, user: userData });
    } catch (error) {
      handleError(error); // Manipula erros
      commit('authError');
      throw error; // Lança o erro para manipulação no componente
    }
  },
  async register({ commit }, newUser) {
    try {
      // Registro de usuário no backend
      const response = await authService.register(newUser);
      const userData = response.data;

      // Realiza login automático após registro
      const loginData = { username: newUser.email, password: newUser.password };
      await this.dispatch('auth/login', loginData);

      return userData;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
  logout({ commit }) {
    // Remove dados do localStorage e limpa o estado Vuex
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    commit('authLogout');
  },
};

const mutations = {
  authSuccess: (state, { token, user }) => {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },
  authLogout: (state) => {
    state.status = '';
    state.token = '';
    state.user = null;
  },
  authError: (state) => {
    state.status = 'error';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
