<template>
  <div>
    <div>
      <appHeader :title="title"></appHeader>
      <md-button
        class="md-dense md-raised md-primary"
        v-show="(this.$store.state.userCategories.length)!=0"
        @click="getRandomSubcategoriesHandler"
      >GET</md-button>
      <div class="md-layout">
        <div class="md-layout-item">
          <article-item
            v-for="(userArticle, i) in userArticles"
            :key="i"
            :randomArticle="userArticle"
          ></article-item>
        </div>
      </div>
      <hr />
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
    },

    userCategories: {
      get() {
        return this.$store.getters.userCategoriesGetter;
      }
    },
    userArticles: function() {
      return this.$store.state.userArticles;
    }
  },
  components: {
    articleItem: articleComponent,
    appHeader
  },

  methods: {
    ...mapActions(["getRandomSubcategoriesHandler"]),
    getRandomSubcategoriesHandler() {
      this.$store.dispatch("getRandomSubcategoriesHandler");
    }
  },

  mounted() {
    console.log(this.userCategories);
    this.$store.dispatch("fetchUserCategories");
    this.$store.dispatch("readArticleContent");
    this.$store.dispatch("fetchUserArticlesHandler");
    // this.$store.dispatch("");
  }
};
</script>


<style>
</style>