<template>
  <div class="wikiResults">
    <p>Select your categories</p>
    <input v-model="categoryInput" @input="onChange" type="text" />
    <p>We are looking for {{categoryInput}}</p>
    <div class="md-layout md-gutter">
      <div v-for="(filteredResult, i) in filteredResults" :key="i">
        <md-card>
          <md-card-header>
            <div class="md-title">{{filteredResult.categoryCard.title}}</div>
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
    <hr />
    <div v-if="!categoryInput"></div>
    <app-item
      v-for="category in categoriesArray"
      :key="category.categoryCard.key"
      :category="category"
    ></app-item>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import itemComponent from "./itemComponent";

export default {
  components: { appItem: itemComponent },
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

