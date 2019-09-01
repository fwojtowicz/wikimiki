<template>
  <div class="autocomplete">
    <p>Select your categories</p>
    <input v-model="categoryInput" @input="onChange" type="text" />
    <p>We are looking for {{categoryInput}}</p>
    <ul v-show="isTypying" class="autocomplete-results">
      <li
        v-for="(filteredResult, i) in filteredResults"
        :key="i"
        @click="setResult(filteredResult)"
        class="autocomplete-result"
      >{{filteredResult['*']}}</li>
    </ul>
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
    }
  },
  methods: {
    ...mapActions(["updateFilteredResults"]),

    onChange() {
      this.isTypying = true;
      this.$store.dispatch("updateFilteredResults");
    },

    setResult() {
      this.$store.dispatch("setResult");
    }
  }
};
</script>

<style>
</style>

