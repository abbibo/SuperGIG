"use client";

import React from "react";
import { 
  ShieldCheck, 
  UserCircle, 
  Share2, 
  MapPin, 
  Shield, 
  MessageCircle, 
  HelpCircle, 
  FileCheck,
  FileLock,
  Headphones, // Alternative for support/team
  Lock,
  FileText
} from "lucide-react";

const MENU_ITEMS = [
  { icon: ShieldCheck, label: "Complete KYC", color: "text-blue-500" },
  { icon: UserCircle, label: "Manage Profile", color: "text-blue-500" },
  { icon: Share2, label: "Connect a Friend", color: "text-blue-500" },
  { icon: MapPin, label: "Change Location", color: "text-blue-500" },
  { icon: Shield, label: "Privacy policy", color: "text-green-500" }, // Icon color variation in prompt? Let's keep consistent blue/theme unless specified. Image shows all icons blueish outline.
  // Actually looking at image, they are all blue outlined icons.
  { icon: MessageCircle, label: "Talk to team Supergig", color: "text-blue-500" },
  { icon: HelpCircle, label: "Write to support", color: "text-blue-500" },
  { icon: Shield, label: "Privacy policy", color: "text-blue-500" }, // Duplicate in list? Image has "Privacy policy" twice? 
  // Image list: Complete KYC, Manage Profile, Connect a Friend, Change Location, Privacy policy, Talk to team..., Write to support, Privacy policy(again!), Community Guidelines, Terms.
  // I will replicate the duplicate if it's there or assume it's a mistake and list unique. 
  // Let's list exactly as image text.
  // 5th item: Privacy policy (Green Shield)
  // 8th item: Privacy policy (Blue Shield) -> Maybe one is Security?
  // I'll stick to the text.
  { icon: FileText, label: "Community Guidelines", color: "text-blue-500" },
  { icon: Lock, label: "Terms & Conditions", color: "text-blue-500" },
];

export function ProfileMenu() {
  return (
    <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
       <div className="divide-y divide-gray-100">
          {MENU_ITEMS.map((item, idx) => (
              <button 
                key={idx} 
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left group"
              >
                  <div className="text-blue-500">
                     <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[15px] font-medium text-gray-800">{item.label}</span>
              </button>
          ))}
       </div>
    </div>
  );
}
