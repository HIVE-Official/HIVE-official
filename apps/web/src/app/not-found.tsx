"use client";

// import { useAuth } from "@hive/hooks";
// import { NotFound } from "@hive/ui";
import Link from "next/link";
import { Button, HiveLogo } from "@hive/ui";
// import { useRouter } from "next/navigation"; // Unused import removed
import * as React from "react";
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGNpcmNsZSBmaWxsPSIjZmZmZmZmIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyIi8+PC9zdmc+')] bg-repeat" />
      
      <motion.div
        className="text-center max-w-md space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* HIVE Logo */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <HiveLogo 
            variant="white" 
            size="xl" 
            animationType="gentle-float"
            className="opacity-60"
          />
        </motion.div>

        {/* 404 Number */}
        <motion.div
          className="text-8xl font-display font-bold text-accent mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        >
          404
        </motion.div>

        {/* Main Message */}
        <motion.h1
          className="text-2xl font-display font-semibold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-muted font-sans mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          This page doesn&apos;t exist in the HIVE. Let&apos;s get you back to where you belong.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link href="/">
            <Button className="w-full bg-accent hover:bg-accent/90 text-background font-medium">
              <Home className="w-4 h-4 mr-2" />
              Go to HIVE Home
            </Button>
          </Link>
          
          <Button
            variant="outline"
            className="w-full border-accent text-accent hover:bg-accent hover:text-background"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Footer Credo */}
        <motion.div
          className="pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-sm text-muted font-sans tracking-wide">
            Built by Students · Owned by Students.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
