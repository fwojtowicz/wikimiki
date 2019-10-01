<template>
  <div>
    <md-tabs md-sync-route class="md-primary" md-alignment="fixed">
      <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
      <md-tab id="tab-articles" md-label="Your articles" to="articlesPage"></md-tab>
      <md-tab id="tab-select" md-label="Select Categories" to="selectPage"></md-tab>
      <md-tab id="tab-logout" md-label="Logout" @click="logout"></md-tab>
    </md-tabs>
    <h3 class="md-title" style="flex: 1; padding:10px">
      {{title
      }}
    </h3>
  </div>
</template>

<script>
const fb = require("../firebase");
import router from "../router/index";
export default {
  props: ["title"],
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-tabs {
  margin-bottom: 16px;
}
</style>
