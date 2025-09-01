"use client";

import { SchoolPick } from "@hive/ui";
import { SCHOOLS } from "@hive/core/constants/school-domains";
import { type School } from "@hive/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SchoolSelectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSchoolSelect = async (school: School) => {
    setIsLoading(true);
    // Store selected school details in localStorage with the correct keys
    localStorage.setItem('hive-selected-school-id', school.id);
    localStorage.setItem('hive-selected-school-name', school.name);
    localStorage.setItem('hive-selected-school-domain', school.domain);
    
    // Navigate to the main auth page
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-sans font-bold mb-3">Find Your Campus</h1>
          <p className="text-muted-foreground text-lg">Select your school to continue</p>
        </div>
        <SchoolPick 
          schools={SCHOOLS}
          onSchoolSelect={handleSchoolSelect}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
} 