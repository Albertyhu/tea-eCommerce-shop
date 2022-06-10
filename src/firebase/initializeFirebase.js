// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "tea-shop-dd55c.firebaseapp.com",
    projectId: "tea-shop-dd55c",
    storageBucket: "tea-shop-dd55c.appspot.com",
    messagingSenderId: "411802201460",
    appId: "1:411802201460:web:382b8dab5f84fbc5f91021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(); 
export { db }; 