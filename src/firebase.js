import firebase from "firebase"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC4NxVpwLiXv2FnxdSO2EFAv1WY3k7oa-A",
    authDomain: "wikimiki-d0a90.firebaseapp.com",
    databaseURL: "https://wikimiki-d0a90.firebaseio.com",
    projectId: "wikimiki-d0a90",
    storageBucket: "wikimiki-d0a90.appspot.com",
    messagingSenderId: "218726948428",
    appId: "1:218726948428:web:c9ce80b9f8719c6a4cdee9"
};
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const usersCollection = db.collection('users')
const userCategoriesCollection = db.collection('userCategories')
export {
    db, auth, currentUser, usersCollection, userCategoriesCollection,

}