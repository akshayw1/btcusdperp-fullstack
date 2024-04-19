// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional.

const firebaseConfig = {
  apiKey: "AIzaSyAZKwc7y1MQxvHowQeUuO-_-JsKsfjqkrI",
  authDomain: "btcusdperp-732ff.firebaseapp.com",
  projectId: "btcusdperp-732ff",
  storageBucket: "btcusdperp-732ff.appspot.com",
  messagingSenderId: "270004114712",
  appId: "1:270004114712:web:c2332b44c48885cbc17a6d",
  measurementId: "G-VGBDDRMZ6Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
