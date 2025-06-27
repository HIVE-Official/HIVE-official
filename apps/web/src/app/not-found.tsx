"use client";

// import { useAuth } from "@hive/hooks";
// import { NotFound } from "@hive/ui";
import Link from "next/link";
import { Button } from "@hive/ui";
// import { useRouter } from "next/navigation"; // Unused import removed
import * as React from "react";
import { Home, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Number */}
        <motion.div
          className="text-8xl font-display font-bold text-accent mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          404
        </motion.div>

        {/* Main Message */}
        <motion.h1
          className="text-2xl font-display font-semibold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          jacob needs to fix this
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-muted font-sans mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          This page doesn&apos;t exist yet. Jacob is working on it.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link href="/">
            <Button className="w-full bg-foreground hover:bg-foreground/90 text-background">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Fun Detail */}
        <motion.div
          className="mt-8 p-4 bg-surface-01 border border-border rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-sm text-muted font-sans">
            <strong>Jacob&apos;s TODO:</strong><br />
            • Build this page<br />
            • Add proper routing<br />
            • Make it awesome
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
