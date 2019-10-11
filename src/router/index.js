import Home from '../components/pages/homePage/homePage';
import selectPage from '../components/pages/selectPage/selectPage';
import articlesPage from '../components/pages/articlesPage/articlesPage';
import loginPage from '../components/pages/loginPage/loginPage'
import signUpPage from '../components/pages/signUpPage/signUpPage'
import firebase from 'firebase'
import VueRouter from 'vue-router';
import { store } from '../store/store';
import { routes } from '../router/routes'



const router = new VueRouter({
    mode: 'history',
    routes: routes
    // routes: [
    //     {
    //         path: '/home', name: 'home', components: {
    //             default: Home,
    //         },
    //         meta: {
    //             requiresAuth: true

    //         }
    //     },
    //     {
    //         path: '/selectPage', name: 'selectPage', components:
    //         {
    //             default: selectPage,

    //         }, meta: {
    //             requiresAuth: true

    //         }

    //     },
    //     {
    //         path: '/articlesPage', name: 'articlesPage', components: {
    //             default: articlesPage
    //         }, meta: {
    //             requiresAuth: true

    //         }
    //     },
    //     {
    //         path: '/login', name: 'login', component: loginPage

    //     },
    //     {
    //         path: '/signup', name: 'signup', component: signUpPage
    //     },
    //     {
    //         path: '*', redirect: '/home'
    //     }


    // ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    store.dispatch('setCurrentlyLoggedInUser')
    // console.log(store.state.currentUser)
    // debugger
    // if (to.matched.some(x => x.meta.requiresAuth)) {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (!user) {
    //             next('/login')
    //         }
    //         else {
    //             store.commit('setUserProfile', user)
    //             next();
    //         }
    //     })
    // } else {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user) {
    //             store.commit('setUserProfile', user)
    //             next();
    //         } else next()

    //     })
    // }


    if (requiresAuth && !store.state.currentUser) {
        next('/login')
    } else if (!requiresAuth && store.state.currentUser) {
        next()
    } else {
        next()
    }
})
export default router;
