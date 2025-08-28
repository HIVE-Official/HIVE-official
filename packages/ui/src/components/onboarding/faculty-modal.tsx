"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { X, Users, Loader2, Building, Shield, Star, BookOpen, Award } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';

interface FacultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { firstName: string; lastName: string; role: string; selectedSpaceId: string }) => void;
  schoolName: string;
  userEmail: string;
}

export const FacultyModal: React.FC<FacultyModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  schoolName,
  userEmail,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [selectedSpaceId, setSelectedSpaceId] = useState('');
  const [availableSpaces, setAvailableSpaces] = useState<Array<{ id: string; name: string; spaceType: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(false);

  // Load available spaces when modal opens
  useEffect(() => {
    if (isOpen) {
      loadAvailableSpaces();
    }
  }, [isOpen]);

  const loadAvailableSpaces = async () => {
    setIsLoadingSpaces(true);
    try {
      // Try to fetch spaces from API
      const response = await fetch('/api/spaces/available-for-claim');
      if (response.ok) {
        const spaces = await response.json();
        // Show all available spaces for faculty
        setAvailableSpaces(spaces.spaces || spaces);
      }
    } catch (error) {
      console.error('Failed to load spaces:', error);
      // Fallback to mock data
      setAvailableSpaces([
        { id: 'cs-dept', name: 'Computer Science Department', spaceType: 'university_organizations' },
        { id: 'bio-dept', name: 'Biology Department', spaceType: 'university_organizations' },
        { id: 'eng-dept', name: 'Engineering Department', spaceType: 'university_organizations' },
        { id: 'math-dept', name: 'Mathematics Department', spaceType: 'university_organizations' },
        { id: 'greek-council', name: 'Greek Life Council', spaceType: 'fraternity_and_sorority' },
        { id: 'student-gov', name: 'Student Government', spaceType: 'student_organizations' },
      ]);
    } finally {
      setIsLoadingSpaces(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !role.trim() || !selectedSpaceId.trim()) return;

    setIsSubmitting(true);
    
    // Brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onContinue({ 
      firstName: firstName.trim(), 
      lastName: lastName.trim(), 
      role: role.trim(),
      selectedSpaceId: selectedSpaceId.trim()
    });
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setFirstName('');
    setLastName('');
    setRole('');
    setSelectedSpaceId('');
    setAvailableSpaces([]);
    setIsSubmitting(false);
    onClose();
  };


  const commonRoles = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Instructor',
    'Research Faculty',
    'Staff',
    'Administrator',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-surface border border-border rounded-xl p-8 w-full max-w-lg relative overflow-hidden"
            variants={hiveVariants.scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-accent/10 rounded-full blur-2xl -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-accent/10 rounded-full blur-2xl translate-y-8 -translate-x-8" />
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <motion.div className="space-y-8 relative z-10" variants={hiveVariants.container}>
              {/* Header */}
              <motion.div className="text-center space-y-6" variants={hiveVariants.item}>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-10 h-10 text-accent" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-accent" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-display font-semibold text-foreground">
                    Welcome, {schoolName} faculty!
                  </h2>
                  <p className="text-muted font-body text-lg">
                    Choose a space to manage and tell us your role
                  </p>
                  
                  {/* Faculty benefits preview */}
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent">
                      <BookOpen className="w-3 h-3" />
                      Space Management
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent">
                      <Users className="w-3 h-3" />
                      Student Mentoring
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent">
                      <Star className="w-3 h-3" />
                      Community Building
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.form onSubmit={handleSubmit} className="space-y-6" variants={hiveVariants.item}>
                {/* Name fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        required
                        variant="accent"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        required
                        variant="accent"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Space selection - required for faculty */}
                <div className="space-y-3">
                  <Label htmlFor="space" className="text-sm font-medium">Select Space to Manage *</Label>
                  {isLoadingSpaces ? (
                    <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-surface-01">
                      <Loader2 className="w-5 h-5 animate-spin text-accent" />
                      <span className="text-sm text-muted">Loading available spaces...</span>
                    </div>
                  ) : (
                    <select
                      id="space"
                      value={selectedSpaceId}
                      onChange={(e) => setSelectedSpaceId(e.target.value)}
                      required
                      className="w-full h-12 px-4 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    >
                      <option value="">Choose a space to manage</option>
                      {availableSpaces.map((space) => (
                        <option key={space.id} value={space.id}>
                          {space.name} ({space.spaceType})
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                    <p className="text-xs text-accent font-medium">
                      💡 Faculty must manage a space to join HIVE and guide student communities
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="role" className="text-sm font-medium">Your Role</Label>
                  <Input
                    id="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Associate Professor"
                    required
                    variant="accent"
                    className="h-12"
                    list="roles"
                  />
                  <datalist id="roles">
                    {commonRoles.map((roleOption) => (
                      <option key={roleOption} value={roleOption} />
                    ))}
                  </datalist>
                </div>

                <div className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full h-12"
                    disabled={!firstName.trim() || !lastName.trim() || !role.trim() || !selectedSpaceId.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Setting up your faculty account...
                      </>
                    ) : (
                      <>
                        <Building className="w-5 h-5 mr-2" />
                        Continue Faculty Setup
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={handleClose}
                    className="w-full h-12"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                </div>
              </motion.form>

              <motion.div className="text-center pt-4 border-t border-border" variants={hiveVariants.item}>
                <div className="bg-surface-01 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Verification Process</span>
                  </div>
                  <p className="text-xs text-muted font-body">
                    Your faculty status will be verified with <span className="font-medium text-foreground">{userEmail}</span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};