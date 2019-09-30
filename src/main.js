import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';
import { MdButton, MdContent, MdTabs, MdCard, MdIcon, MdToolbar, MdField, MdLayout } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '../node_modules/material-icons-font/material-icons-font.css'
import { firebaseConfig } from './firebase'
import firebase from 'firebase'
import router from './router/router'

let vm = '';
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdCard);
Vue.use(MdIcon);
Vue.use(MdToolbar);
Vue.use(MdField);
Vue.use(MdLayout);

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() => {
  if (!vm) {

    vm = new Vue({
      store,
      render: h => h(App),
      router,
    }).$mount('#app');

  }
})
export const wikimiki = vm;
Vue.config.productionTip = false;



