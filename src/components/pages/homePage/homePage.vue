<template>
  <div>
    <appHeader></appHeader>
    <div>
      <md-content>
        <div
          class="md-layout md-alignment-center-center"
          style="background-color:rgb(250,250,250);"
        >
          <app-item
            class="md-layout-item md-size-80"
            v-for="(userCategories, key) in userCategories"
            :category="userCategories"
            :key="key"
          ></app-item>
        </div>
      </md-content>
    </div>
  </div>
</template>
<script>
import appHeader from "../../Header";
import categoryComponent from "../selectPage/categoryComponent";

export default {
  components: {
    appHeader,
    appItem: categoryComponent
  },
  computed: {
    userCategories: {
      get() {
        return this.$store.getters.userCategoriesGetter;
      }
    }
  },

  mounted() {
    if (this.userCategories != null)
      this.$store.dispatch("fetchUserCategories");
  }
};
</script>
<style scoped>
</style>
