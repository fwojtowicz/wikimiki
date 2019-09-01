<template>
  <div class="autocomplete">
    <p>Select your categories</p>
    <input v-model="categoryInput" @input="onChange" type="text" />
    <p>We are looking for {{categoryInput}}</p>
    <ul v-show="isTypying" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
      >{{result["*"]}}</li>
    </ul>
    <hr />
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">{{ searchResult['*'] }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryInput: "",
      results: [],
      isTypying: false
    };
  },
  computed: {
    searchResults: {
      get() {
        return this.$store.getters.searchResultGetter;
      }
    }
  },
  methods: {
    onChange() {
      this.isTypying = true;
      this.filterResults();
      if (this.categoryInput == "") {
        this.results = [];
      }
    },
    filterResults() {
      this.results = this.searchResults.filter(
        searchResult =>
          searchResult["*"]
            .toLowerCase()
            .indexOf(this.categoryInput.toLowerCase()) > -1
      );
    },
    setResult(result) {
      this.categoryInput = result;
      this.isTypying = false;
    }
  }
};
</script>

<style>
</style>

