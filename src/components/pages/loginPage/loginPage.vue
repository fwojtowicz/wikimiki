<template>
  <div>
    <h3>login</h3>
    <router-link to="signup">signup</router-link>
    <input type="text" v-model="email" placeholder="email" />
    <br />
    <input type="text" v-model="password" placeholder="password" />
    <button @click="login">test</button>
  </div>
</template>

<script>
import { wikimiki } from "../../../main";
import firebase from "firebase";
import { router } from "../../../router/router";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            alert("connection estabilished");
          },
          function(err) {
            alert(err.message);
          }
        );
      //   wikimiki.$router.replace("home");
    }
  }
};
</script>

<style>
</style>