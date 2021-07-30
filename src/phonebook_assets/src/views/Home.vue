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
    <contact-card
      :records="book"
      @delete="handleDelete"
      :loading="bookLoading"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { getActor, getAuthClient } from '../service';
import router from '../router';
import ContactCard from '../components/ContactCard.vue';

export default {
  components: { ContactCard },
  data: () => ({
    bookLoading: false,
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
  }),

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
      this.bookLoading = true;
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
          this.formData = {};
          this.setGlobalLoading(false);
          this.formData = {
            name: '',
            phone: '',
            desc: '',
          };
          this.valid = true;
          this.showAddArea = false;
        });
      this.fetchBook();
    },

    async fetchBook() {
      this.bookLoading = true;
      const actor = await getActor(this.identity());
      const bookRes = (await actor.getBook())[0];
      if (!bookRes) return [];
      if (bookRes.length === 0) {
        this.bookLoading = false;
        return [];
      }
      const resReverse = bookRes.reverse();
      this.book = resReverse.map((item) => {
        return {
          name: item[0],
          description: item[1].desc,
          phone: item[1].phone,
        };
      });
      console.log('[INFO] fetch book', this.book);
      this.bookLoading = false;
      return this.book;
    },

    async handleDelete(name) {
      const actor = await getActor(this.identity());
      this.bookLoading = true;
      actor.delete(name).then((res) => {
        console.log(res.msg);
        this.fetchBook();
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
.home {
  overflow: scroll;
}
</style>