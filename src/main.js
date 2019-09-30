import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store';
import { MdButton, MdContent, MdTabs, MdCard, MdIcon, MdToolbar, MdField, MdLayout } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '../node_modules/material-icons-font/material-icons-font.css'
import { firebaseConfig } from './firebase'
import firebase from 'firebase'

Vue.use(VueRouter);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdCard);
Vue.use(MdIcon);
Vue.use(MdToolbar);
Vue.use(MdField);
Vue.use(MdLayout);

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
});

let vm = new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app');
export const wikimiki = vm;
