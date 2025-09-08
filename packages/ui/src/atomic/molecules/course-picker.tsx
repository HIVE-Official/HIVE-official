'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../atoms/badge';
import { Input, SearchInput } from '../atoms/input-enhanced';
import { Button } from '../atoms/button-enhanced';
import { Alert, AlertDescription } from '../atoms/alert';

// HIVE Course Picker Molecule - Campus-Specific Component
// Designed for UB (University at Buffalo) course selection with semantic tokens

export interface CourseInfo {
  id: string;
  code: string; // e.g., "CSE 115"
  title: string; // e.g., "Introduction to Computer Science I"
  credits: number;
  department: string;
  instructor?: string;
  schedule?: string; // e.g., "MWF 10:00-10:50"
  location?: string; // e.g., "Knox 20"
  description?: string;
  prerequisites?: string[];
  seats: {
    available: number;
    total: number;
  };
  status: 'open' | 'waitlist' | 'closed';
  semester: string; // e.g., "Fall 2024"
}

export interface CoursePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  courses: CourseInfo[];
  selectedCourses?: CourseInfo[];
  onCourseSelect?: (course: CourseInfo) => void;
  onCourseRemove?: (course: CourseInfo) => void;
  maxCourses?: number;
  searchable?: boolean;
  showPrerequisites?: boolean;
  showScheduleConflicts?: boolean;
  semester?: string;
  departments?: string[];
  onDepartmentFilter?: (department: string | null) => void;
  loading?: boolean;
  error?: string;
}

