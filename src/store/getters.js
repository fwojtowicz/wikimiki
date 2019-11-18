
export const getters = {

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
        return state.fullURL;
    },
    lastElementGetter: state => {
        return state.lastElement;
    },
    nextURLGetter: state => {
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
    pageCounterGetter: state => {
        return state.pageCounter
    },
    currentPageNumberGetter: state => {
        return state.currentPageNumber
    },
    randomArticlesGetter: state => {
        return state.randomArticles
    }

}