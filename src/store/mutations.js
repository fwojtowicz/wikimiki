const fb = require("../firebase")
export const mutations = {
    initializeArray(state) {
        let categoryCard = {
            title: "",
            isChosen: false,
        }
        console.log("ARRAY INITIALIZED")
        state.categoriesArray.push(categoryCard)
    },

    saveArticleContent(state, payload) {
        let articleCard = {
            key: payload.pageid,
            title: payload.title,
            content: payload.extract,
            isChosen: false
        }

        state.randomArticles.push(articleCard)
        sessionStorage.setItem('randomArticlesArray', JSON.stringify(state.randomArticles))
        console.log('saving articles to sessionStorage')
        console.log(state.randomArticles)


    },
    readArticleContent(state) {
        if (sessionStorage.getItem('randomArticlesArray'))
            state.randomArticles = JSON.parse(sessionStorage.getItem('randomArticlesArray'))
        console.log(state.randomArticles)

    },
    deleteArticle(state, { articleCard }) {
        state.randomArticles.splice((state.randomArticles.indexOf(articleCard)), 1)
        sessionStorage.setItem('randomArticlesArray', JSON.stringify(state.randomArticles))
        console.log('saving articles to sessionStorage')
        console.log(state.randomArticles)


    },
    updateName(state, payload) {
        state.name = payload;
    },
    updateSearchTerm(state, payload) {
        state.searchTerm = payload;
    },
    updateFullURL(state) {
        state.fullURL = state.searchURL + state.searchTerm + "&origin=*"
    },
    updateNextURL(state) {
        state.nextURL = state.searchURL + state.searchTerm + "&acfrom=" + state.lastElement + "&origin=*";
    },
    updateCategoryInput(state, payload) {
        state.categoryInput = payload;
    },
    // updateCurrentCategoryID(state, payload) {
    //     state.currentCategoryID = payload;
    // },
    // updateCurrentCategoryName(state, payload) {
    //     state.currentCategoryName = payload;
    // },
    updateEmail(state, payload) {
        state.email = payload;
    },
    updatePassword(state, payload) {
        state.password = payload;
    },
    setCurrentUser(state, response) {
        state.currentUser = response;
    },
    setUserProfile(state, response) {
        state.userProfile = response;
    },
    setUserCategories(state, response) {
        state.userCategories = response;
    },

    setUserArticles(state, response) {
        state.userArticles = response;
        console.log('STATE OF ARTICLES', state.userArticles)
    },

    setSearchResultsValue(state, response) {
        JSON.stringify(response.data)
        console.log(response.data)
        state.categoriesArray = []
        for (let categoryCounter = 0; categoryCounter < 20; categoryCounter++) {
            let categoryCard = {
                title: response.data.query.allcategories[categoryCounter]['*'],
                isChosen: false,
            }
            state.categoriesArray.push(categoryCard)
        }
        console.log('categoriesArray', state.categoriesArray)
        state.pageArray = Object.values(state.categoriesArray)
        state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].title;
        console.log(state.lastElement);

        // console.log(state.userCategories)
        console.log('pageArray', state.pageArray)
        if (state.userCategories != null) {
            state.pageArray = state.categoriesArray.map(element => {
                element.isChosen = state.userCategories && state.userCategories.some(category => category.title === element.title);
                return element;
            })
        }
        // else { state.pageArray = Object.values(state.categoriesArray) }
        state.pageStart = 0
        state.pageEnd = 19
        // console.log(state.pageStart)
        // console.log(state.pageEnd)
        // console.log(state.pageArray)
    },

    updateFilteredResults(state) {
        state.filteredResults = state.categoriesArray.filter(categoriesArray => categoriesArray.title
            .toLowerCase()
            .indexOf(state.categoryInput.toLowerCase()) > -1
        );
        if (state.categoryInput == "") {
            state.filteredResults = [];
        }
    },

    chooseCategory(state, { categoryCard }) {
        console.log(categoryCard)
        console.log(categoryCard.isChosen)
        categoryCard.isChosen = !categoryCard.isChosen
        console.log(categoryCard.isChosen)
        const userCategoriesToSend = state.userCategories;
        const user = fb.auth.currentUser;
        if (categoryCard.isChosen) {
            state.userCategories.push(categoryCard);
            console.log('STATE:', state.userCategories)
            console.log(user)
            console.log("send data to firebase", userCategoriesToSend)
            fb.userCategoriesCollection
                .doc(user.uid)
                .set({
                    categories: userCategoriesToSend
                });

        }
        else {
            state.userCategories.splice((state.userCategories.indexOf(categoryCard)), 1)
            console.log('STATE:', state.userCategories)
            console.log("send data to firebase", userCategoriesToSend)
            fb.userCategoriesCollection
                .doc(user.uid)
                .set({
                    categories: userCategoriesToSend
                });

        }
    },

    saveUserArticles(state, { articleCard }) {
        console.log(articleCard)
        console.log(articleCard.isChosen)
        articleCard.isChosen = !articleCard.isChosen

        const userArticlesToSend = state.userArticles;
        const user = fb.auth.currentUser;
        if (articleCard.isChosen) {
            state.userArticles.push(articleCard)
            console.log('ARTICLE CARDS', state.userArticles)
            console.log("send data to firebase", userArticlesToSend)
            fb.userArticlesCollecion
                .doc(user.uid)
                .set({
                    articles: userArticlesToSend
                });
        }
        else {
            state.userArticles.splice((state.userArticles.indexOf(articleCard)), 1)
            console.log('ARTICLE CARDS', state.userArticles)
            console.log("send data to firebase", userArticlesToSend)
            fb.userArticlesCollecion
                .doc(user.uid)
                .set({
                    articles: userArticlesToSend
                });
        }

    },


    // let whichTable = ""

    // if (payload == 'selectPage') {
    //     state.currentCategoryID = state.categoriesArray.map(e => e.categoryCard.title).indexOf(state.currentCategoryName);
    //     console.log(state.currentCategoryID)
    //     state.categoriesArray[state.currentCategoryID].categoryCard.isChosen = !state.categoriesArray[state.currentCategoryID].categoryCard.isChosen;
    //     whichTable = 'categoriesArray'
    // }
    // else if (payload == 'home') {
    //     state.currentCategoryID = state.userCategories.map(e => e.categoryCard.title).indexOf(state.currentCategoryName);
    //     console.log(state.currentCategoryID)
    //     whichTable = 'userCategories'
    //     state.userCategories[state.currentCategoryID].categoryCard.isChosen = !state.userCategories[state.currentCategoryID].categoryCard.isChosen;

    // }
    // this.dispatch('updateUserCategory', whichTable)


    updateUserCategory(state, payload) {
        // state.path = payload
        // if (state[state.path][state.currentCategoryID].categoryCard.isChosen) {
        //     state.userCategories.push(state.categoriesArray[state.currentCategoryID])
        //     let userCategoriesFB = state.userCategories;
        //     let user = fb.auth.currentUser;

        // fb.userCategoriesCollection
        //     .doc(user.uid)
        //     .set({
        //         userCategoriesFB
        //     });

        // }
        // else {
        //     let userCategoriesFB = state.userCategories;
        //     let user = fb.auth.currentUser;
        //     let indexOfToBeDeleted = 0
        //     console.log(payload)
        //     if (payload == 'categoriesArray') {
        //         // state.categoriesArray[state.currentCategoryID].categoryCard.isChosen = !state.categoriesArray[state.currentCategoryID].categoryCard.isChosen;
        //         indexOfToBeDeleted = (state.userCategories.findIndex(element => element.categoryCard.title === state.currentCategoryName))
        //         console.log(indexOfToBeDeleted)
        //         if (indexOfToBeDeleted !== -1) {
        //             state.userCategories.splice(indexOfToBeDeleted, 1);
        //         }
        //     } else if (payload == 'userCategories') {
        //         indexOfToBeDeleted = (state.userCategories.findIndex(element => element.categoryCard.title === state.currentCategoryName))
        //         console.log(indexOfToBeDeleted)
        //         if (indexOfToBeDeleted !== -1) {
        //             state.userCategories.splice(indexOfToBeDeleted, 1);
        //         }
        //         // if (state.categoriesArray) {
        //         //     indexOfToBeDeleted = (state.categoriesArray.findIndex(element => element.categoryCard.title === state.currentCategoryName))
        //         //     console.log(indexOfToBeDeleted)
        //         //     state.categoriesArray[indexOfToBeDeleted].categoryCard.isChosen = false
        //         // }


        //     }

        //     fb.userCategoriesCollection
        //         .doc(user.uid)
        //         .set({
        //             userCategoriesFB
        //         })
        //     this.dispatch('fetchUserCategories')

        //     console.log(state.userCategories)

        // }
    },

    checkIfCategoryChosen(state) {
        console.log('just checking')
        state.pageArray = state.pageArray.map(element => {
            element.isChosen = state.userCategories && state.userCategories.some(category => category.title === element.title);
            return element;
        });
    }, checkIfArticleChosen(state) {
        console.log('just checking articles')
        state.randomArticles = state.randomArticles.map(element => {
            element.isChosen = state.userArticles && state.userArticles.some(article => article.title === element.title);
            return element;
        });

    },
    getNextPage(state, response) {
        state.pageStart = state.pageEnd + 1
        state.pageEnd = state.pageStart + 19;
        state.currentPageNumber++
        if (state.pageCounter < state.currentPageNumber) { state.pageCounter++ }
        console.log(state.pageStart)
        console.log(state.pageEnd)
        JSON.stringify(response.data)
        response.data.query.allcategories.splice(0, 1)
        for (let categoryCounter = 0; categoryCounter < 21; categoryCounter++) {
            let categoryCard = {
                title: response.data.query.allcategories[categoryCounter]['*'],
                isChosen: false,
            }
            state.wikiResults.push(categoryCard)
        }
        state.wikiResults.splice(0, 1)
        console.log('wiki', state.wikiResults)


        // console.log(state.categoriesArray)
        // state.newArray = Object.values(state.wikiResults)
        // console.log(state.newArray)
        // console.log(state.categoriesArray)

        state.categoriesArray.push(...state.wikiResults);
        state.pageArray = state.wikiResults.map(element => element)
        state.lastElement = state.categoriesArray[state.categoriesArray.length - 1].title;
        // console.log(state.pageArray)
        console.log(state.lastElement);
        state.wikiResults = []


    },
    getPreviousPage(state) {
        state.lastPageNumber = state.currentPageNumber;
        state.currentPageNumber--
        // console.log(state.categoriesArray.length)
        // console.log(state.pageStart)
        // console.log(state.pageEnd)
        if (state.pageStart - 19 > 0 && state.pageEnd - 19 > 0) {
            state.pageStart = state.pageStart - 20
            state.pageEnd = state.pageEnd - 20
        }
        else {
            state.pageStart = 0; state.pageEnd = 19; state.dataAppended = 0
        }
        state.pageArray = []
        state.pageArray = state.categoriesArray.slice(state.pageStart, state.pageEnd + 1).map(element => element);
        state.lastElement = state.pageArray[state.pageArray.length - 1].title;
        console.log(state.pageArray)
        console.log(state.pageStart)
        console.log(state.pageEnd)
    },
    refreshArticlesPage(state) {
        state.randomArticles = []
    },
    refreshCategoriesPage(state) {
        state.pageArray = []
    }
}