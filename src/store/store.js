import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        searchTerm: "music",
        lastElement: "",
        searchResults: [],
        newArray: [],
        searchURL: "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&accontinue&acprefix=",
        fullURL: "",
        nextURL: ""

    },
    getters: {
        searchTermGetter: state => {
            return state.searchTerm;
        },
        searchResultGetter: state => {
            return state.searchResults;
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
        }


    },
    mutations: {
        updateSearchTerm: (state, payload) => {
            state.searchTerm = payload;
        },
        setSearchResultsValue: (state, response) => {
            state.searchResults = response.data.query.allcategories;
            state.lastElement = state.searchResults[state.searchResults.length - 1][
                "*"];
        },
        appendSearchResultsValue: (state, response) => {
            state.newArray = response.data.query.allcategories;
            state.lastElement = state.newArray[state.newArray.length - 1][
                "*"];
            state.searchResults.concat(state.newArray)

        },

    },

    actions: {
        getCategoriesHandler: ({ commit, state }) => {
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
            axios
                .get(state.nextURL)
                .then(response => {
                    commit('appendSearchResultsValue', response);
                    console.log(state.lastElement);
                    console.log(state.searchResults);
                })
                .catch(error => console.log(error));
        },
        updateSearchTerm: ({ commit }, payload) => {
            console.log("updating searchTerm");
            commit('updateSearchTerm', payload);
        }
    }
});