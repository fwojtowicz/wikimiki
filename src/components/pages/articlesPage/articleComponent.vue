<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{randomArticle.title}}</div>
    </md-card-header>
    <md-card-expand>
      <md-card-actions>
        <div>
          <md-button class="md-icon-button" @click="openArticle">
            <md-icon>launch</md-icon>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>favorite</md-icon>
          </md-button>
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </div>
      </md-card-actions>
      <md-card-expand-content>
        <md-card-content v-html="randomArticle.extract"></md-card-content>
      </md-card-expand-content>
      <div></div>
    </md-card-expand>
  </md-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["randomArticle"],
  data() {
    return {
      wikiURL: "https://en.wikipedia.org/wiki/" + this.randomArticle.title
    };
  },
  computed: {
    randomArticles: {
      get() {
        return this.$store.getters.randomArticlesGetter;
      }
    }
  },
  methods: {
    // ...mapActions(["openArticleHandler"]),
    openArticle() {
      // console.log(this.wikiURL);
      window.open(this.wikiURL, "_blank");
      //this.$store.dispatch("openArticleHandler", this.wikiURL);
    }
  }
};
</script>

<style>
</style>