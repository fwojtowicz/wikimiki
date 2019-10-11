<template>
  <div>
    <h3>Select your categories</h3>
    <md-field>
      <label>Search for a more specific category</label>
      <md-input v-model="categoryInput" @input="onChange"></md-input>
    </md-field>

    <div class="md-layout">
      <app-item
        class="md-layout-item"
        v-for="(filteredResult, i) in filteredResults"
        :key="i"
        :category="filteredResult"
      ></app-item>
    </div>
    <hr />
    <div v-if="!categoryInput"></div>
    <div class="md-layout">
      <app-item
        class="md-layout-item"
        v-for="category in pageArray"
        :key="category.categoryCard.title"
        :category="category"
      ></app-item>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import categoryComponent from "./categoryComponent";

export default {
  components: { appItem: categoryComponent },
  data() {
    return {
      isTypying: false
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
    pageArray: {
      get() {
        return this.$store.getters.pageArrayGetter;
      }
    },
    currentCategory: {
      get() {
        return this.$store.getters.currentCategoryGetter;
      },
      set(currentCategory) {
        this.$store.dispatch("updateCurrentCategory", currentCategory);
      }
    }
  },

  methods: {
    ...mapActions(["updateFilteredResults", "chooseCategory"]),

    onChange() {
      this.isTypying = true;
      this.$store.dispatch("updateFilteredResults");
    },

    chooseCategory() {
      this.$store.dispatch("chooseCategory");
    }
  },
  mounted() {
    this.$store.dispatch("fetchUserCategories");
  }
};
</script>

<style lang="scss">
.chosen {
  background-color: #f44336;
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.md-layout-item {
  margin: 10px;
  padding: 25px;
}
</style>

