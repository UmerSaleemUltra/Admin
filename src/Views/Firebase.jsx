import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object containing your project credentials
const firebaseConfig = {
    apiKey: "AIzaSyDkwWFCHHLNTKXY-10EiLh8WTpwtDCA3lo",
    authDomain: "expertizo-authentication.firebaseapp.com",
    databaseURL: "https://expertizo-authentication-default-rtdb.firebaseio.com",
    projectId: "expertizo-authentication",
    storageBucket: "expertizo-authentication.appspot.com",
    messagingSenderId: "71504779524",
    appId: "1:71504779524:web:46897f2e31dbe2cd9a5851",
    measurementId: "G-F9BF1QQRBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication and Firestore instances to be used in your app
export const auth = getAuth(app);
export const db = getFirestore(app);

export { auth, db, storage };
