<template>
  <div class="home pa-6">
    <v-card>
      <v-card-title> Home </v-card-title>
      <v-card-subtitle> Your Phonebook </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log('[INFO] login status', this.$store.state.isLoggedIn);
  },
};
</script>

<style>
</style>