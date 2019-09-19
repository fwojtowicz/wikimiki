<template>
  <div>
    <appHeader></appHeader>
    <md-content>
      <h1>Select categories</h1>
      <input type="text" v-model="searchTerm" />
      <button @click="submitTerm">Submit</button>
      <p>fullURL: {{fullURL}}</p>
      <p>lastElement: {{lastElement}}</p>
      <p>next url {{nextURL}}</p>
      <searchResults></searchResults>
      <hr />
      <button @click="getNextPage" v-show="dataDownloaded">Next page</button>
    </md-content>
  </div>
</template>

<script>
import appHeader from "../../Header";
import searchResults from "../../searchResults";
import { mapActions } from "vuex";

export default {
  data() {
    return { dataDownloaded: false };
  },
  computed: {
    searchTerm: {
      get() {
        return this.$store.getters.searchTermGetter;
      },
      set(searchTerm) {
        this.$store.dispatch("updateSearchTerm", searchTerm);
      }
    },
    fullURL: {
      get() {
        return this.$store.getters.fullURLGetter;
      }
    },
    lastElement: {
      get() {
        return this.$store.getters.lastElementGetter;
      }
    },
    nextURL: {
      get() {
        return this.$store.getters.nextURLGetter;
      }
    },
    searchResults: {
      get() {
        return this.$store.getters.searchResultGetter;
      }
    }
  },

  components: {
    appHeader,
    searchResults
  },
  methods: {
    ...mapActions(["getCategoriesHandler", "getNextPageHandler"]),
    submitTerm() {
      this.dataDownloaded = true;
      this.$store.dispatch("getCategoriesHandler");
    },
    getNextPage() {
      this.$store.dispatch("getNextPageHandler");
    }
  }
};
</script>
 <style scoped>
.md-content {
  padding: 1px 16px;
}
</style>
