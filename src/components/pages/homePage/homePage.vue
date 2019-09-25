<template>
  <div>
    <appHeader :title="title"></appHeader>
    <md-content>
      <p>blah</p>
    </md-content>
  </div>
</template>
<script>
import appHeader from "../../Header";

export default {
  data() {
    return { title: "Home" };
  },
  components: {
    appHeader
  }
};
</script>
<style>
</style>
