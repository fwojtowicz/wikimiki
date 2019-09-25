<template>
  <div>
    <appHeader :title="title"></appHeader>
    <div>
      <md-content>
        <p>your selected categories</p>
        <div>
          <app-item
            v-for="(userCategories) in userCategories"
            :key="userCategories.categoryCard.title"
            :category="userCategories"
          ></app-item>
        </div>
      </md-content>
    </div>
  </div>
</template>
<script>
import appHeader from "../../Header";
import itemComponent from "../selectPage/itemComponent";

export default {
  data() {
    return { title: "Your articles" };
  },
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

