<template>
  <!-- Test of authorized call -->
  <div>
    <button @click="handleLogin">Login</button>
    <div>{{ principal }}</div>
    <button @click="handleCall">call</button>
  </div>
</template>

<script>
import { AuthClient } from "@dfinity/auth-client";
import { getActor } from "./service";

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
          const actor = await getActor(identity);
          this.principal = (await actor.callerPrincipal()).toText();
        },
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : process.env.LOCAL_II_CANISTER,
      });
    },

    async handleCall() {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const actor = await getActor(identity);
      console.log(await actor.createBook());
      console.log(
        await actor.insert("Joseph", {
          desc: "My Best Friend",
          phone: "(010) 123 321 1311",
        })
      );
      console.log(await actor.getBook());
      console.log(
        await actor.insert("Johnathan", {
          desc: "My Best Friend",
          phone: "(010) 123 321 1311",
        })
      );
      console.log(await actor.getBook());
      console.log(
        await actor.insert("Jotaro", {
          desc: "My Best Friend",
          phone: "(010) 123 321 1311",
        })
      );
      console.log(await actor.getBook());
      console.log(await actor.delete("Joseph"));
      console.log(await actor.getBook());
    },
  },
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>