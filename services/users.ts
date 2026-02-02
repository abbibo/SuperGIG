import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import { UserProfile, UserRole } from "@/types/user";
export type { UserProfile, UserRole };
import { serverTimestamp } from "firebase/firestore";

// Types re-exported from @/types/user

export const UserService = {
  async createUser(uid: string, email: string, role: UserRole, additionalData?: any) {
    const userRef = doc(db, "users", uid);
    const userData: UserProfile = {
      uid,
      email,
      role,
      createdAt: serverTimestamp(),
      ...additionalData
    };
    
    // Create a timeout promise
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Firestore operation timed out")), 10000)
    );

    try {
        await Promise.race([
            setDoc(userRef, userData),
            timeout
        ]);
    } catch (error) {
        console.error("UserService.createUser failed:", error);
        // We might want to throw here or handle it gracefully depending on UX
        throw error;
    }
    
    return userData;
  },

  async getUser(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);
    
    if (snapshot.exists()) {
      return snapshot.data() as UserProfile;
    }
    return null;
  },

  async updateUser(uid: string, data: Partial<UserProfile>) {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
  }
};
