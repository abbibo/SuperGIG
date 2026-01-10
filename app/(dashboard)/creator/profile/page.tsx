"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { UserService, UserProfile } from "@/services/users";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function CreatorProfilePage() {
  /* 
   FIX: We rely on `loading` from useAuth to know if auth checks are done. 
   Then we fetch profile only if user exists; otherwise stop local loading.
  */
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
  });

  useEffect(() => {
    // If auth is still determining status, do nothing yet
    if (authLoading) return;

    // If no user after auth check, stop loading (page content or redirect handled elsewhere/manually)
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchProfile() {
      if (user) {
        try {
          const profile = await UserService.getUser(user.uid);
          if (profile) {
            setFormData({
              companyName: profile.companyName || "",
              companyDescription: profile.companyDescription || "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProfile();
  }, [user, authLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await UserService.updateUser(user.uid, {
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
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
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            name="companyName"
            label="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Company Description</label>
            <textarea
              name="companyDescription"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={4}
              value={formData.companyDescription}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-end">
             <Button type="submit" isLoading={saving}>Save Changes</Button>
          </div>
        </form>
      </Card>
      
      <div className="mt-4">
         <Button variant="ghost" onClick={() => router.push("/creator")}>&larr; Back to Dashboard</Button>
      </div>
    </div>
  );
}
