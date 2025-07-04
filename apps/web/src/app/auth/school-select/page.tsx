"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { SchoolPick, HiveLogo } from "@hive/ui";
import { motion } from "framer-motion";
import { SCHOOLS, type School } from "@hive/core";

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
    router.push(ROUTES.AUTH.EMAIL);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-8 mb-8">
          {/* HIVE Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18, delay: 0.05, ease: [0.33, 0.65, 0, 1] }}
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
            transition={{ duration: 0.18, delay: 0.1, ease: [0.33, 0.65, 0, 1] }}
            className="space-y-3"
          >
            <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">
              Choose Your Campus
            </h1>
            <p className="text-muted mt-2 font-sans max-w-lg mx-auto">
              HIVE is currently available at University at Buffalo, with other schools joining soon
            </p>
          </motion.div>
        </div>

        {/* School Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.15, ease: [0.33, 0.65, 0, 1] }}
          className="w-full"
        >
          <SchoolPick
            schools={SCHOOLS}
            onSchoolSelect={handleSchoolSelect}
            className="bg-transparent border-none p-0"
          />
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18, delay: 0.2, ease: [0.33, 0.65, 0, 1] }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted font-sans">
            Don't see your school? We're expanding to new campuses regularly.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
} 