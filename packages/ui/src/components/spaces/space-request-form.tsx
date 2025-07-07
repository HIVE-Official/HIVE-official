"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Textarea } from '../textarea';
import { ArrowLeft, Building2, Users, Briefcase, Trophy, Heart, Loader2, Search, UserCheck } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';

export type SpaceType = "campus_living" | "fraternity_and_sorority" | "hive_exclusive" | "student_organizations" | "university_organizations";

interface ExistingSpace {
  id: string;
  type: SpaceType;
  name: string;
  description: string;
  memberCount: number;
  tags?: any[];
}

interface SpaceRequestFormProps {
  onSubmit: (data: {
    spaceId: string;
    spaceName: string;
    spaceType: SpaceType;
    claimReason: string;
    userRole: 'student' | 'faculty';
  }) => void;
  onBack: () => void;
  isSubmitting: boolean;
  error?: string | null;
}

const SPACE_TYPES: { value: SpaceType; label: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    value: "campus_living",
    label: "Campus Living",
    description: "Dorms, residential halls, housing communities",
    icon: Users,
  },
  {
    value: "fraternity_and_sorority", 
    label: "Greek Life",
    description: "Fraternities, sororities, and Greek organizations",
    icon: Trophy,
  },
  {
    value: "hive_exclusive",
    label: "HIVE Exclusive", 
    description: "Special HIVE-curated spaces and communities",
    icon: Heart,
  },
  {
    value: "student_organizations",
    label: "Student Organizations",
    description: "Student-led clubs, societies, and groups",
    icon: Briefcase,
  },
  {
    value: "university_organizations",
    label: "University Organizations",
    description: "Official university departments and programs",
    icon: Building2,
  },
];

