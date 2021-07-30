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
    <!-- expand area -->
    <v-row>
      <v-col cols="12">
        <v-card
          @click="showAddArea = !showAddArea"
          class="mx-auto"
          max-width="500"
          elevation="2"
          :dark="showAddArea"
          :color="showAddArea ? 'green' : ''"
        >
          <div class="d-flex align-center justify-space-between">
            <v-card-title>Add new contact</v-card-title>
            <v-icon class="mr-3">{{
              showAddArea ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </div>
        </v-card>
        <v-expand-transition>
          <div v-show="showAddArea" class="mt-2">
            <v-row dense>
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
        </v-expand-transition>
      </v-col>
    </v-row>
    <!-- render contacts -->
    <v-row><div class="mt-4"></div></v-row>
    <v-row dense v-for="item in book" :key="item[0]">
      <v-col cols="12">
        <v-card class="mx-auto" max-width="500" elevation="2">
          <v-card-subtitle>{{ item[0] }}</v-card-subtitle>
        </v-card>
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
      showAddArea: false,
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
      book: [],
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

    const actor = await getActor(this.getIdentity());
    this.setGlobalLoading(true);
    const bookRes = await this.fetchBook();
    if (!bookRes) {
      // create book if not exist
      this.setGlobalLoading(true);
      await actor.createBook().then((res) => {
        console.log(res.msg);
      });
      this.setGlobalLoading(false);
    }
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
      this.fetchBook();
    },

    async fetchBook() {
      const actor = await getActor(this.identity());
      const bookRes = (await actor.getBook())[0];
      if (!bookRes) return [];
      if (bookRes.length === 0) {
        return [];
      }
      this.book = bookRes.reverse();
      console.log('[INFO] fetch book', this.book);
      return bookRes;
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
.home {
  overflow: scroll;
}
</style>