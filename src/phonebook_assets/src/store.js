import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    identity: null,
    principal: ''
  },
  getters: {
    getIdentity: state => state.identity,
    getPrincipal: state => state.principal
  },
  mutations: {
    setIdentity: (state, payload) => (state.identity = payload),
    setPrincipal: (state, payload) => (state.principal = payload)
  },
  actions: {}
});

export default store;
