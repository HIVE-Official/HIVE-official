"use client";

import { useRouter } from "next/navigation";
import { SchoolPick, HiveLogo } from "@hive/ui";

// Define School type
interface School {
  id: string;
  name: string;
  domain: string;
  status: 'open' | 'waitlist' | 'coming-soon';
  waitlistCount?: number;
}

// HIVE schools - UB is the only active one
const HIVE_SCHOOLS: School[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open'
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    status: 'waitlist',
    waitlistCount: 89
  },
  {
    id: 'stony-brook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    status: 'waitlist',
    waitlistCount: 156
  },
  {
    id: 'st-bonaventure',
    name: 'St. Bonaventure University',
    domain: 'sbu.edu',
    status: 'waitlist',
    waitlistCount: 73
  },
  {
    id: 'buffalo-state',
    name: 'Buffalo State University',
    domain: 'buffalostate.edu',
    status: 'waitlist',
    waitlistCount: 45
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syr.edu',
    status: 'waitlist',
    waitlistCount: 127
  }
];

export default function SchoolSelectPage() {
  const router = useRouter();

  const handleSchoolSelect = async (school: School) => {
    
    // Store selected school in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("hive-selected-school-id", school.id);
      localStorage.setItem("hive-selected-school-name", school.name);
      localStorage.setItem("hive-selected-school-domain", school.domain);
    }

    // Navigate to email entry with school context
    router.push("/auth/email");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          {/* HIVE Logo */}
          <div className="flex justify-center">
            <HiveLogo 
              variant="white" 
              size="2xl" 
              animationType="gentle-float"
              className="drop-shadow-lg"
            />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-display font-medium text-foreground">
              Choose Your School
            </h1>
            <p className="text-xl text-muted font-sans max-w-lg mx-auto">
              HIVE is currently available at University at Buffalo, with other schools joining soon
            </p>
          </div>
          
          {/* HIVE Brand Mark */}
          <div className="flex items-center justify-center space-x-2 pt-4">
            <span className="text-lg font-display font-medium text-accent tracking-wide">HIVE</span>
            <span className="text-lg font-display font-light text-muted">— Your Campus OS</span>
          </div>
        </div>

        {/* School Selection */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <SchoolPick
            schools={HIVE_SCHOOLS}
            onSchoolSelect={handleSchoolSelect}
            className="bg-transparent border-none p-0"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted font-sans">
            Don't see your school? We're expanding to new campuses regularly.
          </p>
        </div>
      </div>
    </div>
  );
} 