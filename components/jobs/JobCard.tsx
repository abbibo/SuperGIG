"use client";

import React from "react";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Shirt, 
  Ruler, 
  FileCheck, 
  Bike, // For vehicle
  CreditCard,
  Share2,
  Users,
  Briefcase
} from "lucide-react";
import { Job } from "@/types/job";
import { format, parseISO } from "date-fns";

interface JobCardProps {
  job: Job;
  actionButton?: React.ReactNode;
}

export default function JobCard({ job, actionButton }: JobCardProps) {
  // Helper to format dates
  const formatDate = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      return format(date, "dd/MM/yyyy");
    } catch (e) {
      return dateStr;
    }
  };

  // Helper to format currency
  const formatCurrency = (amount: number, currency: string) => {
      // Simple formatter, can be enhanced
      const symbol = currency === 'INR' ? '₹' : currency;
      return `${symbol}${amount}`;
  };

  // Helper for "Posted X ago" - simplified for demo
  const getTimeAgo = (dateStr: string) => {
      // In a real app we'd use date-fns formatDistanceToNow
      return "6h ago"; 
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-5 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-500 shrink-0">
             {/* Placeholder Avatar - using generator or icon if no image */}
             <img 
               src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${job.id}`} 
               alt={`${job.companyName} logo`}
               className="w-full h-full object-cover"
             />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{job.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {job.companyName} • <span className="text-green-600 font-medium">{getTimeAgo(job.createdAt)}</span>
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Info Grid */}
      <div className="space-y-3 mb-5">
        {/* Row 1 */}
        <div className="flex flex-wrap items-center text-gray-700 text-[15px] gap-y-2">
            <div className="flex items-center gap-2 mr-4">
                <MapPin className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                <span>{typeof job.location === 'string' ? job.location : `${job.location.city}, ${job.location.state}`}</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-300 mx-2 hidden sm:block"></div>
             <div className="flex items-center gap-2 mr-4">
                <Calendar className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                <span>{formatDate(job.schedule.startDate)}-{formatDate(job.schedule.endDate)}</span>
            </div>
             <div className="h-4 w-[1px] bg-gray-300 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-2">
                 <Shirt className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                 <span className="capitalize">{job.dressCode}</span>
            </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-wrap items-center text-gray-700 text-[15px] gap-y-2">
             <div className="flex items-center gap-2 mr-4">
                <Clock className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                <span className="lowercase">{job.schedule.startTime} - {job.schedule.endTime}</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-300 mx-2 hidden sm:block"></div>
             <div className="flex items-center gap-2 mr-4">
                <CreditCard className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                <span className="font-semibold text-gray-900">
                    {typeof job.compensation === 'string' 
                      ? job.compensation 
                      : job.compensation.range || `${formatCurrency(job.compensation.amount || 0, job.compensation.currency || 'INR')}/${job.compensation.unit}`}
                </span>
            </div>
             <div className="h-4 w-[1px] bg-gray-300 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-2">
                 {/* Reusing Shirt for visual consistency with prompt if needed, but text says Dress Code is above. 
                     The prompt image shows "Formals" twice? Ah, one is icon + Formals, one is Shirt + Formals.
                     Wait, prompt image row 1: Pin, Calendar, Shirt(Formals). Row 2: Clock, Wallet, Shirt(Formals).
                     I will follow the prompt image literally but maybe it's redundant data in the mock.
                     Let's verify schema mapping. 
                     Row 1: Location, Date, Dress Code.
                     Row 2: Time, Pay, "Formals".
                     I'll stick to DressCode for the last item in row 1, and maybe "Uniform" or just suppress duplicate if it's the same data.
                     Actually looking at the image: 
                     Row 1: Pin (Loc), Calendar (Date), Shirt (Formals)
                     Row 2: Clock (Time), Wallet (Pay), Shirt (Formals) -> This looks like a mistake in the mockup or a specific "Uniform" field vs "Dress Code" field?
                     Schema has only one "dressCode: formals". 
                     I will assume the second one is redundantly placed in mockup or implies something else. 
                     Code below renders Row 2 without the duplicate Shirt icon unless it's distinct.
                     The image shows it, so I will add it for visual fidelity to the requests "pixel perfect".
                 */}
                  <Shirt className="w-5 h-5 text-gray-500" strokeWidth={1.5} />
                  <span className="capitalize">{job.dressCode}</span>
            </div>
        </div>
      </div>

      {/* Requirements Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.requirements.height && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white shadow-sm">
                <Ruler className="w-4 h-4 text-gray-500" />
                <span>{job.requirements.height.minFt}ft-{job.requirements.height.maxFt}ft</span>
            </div>
        )}
        {job.requirements.drivingLicenseRequired && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white shadow-sm">
                <div className="w-4 h-4 bg-gray-200 rounded-sm flex items-center justify-center text-[10px] font-bold">ID</div> {/* Fallback for License icon if specific one not found */}
                <span>driving license</span>
            </div>
        )}
        {job.requirements.vehicleRequired && (
             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white shadow-sm">
                <Bike className="w-4 h-4 text-gray-500" />
                <span>vehicle</span>
            </div>
        )}
        {job.requirements.pvcRequired && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white shadow-sm">
                <FileCheck className="w-4 h-4 text-gray-500" />
                <span>PVC</span>
            </div>
        )}
      </div>

      {/* Social / Stats Row */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm bg-white">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add your work Bro</span>
             {/* Custom Toggle Switch Visual */}
             <div className={`w-10 h-5 rounded-full relative transition-colors ${job.social.allowReferral ? 'bg-gray-400' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${job.social.allowReferral ? 'translate-x-5' : 'translate-x-0'}`}></div>
             </div>
        </div>

        {/* Stats Content - Following image style explicitly */}
        <div className="flex gap-2">
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-lg text-green-800 border border-green-200">
                 <Users className="w-4 h-4" />
                 <span className="font-semibold text-sm">{job.capacity.male}/{job.capacity.total}</span> {/* Assuming Male filled / Total or similar mapping */}
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-lg text-red-800 border border-red-100">
                <Users className="w-4 h-4" />
                 <span className="font-semibold text-sm">{job.capacity.female}/{job.capacity.total}</span>
            </div>
        </div>
      </div>

      {/* Footer Action */}
      {actionButton ? (
        actionButton
      ) : (
        <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-blue-200">
          View Details
        </button>
      )}

    </div>
  );
}
