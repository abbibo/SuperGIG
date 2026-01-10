"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { ApplicationService, Application } from "@/services/applications";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function SeekerDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApps() {
      if (user) {
        try {
          const apps = await ApplicationService.getApplicationsByUser(user.uid);
          setApplications(apps);
        } catch (error) {
          console.error("Failed to fetch applications", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchApps();
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-2">
            Job Seeker Dashboard
          </h1>
          <p className="text-subtext-light dark:text-subtext-dark">
            Manage your job applications and profile
          </p>
        </div>
        <Link href="/jobs">
          <Button variant="outline">Browse Jobs</Button>
        </Link>
      </div>
      
      {/* Applications Card */}
      <Card padding="lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">My Applications</h2>
          <span className="text-sm text-subtext-light dark:text-subtext-dark font-medium">
            {applications.length} {applications.length === 1 ? 'application' : 'applications'}
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-subtext-light dark:text-subtext-dark">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-icons text-4xl text-primary">work_outline</span>
            </div>
            <p className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
              No applications yet
            </p>
            <p className="text-subtext-light dark:text-subtext-dark mb-6">
              You haven't applied to any jobs yet.
            </p>
            <Link href="/jobs">
              <Button>Find a Job</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div 
                key={app.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-2 border-border-light dark:border-border-dark rounded-xl bg-white dark:bg-surface-dark hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex-1 mb-4 sm:mb-0">
                  <h3 className="font-bold text-xl text-text-light dark:text-text-dark mb-2">
                    {app.jobTitle}
                  </h3>
                  <p className="text-base font-semibold text-subtext-light dark:text-subtext-dark mb-2">
                    {app.companyName}
                  </p>
                  <p className="text-sm text-subtext-light dark:text-subtext-dark">
                    Applied: {new Date(app.createdAt?.toDate?.() || Date.now()).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                   <Badge variant={
                     app.status === 'accepted' ? 'success' : 
                     app.status === 'rejected' ? 'destructive' : 
                     'default'
                   }>
                     {app.status.toUpperCase()}
                   </Badge>
                   <Link href={`/jobs/${app.jobId}`}>
                     <Button variant="ghost" size="sm">View Job</Button>
                   </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
