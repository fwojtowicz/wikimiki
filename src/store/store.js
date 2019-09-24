import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        searchTerm: "",
        lastElement: "",
        wikiResults: {},
        searchURL: "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&accontinue&acprefix=",
        fullURL: "",
        nextURL: "",
        categoryInput: "",
        categoryCounter: 0,
        filteredResults: [],
        userCategories: [],
        categoriesArray: [],

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
            state.nextURL = state.searchURL + state.searchTerm + "&acfrom=" + state.lastElement + "&origin=*"
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
        }
    },
    mutations: {
        updateSearchTerm(state, payload) {
            state.searchTerm = payload;
        },
        updateCategoryInput(state, payload) {
            state.categoryInput = payload;
        },

        setSearchResultsValue(state, response) {
            JSON.stringify(response.data)
            for (state.categoryCounter = 0; state.categoryCounter < response.data.query.allcategories.length; state.categoryCounter++) {
                state.wikiResults[state.categoryCounter] = ({
                    categoryCard: {
                        key: state.categoryCounter,
                        title: response.data.query.allcategories[state.categoryCounter]['*'],
                        isChosen: false,
                    }
                })
                // state.categoryCard.title = response.data.query.allcategories[state.categoryCounter]['*']
                // state.categoryCard.isChosen = false;
                // console.log('title')
                // console.log(state.categoryCard.title)
                // state.wikiResults.push(state.categoryCard);
                // console.log(response.length)
                // console.log(response.data.query.allcategories.length)
                // console.log(response.data.query.allcategories[state.categoryCounter])
                // console.log(response.data.query.allcategories[state.categoryCounter]['*'])

            }

            state.categoriesArray = Object.values(state.wikiResults)
            console.log(state.wikiResults)
            console.log(state.categoriesArray)
            state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].categoryCard.title;
        },
        appendSearchResultsValue(state, response) {
            state.categoriesArray.pop();
            const newArray = [...state.categoriesArray, ...response.data.query.allcategories]
            state.categoriesArray = newArray;
            state.lastElement = state.categoriesArray[state.categoriesArray.length - 1][
                "*"];
            console.log(state.categoriesArray.length)
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

        updateUserCategories(state, payload) {
            // console.log("btn works")
            // console.log(typeof (payload))
            state.categoriesArray.categoryCard.isChosen = true
            console.log(state.state.wikiResults.title)
            // console.log((payload))
            // state.userCategories.push(payload);
            // console.log(state.userCategories)
        }
    },
    actions: {
        getCategoriesHandler: ({ commit, state }) => {
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
            console.log("appending categories");
            axios
                .get(state.nextURL)
                .then(response => {
                    commit('appendSearchResultsValue', response);
                    console.log(state.lastElement);
                })
                .catch(error => console.log(error));
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
        updateUserCategories: ({ commit }, payload) => {
            console.log(" updateUserCategories");
            commit('updateUserCategories', payload);
        }

    }

});
