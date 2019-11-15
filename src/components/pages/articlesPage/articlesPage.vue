<template>
  <div>
    <div>
      <appHeader :title="title"></appHeader>
      <md-button class="md-dense md-raised md-primary" @click="getRandomSubcategories">GET</md-button>
      <div class="md-layout">
        <div class="md-layout-item">
          <article-item
            v-for="(randomArticle, i) in randomArticles"
            :key="i"
            :randomArticle="randomArticle"
          ></article-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from "../../Header";
import { mapActions } from "vuex";
import articleComponent from "./articleComponent";

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
    articleItem: articleComponent,
    appHeader
  },

  methods: {
    ...mapActions(["getRandomSubcategoriesHandler"]),
    getRandomSubcategories() {
      this.$store.dispatch("getRandomSubcategoriesHandler");
    }
  },
  created() {
    this.$store.dispatch("fetchUserCategories");
    this.$store.dispatch("checkifChosen");
  },
  mounted() {
    this.$store.dispatch("readArticleContent");
  }
};
</script>


<style>
</style>