<template>
  <div>
    <appHeader></appHeader>
    <h1>Select categories</h1>
    <input type="text" v-model="searchTerm" />
    <button @click="submitTerm">Submit</button>
    <p>fullURL: {{fullURL}}</p>
    <p>lastElement: {{lastElement}}</p>
    <p>next url {{nextURL}}</p>
    <autoComplete></autoComplete>
    <!-- <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">{{ searchResult['*'] }}</li>
    </ul>-->
    <hr />
    <button @click="getNextPage" v-show="dataDownloaded">Next page</button>
  </div>
</template>

<script>
import appHeader from "../../Header";
import autoComplete from "../../autoComplete";
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
    autoComplete
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
