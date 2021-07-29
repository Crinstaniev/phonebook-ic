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

    <v-app-bar app dark color="black" :src="appBarBg">
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
    <!-- snackbar message -->
    <v-snackbar v-model="snackbar">
      {{ snackbarMsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getActor, getAuthClient } from './service';
import background from '../assets/geometry-background.png';
import appBarBg from '../assets/dfinity-background.jpg';

export default {
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'User', icon: 'mdi-account-circle', to: '/user' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
    ],
    right: null,
    backgroundImg: background,
    appBarBg: appBarBg,
  }),

  created() {
    this.checkAuthState();
  },

  methods: {
    ...mapGetters(['getIdentity', 'getPrincipal', 'getGlobalLoading']),
    ...mapMutations([
      'setPrincipal',
      'setIdentity',
      'setGlobalLoading',
      'setSnackbar',
      'setSnackbarMsg',
    ]),

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

  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(value) {
        this.setSnackbar(value);
      },
    },

    snackbarMsg: {
      get() {
        return this.$store.state.snackbarMsg;
      },
    },
  },
};
</script>

<style scoped>
#root-container {
  height: 100%;
}
</style>