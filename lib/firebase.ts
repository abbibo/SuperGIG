import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock_key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock_domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock_project_id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock_bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "mock_sender",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock_app_id",
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

if (firebaseConfig.projectId === "mock_project_id") {
  console.warn("⚠️ FIREBASE CONFIG WARNING: Using mock values. Verify your .env.local file exists and is loaded.");
}

// Initialize Firestore with settings to avoid "offline" issues in some network environments
// We check if it's already initialized by trying getFirestore first? No, getFirestore(app) will return existing.
// But we can only set settings on creation. 
// Since we control app creation above, we can try to initialize persistence/settings there.

// Note: initializeFirestore cannot be called if getFirestore has already been called.
// In dev (hot reload), this file re-runs. 
// If app is reused (getApp), firestore is likely already attached.

import { Firestore } from "firebase/firestore";

let db: Firestore;
try {
  // If app was just initialized or we are lucky, we can configure it.
  // Ideally this throws if already initialized.
  db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
  });
} catch (e) {
  // Fallback if already initialized (hot reload)
  db = getFirestore(app);
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { db };
export const storage = getStorage(app);
