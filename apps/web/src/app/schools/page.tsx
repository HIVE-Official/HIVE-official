"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Users, ArrowRight, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiveSearchInput, HiveComingSoonModal } from '@hive/ui';

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
];

export default function SchoolsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching schools:', error);
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

  const handleSchoolSelect = (school: School) => {
    if (school.isActive) {
      const params = new URLSearchParams({
        schoolId: school.id,
        schoolName: school.name,
        domain: school.domain,
      });
      router.push(`/auth/login?${params.toString()}`);
    }
  };

  return (
    <React.Fragment>
      <motion.div 
        className="relative min-h-screen overflow-hidden hive-font-sans bg-hive-background-primary text-hive-text-primary" 
        style={{ backgroundColor: '#0A0A0B', color: '#F5F5F7' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
      {/* Enhanced Glassy Background */}
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255, 191, 0, 0.03) 0%, transparent 50%)',
        backdropFilter: 'blur(40px)'
      }} />
      
      {/* Header */}
      <div className="relative z-10 border-b backdrop-blur-xl" style={{ 
        borderColor: 'rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <Link href="/landing" className="flex items-center hive-gap-md hover:opacity-80 transition-opacity">
              <div className="w-8 h-8">
                <Image
                  src="/assets/hive-logo-white.svg"
                  alt="HIVE"
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </div>
              <span className="hive-font-sans text-xl font-bold tracking-wide">HIVE</span>
            </Link>
            <button 
              className="hive-button-secondary px-6 py-2"
              onClick={() => setIsComingSoonOpen(true)}
            >
              What's Coming
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-6 py-12">
        <div className="text-center mb-16">
          <h1 className="hive-font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6" style={{ color: '#F5F5F7' }}>
            Find your campus
          </h1>
          <p className="hive-font-sans text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8" style={{ color: '#9A9AA1' }}>
            Join the students building the future of campus life at your university
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <HiveSearchInput
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              variant="default"
              size="lg"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
            <p className="hive-font-sans text-sm" style={{ color: '#9A9AA1' }}>
              Loading universities...
            </p>
          </div>
        )}

        {/* Schools Grid */}
        {!loading && (
          <div className="grid gap-4 hive-animate-liquid-reveal mb-16">
            {filteredSchools.map((school, index) => (
            <div
              key={school.id}
              className="group relative overflow-hidden rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer hive-interactive"
              onClick={() => handleSchoolSelect(school)}
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
                      <h3 className="hive-font-sans text-lg font-semibold tracking-tight" style={{ color: '#F5F5F7' }}>
                        {school.name}
                      </h3>
                      {school.isActive && (
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/20 font-medium">
                          LIVE
                        </div>
                      )}
                      {school.isComingSoon && (
                        <div className="px-3 py-1 bg-yellow-500/10 backdrop-blur-sm text-yellow-300 text-xs rounded-full border border-yellow-500/20 font-medium">
                          SOON
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center hive-gap-md hive-font-sans text-sm" style={{ color: '#9A9AA1' }}>
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
                    {school.isActive ? (
                      <div className="flex items-center hive-gap-sm text-white">
                        <span className="hive-font-sans font-medium text-sm">Enter HIVE</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="hive-font-sans text-sm font-medium" style={{ color: '#C1C1C4' }}>
                          {school.isComingSoon ? 'Coming Soon' : 'Join Waitlist'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredSchools.length === 0 && (
          <div className="text-center py-12 hive-animate-silk-emerge">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-white/40" />
            </div>
            <h3 className="hive-font-sans text-lg font-semibold mb-2" style={{ color: '#F5F5F7' }}>
              No universities found
            </h3>
            <p className="hive-font-sans text-sm leading-relaxed" style={{ color: '#9A9AA1' }}>
              Try adjusting your search or check back later for more campuses
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <div className="hive-glass-strong p-8 rounded-xl max-w-2xl mx-auto" style={{ border: '1px solid rgba(255, 191, 0, 0.3)' }}>
            <h3 className="hive-font-sans text-xl md:text-2xl font-bold mb-4 tracking-tight" style={{ color: '#F5F5F7' }}>
              Don't see your university?
            </h3>
            <p className="hive-font-sans text-base mb-6 leading-relaxed" style={{ color: '#9A9AA1' }}>
              We're expanding to more campuses every month. Join our general waitlist to be notified when HIVE arrives at your school.
            </p>
            <button className="hive-button-primary px-8 py-3">
              Join General Waitlist
            </button>
          </div>
        </div>
      </div>
      </motion.div>

      <HiveComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        onWaitlistClick={() => {
          // Already on schools page, just close modal
          setIsComingSoonOpen(false);
        }}
      />
    </React.Fragment>
  );
} 