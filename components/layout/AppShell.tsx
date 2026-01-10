import React from "react";
import { GlassNav } from "./GlassNav";


interface AppShellProps {
  children: React.ReactNode;
  title?: string; // @deprecated
  showHeader?: boolean; // @deprecated
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col font-sans">
      {/* TopBar is now in RootLayout */}
      <main className="flex-1 pb-28 px-4 pt-4"> {/* Increased bottom padding for floating nav */}
        {children}
      </main>
      <GlassNav />
    </div>
  );
}
