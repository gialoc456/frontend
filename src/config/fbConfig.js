import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDeSjV93siTHGc5cDl_A-l1rq_Dc7siniI",
    authDomain: "my-app-capstone.firebaseapp.com",
    databaseURL: "https://my-app-capstone.firebaseio.com",
    projectId: "my-app-capstone",
    storageBucket: "my-app-capstone.appspot.com",
    messagingSenderId: "692498251556",
    appId: "1:692498251556:web:d805d61366c823c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true})

export default firebase;