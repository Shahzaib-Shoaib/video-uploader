import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,  } from 'firebase/firestore';

import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAtk_PO-mC9xEZsN8aatyEHdLFkZvt_hTo",
//   authDomain: "next-auth-username-passwords.firebaseapp.com",
//   projectId: "next-auth-username-passwords",
//   storageBucket: "next-auth-username-passwords.appspot.com",
//   messagingSenderId: "78794701925",
//   appId: "1:78794701925:web:d1baa091db025a1da61a8c"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC1hHrK3VQcpF8kYkVgexAgX-KF4hAZ7cU",
  authDomain: "video-uploader-432f2.firebaseapp.com",
  projectId: "video-uploader-432f2",
  storageBucket: "video-uploader-432f2.appspot.com",
  messagingSenderId: "29752639365",
  appId: "1:29752639365:web:0206d9dccb59c5938cceec"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const database = getDatabase(app);

export { app, db, auth,database }
