import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        searchTerm: "",
        lastElement: "",
        wikiResults: [],
        searchURL: "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&accontinue&acprefix=",
        fullURL: "",
        nextURL: "",
        categoryInput: "",
        filteredResults: [],
        userCategories: []

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
            console.log(response.data.query.allcategories)
            state.wikiResults = response.data.query.allcategories;
            state.lastElement = state.wikiResults[state.wikiResults.length - 1][
                "*"];
        },
        appendSearchResultsValue(state, response) {
            state.wikiResults.pop();
            const newArray = [...state.wikiResults, ...response.data.query.allcategories]
            state.wikiResults = newArray;
            state.lastElement = state.wikiResults[state.wikiResults.length - 1][
                "*"];
        },
        updateFilteredResults(state) {
            state.filteredResults = state.wikiResults.filter(
                wikiResults =>
                    wikiResults["*"]
                        .toLowerCase()
                        .indexOf(state.categoryInput.toLowerCase()) > -1
            );
            if (state.categoryInput == "") {
                state.filteredResults = [];
            }
        },

        updateUserCategories(state, payload) {
            console.log(typeof (payload))
            console.log((payload['*']))
            state.userCategories.push(payload);
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
