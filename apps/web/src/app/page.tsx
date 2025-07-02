"use client";

import Link from "next/link";
import { Button, Countdown, HiveLogo } from "@hive/ui";
import { ArrowRight, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const countdownTarget = "2024-07-08T00:00:00.000Z";

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0A0A0A] text-foreground overflow-hidden">
      {/* Subtle surface gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#111111,transparent_70%)]" />
      
      {/* Minimal animated particles - using white instead of gold */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white/10 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: [0, 0.1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: [0.33, 0.65, 0, 1], // HIVE's brand spring
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <header className="relative z-10 w-full p-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        >
          <HiveLogo variant="white" className="h-14 w-14 mx-auto" />
        </motion.div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
          className="w-full max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.18 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-6">
              HIVE vBETA
            </h1>

            <div className="bg-[#111111] backdrop-blur-sm rounded-xl border border-[#2A2A2A] p-8 mb-8 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)]">
              <Countdown targetDate={countdownTarget} />
            </div>

            <p className="max-w-2xl mx-auto mt-8 text-lg md:text-xl text-[#6B7280] font-sans leading-relaxed">
              A new social platform engineered for campus life. 
              <br className="hidden md:block" />
              Built by students, powered by community.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link href="/auth/school-select" legacyBehavior>
              <Button 
                size="lg" 
                variant="default"
                className="w-full sm:w-auto font-sans bg-white text-[#0A0A0A] hover:bg-white/90 transition-transform duration-[120ms] hover:scale-[1.02] focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto font-sans border-[#2A2A2A] hover:bg-[#1F1F1F] transition-transform duration-[120ms] focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
            >
              Learn More
              <Info className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, delay: 0.2 }}
        className="relative z-10 w-full p-8 text-center"
      >
        <p className="font-sans text-sm text-[#6B7280]">
          Built by Students &middot; Owned by Students &middot; Launching July 8th
        </p>
      </motion.footer>
    </div>
  );
}
