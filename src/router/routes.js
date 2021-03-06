import Home from '../components/pages/homePage/homePage';
import selectPage from '../components/pages/selectPage/selectPage';
import articlesPage from '../components/pages/articlesPage/articlesPage';
import loginPage from '../components/pages/loginPage/loginPage'
import signUpPage from '../components/pages/signUpPage/signUpPage'

export const routes = [

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
];