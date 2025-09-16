'use client';

import { useState } from 'react';
import { logger } from '@/lib/logger';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  X,
  Users,
  GraduationCap,
  Home,
  Crown,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  FileText,
  Mail
} from 'lucide-react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
  Badge,
  Avatar,
  FormField,
  Typography,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  RadioGroup,
  RadioGroupItem,
  Label,
  Separator
} from '@hive/ui';

interface SpaceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPACE_CATEGORIES = [
  {
    id: 'university',
    name: 'University Space',
    description: 'Academic department, course, or official UB organization',
    icon: GraduationCap,
    requiresVerification: true,
    examples: ['CS 442 Study Group', 'Pre-Med Advisory', 'Engineering Co-op']
  },
  {
    id: 'residential', 
    name: 'Residential Life',
    description: 'Dorm community, floor group, or housing-based organization',
    icon: Home,
    requiresVerification: true,
    examples: ['Hadley 2nd Floor', 'Apartment Complex A', 'Off-Campus Village']
  },
  {
    id: 'greek',
    name: 'Greek Life',
    description: 'Fraternity, sorority, or Greek council organization',
    icon: Crown,
    requiresVerification: true,
    examples: ['New Chapter Formation', 'Alumni Association', 'Interest Group']
  },
  {
    id: 'student',
    name: 'Student Space',
    description: 'Student-created community, club, or interest group',
    icon: Users,
    requiresVerification: false,
    examples: ['Gaming Club', 'Study Group', 'Project Team', 'Social Circle']
  }
];

const SPACE_TYPES = {
  university: [
    { value: 'academic_department', label: 'Academic Department' },
    { value: 'course_study_group', label: 'Course Study Group' },
    { value: 'research_lab', label: 'Research Lab' },
    { value: 'academic_organization', label: 'Academic Organization' }
  ],
  residential: [
    { value: 'dorm_floor', label: 'Dorm Floor' },
    { value: 'building_community', label: 'Building Community' },
    { value: 'housing_complex', label: 'Housing Complex' },
    { value: 'off_campus', label: 'Off-Campus Group' }
  ],
  greek: [
    { value: 'fraternity', label: 'Fraternity' },
    { value: 'sorority', label: 'Sorority' },
    { value: 'greek_council', label: 'Greek Council' },
    { value: 'interest_group', label: 'Interest Group' }
  ],
  student: [
    { value: 'club_organization', label: 'Club/Organization' },
    { value: 'study_group', label: 'Study Group' },
    { value: 'project_team', label: 'Project Team' },
    { value: 'social_group', label: 'Social Group' },
    { value: 'hobby_interest', label: 'Hobby/Interest Group' }
  ]
};

