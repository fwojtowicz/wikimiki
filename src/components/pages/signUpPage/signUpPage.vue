<template>
  <div>
    <h1>Sign Up</h1>

    <input type="text" v-model="name" placeholder="name" />
    <br />
    <input type="text" v-model="email" placeholder="email" />
    <br />
    <input type="password" v-model="password" placeholder="password" />

    <button @click="signUp">Sign up</button>
    <div>
      Go back to
      <router-link to="/login">login</router-link>
    </div>
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
    },
    name: {
      get() {
        return this.$store.getters.nameGetter;
      },
      set(name) {
        this.$store.dispatch("updateName", name);
      }
    }
  },
  methods: {
    signUp() {
      console.log(this.email);
      console.log(this.password);
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log("userCreated");
          this.$store.commit("setCurrentUser", user);
          console.log(user);
          console.log(user.user.uid);

          fb.usersCollection
            .doc(user.user.uid)
            .set({
              name: this.name
            })
            .then(() => {
              console.log("didUsersCollection");
              // if (this.$store.state.userCategoriesFB != null)
              // this.$store.dispatch("fetchUserCategories");
              router.push("/home");
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.commit("initializeArray");
    }
  }
};
</script>

<style>
</style>