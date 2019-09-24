<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{ category.categoryCard.title }}</div>
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
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["category", "filteredResults"],
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
    // filteredResults: {
    //   get() {
    //     return this.$store.getters.filteredResultsGetter;
    //   },
    //   set(filteredResults) {
    //     this.$store.dispatch("updateFilteredResults", filteredResults);
    //   }
    // },
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
    }
  },

  methods: {
    ...mapActions(["updateFilteredResults", "updateUserCategories"]),

    onChange() {
      this.isTypying = true;
      this.$store.dispatch("updateFilteredResults");
    },

    updateUserCategories() {
      this.$store.dispatch("updateUserCategories");
    }
  }
};
</script>

<style scoped>
.md-content {
  padding: 1px 16px;
}
</style>