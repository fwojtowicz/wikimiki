<template>
  <div>
    <div>
      <appHeader :title="title"></appHeader>
      <md-button class="md-dense md-raised md-primary" @click="getRandomSubcategories">GET</md-button>
      <ul>
        <li v-for="(randomArticle, i) in randomArticles" :key="i">
          <div v-html="randomArticle.extract"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import appHeader from "../../Header";
import { mapActions } from "vuex";

export default {
  data() {
    return { title: "Your articles" };
  },
  computed: {
    randomArticles: {
      get() {
        return this.$store.getters.randomArticlesGetter;
      }
    }
  },
  components: {
    appHeader
  },

  methods: {
    ...mapActions(["getRandomSubcategoriesHandler"]),
    getRandomSubcategories() {
      this.$store.dispatch("getRandomSubcategoriesHandler");
    }
  },
  mounted() {
    this.$store.dispatch("fetchUserCategories");
  }
};
</script>


<style>
</style>