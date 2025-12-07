import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";   // ✅ REALTIME DATABASE

const firebaseConfig = {
  apiKey: "AIzaSyAnw9ViAQrGLqC3Bg8yWSEsvbSZL7X5Qds",
  authDomain: "healthlink-91bf2.firebaseapp.com",
  databaseURL: "https://healthlink-91bf2-default-rtdb.firebaseio.com",
  projectId: "healthlink-91bf2",
  storageBucket: "healthlink-91bf2.appspot.com",
  messagingSenderId: "209761916068",
  appId: "1:209761916068:web:4fdd5b7297862030f8c231"
};

export const app = initializeApp(firebaseConfig);

// ✅ AUTH
export const auth = getAuth(app);

// ✅ REALTIME DATABASE  ← IMPORTANT!
export const db = getDatabase(app);
