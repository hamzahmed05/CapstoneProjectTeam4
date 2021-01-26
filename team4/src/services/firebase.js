import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBHBiTi2fCc0NY3VjVyp8XGQxzfY9jzob0",
    authDomain: "capstone-301501.firebaseapp.com",
    projectId: "capstone-301501",
    storageBucket: "capstone-301501.appspot.com",
    messagingSenderId: "33802467815",
    appId: "1:33802467815:web:ed9cb7074d72afbc98a542",
    measurementId: "G-6QP6F6T38K"
}

export const fb = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.database();
export const firestore = firebase.firestore();