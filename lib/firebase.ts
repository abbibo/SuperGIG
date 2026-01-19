import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA0jHMTpOtA4a1hckYeQ5KzOIOcS_C7jy0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "supergig-platform-dev.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "supergig-platform-dev",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "supergig-platform-dev.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "271822139732",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:271822139732:web:a7abc606b3e863c347d8c1",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-72WD42WJZ7"
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

// Initialize Analytics (client-side only)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { db, analytics };
export const storage = getStorage(app);

// Use a custom auth domain if provided, otherwise fallback to a default structure
// Ideally this should come from process.env.NEXT_PUBLIC_AUTH_DOMAIN
// Use a custom auth domain if provided, otherwise fallback to the project-specific firebaseapp domain
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${firebaseConfig.projectId}.firebaseapp.com`;

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `https://${AUTH_DOMAIN}/finishSignIn`,
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.supergig.app',
  },
  android: {
    packageName: 'com.supergig.app',
    installApp: true,
    minimumVersion: '12',
  },
  // platform-native deep linking (no dynamic links)
};
