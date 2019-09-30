<template>
  <div>
    <appHeader :title="title"></appHeader>
    <md-content>
      <md-field>
        <label>I'll look up for categories starting with the term provided</label>
        <md-input v-model="searchTerm"></md-input>
      </md-field>
      <md-button class="md-dense md-raised md-primary" @click="submitTerm">Search</md-button>
      <p>fullURL {{fullURL}}</p>
      <p>lastElement {{lastElement}}</p>
      <p>next url {{nextURL}}</p>
      <searchResults></searchResults>
      <hr />
      <md-button
        class="md-dense md-raised md-primary"
        @click="getPreviousPage"
        v-show=" dataAppended"
      >Previous page</md-button>
      <md-button
        class="md-dense md-raised md-primary"
        @click="getNextPage"
        v-show="dataDownloaded"
      >Next page</md-button>
    </md-content>
  </div>
</template>

<script>
import appHeader from "../../Header";
import searchResults from "../selectPage/searchResults";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "Select categories"
    };
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
    },
    dataAppended: {
      get() {
        return this.$store.getters.dataAppendedGetter;
      }
    },
    dataDownloaded: {
      get() {
        return this.$store.getters.dataDownloadedGetter;
      }
    }
  },
  components: {
    appHeader,
    searchResults
  },
  methods: {
    ...mapActions([
      "getCategoriesHandler",
      "getNextPageHandler",
      "getPreviousPageHandler"
    ]),
    submitTerm() {
      this.$store.dispatch("getCategoriesHandler");
    },
    getNextPage() {
      this.$store.dispatch("getNextPageHandler");
    },
    getPreviousPage() {
      this.$store.dispatch("getPreviousPageHandler");
    }
  }
};
</script>
 <style>
.md-content {
  padding: 0px 8px;
}
</style>
