<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{randomArticle.title}}</div>
    </md-card-header>
    <md-card-expand>
      <md-card-actions>
        <div>
          <md-button class="md-icon-button">
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
export default {
  props: ["randomArticle"],

  computed: {
    randomArticles: {
      get() {
        return this.$store.getters.randomArticlesGetter;
      }
    }
  }
};
</script>

<style>
</style>