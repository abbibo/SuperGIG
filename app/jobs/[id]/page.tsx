"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Job, JobService } from "@/services/jobs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/components/providers/AuthProvider";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, userRole } = useAuth();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      if (typeof id === "string") {
        const jobData = await JobService.getJob(id);
        setJob(jobData);
      }
      setLoading(false);
    }
    fetchJob();
  }, [id]);

  const handleApply = () => {
    if (!user) {
      router.push(`/login?redirect=/jobs/${id}`);
    } else if (userRole !== 'seeker') {
      alert("Only Job Seekers can apply.");
    } else {
      // alert("Application feature coming soon!");
      // Ideally redirect to application page
      router.push(`/jobs/${id}/apply`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <p className="text-lg text-subtext-light dark:text-subtext-dark">Loading...</p>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <p className="text-lg text-destructive font-semibold">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark border-2 border-border-light dark:border-border-dark rounded-2xl p-8 md:p-10 space-y-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 pb-6 border-b border-border-light dark:border-border-dark">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-text-light dark:text-text-dark">
                {job.title}
              </h1>
              <p className="text-xl font-semibold text-primary mb-2">
                {job.companyName}
              </p>
              <p className="text-sm text-subtext-light dark:text-subtext-dark">
                Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {job.type && <Badge>{job.type}</Badge>}
              {job.status !== 'active' && <Badge variant="warning">{job.status}</Badge>}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
            <div>
              <span className="text-xs text-subtext-light dark:text-subtext-dark uppercase tracking-wider font-bold mb-2 block">
                Location
              </span>
              <p className="text-base font-semibold text-text-light dark:text-text-dark flex items-center gap-2">
                <span className="material-icons text-lg text-primary">location_on</span>
                {typeof job.location === 'string' ? job.location : `${job.location.city}, ${job.location.state}`}
              </p>
            </div>
            <div>
              <span className="text-xs text-subtext-light dark:text-subtext-dark uppercase tracking-wider font-bold mb-2 block">
                Salary
              </span>
              <p className="text-base font-semibold text-text-light dark:text-text-dark flex items-center gap-2">
                <span className="material-icons text-lg text-primary">attach_money</span>
                {typeof job.compensation === 'string' 
                  ? job.compensation 
                  : job.compensation.range 
                    ? job.compensation.range 
                    : `${job.compensation.amount} ${job.compensation.currency || 'INR'}/${job.compensation.unit || 'month'}`}
              </p>
            </div>
            <div>
              <span className="text-xs text-subtext-light dark:text-subtext-dark uppercase tracking-wider font-bold mb-2 block">
                Category
              </span>
              <p className="text-base font-semibold text-primary">
                {job.category}
              </p>
            </div>
            <div>
              <span className="text-xs text-subtext-light dark:text-subtext-dark uppercase tracking-wider font-bold mb-2 block">
                Job ID
              </span>
              <p className="text-sm font-mono text-subtext-light dark:text-subtext-dark">
                {job.id}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="pt-4">
            <h3 className="text-2xl font-bold mb-6 text-text-light dark:text-text-dark">
              Job Description
            </h3>
            <div className="prose prose-lg max-w-none text-subtext-light dark:text-subtext-dark whitespace-pre-wrap leading-relaxed">
              {job.description}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 border-t border-border-light dark:border-border-dark flex justify-end">
            {userRole === 'creator' && user?.uid === job.creatorId ? (
              <Button onClick={() => alert("Edit not implemented yet")}>Edit Job</Button>
            ) : (
              <Button size="lg" className="px-10" onClick={handleApply}>
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
