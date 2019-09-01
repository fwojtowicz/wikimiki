<template>
  <div class="autocomplete">
    <p>Select your categories</p>
    <input v-model="categoryInput" @input="onChange" type="text" />
    <p>We are looking for {{categoryInput}}</p>
    <div v-for="(filteredResult, i) in filteredResults" :key="i">
      <input v-model="userCategories" type="checkbox" @input="updateUserCategories" />
      <label>{{filteredResult['*']}}</label>
    </div>
    <hr />
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">{{ searchResult['*'] }}</li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isTypying: false
    };
  },
  computed: {
    searchResults: {
      get() {
        return this.$store.getters.searchResultGetter;
      }
    },
    categoryInput: {
      get() {
        return this.$store.getters.categoryInputGetter;
      },
      set(categoryInput) {
        this.$store.dispatch("updateCategoryInput", categoryInput);
      }
    },
    filteredResults: {
      get() {
        return this.$store.getters.filteredResultsGetter;
      },
      set(filteredResults) {
        this.$store.dispatch("updateFilteredResults", filteredResults);
      }
    },
    userCategories: {
      get() {
        return this.$store.getters.userCategoriesGetter;
      },
      set(userCategories) {
        this.$store.dispatch("updateUserCategories", userCategories);
      }
    }
  },
  methods: {
    ...mapActions(["updateFilteredResults", "updateUserCategories"]),

    onChange() {
      this.isTypying = true;
      this.$store.dispatch("updateFilteredResults");
    },

    updateUserCategories() {
      this.$store.dispatch("updateUserCategories");
    }
  }
};
</script>

<style>
</style>

