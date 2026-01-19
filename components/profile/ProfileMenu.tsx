"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  UserCircle, 
  Share2, 
  MapPin, 
  Shield, 
  MessageCircle, 
  HelpCircle, 
  FileText,
  Lock,
  LogOut
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthProvider";

const MENU_ITEMS = [
  { icon: ShieldCheck, label: "Complete KYC", color: "text-blue-500", href: "/profile/kyc" },
  { icon: UserCircle, label: "Manage Profile", color: "text-blue-500", href: "/profile/edit" },
  { icon: Share2, label: "Connect a Friend", color: "text-blue-500", href: "/referral" },
  { icon: MapPin, label: "Change Location", color: "text-blue-500", href: "/settings/location" },
  { icon: Shield, label: "Privacy policy", color: "text-green-500", href: "/privacy" },
  { icon: MessageCircle, label: "Talk to team Supergig", color: "text-blue-500", href: "/contact" },
  { icon: HelpCircle, label: "Write to support", color: "text-blue-500", href: "/support" },
  { icon: FileText, label: "Community Guidelines", color: "text-blue-500", href: "/guidelines" },
  { icon: Lock, label: "Terms & Conditions", color: "text-blue-500", href: "/terms" },
];

export function ProfileMenu() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login"); // Redirect handled by AuthProvider typically, but explicit push is safe
  };

  return (
    <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
       <div className="divide-y divide-gray-100">
          {MENU_ITEMS.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left group"
              >
                  <div className="text-blue-500">
                     <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[15px] font-medium text-gray-800">{item.label}</span>
              </Link>
          ))}
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-left group text-red-600"
          >
              <div className="text-red-500">
                 <LogOut size={22} strokeWidth={1.5} />
              </div>
              <span className="text-[15px] font-medium">Log Out</span>
          </button>
       </div>
    </div>
  );
}
