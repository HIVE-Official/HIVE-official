"use client";

import Link from "next/link";
import { Button, Countdown, HiveLogo } from "@hive/ui";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Particle component to avoid re-rendering issues
const Particle = () => {
  const duration = Math.random() * 5 + 5;
  const delay = Math.random() * 3;
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;

  return (
    <motion.div
      className="absolute w-px h-px bg-white/10 rounded-full"
      initial={{ x: `${startX}%`, y: `${startY}%`, opacity: 0 }}
      animate={{
        x: `${startX + (Math.random() - 0.5) * 20}%`,
        y: `${startY + (Math.random() - 0.5) * 20}%`,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

export default function LandingPage() {
  const countdownTarget = "2024-08-01T00:00:00.000Z";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1A1A1A_0%,#0A0A0A_50%)]" />
      <div className="absolute inset-0 z-0">{isMounted && [...Array(12)].map((_, i) => <Particle key={i} />)}</div>

      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      <header className="relative z-10 w-full p-8 flex justify-between items-center">
        <HiveLogo variant="white" className="h-10 w-auto" />
        <Button variant="ghost" size="sm" asChild>
          <Link href="/auth/school-select">Sign In</Link>
        </Button>
      </header>

      <main className="relative z-10 flex-grow flex items-center p-8">
        <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              The Campus OS
            </motion.h1>
            <motion.p 
              className="max-w-md text-lg md:text-xl text-zinc-400 mb-10 font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              Minimal surface. Maximal spark. A real-time community engine,
              built by students, for students.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Button size="lg" className="group" asChild>
                <Link href="/auth/school-select">
                  <span className="flex items-center">
                    Join the Waitlist
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="relative flex items-center justify-center">
            <motion.div 
              className="w-full max-w-md bg-[#111]/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl shadow-yellow-500/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <h2 className="text-center font-display text-2xl mb-2 text-yellow-400">HIVE vBETA</h2>
              <p className="text-center text-zinc-400 mb-6">Launching Soon</p>
              <Countdown targetDate={countdownTarget} />
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full p-8 text-center">
        <motion.div 
          className="inline-flex items-center text-zinc-500 font-sans text-sm gap-2 cursor-pointer hover:text-white transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          Learn More
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </footer>
    </div>
  );
}
