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
            @click="chooseCategory"
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
        this.$store.dispatch("updatecurrentCategoryID", currentCategoryID);
      }
    }
  },

  methods: {
    ...mapActions([
      "updateFilteredResults",
      "chooseCategory",
      "updatecurrentCategoryID"
    ]),

    onChange() {
      this.isTypying = true;
      this.$store.dispatch("updateFilteredResults");
    },

    chooseCategory() {
      this.currentCategoryID = this.category.categoryCard.key;
      this.$store.dispatch("chooseCategory");
    }
  }
};
</script>

<style  scoped>
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

