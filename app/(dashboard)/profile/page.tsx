"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileMenu } from "@/components/profile/ProfileMenu";

export default function ProfilePage() {
  return (
    <AppShell title="Profile" showHeader={false}>
      <div className="max-w-md mx-auto space-y-4">
         <ProfileHeader />
         <ProfileMenu />
      </div>
    </AppShell>
  );
}
