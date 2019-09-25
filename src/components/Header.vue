<template>
  <div>
    <md-tabs md-snc-route class="md-primary" md-alignment="fixed">
      <md-tab md-label="Home" to="/"></md-tab>
      <md-tab md-label="Your articles" to="articlesPage"></md-tab>
      <md-tab md-label="Select Categories" to="selectPage"></md-tab>
    </md-tabs>
    <h3 class="md-title" style="flex: 1; padding:10px">
      {{title
      }}
    </h3>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
.md-tabs {
  margin-bottom: 16px;
}
</style>