const CoursePicker = React.forwardRef<HTMLDivElement, CoursePickerProps>(
  ({
    courses = [],
    selectedCourses = [],
    onCourseSelect,
    onCourseRemove,
    maxCourses = 6,
    searchable = true,
    showPrerequisites = true,
    showScheduleConflicts = true,
    semester,
    departments = [],
    onDepartmentFilter,
    loading = false,
    error,
    className,
    ...props
  }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedDepartment, setSelectedDepartment] = React.useState<string | null>(null);

    // Filter courses based on search and department
    const filteredCourses = React.useMemo(() => {
      return courses.filter(course => {
        const matchesSearch = !searchTerm || 
          course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment = !selectedDepartment || 
          course.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
      });
    }, [courses, searchTerm, selectedDepartment]);

    const handleDepartmentChange = (department: string | null) => {
      setSelectedDepartment(department);
      onDepartmentFilter?.(department);
    };

    const handleCourseToggle = (course: CourseInfo) => {
      const isSelected = selectedCourses.some(c => c.id === course.id);
      
      if (isSelected) {
        onCourseRemove?.(course);
      } else if (selectedCourses.length < maxCourses) {
        onCourseSelect?.(course);
      }
    };

    const getStatusColor = (status: CourseInfo['status']) => {
      switch (status) {
        case 'open': return 'success';
        case 'waitlist': return 'warning';
        case 'closed': return 'error';
        default: return 'default';
      }
    };

    const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);
    const hasMaxCourses = selectedCourses.length >= maxCourses;

    return (
      <div
        ref={ref}
        className={cn(
          'space-y-6 bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] rounded-xl p-6',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
              Course Selection {semester && `- ${semester}`}
            </h3>
            <Badge variant="secondary" className="text-[var(--hive-text-secondary)]">
              {selectedCourses.length}/{maxCourses} courses ({totalCredits} credits)
            </Badge>
          </div>
          
          {error && (
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {searchable && (
            <SearchInput
              placeholder="Search courses by code, title, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
              className="w-full"
            />
          )}

          {departments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedDepartment === null ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleDepartmentChange(null)}
              >
                All Departments
              </Button>
              {departments.map(dept => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleDepartmentChange(dept)}
                >
                  {dept}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Courses */}
        {selectedCourses.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">
              Selected Courses
            </h4>
            <div className="grid gap-3">
              {selectedCourses.map(course => (
                <SelectedCourseCard
                  key={course.id}
                  course={course}
                  onRemove={() => onCourseRemove?.(course)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Available Courses */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">
            Available Courses ({filteredCourses.length})
          </h4>
          
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-[var(--hive-background-tertiary)] h-24 rounded-lg" />
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-[var(--hive-text-secondary)]">
              {searchTerm || selectedDepartment ? 'No courses match your search criteria' : 'No courses available'}
            </div>
          ) : (
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {filteredCourses.map(course => {
                const isSelected = selectedCourses.some(c => c.id === course.id);
                const canSelect = !isSelected && !hasMaxCourses;
                
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isSelected={isSelected}
                    canSelect={canSelect}
                    onToggle={() => handleCourseToggle(course)}
                    showPrerequisites={showPrerequisites}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Summary */}
        {selectedCourses.length > 0 && (
          <div className="pt-4 border-t border-[var(--hive-border-primary)]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--hive-text-secondary)]">
                Total: {selectedCourses.length} courses, {totalCredits} credits
              </span>
              <span className="text-[var(--hive-text-secondary)]">
                {maxCourses - selectedCourses.length} spots remaining
              </span>
            </div>
            
            {totalCredits > 18 && (
              <Alert variant="warning" className="mt-3">
                <AlertDescription>
                  You've selected {totalCredits} credits. Most students take 12-18 credits per semester.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    );
  }
);
CoursePicker.displayName = 'CoursePicker';

// Course Card Component
interface CourseCardProps {
  course: CourseInfo;
  isSelected: boolean;
  canSelect: boolean;
  onToggle: () => void;
  showPrerequisites: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isSelected,
  canSelect,
  onToggle,
  showPrerequisites
}) => {
  const statusColors = {
    open: 'text-[var(--hive-status-success)]',
    waitlist: 'text-[var(--hive-status-warning)]',
    closed: 'text-[var(--hive-status-error)]'
  };

  return (
    <div
      className={cn(
        'border rounded-lg p-4 transition-all duration-200 cursor-pointer',
        'hover:bg-[var(--hive-interactive-hover)]',
        isSelected 
          ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-overlay-orange-subtle)]'
          : 'border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)]',
        !canSelect && !isSelected && 'opacity-50 cursor-not-allowed'
      )}
      onClick={canSelect || isSelected ? onToggle : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h5 className="font-semibold text-[var(--hive-text-primary)]">
              {course.code}
            </h5>
            <Badge size="sm" className="text-xs">
              {course.credits} cr
            </Badge>
            <span className={cn('text-xs font-medium', statusColors[course.status])}>
              {course.status.toUpperCase()}
            </span>
          </div>
          
          <h6 className="text-sm text-[var(--hive-text-primary)] font-medium">
            {course.title}
          </h6>
          
          <div className="text-xs text-[var(--hive-text-secondary)] space-y-1">
            {course.instructor && (
              <div>Instructor: {course.instructor}</div>
            )}
            {course.schedule && (
              <div>Schedule: {course.schedule}</div>
            )}
            {course.location && (
              <div>Location: {course.location}</div>
            )}
            <div>
              Seats: {course.seats.available}/{course.seats.total}
            </div>
          </div>

          {showPrerequisites && course.prerequisites && course.prerequisites.length > 0 && (
            <div className="text-xs text-[var(--hive-text-tertiary)]">
              Prerequisites: {course.prerequisites.join(', ')}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isSelected ? 'destructive' : 'primary'}
            size="sm"
            disabled={!canSelect && !isSelected}
          >
            {isSelected ? 'Remove' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Selected Course Card Component
interface SelectedCourseCardProps {
  course: CourseInfo;
  onRemove: () => void;
}

const SelectedCourseCard: React.FC<SelectedCourseCardProps> = ({ course, onRemove }) => (
  <div className="flex items-center justify-between bg-[var(--hive-overlay-orange-subtle)] border border-[var(--hive-brand-primary)] rounded-lg p-3">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[var(--hive-text-primary)]">
          {course.code}
        </span>
        <Badge size="sm" variant="secondary">
          {course.credits} cr
        </Badge>
      </div>
      <div className="text-sm text-[var(--hive-text-secondary)]">
        {course.title}
      </div>
      {course.schedule && (
        <div className="text-xs text-[var(--hive-text-tertiary)]">
          {course.schedule}
        </div>
      )}
    </div>
    <Button
      variant="ghost"
      size="sm"
      onClick={onRemove}
      aria-label={`Remove ${course.code}`}
    >
      ×
    </Button>
  </div>
);

export { CoursePicker };
