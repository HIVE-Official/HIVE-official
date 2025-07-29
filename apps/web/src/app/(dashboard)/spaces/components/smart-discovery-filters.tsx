"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Button, Badge } from "@hive/ui";
import { 
  Search, 
  Filter as _Filter, 
  X, 
  ChevronDown as _ChevronDown,
  Users,
  Clock,
  TrendingUp,
  Star,
  MapPin as _MapPin,
  Calendar as _Calendar,
  Zap,
  Heart,
  Target,
  Sliders
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@hive/hooks";

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  count?: number;
  color?: string;
}

interface SmartFilter {
  id: string;
  label: string;
  type: "single" | "multi" | "range" | "toggle";
  options?: FilterOption[];
  min?: number;
  max?: number;
  default?: any;
}

interface SmartDiscoveryFiltersProps {
  onFiltersChange: (_filters: Record<string, any>) => void;
  onSearchChange: (_query: string) => void;
  userProfile?: {
    interests: string[];
    joinedSpaces: string[];
    friends: string[];
    year: "freshman" | "sophomore" | "junior" | "senior";
  };
  spaceStats?: {
    totalSpaces: number;
    categories: Record<string, number>;
    trending: string[];
  };
}

const smartFilters: SmartFilter[] = [
  {
    id: "category",
    label: "Category",
    type: "multi",
    options: [
      { id: "academic", label: "Academic", icon: Target, count: 45, color: "blue" },
      { id: "sports", label: "Sports & Rec", icon: Zap, count: 32, color: "green" },
      { id: "arts", label: "Arts & Culture", icon: Heart, count: 28, color: "purple" },
      { id: "greek", label: "Greek Life", icon: Star, count: 24, color: "yellow" },
      { id: "career", label: "Career", icon: TrendingUp, count: 19, color: "orange" },
      { id: "service", label: "Service", icon: Users, count: 16, color: "pink" }
    ]
  },
  {
    id: "size",
    label: "Community Size",
    type: "single",
    options: [
      { id: "small", label: "Intimate (5-25)", icon: Users },
      { id: "medium", label: "Medium (25-100)", icon: Users },
      { id: "large", label: "Large (100+)", icon: Users }
    ]
  },
  {
    id: "activity",
    label: "Activity Level",
    type: "single",
    options: [
      { id: "very-active", label: "Very Active", color: "green" },
      { id: "active", label: "Active", color: "blue" },
      { id: "moderate", label: "Moderate", color: "yellow" },
      { id: "quiet", label: "Quiet", color: "gray" }
    ]
  },
  {
    id: "commitment",
    label: "Time Commitment",
    type: "single",
    options: [
      { id: "low", label: "Low (1-2 hrs/week)" },
      { id: "medium", label: "Medium (3-5 hrs/week)" },
      { id: "high", label: "High (6+ hrs/week)" }
    ]
  },
  {
    id: "sort",
    label: "Sort By",
    type: "single",
    options: [
      { id: "recommended", label: "Recommended for You", icon: Star },
      { id: "popular", label: "Most Popular", icon: TrendingUp },
      { id: "trending", label: "Trending Now", icon: TrendingUp },
      { id: "recent", label: "Recently Created", icon: Clock },
      { id: "friends", label: "Where Friends Are", icon: Users }
    ]
  }
];

