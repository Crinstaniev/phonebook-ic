<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> IC Phonebook </v-list-item-title>
          <v-list-item-subtitle>
            Powered by Internet Computer
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="black" src="../assets/dfinity-background.jpg">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>IC Phonebook</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div id="root-container">
        <v-img :src="backgroundImg" height="100%">
          <router-view></router-view>
        </v-img>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getAuthClient } from './service';
import background from '../assets/geometry-background.png';

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'User', icon: 'mdi-account-circle', to: '/user' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
    ],
    right: null,
    backgroundImg: background,
  }),

  created() {
    this.checkAuthState();
  },

  methods: {
    ...mapGetters(['getIdentity', 'getPrincipal']),
    ...mapMutations(['setPrincipal', 'setIdentity']),

    async checkAuthState() {
      const authClient = await getAuthClient();
      const authStatus = await authClient.isAuthenticated();
      if (authStatus) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toString();
        this.setIdentity(identity);
        this.setPrincipal(principal);
      }
    },
  },
};
</script>

<style scoped>
#root-container {
  height: 100%;
  opacity: 0.9;
}
</style>