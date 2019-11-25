import VueRouter from 'vue-router';
import { store } from '../store/store';
import { routes } from '../router/routes'

const router = new VueRouter({
    mode: 'history',
    routes: routes
})


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    store.dispatch('setCurrentlyLoggedInUser')



    if (requiresAuth && !store.state.currentUser) {
        next('/login')
    } else if (!requiresAuth && store.state.currentUser) {
        next()
    } else {
        next()
    }
})
export default router;
