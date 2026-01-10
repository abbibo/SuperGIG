"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StatusTabs } from "@/components/status/StatusTabs";
import { Search, SlidersHorizontal } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types/job";

// Mock Data matching the Job interface
const mockJob: Job = {
  id: "job_status_1",
  title: "Job Title",
  companyName: "Company /job Creator Name",
  description: "Description",
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
  capacity: { total: 15, male: 13, female: 15 },
  social: { allowReferral: true },
  stats: { appliedCount: 15, selectedCount: 13 },
  status: "active",
  createdAt: "2026-01-08T18:30:00Z",
  updatedAt: "2026-01-08T18:30:00Z"
};

export default function StatusPage() {
  const [activeTab, setActiveTab] = useState<"submissions" | "gigs">("submissions");
  const [activeGigsTab, setActiveGigsTab] = useState<"active" | "completed" | "rejected">("active");
  const [search, setSearch] = useState("");

  const pendingButton = (
      <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-blue-200">
        Pending For Approval
      </button>
  );

  const greenViewDetailsButton = (
      <button className="w-full bg-[#1dbf1d] hover:bg-[#18a018] active:bg-[#148714] text-white font-bold py-3 rounded-xl transition-all shadow-sm">
        View Details
      </button>
  );

  const blueViewDetailsButton = (
      <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] active:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl transition-all shadow-sm">
        View Details
      </button>
  );

  const redViewDetailsButton = (
      <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] active:bg-[#b91c1c] text-white font-bold py-3 rounded-xl transition-all shadow-sm">
        View Details
      </button>
  );

  return (
    <AppShell title="Status" showHeader={false}>
      <div className="max-w-md mx-auto space-y-4">
        {/* Header Tabs */}
        <StatusTabs activeTab={activeTab} onChange={setActiveTab} />

        {/* Sub Tabs for Gigs */}
        {activeTab === 'gigs' && (
           <div className="flex items-center justify-between px-6 border-b border-gray-100 mb-2">
              <button 
                onClick={() => setActiveGigsTab("active")}
                className={`pb-2 text-[15px] font-medium transition-all relative ${
                    activeGigsTab === 'active' ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                  Active
                  {activeGigsTab === 'active' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveGigsTab("completed")}
                className={`pb-2 text-[15px] font-medium transition-all relative ${
                    activeGigsTab === 'completed' ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                  Completed
                  {activeGigsTab === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />}
              </button>
              <button 
                onClick={() => setActiveGigsTab("rejected")}
                className={`pb-2 text-[15px] font-medium transition-all relative ${
                    activeGigsTab === 'rejected' ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                  Rejected
                  {activeGigsTab === 'rejected' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />}
              </button>
           </div>
        )}

        {/* Search Bar */}
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Search among 12 jobs..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50">
                <SlidersHorizontal className="w-5 h-5" />
            </button>
        </div>

        {/* Content List */}
        <div className="space-y-4 pb-20">
            {activeTab === 'submissions' ? (
                <>
                    <JobCard job={mockJob} actionButton={pendingButton} />
                    <JobCard job={{...mockJob, id: '2'}} actionButton={pendingButton} />
                    <JobCard job={{...mockJob, id: '3'}} actionButton={pendingButton} />
                </>
            ) : (
                <>
                    {/* Render Gigs based on Active Subtab */}
                    {activeGigsTab === 'active' && (
                        <>
                           <JobCard job={mockJob} actionButton={greenViewDetailsButton} />
                           <JobCard job={{...mockJob, id: 'gig2'}} actionButton={greenViewDetailsButton} />
                        </>
                    )}
                    {activeGigsTab === 'completed' && (
                        <>
                           <JobCard job={mockJob} actionButton={blueViewDetailsButton} />
                           <JobCard job={{...mockJob, id: 'gig3'}} actionButton={blueViewDetailsButton} />
                        </>
                    )}
                    {activeGigsTab === 'rejected' && (
                        <>
                           <JobCard job={mockJob} actionButton={redViewDetailsButton} />
                           <JobCard job={{...mockJob, id: 'gig4'}} actionButton={redViewDetailsButton} />
                        </>
                    )}
                </>
            )}
        </div>
      </div>
    </AppShell>
  );
}
