<template>
  <div class>
    <md-tabs md-sync-route class="md-primary" md-alignment="fixed">
      <md-tab id="tab-home" md-label="Your categories" to="/" exact></md-tab>
      <md-tab id="tab-articles" md-label="Your articles" to="articlesPage"></md-tab>
      <md-tab id="tab-select" md-label="Select categories" to="selectPage"></md-tab>
      <md-tab id="tab-logout" md-label="Logout" @click="logout"></md-tab>
    </md-tabs>
    <div class="app-error animated fadeInUp" v-if="this.error">{{this.error}}</div>
  </div>
</template>

<script>
const fb = require("../firebase");
import router from "../router/index";
export default {
  data() {
    return { error: "" };
  },
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style scoped>
.md-tabs {
  margin-bottom: 16px;
}
</style>
