"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Job, JobService } from "@/services/jobs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function CreatorDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      if (user) {
        try {
          const userJobs = await JobService.getJobsByCreator(user.uid);
          setJobs(userJobs);
        } catch (error) {
          console.error("Failed to fetch jobs", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchJobs();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <Link href="/creator/jobs/new">
          <Button>Post a Job</Button>
        </Link>
      </div>
      
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Jobs</h2>
        </div>
        
        {loading ? (
          <p className="text-muted text-center py-4">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted mb-4">You haven't posted any jobs yet.</p>
            <Link href="/creator/jobs/new">
              <Button variant="outline">Create your first job</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <div className="text-sm text-muted flex gap-2">
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <Badge variant={
                     job.status === 'approved' ? 'success' : 
                     job.status === 'rejected' ? 'destructive' : 
                     'warning'
                   }>
                     {job.status.toUpperCase()}
                   </Badge>
                   {/* Edit/Delete buttons could go here */}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
