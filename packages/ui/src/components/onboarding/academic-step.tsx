"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { GraduationCap, Loader2 } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
import type { AcademicLevel } from '@hive/core';

export interface AcademicStepProps {
  academicLevel: AcademicLevel;
  onAcademicLevelChange: (level: AcademicLevel) => void;
  graduationYear: number;
  onGraduationYearChange: (year: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
  major?: string;
  onMajorChange?: (major: string) => void;
  classYear?: string;
  onClassYearChange?: (year: string) => void;
}

const ACADEMIC_LEVELS: { value: AcademicLevel; label: string; description: string }[] = [
  { 
    value: "undergraduate", 
    label: "Undergraduate", 
    description: "Bachelor's degree program" 
  },
  { 
    value: "graduate", 
    label: "Graduate Student", 
    description: "Master's degree program" 
  },
  { 
    value: "phd", 
    label: "PhD Student", 
    description: "Doctoral degree program" 
  },
  { 
    value: "other", 
    label: "Other", 
    description: "Certificate, non-degree, or other program" 
  }
];

export const AcademicStep: React.FC<AcademicStepProps> = ({
  academicLevel,
  onAcademicLevelChange,
  graduationYear,
  onGraduationYearChange,
  onSubmit,
  onBack,
  isLoading,
  major = '',
  onMajorChange,
  classYear = '',
  onClassYearChange
}) => {
  useAdaptiveMotion('academic'); // For consistency with motion system
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 8 }, (_, i) => currentYear + i);

  // Class year options for undergraduates
  const classYearOptions = [
    { value: 'freshman', label: 'Freshman', description: 'First year student' },
    { value: 'sophomore', label: 'Sophomore', description: 'Second year student' },
    { value: 'junior', label: 'Junior', description: 'Third year student' },
    { value: 'senior', label: 'Senior', description: 'Fourth year student' },
    { value: 'super-senior', label: 'Super Senior', description: 'Fifth+ year student' },
  ];

  // Common fields of study
  const commonMajors = [
    'Computer Science', 'Business Administration', 'Engineering', 'Psychology', 'Biology',
    'English', 'Mathematics', 'Chemistry', 'Economics', 'Political Science',
    'Communications', 'Art', 'Music', 'Education', 'Nursing', 'Physics',
    'History', 'Sociology', 'Philosophy', 'Environmental Science', 'Architecture',
    'Accounting', 'Marketing', 'Finance', 'Pre-Med', 'Pre-Law', 'Other'
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        className="w-full max-w-2xl relative z-10"
        variants={hiveVariants.container}
        initial="hidden"
        animate="visible"
      >
        {/* Progress indicator */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={hiveVariants.item}
        >
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((stepNum, index) => (
              <div
                key={stepNum}
                className={`w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                  index < 2 ? 'bg-white' : index === 2 ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div 
          className="module-border module-surface module-padding space-y-8"
          variants={hiveVariants.item}
        >
          {/* Header */}
          <motion.div 
            className="text-center space-y-4"
            variants={hiveVariants.item}
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground">
                Academic Information
              </h1>
              <p className="text-muted font-body mt-2">
                Tell us about your academic journey so we can connect you with relevant communities
              </p>
              <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <p className="text-sm text-foreground font-body">
                  ✨ <strong>You'll automatically join:</strong> Your major community, graduation class, and residential space
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Form fields */}
          <motion.div 
            className="hive-stack"
            variants={hiveVariants.container}
          >
            {/* Academic Level */}
            <motion.div 
              className="space-y-4"
              variants={hiveVariants.item}
            >
              <h3 className="text-sm font-medium text-foreground font-body">
                Academic Level
              </h3>
              <div className="grid gap-3">
                {ACADEMIC_LEVELS.map((level) => (
                  <motion.label
                    key={level.value}
                    className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                      academicLevel === level.value
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/30 hover:bg-surface-01'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="radio"
                      name="academicLevel"
                      value={level.value}
                      checked={academicLevel === level.value}
                      onChange={(e) => onAcademicLevelChange(e.target.value as AcademicLevel)}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] flex items-center justify-center ${
                          academicLevel === level.value
                            ? 'border-accent bg-accent'
                            : 'border-border'
                        }`}>
                          {academicLevel === level.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-foreground font-body">
                            {level.label}
                          </div>
                          <div className="text-sm text-muted font-body">
                            {level.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Class Year for Undergraduates */}
            {academicLevel === 'undergraduate' && onClassYearChange && (
              <motion.div 
                className="space-y-4"
                variants={hiveVariants.item}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3 className="text-sm font-medium text-foreground font-body">
                  Current Year in School
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {classYearOptions.map((year) => (
                    <motion.label
                      key={year.value}
                      className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] min-h-[44px] ${
                        classYear === year.value
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent/30 hover:bg-surface-01'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="classYear"
                        value={year.value}
                        checked={classYear === year.value}
                        onChange={(e) => onClassYearChange(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3 w-full">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] flex items-center justify-center ${
                          classYear === year.value
                            ? 'border-accent bg-accent'
                            : 'border-border'
                        }`}>
                          {classYear === year.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground font-body text-sm">
                            {year.label}
                          </div>
                          <div className="text-xs text-muted font-body">
                            {year.description}
                          </div>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Field of Study */}
            {onMajorChange && (
              <motion.div 
                className="space-y-4"
                variants={hiveVariants.item}
              >
                <h3 className="text-sm font-medium text-foreground font-body">
                  Field of Study
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => onMajorChange(e.target.value)}
                    placeholder="e.g., Computer Science"
                    list="majors"
                    className="w-full px-4 py-3 border-2 border-border rounded-lg bg-surface text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
                  />
                  <datalist id="majors">
                    {commonMajors.map((majorOption) => (
                      <option key={majorOption} value={majorOption} />
                    ))}
                  </datalist>
                </div>
                <p className="text-xs text-muted font-body">
                  Type your major or select from the dropdown suggestions
                </p>
              </motion.div>
            )}
            
            {/* Graduation Year */}
            <motion.div 
              className="space-y-4"
              variants={hiveVariants.item}
            >
              <h3 className="text-sm font-medium text-foreground font-body">
                Expected Graduation Year
              </h3>
              <select
                value={graduationYear}
                onChange={(e) => onGraduationYearChange(parseInt(e.target.value))}
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-surface text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
              >
                {graduationYears.map(year => (
                  <option key={year} value={year} className="bg-surface text-foreground">
                    {year}
                  </option>
                ))}
              </select>
            </motion.div>
          </motion.div>

          {/* Navigation buttons */}
          <motion.div 
            className="flex gap-3 pt-4"
            variants={hiveVariants.item}
          >
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 font-body"
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              variant="ritual"
              onClick={onSubmit}
              disabled={isLoading}
              className="flex-1 font-body"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Step indicator */}
        <motion.div 
          className="text-center mt-6"
          variants={hiveVariants.item}
        >
          <p className="text-sm text-muted font-body">
            Step 3 of 4
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};