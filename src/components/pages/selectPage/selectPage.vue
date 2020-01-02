<template>
  <div>
    <appHeader></appHeader>
    <md-content style="background-color:rgb(250,250,250);">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-80">
          <md-field>
            <label>I'll look up for categories starting with the term provided</label>
            <md-input v-model="searchTerm"></md-input>
          </md-field>
          <md-button class="md-dense md-raised md-primary" @click="submitTerm">Search</md-button>
          <searchResults></searchResults>
          <md-divider></md-divider>
          <div>Page {{currentPageNumber}} of {{pageCounter}} downloaded</div>

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
        </div>
      </div>
    </md-content>

    <md-dialog-alert
      :md-active.sync="isEmpty"
      md-title="No category name!"
      md-content="Provide a keyword first"
    />
  </div>
</template>

<script>
import appHeader from "../../Header";
import searchResults from "../selectPage/searchResults";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isEmpty: false
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
      if (this.$store.state.searchTerm) {
        this.$store.commit("updateFullURL");
        this.$store.dispatch(
          "getCategoriesHandler",
          this.$store.state.searchTerm
        );
      } else {
        this.isEmpty = true;
      }
    },
    getNextPage() {
      this.$store.commit("updateNextURL");
      this.$store.dispatch("getNextPageHandler");
    },
    getPreviousPage() {
      this.$store.dispatch("getPreviousPageHandler");
    }
  },
  mounted() {
    this.$store.dispatch("checkIfCategoryChosen");
  }
};
</script>
 <style>
.md-content {
  padding: 0px 8px;
}
</style>
