const fb = require("../firebase")
import axios from "axios";
export const actions = {

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
        state.categoriesArray = state.categoriesArray.map(element => {
            element.categoryCard.isChosen = state.userCategories.some(category => category.categoryCard.title === element.categoryCard.title);
            return element;
        })
        if (state.pageArray)
            commit('checkifChosen')
    },
    getNextPageHandler: ({ commit, state }) => {
        state.dataAppended = true;

        console.log("appending categories");
        axios
            .get(state.nextURL)
            .then(response => {
                commit('getNextPage', response);
                console.log(state.lastElement);
                if (state.pageArray)
                    commit('checkifChosen')
            })
            .catch(error => console.log(error));

    },
    getRandomSubcategoriesHandler: ({ state, dispatch }) => {
        console.log("getting articles");
        let randomCategory = state.userCategories[Math.floor(Math.random() * state.userCategories.length)].categoryCard.title
        axios
            .get(state.articlesSubcategoriesURL + 'Category:' + randomCategory + "&origin=*")

            .then(response => {
                if (response.data.query.categorymembers.length > 1) {
                    let subCatsArray = response.data.query.categorymembers
                    console.log('randomSubCat')
                    console.log(response)
                    let randomSubCat = subCatsArray[Math.floor(Math.random() * subCatsArray.length)].title
                    console.log(randomSubCat)
                    dispatch('getRandomArticlesHandler', randomSubCat)

                }
                else if (response.data.query.categorymembers.length == 0) {
                    console.log('emptyArraOfSubcats')
                    console.log(response)
                    randomCategory = "Category:" + randomCategory
                    console.log(randomCategory)
                    dispatch('getRandomArticlesHandler', randomCategory)

                }


            })
            .catch(error => console.log(error));
    },
    getRandomArticlesHandler: ({ commit, state }, payload) => {
        console.log('randomArticleHere')
        axios.get(state.articlesURL + payload + "&origin=*").then(response => {
            console.log(response)

            let randomArticleID = response.data.query.categorymembers[Math.floor(Math.random() * response.data.query.categorymembers.length)].pageid
            let randomArticleTitle = response.data.query.categorymembers[Math.floor(Math.random() * response.data.query.categorymembers.length)].title
            console.log(randomArticleID)
            commit('saveArticlesID', { randomArticleTitle, randomArticleID })

        })

    },
    getPreviousPageHandler: ({ commit }) => {
        console.log("previous categoriesPage");
        commit('getPreviousPage')
        commit('checkifChosen')
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