export function SmartDiscoveryFilters({ 
  onFiltersChange, 
  onSearchChange, 
  userProfile,
  spaceStats 
}: SmartDiscoveryFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    sort: "recommended" // Default to personalized
  });
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Smart search suggestions based on user profile and behavior
  const generateSearchSuggestions = (query: string) => {
    const suggestions: string[] = [];
    
    // Profile-based suggestions
    if (userProfile?.interests) {
      userProfile.interests.forEach(interest => {
        if (interest.toLowerCase().includes(query.toLowerCase())) {
          suggestions.push(interest);
        }
      });
    }
    
    // Popular searches (mock data - would come from analytics)
    const popularSearches = [
      "study group", "intramural", "volunteer", "photography", 
      "coding", "music", "dance", "debate", "gaming"
    ];
    
    popularSearches.forEach(search => {
      if (search.includes(query.toLowerCase()) && !suggestions.includes(search)) {
        suggestions.push(search);
      }
    });
    
    return suggestions.slice(0, 5);
  };

  useEffect(() => {
    if (debouncedSearch) {
      onSearchChange(debouncedSearch);
      const suggestions = generateSearchSuggestions(debouncedSearch);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
      onSearchChange("");
    }
  }, [debouncedSearch, onSearchChange, userProfile]);

  useEffect(() => {
    onFiltersChange(activeFilters);
  }, [activeFilters, onFiltersChange]);

  const handleFilterChange = (filterId: string, value: any) => {
    const filter = smartFilters.find(f => f.id === filterId);
    if (!filter) return;

    setActiveFilters(prev => {
      if (filter.type === "multi") {
        const currentValues = prev[filterId] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v: any) => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterId]: newValues };
      } else {
        return { ...prev, [filterId]: value };
      }
    });
  };

  const clearFilter = (filterId: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterId];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({ sort: "recommended" });
    setSearchQuery("");
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).filter(key => 
      key !== "sort" && activeFilters[key] && 
      (Array.isArray(activeFilters[key]) ? activeFilters[key].length > 0 : true)
    ).length;
  };

  const getFilterDisplay = () => {
    const activeCount = getActiveFilterCount();
    if (activeCount === 0) return "All Spaces";
    return `${activeCount} filter${activeCount > 1 ? "s" : ""} applied`;
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search communities, activities, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
            className="w-full pl-10 pr-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white placeholder:text-neutral-400 focus:border-yellow-400 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                searchInputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 z-50"
            >
              <Card className="p-2 border border-white/10 bg-neutral-900/95 backdrop-blur-sm">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-neutral-300 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Search className="h-3 w-3 inline mr-2 text-neutral-400" />
                    {suggestion}
                  </button>
                ))}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Filters & Filter Toggle */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {/* Smart Recommendations Button */}
        <Button
          size="sm"
          variant={activeFilters.sort === "recommended" ? "default" : "outline"}
          onClick={() => handleFilterChange("sort", "recommended")}
          className={`flex-shrink-0 ${
            activeFilters.sort === "recommended" 
              ? "bg-yellow-400 text-neutral-950" 
              : "border-white/20 text-neutral-300"
          }`}
        >
          <Star className="h-3 w-3 mr-1" />
          For You
        </Button>

        {/* Quick category filters */}
        {userProfile?.interests.slice(0, 3).map((interest) => (
          <Button
            key={interest}
            size="sm"
            variant="outline"
            onClick={() => {
              const _currentCategories = activeFilters.category || [];
              handleFilterChange("category", interest);
            }}
            className={`flex-shrink-0 border-white/20 text-neutral-300 ${
              (activeFilters.category || []).includes(interest) 
                ? "bg-white/10" 
                : ""
            }`}
          >
            {interest}
          </Button>
        ))}

        {/* Advanced Filters Toggle */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className={`flex-shrink-0 border-white/20 text-neutral-300 ml-auto ${
            isFilterPanelOpen ? "bg-white/10" : ""
          }`}
        >
          <Sliders className="h-3 w-3 mr-1" />
          Filters
          {getActiveFilterCount() > 0 && (
            <Badge className="ml-1 bg-yellow-400 text-neutral-950 text-xs min-w-[1.2rem] h-5">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-neutral-400">Active filters:</span>
          {Object.entries(activeFilters).map(([filterId, value]) => {
            if (filterId === "sort" || !value) return null;
            
            const filter = smartFilters.find(f => f.id === filterId);
            if (!filter) return null;

            if (Array.isArray(value)) {
              return value.map((v) => (
                <Badge
                  key={`${filterId}-${v}`}
                  className="bg-white/10 text-white text-xs pr-1"
                >
                  {filter.options?.find(o => o.id === v)?.label || v}
                  <button
                    onClick={() => handleFilterChange(filterId, v)}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
              ));
            } else {
              return (
                <Badge
                  key={filterId}
                  className="bg-white/10 text-white text-xs pr-1"
                >
                  {filter.options?.find(o => o.id === value)?.label || value}
                  <button
                    onClick={() => clearFilter(filterId)}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
              );
            }
          })}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={clearAllFilters}
            className="text-neutral-400 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Advanced Filter Panel */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 border border-white/10">
              <div className="space-y-4">
                {smartFilters.map((filter) => (
                  <div key={filter.id}>
                    <label className="text-sm font-medium text-white mb-2 block">
                      {filter.label}
                    </label>
                    
                    {filter.type === "multi" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {filter.options?.map((option) => {
                          const isSelected = (activeFilters[filter.id] || []).includes(option.id);
                          const Icon = option.icon;
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleFilterChange(filter.id, option.id)}
                              className={`
                                p-2 rounded-lg text-left transition-all text-sm
                                flex items-center gap-2
                                ${isSelected 
                                  ? "bg-yellow-400/20 border-yellow-400 text-yellow-400" 
                                  : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
                                }
                                border
                              `}
                            >
                              {Icon && <Icon className="h-3 w-3" />}
                              <span className="flex-1">{option.label}</span>
                              {option.count && (
                                <span className="text-xs text-neutral-400">
                                  {option.count}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {filter.type === "single" && (
                      <div className="space-y-1">
                        {filter.options?.map((option) => {
                          const isSelected = activeFilters[filter.id] === option.id;
                          const Icon = option.icon;
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleFilterChange(filter.id, option.id)}
                              className={`
                                w-full p-2 rounded-lg text-left transition-all text-sm
                                flex items-center gap-2
                                ${isSelected 
                                  ? "bg-yellow-400/20 border-yellow-400 text-yellow-400" 
                                  : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
                                }
                                border
                              `}
                            >
                              {Icon && <Icon className="h-3 w-3" />}
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-neutral-400">
        <span>{getFilterDisplay()}</span>
        {spaceStats && (
          <span>{spaceStats.totalSpaces} spaces available</span>
        )}
      </div>
    </div>
  );
}