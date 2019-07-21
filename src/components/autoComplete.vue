<template>
  <div class="autocomplete">
    <p>Select your categories</p>
    <input v-model="categoryInput" @input="onChange" type="text" />
    <p>We are looking for {{categoryInput}}</p>
    <ul v-show="isTypying" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
      >{{result}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryInput: "",
      results: [],
      isTypying: false
    };
  },
  methods: {
    onChange() {
      this.isTypying = true;
      this.filterResults();
    },
    filterResults() {
      this.results = this.items.filter(
        item =>
          item.toLowerCase().indexOf(this.categoryInput.toLowerCase()) > -1
      );
    },
    setResult(result) {
      this.categoryInput = result;
      this.isTypying = false;
    }
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    categories: []
  }
};
</script>

<style>
</style>

