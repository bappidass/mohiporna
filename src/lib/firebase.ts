// Firebase config — values are publishable (safe in source).
// Replace the placeholders below with your Firebase Web App config from
// Firebase Console → Project Settings → General → Your apps.
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtur6W5Pr_oQ2KLHfVbaSKDY5ACAe11Hk",
  authDomain: "mohiporna.firebaseapp.com",
  projectId: "mohiporna",
  storageBucket: "mohiporna.firebasestorage.app",
  messagingSenderId: "924036619315",
  appId: "1:924036619315:web:5497318419105fa1b8d746",
  measurementId: "G-QPMRK4916Z"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
