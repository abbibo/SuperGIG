"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { JobService, Job } from "@/services/jobs";
import { ApplicationService } from "@/services/applications";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function ApplyClient() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !job || typeof id !== 'string') return;
    
    setSubmitting(true);
    try {
      await ApplicationService.submitApplication({
        jobId: id,
        seekerId: user.uid,
        seekerName: user.email || "Seeker", // Ideally profile name
        resumeUrl: resumeLink || "https://example.com/resume", // Mock if empty
        coverLetter,
        jobTitle: job.title,
        companyName: job.companyName
      });
      console.log('Application submitted, redirecting...'); // Debugging
      // Go to dashboard
      router.push("/seeker");
      router.refresh(); // Ensure dashboard updates
    } catch (error) {
      console.error(error);
      alert("Failed to apply");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!job) return <div className="p-8 text-center">Job not found</div>;

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Apply for {job.title}</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Link to Resume / Portfolio" 
            placeholder="https://linkedin.com/in/you"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            required
          />
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Cover Letter</label>
            <textarea
               className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
               rows={6}
               placeholder="Why are you a good fit?"
               value={coverLetter}
               onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" isLoading={submitting}>Submit Application</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
