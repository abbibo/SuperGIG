"use client";

import { useState, useEffect } from "react";
import { JobService } from "@/services/jobs";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/Button";

const sampleJobData: Omit<Job, "id" | "createdAt" | "updatedAt"> = {
  title: "Test Job Logic",
  companyName: "Test Company Inc.",
  description: "Testing CRUD ops",
  location: { city: "Mumbai", state: "Maharashtra" },
  schedule: { startDate: "2025-09-01", endDate: "2025-09-05", startTime: "09:00", endTime: "17:00" },
  compensation: { amount: 1000, unit: "day", currency: "INR" },
  dressCode: "casuals",
  requirements: {
    height: { minFt: 5.0, maxFt: 6.0 },
    drivingLicenseRequired: false,
    vehicleRequired: false,
    pvcRequired: false
  },
  capacity: { total: 5, male: 2, female: 3 },
  social: { allowReferral: false },
  stats: { appliedCount: 0, selectedCount: 0 },
  status: "active"
};

export default function CRUDTestPage() {
  const [status, setStatus] = useState<string>("Idle");
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [fetchedJob, setFetchedJob] = useState<Job | null>(null);
  const [allJobs, setAllJobs] = useState<Job[]>([]);

  const handleCreate = async () => {
    setStatus("Creating...");
    try {
      const id = await JobService.createJob(sampleJobData);
      setCreatedId(id);
      setStatus(`Created Job ID: ${id}`);
      refreshList();
    } catch (e: any) {
      setStatus(`Error Create: ${e.message}`);
    }
  };

  const handleRead = async () => {
    if (!createdId) return;
    setStatus("Reading...");
    try {
      const job = await JobService.getJob(createdId);
      setFetchedJob(job);
      setStatus(`Read Job: ${job?.title}`);
    } catch (e: any) {
      setStatus(`Error Read: ${e.message}`);
    }
  };

  const handleUpdate = async () => {
    if (!createdId) return;
    setStatus("Updating...");
    try {
      await JobService.updateJob(createdId, { title: "Updated Test Job Title" });
      setStatus("Updated Title.");
      handleRead();
      refreshList();
    } catch (e: any) {
      setStatus(`Error Update: ${e.message}`);
    }
  };

  const handleDelete = async () => {
    if (!createdId) return;
    setStatus("Deleting...");
    try {
      await JobService.deleteJob(createdId);
      setCreatedId(null);
      setFetchedJob(null);
      setStatus("Deleted.");
      refreshList();
    } catch (e: any) {
       setStatus(`Error Delete: ${e.message}`);
    }
  };

  const refreshList = async () => {
      const jobs = await JobService.getApprovedJobs();
      setAllJobs(jobs);
  };

  useEffect(() => {
      refreshList();
  }, []);

  return (
    <div className="p-10 space-y-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold">Firebase CRUD Test</h1>
      
      <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
        <p className="font-mono text-sm">Status: {status}</p>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleCreate} disabled={!!createdId}>1. Create</Button>
        <Button onClick={handleRead} disabled={!createdId}>2. Read</Button>
        <Button onClick={handleUpdate} disabled={!createdId}>3. Update</Button>
        <Button onClick={handleDelete} disabled={!createdId} className="bg-red-500 hover:bg-red-600">4. Delete</Button>
      </div>

      {fetchedJob && (
          <div className="mt-6 p-4 border rounded-lg bg-green-50">
              <h3 className="font-bold">Fetched Job Data:</h3>
              <pre className="text-xs mt-2 overflow-auto max-h-40">
                  {JSON.stringify(fetchedJob, null, 2)}
              </pre>
          </div>
      )}

      <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">All Active Jobs in DB ({allJobs.length})</h2>
          <div className="space-y-2">
              {allJobs.map(j => (
                  <div key={j.id} className="p-2 border rounded flex justify-between">
                      <span className="font-semibold">{j.title}</span>
                      <span className="text-gray-500 text-sm">{j.id}</span>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
