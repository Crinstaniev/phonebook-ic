<template>
  <div class="pa-6">
    <h1>Test Page</h1>
    <contact-card :records="desserts" />
  </div>
</template>

<script>
import ContactCard from '../components/ContactCard.vue';

export default {
  components: { ContactCard },

  data: () => ({
    desserts: [
      {
        name: 'Johnathan',
        phone: '1234567',
        description: 'myself',
      },
      {
        name: 'Joseph',
        phone: '1234567',
        description: 'myself',
      },
    ],
  }),
};
</script>

<style>
</style>