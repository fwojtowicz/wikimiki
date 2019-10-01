<template>
  <div>
    <h1>Sign Up</h1>
    <input type="text" v-model="email" placeholder="email" />
    <br />
    <input type="password" v-model="password" placeholder="password" />
    <button>Sign up</button>
    <div>
      Go back to
      <router-link to="/login">login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    email: {
      get() {
        return this.$store.getters.emailGetter;
      },
      set(email) {
        this.$store.dispatch("updateEmail", email);
      }
    },
    password: {
      get() {
        return this.$store.getters.passwordGetter;
      },
      set(password) {
        this.$store.dispatch("updatePassword", password);
      }
    }
  }
};
</script>

<style>
</style>