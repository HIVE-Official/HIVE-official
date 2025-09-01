"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Calendar, Star, Plus, CheckCircle, Search } from 'lucide-react';
import { Button } from '../button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { Input } from '../input';
import { Alert } from '../alert';
import { cn } from '../lib/utils';

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'dorm' | 'academic' | 'club' | 'interest';
  memberCount: number;
  isActive: boolean;
  category: string;
  isSuggested?: boolean;
}

interface SpacesDiscoveryStepProps {
  onSpacesChange: (spaceIds: string[]) => void;
  onContinue: () => void;
  selectedSpaces?: string[];
  userInterests?: string[];
  userRole?: string;
  className?: string;
}

const DEMO_SPACES: Space[] = [
  // Academic
  {
    id: 'cs-study-group',
    name: 'CS Study Group',
    description: 'Weekly study sessions for computer science courses',
    type: 'academic',
    memberCount: 47,
    isActive: true,
    category: 'Computer Science',
    isSuggested: true
  },
  {
    id: 'math-tutoring',
    name: 'Math Tutoring Hub',
    description: 'Peer tutoring for all mathematics courses',
    type: 'academic',
    memberCount: 89,
    isActive: true,
    category: 'Mathematics',
    isSuggested: true
  },
  {
    id: 'engineering-lounge',
    name: 'Engineering Lounge',
    description: 'General space for all engineering students',
    type: 'academic',
    memberCount: 234,
    isActive: true,
    category: 'Engineering'
  },
  
  // Dorms
  {
    id: 'freshman-dorms',
    name: 'Freshman Dorms',
    description: 'Connect with students in freshman housing',
    type: 'dorm',
    memberCount: 156,
    isActive: true,
    category: 'Housing'
  },
  {
    id: 'west-campus',
    name: 'West Campus',
    description: 'Students living in west campus area',
    type: 'dorm',
    memberCount: 203,
    isActive: true,
    category: 'Housing'
  },
  
  // Clubs
  {
    id: 'photography-club',
    name: 'Photography Club',
    description: 'Campus photography enthusiasts and workshops',
    type: 'club',
    memberCount: 67,
    isActive: true,
    category: 'Creative',
    isSuggested: true
  },
  {
    id: 'fitness-group',
    name: 'Campus Fitness Group',
    description: 'Workout buddies and fitness challenges',
    type: 'club',
    memberCount: 123,
    isActive: true,
    category: 'Fitness'
  },
  {
    id: 'game-dev',
    name: 'Game Development Club',
    description: 'Building games and learning together',
    type: 'club',
    memberCount: 34,
    isActive: true,
    category: 'Technology'
  }
];

const SPACE_TYPE_LABELS = {
  academic: 'Academic',
  dorm: 'Housing',
  club: 'Clubs & Organizations',
  interest: 'Interest Groups'
};

export const SpacesDiscoveryStep: React.FC<SpacesDiscoveryStepProps> = ({
  onSpacesChange,
  onContinue,
  selectedSpaces = [],
  userInterests = [],
  userRole = '',
  className
}) => {
  const [localSelectedSpaces, setLocalSelectedSpaces] = useState<string[]>(selectedSpaces);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and organize spaces
  const filteredSpaces = DEMO_SPACES.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const suggestedSpaces = filteredSpaces.filter(space => space.isSuggested);
  const otherSpaces = filteredSpaces.filter(space => !space.isSuggested);

  const handleSpaceToggle = (spaceId: string) => {
    const newSpaces = localSelectedSpaces.includes(spaceId)
      ? localSelectedSpaces.filter(id => id !== spaceId)
      : [...localSelectedSpaces, spaceId];
    
    setLocalSelectedSpaces(newSpaces);
    onSpacesChange(newSpaces);
  };

  const canContinue = localSelectedSpaces.length >= 2;

  const SpaceCard = ({ space }: { space: Space }) => {
    const isSelected = localSelectedSpaces.includes(space.id);
    
    return (
      <Card
        variant={isSelected ? "accent" : "interactive"}
        padding="md"
        className="cursor-pointer transition-all duration-200 hover:scale-[1.02]"
        onClick={() => handleSpaceToggle(space.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[var(--hive-text-inverse)]">{space.name}</h3>
                {isSelected && <CheckCircle className="w-4 h-4 text-accent" />}
              </div>
              <p className="text-sm text-muted leading-relaxed mb-2">
                {space.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{space.memberCount} members</span>
                </div>
                <span className="text-accent">{space.category}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-3xl mx-auto", className)}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--hive-text-inverse)] mb-3">Discover spaces</h1>
        <p className="text-lg text-muted">
          Join at least 2 spaces to start connecting with your campus community
        </p>
        <div className="mt-2 text-sm text-muted">
          {localSelectedSpaces.length}/2+ selected
        </div>
      </div>

      <div className="space-y-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
          <InputEnhanced
            type="text"
            placeholder="Search spaces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            variant="search"
          />
        </div>

        {/* Suggested Spaces */}
        {suggestedSpaces.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)]">Suggested for you</h2>
            </div>
            
            <Alert variant="info">
              <div>
                <p className="font-medium">Personalized recommendations</p>
                <p className="text-sm">
                  Based on your interests and role, these spaces might be a great fit.
                </p>
              </div>
            </Alert>

            <div className="grid gap-4">
              {suggestedSpaces.map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SpaceCard space={space} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Spaces */}
        {otherSpaces.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)]">All spaces</h2>
            
            <div className="grid gap-3">
              {otherSpaces.map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (suggestedSpaces.length + index) * 0.05 }}
                >
                  <SpaceCard space={space} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredSpaces.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <div className="text-muted mb-4">
              No spaces found matching "{searchQuery}"
            </div>
            <ButtonEnhanced variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Request new space
            </ButtonEnhanced>
          </div>
        )}

        {/* Progress and Continue */}
        <div className="flex flex-col items-center gap-4 pt-6">
          <div className="text-center">
            <div className={cn(
              "text-sm font-medium mb-2",
              canContinue ? "text-accent" : "text-muted"
            )}>
              {canContinue 
                ? "Perfect! You're ready to join your campus community" 
                : `Select ${2 - localSelectedSpaces.length} more space${2 - localSelectedSpaces.length === 1 ? '' : 's'} to continue`
              }
            </div>
            {canContinue && (
              <div className="text-xs text-muted">
                You can discover and join more spaces anytime
              </div>
            )}
          </div>

          <ButtonEnhanced
            variant="primary"
            size="lg"
            onClick={onContinue}
            disabled={!canContinue}
            className="min-w-[140px]"
          >
            Continue
          </ButtonEnhanced>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-muted border-t border-border pt-4">
          Spaces are where your campus community gathers to share resources, coordinate events, and build connections.
        </div>
      </div>
    </motion.div>
  );
};