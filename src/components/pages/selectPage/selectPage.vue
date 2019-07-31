<template>
  <div>
    <appHeader></appHeader>
    <h1>Select categories</h1>
    <input type="text" v-model="term" />
    <button @click="submitTerm">Submit</button>
    <p>Term: {{fullURL}}</p>
    <p>lastElement {{lastElement}}</p>
    <p>next url {{nextURL}}</p>
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">{{ searchResult['*'] }}</li>
    </ul>
    <hr />
    <button @click="getNextPageHandler">Next page</button>
  </div>
</template>

<script>
import appHeader from "../../Header";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      searchURL:
        "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&accontinue&acprefix=",
      term: "",
      lastElement: null
    };
  },
  computed: {
    searchResults() {
      return this.$store.getters.searchResultGetter;
    },
    fullURL() {
      return this.searchURL + this.term + "&origin=*";
    },
    nextURL() {
      return (
        this.searchURL + this.term + "&acfrom=" + this.lastElement + "&origin=*"
      );
    }
  },
  components: {
    appHeader
  },
  methods: {
    ...mapActions(["getCategoriesHandler"]),
    submitTerm() {
      this.$store.dispatch("getCategoriesHandler");
    },
    getNextPageHandler() {
      axios
        .get(this.nextURL)
        .then(response => {
          console.log(response);
          this.searchResults = response.data.query.allcategories;
          this.lastElement = this.searchResults[this.searchResults.length - 1][
            "*"
          ];
          console.log(this.lastElement);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
