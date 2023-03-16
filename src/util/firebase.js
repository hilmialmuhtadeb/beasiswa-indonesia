// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnJtOt62qk-Z-0ad2KfpmARWpt55lUZGc",
  authDomain: "beasiswa-indonesia.firebaseapp.com",
  projectId: "beasiswa-indonesia",
  storageBucket: "beasiswa-indonesia.appspot.com",
  messagingSenderId: "235318415040",
  appId: "1:235318415040:web:7e8e666c10bc05602a2725",
  measurementId: "G-HSPMP630EM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
// const analytics = getAnalytics(firebaseApp);

export {
  auth,
  db,
  storage
}