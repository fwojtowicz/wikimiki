import Home from '../src/components/pages/homePage/homePage';
import selectPage from '../src/components/pages/selectPage/selectPage';
import articlesPage from '../src/components/pages/articlesPage/articlesPage';

export const routes = [
    {
        path: '/', name: 'home', components: {
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
    }

];