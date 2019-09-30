import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import firebase from 'firebase'

Vue.use(VueRouter);

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(entry => entry.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})
export default router