<template>
  <div>
    <div>
      <appHeader :title="title"></appHeader>
      <md-button
        class="md-dense md-raised md-primary"
        v-show="(this.$store.state.userCategories.length)!=0"
        @click="getRandomSubcategories"
      >GET</md-button>
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
      },
      userCategories: {
        get() {
          return this.$store.getters.userCategoriesGetter;
        }
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

  mounted() {
    console.log(this.userCategories);
    this.$store.dispatch("fetchUserCategories");
    this.$store.dispatch("readArticleContent");
  }
};
</script>


<style>
</style>