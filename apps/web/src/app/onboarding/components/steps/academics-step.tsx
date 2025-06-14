import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Search, ChevronDown } from 'lucide-react';
import { Input } from '@hive/ui/components/Input';
import { UB_MAJORS } from '@hive/core/src/constants/majors';
import { OnboardingData } from '../onboarding-wizard';

interface AcademicsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

function Label({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none ${className}`}>
      {children}
    </label>
  );
}

export function AcademicsStep({ data, updateData, onNext }: AcademicsStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 7 }, (_, i) => currentYear + i);

  const filteredMajors = UB_MAJORS.filter(major =>
    major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    major.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.major) {
      onNext();
    }
  };

  const selectMajor = (major: string) => {
    updateData({ major });
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">
          Tell us about your academics
        </h2>
        <p className="text-zinc-400">
          This helps us connect you with the right spaces and classmates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-white">Major</Label>
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search for your major..."
              value={data.major || searchQuery}
              onChange={(e) => {
                if (!data.major) {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }
              }}
              onFocus={() => setShowDropdown(true)}
              className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-500"
            />
            {data.major && (
              <button
                type="button"
                onClick={() => {
                  updateData({ major: '' });
                  setSearchQuery('');
                  setShowDropdown(true);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
          
          {showDropdown && !data.major && (
            <div className="absolute z-10 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredMajors.length > 0 ? (
                filteredMajors.slice(0, 10).map((major) => (
                  <button
                    key={major.name}
                    type="button"
                    onClick={() => selectMajor(major.name)}
                    className="w-full text-left px-3 py-2 hover:bg-zinc-700 text-white"
                  >
                    <div className="font-medium">{major.name}</div>
                    <div className="text-xs text-zinc-400">{major.school}</div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-zinc-400">No majors found</div>
              )}
            </div>
          )}
          
          {data.major && (
            <div className="text-sm text-zinc-400">
              {UB_MAJORS.find(m => m.name === data.major)?.school}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-white">Expected Graduation Year</Label>
          <div className="relative">
            <select
              value={data.graduationYear.toString()}
              onChange={(e) => updateData({ graduationYear: parseInt(e.target.value) })}
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 pr-10 focus:border-yellow-500 focus:outline-none appearance-none"
            >
              {graduationYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-white mb-2">
            Why we ask
          </h4>
          <p className="text-xs text-zinc-400">
            Your major helps us recommend relevant spaces like study groups, project teams, and career-focused communities.
          </p>
        </div>
      </form>
    </motion.div>
  );
} 