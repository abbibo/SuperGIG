import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types/job";

const sampleJob: Job = {
  id: "job_uuid",
  title: "Job Title",
  companyName: "Company /job Creator Name",
  description: "Detailed job description",
  location: {
    city: "Bengaluru",
    state: "Karnataka"
  },
  schedule: {
    startDate: "2025-08-13",
    endDate: "2025-08-15",
    startTime: "10:00 am",
    endTime: "6:00 pm"
  },
  compensation: {
    amount: 500,
    unit: "day",
    currency: "INR"
  },
  dressCode: "formals",
  requirements: {
    height: {
      minFt: 5.5,
      maxFt: 6.5
    },
    drivingLicenseRequired: true,
    vehicleRequired: true,
    pvcRequired: true
  },
  capacity: {
    total: 13,
    male: 15,
    female: 15
  },
  social: {
    allowReferral: true
  },
  stats: {
    appliedCount: 15,
    selectedCount: 13
  },
  status: "active",
  createdAt: "2026-01-08T18:30:00Z", // 6h ago relative to user time approx
  updatedAt: "2026-01-08T18:30:00Z"
};

export default function TestJobCardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <JobCard job={sampleJob} />
    </div>
  );
}
