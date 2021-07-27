<template>
  <!-- Test of authorized call -->
  <div>
    <button @click="handleLogin">Login</button>
    <div>{{ principal }}</div>
  </div>
</template>

<script>
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../../declarations/phonebook";

export default {
  data() {
    return {
      principal: "",
    };
  },

  methods: {
    async handleLogin() {
      const authClient = await AuthClient.create();
      authClient.login({
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const actor = createActor(canisterId, {
            agentOptions: {
              identity,
            },
          });

          const res = await actor.callerPrincipal();
          console.log(res);
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

<style>
</style>