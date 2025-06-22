"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CtaButton } from "../ui/cta-button";

export interface HeroProps {
  onCtaClick?: () => void;
}

export function Hero({ onCtaClick }: HeroProps) {
  return (
    <header className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6 text-center text-white">
      <div className="relative z-10 mx-auto max-w-6xl flex flex-col items-center gap-8">
        {/* Single powerful statement */}
        <motion.h1
          className="font-display text-8xl font-black uppercase tracking-tight text-center leading-[0.9] sm:text-9xl lg:text-[12rem]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="hive-gradient-text">HIVE</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <CtaButton size="lg" onClick={onCtaClick}>
            Join now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </CtaButton>
        </motion.div>
      </div>
    </header>
  );
}
