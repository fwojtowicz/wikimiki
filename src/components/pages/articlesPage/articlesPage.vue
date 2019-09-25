<template>
  <div>
    <appHeader></appHeader>

    <h1>Articles</h1>
    <p>your selected categories</p>
    <div v-if="userCategories.length >0">
      <app-item
        v-for="(userCategories) in userCategories"
        :key="userCategories.id"
        :category="userCategories"
      ></app-item>
    </div>
  </div>
</template>
<script>
import appHeader from "../../Header";
import itemComponent from "../selectPage/itemComponent";

export default {
  components: {
    appHeader,
    appItem: itemComponent
  },
  computed: {
    userCategories: {
      get() {
        return this.$store.getters.userCategoriesGetter;
      },
      set(userCategories) {
        this.$store.dispatch("chooseCategory", userCategories);
      }
    }
  },
  methods: {}
};
</script>

