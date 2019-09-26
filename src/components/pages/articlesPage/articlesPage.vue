<template>
  <div>
    <appHeader :title="title"></appHeader>
  </div>
</template>

<script>
import appHeader from "../../Header";

export default {
  data() {
    return { title: "Your articles" };
  },
  components: {
    appHeader
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
  }
};
</script>


<style>
</style>