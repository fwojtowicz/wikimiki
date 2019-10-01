<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent>
      <input type="text" v-model="email" placeholder="email" />
      <br />
      <input type="password" v-model="password" placeholder="password" />
      <button @click="login">Sign in</button>
      <div>
        Go to
        <router-link to="/signup">signup</router-link>
      </div>
    </form>
  </div>
</template>

<script>
const fb = require("../../../firebase");
import router from "../../../router/index";

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
  },
  methods: {
    login() {
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$store.dispatch("fetchUserProfile");
          router.push("/home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>