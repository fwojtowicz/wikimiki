<template>
  <div>
    <div class="md-layout md-gutter">
      <md-card>
        <md-card-header>
          <div class="md-title">{{ category.categoryCard.title }}</div>
        </md-card-header>
        <md-card-actions>
          <md-button
            v-bind:class="{'md-accent': category.categoryCard.isChosen}"
            class="md-icon-button"
            @click="chooseCategoryHandler"
          >
            <md-icon>favorite</md-icon>
          </md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["category"],
  data() {
    return {
      isTypying: false,
      componentRoute: this.$route.name
    };
  },
  computed: {
    wikiResults: {
      get() {
        return this.$store.getters.wikiResultGetter;
      }
    },
    categoryInput: {
      get() {
        return this.$store.getters.categoryInputGetter;
      },
      set(categoryInput) {
        this.$store.dispatch("updateCategoryInput", categoryInput);
      }
    },
    filteredResults: {
      get() {
        return this.$store.getters.filteredResultsGetter;
      },
      set(filteredResults) {
        this.$store.dispatch("updateFilteredResults", filteredResults);
      }
    },
    userCategories: {
      get() {
        return this.$store.getters.userCategoriesGetter;
      },
      set(userCategories) {
        this.$store.dispatch("chooseCategory", userCategories);
      }
    },
    isChosen: {
      get() {
        return this.$store.getters.isChosenGetter;
      }
    },
    categoriesArray: {
      get() {
        return this.$store.getters.categoriesArrayGetter;
      }
    },
    currentCategoryID: {
      get() {
        return this.$store.getters.currentCategoryIDGetter;
      },
      set(currentCategoryID) {
        this.$store.dispatch("updateCurrentCategoryID", currentCategoryID);
      }
    },
    currentCategoryName: {
      get() {
        return this.$store.getters.currentCategoryNameGetter;
      },
      set(currentCategoryName) {
        this.$store.dispatch("updateCurrentCategoryName", currentCategoryName);
      }
    }
  },

  methods: {
    ...mapActions([
      "updateFilteredResults",
      "chooseCategory",
      "updateCurrentCategoryID"
    ]),

    onChange() {
      this.isTypying = true;
      this.$store.dispatch("updateFilteredResults");
    },

    chooseCategoryHandler() {
      this.$store.dispatch("chooseCategory", {
        categoryCard: this.category.categoryCard
      });
      // this.currentCategoryName = this.category.categoryCard.title;
      // this.currentCategoryID = this.category.categoryCard.key;
      // console.log(this.currentCategoryName);
      // console.log(this.currentCategoryID);

      // //this.$store.dispatch("chooseCategory", this.componentRoute);
      // this.chooseCategory(this.componentRoute);
    }
  },

  mounted() {
    console.log(this.$route.name);
  }
};
</script>

<style lang="scss" scoped>
.chosen {
  color: #f44336;
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

