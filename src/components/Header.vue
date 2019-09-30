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
import firebase from "firebase";
import router from "../router/router";
export default {
  props: ["title"],
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.replace("loginPage");
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
