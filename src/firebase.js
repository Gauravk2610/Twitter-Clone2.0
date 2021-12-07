// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "Enter your own API KEY",
    authDomain: "Enter your own AUTH DOMAIN",
    projectId: "Enter your own PROJECT ID",
    storageBucket: "Enter your own STORAGE BUCKET",
    messagingSenderId: "Enter your own MESSAGING SENDER ID",
    appId: "Enter your own APP ID"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

export { app, db, storage, auth }