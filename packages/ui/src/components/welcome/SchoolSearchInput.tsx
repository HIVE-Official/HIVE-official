import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/Input';
import { cn } from '@/lib/utils';

// Mock data for schools, to be replaced by Firestore data in T1-S1A-D2-03
const MOCK_SCHOOLS = [
  { id: '1', name: 'University at Buffalo' },
  { id: '2', name: 'Stony Brook University' },
  { id: '3', name: 'Binghamton University' },
  { id: '4', name: 'University at Albany' },
  { id: '5', name: 'Cornell University' },
  { id: '6', name: 'New York University' },
  { id: '7', name: 'Columbia University' },
  { id: '8', name: 'Syracuse University' },
];

interface SchoolSearchInputProps {
  onSchoolSelect: (schoolId: string) => void;
  className?: string;
}

const SchoolSearchInput = React.forwardRef<
  HTMLInputElement,
  SchoolSearchInputProps
>(({ onSchoolSelect, className, ...props }, ref) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSchools = React.useMemo(() => {
    if (!searchQuery) {
      return []; // Don't show any schools until the user starts typing
    }
    return MOCK_SCHOOLS.filter((school) =>
      school.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <Input
          ref={ref}
          type="search"
          placeholder="Search for your university..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          {...props}
        />
      </div>

      {searchQuery && (
        <div className="absolute top-full mt-2 w-full bg-bg-card border border-border rounded-lg z-10 max-h-60 overflow-y-auto">
          {filteredSchools.length > 0 ? (
            <ul>
              {filteredSchools.map((school) => (
                <li
                  key={school.id}
                  onClick={() => onSchoolSelect(school.id)}
                  className="px-4 py-3 hover:bg-accent-gold/10 cursor-pointer text-sm"
                >
                  {school.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-center text-sm text-muted">
              {/* Placeholder for HT-S1A-04 */}
              No schools found.
            </p>
          )}
        </div>
      )}
    </div>
  );
});

SchoolSearchInput.displayName = 'SchoolSearchInput';

export { SchoolSearchInput }; 