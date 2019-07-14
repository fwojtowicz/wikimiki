<template>
  <div id="app">
    <autoComplete
      :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']"
    />
  </div>
</template>

<script>
import selectPage from "./components/pages/selectPage.vue";
import autoComplete from "./components/autoComplete";

export default {
  name: "app",
  components: {
    selectPage,
    autoComplete
  }
};
</script>

<style>
</style>
