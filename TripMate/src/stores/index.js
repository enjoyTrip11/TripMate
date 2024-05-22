import { createStore } from 'vuex';

const store = createStore({
  state: {
    accessToken: null
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    }
  },
  actions: {
    saveAccessToken({ commit }, token) {
      commit('setAccessToken', token);
    }
  },
  getters: {
    accessToken: state => state.accessToken
  }
});

export default store;
