import firebase from "firebase/app";
import "firebase/analytics";
import 'firebase/auth';
import "firebase/firestore";
import "firebase/database";
import 'firebase/storage'

var firebaseConfig = {
apiKey: "AIzaSyCNc0_raZrJTr3iEq0FlvJsYpkRaZtnvrg",
authDomain: "commongooods-1609187154790.firebaseapp.com",
projectId: "commongooods-1609187154790",
storageBucket: "commongooods-1609187154790.appspot.com",
messagingSenderId: "31180406886",
appId: "1:31180406886:web:2a6ee5b73ceb3447b9ada7",
measurementId: "G-0TMR9Q534E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();

// Storage and reference
const storage = firebase.storage();
const storageRef = storage.ref().child('images/');
const fireStore = firebase.firestore();

const fireStoreRef = fireStore.collection('images'); //firebase objects contain image data 
const fireStoreOrderRef = fireStore.collection('imagesOrder'); //firebase an array contains imageId strings.

const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { auth, storage, storageRef, fireStore, fireStoreRef, fireStoreOrderRef, timeStamp }