export const SpaceRequestForm: React.FC<SpaceRequestFormProps> = ({
  onSubmit,
  onBack,
  isSubmitting,
  error
}) => {
  useAdaptiveMotion('academic'); // For consistency with motion system
  const [formData, setFormData] = useState({
    selectedSpaceId: '',
    claimReason: '',
    userRole: 'student' as 'student' | 'faculty'
  });
  const [availableSpaces, setAvailableSpaces] = useState<ExistingSpace[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<ExistingSpace[]>([]);
  const [selectedSpaceType, setSelectedSpaceType] = useState<SpaceType | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);

  // Fetch available spaces
  useEffect(() => {
    const fetchAvailableSpaces = async () => {
      try {
        const response = await fetch('/api/spaces/available-for-claim');
        const data = await response.json();
        
        if (data.success) {
          setAvailableSpaces(data.spaces);
          setFilteredSpaces(data.spaces);
        }
      } catch (error) {
        console.error('Failed to fetch available spaces:', error);
      } finally {
        setIsLoadingSpaces(false);
      }
    };

    fetchAvailableSpaces();
  }, []);

  // Filter spaces based on type and search
  useEffect(() => {
    let filtered = availableSpaces;
    
    if (selectedSpaceType) {
      filtered = filtered.filter(space => space.type === selectedSpaceType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(space => 
        space.name.toLowerCase().includes(query) ||
        space.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredSpaces(filtered);
  }, [availableSpaces, selectedSpaceType, searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSpace = availableSpaces.find(space => space.id === formData.selectedSpaceId);
    if (!selectedSpace || !formData.claimReason) {
      return;
    }
    
    onSubmit({
      spaceId: selectedSpace.id,
      spaceName: selectedSpace.name,
      spaceType: selectedSpace.type,
      claimReason: formData.claimReason,
      userRole: formData.userRole,
    });
  };

  const isFormValid = formData.selectedSpaceId && formData.claimReason;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        className="w-full max-w-3xl relative z-10"
        variants={hiveVariants.container}
        initial="hidden"
        animate="visible"
      >
        {/* Back button */}
        <motion.div 
          className="mb-6"
          variants={hiveVariants.item}
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
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
              <Building2 className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-semibold text-foreground">
                Claim Leadership of a Space
              </h1>
              <p className="text-muted font-body mt-2">
                Choose an existing space to claim leadership of. All requests are manually reviewed.
              </p>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={hiveVariants.container}
          >
            {/* User Role Selection */}
            <motion.div className="space-y-4" variants={hiveVariants.item}>
              <Label>I am a...</Label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userRole: 'student' })}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                    formData.userRole === 'student'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface-01 text-muted hover:border-accent/30'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">Student</div>
                    <div className="text-sm mt-1">Claiming club/organization leadership</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userRole: 'faculty' })}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                    formData.userRole === 'faculty'
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface-01 text-muted hover:border-accent/30'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">Faculty/Staff</div>
                    <div className="text-sm mt-1">Claiming course/department space</div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Search and Filter */}
            <motion.div className="space-y-4" variants={hiveVariants.item}>
              <Label>Find a Space</Label>
              
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search spaces by name or description..."
                  className="pl-10"
                  variant="accent"
                />
              </div>

              {/* Type Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSpaceType('')}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                    selectedSpaceType === ''
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface-01 text-muted hover:border-accent/30'
                  }`}
                >
                  All Types
                </button>
                {SPACE_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedSpaceType(type.value)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                      selectedSpaceType === type.value
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border bg-surface-01 text-muted hover:border-accent/30'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Available Spaces */}
            <motion.div className="space-y-4" variants={hiveVariants.item}>
              <Label>Available Spaces ({filteredSpaces.length})</Label>
              
              {isLoadingSpaces ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-accent mr-2" />
                  <span className="text-muted">Loading available spaces...</span>
                </div>
              ) : filteredSpaces.length === 0 ? (
                <div className="text-center py-8 text-muted">
                  <Building2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No available spaces found matching your criteria.</p>
                  <p className="text-sm mt-1">Try adjusting your search or filter.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredSpaces.map((space) => {
                    const isSelected = formData.selectedSpaceId === space.id;
                    const spaceTypeInfo = SPACE_TYPES.find(t => t.value === space.type);
                    const Icon = spaceTypeInfo?.icon || Building2;
                    
                    return (
                      <motion.button
                        key={space.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, selectedSpaceId: space.id })}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${
                          isSelected
                            ? 'border-accent bg-accent/10'
                            : 'border-border bg-surface-01 hover:border-accent/30'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            isSelected ? 'bg-accent text-background' : 'bg-surface-02 text-foreground'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className={`font-medium ${isSelected ? 'text-accent' : 'text-foreground'}`}>
                                {space.name}
                              </div>
                              {isSelected && (
                                <UserCheck className="w-4 h-4 text-accent flex-shrink-0" />
                              )}
                            </div>
                            <div className="text-sm text-muted mt-1 line-clamp-2">
                              {space.description}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                              <span className="capitalize">{spaceTypeInfo?.label}</span>
                              <span>•</span>
                              <span>{space.memberCount} members</span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Claim Reason */}
            <motion.div className="space-y-2" variants={hiveVariants.item}>
              <Label htmlFor="claimReason">
                {formData.userRole === 'faculty' ? 'Why should you manage this space?' : 'Why should you lead this space?'}
              </Label>
              <Textarea
                id="claimReason"
                value={formData.claimReason}
                onChange={(e) => setFormData({ ...formData, claimReason: e.target.value })}
                placeholder={formData.userRole === 'faculty'
                  ? "Explain your teaching experience, course authority, and plan for moderating discussions."
                  : "Explain your experience, leadership qualifications, and vision for growing this community."}
                rows={3}
                variant="outline"
                required
              />
            </motion.div>

            {/* Error Display */}
            {error && (
              <motion.div 
                className="p-4 bg-surface/50 border border-border rounded-lg"
                variants={hiveVariants.slideDown}
                initial="hidden"
                animate="visible"
              >
                <p className="text-muted-foreground text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div className="space-y-4" variants={hiveVariants.item}>
              <Button
                type="submit"
                variant="ritual"
                size="lg"
                className="w-full"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting Request...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-muted">
                  Your request will be manually reviewed. You'll receive an email when it's processed.
                </p>
              </div>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};