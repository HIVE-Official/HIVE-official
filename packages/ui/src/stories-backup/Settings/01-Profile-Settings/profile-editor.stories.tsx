import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Settings/01-Profile Settings/ProfileEditor',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive profile editor for personal information, academic details, and identity management'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface UserProfile {
  basicInfo: {
    firstName: string;
    lastName: string;
    preferredName?: string;
    pronouns?: string;
    email: string;
    phone?: string;
    bio?: string;
  };
  academic: {
    school: string;
    major: string;
    year: string;
    graduationDate?: string;
    gpa?: number;
    courses: string[];
    interests: string[];
  };
  social: {
    linkedIn?: string;
    github?: string;
    portfolio?: string;
    website?: string;
  };
  preferences: {
    visibility: 'public' | 'school-only' | 'connections-only' | 'private';
    showAcademicInfo: boolean;
    showContactInfo: boolean;
    allowSpaceInvites: boolean;
    allowDirectMessages: boolean;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

// Demo data
const INITIAL_PROFILE: UserProfile = {
  basicInfo: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    preferredName: 'Sarah',
    pronouns: 'she/her',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Computer Science student passionate about AI and machine learning. Love building tools that help fellow students succeed. Always excited to collaborate on interesting projects!'
  },
  academic: {
    school: 'University of Buffalo',
    major: 'Computer Science',
    year: 'Junior',
    graduationDate: '2025-05',
    gpa: 3.8,
    courses: ['Data Structures', 'Algorithms', 'Machine Learning', 'Database Systems'],
    interests: ['Artificial Intelligence', 'Web Development', 'Data Science', 'UX Design']
  },
  social: {
    linkedIn: 'https://linkedin.com/in/sarah-johnson-cs',
    github: 'https://github.com/sarah-codes',
    portfolio: 'https://sarahjohnson.dev',
    website: 'https://sarahj.blog'
  },
  preferences: {
    visibility: 'school-only',
    showAcademicInfo: true,
    showContactInfo: false,
    allowSpaceInvites: true,
    allowDirectMessages: true
  }
};

const SCHOOLS = [
  'University of Buffalo',
  'University of Rochester',
  'Cornell University',
  'Columbia University',
  'NYU',
  'Syracuse University'
];

const MAJORS = [
  'Computer Science',
  'Engineering',
  'Business',
  'Psychology',
  'Biology',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Economics',
  'Political Science'
];

const ACADEMIC_YEARS = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate Student',
  'PhD Student'
];

