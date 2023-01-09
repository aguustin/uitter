
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9r90inVsocx2LjxCnviK-qWW7vIB2W5M",
  authDomain: "uitter.firebaseapp.com",
  projectId: "uitter",
  storageBucket: "uitter.appspot.com",
  messagingSenderId: "352461293707",
  appId: "1:352461293707:web:473f78d7fc6b449d946c8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);
const auth = getAuth(app);

export {app, firestoreDB, auth}

