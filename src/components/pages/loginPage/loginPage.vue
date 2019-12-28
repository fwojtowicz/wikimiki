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
          <h3 class="md-title">Login</h3>
        </md-toolbar>
        <form @submit.prevent>
          <md-field>
            <label>E-mail address</label>
            <md-input v-model="email" placeholder="email"></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-button class="md-primary md-raised md-bottom-left" @click="login">Sign in</md-button>
          <md-button to="/signup" class="md-accent">Go to signup</md-button>
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
    }
  },
  methods: {
    login() {
      this.error = "";
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.commit("setCurrentUser", user);
          this.$store.dispatch("fetchUserProfile");
          router.push("/home");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style>
.md-button {
  float: right;
  right: 0px;
}
.app-title {
  text-align: center;
  padding-top: 20px;
  font-size: 30px;
  font-family: "Linux Libertine";
}
.app-subtitle {
  text-align: center;
  padding: 30px;
  font-size: 15px;
  color: rgb(128, 128, 128);
}
.app-error {
  text-align: center;
  color: red;
}
</style>