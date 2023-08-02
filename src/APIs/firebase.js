import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA7CeePxMozCVznkF9DgU8BCIDvyxpntfI",
  authDomain: "vihiga-intranet.firebaseapp.com",
  projectId: "vihiga-intranet",
  storageBucket: "vihiga-intranet.appspot.com",
  messagingSenderId: "686048599992",
  appId: "1:686048599992:web:a135ae187a3815b3a5f94d",
  measurementId: "G-H9ZG4GS912",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Initialize firestore
export const db = getFirestore(app);

// Create a root reference
export const storage = getStorage(app);

// Initialize messaging
export const messaging = getMessaging(app);

export default app;
