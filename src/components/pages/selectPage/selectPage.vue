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
      dataDownloaded: false,
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
 <style>
.md-content {
  padding: 0px 8px;
}
</style>
