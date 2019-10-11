import Vue from 'vue';
import Vuex from 'vuex';
import { Number } from 'core-js';
import { getters } from '../store/getters'
import { mutations } from '../store/mutations'
import { actions } from '../store/actions'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        dataDownloaded: false,
        dataAppended: false,
        searchTerm: "",
        lastElement: "",
        searchURL: "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&acmin=1&accontinue&acprefix=",
        articlesSubcategoriesURL: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtype=subcat&cmlimit=500&cmtitle=",
        articlesURL: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtype=page&cmlimit=500&cmtitle=",
        fullURL: "",
        nextURL: "",
        categoryInput: "",
        wikiResults: {},
        categoriesArray: [],
        filteredResults: [],
        userCategories: [],
        categoryCounter: 0,
        selectedCatCounter: 0,
        currentCategoryName: "",
        currentCategoryID: Number,
        pageArray: [],
        pageStart: 0,
        pageEnd: 0,
        pageCounter: 1,
        userProfile: {},
        email: "",
        password: "",
        name: "",
        currentUser: null,
        path: "",
        randomArticlesID: []
    },
    getters,
    mutations,
    actions,
});
