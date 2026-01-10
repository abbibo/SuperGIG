"use client";

import React from "react";
import { Search, Bell } from "lucide-react";

export function HomeHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-transparent">
      {/* Left: User Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-500 overflow-hidden border-2 border-white shadow-sm">
           <img 
             src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" 
             alt="User Avatar" 
             className="w-full h-full object-cover"
           />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Job Title</h1>
          <div className="flex items-center text-xs text-gray-500">
             <span className="truncate max-w-[150px]">Company /job Creator</span>
          </div>
        </div>
      </div>

      {/* Right: Actions (Pill) */}
      <div className="h-10 px-4 rounded-full bg-white border border-gray-100 flex items-center gap-4 shadow-sm">
          <Search className="w-5 h-5 text-gray-600" />
          <div className="relative">
             <Bell className="w-5 h-5 text-gray-600" />
             <div className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          </div>
      </div>
    </div>
  );
}
