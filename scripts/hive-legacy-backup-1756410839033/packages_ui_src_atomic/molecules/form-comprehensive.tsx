'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { InputEnhanced as Input } from '../atoms/input-enhanced';
import { SelectEnhanced as Select, SelectOptionEnhanced as SelectOption } from '../atoms/select-enhanced';
import { FormField } from './form-field';
import { 
  Mail, 
  GraduationCap, 
  Building2, 
  Users, 
  Calendar, 
  Eye, 
  EyeOff, 
  Hammer, 
  Zap, 
  Package,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

// ==========================================
// UNIVERSITY-SPECIFIC FORM MOLECULES
// ==========================================

// University Email Field with Domain Validation
export interface UniversityEmailFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  university?: string;
  className?: string;
}

export const UniversityEmailFieldMolecule: React.FC<UniversityEmailFieldProps> = ({
  value = '',
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  university,
  className
}) => {
  const [isValidUniversityEmail, setIsValidUniversityEmail] = React.useState<boolean | null>(null);

  const validateUniversityEmail = (email: string) => {
    if (!email) return null;
    
    // Common university email patterns
    const universityPatterns = [
      /\.edu$/,           // Standard .edu domains
      /\.ac\.[a-z]{2}$/,  // Academic domains (e.g., .ac.uk)
      /\.university$/,    // .university domains
      /student\./,        // Student subdomains
      /alumni\./          // Alumni subdomains
    ];
    
    return universityPatterns.some(pattern => pattern.test(email.toLowerCase()));
  };

  React.useEffect(() => {
    if (value) {
      setIsValidUniversityEmail(validateUniversityEmail(value));
    } else {
      setIsValidUniversityEmail(null);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const displayError = error || (isValidUniversityEmail === false ? 'Please use your university email address' : undefined);

  return (
    <FormField
      label="University Email"
      description={university ? `Use your ${university} email address` : 'Use your university email address (.edu domain)'}
      error={displayError}
      required={required}
      className={className}
    >
      <InputEnhanced
        type="email"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder="student@university.edu"
        disabled={disabled}
        leftIcon={<Mail className="h-4 w-4" />}
        rightIcon={
          isValidUniversityEmail === true ? (
            <CheckCircle className="h-4 w-4 text-[var(--hive-status-success)]" />
          ) : isValidUniversityEmail === false ? (
            <AlertCircle className="h-4 w-4 text-[var(--hive-status-error)]" />
          ) : null
        }
      />
    </FormField>
  );
};

// Student ID Field with Format Validation
export interface StudentIDFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const StudentIDFieldMolecule: React.FC<StudentIDFieldProps> = ({
  value = '',
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only alphanumeric characters and common separators
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9\-_]/g, '');
    onChange?.(sanitized);
  };

  return (
    <FormField
      label="Student ID"
      description="Your official university student identification number"
      error={error}
      required={required}
      className={className}
    >
      <InputEnhanced
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder="123456789"
        disabled={disabled}
        leftIcon={<GraduationCap className="h-4 w-4" />}
        maxLength={20}
      />
    </FormField>
  );
};

// Academic Major Selection with Year
export interface MajorSelectionFieldProps {
  major?: string;
  year?: string;
  onMajorChange?: (value: string) => void;
  onYearChange?: (value: string) => void;
  majorError?: string;
  yearError?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const ACADEMIC_MAJORS: SelectOption[] = [
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'business', label: 'Business Administration' },
  { value: 'psychology', label: 'Psychology' },
  { value: 'biology', label: 'Biology' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'english', label: 'English Literature' },
  { value: 'history', label: 'History' },
  { value: 'art', label: 'Art & Design' },
  { value: 'music', label: 'Music' },
  { value: 'economics', label: 'Economics' },
  { value: 'political-science', label: 'Political Science' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'physics', label: 'Physics' },
  { value: 'nursing', label: 'Nursing' },
  { value: 'education', label: 'Education' },
  { value: 'communications', label: 'Communications' },
  { value: 'other', label: 'Other' }
];

const ACADEMIC_YEARS: SelectOption[] = [
  { value: 'freshman', label: 'Freshman (1st Year)' },
  { value: 'sophomore', label: 'Sophomore (2nd Year)' },
  { value: 'junior', label: 'Junior (3rd Year)' },
  { value: 'senior', label: 'Senior (4th Year)' },
  { value: 'grad', label: 'Graduate Student' },
  { value: 'phd', label: 'PhD Student' },
  { value: 'postdoc', label: 'Postdoc' }
];

export const MajorSelectionFieldMolecule: React.FC<MajorSelectionFieldProps> = ({
  major = '',
  year = '',
  onMajorChange,
  onYearChange,
  majorError,
  yearError,
  required = false,
  disabled = false,
  className
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <FormField
        label="Academic Major"
        description="Your primary field of study"
        error={majorError}
        required={required}
      >
        <SelectEnhanced
          options={ACADEMIC_MAJORS}
          value={major}
          onChange={(e) => onMajorChange?.(e.target.value)}
          placeholder="Select your major"
          disabled={disabled}
          searchable
        />
      </FormField>

      <FormField
        label="Academic Year"
        description="Your current year in university"
        error={yearError}
        required={required}
      >
        <SelectEnhanced
          options={ACADEMIC_YEARS}
          value={year}
          onChange={(e) => onYearChange?.(e.target.value)}
          placeholder="Select your year"
          disabled={disabled}
        />
      </FormField>
    </div>
  );
};

// Dorm Selection Field
export interface DormSelectionFieldProps {
  dormBuilding?: string;
  roomNumber?: string;
  onDormChange?: (value: string) => void;
  onRoomChange?: (value: string) => void;
  dormError?: string;
  roomError?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const DormSelectionFieldMolecule: React.FC<DormSelectionFieldProps> = ({
  dormBuilding = '',
  roomNumber = '',
  onDormChange,
  onRoomChange,
  dormError,
  roomError,
  required = false,
  disabled = false,
  className
}) => {
  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow alphanumeric room numbers
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9\-]/g, '');
    onRoomChange?.(sanitized);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <FormField
        label="Residence Hall"
        description="Your dormitory or residence hall name"
        error={dormError}
        required={required}
      >
        <InputEnhanced
          type="text"
          value={dormBuilding}
          onChange={(e) => onDormChange?.(e.target.value)}
          placeholder="e.g., Smith Hall, West Campus Dorms"
          disabled={disabled}
          leftIcon={<Building2 className="h-4 w-4" />}
        />
      </FormField>

      <FormField
        label="Room Number"
        description="Your room or suite number"
        error={roomError}
        required={required}
      >
        <InputEnhanced
          type="text"
          value={roomNumber}
          onChange={handleRoomChange}
          placeholder="e.g., 314, A205"
          disabled={disabled}
          maxLength={10}
        />
      </FormField>
    </div>
  );
};

