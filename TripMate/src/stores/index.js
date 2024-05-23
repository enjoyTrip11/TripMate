// store/index.js
import router from '@/router';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken') || null,
  },
  mutations: {
    SET_AUTH(state, status) {
      state.isAuthenticated = status;
    },
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    saveAccessToken({ commit }, accessToken) {
      localStorage.setItem('accessToken', accessToken);
      commit('SET_ACCESS_TOKEN', accessToken);
      commit('SET_AUTH', true);
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      commit('SET_ACCESS_TOKEN', null);
      commit('SET_AUTH', false);
      router.push({name: 'home'});
    },
  },
});

export default store;
