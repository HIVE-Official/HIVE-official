"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ButtonEnhanced, HiveLogo } from "@hive/ui";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  GraduationCap,
  Users,
} from "lucide-react";
import { useState } from "react";
import { OrgAccessModal } from "@/components/modals/org-access-modal";

export default function RolePage() {
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <motion.div
        className="self-start mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ButtonEnhanced asChild variant="ghost" className="text-muted hover:text-foreground group">
          <Link href="/select">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Change School
          </Link>
        </ButtonEnhanced>
      </motion.div>

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
            Choose Your Role
          </h1>
          <p className="text-xl text-muted font-sans max-w-lg mx-auto">
            How would you like to join HIVE?
          </p>
        </div>
      </div>

      {/* Role Options */}
      <div className="w-full max-w-2xl space-y-4">
        {/* Student Option */}
        <Link href="/auth">
          <ButtonEnhanced
            variant="outline"
            className="w-full p-6 h-auto bg-surface hover:bg-surface-01 border-border group"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-surface-01 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-medium text-lg text-foreground">
                    Student
                  </h3>
                  <p className="text-sm text-muted">
                    Join your campus community
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
            </div>
          </ButtonEnhanced>
        </Link>

        {/* Faculty Option */}
        <ButtonEnhanced
          variant="outline"
          className="w-full p-6 h-auto bg-surface border-border opacity-60 cursor-not-allowed group"
          onClick={() => setIsOrgModalOpen(true)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-surface-01 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-muted" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-medium text-lg text-foreground">
                  Faculty
                </h3>
                <p className="text-sm text-muted">
                  Run a club? Request org access
                </p>
              </div>
            </div>
          </div>
        </ButtonEnhanced>

        {/* Alumni Option */}
        <div className="w-full p-6 bg-surface border border-border rounded-lg opacity-60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-surface-01 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-muted" />
              </div>
              <div className="text-left">
                <h3 className="font-display font-.medium text-lg text-foreground">
                  Alumni
                </h3>
                <p className="text-sm text-muted">
                  Coming Soon – Stay connected to your alma mater
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Access Modal */}
      <OrgAccessModal
        isOpen={isOrgModalOpen}
        onClose={() => setIsOrgModalOpen(false)}
      />
    </div>
  );
} 