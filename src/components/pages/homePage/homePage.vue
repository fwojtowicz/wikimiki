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
    <md-empty-state
      v-if="userCategories.length==0"
      class="md-accent"
      md-rounded
      md-icon="bookmark"
      md-label="Nothing in Categories"
      md-description="Search for categories you're interested in."
    ></md-empty-state>
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
