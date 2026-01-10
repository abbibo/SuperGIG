"use client";

import { useEffect, useState } from "react";
import { Job, JobService } from "@/services/jobs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminJobsPage() {
  const [pendingJobs, setPendingJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const data = await JobService.getPendingJobs();
      setPendingJobs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAction = async (jobId: string, action: 'approved' | 'rejected') => {
    if (!confirm(`Are you sure you want to ${action} this job?`)) return;
    try {
      if (jobId) {
        await JobService.updateJobStatus(jobId, action);
        // Remove from list locally
        setPendingJobs(prev => prev.filter(j => j.id !== jobId));
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pending Jobs Review</h1>
        <Link href="/admin">
           <Button variant="ghost">Back to Dashboard</Button>
        </Link>
      </div>

      <Card>
        {loading ? (
          <p className="text-center py-8">Loading pending jobs...</p>
        ) : pendingJobs.length === 0 ? (
          <div className="text-center py-12 text-muted">
            No pending jobs to review. Great work!
          </div>
        ) : (
          <div className="space-y-6">
            {pendingJobs.map(job => (
              <div key={job.id} className="border rounded-lg p-6 bg-background">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <p className="text-lg text-primary">{job.companyName}</p>
                  </div>
                  <Badge variant="warning">{job.status}</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted mb-4">
                  <div><span className="font-semibold">Type:</span> {job.type}</div>
                  <div><span className="font-semibold">Loc:</span> {job.location}</div>
                  <div><span className="font-semibold">Cat:</span> {job.category}</div>
                  <div><span className="font-semibold">Salary:</span> {job.salary}</div>
                </div>
                
                <div className="bg-muted/10 p-4 rounded-md mb-6">
                   <p className="whitespace-pre-wrap text-sm">{job.description}</p>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                    onClick={() => job.id && handleAction(job.id, 'rejected')}
                  >
                    Reject
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                    onClick={() => job.id && handleAction(job.id, 'approved')}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
