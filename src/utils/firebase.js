// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAp8Y-TBEiDC1VrJ6cChvIl7N6OA7uhl6s",
  authDomain: "netflixgpt-59bef.firebaseapp.com",
  projectId: "netflixgpt-59bef",
  storageBucket: "netflixgpt-59bef.firebasestorage.app",
  messagingSenderId: "1050999783555",
  appId: "1:1050999783555:web:d1694f4eb138a4d7b4dbb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();