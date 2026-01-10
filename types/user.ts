export type UserRole = "admin" | "creator" | "seeker";

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  createdAt: any; // Changed to any to allow Timestamp or number, but we will standardize to Timestamp
  // Seeker specific
  skills?: string[];
  bio?: string;
  // Creator specific
  companyName?: string;
  companyDescription?: string;
}
