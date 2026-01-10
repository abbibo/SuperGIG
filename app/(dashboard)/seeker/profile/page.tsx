"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { UserService } from "@/services/users";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function SeekerProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    skills: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const profile = await UserService.getUser(user.uid);
        if (profile) {
          setFormData({
            displayName: profile.displayName || user.displayName || "",
            bio: profile.bio || "",
            skills: profile.skills ? profile.skills.join(", ") : "",
          });
        }
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await UserService.updateUser(user.uid, {
        displayName: formData.displayName,
        bio: formData.bio,
        skills: formData.skills.split(",").map(s => s.trim()).filter(s => s),
      });
      alert("Profile updated successfully");
      router.refresh();
    } catch (error) {
       console.error(error);
       alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="displayName"
            label="Full Name"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
          
          <Input
            name="skills"
            label="Skills (comma separated)"
            placeholder="React, Node.js, Design"
            value={formData.skills}
            onChange={handleChange}
          />
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-end">
             <Button type="submit" isLoading={saving}>Save Changes</Button>
          </div>
        </form>
      </Card>
      
      <div className="mt-4">
         <Button variant="ghost" onClick={() => router.push("/seeker")}>&larr; Back to Dashboard</Button>
      </div>
    </div>
  );
}
