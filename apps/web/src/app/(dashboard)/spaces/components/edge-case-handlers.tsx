"use client";

import { useState } from "react";
import { Card, Button, Badge } from "@hive/ui";
import { 
  Search, 
 
  Users, 
  MessageSquare,
  AlertCircle,
  Compass as _Compass,
  Filter as _Filter,
  Plus,
  RefreshCw,
  Lightbulb,
  Globe,
  Shield,
  Target,
  Clock as _Clock,
  Zap as _Zap,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Space } from "@hive/core";

// Empty Search Results Handler
interface EmptySearchResultsProps {
  searchQuery: string;
  activeFilters: Record<string, any>;
  onClearSearch: () => void;
  onClearFilters: () => void;
  onCreateSpaceRequest?: () => void;
  alternativeSuggestions?: Space[];
}

export function EmptySearchResults({ 
  searchQuery, 
  activeFilters, 
  onClearSearch, 
  onClearFilters,
  onCreateSpaceRequest,
  alternativeSuggestions = []
}: EmptySearchResultsProps) {
  const hasFilters = Object.keys(activeFilters).length > 0;
  const hasSearch = searchQuery.length > 0;

  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="h-8 w-8 text-neutral-400" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        No spaces found
      </h3>

      <p className="text-neutral-400 mb-6">
        {hasSearch && hasFilters 
          ? `No spaces match "${searchQuery}" with your current filters.`
          : hasSearch
          ? `No spaces found for "${searchQuery}".`
          : hasFilters
          ? "No spaces match your current filters."
          : "No spaces available right now."
        }
      </p>

      {/* Quick Actions */}
      <div className="space-y-3 mb-8">
        {hasSearch && (
          <Button 
            onClick={onClearSearch}
            variant="secondary"
            className="w-full border-white/20 text-white"
          >
            Clear search term
          </Button>
        )}
        
        {hasFilters && (
          <Button 
            onClick={onClearFilters}
            variant="secondary"
            className="w-full border-white/20 text-white"
          >
            Reset filters
          </Button>
        )}

        {onCreateSpaceRequest && (
          <Button
            onClick={onCreateSpaceRequest}
            className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
          >
            <Plus className="h-4 w-4 mr-2" />
            Request new space
          </Button>
        )}
      </div>

      {/* Alternative Suggestions */}
      {alternativeSuggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-white mb-3">
            Try these popular spaces instead:
          </h4>
          <div className="space-y-2">
            {alternativeSuggestions.slice(0, 3).map((space) => (
              <div 
                key={space.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {space.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{space.name}</div>
                    <div className="text-xs text-neutral-400">{space.memberCount} members</div>
                  </div>
                </div>
                <Button size="sm" className="bg-hive-gold text-hive-obsidian">
                  Join
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Overwhelmed User Handler - Too Many Spaces Joined
interface SpaceOverloadHandlerProps {
  joinedSpacesCount: number;
  recentlyJoined: Space[];
  inactiveSpaces: Space[];
  onOptimizeSpaces: () => void;
  onPauseRecommendations: () => void;
}

export function SpaceOverloadHandler({
  joinedSpacesCount,
  recentlyJoined,
  inactiveSpaces,
  onOptimizeSpaces,
  onPauseRecommendations
}: SpaceOverloadHandlerProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (joinedSpacesCount < 8) return null; // Only show for 8+ spaces

  return (
    <Card className="p-6 bg-orange-500/10 border-orange-500/20 mb-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-orange-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            You're in {joinedSpacesCount} spaces
          </h3>
          <p className="text-neutral-300 mb-4">
            Research shows that managing more than 5-7 communities can reduce engagement 
            and increase stress. Consider optimizing your space list for a better experience.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-lg font-bold text-white">{recentlyJoined.length}</div>
              <div className="text-xs text-neutral-400">Joined this week</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-lg font-bold text-white">{inactiveSpaces.length}</div>
              <div className="text-xs text-neutral-400">Haven't visited recently</div>
            </div>
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <h4 className="text-sm font-medium text-white mb-2">Spaces you might consider leaving:</h4>
                <div className="space-y-2">
                  {inactiveSpaces.slice(0, 3).map((space) => (
                    <div key={space.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <div>
                        <div className="text-sm text-white">{space.name}</div>
                        <div className="text-xs text-neutral-400">Last visited 2+ weeks ago</div>
                      </div>
                      <Button size="sm" variant="secondary" className="text-neutral-400">
                        Leave
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={onOptimizeSpaces}
              className="bg-orange-400 text-hive-obsidian hover:bg-orange-300"
            >
              <Target className="h-4 w-4 mr-2" />
              Optimize my spaces
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => setShowDetails(!showDetails)}
              className="border-orange-400/30 text-orange-400"
            >
              {showDetails ? "Hide details" : "Show details"}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onPauseRecommendations}
              className="text-neutral-400"
            >
              Pause recommendations
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Inclusive Community Finder for Underrepresented Groups
interface InclusiveCommunityFinderProps {
  userProfile: {
    demographics?: {
      ethnicity?: string;
      gender?: string;
      sexuality?: string;
      disability?: boolean;
      firstGen?: boolean;
      international?: boolean;
    };
    interests: string[];
  };
  inclusiveSpaces: Space[];
  onFindMore: () => void;
}

export function InclusiveCommunityFinder({ 
  userProfile, 
  inclusiveSpaces,
  onFindMore 
}: InclusiveCommunityFinderProps) {
   
  const [_showPersonalized, _setShowPersonalized] = useState(false);

  const getPersonalizedMessage = () => {
    const demographics = userProfile.demographics;
    if (!demographics) return null;

    const messages = [];
    
    if (demographics.international) {
      messages.push("international student communities");
    }
    if (demographics.firstGen) {
      messages.push("first-generation college student groups");
    }
    if (demographics.ethnicity) {
      messages.push("cultural and heritage communities");
    }
    
    return messages.length > 0 ? messages.join(", ") : null;
  };

  const personalizedMessage = getPersonalizedMessage();

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Shield className="h-6 w-6 text-purple-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            Find your community
          </h3>
          <p className="text-neutral-300 mb-4">
            We believe everyone deserves to find welcoming communities where they can thrive. 
            Here are some inclusive spaces that celebrate diversity and foster belonging.
          </p>

          {personalizedMessage && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-purple-300">
                <Shield className="h-4 w-4 inline mr-2" />
                Based on your profile, you might be interested in {personalizedMessage}.
              </p>
            </div>
          )}

          {/* Inclusive Spaces Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {inclusiveSpaces.slice(0, 4).map((space) => (
              <div key={space.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {space.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-white">{space.name}</div>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {space.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-neutral-400">{space.memberCount} members</span>
                  <Badge className="bg-purple-400/20 text-purple-300 text-xs">
                    Inclusive
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={onFindMore}
              className="bg-purple-400 text-white hover:bg-purple-300"
            >
              <Search className="h-4 w-4 mr-2" />
              Explore inclusive communities
            </Button>
            
            <Button
              variant="secondary"
              className="border-purple-400/30 text-purple-400"
            >
              <Globe className="h-4 w-4 mr-2" />
              Report an issue
            </Button>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-neutral-400 mt-3">
            Your demographic information is kept private and only used to suggest relevant communities. 
            You can update these preferences in your profile settings.
          </p>
        </div>
      </div>
    </Card>
  );
}

// Transfer/International Student Onboarding
interface TransferStudentHelperProps {
  studentType: "transfer" | "international" | "both";
  currentUniversity: string;
  previousUniversity?: string;
  country?: string;
  onboardingSpaces: Space[];
  onGetPersonalizedHelp: () => void;
}

export function TransferStudentHelper({
  studentType,
  currentUniversity,
   
  previousUniversity: _previousUniversity,
  country,
  onboardingSpaces,
  onGetPersonalizedHelp
}: TransferStudentHelperProps) {
  const getWelcomeMessage = () => {
    switch (studentType) {
      case "transfer":
        return `Welcome to ${currentUniversity}! We know transferring can be challenging.`;
      case "international":
        return `Welcome to ${currentUniversity}! We're excited to have you join us from ${country}.`;
      case "both":
        return `Welcome to ${currentUniversity}! As an international transfer student, you bring unique experiences.`;
      default:
        return `Welcome to ${currentUniversity}!`;
    }
  };

  const getSpecificSpaces = () => {
    return onboardingSpaces.filter(space => {
      const name = space.name.toLowerCase();
      const description = space.description?.toLowerCase() || "";
      
      const transferKeywords = ["transfer", "new student", "orientation"];
      const internationalKeywords = ["international", "global", "cultural", "language"];
      
      if (studentType === "transfer" || studentType === "both") {
        if (transferKeywords.some(keyword => name.includes(keyword) || description.includes(keyword))) {
          return true;
        }
      }
      
      if (studentType === "international" || studentType === "both") {
        if (internationalKeywords.some(keyword => name.includes(keyword) || description.includes(keyword))) {
          return true;
        }
      }
      
      return false;
    });
  };

  const specificSpaces = getSpecificSpaces();

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
          <Globe className="h-6 w-6 text-blue-400" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">
            {getWelcomeMessage()}
          </h3>
          
          <p className="text-neutral-300 mb-4">
            Here are some communities specifically designed to help you connect, 
            get oriented, and feel at home on campus.
          </p>

          {/* Specialized Resources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {(studentType === "transfer" || studentType === "both") && (
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium text-white mb-2">
                  <Users className="h-4 w-4 inline mr-2 text-blue-400" />
                  Transfer Student Resources
                </h4>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Credit transfer guidance</li>
                  <li>• Academic planning support</li>
                  <li>• Social integration programs</li>
                </ul>
              </div>
            )}

            {(studentType === "international" || studentType === "both") && (
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-medium text-white mb-2">
                  <Globe className="h-4 w-4 inline mr-2 text-green-400" />
                  International Student Support
                </h4>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Visa and immigration help</li>
                  <li>• Cultural adjustment groups</li>
                  <li>• Language exchange programs</li>
                </ul>
              </div>
            )}
          </div>

          {/* Recommended Spaces */}
          {specificSpaces.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Recommended communities:</h4>
              <div className="space-y-2">
                {specificSpaces.slice(0, 3).map((space) => (
                  <div key={space.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {space.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{space.name}</div>
                        <div className="text-xs text-neutral-400">{space.memberCount} members</div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-400 text-white hover:bg-blue-300">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Access Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            <Button
              variant="secondary"
              className="border-blue-400/30 text-blue-400 text-sm"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Campus FAQ
            </Button>
            <Button
              variant="secondary"
              className="border-green-400/30 text-green-400 text-sm"
            >
              <Users className="h-4 w-4 mr-2" />
              Buddy Program
            </Button>
            <Button
              variant="secondary"
              className="border-purple-400/30 text-purple-400 text-sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Orientation Events
            </Button>
          </div>

          {/* Personalized Help */}
          <div className="flex gap-2">
            <Button
              onClick={onGetPersonalizedHelp}
              className="bg-blue-400 text-white hover:bg-blue-300"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Get personalized guidance
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Network Connection Issues Handler
export function NetworkIssueHandler({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="h-8 w-8 text-red-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">
        Connection Problem
      </h3>
      
      <p className="text-neutral-400 mb-6 max-w-md mx-auto">
        We're having trouble loading spaces right now. This might be due to a network issue 
        or temporary server problem.
      </p>
      
      <div className="space-y-3">
        <Button 
          onClick={onRetry}
          className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try again
        </Button>
        
        <div className="text-xs text-neutral-500">
          If the problem persists, check your internet connection or try again later.
        </div>
      </div>
    </div>
  );
}

// Performance Optimization for Large Space Lists
interface VirtualizedSpaceListProps {
  spaces: Space[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (_space: Space, _index: number) => React.ReactNode;
}

export function VirtualizedSpaceList({
  spaces,
  itemHeight,
  containerHeight,
  renderItem
}: VirtualizedSpaceListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, spaces.length);
  
  const visibleSpaces = spaces.slice(startIndex, endIndex);
  
  return (
    <div 
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: spaces.length * itemHeight, position: "relative" }}>
        <div 
          style={{ 
            transform: `translateY(${startIndex * itemHeight}px)`,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleSpaces.map((space, index) => (
            <div key={space.id} style={{ height: itemHeight }}>
              {renderItem(space, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}