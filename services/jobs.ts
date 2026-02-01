import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  orderBy, 
  serverTimestamp, 
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { Job } from "@/types/job";
export type { Job };

export const JobService = {
  // Helper to convert Firestore data to Job type
  fromFirestore(doc: any): Job {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Convert Timestamps to ISO strings
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : new Date().toISOString(),
    } as Job;
  },

  async createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">) {
    // Ensure creatorId is present (though type definition enforces it, runtime check is good or just rely on type)
    if (!jobData.creatorId) {
        throw new Error("creatorId is required to create a job");
    }

    const jobsRef = collection(db, "jobs");
    const docRef = await addDoc(jobsRef, {
      ...jobData,
      status: 'draft', // Default to draft for safety
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async getJobsByCreator(creatorId?: string) {
    if (!creatorId) return [];
    // Currently relying on companyName or specialized ID until auth is fully linked
    // For demo, we might query all or filter by ID field if present
    // Query jobs where creatorId matches
    const q = query(
      collection(db, "jobs"), 
      where("creatorId", "==", creatorId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => this.fromFirestore(doc));
  },

  async getApprovedJobs() {
    const q = query(
      collection(db, "jobs"), 
      where("status", "==", "active"), // Changed from 'approved' to match schema 'active'
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    
    // Filter out jobs that might not match the schema yet if strictly enforced,
    // or just return all mapped.
    return snapshot.docs.map(doc => this.fromFirestore(doc));
  },

  async getJob(jobId: string) {
    const jobRef = doc(db, "jobs", jobId);
    const snapshot = await getDoc(jobRef);
    if (snapshot.exists()) {
      return this.fromFirestore(snapshot);
    }
    return null;
  },
  
  async updateJob(jobId: string, updates: Partial<Job>) {
    const jobRef = doc(db, "jobs", jobId);
    // Exclude id from updates to avoid overwriting or errors
    const { id, createdAt, ...cleanUpdates } = updates as any;
    await updateDoc(jobRef, {
      ...cleanUpdates,
      updatedAt: serverTimestamp()
    });
  },

  async deleteJob(jobId: string) {
    await deleteDoc(doc(db, "jobs", jobId));
  },

  async getPendingJobs() {
    const q = query(
      collection(db, "jobs"),
      where("status", "==", "draft"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => this.fromFirestore(doc));
  },

  async updateJobStatus(jobId: string, action: 'approved' | 'rejected') {
    const jobRef = doc(db, "jobs", jobId);
    const newStatus = action === 'approved' ? 'active' : 'rejected';
    
    await updateDoc(jobRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
  },

  async getAllJobs() {
    const q = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => this.fromFirestore(doc));
  }
};
