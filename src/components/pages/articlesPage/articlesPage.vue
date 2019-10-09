<template>
  <div>
    <appHeader :title="title"></appHeader>
    <md-button class="md-dense md-raised md-primary" @click="getRandomSubcategories">GET</md-button>
  </div>
</template>

<script>
import appHeader from "../../Header";
import { mapActions } from "vuex";

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
  },
  methods: {
    ...mapActions(["getRandomSubcategoriesHandler"]),
    getRandomSubcategories() {
      this.$store.dispatch("getRandomSubcategoriesHandler");
    }
  },
  mounted() {
    this.$store.dispatch("fetchUserCategories");
  }
};
</script>


<style>
</style>