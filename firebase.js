import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged,
  setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  getFirestore, collection, doc, setDoc, deleteDoc, getDoc, onSnapshot, writeBatch
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCvmGW-P9BMAiw97KAQ3n-9gds1RXnaScE",
  authDomain: "xyz-manager.firebaseapp.com",
  projectId: "xyz-manager",
  storageBucket: "xyz-manager.firebasestorage.app",
  messagingSenderId: "746044570582",
  appId: "1:746044570582:web:23c63581c85cdd4f0fc277"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export {
  signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence,
  collection, doc, setDoc, deleteDoc, getDoc, onSnapshot, writeBatch
};
