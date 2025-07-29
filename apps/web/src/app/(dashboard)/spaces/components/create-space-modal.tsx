"use client";

import { useState } from "react";
import { Button, Card } from "@hive/ui";
import { X, Globe, Users, Crown, Home, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreateSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (_space: any) => void;
}

const SPACE_TYPES = [
  {
    id: 'student_organizations',
    title: 'Student Organizations',
    description: 'Student-led clubs, societies, and interest groups',
    icon: Users,
    color: 'bg-blue-500',
    examples: ['Computer Science Club', 'Debate Society', 'Photography Club']
  },
  {
    id: 'university_organizations',
    title: 'University Programs',
    description: 'Official university departments and academic programs',
    icon: Crown,
    color: 'bg-emerald-500',
    examples: ['Engineering Department', 'Student Services', 'Research Groups']
  },
  {
    id: 'greek_life',
    title: 'Greek Life',
    description: 'Fraternities, sororities, and Greek organizations',
    icon: Globe,
    color: 'bg-purple-500',
    examples: ['Alpha Beta Gamma', 'Delta Sigma Phi', 'Kappa Alpha Theta']
  },
  {
    id: 'campus_living',
    title: 'Residential Life',
    description: 'Dormitories, residence halls, and living communities',
    icon: Home,
    color: 'bg-orange-500',
    examples: ['East Hall', 'Sunset Apartments', 'Graduate Housing']
  },
  {
    id: 'hive_exclusive',
    title: 'HIVE Exclusive',
    description: 'Special platform communities and featured spaces',
    icon: Sparkles,
    color: 'bg-yellow-500',
    examples: ['HIVE Ambassadors', 'Beta Testers', 'Creator Community']
  }
];

export function CreateSpaceModal({ isOpen, onClose, onSuccess }: CreateSpaceModalProps) {
  const [step, setStep] = useState<'type' | 'details' | 'confirmation'>('type');
  const [selectedType, setSelectedType] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    tags: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setStep('details');
  };

  const handleBack = () => {
    if (step === 'details') {
      setStep('type');
    } else if (step === 'confirmation') {
      setStep('details');
    }
  };

  const handleNext = () => {
    if (step === 'details' && formData.name && formData.description) {
      setStep('confirmation');
    }
  };

  const handleSubmit = async () => {
    if (!selectedType || !formData.name || !formData.description) return;

    setIsSubmitting(true);
    setError('');

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      // Get auth token
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
        } else {
          headers.Authorization = `Bearer test-token`;
        }
      } catch (error) {
        headers.Authorization = `Bearer test-token`;
      }

      const response = await fetch('/api/spaces', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          type: selectedType,
          isPrivate: formData.isPrivate,
          tags: formData.tags
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create space');
      }

      const result = await response.json();
      onSuccess?.(result.space);
      
      // Reset form and close modal
      setStep('type');
      setSelectedType('');
      setFormData({ name: '', description: '', isPrivate: false, tags: [] });
      onClose();

    } catch (error: any) {
      console.error('Failed to create space:', error);
      setError(error.message || 'Failed to create space');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTypeConfig = SPACE_TYPES.find(t => t.id === selectedType);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFE255] rounded-xl flex items-center justify-center">
                <Globe className="h-5 w-5 text-[#0A0A0A]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Create New Space</h2>
                <p className="text-sm text-neutral-400">
                  {step === 'type' && 'Choose your space type'}
                  {step === 'details' && 'Add space details'}
                  {step === 'confirmation' && 'Review and create'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/[0.2] text-white hover:bg-white/[0.1]"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
            {/* Step 1: Space Type Selection */}
            {step === 'type' && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">What type of space are you creating?</h3>
                  <p className="text-sm text-neutral-400">Choose the category that best fits your community</p>
                </div>

                <div className="grid gap-4">
                  {SPACE_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Card
                        key={type.id}
                        className="p-4 bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] transition-all cursor-pointer group"
                        onClick={() => handleTypeSelect(type.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${type.color} rounded-xl flex items-center justify-center text-white`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1 group-hover:text-[#FFD700] transition-colors">
                              {type.title}
                            </h4>
                            <p className="text-sm text-neutral-400 mb-2">{type.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {type.examples.slice(0, 2).map((example, i) => (
                                <span key={i} className="text-xs text-neutral-500 bg-white/[0.05] px-2 py-1 rounded">
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Space Details */}
            {step === 'details' && selectedTypeConfig && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className={`w-8 h-8 ${selectedTypeConfig.color} rounded-lg flex items-center justify-center text-white`}>
                      <selectedTypeConfig.icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{selectedTypeConfig.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-400">Fill in the details for your new space</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Space Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter a descriptive name for your space"
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-400 focus:border-[#FFD700]/50 focus:bg-white/[0.04] transition-all focus:outline-none"
                      maxLength={100}
                    />
                    <p className="text-xs text-neutral-500 mt-1">{formData.name.length}/100 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your space, its purpose, and what members can expect"
                      rows={4}
                      className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-400 focus:border-[#FFD700]/50 focus:bg-white/[0.04] transition-all focus:outline-none resize-none"
                      maxLength={500}
                    />
                    <p className="text-xs text-neutral-500 mt-1">{formData.description.length}/500 characters</p>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <input
                      type="checkbox"
                      id="isPrivate"
                      checked={formData.isPrivate}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                      className="w-4 h-4 text-[#FFD700] bg-transparent border-white/[0.2] rounded focus:ring-[#FFD700]/50"
                    />
                    <div className="flex-1">
                      <label htmlFor="isPrivate" className="text-sm font-medium text-white cursor-pointer">
                        Private space
                      </label>
                      <p className="text-xs text-neutral-400">Only invited members can join this space</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 'confirmation' && selectedTypeConfig && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Ready to Create</h3>
                  <p className="text-sm text-neutral-400">Review your space details before creating</p>
                </div>

                <Card className="p-6 bg-white/[0.02] border-white/[0.06]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${selectedTypeConfig.color} rounded-xl flex items-center justify-center text-white`}>
                      <selectedTypeConfig.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{formData.name}</h4>
                      <p className="text-sm text-neutral-400">{selectedTypeConfig.title}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-neutral-300 mb-4">{formData.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {formData.isPrivate ? 'Private' : 'Public'}
                    </span>
                    <span>Starting in preview mode</span>
                  </div>
                </Card>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">{error}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              {step !== 'type' && (
                <Button
                  variant="outline"
                  className="border-white/[0.2] text-white hover:bg-white/[0.1]"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {step === 'details' && (
                <Button
                  className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
                  onClick={handleNext}
                  disabled={!formData.name || !formData.description}
                >
                  Next
                </Button>
              )}
              
              {step === 'confirmation' && (
                <Button
                  className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Space'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}