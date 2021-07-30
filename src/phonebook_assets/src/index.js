import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import ScrollView from 'vue-scrollview';

Vue.use(ScrollView);

new Vue({
  ...App,
  vuetify,
  router,
  store
}).$mount('#app');
