<template>
  <div>
    <div class="md-layout md-gutter">
      <md-card>
        <md-card-header>
          <div class="md-title">{{ category.categoryCard.title }} {{category.categoryCard.key}}</div>
        </md-card-header>
        <md-card-actions>
          <md-button
            v-bind:class="{chosen: isChosen}"
            class="md-icon-button"
            @click="updateUserCategories"
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
        this.$store.dispatch("updateUserCategories", userCategories);
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
    ...mapActions([
      "updateFilteredResults",
      "updateUserCategories",
      "updateCurrentCategory"
    ]),

    onChange() {
      this.isTypying = true;
      this.$store.dispatch("updateFilteredResults");
    },

    updateUserCategories() {
      this.currentCategory = this.category.categoryCard.key;
      this.$store.dispatch("updateUserCategories");
    }
  }
};
</script>

<style  scoped>
.chosen {
  background-color: #f44336;
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>

