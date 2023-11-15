// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d8de6.firebaseapp.com",
  projectId: "mern-estate-d8de6",
  storageBucket: "mern-estate-d8de6.appspot.com",
  messagingSenderId: "155230907841",
  appId: "1:155230907841:web:3a03de0b242f645b639340"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);