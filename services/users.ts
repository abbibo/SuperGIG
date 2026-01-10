import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

import { UserProfile, UserRole } from "@/types/user";
import { serverTimestamp } from "firebase/firestore";

// Types moved to @/types/user

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
    
    await setDoc(userRef, userData);
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
