"use client";
import SideNav from "@/components/Sidenav";
import { SignedIn } from "@clerk/clerk-react";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <SignedIn>
      <div className="flex">
        {/* Sidebar (Fixed width on desktop) */}
        <div className="fixed top-0 left-0 h-full w-64 z-50">
          <SideNav />
        </div>

        {/* Main content shifted to the right with padding-top for mobile navbar */}
        <div className="flex-1 md:ml-64 pt-16 p-4">
          {children}
        </div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;
