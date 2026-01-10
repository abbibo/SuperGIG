import { AppShell } from "@/components/layout/AppShell";
import { HomeHeader } from "@/components/home/HomeHeader";
import { ImageCarousel } from "@/components/home/ImageCarousel";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types/job";

const mockActiveJob: Job = {
  id: "active_job_1",
  creatorId: "mock_creator_1",
  title: "Job Title",
  companyName: "Company /job Creator Name",
  description: "Description",
  category: "Engineering",
  type: "full-time",
  location: { city: "Bengaluru", state: "Karnataka" },
  schedule: { startDate: "2025-08-13", endDate: "2025-08-15", startTime: "10:00 am", endTime: "6:00 pm" },
  compensation: { amount: 500, unit: "day", currency: "INR" },
  dressCode: "formals",
  requirements: {
    height: { minFt: 5.5, maxFt: 6.5 },
    drivingLicenseRequired: true,
    vehicleRequired: true,
    pvcRequired: true
  },
  capacity: { total: 15, male: 15, female: 15 }, // Adjusted to match image pills if needed
  social: { allowReferral: false },
  stats: { appliedCount: 15, selectedCount: 15 },
  status: "active",
  createdAt: "2026-01-09T18:30:00Z",
  updatedAt: "2026-01-09T18:30:00Z"
};

export default function HomePage() {
  const blueViewDetailsButton = (
      <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] active:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl transition-all shadow-sm">
        View Details
      </button>
  );

  return (
    <AppShell title="Home" showHeader={false}>
       <div className="max-w-md mx-auto space-y-6">
          <HomeHeader />
          
          <div className="px-4">
              <ImageCarousel />
          </div>

          <div className="px-4 pb-20">
              <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Current active  Job</h2>
              <JobCard job={mockActiveJob} actionButton={blueViewDetailsButton} />
          </div>
       </div>
    </AppShell>
  );
}
