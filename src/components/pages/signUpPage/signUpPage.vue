<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
    />
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-70">
        <div class="app-title">Wikimiki</div>
        <div class="app-subtitle">Explore Wikipedia easily</div>
        <md-toolbar class="md-dense md-primary">
          <h3 class="md-title">Sign Up</h3>
        </md-toolbar>
        <form @submit.prevent>
          <md-field>
            <label>Name</label>
            <md-input v-model="name" placeholder="name"></md-input>
          </md-field>
          <md-field>
            <label>E-mail address</label>
            <md-input v-model="email" placeholder="email"></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-button class="md-primary md-raised md-bottom-left" @click="signUp">Sign up</md-button>
          <md-button to="/login" class="md-accent">Go to login</md-button>
        </form>
      </div>
      <div class="app-error animated fadeInUp" v-if="this.error">{{this.error}}</div>
    </div>
  </div>
</template>

<script>
const fb = require("../../../firebase");
import router from "../../../router/index";
export default {
  data() {
    return { error: "" };
  },
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
          this.error = err;
        });
      this.$store.commit("initializeArray");
    }
  }
};
</script>

<style>
</style>