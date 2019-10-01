import Home from '../components/pages/homePage/homePage';
import selectPage from '../components/pages/selectPage/selectPage';
import articlesPage from '../components/pages/articlesPage/articlesPage';
import loginPage from '../components/pages/loginPage/loginPage'
import signUpPage from '../components/pages/signUpPage/signUpPage'
import firebase from 'firebase'
import VueRouter from 'vue-router';



const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home', name: 'home', components: {
                default: Home,
            },
            meta: {
                requiresAuth: true

            }
        },
        {
            path: '/selectPage', name: 'selectPage', components:
            {
                default: selectPage,

            }, meta: {
                requiresAuth: true

            }

        },
        {
            path: '/articlesPage', name: 'articlesPage', components: {
                default: articlesPage
            }, meta: {
                requiresAuth: true

            }
        },
        {
            path: '/login', name: 'login', component: loginPage

        },
        {
            path: '/signup', name: 'signup', component: signUpPage
        },
        {
            path: '*', redirect: '/home'
        }


    ]
});
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})
export default router;
