import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCko35NRLHSfTL6Fan_dZwdHf5jaIWU3Sc",
    authDomain: "chat-1fb65.firebaseapp.com",
    projectId: "chat-1fb65",
    storageBucket: "chat-1fb65.appspot.com",
    messagingSenderId: "796482492722",
    appId: "1:796482492722:web:8318ebe74d1138314e5f2b"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();