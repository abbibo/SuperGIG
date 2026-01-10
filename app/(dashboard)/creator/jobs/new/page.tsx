"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { JobService } from "@/services/jobs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function CreateJobPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "full-time",
    location: "",
    salary: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    
    try {
      await JobService.createJob({
        creatorId: user.uid,
        title: formData.title,
        category: formData.category,
        type: formData.type as any,
        location: formData.location,
        salary: formData.salary,
        description: formData.description,
        companyName: user.displayName || "Company", // Ideally fetch profile
      });
      router.push("/creator");
    } catch (error) {
      console.error(error);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Post a 2New Job</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="title"
            label="Job Title"
            required
            placeholder="e.g. Senior Frontend Engineer"
            value={formData.title}
            onChange={handleChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Job Type</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
             </div>
             
             <Input
                name="category"
                label="Category"
                placeholder="e.g. Engineering, Design"
                value={formData.category}
                onChange={handleChange}
             />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input
                name="location"
                label="Location"
                placeholder="e.g. Remote, New York, NY"
                value={formData.location}
                onChange={handleChange}
             />
             <Input
                name="salary"
                label="Salary Range"
                placeholder="e.g. $100k - $120k"
                value={formData.salary}
                onChange={handleChange}
             />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              required
              rows={6}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-end gap-4">
             <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
             <Button type="submit" isLoading={loading}>Submit for Approval</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
