"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (userRole !== "admin") {
        router.push("/");
      }
    }
  }, [user, userRole, loading, router]);

  if (loading || !user || userRole !== "admin") {
    return <div className="p-8">Loading admin area...</div>;
  }

  return <>{children}</>;
}
