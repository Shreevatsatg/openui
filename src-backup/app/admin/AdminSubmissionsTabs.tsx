"use client";

import { useState } from "react";
import { AdminSubmissionList } from "./AdminSubmissionList";
import { Button } from "@/components/ui/button";

type SubmissionsData = any[];

interface AdminSubmissionsTabsProps {
  pending: SubmissionsData;
  approved: SubmissionsData;
  rejected: SubmissionsData;
}

export function AdminSubmissionsTabs({ pending, approved, rejected }: AdminSubmissionsTabsProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");

  return (
    <div className="mb-12">
      <div className="flex gap-2 mb-6 border-b border-border/50 pb-4">
        <Button 
          variant={activeTab === "pending" ? "default" : "outline"} 
          onClick={() => setActiveTab("pending")}
          className={activeTab === "pending" ? "text-background" : ""}
        >
          Pending ({pending.length})
        </Button>
        <Button 
          variant={activeTab === "approved" ? "default" : "outline"} 
          onClick={() => setActiveTab("approved")}
          className={activeTab === "approved" ? "text-background" : ""}
        >
          Approved ({approved.length})
        </Button>
        <Button 
          variant={activeTab === "rejected" ? "default" : "outline"} 
          onClick={() => setActiveTab("rejected")}
          className={activeTab === "rejected" ? "text-background" : ""}
        >
          Rejected ({rejected.length})
        </Button>
      </div>

      <div className="mt-6">
        {activeTab === "pending" && (
          pending.length === 0 ? (
            <div className="text-center p-12 border border-dashed rounded-lg text-muted-foreground">
                No pending submissions right now.
            </div>
          ) : (
            <AdminSubmissionList submissions={pending} status="pending" />
          )
        )}
        
        {activeTab === "approved" && (
          approved.length === 0 ? (
            <div className="text-center p-12 border border-dashed rounded-lg text-muted-foreground">
                No components have been approved yet.
            </div>
          ) : (
            <AdminSubmissionList submissions={approved} status="approved" />
          )
        )}
        
        {activeTab === "rejected" && (
          rejected.length === 0 ? (
            <div className="text-center p-12 border border-dashed rounded-lg text-muted-foreground">
                No rejected components right now.
            </div>
          ) : (
            <AdminSubmissionList submissions={rejected} status="rejected" />
          )
        )}
      </div>
    </div>
  );
}
