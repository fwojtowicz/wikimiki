import Home from '../src/components/pages/homePage/homePage';
import selectPage from '../src/components/pages/selectPage/selectPage';
import articlesPage from '../src/components/pages/articlesPage/articlesPage';
import loginPage from '../src/components/pages/loginPage/loginPage';
import signUpPage from '../src/components/pages/signUpPage/signUpPage';

export const routes = [
    {
        path: '/home', name: 'home', components: {
            default: Home,
        }
    },
    {
        path: '/selectPage', name: 'selectPage', components:
        {
            default: selectPage,

        }
    },
    {
        path: '/articlesPage', name: 'articlesPage', components: {
            default: articlesPage
        }
    },
    {
        path: '/login', name: 'loginPage', components: {
            default: loginPage
        }
    },
    {
        path: '/signup', name: 'signUpPage', components: {
            default: signUpPage
        }
    }

];