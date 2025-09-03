// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey:`${import.meta.env.VITE_FIREBASE_API}`,
    authDomain: "task-manager-19d7d.firebaseapp.com",
    projectId: "task-manager-19d7d",
    storageBucket: "task-manager-19d7d.firebasestorage.app",
    messagingSenderId: "1009148506379",
    appId: "1:1009148506379:web:badb657c8aa706a56ab20e",
    measurementId: "G-Y1EC1B2B8C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db = getFirestore(app);