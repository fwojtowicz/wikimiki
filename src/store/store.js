import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);
let searchURL = "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&aclimit=max&format=json&accontinue&acprefix=";
let lastElement = "";
let fullURL = searchURL + "1970" + "&origin=*";

export const store = new Vuex.Store({
    state: {
        searchResults: []
    },
    getters: {
        searchResultGetter: state => {
            return state.searchResults;

        }
    },
    mutations: {
        setSearchResultsValue: (state, response) => {
            state.searchResults = response.data.query.allcategories;
            state.lastElement = state.searchResults[state.searchResults.length - 1][
                "*"];
            console.log(lastElement);
        }

    },

    actions: {
        getCategoriesHandler: ({ commit }) => {
            console.log("getting categories");
            axios
                .get(fullURL)
                .then(response => {
                    console.log(response);
                    commit('setSearchResultsValue', response)
                })
                .catch(error => console.log(error));
        }
    }
});