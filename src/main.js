import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from '../src/router/index'
import { store } from './store/store';
import { MdButton, MdContent, MdTabs, MdCard, MdIcon, MdToolbar, MdField, MdLayout } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import '../node_modules/material-icons-font/material-icons-font.css'
const fb = require("./firebase")


Vue.use(VueRouter);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdCard);
Vue.use(MdIcon);
Vue.use(MdToolbar);
Vue.use(MdField);
Vue.use(MdLayout);

Vue.config.productionTip = false;

fb.auth.onAuthStateChanged(user => {
  let wikimiki;
  if (!wikimiki) wikimiki = new Vue({
    store,
    render: h => h(App),
    router,
  }).$mount('#app');
  global.vm = wikimiki;
})