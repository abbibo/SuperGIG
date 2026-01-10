"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/jobs" className="block">
          <div className="border p-6 rounded-lg bg-card text-card-foreground hover:border-primary transition-colors cursor-pointer">
            <h3 className="text-lg font-medium mb-2">Pending Jobs</h3>
            <p className="text-3xl font-bold text-primary">Review &rarr;</p>
            <p className="text-sm text-muted mt-2">Approve or reject job postings</p>
          </div>
        </Link>
        <div className="border p-6 rounded-lg bg-card text-card-foreground">
          <h3 className="text-lg font-medium">User Management</h3>
          <p className="text-3xl font-bold">Manage</p>
          <p className="text-sm text-muted mt-2">View and manage users (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}
