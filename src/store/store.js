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
        indexOfToBeDeleted: 0,
        currentCategoryName: "",
        currentCategoryID: Number,
        pageArray: [],
        pageStart: 0,
        pageEnd: 0,
        pageCounter: 1,
        email: "",
        password: "",
        currentUser: null,
        userProfile: {},
        name: ""


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
        updatecurrentCategoryID(state, payload) {
            state.currentCategoryID = payload
        },
        updatecurrentCategoryName(state, payload) {
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
            // console.log(state.userProfile)
        },
        setUserCategories(state, response) {
            store.userCategories = response
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
            // console.log(state.categoriesArray)
            state.pageArray = state.categoriesArray.map(element => element)
            state.pageStart = 0
            // state.pageEnd = response.data.query.allcategories.length;
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
            // console.log(state.newArray)
            state.newArray.splice(0, 1);
            // console.log(state.selectedCatCounter)
            // console.log(state.newArray)
            // state.categoriesArray = state.newArray
            state.categoriesArray.push(...state.newArray);
            state.pageArray = state.newArray.map(element => element)
            // console.log(state.pageStart)
            // console.log(state.pageEnd)
            // console.log(state.categoriesArray)

            state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].categoryCard.title;
            // console.log(state.categoriesArray)
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

        chooseCategory(state) {
            console.log(state.currentCategoryName)
            state.currentCategoryID = state.categoriesArray.map(e => e.categoryCard.title).indexOf(state.currentCategoryName);
            console.log(state.currentCategoryID)
            state.categoriesArray[state.currentCategoryID].categoryCard.isChosen = !state.categoriesArray[state.currentCategoryID].categoryCard.isChosen;
            store.dispatch('updateUserCategory')
        },

        updateUserCategory(state) {
            console.log(state.currentCategoryID)

            if (state.categoriesArray[state.currentCategoryID].categoryCard.isChosen) {
                state.userCategories.push(state.categoriesArray[state.currentCategoryID]);
                let userCategoriesFB = state.userCategories
                let user = fb.auth.currentUser
                console.log(user)
                console.log(userCategoriesFB)
                fb.userCategoriesCollection
                    .doc(user.uid)
                    .set({
                        userCategoriesFB
                    })
                store.dispatch('fetchUserCategories')


                // console.log(state.currentCategoryID)
                // console.log(state.selectedCatCounter)
                // state.selectedCatCounter++;
                // console.log(state.userCategories)
            }
            else {
                let userCategoriesFB = state.userCategories
                let user = fb.auth.currentUser
                state.indexOfToBeDeleted = (state.userCategories.findIndex(element => element.categoryCard.title === state.currentCategoryName))
                // if (state.userCategories.length == 0) {
                //     // state.selectedCatCounter = 0;
                // }

                console.log(state.userCategories)

                state.userCategories.splice(state.indexOfToBeDeleted, 1);
                fb.userCategoriesCollection
                    .doc(user.uid)
                    .set({
                        userCategoriesFB
                    })
                store.dispatch('fetchUserCategories')
                // console.log
            }

        },
        getPreviousPage(state) {
            // state.pageArray = []
            console.log(state.categoriesArray.length)
            console.log(state.pageStart)
            console.log(state.pageEnd)
            if (state.pageStart - 19 > 0 && state.pageEnd - 19 > 0) {
                state.pageStart = state.pageStart - 20
                state.pageEnd = state.pageEnd - 20
            }
            else { state.pageStart = 0; state.pageEnd = 19; state.dataAppended = 0 }


            // if (state.pageStart - 12 >= 0)
            //     state.dataAppended = false;
            // console.log('previous page')

            // state.pageStart = (state.categoriesArray.length - 20);
            // console.log(state.pageStart)
            // state.pageEnd = state.pageStart - 20;
            // if (state.pageStart - 20 >= 0) {
            //     state.pageEnd = state.pageStart - 20
            // }
            // else state.pageEnd = 0;
            state.pageArray = []

            state.pageArray = state.categoriesArray.slice(state.pageStart, state.pageEnd + 1).map(element => element);
            state.lastElement = state.pageArray[state.pageArray.length - 1].categoryCard.title;
            console.log(state.pageArray)
            console.log(state.pageStart)
            console.log(state.pageEnd)

            // console.log(state.lastElement)

            // // state.pageStart = state.pageEnd;
            // console.log(state.pageArray)
            // console.log(state.pageEnd)

            // console.log(state.pageStart)
        },


    },
    actions: {
        setCurrentlyLoggedInUser({ commit }) {
            commit('setCurrentUser', fb.auth.currentUser)
            // console.log(fb.auth.currentUser)
        },

        fetchUserProfile({ commit }) {
            // fb.usersCollection.doc(state.currentUser.user.uid).get().then(response => {
            //     commit('setUserProfile', response.data())
            commit('setCurrentUser', fb.auth.currentUser)

            // }).catch(err => {
            //     console.log(err);
        }



        ,
        fetchUserCategories({ commit, state }) {
            fb.auth.onAuthStateChanged(() => {
                if (state.currentUser) {
                    console.log(state.currentUser.uid)
                    fb.userCategoriesCollection.doc(state.currentUser.uid).get().then(response => {
                        // let data = response.data();
                        // console.log(response.data().userCategoriesFB);

                        // response.forEach(doc => {
                        //     console.log(doc.id, "=>", doc.data())
                        // })
                        commit('setUserCategories', response.data().userCategoriesFB)
                        console.log(store.userCategories)
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

        getPreviousPageHandler: ({ commit, state }) => {
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
        updatecurrentCategoryID: ({ commit }, payload) => {
            // console.log(" updatecurrentCategoryID");
            commit('updatecurrentCategoryID', payload);
        },
        updatecurrentCategoryName: ({ commit }, payload) => {
            // console.log(" updatecurrentCategoryName");
            commit('updatecurrentCategoryName', payload);
        },
        chooseCategory: ({ commit }, payload) => {
            // console.log(" chooseCategory");
            commit('chooseCategory', payload);
        },
        updateUserCategory: ({ commit }, payload) => {
            // console.log(" updateUserCategory");
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

    }

});
