"use client";

import { useRouter } from "next/navigation";
import { SchoolPick, HiveLogo } from "@hive/ui";
import { motion } from "framer-motion";
import type { School } from "@hive/core";

// HIVE schools - UB is the only active one
const HIVE_SCHOOLS: School[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open',
    studentsUntilOpen: 0,
    waitlistCount: 0
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    status: 'waitlist',
    studentsUntilOpen: 100,
    waitlistCount: 89
  },
  {
    id: 'stony-brook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    status: 'waitlist',
    studentsUntilOpen: 150,
    waitlistCount: 156
  },
  {
    id: 'st-bonaventure',
    name: 'St. Bonaventure University',
    domain: 'sbu.edu',
    status: 'waitlist',
    studentsUntilOpen: 75,
    waitlistCount: 73
  },
  {
    id: 'buffalo-state',
    name: 'Buffalo State University',
    domain: 'buffalostate.edu',
    status: 'waitlist',
    studentsUntilOpen: 50,
    waitlistCount: 45
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syr.edu',
    status: 'waitlist',
    studentsUntilOpen: 125,
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
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          {/* HIVE Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <HiveLogo 
              variant="white" 
              size="2xl" 
              animationType="gentle-float"
              className="drop-shadow-lg"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <h1 className="text-4xl font-display font-medium text-foreground tracking-tight">
              Choose Your Campus
            </h1>
            <p className="text-lg text-muted/80 font-sans max-w-lg mx-auto">
              HIVE is currently available at University at Buffalo, with other schools joining soon
            </p>
          </motion.div>
        </div>

        {/* School Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-surface/30 backdrop-blur-sm border border-border/30 rounded-xl p-6"
        >
          <SchoolPick
            schools={HIVE_SCHOOLS}
            onSchoolSelect={handleSchoolSelect}
            className="bg-transparent border-none p-0"
          />
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted/60 font-sans">
            Don't see your school? We're expanding to new campuses regularly.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 