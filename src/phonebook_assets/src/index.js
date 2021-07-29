import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import vuetify from "./plugins/vuetify";
import router from "./router";

new Vue({
  ...App,
  vuetify,
  router
}).$mount("#app");
