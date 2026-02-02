"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  userRole: "admin" | "creator" | "seeker" | null;
  loading: boolean;
  signOut: () => Promise<void>;
  loginAsTestUser: (role: "creator" | "seeker") => Promise<string>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  signOut: async () => {},
  loginAsTestUser: async () => "",
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "creator" | "seeker" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        setUser(currentUser);
        // Fetch user role from Firestore with retry logic
        // This handles race conditions where the user is created in Auth but the Firestore doc isn't ready yet
        let attempts = 0;
        const maxAttempts = 3;
        
        const fetchUserRole = async () => {
          const tStart = performance.now();
          console.log(`[PERF] AuthProvider: Fetching role attempt ${attempts + 1}`);
          try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
              const tEnd = performance.now();
              console.log(`[PERF] AuthProvider: Role found in ${(tEnd - tStart).toFixed(2)}ms`);
              setUserRole(userDoc.data().role as "admin" | "creator" | "seeker");
            } else if (attempts < maxAttempts) {
              attempts++;
              console.log(`[PERF] AuthProvider: Role missing, retrying... (${attempts}/${maxAttempts})`);
              setTimeout(fetchUserRole, 500 * attempts); // Exponential backoff-ish
            } else {
              // Handle case where user exists in Auth but not in Firestore after retries
              console.log(`[PERF] AuthProvider: Role missing after retries.`);
              setUserRole(null);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            setUserRole(null);
          }
        };

        fetchUserRole();
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const loginAsTestUser = async (role: "creator" | "seeker") => {
    try {
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      const { setDoc, serverTimestamp } = await import("firebase/firestore");
      
      // Use random email/password since Anonymous auth is disabled
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(7);
      const email = `guest-${timestamp}-${randomId}@supergig.debug`;
      const password = "debug-password-123";

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      
      // Create user document
      await setDoc(doc(db, "users", uid), {
        email: email,
        role: role,
        createdAt: serverTimestamp(),
        isAnonymous: false, // It's technically a real user now, but temporary
        displayName: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`
      }, { merge: true });

      // Force state update since logic inside onAuthStateChanged might race or we want immediate feedback
      setUserRole(role); 
      return uid;
      
    } catch (error) {
      console.error("Error logging in as test user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signOut, loginAsTestUser }}>
      {children}
    </AuthContext.Provider>
  );
}
