// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEaBoqqjeTUE4_IId8mS5Nd8knuWQT2ew",
  authDomain: "shorten-link-c4e5b.firebaseapp.com",
  projectId: "shorten-link-c4e5b",
  storageBucket: "shorten-link-c4e5b.appspot.com",
  messagingSenderId: "87030694401",
  appId: "1:87030694401:web:3c9f133c5598757b033600",
  measurementId: "G-X41WVLDG03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)