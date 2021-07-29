<template>
  <div class="home pa-6">
    <v-row dense>
      <v-col cols="12">
        <v-card class="mx-auto" max-width="500" elevation="2">
          <v-card-title> Home </v-card-title>
          <v-card-subtitle> Your Phonebook </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto pa-5" max-width="500" elevation="2">
          <v-form v-model="valid">
            <v-text-field
              v-model="formData.name"
              label="Name"
              required
              :rules="formRules.name"
            ></v-text-field>
            <v-text-field
              v-model="formData.phone"
              label="Phone Number"
              required
              :rules="formRules.phone"
            ></v-text-field>
            <v-text-field
              v-model="formData.desc"
              label="Description"
              required
              :rules="formRules.desc"
            ></v-text-field>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" class="d-flex">
        <v-btn
          :color="buttonColor"
          dark
          class="mx-auto"
          max-width="500"
          elevation="2"
          width="100%"
          x-large
          :loading="globalLoading()"
          @click="handleAdd"
          >ADD</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getActor, getAuthClient } from '../service';
import router from '../router';

export default {
  components: {},
  data() {
    return {
      valid: false,
      formData: {
        name: '',
        phone: '',
        desc: '',
      },
      formRules: {
        name: [(v) => !!v.trim() || 'Name is required'],
        phone: [(v) => !!v.trim() || 'Phone is required'],
        desc: [(v) => !!v.trim() || 'Description is required'],
      },
    };
  },

  async mounted() {
    // not permited to enter homepage if not logged in
    const authClient = await getAuthClient();
    const authStatus = await authClient.isAuthenticated();
    if (!authStatus) {
      this.setSnackbar(true);
      this.setSnackbarMsg('Please Login');
      router.push('User');
    }
    // create book
    const actor = await getActor(this.getIdentity());
    this.setGlobalLoading(true);
    await actor.createBook().then((res) => {
      console.log(res.msg);
    });
    this.setGlobalLoading(false);
  },

  methods: {
    ...mapState(['globalLoading', 'identity', 'principal']),
    ...mapMutations(['setSnackbar', 'setSnackbarMsg', 'setGlobalLoading']),
    ...mapGetters(['getIdentity']),

    async handleAdd() {
      if (!this.valid) {
        return;
      }
      console.log('[INFO] submit info', this.formData);
      // insert record
      this.setGlobalLoading(true);
      const actor = await getActor(this.identity());
      await actor
        .insert(this.formData.name, {
          phone: this.formData.phone,
          desc: this.formData.desc,
        })
        .then((res) => {
          console.log(res.msg);
          this.setGlobalLoading(false);
        });
      await actor.getBook().then((res) => {
        console.log('[INFO] get book', res);
      });
    },
  },

  computed: {
    buttonColor() {
      return this.valid ? 'green' : 'grey';
    },
  },
};
</script>

<style scoped>
</style>