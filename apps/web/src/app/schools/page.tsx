"use client";

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import Link from 'next/link';
import { Search, Users, ArrowRight, MapPin, ArrowLeft } from 'lucide-react';


interface School {
  id: string;
  name: string;
  domain: string;
  location: string;
  signupCount?: number;
  activationThreshold?: number;
  isActive?: boolean;
  isComingSoon?: boolean;
  status?: 'active' | 'waitlist' | 'inactive';
}

// Fallback for development only
const fallbackSchools: School[] = [
  // Development Test School - Always first for easy access
  {
    id: 'test-university',
    name: 'Test University (Development)',
    domain: 'test.edu',
    location: 'Development, NY',
    signupCount: 999,
    activationThreshold: 350,
    isActive: true,
  },
  // SUNY Schools - Major Campuses
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    location: 'Buffalo, NY',
    signupCount: 350,
    activationThreshold: 350,
    isActive: true,
  },
  {
    id: 'stonybrook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    location: 'Stony Brook, NY',
    signupCount: 312,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    location: 'Binghamton, NY',
    signupCount: 298,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'albany',
    name: 'University at Albany',
    domain: 'albany.edu',
    location: 'Albany, NY',
    signupCount: 267,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'newpaltz',
    name: 'SUNY New Paltz',
    domain: 'newpaltz.edu',
    location: 'New Paltz, NY',
    signupCount: 189,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'geneseo',
    name: 'SUNY Geneseo',
    domain: 'geneseo.edu',
    location: 'Geneseo, NY',
    signupCount: 156,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'oswego',
    name: 'SUNY Oswego',
    domain: 'oswego.edu',
    location: 'Oswego, NY',
    signupCount: 134,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'brockport',
    name: 'SUNY Brockport',
    domain: 'brockport.edu',
    location: 'Brockport, NY',
    signupCount: 112,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'cortland',
    name: 'SUNY Cortland',
    domain: 'cortland.edu',
    location: 'Cortland, NY',
    signupCount: 98,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'plattsburgh',
    name: 'SUNY Plattsburgh',
    domain: 'plattsburgh.edu',
    location: 'Plattsburgh, NY',
    signupCount: 87,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'oneonta',
    name: 'SUNY Oneonta',
    domain: 'oneonta.edu',
    location: 'Oneonta, NY',
    signupCount: 76,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'potsdam',
    name: 'SUNY Potsdam',
    domain: 'potsdam.edu',
    location: 'Potsdam, NY',
    signupCount: 65,
    activationThreshold: 350,
    isActive: false,
  },

  // Private Universities in NY
  {
    id: 'nyu',
    name: 'New York University',
    domain: 'nyu.edu',
    location: 'New York, NY',
    signupCount: 289,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    location: 'Ithaca, NY',
    signupCount: 234,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    domain: 'columbia.edu',
    location: 'New York, NY',
    signupCount: 187,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syr.edu',
    location: 'Syracuse, NY',
    signupCount: 176,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'rochester',
    name: 'University of Rochester',
    domain: 'rochester.edu',
    location: 'Rochester, NY',
    signupCount: 145,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'fordham',
    name: 'Fordham University',
    domain: 'fordham.edu',
    location: 'Bronx, NY',
    signupCount: 123,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'hofstra',
    name: 'Hofstra University',
    domain: 'hofstra.edu',
    location: 'Hempstead, NY',
    signupCount: 98,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'pace',
    name: 'Pace University',
    domain: 'pace.edu',
    location: 'New York, NY',
    signupCount: 87,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'rpi',
    name: 'Rensselaer Polytechnic Institute',
    domain: 'rpi.edu',
    location: 'Troy, NY',
    signupCount: 76,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'stjohns',
    name: "St. John's University",
    domain: 'stjohns.edu',
    location: 'Queens, NY',
    signupCount: 65,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'adelphi',
    name: 'Adelphi University',
    domain: 'adelphi.edu',
    location: 'Garden City, NY',
    signupCount: 54,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'marist',
    name: 'Marist College',
    domain: 'marist.edu',
    location: 'Poughkeepsie, NY',
    signupCount: 43,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'iona',
    name: 'Iona University',
    domain: 'iona.edu',
    location: 'New Rochelle, NY',
    signupCount: 32,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'manhattan',
    name: 'Manhattan College',
    domain: 'manhattan.edu',
    location: 'Riverdale, NY',
    signupCount: 21,
    activationThreshold: 350,
    isActive: false,
  },

  // Major Universities Outside NY
  {
    id: 'harvard',
    name: 'Harvard University',
    domain: 'harvard.edu',
    location: 'Cambridge, MA',
    signupCount: 245,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    domain: 'mit.edu',
    location: 'Cambridge, MA',
    signupCount: 198,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    domain: 'stanford.edu',
    location: 'Stanford, CA',
    signupCount: 234,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'berkeley',
    name: 'UC Berkeley',
    domain: 'berkeley.edu',
    location: 'Berkeley, CA',
    signupCount: 312,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'ucla',
    name: 'UCLA',
    domain: 'ucla.edu',
    location: 'Los Angeles, CA',
    signupCount: 298,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'usc',
    name: 'University of Southern California',
    domain: 'usc.edu',
    location: 'Los Angeles, CA',
    signupCount: 187,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'upenn',
    name: 'University of Pennsylvania',
    domain: 'upenn.edu',
    location: 'Philadelphia, PA',
    signupCount: 223,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'princeton',
    name: 'Princeton University',
    domain: 'princeton.edu',
    location: 'Princeton, NJ',
    signupCount: 156,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'yale',
    name: 'Yale University',
    domain: 'yale.edu',
    location: 'New Haven, CT',
    signupCount: 178,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    domain: 'umich.edu',
    location: 'Ann Arbor, MI',
    signupCount: 267,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'northwestern',
    name: 'Northwestern University',
    domain: 'northwestern.edu',
    location: 'Evanston, IL',
    signupCount: 145,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'uchicago',
    name: 'University of Chicago',
    domain: 'uchicago.edu',
    location: 'Chicago, IL',
    signupCount: 134,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'duke',
    name: 'Duke University',
    domain: 'duke.edu',
    location: 'Durham, NC',
    signupCount: 198,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'unc',
    name: 'UNC Chapel Hill',
    domain: 'unc.edu',
    location: 'Chapel Hill, NC',
    signupCount: 289,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'gatech',
    name: 'Georgia Institute of Technology',
    domain: 'gatech.edu',
    location: 'Atlanta, GA',
    signupCount: 234,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'utexas',
    name: 'University of Texas at Austin',
    domain: 'utexas.edu',
    location: 'Austin, TX',
    signupCount: 345,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'rice',
    name: 'Rice University',
    domain: 'rice.edu',
    location: 'Houston, TX',
    signupCount: 123,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'uwashington',
    name: 'University of Washington',
    domain: 'uw.edu',
    location: 'Seattle, WA',
    signupCount: 278,
    activationThreshold: 350,
    isActive: false,
  },
  {
    id: 'virginia',
    name: 'University of Virginia',
    domain: 'virginia.edu',
    location: 'Charlottesville, VA',
    signupCount: 198,
    activationThreshold: 350,
    isActive: false,
  },
];