// Greek Affiliation Field
export interface GreekAffiliationFieldProps {
  organization?: string;
  position?: string;
  onOrganizationChange?: (value: string) => void;
  onPositionChange?: (value: string) => void;
  organizationError?: string;
  positionError?: string;
  disabled?: boolean;
  className?: string;
}

const GREEK_POSITIONS: SelectOption[] = [
  { value: 'member', label: 'Member' },
  { value: 'pledge', label: 'Pledge' },
  { value: 'president', label: 'President' },
  { value: 'vice-president', label: 'Vice President' },
  { value: 'treasurer', label: 'Treasurer' },
  { value: 'secretary', label: 'Secretary' },
  { value: 'social-chair', label: 'Social Chair' },
  { value: 'philanthropy-chair', label: 'Philanthropy Chair' },
  { value: 'recruitment-chair', label: 'Recruitment Chair' },
  { value: 'other-officer', label: 'Other Officer' }
];

export const GreekAffiliationFieldMolecule: React.FC<GreekAffiliationFieldProps> = ({
  organization = '',
  position = '',
  onOrganizationChange,
  onPositionChange,
  organizationError,
  positionError,
  disabled = false,
  className
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <FormField
        label="Greek Organization"
        description="Your fraternity, sorority, or Greek organization"
        error={organizationError}
      >
        <InputEnhanced
          type="text"
          value={organization}
          onChange={(e) => onOrganizationChange?.(e.target.value)}
          placeholder="e.g., Alpha Beta Gamma, Delta Phi Epsilon"
          disabled={disabled}
          leftIcon={<Users className="h-4 w-4" />}
        />
      </FormField>

      {organization && (
        <FormField
          label="Position"
          description="Your role in the organization"
          error={positionError}
        >
          <SelectEnhanced
            options={GREEK_POSITIONS}
            value={position}
            onChange={(e) => onPositionChange?.(e.target.value)}
            placeholder="Select your position"
            disabled={disabled}
          />
        </FormField>
      )}
    </div>
  );
};

