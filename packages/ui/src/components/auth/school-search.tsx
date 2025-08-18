"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Users, GraduationCap, CheckCircle, Plus } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { cn } from '../lib/utils';

interface School {
  id: string;
  name: string;
  location: string;
  domain: string;
  studentCount?: string;
  isActive?: boolean;
  isPending?: boolean;
}

interface SchoolSearchProps {
  onSchoolSelect: (school: School) => void;
  onRequestSchool?: (schoolName: string) => void;
  className?: string;
  initialSearch?: string;
}

const DEMO_SCHOOLS: School[] = [
  {
    id: 'stanford',
    name: 'Stanford University',
    location: 'Stanford, CA',
    domain: 'stanford.edu',
    studentCount: '17,249',
    isActive: true
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA', 
    domain: 'mit.edu',
    studentCount: '11,858',
    isActive: true
  },
  {
    id: 'berkeley',
    name: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    domain: 'berkeley.edu',
    studentCount: '45,057',
    isActive: true
  },
  {
    id: 'uw',
    name: 'University of Washington',
    location: 'Seattle, WA',
    domain: 'washington.edu',
    studentCount: '47,400',
    isActive: true
  },
  {
    id: 'harvard',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    domain: 'harvard.edu',
    studentCount: '23,731',
    isActive: true
  },
  {
    id: 'caltech',
    name: 'California Institute of Technology',
    location: 'Pasadena, CA',
    domain: 'caltech.edu',
    studentCount: '2,397',
    isActive: true
  },
  {
    id: 'cmu',
    name: 'Carnegie Mellon University',
    location: 'Pittsburgh, PA',
    domain: 'cmu.edu',
    studentCount: '15,818',
    isActive: true
  },
  {
    id: 'georgia-tech',
    name: 'Georgia Institute of Technology',
    location: 'Atlanta, GA',
    domain: 'gatech.edu',
    studentCount: '45,303',
    isActive: true
  }
];

export const SchoolSearch: React.FC<SchoolSearchProps> = ({
  onSchoolSelect,
  onRequestSchool,
  className,
  initialSearch = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestSchoolName, setRequestSchoolName] = useState('');

  // Filter schools based on search query
  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return DEMO_SCHOOLS;
    
    const query = searchQuery.toLowerCase();
    return DEMO_SCHOOLS.filter(school =>
      school.name.toLowerCase().includes(query) ||
      school.location.toLowerCase().includes(query) ||
      school.domain.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSchoolClick = (school: School) => {
    setSelectedSchool(school);
  };

  const handleContinue = () => {
    if (selectedSchool) {
      onSchoolSelect(selectedSchool);
    }
  };

  const handleRequestSchool = () => {
    if (requestSchoolName.trim() && onRequestSchool) {
      onRequestSchool(requestSchoolName.trim());
      setRequestSchoolName('');
      setShowRequestForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-2xl mx-auto", className)}
    >
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Select your school</CardTitle>
          <CardDescription className="text-center">
            Choose your university to join the HIVE campus community
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
            <Input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              variant="search"
            />
          </div>

          {/* School Results */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <AnimatePresence>
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school, index) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      variant={selectedSchool?.id === school.id ? "accent" : "interactive"}
                      padding="sm"
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => handleSchoolClick(school)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap className="w-4 h-4 text-accent" />
                            <h3 className="font-medium text-white">{school.name}</h3>
                            {selectedSchool?.id === school.id && (
                              <CheckCircle className="w-4 h-4 text-accent" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{school.location}</span>
                            </div>
                            {school.studentCount && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>{school.studentCount} students</span>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted mt-1 font-mono">
                            @{school.domain}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-muted mb-4">
                    No schools found matching "{searchQuery}"
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRequestForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Request your school
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Request School Form */}
          <AnimatePresence>
            {showRequestForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-border rounded-lg p-4 bg-surface/50"
              >
                <h4 className="font-medium text-white mb-3">Request a new school</h4>
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Enter your university name"
                    value={requestSchoolName}
                    onChange={(e) => setRequestSchoolName(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleRequestSchool}
                      disabled={!requestSchoolName.trim()}
                    >
                      Submit Request
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowRequestForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Continue Button */}
          <div className="flex justify-between items-center pt-4">
            <div className="text-xs text-muted">
              {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} available
            </div>
            
            <Button
              variant="primary"
              onClick={handleContinue}
              disabled={!selectedSchool}
              className="min-w-[120px]"
            >
              Continue
            </Button>
          </div>

          {/* Info */}
          <div className="text-xs text-muted text-center border-t border-border pt-4">
            Don't see your school? <button 
              className="text-accent hover:text-accent/80 underline"
              onClick={() => setShowRequestForm(true)}
            >
              Request to add it
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};