export function SpaceRequestModal({ isOpen, onClose }: SpaceRequestModalProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form data
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    justification: '',
    expectedMembers: '',
    leadershipQualification: '',
    contactEmail: '',
    verificationDocument: null as File | null
  });

  const selectedCategoryData = SPACE_CATEGORIES.find(c => c.id === selectedCategory);
  const availableTypes = selectedCategory ? SPACE_TYPES[selectedCategory as keyof typeof SPACE_TYPES] || [] : [];

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const submitData = {
        category: selectedCategory,
        ...formData,
        campusId: 'ub-buffalo' // UB-only for vBETA
      };

      const response = await fetch('/api/spaces/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) throw new Error('Failed to submit request');
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      setIsSuccess(true);
    } catch (error) {
      logger.error('Failed to submit space request:', { error: String(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelectedCategory('');
    setFormData({
      name: '',
      description: '',
      type: '',
      justification: '',
      expectedMembers: '',
      leadershipQualification: '',
      contactEmail: '',
      verificationDocument: null
    });
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-auto"
      >
        <Card className="border-accent/20 shadow-xl">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Request New Space
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {isSuccess ? (
              <SuccessState onClose={handleClose} />
            ) : (
              <>
                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((stepNum: any) => (
                      <div key={stepNum} className="flex items-center">
                        <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          step >= stepNum 
                            ? 'border-accent bg-accent text-accent-foreground' 
                            : 'border-border text-muted-foreground'
                        }`}>
                          {stepNum}
                        </div>
                        {stepNum < 3 && (
                          <div className={`h-px w-8 ${step > stepNum ? 'bg-accent' : 'bg-border'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 1: Category Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <Typography size="large" weight="semibold" className="mb-2">
                        What type of space do you want to create?
                      </Typography>
                      <Typography color="medium">
                        Choose the category that best fits your community
                      </Typography>
                    </div>

                    <RadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
                      <div className="grid gap-4">
                        {SPACE_CATEGORIES.map((category: any) => {
                          const IconComponent = category.icon;
                          return (
                            <div key={category.id}>
                              <Label 
                                htmlFor={category.id} 
                                className="cursor-pointer block"
                              >
                                <Card className={`border-2 transition-all ${
                                  selectedCategory === category.id 
                                    ? 'border-accent shadow-md' 
                                    : 'border-border hover:border-accent/50'
                                }`}>
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                      <RadioGroupItem 
                                        value={category.id} 
                                        id={category.id}
                                        className="mt-1"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                          <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <IconComponent className="h-4 w-4 text-accent" />
                                          </div>
                                          <Typography weight="semibold">
                                            {category.name}
                                          </Typography>
                                          {category.requiresVerification && (
                                            <Badge variant="outline" className="text-xs">
                                              Requires Verification
                                            </Badge>
                                          )}
                                        </div>
                                        <Typography size="small" color="medium" className="mb-3">
                                          {category.description}
                                        </Typography>
                                        <div className="flex flex-wrap gap-2">
                                          {category.examples.map((example, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                              {example}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>

                    <div className="flex justify-end pt-4">
                      <Button 
                        onClick={() => setStep(2)} 
                        disabled={!selectedCategory}
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Basic Information */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <Typography size="large" weight="semibold" className="mb-2">
                        Tell us about your space
                      </Typography>
                      <Typography color="medium">
                        Provide the basic details for your {selectedCategoryData?.name}
                      </Typography>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        label="Space Name"
                        placeholder="Enter the name of your space"
                        value={formData.name}
                        onChange={(e: any) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Space Type</Label>
                        <Select 
                          value={formData.type} 
                          onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select space type" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTypes.map((type: any) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">Description</Label>
                        <Textarea
                          placeholder="Describe the purpose and goals of your space"
                          value={formData.description}
                          onChange={(e: any) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <FormField
                        label="Expected Members"
                        placeholder="How many members do you expect to join?"
                        value={formData.expectedMembers}
                        onChange={(e: any) => setFormData(prev => ({ ...prev, expectedMembers: e.target.value }))}
                      />

                      <FormField
                        label="Contact Email"
                        type="email"
                        placeholder="your.email@buffalo.edu"
                        value={formData.contactEmail}
                        onChange={(e: any) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button 
                        onClick={() => setStep(3)}
                        disabled={!formData.name || !formData.type || !formData.contactEmail}
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Justification & Verification */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <Typography size="large" weight="semibold" className="mb-2">
                        Final Details
                      </Typography>
                      <Typography color="medium">
                        Help us understand why this space should be approved
                      </Typography>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Why does this space need to exist?
                        </Label>
                        <Textarea
                          placeholder="Explain why this space is needed and how it will benefit the UB community"
                          value={formData.justification}
                          onChange={(e: any) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Leadership Qualification
                        </Label>
                        <Textarea
                          placeholder="Describe your qualifications to lead this space"
                          value={formData.leadershipQualification}
                          onChange={(e: any) => setFormData(prev => ({ ...prev, leadershipQualification: e.target.value }))}
                          rows={2}
                        />
                      </div>

                      {selectedCategoryData?.requiresVerification && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Verification Document
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          </Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              onChange={(e: any) => setFormData(prev => ({ 
                                ...prev, 
                                verificationDocument: e.target.files?.[0] || null 
                              }))}
                              className="hidden"
                              id="verification-upload"
                            />
                            <Label htmlFor="verification-upload" className="cursor-pointer">
                              <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                              <Typography size="small" color="medium">
                                Upload verification document (faculty endorsement, membership proof, etc.)
                              </Typography>
                            </Label>
                          </div>
                        </div>
                      )}

                      <Card className="bg-accent/5 border-accent/20">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <Typography size="small" weight="medium" className="mb-1">
                                Review Process
                              </Typography>
                              <Typography size="small" color="medium">
                                Space requests are typically reviewed within 24-48 hours. You'll receive an email notification about the decision.
                              </Typography>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.justification || (selectedCategoryData?.requiresVerification && !formData.verificationDocument)}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="h-8 w-8 text-green-500" />
      </div>
      
      <Typography size="large" weight="semibold" className="mb-2">
        Request Submitted Successfully!
      </Typography>
      
      <Typography color="medium" className="mb-6 max-w-md mx-auto">
        Your space request has been submitted for review. You'll receive an email notification within 24-48 hours about the approval status.
      </Typography>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onClose}>
          Create Another
        </Button>
        <Button onClick={onClose}>
          Done
        </Button>
      </div>
    </motion.div>
  );
}