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
        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role as "admin" | "creator" | "seeker");
          } else {
            // Handle case where user exists in Auth but not in Firestore (e.g. initial social login)
            // We might treat them as 'seeker' or null until they complete profile
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
        }
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
