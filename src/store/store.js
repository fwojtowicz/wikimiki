import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { Number } from 'core-js';
const fb = require("../firebase")

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        dataDownloaded: false,
        dataAppended: false,
        searchTerm: "",
        lastElement: "",
        searchURL: "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&accontinue&acprefix=",
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
        path: ""
    },
    getters: {
        searchTermGetter: state => {
            return state.searchTerm;
        },
        wikiResultGetter: state => {
            return state.wikiResults;
        },
        searchURLGetter: state => {
            return state.searchURL;
        },
        fullURLGetter: state => {
            state.fullURL = state.searchURL + state.searchTerm + "&origin=*"
            return state.fullURL;
        },
        lastElementGetter: state => {
            return state.lastElement;
        },
        nextURLGetter: state => {
            state.nextURL = state.searchURL + state.searchTerm + "&acfrom=" + state.lastElement + "&origin=*";
            return state.nextURL;
        },
        categoryInputGetter: state => {
            return state.categoryInput;
        },
        filteredResultsGetter: state => {
            return state.filteredResults;
        },
        userCategoriesGetter: state => {
            return state.userCategories;
        },
        isChosenGetter: state => {
            return state.isChosen;
        },
        categoriesArrayGetter: state => {
            return state.categoriesArray;
        },
        currentCategoryIDGetter: state => {
            return state.currentCategoryID;
        },
        currentCategoryNameGetter: state => {
            return state.currentCategoryName;
        },
        indexOfToBeDeletedGetter: state => {
            return state.indexOfToBeDeleted;
        },
        pageArrayGetter: state => {
            return state.pageArray;
        },
        dataDownloadedGetter: state => {
            return state.dataDownloaded;
        },
        dataAppendedGetter: state => {
            return state.dataAppended;
        },
        emailGetter: state => {
            return state.email;
        },
        passwordGetter: state => {
            return state.password;
        },
        nameGetter: state => {
            return state.name
        },

    },
    mutations: {
        updateName(state, payload) {
            state.name = payload
        },
        updateSearchTerm(state, payload) {
            state.searchTerm = payload;
        },
        updateCategoryInput(state, payload) {
            state.categoryInput = payload;
        },
        updateCurrentCategoryID(state, payload) {
            state.currentCategoryID = payload
        },
        updateCurrentCategoryName(state, payload) {
            state.currentCategoryName = payload
        },
        updateEmail(state, payload) {
            state.email = payload
        },
        updatePassword(state, payload) {
            state.password = payload
        },
        setCurrentUser(state, response) {
            state.currentUser = response
        },
        setUserProfile(state, response) {
            state.userProfile = response
        },
        setUserCategories(state, response) {
            state.userCategories = response
        },

        setSearchResultsValue(state, response) {
            JSON.stringify(response.data)
            state.wikiResults = {}
            state.categoriesArray = []
            for (state.categoryCounter = 0; state.categoryCounter < 20; state.categoryCounter++) {
                state.wikiResults[state.categoryCounter] = ({
                    categoryCard: {
                        key: response.data.query.allcategories[state.categoryCounter]['*'],
                        title: response.data.query.allcategories[state.categoryCounter]['*'],
                        isChosen: false,
                    }
                })

            }
            state.categoriesArray = Object.values(state.wikiResults)
            state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].categoryCard.title;
            console.log(state.userCategories)
            state.pageArray = state.categoriesArray.map(element => {
                element.categoryCard.isChosen = state.userCategories.some(category => category.categoryCard.key === element.categoryCard.key);
                return element;
            })
            state.pageStart = 0
            state.pageEnd = 19
            console.log(state.pageStart)
            console.log(state.pageEnd)
            console.log(state.pageArray)
        },

        appendSearchResultsValue(state, response) {
            state.pageStart = state.pageEnd + 1
            state.pageEnd = state.pageStart + 19;
            console.log(state.pageStart)
            console.log(state.pageEnd)
            JSON.stringify(response.data)
            for (state.categoryCounter = 0; state.categoryCounter < 21; state.categoryCounter++) {
                state.wikiResults[state.categoryCounter] = ({
                    categoryCard: {
                        key: response.data.query.allcategories[state.categoryCounter]['*'],
                        title: response.data.query.allcategories[state.categoryCounter]['*'],
                        isChosen: false,
                    }
                })
            }
            state.newArray = Object.values(state.wikiResults)
            state.newArray.splice(0, 1);
            state.categoriesArray.push(...state.newArray);
            state.pageArray = state.newArray.map(element => element)
            state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].categoryCard.title;
            console.log(state.pageArray)
        },

        updateFilteredResults(state) {
            state.filteredResults = state.categoriesArray.filter(categoriesArray => categoriesArray.categoryCard.title
                .toLowerCase()
                .indexOf(state.categoryInput.toLowerCase()) > -1
            );
            if (state.categoryInput == "") {
                state.filteredResults = [];
            }
        },

        chooseCategory(state, payload) {
            let whichTable = ""

            if (payload == 'selectPage') {
                state.currentCategoryID = state.categoriesArray.map(e => e.categoryCard.title).indexOf(state.currentCategoryName);
                console.log(state.currentCategoryID)
                state.categoriesArray[state.currentCategoryID].categoryCard.isChosen = !state.categoriesArray[state.currentCategoryID].categoryCard.isChosen;
                whichTable = 'categoriesArray'
            }
            else if (payload == 'home') {
                state.currentCategoryID = state.userCategories.map(e => e.categoryCard.title).indexOf(state.currentCategoryName);
                console.log(state.currentCategoryID)
                whichTable = 'userCategories'
                state.userCategories[state.currentCategoryID].categoryCard.isChosen = !state.userCategories[state.currentCategoryID].categoryCard.isChosen;

            }
            store.dispatch('updateUserCategory', whichTable)
        },

        updateUserCategory(state, payload) {
            state.path = payload
            if (state[state.path][state.currentCategoryID].categoryCard.isChosen) {
                state.userCategories.push(state.categoriesArray[state.currentCategoryID])
                let userCategoriesFB = state.userCategories
                let user = fb.auth.currentUser

                fb.userCategoriesCollection
                    .doc(user.uid)
                    .set({
                        userCategoriesFB
                    })

            }
            else {
                let userCategoriesFB = state.userCategories
                let user = fb.auth.currentUser
                let indexOfToBeDeleted = 0
                console.log(payload)
                if (payload == 'categoriesArray') {
                    // state.categoriesArray[state.currentCategoryID].categoryCard.isChosen = !state.categoriesArray[state.currentCategoryID].categoryCard.isChosen;
                    indexOfToBeDeleted = (state.userCategories.findIndex(element => element.categoryCard.title === state.currentCategoryName))
                    console.log(indexOfToBeDeleted)
                    if (indexOfToBeDeleted !== -1) {
                        state.userCategories.splice(indexOfToBeDeleted, 1);
                    }
                } else if (payload == 'userCategories') {
                    indexOfToBeDeleted = (state.userCategories.findIndex(element => element.categoryCard.title === state.currentCategoryName))
                    console.log(indexOfToBeDeleted)
                    if (indexOfToBeDeleted !== -1) {
                        state.userCategories.splice(indexOfToBeDeleted, 1);
                    }
                    indexOfToBeDeleted = (state.categoriesArray.findIndex(element => element.categoryCard.title === state.currentCategoryName))
                    console.log(indexOfToBeDeleted)
                    state.categoriesArray[indexOfToBeDeleted].categoryCard.isChosen = false

                }

                fb.userCategoriesCollection
                    .doc(user.uid)
                    .set({
                        userCategoriesFB
                    })
                store.dispatch('fetchUserCategories')

                console.log(state.userCategories)

            }
        },
        getPreviousPage(state) {
            console.log(state.categoriesArray.length)
            console.log(state.pageStart)
            console.log(state.pageEnd)
            if (state.pageStart - 19 > 0 && state.pageEnd - 19 > 0) {
                state.pageStart = state.pageStart - 20
                state.pageEnd = state.pageEnd - 20
            }
            else {
                state.pageStart = 0; state.pageEnd = 19; state.dataAppended = 0
            }
            state.pageArray = []
            state.pageArray = state.categoriesArray.slice(state.pageStart, state.pageEnd + 1).map(element => element);
            state.lastElement = state.pageArray[state.pageArray.length - 1].categoryCard.title;
            console.log(state.pageArray)
            console.log(state.pageStart)
            console.log(state.pageEnd)
        },

        getRandomArticle(state, { commit }) {

        },


    },
    actions: {
        setCurrentlyLoggedInUser({ commit }) {
            commit('setCurrentUser', fb.auth.currentUser)
        },

        fetchUserProfile({ commit }) {
            commit('setCurrentUser', fb.auth.currentUser)
        },

        fetchUserCategories({ commit, state }) {
            fb.auth.onAuthStateChanged(() => {
                if (state.currentUser) {
                    fb.userCategoriesCollection.doc(state.currentUser.uid).get().then(response => {
                        console.log(response.data().userCategoriesFB)
                        commit('setUserCategories', response.data().userCategoriesFB)
                        console.log('state:', state.userCategories)
                    })
                }
            })
        },

        clearData: ({ commit }) => {
            commit('setCurrentUser', null)
            commit('setUserProfile', {})
        },
        getCategoriesHandler: ({ commit, state }) => {
            state.dataDownloaded = true;
            state.filteredResults = []
            state.categoryInput = ""
            console.log("getting categories");
            axios
                .get(state.fullURL)
                .then(response => {
                    commit('setSearchResultsValue', response);
                    console.log(state.lastElement);

                })
                .catch(error => console.log(error));
        },
        getNextPageHandler: ({ commit, state }) => {
            state.dataAppended = true;

            console.log("appending categories");
            axios
                .get(state.nextURL)
                .then(response => {
                    commit('appendSearchResultsValue', response);
                    console.log(state.lastElement);
                })
                .catch(error => console.log(error));
        },
        getRandomArticleHandler: ({ commit, state }) => {
            state.dataAppended = true;

            console.log("appending categories");
            axios
                .get(state.nextURL)
                .then(response => {
                    commit('appendSearchResultsValue', response);
                    console.log(state.lastElement);
                })
                .catch(error => console.log(error));
        },

        getPreviousPageHandler: ({ commit }) => {
            console.log("previous categoriesPage");
            commit('getPreviousPage')
        },
        updateSearchTerm: ({ commit }, payload) => {
            console.log("updating searchTerm");
            commit('updateSearchTerm', payload);
        },
        updateCategoryInput: ({ commit }, payload) => {
            console.log("updating categoryInput");
            commit('updateCategoryInput', payload);
        },
        updateFilteredResults: ({ commit }, payload) => {
            console.log("updating filteredResults");
            commit('updateFilteredResults', payload);
        },
        setResult: ({ commit }, payload) => {
            console.log(" setResult");
            commit('setResult', payload);
        },
        updateCurrentCategoryID: ({ commit }, payload) => {
            commit('updateCurrentCategoryID', payload);
        },
        updateCurrentCategoryName: ({ commit }, payload) => {
            commit('updateCurrentCategoryName', payload);
        },
        updateUserCategory: ({ commit }, payload) => {
            commit('updateUserCategory', payload);
        },
        updateEmail: ({ commit }, payload) => {
            commit('updateEmail', payload)
        },
        updatePassword: ({ commit }, payload) => {
            commit('updatePassword', payload)
        },
        updateName: ({ commit }, payload) => {
            commit('updateName', payload)
        },
        chooseCategory: ({ commit }, payload) => {
            commit('chooseCategory', payload);
        },
    }

});
