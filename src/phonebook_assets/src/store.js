import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    identity: null,
    principal: '',
    globalLoading: false,
    snackbar: false,
    snackbarMsg: ''
  },
  getters: {
    getIdentity: state => state.identity,
    getPrincipal: state => state.principal,
    getGlobalLoading: state => state.globalLoading
  },
  mutations: {
    setIdentity: (state, payload) => (state.identity = payload),
    setPrincipal: (state, payload) => (state.principal = payload),
    setGlobalLoading: (state, payload) => (state.globalLoading = payload),
    setSnackbar: (state, payload) => (state.snackbar = payload),
    setSnackbarMsg: (state, payload) => (state.snackbarMsg = payload)
  },
  actions: {}
});

export default store;