export default function SchoolsPage() {
  // const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [navigatingSchool, setNavigatingSchool] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch schools from API
  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools');
        if (response.ok) {
          const schoolsData = await response.json();
          const formattedSchools = schoolsData
            .filter((school: any) => school && school.name && school.location)
            .map((school: any) => {
              // Handle location field - convert object to string if needed
              let locationString = school.location;
              if (typeof school.location === 'object' && school.location !== null) {
                // Convert {city, state, country} object to string
                const { city, state, country } = school.location;
                locationString = [city, state, country].filter(Boolean).join(', ');
              }
              
              return {
                ...school,
                location: locationString,
                isActive: school.status === 'active',
                isComingSoon: school.status === 'waitlist',
                signupCount: school.signupCount || 0,
                activationThreshold: school.activationThreshold || 350
              };
            });
          setSchools(formattedSchools);
        } else {
          // Fallback to hardcoded data only in development
          console.warn('Failed to fetch schools from API, using fallback');
          setSchools(fallbackSchools);
        }
      } catch (_error) {
        logger.error('Error fetching schools:', { error: String(_error) });
        setSchools(fallbackSchools);
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(school => {
    if (!school || !school.name || !school.location) return false;
    return school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           school.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSchoolSelect = (school: School, event: React.MouseEvent) => {
    // Prevent double-click issues
    event.preventDefault();
    event.stopPropagation();
    
    if (navigatingSchool === school.id) return; // Prevent duplicate navigation
    
    setNavigatingSchool(school.id);
    
    if (school.isActive) {
      // Navigate to login for active schools
      const params = new URLSearchParams({
        school: school.id,  // Changed from schoolId to school to match login page expectations
        schoolName: school.name,
        domain: school.domain,
      });
      const targetUrl = `/auth/login?${params.toString()}`;
      // Add slight delay for visual feedback
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 200);
    } else {
      // Handle waitlist signup for inactive schools
      handleWaitlistSignup(school, event);
    }
  };

  const handleWaitlistSignup = (school: School, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // Navigate to waitlist signup page with school context
    const params = new URLSearchParams({
      schoolId: school.id,
      schoolName: school.name,
      domain: school.domain,
      signupCount: school.signupCount?.toString() || '0',
      threshold: school.activationThreshold?.toString() || '350'
    });
    
    // Add slight delay for visual feedback
    setTimeout(() => {
      window.location.href = `/waitlist?${params.toString()}`;
    }, 200);
  };

  if (!isMounted) {
    return (
      <div className="relative min-h-screen overflow-hidden font-sans bg-[#0A0A0B] text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div 
        className="relative min-h-screen overflow-hidden font-sans bg-[#0A0A0B] text-white animate-in fade-in duration-300"
      >
      {/* Enhanced Glassy Background */}
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255, 191, 0, 0.03) 0%, transparent 50%)',
        backdropFilter: 'blur(40px)'
      }} />
      
      {/* Header */}
      <div className="relative z-10 border-b border-hive-border-primary backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-hive-text-muted hover:text-hive-text-primary transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to home</span>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="hover:opacity-90 transition-all duration-200 flex items-center gap-3 group">
                <div className="flex items-center justify-center">
                  <img 
                    src="/assets/hive-logo-white.svg" 
                    alt="HIVE Logo" 
                    className="h-10 w-10 object-contain transition-transform duration-200 hover:scale-105"
                    onError={(e: any) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/assets/whitelogo.svg";
                    }}
                  />
                </div>
                <span className="text-3xl font-bold text-hive-text-primary tracking-tight group-hover:text-hive-brand-primary transition-colors duration-200">HIVE</span>
              </Link>
            </div>
            
            <button 
              onClick={() => setIsComingSoonOpen(true)}
              className="text-sm font-medium text-hive-brand-primary hover:text-hive-brand-secondary transition-colors"
            >
              Request your school
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-6 py-12">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-hive-text-primary">
            Find your campus
          </h1>
          <p className="font-sans text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 text-hive-text-secondary">
            Join the students building the future of campus life at your university
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-hive-text-muted" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-hive-background-secondary/50 border border-hive-border-primary rounded-xl text-hive-text-primary placeholder-hive-text-placeholder focus:outline-none focus:border-hive-brand-primary/50 focus:bg-hive-background-secondary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
            <p className="font-sans text-sm text-hive-text-muted">
              Loading universities...
            </p>
          </div>
        )}

        {/* Schools Grid */}
        {!loading && (
          <div className="grid gap-4 hive-animate-liquid-reveal mb-16">
            {filteredSchools.map((school) => (
            <div
              key={school.id}
              data-testid={`school-${school.id}`}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer hive-interactive ${
                navigatingSchool === school.id 
                  ? 'border-hive-brand-primary/50 bg-hive-brand-primary/5 scale-[0.98]' 
                  : 'border-hive-border-primary hover:border-hive-border-primary/30'
              }`}
              onClick={(event: any) => handleSchoolSelect(school, event)}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-tl from-yellow-500/5 via-transparent to-transparent" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center hive-gap-md mb-3">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-hive-text-primary">
                        {school.name}
                      </h3>
                      {school.isActive && (
                        <div className="px-3 py-1 bg-hive-status-success/10 backdrop-blur-sm text-hive-status-success text-xs rounded-full border border-hive-status-success/20 font-medium">
                          LIVE
                        </div>
                      )}
                      {school.isComingSoon && (
                        <div className="px-3 py-1 bg-hive-status-warning/10 backdrop-blur-sm text-hive-status-warning text-xs rounded-full border border-hive-status-warning/20 font-medium">
                          SOON
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center hive-gap-md font-sans text-sm text-hive-text-muted">
                      <div className="flex items-center hive-gap-xs">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{school.location}</span>
                      </div>
                      <div className="flex items-center hive-gap-xs">
                        <Users className="w-4 h-4" />
                        <span className="font-mono text-xs">@{school.domain}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    {navigatingSchool === school.id ? (
                      <div className="flex items-center hive-gap-sm text-hive-brand-primary">
                        <div className="w-4 h-4 border-2 border-hive-brand-primary/30 border-t-hive-brand-primary rounded-full animate-spin" />
                        <span className="font-sans font-medium text-sm">Loading...</span>
                      </div>
                    ) : school.isActive ? (
                      <div className="flex items-center hive-gap-sm text-hive-text-primary">
                        <span className="font-sans font-medium text-sm">Enter HIVE</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <div className="font-sans text-sm font-medium text-hive-text-secondary">
                          {school.isComingSoon ? 'Coming Soon' : 'Join Waitlist'}
                        </div>
                        {!school.isComingSoon && school.signupCount !== undefined && school.activationThreshold && (
                          <div className="space-y-1">
                            <div className="text-xs text-hive-text-muted">
                              {school.signupCount}/{school.activationThreshold}
                            </div>
                            <div className="w-16 bg-hive-background-secondary rounded-full h-1">
                              <div 
                                className="bg-hive-brand-primary/60 h-1 rounded-full transition-all duration-200"
                                style={{ width: `${Math.min((school.signupCount / school.activationThreshold) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hive-text-primary/5 to-transparent" />
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-hive-background-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-hive-text-muted" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-hive-text-primary">
              No universities found
            </h3>
            <p className="text-sm leading-relaxed text-hive-text-muted">
              Try adjusting your search or check back later for more campuses
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="p-8 max-w-2xl mx-auto border border-hive-brand-secondary/30 rounded-lg bg-hive-background-secondary/80 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-hive-text-primary">
              Don&apos;t see your university?
            </h3>
            <p className="text-base mb-6 leading-relaxed text-hive-text-secondary">
              We&apos;re expanding to more campuses every month. Join our general waitlist to be notified when HIVE arrives at your school.
            </p>
            <button className="px-8 py-3 bg-transparent border-2 border-hive-brand-primary text-hive-brand-primary rounded-lg hover:bg-hive-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 transition-all duration-200 font-medium">
              Join General Waitlist
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Coming Soon Modal */}
      {isComingSoonOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-8 max-w-md w-full border border-hive-brand-secondary/30 rounded-lg bg-hive-background-secondary shadow-2xl">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-4">What&apos;s Coming to HIVE</h2>
            <p className="text-hive-text-secondary mb-6">
              We&apos;re building the future of campus collaboration. Check back soon for new features and campus expansions.
            </p>
            <button
              onClick={() => setIsComingSoonOpen(false)}
              className="w-full px-6 py-3 bg-transparent border-2 border-hive-brand-primary text-hive-brand-primary rounded-lg hover:bg-hive-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/50 transition-all duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
} 