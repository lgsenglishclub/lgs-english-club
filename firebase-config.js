// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/15.26.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/15.26.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/15.26.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/15.26.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyCpjnKZ1bhhOet-wJDba4vhdMkdekBlDec",
  authDomain: "lgs-english-club.firebaseapp.com",
  projectId: "lgs-english-club",
  storageBucket: "lgs-english-club.firebasestorage.app",
  messagingSenderId: "707143251843",
  appId: "1:707143251843:web:3b6ebede4dbc83060828b6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);npm list -g firebase-tools