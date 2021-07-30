<template>
  <div class="user pa-6">
    <!-- title area -->
    <v-row dense>
      <v-col cols="12">
        <v-card dark elevation="2" class="mx-auto" max-width="500">
          <v-card-title>User Info</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <!-- user info area -->
    <v-row dense v-if="getPrincipal().length !== 0">
      <v-col cols="12">
        <v-card color="white" class="mx-auto" max-width="500" elevation="2">
          <v-img
            class="white--text align-end"
            height="100px"
            :src="imgUrls.identity"
          >
            <v-card-title> Internet Identity </v-card-title>
          </v-img>
          <!-- avatar -->
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex justify-center py-3">
                <v-avatar size="100" color="black">
                  <v-img :src="imgUrls.avatar"></v-img>
                </v-avatar>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <!-- principal text -->
          <v-list-item>
            <v-list-item-content>
              <div class="py-2">
                <p class="title">Principal</p>
                <p class="text-body-1">{{ getPrincipal() }}</p>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <!-- login area -->
    <v-row dense>
      <v-col>
        <v-card
          :loading="load.login"
          color="white"
          class="mx-auto"
          max-width="500"
          elevation="2"
        >
          <v-img
            class="white--text align-end"
            height="100px"
            :src="imgUrls.login"
          >
            <v-card-title> Connect to the World </v-card-title>
          </v-img>
          <v-card-text>Login with Internet Identity</v-card-text>
          <div class="pa-3">
            <v-btn
              block
              color="primary"
              elevation="1"
              large
              @click="handleLogin"
            >
              <div class="d-flex justify-center align-center">
                <span v-if="loginButtonText === 'OK'">
                  LOGIN SUCCESS
                  <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                </span>
                <span v-if="loginButtonText === 'LOGIN'">LOGIN</span>
              </div>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAuthClient } from '../service';
import { mapMutations, mapGetters, mapState } from 'vuex';

import avatar from '../../assets/avatar.jpg';

export default {
  components: {},
  data() {
    return {
      load: {
        login: false,
      },
      imgUrls: {
        identity:
          'https://cdn.pixabay.com/photo/2017/02/19/23/10/finger-2081169_1280.jpg',
        login:
          'https://cdn.pixabay.com/photo/2017/04/23/19/30/earth-2254769_1280.jpg',
        avatar: avatar,
      },
    };
  },

  methods: {
    ...mapMutations(['setIdentity', 'setPrincipal']),
    ...mapGetters(['getIdentity', 'getPrincipal']),
    ...mapState(['globalLoading']),

    async handleLogin() {
      const authClient = await getAuthClient();
      this.load.login = true;
      authClient.login({
        onSuccess: async () => {
          this.load.login = false;
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          this.setIdentity(identity);
          this.setPrincipal(principal);
        },
        // identityProvider:
        //   process.env.DFX_NETWORK === 'ic'
        //     ? 'https://identity.ic0.app/#authorize'
        //     : process.env.LOCAL_II_CANISTER,
      });
    },

    readIdentity() {
      console.log('[INFO] read identity', this.getIdentity());
      console.log('[INFO] read principal', this.getPrincipal());
    },

    test() {
      console.log(this.getPrincipal());
    },
  },

  mounted() {},

  computed: {
    loginButtonText() {
      if (this.getPrincipal().length === 0) {
        console.log('[INFO] setting text to login');
        return 'LOGIN';
      } else {
        console.log('[INFO] setting text to re-login');
        return 'OK';
      }
    },
  },
};
</script>

<style scoped>
.user {
  overflow: scroll;
  user-select: none;
}
</style>