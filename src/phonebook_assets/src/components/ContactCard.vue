<template>
  <div>
    <v-data-iterator
      :items="records"
      item-key="name"
      hide-default-footer
      no-data-text=""
      v-if="!loading"
    >
      <template v-slot:default="{ items }">
        <v-row dense>
          <v-col v-for="item in items" :key="item.name" cols="12">
            <v-card class="mx-auto" max-width="500" elevation="2">
              <v-card-title
                class="d-flex justify-space-between align-center py-2 px-4"
              >
                <h5>{{ item.name }}</h5>
                <v-card-actions>
                  <v-btn
                    small
                    text
                    color="grey"
                    @click="handleDelete(item.name)"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    <span class="font-weight-medium">Phone</span>
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.phone }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <span class="font-weight-medium">Description</span>
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.description }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <div v-if="loading">
      <v-row dense v-for="item in skeleton" :key="item">
        <v-col cols="12">
          <v-skeleton-loader
            max-width="500"
            elevation="2"
            style="background-color: whitesmoke"
            class="mx-auto"
            type="article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    skeleton: [1, 2, 3],
  }),

  props: ['records', 'loading'],

  methods: {
    handleDelete(name) {
      this.$emit('delete', name);
    },
  },
};
</script>

<style>
</style>