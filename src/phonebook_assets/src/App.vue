<template>
  <!-- Test of authorized call -->
  <v-app>
    <v-app-bar app>IC Phonebook</v-app-bar>
    <v-main>
      <v-container fluid></v-container>
    </v-main>
    <v-footer app>
      Powered by Johnathan Zhuang
    </v-footer>
  </v-app>
</template>

<script>
import { AuthClient } from "@dfinity/auth-client";
import { getActor } from "./service";

export default {
  data() {
    return {};
  },

  methods: {
    async handleLogin() {
      const authClient = await AuthClient.create();
      authClient.login({
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const actor = await getActor(identity);
          this.principal = (await actor.callerPrincipal()).toText();
        },
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : process.env.LOCAL_II_CANISTER,
      });
    },
  },
};
</script>

<style scoped>
</style>