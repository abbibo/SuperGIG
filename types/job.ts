export type PayUnit = 'hour' | 'day' | 'shift';
export type DressCode = 'formals' | 'casuals' | 'uniform' | 'any';
export type Currency = 'INR' | 'USD' | 'EUR'; // Default INR

export interface JobLocation {
  city: string;
  state: string;
}

export interface JobSchedule {
  startDate: string; // ISO Date "YYYY-MM-DD"
  endDate: string;   // ISO Date "YYYY-MM-DD"
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
}

export interface JobCompensation {
  amount?: number;
  unit?: PayUnit;
  currency?: Currency;
  range?: string;
}

export interface JobRequirements {
  height?: {
    minFt: number;
    maxFt: number;
  };
  drivingLicenseRequired: boolean;
  vehicleRequired: boolean;
  pvcRequired: boolean; // Police Verification Certificate
}

export interface JobCapacity {
  total: number;
  male: number;
  female: number;
  // Note: API response seems to imply current/max distinct from these,
  // but based on UI "15/13", "15/15" it looks like "Applied/Total" or "Filled/Total".
  // The schema says "total: 15, male: 13, female: 15" for capacity limits.
  // And stats has "appliedCount: 15, selectedCount: 13".
  // The UI shows specific Male/Female filled slots possibly?
  // Let's stick to Schema for structure.
}

export interface JobStats {
  appliedCount: number;
  selectedCount: number;
}

export interface JobSocial {
  allowReferral: boolean;
}

export interface Job {
  id: string;
  title: string;
  creatorId: string; // ID of the user who created this job
  companyName: string;
  description: string;
  category?: string;
  type?: string;
  location: JobLocation;
  schedule: JobSchedule;
  compensation: JobCompensation;
  dressCode: DressCode;
  requirements: JobRequirements;
  capacity: JobCapacity;
  social: JobSocial;
  stats: JobStats;
  status: 'draft' | 'active' | 'closed' | 'rejected';
  createdAt: string; // ISO Timestamp
  updatedAt: string; // ISO Timestamp
}
