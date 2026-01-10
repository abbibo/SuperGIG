"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Search, SlidersHorizontal } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import { JobService } from "@/services/jobs";
import { Job } from "@/types/job";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const blueViewDetailsButton = (
      <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] active:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl transition-all shadow-sm">
        View Details
      </button>
  );

  useEffect(() => {
    async function fetchJobs() {
      try {
        // Fetch real data
        const data = await JobService.getApprovedJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        // Fallback or empty state handled by length
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
     job.title.toLowerCase().includes(search.toLowerCase()) || 
     job.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  const JobSkeleton = () => (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-5 space-y-4 animate-pulse">
        <div className="flex justify-between items-start">
            <div className="flex gap-4 w-full">
                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                <div className="space-y-2 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
            </div>
        </div>
        <div className="space-y-3">
             <div className="h-4 bg-gray-200 rounded w-full" />
             <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="h-10 bg-gray-200 rounded-xl w-full" />
    </div>
  );

  return (
    <AppShell title="Jobs" showHeader={false}>
      <div className="max-w-md mx-auto space-y-4">
        {/* Search Header - standardized to match Status Page */}
        <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="Search Jobs" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50">
                <SlidersHorizontal className="w-5 h-5" />
            </button>
        </div>

        {/* Job List */}
        <div className="space-y-4 pb-20">
             {loading ? (
                <>
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                </>
             ) : (
                <>
                   {filteredJobs.length > 0 ? (
                       filteredJobs.map(job => (
                           <JobCard 
                              key={job.id} 
                              job={job} 
                              actionButton={blueViewDetailsButton}
                           />
                       ))
                   ) : (
                       <div className="text-center py-12 text-gray-500">
                           No jobs found.
                       </div>
                   )}
                </>
             )}
        </div>
      </div>
    </AppShell>
  );
}
