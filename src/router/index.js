import Home from '../components/pages/homePage/homePage';
import selectPage from '../components/pages/selectPage/selectPage';
import articlesPage from '../components/pages/articlesPage/articlesPage';
import loginPage from '../components/pages/loginPage/loginPage'
import firebase from 'firebase'
import VueRouter from 'vue-router';



const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', name: 'home', components: {
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
            path: '*', redirect: '/home'
        }


    ]
});

export default router;
