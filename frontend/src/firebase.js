// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/analytics";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import { getFirestore } from "firebase/firestore"; // Update the import

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD3dRNJzIUtrX2bLyBQXqlYeFEqSLdNb8",
  authDomain: "thrifting-f4411.firebaseapp.com",
  projectId: "thrifting-f4411",
  storageBucket: "thrifting-f4411.appspot.com",
  messagingSenderId: "252341035107",
  appId: "1:252341035107:web:0fabbac5ba6c1aa52ed856",
  measurementId: "G-GJFJD3VYP5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export const analytics = getAuth(app);
// export const firestore = getFirestore(app); // Use getFirestore with the app instance
