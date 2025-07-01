import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Input } from "@hive/ui";
import { Search, School, ArrowRight, Lock } from "lucide-react";
import { HiveLogo } from "@/components/brand/hive-logo";

// Static list of schools for demo
const SCHOOLS = [
  {
    id: "buffalo",
    name: "University at Buffalo",
    domain: "buffalo.edu",
    isActive: true,
  },
  {
    id: "cornell",
    name: "Cornell University",
    domain: "cornell.edu",
    isActive: false,
  },
  {
    id: "syracuse",
    name: "Syracuse University",
    domain: "syracuse.edu",
    isActive: false,
  },
  // Add more schools as needed
];

export default function SelectPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
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
            Choose Your Campus
          </h1>
          <p className="text-xl text-muted font-sans max-w-lg mx-auto">
            HIVE is launching at University at Buffalo, with other schools joining soon
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="w-full max-w-2xl mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <Input
            type="text"
            placeholder="Search for your school..."
            className="w-full pl-10 bg-surface-01 border-border text-foreground placeholder:text-muted"
          />
        </div>
      </div>

      {/* School List */}
      <div className="w-full max-w-2xl space-y-4">
        {SCHOOLS.map((school) => (
          <motion.div
            key={school.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {school.isActive ? (
              <Link href="/role">
                <Button
                  variant="outline"
                  className="w-full p-6 h-auto bg-surface hover:bg-surface-01 border-border group"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-surface-01 rounded-full flex items-center justify-center">
                        <School className="w-6 h-6 text-accent" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-display font-medium text-lg text-foreground">
                          {school.name}
                        </h3>
                        <p className="text-sm text-muted">
                          @{school.domain}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
                  </div>
                </Button>
              </Link>
            ) : (
              <div className="w-full p-6 bg-surface border border-border rounded-lg opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-surface-01 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-muted" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium text-lg text-foreground">
                        {school.name}
                      </h3>
                      <p className="text-sm text-muted">
                        Coming Soon – 384 spots left
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 