import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "@hive/ui";
import { Wrench, Users, Crown, Star, CheckCircle, Loader2, Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { HiveCard, HiveButton, HiveInput } from "@hive/ui";
import { useSession } from "@/hooks/use-session";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveBuilderStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

interface Space {
  id: string;
  name: string;
  description: string;
  type: string;
  subType?: string;
  memberCount: number;
  tags?: string[];
  status: string;
  isPrivate: boolean;
  isMember: boolean;
  createdAt?: any;
  updatedAt?: any;
  bannerUrl?: string | null;
}

export function HiveBuilderStep({ data, updateData }: HiveBuilderStepProps) {
  const { user } = useSession();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(data.builderRequestSpaces || []);
  const [searchCache, setSearchCache] = useState<Record<string, Space[]>>({});

  // Fetch spaces only when user searches to limit reads - require minimum 2 characters
  const fetchSpaces = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSpaces([]);
      return;
    }

    // Check cache first to avoid redundant Firebase reads
    const cacheKey = searchQuery.toLowerCase();
    if (searchCache[cacheKey]) {
      setSpaces(searchCache[cacheKey]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get authentication token - use test-token for development/onboarding
      const authToken: string = 'test-token';
      
      // In production with real Firebase auth, we'd use:
      // if (user && typeof user.getIdToken === 'function') {
      //   authToken = await user.getIdToken();
      // }

      console.log("Searching for:", searchQuery);

      const response = await fetch(`/api/spaces/browse?limit=30&search=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error("API error response:", response.status, errorData);
        throw new Error(`Failed to fetch spaces: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Search results:", result.spaces?.length || 0);
      
      // Filter spaces based on user type
      const filteredSpaces = (result.spaces || []).filter((space: Space) => {
        // Always exclude campus living spaces
        if (space.type === 'campus_living') {
          return false;
        }
        
        // Show all non-campus-living spaces for both faculty and students
        return true;
      });
      
      console.log("Spaces after filtering out campus living:", filteredSpaces.length);
      
      // Cache the results to avoid redundant API calls
      setSearchCache(prev => ({
        ...prev,
        [cacheKey]: filteredSpaces
      }));
      
      setSpaces(filteredSpaces);
    } catch (err) {
      console.error("Error searching spaces:", err);
      setError(err instanceof Error ? err.message : "Failed to search spaces");
    } finally {
      setIsLoading(false);
    }
  }, [searchCache]);

  // Debounced search effect to reduce Firebase reads
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSpaces(searchTerm);
    }, 500); // 500ms debounce for good balance

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchSpaces]);

  // Set initial loading state to false since we don't load anything initially
  useEffect(() => {
    setIsLoading(false);
  }, []);

  console.log("Search term:", searchTerm);
  console.log("Total spaces found:", spaces.length);

  const toggleSpaceSelection = (spaceId: string) => {
    const newSelectedSpaces = selectedSpaces.includes(spaceId)
      ? selectedSpaces.filter(id => id !== spaceId)
      : [...selectedSpaces, spaceId];
    
    setSelectedSpaces(newSelectedSpaces);
    updateData({ builderRequestSpaces: newSelectedSpaces });
  };


  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-6)] py-[var(--hive-spacing-4)] max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-6)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-brand-primary)]/30"
        >
          <Users className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            {data.userType === 'faculty' ? 'Request Management Access' : 'Request Builder Access'}
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-4">
            {data.userType === 'faculty' 
              ? 'Search and select institutional spaces to request management access. Your requests will be reviewed by administrators.'
              : 'Search for communities you\'d like to build and manage on HIVE.'
            }
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <HiveInput
          placeholder={data.userType === 'faculty' 
            ? "Search for institutional spaces (departments, courses, etc.)..." 
            : "Search for communities you want to help build..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          variant="premium"
          size="lg"
          floatingLabel={false}
        />
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center py-12"
        >
          <Loader2 className="w-8 h-8 animate-spin text-[var(--hive-brand-primary)]" />
          <span className="ml-3 text-[var(--hive-text-secondary)]">Loading spaces...</span>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HiveCard variant="error" className="p-[var(--hive-spacing-4)] text-center">
            <p className="text-[var(--hive-status-error)]">{error}</p>
          </HiveCard>
        </motion.div>
      )}

      {/* No Spaces Message */}
      {!isLoading && !error && spaces.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HiveCard variant="subtle" className="p-[var(--hive-spacing-6)] text-center">
            <p className="text-[var(--hive-text-secondary)]">
              {searchTerm && searchTerm.length >= 2 
                ? (data.userType === 'faculty' 
                    ? "No institutional spaces match your search. Try searching for academic departments, courses, or official university organizations." 
                    : "No communities match your search. Try searching for clubs, organizations, fraternities, or sororities you'd like to help build on HIVE."
                  )
                : (data.userType === 'faculty'
                    ? "Start typing to search for institutional spaces to request management access. You must select at least one to complete setup."
                    : "Start typing to search for communities you'd like to request builder access for."
                  )
              }
            </p>
          </HiveCard>
        </motion.div>
      )}

      {/* Spaces Grid */}
      {!isLoading && !error && spaces.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid gap-[var(--hive-spacing-4)] md:grid-cols-2"
        >
          {spaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <HiveCard
                variant={selectedSpaces.includes(space.id) ? "premium" : "glass"}
                className={cn(
                  "p-[var(--hive-spacing-4)] cursor-pointer transition-all duration-300 hover:scale-105",
                  selectedSpaces.includes(space.id)
                    ? "border-[var(--hive-brand-primary)]/50 shadow-lg shadow-[var(--hive-brand-primary)]/25"
                    : "hover:border-[var(--hive-brand-primary)]/30"
                )}
                onClick={() => toggleSpaceSelection(space.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">
                      {space.name}
                    </h3>
                    <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-2">
                      {space.description}
                    </p>
                  </div>
                  <div className={cn(
                    "ml-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    selectedSpaces.includes(space.id)
                      ? "bg-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]"
                      : "border-[var(--hive-border-primary)]"
                  )}>
                    {selectedSpaces.includes(space.id) && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                
              </HiveCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Selected Count */}
      {selectedSpaces.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <HiveCard variant="success" className="p-[var(--hive-spacing-4)] inline-block">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[var(--hive-status-success)]" />
              <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                {selectedSpaces.length} space{selectedSpaces.length !== 1 ? 's' : ''} selected {data.userType === 'faculty' ? 'for management requests' : 'for builder requests'}
              </span>
            </div>
          </HiveCard>
        </motion.div>
      )}

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <HiveCard variant="subtle" className="p-[var(--hive-spacing-4)] text-center">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-[var(--hive-spacing-3)] flex items-center justify-center">
            <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full mr-2" />
            {data.userType === 'faculty' ? 'Faculty Management Requests' : 'HIVE Builder Program'}
          </h4>
          
          <div className="space-y-[var(--hive-spacing-2)] text-xs text-[var(--hive-text-muted)]">
            {data.userType === 'faculty' ? (
              <>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Faculty can request management access to institutional spaces only</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>All requests are reviewed and approved by HIVE administrators</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>You must select at least one space to complete faculty setup</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Request builder access for communities you want to help manage</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Builders help create and curate content for their communities</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
                  <span>Requests will be reviewed by the HIVE team</span>
                </div>
              </>
            )}
          </div>
        </HiveCard>
      </motion.div>
    </motion.div>
  );
}