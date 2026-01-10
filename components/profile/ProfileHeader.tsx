"use client";

import React from "react";
import { Star, MoreVertical, Bike, Car, Truck } from "lucide-react";

export function ProfileHeader() {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative">
       {/* Top Right Menu */}
       <button className="absolute top-4 right-4 text-gray-400">
          <MoreVertical size={20} />
       </button>
       
       <div className="flex items-start gap-4">
          {/* Avatar Area */}
          <div className="relative">
             <div className="w-24 h-24 rounded-full bg-blue-500 overflow-hidden border-4 border-blue-100 flex items-center justify-center">
                 <img 
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                 />
             </div>
             {/* Rating Badge */}
             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                 <Star size={10} fill="currentColor" />
                 <span>7.8</span>
             </div>
          </div>

          {/* User Info */}
          <div className="flex-1 mt-1">
             <h2 className="text-lg font-bold text-gray-900">ASDFGHJKL qertyu</h2>
             <p className="text-gray-400 text-sm flex items-center gap-1">
                <span className="inline-block">📄</span> #33Wf256XR
             </p>
             
             {/* Icons row */}
             <div className="flex gap-2 mt-2">
                <div className="w-8 h-6 bg-green-500 rounded flex items-center justify-center text-white shadow-sm">
                   {/* Placeholder icon resembling the image */}
                   <span className="text-[10px] font-bold">:::</span>
                </div>
                <div className="w-8 h-6 bg-green-500 rounded flex items-center justify-center text-white shadow-sm">
                   <Car size={14} />
                </div>
                 <div className="w-8 h-6 bg-red-500 rounded flex items-center justify-center text-white shadow-sm">
                   <Bike size={14} />
                </div>
             </div>
          </div>
       </div>

       {/* Stats Row */}
       <div className="flex items-center justify-between mt-6 text-center divide-x divide-gray-100">
           <div className="flex-1 px-2">
              <div className="text-lg font-bold text-gray-900">352</div>
              <div className="text-[10px] text-gray-500 font-medium mt-0.5">Job Points</div>
           </div>
           <div className="flex-1 px-2">
              <div className="text-lg font-bold text-gray-900">12</div>
              <div className="text-[10px] text-gray-500 font-medium mt-0.5">Completed Works</div>
           </div>
           <div className="flex-1 px-2">
              <div className="text-lg font-bold text-gray-900">155</div>
              <div className="text-[10px] text-gray-500 font-medium mt-0.5">Points Earned</div>
           </div>
       </div>
    </div>
  );
}