// Calendar Connection Field
export interface CalendarConnectionFieldProps {
  googleCalendar?: boolean;
  outlookCalendar?: boolean;
  appleCalendar?: boolean;
  onGoogleChange?: (enabled: boolean) => void;
  onOutlookChange?: (enabled: boolean) => void;
  onAppleChange?: (enabled: boolean) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const CalendarConnectionFieldMolecule: React.FC<CalendarConnectionFieldProps> = ({
  googleCalendar = false,
  outlookCalendar = false,
  appleCalendar = false,
  onGoogleChange,
  onOutlookChange,
  onAppleChange,
  error,
  disabled = false,
  className
}) => {
  return (
    <FormField
      label="Calendar Integration"
      description="Connect your calendars to sync your schedule with HIVE"
      error={error}
      className={className}
    >
      <div className="space-y-3 p-4 bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-default)]">
        {/* Google Calendar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">Google Calendar</span>
          </div>
          <button
            type="button"
            onClick={() => onGoogleChange?.(!googleCalendar)}
            disabled={disabled}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              googleCalendar
                ? 'bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20'
                : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]'
            )}
          >
            {googleCalendar ? 'Connected' : 'Connect'}
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>

        {/* Outlook Calendar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">Outlook Calendar</span>
          </div>
          <button
            type="button"
            onClick={() => onOutlookChange?.(!outlookCalendar)}
            disabled={disabled}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              outlookCalendar
                ? 'bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20'
                : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]'
            )}
          >
            {outlookCalendar ? 'Connected' : 'Connect'}
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>

        {/* Apple Calendar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">Apple Calendar</span>
          </div>
          <button
            type="button"
            onClick={() => onAppleChange?.(!appleCalendar)}
            disabled={disabled}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              appleCalendar
                ? 'bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/20'
                : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-interactive)]'
            )}
          >
            {appleCalendar ? 'Connected' : 'Connect'}
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </FormField>
  );
};

// Privacy Level Field (Ghost Mode)
export interface PrivacyLevelFieldProps {
  value?: 'public' | 'friends' | 'ghost';
  onChange?: (value: 'public' | 'friends' | 'ghost') => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const PRIVACY_LEVELS: SelectOption[] = [
  { value: 'public', label: 'Public Profile' },
  { value: 'friends', label: 'Friends Only' },
  { value: 'ghost', label: 'Ghost Mode' }
];

export const PrivacyLevelFieldMolecule: React.FC<PrivacyLevelFieldProps> = ({
  value = 'friends',
  onChange,
  error,
  disabled = false,
  className
}) => {
  const getPrivacyDescription = (level: string) => {
    switch (level) {
      case 'public':
        return 'Your profile is visible to everyone in your university';
      case 'friends':
        return 'Your profile is only visible to your connections';
      case 'ghost':
        return 'Your profile is completely private and invisible to others';
      default:
        return 'Choose your privacy level';
    }
  };

  return (
    <FormField
      label="Privacy Level"
      description={getPrivacyDescription(value)}
      error={error}
      className={className}
    >
      <div className="space-y-3">
        <SelectEnhanced
          options={PRIVACY_LEVELS}
          value={value}
          onChange={(e) => onChange?.(e.target.value as 'public' | 'friends' | 'ghost')}
          disabled={disabled}
        />
        
        {value === 'ghost' && (
          <div className="flex items-center gap-2 p-3 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-default)]">
            <Eye className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
            <span className="text-xs text-[var(--hive-text-secondary)]">
              Ghost mode allows you to browse and participate while remaining completely anonymous
            </span>
          </div>
        )}
      </div>
    </FormField>
  );
};

// Builder Verification Field
export interface BuilderVerificationFieldProps {
  portfolioUrl?: string;
  githubUrl?: string;
  experience?: string;
  onPortfolioChange?: (value: string) => void;
  onGithubChange?: (value: string) => void;
  onExperienceChange?: (value: string) => void;
  portfolioError?: string;
  githubError?: string;
  experienceError?: string;
  disabled?: boolean;
  className?: string;
}

const EXPERIENCE_LEVELS: SelectOption[] = [
  { value: 'beginner', label: 'Beginner (0-1 years)' },
  { value: 'intermediate', label: 'Intermediate (1-3 years)' },
  { value: 'advanced', label: 'Advanced (3-5 years)' },
  { value: 'expert', label: 'Expert (5+ years)' }
];

export const BuilderVerificationFieldMolecule: React.FC<BuilderVerificationFieldProps> = ({
  portfolioUrl = '',
  githubUrl = '',
  experience = '',
  onPortfolioChange,
  onGithubChange,
  onExperienceChange,
  portfolioError,
  githubError,
  experienceError,
  disabled = false,
  className
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <FormField
        label="Portfolio URL"
        description="Link to your portfolio or personal website"
        error={portfolioError}
      >
        <InputEnhanced
          type="url"
          value={portfolioUrl}
          onChange={(e) => onPortfolioChange?.(e.target.value)}
          placeholder="https://yourportfolio.com"
          disabled={disabled}
          leftIcon={<Hammer className="h-4 w-4" />}
        />
      </FormField>

      <FormField
        label="GitHub Profile"
        description="Your GitHub username or profile URL"
        error={githubError}
      >
        <InputEnhanced
          type="text"
          value={githubUrl}
          onChange={(e) => onGithubChange?.(e.target.value)}
          placeholder="github.com/username"
          disabled={disabled}
          leftIcon={<Package className="h-4 w-4" />}
        />
      </FormField>

      <FormField
        label="Experience Level"
        description="Your coding/building experience"
        error={experienceError}
        required
      >
        <SelectEnhanced
          options={EXPERIENCE_LEVELS}
          value={experience}
          onChange={(e) => onExperienceChange?.(e.target.value)}
          placeholder="Select your experience level"
          disabled={disabled}
        />
      </FormField>
    </div>
  );
};

// Space Activation Request Field
export interface SpaceActivationFieldProps {
  spaceName?: string;
  spaceType?: string;
  description?: string;
  expectedMembers?: string;
  onSpaceNameChange?: (value: string) => void;
  onSpaceTypeChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
  onExpectedMembersChange?: (value: string) => void;
  spaceNameError?: string;
  spaceTypeError?: string;
  descriptionError?: string;
  disabled?: boolean;
  className?: string;
}

const SPACE_TYPES: SelectOption[] = [
  { value: 'academic', label: 'Academic (Class/Study Group)' },
  { value: 'club', label: 'Club/Organization' },
  { value: 'greek', label: 'Greek Life' },
  { value: 'residential', label: 'Residential (Dorm/Floor)' },
  { value: 'social', label: 'Social Group' },
  { value: 'professional', label: 'Professional/Career' },
  { value: 'hobby', label: 'Hobby/Interest' },
  { value: 'other', label: 'Other' }
];

export const SpaceActivationFieldMolecule: React.FC<SpaceActivationFieldProps> = ({
  spaceName = '',
  spaceType = '',
  description = '',
  expectedMembers = '',
  onSpaceNameChange,
  onSpaceTypeChange,
  onDescriptionChange,
  onExpectedMembersChange,
  spaceNameError,
  spaceTypeError,
  descriptionError,
  disabled = false,
  className
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <FormField
        label="Space Name"
        description="What would you like to call your space?"
        error={spaceNameError}
        required
      >
        <InputEnhanced
          type="text"
          value={spaceName}
          onChange={(e) => onSpaceNameChange?.(e.target.value)}
          placeholder="e.g., CS Study Group, Delta Chi, Floor 3 East"
          disabled={disabled}
          leftIcon={<Zap className="h-4 w-4" />}
        />
      </FormField>

      <FormField
        label="Space Type"
        description="What kind of space is this?"
        error={spaceTypeError}
        required
      >
        <SelectEnhanced
          options={SPACE_TYPES}
          value={spaceType}
          onChange={(e) => onSpaceTypeChange?.(e.target.value)}
          placeholder="Select space type"
          disabled={disabled}
        />
      </FormField>

      <FormField
        label="Description"
        description="Briefly describe your space and its purpose"
        error={descriptionError}
        required
      >
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange?.(e.target.value)}
          placeholder="Tell us about your space, its goals, and what members can expect..."
          disabled={disabled}
          className={cn(
            'w-full min-h-[80px] p-4 rounded-xl',
            'bg-transparent border border-[var(--hive-border-default)]',
            'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
            'text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]',
            'resize-none transition-all duration-200'
          )}
          maxLength={500}
        />
      </FormField>

      <FormField
        label="Expected Members"
        description="How many people do you expect to join?"
        required
      >
        <InputEnhanced
          type="number"
          value={expectedMembers}
          onChange={(e) => onExpectedMembersChange?.(e.target.value)}
          placeholder="e.g., 25"
          disabled={disabled}
          min="1"
          max="1000"
        />
      </FormField>
    </div>
  );
};

// Tool Publishing Field
export interface ToolPublishingFieldProps {
  toolName?: string;
  toolDescription?: string;
  toolCategory?: string;
  repositoryUrl?: string;
  onToolNameChange?: (value: string) => void;
  onToolDescriptionChange?: (value: string) => void;
  onToolCategoryChange?: (value: string) => void;
  onRepositoryUrlChange?: (value: string) => void;
  toolNameError?: string;
  toolDescriptionError?: string;
  toolCategoryError?: string;
  repositoryError?: string;
  disabled?: boolean;
  className?: string;
}

const TOOL_CATEGORIES: SelectOption[] = [
  { value: 'productivity', label: 'Productivity' },
  { value: 'academic', label: 'Academic/Study' },
  { value: 'social', label: 'Social/Communication' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'utility', label: 'Utility' },
  { value: 'health', label: 'Health/Wellness' },
  { value: 'finance', label: 'Finance' },
  { value: 'creative', label: 'Creative/Design' },
  { value: 'developer', label: 'Developer Tools' },
  { value: 'other', label: 'Other' }
];

export const ToolPublishingFieldMolecule: React.FC<ToolPublishingFieldProps> = ({
  toolName = '',
  toolDescription = '',
  toolCategory = '',
  repositoryUrl = '',
  onToolNameChange,
  onToolDescriptionChange,
  onToolCategoryChange,
  onRepositoryUrlChange,
  toolNameError,
  toolDescriptionError,
  toolCategoryError,
  repositoryError,
  disabled = false,
  className
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <FormField
        label="Tool Name"
        description="What's your tool called?"
        error={toolNameError}
        required
      >
        <InputEnhanced
          type="text"
          value={toolName}
          onChange={(e) => onToolNameChange?.(e.target.value)}
          placeholder="e.g., Study Scheduler, Grade Calculator"
          disabled={disabled}
          leftIcon={<Package className="h-4 w-4" />}
        />
      </FormField>

      <FormField
        label="Category"
        description="What category does your tool fit into?"
        error={toolCategoryError}
        required
      >
        <SelectEnhanced
          options={TOOL_CATEGORIES}
          value={toolCategory}
          onChange={(e) => onToolCategoryChange?.(e.target.value)}
          placeholder="Select a category"
          disabled={disabled}
        />
      </FormField>

      <FormField
        label="Description"
        description="Describe what your tool does and how it helps students"
        error={toolDescriptionError}
        required
      >
        <textarea
          value={toolDescription}
          onChange={(e) => onToolDescriptionChange?.(e.target.value)}
          placeholder="Describe your tool's features, benefits, and how students can use it..."
          disabled={disabled}
          className={cn(
            'w-full min-h-[100px] p-4 rounded-xl',
            'bg-transparent border border-[var(--hive-border-default)]',
            'focus:border-[var(--hive-brand-secondary)] focus:ring-2 focus:ring-[var(--hive-brand-secondary)]/20',
            'text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]',
            'resize-none transition-all duration-200'
          )}
          maxLength={1000}
        />
      </FormField>

      <FormField
        label="Repository URL (Optional)"
        description="Link to your GitHub repository or source code"
        error={repositoryError}
      >
        <InputEnhanced
          type="url"
          value={repositoryUrl}
          onChange={(e) => onRepositoryUrlChange?.(e.target.value)}
          placeholder="https://github.com/username/tool-name"
          disabled={disabled}
          leftIcon={<Package className="h-4 w-4" />}
        />
      </FormField>
    </div>
  );
};