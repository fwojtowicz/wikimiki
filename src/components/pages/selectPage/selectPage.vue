<template>
  <div>
    <appHeader :title="title"></appHeader>
    <md-content>
      <md-field>
        <label>I'll look up for categories starting with the term provided</label>
        <md-input v-model="searchTerm"></md-input>
      </md-field>
      <md-button class="md-dense md-raised md-primary" @click="submitTerm">Search</md-button>
      <searchResults></searchResults>
      <hr />
      <md-button
        class="md-dense md-raised md-primary"
        @click="getPreviousPage"
        v-show=" dataAppended && this.$store.state.currentPageNumber > 1"
      >Previous page</md-button>
      <md-button
        class="md-dense md-raised md-primary"
        @click="getNextPage"
        v-show="dataDownloaded"
      >Next page</md-button>
      <h3>page {{currentPageNumber}} of {{pageCounter}} downloaded</h3>
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
    },
    pageCounter: {
      get() {
        return this.$store.getters.pageCounterGetter;
      }
    },
    currentPageNumber: {
      get() {
        return this.$store.getters.currentPageNumberGetter;
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
      this.$store.commit("updateFullURL");
      this.$store.dispatch(
        "getCategoriesHandler",
        this.$store.state.searchTerm
      );
    },
    getNextPage() {
      this.$store.commit("updateNextURL");
      this.$store.dispatch("getNextPageHandler");
    },
    getPreviousPage() {
      this.$store.dispatch("getPreviousPageHandler");
    }
  },
  created() {
    this.$store.dispatch("fetchUserCategories");
  }
};
</script>
 <style>
.md-content {
  padding: 0px 8px;
}
</style>
