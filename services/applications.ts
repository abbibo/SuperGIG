import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp, 
} from "firebase/firestore";

import { Application } from "@/types/application";

// Interface moved to @/types/application

export const ApplicationService = {
  async submitApplication(applicationData: Omit<Application, "id" | "status" | "createdAt">) {
    const appsRef = collection(db, "applications");
    const docRef = await addDoc(appsRef, {
      ...applicationData,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async getApplicationsByUser(userId: string) {
    const q = query(
      collection(db, "applications"),
      where("seekerId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
  },
  
  async getApplicationsByJob(jobId: string) {
    const q = query(
      collection(db, "applications"),
      where("jobId", "==", jobId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
  }
};
