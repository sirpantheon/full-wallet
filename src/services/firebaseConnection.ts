
import { initializeApp } from "firebase/app";
import { getFirestore } from"firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDhH7641lm391TO_E30Cwzlg9FinVtmGSk",
  authDomain: "registertonner.firebaseapp.com",
  projectId: "registertonner",
  storageBucket: "registertonner.appspot.com",
  messagingSenderId: "896051757701",
  appId: "1:896051757701:web:f0dbec645c24dcd9b09fec"
};


const firebaseApp = initializeApp(firebaseConfig);
export const DB = getFirestore(firebaseApp)