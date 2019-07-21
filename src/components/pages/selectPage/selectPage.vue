<template>
  <div>
    <appHeader></appHeader>
    <h1>Select categories</h1>
    <input type="text" v-model="term" />
    <button @click="getCategoriesHandler">Submit</button>
    <p>Term: {{fullURL}}</p>
    <p>lastElement {{lastElement}}</p>
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">{{ searchResult['*'] }}</li>
    </ul>
    <hr />
    <ul>
      <li v-for="searchResult2 in searchResults2" :key="searchResult2.id">{{ searchResult2['*'] }}</li>
    </ul>
    <button>Next page</button>
  </div>
</template>

<script>
import appHeader from "../../Header";
import axios from "axios";

export default {
  data() {
    return {
      searchResults: [],
      searchResults2: [],
      searchURL:
        "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&accontinue&acprefix=",
      term: "",
      lastElement: null
    };
  },
  computed: {
    fullURL() {
      return this.searchURL + this.term + "&origin=*";
    }
  },
  components: {
    appHeader
  },
  methods: {
    getCategoriesHandler() {
      console.log("getting categories");
      axios
        .get(this.fullURL)
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


// this.searchURL +
//               this.term +
//               "acfrom=" +
//               this.searchResults[this.searchResults.length - 1]["*"] +
//               "&origin=*"