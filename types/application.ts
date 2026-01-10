export interface Application {
  id?: string;
  jobId: string;
  seekerId: string;
  seekerName?: string; // Denormalized
  resumeUrl: string; // Could be storage URL or link
  coverLetter?: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: any; // Firestore Timestamp or ISO string depending on context
  jobTitle?: string; // Denormalized for dashboard
  companyName?: string; // Denormalized
}
