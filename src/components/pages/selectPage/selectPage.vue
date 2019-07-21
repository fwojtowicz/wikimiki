<template>
  <div>
    <appHeader></appHeader>
    <h1>Select categories</h1>
    <autoComplete
      :items="[ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple']"
    />
  </div>
</template>

<script>
import autoComplete from "../../autoComplete";
import appHeader from "../../Header";

export default {
  components: {
    autoComplete,
    appHeader
  }
};
</script>
