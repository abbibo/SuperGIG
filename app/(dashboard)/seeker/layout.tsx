"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SeekerLayout({ children }: { children: React.ReactNode }) {
  const { user, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (userRole !== "seeker") {
         // Seekers might just be default, but if we want strict separation:
        router.push("/");
      }
    }
  }, [user, userRole, loading, router]);

  if (loading || !user || userRole !== "seeker") {
    return <div className="p-8">Loading seeker area...</div>;
  }

  return <>{children}</>;
}
