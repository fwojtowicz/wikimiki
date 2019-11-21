const fb = require("../firebase")
import axios from "axios";
export const actions = {

    fetchUserCategories({ commit, state }) {
        console.log('fetching user categories from firebase')
        state.userCategories = []
        console.log(state.currentUser)
        fb.auth.onAuthStateChanged(() => {
            if (state.currentUser) {
                fb.userCategoriesCollection.doc(state.currentUser.uid).get().then(response => {
                    console.log(response.data().categories)
                    commit('setUserCategories', response.data().categories)
                    console.log('state:', state.userCategories)
                })
            }
        })

    },

    clearData: ({ commit }) => {
        commit('setCurrentUser', null)
        commit('setUserProfile', {})
        commit("refreshArticlesPage");
        commit('refreshCategoriesPage')

        sessionStorage.clear();

    },
    getCategoriesHandler: ({ commit, dispatch, state }) => {
        state.dataDownloaded = true;
        state.filteredResults = []
        state.categoryInput = ""
        console.log("getting categories");
        console.log(state.fullURL)
        axios
            .get(state.fullURL)
            .then(response => {
                commit('setSearchResultsValue', response);
                console.log(state.lastElement);


            })
            .catch(error => console.log(error));
        // const newCategoriesArray = state.categoriesArray && state.categoriesArray.length && state.categoriesArray.map(element => {
        //     element.categoryCard.isChosen = state.userCategories && state.userCategories.some(category => category.categoryCard.title === element.categoryCard.title);
        //     return element;
        // })
        // console.log('newArr', newCategoriesArray);
        // if (newCategoriesArray) state.categoriesArray = newCategoriesArray;


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
                    commit('checkIfChosen', state.categoriesArray)
            })
            .catch(error => console.log(error));

    },
    getRandomSubcategoriesHandler: ({ state, dispatch }) => {
        console.log("getting articles");
        let randomCategory = state.userCategories[Math.floor(Math.random() * state.userCategories.length)].title
        axios
            .get(state.articlesSubcategoriesURL + 'Category:' + randomCategory + "&origin=*")
            .then(response => {
                if (response.data.query.categorymembers.length > 1) {
                    let subCatsArray = response.data.query.categorymembers
                    let randomSubCat = subCatsArray[Math.floor(Math.random() * subCatsArray.length)].title
                    console.log('randomsubcat', randomSubCat)
                    dispatch('getRandomArticleHandler', randomSubCat)

                }
                else if (response.data.query.categorymembers.length == 0) {
                    randomCategory = "Category:" + randomCategory
                    console.log('emptyArraOfSubcats', randomCategory)
                    dispatch('getRandomArticleHandler', randomCategory)

                }
            })
            .catch(error => console.log(error));
    },

    getRandomArticleHandler: ({ state, commit }, payload) => {
        axios.get(state.articlesURL + payload + "&origin=*").then(response => {
            console.log('categoryMembers', response)
            let randomArticleTitle = response.data.query.categorymembers[Math.floor(Math.random() * response.data.query.categorymembers.length)].title
            axios.get(state.articleContentURL + randomArticleTitle + "&origin=*").then(response => {
                console.log('articleContent', response)
                commit('saveArticleContent', Object.values(response.data.query.pages)[0])
            })

        })

    },

    getPreviousPageHandler: ({ commit }) => {
        console.log("previous categoriesPage");
        commit('getPreviousPage')
        commit('checkIfChosen', this.$store.state.categoriesArray)
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
    chooseCategory: ({ commit }, { categoryCard }) => {
        console.log(categoryCard)
        commit('chooseCategory', { categoryCard });
    },
    readArticleContent: ({ commit }) => {
        commit('readArticleContent')
    },
    setCurrentlyLoggedInUser({ commit }) {
        commit('setCurrentUser', fb.auth.currentUser)
    },

    fetchUserProfile({ commit }) {
        commit('setCurrentUser', fb.auth.currentUser)
    },
    checkIfChosen({ commit }, payload) {
        commit('checkIfChosen', payload)

    },




}