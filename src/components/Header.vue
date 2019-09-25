<template>
  <div>
    <md-toolbar md-elevation="1">
      <h3 class="md-title" style="flex: 1">
        {{title
        }}
      </h3>
      <md-button>
        <router-link to="/">Home</router-link>
      </md-button>
      <md-button>
        <router-link to="/selectPage">Select Categories</router-link>
      </md-button>
      <md-button>
        <router-link to="/articlesPage">Your articles</router-link>
      </md-button>
      <md-button>Logout</md-button>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style scoped>
.md-toolbar {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
