"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { UserCircle, Briefcase, MapPin } from "lucide-react";

export function UserSummaryCard() {
  const { user, userRole } = useAuth();
  
  // Mock data for active gig (replace with real data fetch later)
  const activeGig = {
    title: "Review Landing Page Design",
    client: "TechFlow Inc.",
    dueDate: "2 days left",
    price: "$250"
  };

  if (!user) return (
      <Card className="glass-panel p-6 mb-6">
          <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-xl font-bold">Welcome to JobLink</h3>
              <p className="text-subtext-light dark:text-subtext-dark">Sign in to manage your gigs and profile.</p>
          </div>
      </Card>
  );

  return (
    <div className="space-y-6">
      {/* Profile Summary */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
            <div className="w-full h-full rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center">
                <UserCircle size={40} className="text-subtext-light dark:text-subtext-dark" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.displayName || "User"}</h2>
            <div className="flex items-center gap-2 mt-1">
               <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary text-xs uppercase tracking-wider">
                  {userRole || "Member"}
               </Badge>
               <span className="text-xs text-subtext-light dark:text-subtext-dark flex items-center gap-1">
                 <MapPin size={12} /> New York, USA
               </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
           <div className="bg-background-light/50 dark:bg-background-dark/50 p-3 rounded-xl">
              <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Total Earnings</p>
              <p className="text-lg font-bold font-mono">$1,250</p>
           </div>
           <div className="bg-background-light/50 dark:bg-background-dark/50 p-3 rounded-xl">
              <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Completed Gigs</p>
              <p className="text-lg font-bold font-mono">12</p>
           </div>
        </div>
      </div>

      {/* Active Gig Card */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="font-semibold text-lg">Active Gig</h3>
          <span className="text-xs text-primary font-medium">View All</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl relative group cursor-pointer transition-all hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-3">
               <div>
                  <h4 className="font-bold text-base mb-1">{activeGig.title}</h4>
                  <p className="text-xs text-subtext-light dark:text-subtext-dark flex items-center gap-1">
                    <Briefcase size={12} /> {activeGig.client}
                  </p>
               </div>
               <span className="bg-accent/20 text-accent-foreground text-xs font-bold px-2 py-1 rounded-lg">
                  In Progress
               </span>
            </div>
            
            <div className="w-full bg-secondary h-2.5 rounded-full mt-4 overflow-hidden">
               <div className="bg-primary h-full w-[65%] rounded-full relative">
                  <div className="absolute right-0 top-0 bottom-0 w-full animate-progress-shine bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               </div>
            </div>
            
            <div className="flex justify-between items-center mt-3 text-xs font-medium">
               <span className="text-subtext-light dark:text-subtext-dark">{activeGig.dueDate}</span>
               <span>{activeGig.price}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
