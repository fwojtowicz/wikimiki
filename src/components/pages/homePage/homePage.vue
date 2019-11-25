<template>
  <div>
    <appHeader :title="title"></appHeader>
    <div>
      <md-content>
        <p>your selected categories</p>
        <div class="md-layout">
          <app-item
            class="md-layout-item"
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
  data() {
    return {
      title: "Home"
    };
  },
  components: {
    appHeader,
    appItem: categoryComponent
  },
  computed: {
    userCategories: {
      get() {
        return this.$store.getters.userCategoriesGetter;
      }
      // set(userCategories) {
      //   this.$store.dispatch("chooseCategory", userCategories);
      // }
    }
  },

  mounted() {
    // console.log(this.userCategories);
    if (this.userCategories != null)
      this.$store.dispatch("fetchUserCategories");
  }
};
</script>
<style lang="scss" scoped>
</style>
