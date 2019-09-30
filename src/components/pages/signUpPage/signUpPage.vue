<template>
  <div>
    <h3>signup</h3>
    <input type="text" v-model="email" placeholder="email" />
    <br />
    <input type="text" v-model="password" placeholder="password" />
    <button @click="signup">signup</button>
    <router-link to="login">login</router-link>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    signup() {
      //   console.log(this.email);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function(user) {
            alert("account created");
          },
          function(err) {
            alert(err.message);
          }
        );
    }
  }
};
</script>

<style>
</style>