<template>
  <div>
    <appHeader></appHeader>
    <h1>Select categories</h1>
    <input type="text" />
    <button @click="submitTerm">Submit</button>
    <p>fullURL: {{fullURL}}</p>
    <p>lastElement {{lastElement}}</p>
    <p>next url {{nextURL}}</p>
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">{{ searchResult['*'] }}</li>
    </ul>
    <hr />
    <!-- <button @click="getNextPageHandler">Next page</button> -->
  </div>
</template>

<script>
import appHeader from "../../Header";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    searchTerm: {
      get() {
        return this.$store.getters.searchTerm;
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
        return this.$store.getters.searchResultsGetter;
      }
    }

    // searchResults() {
    //   return this.$store.getters.searchResultGetter;
    // },
    // fullURL() {
    //   return this.searchURL + this.term + "&origin=*";
    // },
    // nextURL() {
    //   return (
    //     this.searchURL + this.term + "&acfrom=" + this.lastElement + "&origin=*"
    //   );
    // }
  },

  components: {
    appHeader
  },
  methods: {
    ...mapActions(["getCategoriesHandler"]),
    submitTerm() {
      this.$store.dispatch("getCategoriesHandler");
    }

    // getNextPageHandler() {
    //   axios
    //     .get(this.nextURL)
    //     .then(response => {
    //       console.log(response);
    //       this.searchResults = response.data.query.allcategories;
    //       this.lastElement = this.searchResults[this.searchResults.length - 1][
    //         "*"
    //       ];
    //       console.log(this.lastElement);
    //     })
    //     .catch(error => console.log(error));
    // }
  }
};
</script>
