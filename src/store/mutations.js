const fb = require("../firebase")
export const mutations = {

    saveArticlesID(state, payload) {
        state.randomArticlesID.push(payload)
        console.log(state.randomArticlesID)
    },
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

    getNextPage(state, response) {
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
        this.dispatch('updateUserCategory', whichTable)
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
                // if (state.categoriesArray) {
                //     indexOfToBeDeleted = (state.categoriesArray.findIndex(element => element.categoryCard.title === state.currentCategoryName))
                //     console.log(indexOfToBeDeleted)
                //     state.categoriesArray[indexOfToBeDeleted].categoryCard.isChosen = false
                // }


            }

            fb.userCategoriesCollection
                .doc(user.uid)
                .set({
                    userCategoriesFB
                })
            this.dispatch('fetchUserCategories')

            console.log(state.userCategories)

        }
    },

    checkifChosen(state) {
        console.log('just checking')
        state.categoriesArray = state.categoriesArray.map(element => {
            element.categoryCard.isChosen = state.userCategories.some(category => category.categoryCard.title === element.categoryCard.title);
            return element;
        })


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
    }
}