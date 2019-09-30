import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from '../router/routes';
import firebase from 'firebase'

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});


router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) next('login'); else if (!requiresAuth && currentUser) next('home');
    else next();
});

export default router;