// Form Section Component
const FormSection: React.FC<{
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
  collapsible?: boolean;
}> = ({ title, description, icon, children, collapsible = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default overflow-hidden">
      <div 
        className={`p-6 border-b border-hive-border-default ${collapsible ? 'cursor-pointer hover:bg-hive-background-primary' : ''}`}
        onClick={collapsible ? () => setIsExpanded(!isExpanded) : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-xl flex items-center justify-center text-white text-xl">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-hive-text-primary">{title}</h3>
              <p className="text-sm text-hive-text-secondary">{description}</p>
            </div>
          </div>
          {collapsible && (
            <svg 
              className={`w-5 h-5 text-hive-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      
      {(!collapsible || isExpanded) && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
};

// Input Field Component
const InputField: React.FC<{
  label: string;
  type?: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  rows?: number;
}> = ({ label, type = 'text', value, onChange, placeholder, required, error, helpText, rows }) => {
  const InputComponent = rows ? 'textarea' : 'input';
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-hive-text-primary flex items-center gap-1">
        {label}
        {required && <span className="text-hive-status-error">*</span>}
      </label>
      
      <InputComponent
        type={rows ? undefined : type}
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-xl transition-colors ${
          error 
            ? 'border-hive-status-error focus:border-hive-status-error' 
            : 'border-hive-border-default focus:border-hive-brand-primary'
        } focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20`}
      />
      
      {error && (
        <div className="text-sm text-hive-status-error flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      
      {helpText && !error && (
        <div className="text-sm text-hive-text-secondary">{helpText}</div>
      )}
    </div>
  );
};

// Select Field Component
const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}> = ({ label, value, onChange, options, required, error, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-hive-text-primary flex items-center gap-1">
        {label}
        {required && <span className="text-hive-status-error">*</span>}
      </label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-3 border rounded-xl transition-colors ${
          error 
            ? 'border-hive-status-error focus:border-hive-status-error' 
            : 'border-hive-border-default focus:border-hive-brand-primary'
        } focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      
      {error && (
        <div className="text-sm text-hive-status-error flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

// Toggle Field Component  
const ToggleField: React.FC<{
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-start justify-between p-4 bg-hive-background-primary rounded-xl">
      <div className="flex-1">
        <div className="font-medium text-hive-text-primary">{label}</div>
        {description && (
          <div className="text-sm text-hive-text-secondary mt-1">{description}</div>
        )}
      </div>
      
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-hive-brand-primary focus:ring-offset-2 ${
          checked ? 'bg-hive-brand-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

// Tag Input Component
const TagInput: React.FC<{
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}> = ({ label, tags, onChange, placeholder, maxTags = 10 }) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onChange([...tags, trimmedTag]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-hive-text-primary">{label}</label>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-hive-brand-primary/10 text-hive-brand-primary rounded-full text-sm"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:text-hive-status-error"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </span>
        ))}
      </div>
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={tags.length >= maxTags ? `Maximum ${maxTags} tags` : placeholder}
        disabled={tags.length >= maxTags}
        className="w-full p-3 border border-hive-border-default rounded-xl focus:border-hive-brand-primary focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      
      <div className="text-sm text-hive-text-secondary">
        Press Enter or comma to add tags • {tags.length}/{maxTags} tags used
      </div>
    </div>
  );
};

// Main Profile Editor Component
const ProfileEditor: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfile = (section: keyof UserProfile, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
    
    // Clear error for this field
    const errorKey = `${section}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  const validateProfile = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Basic info validation
    if (!profile.basicInfo.firstName.trim()) {
      newErrors['basicInfo.firstName'] = 'First name is required';
    }
    if (!profile.basicInfo.lastName.trim()) {
      newErrors['basicInfo.lastName'] = 'Last name is required';
    }
    if (!profile.basicInfo.email.trim()) {
      newErrors['basicInfo.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.basicInfo.email)) {
      newErrors['basicInfo.email'] = 'Please enter a valid email address';
    }

    // Academic info validation
    if (!profile.academic.school) {
      newErrors['academic.school'] = 'School is required';
    }
    if (!profile.academic.major) {
      newErrors['academic.major'] = 'Major is required';
    }
    if (!profile.academic.year) {
      newErrors['academic.year'] = 'Academic year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateProfile()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setHasChanges(false);
    
    console.log('Profile saved:', profile);
  };

  const handleCancel = () => {
    setProfile(INITIAL_PROFILE);
    setErrors({});
    setHasChanges(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary">Profile Settings</h1>
          <p className="text-hive-text-secondary">Manage your personal information and academic details</p>
        </div>
        
        <div className="flex items-center gap-3">
          {hasChanges && (
            <div className="flex items-center gap-2 text-sm text-hive-status-warning">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Unsaved changes
            </div>
          )}
          
          <button
            onClick={handleCancel}
            disabled={!hasChanges || isSaving}
            className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving && (
              <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Basic Information */}
      <FormSection
        title="Basic Information"
        description="Your name, contact details, and personal bio"
        icon="👤"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            value={profile.basicInfo.firstName}
            onChange={(value) => updateProfile('basicInfo', 'firstName', value)}
            required
            error={errors['basicInfo.firstName']}
          />
          
          <InputField
            label="Last Name"
            value={profile.basicInfo.lastName}
            onChange={(value) => updateProfile('basicInfo', 'lastName', value)}
            required
            error={errors['basicInfo.lastName']}
          />
          
          <InputField
            label="Preferred Name"
            value={profile.basicInfo.preferredName}
            onChange={(value) => updateProfile('basicInfo', 'preferredName', value)}
            placeholder="How you'd like to be addressed"
            helpText="Optional - defaults to first name if not provided"
          />
          
          <InputField
            label="Pronouns"
            value={profile.basicInfo.pronouns}
            onChange={(value) => updateProfile('basicInfo', 'pronouns', value)}
            placeholder="e.g., she/her, he/him, they/them"
          />
          
          <InputField
            label="Email Address"
            type="email"
            value={profile.basicInfo.email}
            onChange={(value) => updateProfile('basicInfo', 'email', value)}
            required
            error={errors['basicInfo.email']}
          />
          
          <InputField
            label="Phone Number"
            type="tel"
            value={profile.basicInfo.phone}
            onChange={(value) => updateProfile('basicInfo', 'phone', value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div className="mt-6">
          <InputField
            label="Bio"
            value={profile.basicInfo.bio}
            onChange={(value) => updateProfile('basicInfo', 'bio', value)}
            placeholder="Tell others about yourself, your interests, and what you're studying..."
            rows={4}
            helpText="Share what makes you unique! This helps others connect with you."
          />
        </div>
      </FormSection>

      {/* Academic Information */}
      <FormSection
        title="Academic Information"
        description="Your school, major, courses, and academic interests"
        icon="🎓"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="School"
            value={profile.academic.school}
            onChange={(value) => updateProfile('academic', 'school', value)}
            options={SCHOOLS}
            required
            error={errors['academic.school']}
            placeholder="Select your school"
          />
          
          <SelectField
            label="Major"
            value={profile.academic.major}
            onChange={(value) => updateProfile('academic', 'major', value)}
            options={MAJORS}
            required
            error={errors['academic.major']}
            placeholder="Select your major"
          />
          
          <SelectField
            label="Academic Year"
            value={profile.academic.year}
            onChange={(value) => updateProfile('academic', 'year', value)}
            options={ACADEMIC_YEARS}
            required
            error={errors['academic.year']}
            placeholder="Select your year"
          />
          
          <InputField
            label="Expected Graduation"
            type="month"
            value={profile.academic.graduationDate}
            onChange={(value) => updateProfile('academic', 'graduationDate', value)}
          />
          
          <InputField
            label="GPA"
            type="number"
            value={profile.academic.gpa}
            onChange={(value) => updateProfile('academic', 'gpa', parseFloat(value) || undefined)}
            placeholder="3.85"
            helpText="Optional - only visible to you unless you choose to share"
          />
        </div>
        
        <div className="mt-6 space-y-6">
          <TagInput
            label="Current Courses"
            tags={profile.academic.courses}
            onChange={(tags) => updateProfile('academic', 'courses', tags)}
            placeholder="Add your current courses..."
            maxTags={8}
          />
          
          <TagInput
            label="Academic Interests"
            tags={profile.academic.interests}
            onChange={(tags) => updateProfile('academic', 'interests', tags)}
            placeholder="Add your interests and focus areas..."
            maxTags={12}
          />
        </div>
      </FormSection>

      {/* Social Links */}
      <FormSection
        title="Social & Professional Links"
        description="Connect your external profiles and portfolios"
        icon="🔗"
        collapsible
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="LinkedIn Profile"
            type="url"
            value={profile.social.linkedIn}
            onChange={(value) => updateProfile('social', 'linkedIn', value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          
          <InputField
            label="GitHub Profile"
            type="url"
            value={profile.social.github}
            onChange={(value) => updateProfile('social', 'github', value)}
            placeholder="https://github.com/yourusername"
          />
          
          <InputField
            label="Portfolio Website"
            type="url"
            value={profile.social.portfolio}
            onChange={(value) => updateProfile('social', 'portfolio', value)}
            placeholder="https://yourportfolio.com"
          />
          
          <InputField
            label="Personal Website"
            type="url"
            value={profile.social.website}
            onChange={(value) => updateProfile('social', 'website', value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </FormSection>

      {/* Privacy Preferences */}
      <FormSection
        title="Privacy & Visibility"
        description="Control who can see your profile and contact you"
        icon="🔒"
      >
        <div className="space-y-6">
          <div>
            <SelectField
              label="Profile Visibility"
              value={profile.preferences.visibility}
              onChange={(value) => updateProfile('preferences', 'visibility', value as any)}
              options={['public', 'school-only', 'connections-only', 'private']}
            />
            <div className="mt-2 text-sm text-hive-text-secondary">
              {profile.preferences.visibility === 'public' && 'Anyone can find and view your profile'}
              {profile.preferences.visibility === 'school-only' && 'Only people from your school can find you'}
              {profile.preferences.visibility === 'connections-only' && 'Only your connections can view your full profile'}
              {profile.preferences.visibility === 'private' && 'Your profile is hidden from searches'}
            </div>
          </div>
          
          <div className="space-y-4">
            <ToggleField
              label="Show Academic Information"
              description="Display your major, year, and academic details on your profile"
              checked={profile.preferences.showAcademicInfo}
              onChange={(checked) => updateProfile('preferences', 'showAcademicInfo', checked)}
            />
            
            <ToggleField
              label="Show Contact Information"
              description="Allow others to see your email and phone number"
              checked={profile.preferences.showContactInfo}
              onChange={(checked) => updateProfile('preferences', 'showContactInfo', checked)}
            />
            
            <ToggleField
              label="Allow Space Invitations"
              description="Let others invite you to join spaces"
              checked={profile.preferences.allowSpaceInvites}
              onChange={(checked) => updateProfile('preferences', 'allowSpaceInvites', checked)}
            />
            
            <ToggleField
              label="Allow Direct Messages"
              description="Enable direct messaging from other users"
              checked={profile.preferences.allowDirectMessages}
              onChange={(checked) => updateProfile('preferences', 'allowDirectMessages', checked)}
            />
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export const BasicProfileEditor: Story = {
  name: '👤 Basic Profile Editor',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-4xl mx-auto">
          <ProfileEditor />
        </div>
      </div>
    );
  }
};