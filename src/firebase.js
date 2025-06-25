// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvtiu4Lv_tSYmCW1LaqLRRRd_WVH7XmOk",
  authDomain: "lambdahack-be36f.firebaseapp.com",
  databaseURL: "https://lambdahack-be36f-default-rtdb.firebaseio.com",
  projectId: "lambdahack-be36f",
  storageBucket: "lambdahack-be36f.firebasestorage.app",
  messagingSenderId: "529700286417",
  appId: "1:529700286417:web:5a3c228cdbfdbb67d1faf0",
  measurementId: "G-M92ZCCND4N"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
//const analytics = getAnalytics(app);