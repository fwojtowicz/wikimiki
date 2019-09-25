import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import { Number } from 'core-js';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
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
        currentCategoryID: Number

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
        currentCategoryNametter: state => {
            return state.currentCategoryName;
        },
        // selectedCatCounterGetter: state => {
        //     return state.selectedCatCounter;
        // }
    },
    mutations: {
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

        setSearchResultsValue(state, response) {
            JSON.stringify(response.data)
            for (state.categoryCounter = 0; state.categoryCounter < 10; state.categoryCounter++) {
                state.wikiResults[state.categoryCounter] = ({
                    categoryCard: {
                        key: state.categoryCounter,
                        title: response.data.query.allcategories[state.categoryCounter]['*'],
                        isChosen: false,
                    }
                })

            }
            state.categoriesArray = Object.values(state.wikiResults)
            state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].categoryCard.title;
            console.log(state.categoriesArray)
        },
        appendSearchResultsValue(state, response) {
            JSON.stringify(response.data)
            for (state.categoryCounter = 0; state.categoryCounter < response.data.query.allcategories.length; state.categoryCounter++) {
                state.wikiResults[state.categoryCounter] = ({
                    categoryCard: {
                        key: state.categoryCounter + state.categoriesArray.length,
                        title: response.data.query.allcategories[state.categoryCounter]['*'],
                        isChosen: false,
                    }
                })
            }
            state.newArray = Object.values(state.wikiResults)
            state.categoriesArray.pop();
            state.categoriesArray.push(...state.newArray);
            state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].categoryCard.title
        },

        updateFilteredResults(state) {
            state.filteredResults = state.categoriesArray.filter(categoriesArray => categoriesArray.categoryCard.title
                .toLowerCase()
                .indexOf(state.categoryInput.toLowerCase()) > -1
            );
            if (state.categoryInput == "") {
                state.filteredResults = [];
            }
            // console.log(state.filteredResults)

        },

        chooseCategory(state) {
            // console.log(this.state.currentCategoryID);
            // console.log(this.state.currentCategoryName);

            state.categoriesArray[state.currentCategoryID].categoryCard.isChosen = !state.categoriesArray[state.currentCategoryID].categoryCard.isChosen;
            // console.log(state.categoriesArray[state.currentCategoryID].categoryCard.isChosen)
            store.dispatch('updateUserCategory')
        },

        updateUserCategory(state) {
            if (state.categoriesArray[state.currentCategoryID].categoryCard.isChosen) {
                state.userCategories[state.selectedCatCounter] = state.categoriesArray[state.currentCategoryID];
                state.selectedCatCounter++
                console.log(state.currentCategoryName)

                console.log(state.userCategories)


            }
            else {
                console.log(state.currentCategoryName)
                let index = (state.userCategories.findIndex(element => element.categoryCard.title === state.currentCategoryName))

                // state.userCategories.splice(state.currentCategoryName, 1)
                //     state.userCategories = state.userCategories.filter(userCategories => userCategories != (undefined || null || ''));
                console.log(index)
                console.log(state.userCategories)

            }
            // if (state.categoriesArray[state.currentCategoryID].categoryCard.isChosen == false) {
            //     console.log(this.currentCategoryID);
            //     state.userCategories.splice(state.currentCategoryID, 1)
            //     console.log(state.userCategories)
            //     state.userCategories = state.userCategories.filter(userCategories => userCategories != (undefined || null || ''));

            // }

            // else {
            //     console.log(this.currentCategoryID);
            //     state.userCategories[state.selectedCatCounter] = state.categoriesArray[state.currentCategoryID];
            //     state.selectedCatCounter++;
            //     console.log(state.userCategories)
            //     state.userCategories = state.userCategories.filter(userCategories => userCategories != (undefined || null || ''));

            // }
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
        updatecurrentCategoryID: ({ commit }, payload) => {
            console.log(" updatecurrentCategoryID");
            commit('updatecurrentCategoryID', payload);
        },
        updatecurrentCategoryName: ({ commit }, payload) => {
            console.log(" updatecurrentCategoryName");
            commit('updatecurrentCategoryName', payload);
        },
        chooseCategory: ({ commit }, payload) => {
            console.log(" chooseCategory");
            commit('chooseCategory', payload);
        },
        updateUserCategory: ({ commit }, payload) => {
            console.log(" updateUserCategory");
            commit('updateUserCategory', payload);
        },


    }

});
