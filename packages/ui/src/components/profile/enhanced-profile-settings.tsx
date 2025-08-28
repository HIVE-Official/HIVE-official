/**
 * Enhanced Profile Settings - Campus Command Center
 * Integrates ComprehensiveFormField molecule with campus-specific settings
 * 
 * Built using HIVE foundation systems and molecules:
 * - ComprehensiveFormField molecule for consistent form patterns
 * - ComprehensiveCard molecule for organized settings sections
 * - NavigationMenu molecule for settings navigation
 * - Campus-specific validation and features
 */

import React, { useState, useCallback } from 'react';
import { cn } from '../lib/utils';

// Molecule imports
import { ComprehensiveFormField } from '../../atomic/molecules/form-field-comprehensive';
import { ComprehensiveCard } from '../../atomic/molecules/comprehensive-card';
import { NavigationMenu, type NavigationItem } from '../../atomic/molecules/navigation-menu';

// Foundation system imports
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { 
  iconComposition,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Bell,
  Eye,
  EyeOff,
  Shield,
  Save,
  AlertCircle,
  CheckCircle2,
  Upload,
  Camera,
  Globe,
  Users,
  MessageSquare,
  Activity
} from '../../atomic/foundations/icon-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';

// === PROFILE SETTINGS TYPES ===
export interface ProfileFormData {
  // Basic Info
  fullName: string;
  handle: string;
  bio: string;
  email: string;
  phone?: string;
  website?: string;
  
  // Campus Info
  major: string;
  graduationYear: number;
  dorm?: string;
  roomNumber?: string;
  
  // Privacy Settings
  profileVisibility: 'public' | 'campus' | 'connections' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  showDorm: boolean;
  ghostMode: boolean;
  
  // Notification Preferences
  emailNotifications: boolean;
  spacesNotifications: boolean;
  toolsNotifications: boolean;
  eventsNotifications: boolean;
  connectionRequests: boolean;
  weeklyDigest: boolean;
  
  // Campus Features
  enableCalendarSync: boolean;
  enableLocationSharing: boolean;
  enableMutualConnections: boolean;
  enableActivityTracking: boolean;
}

export interface EnhancedProfileSettingsProps {
  // Current user data
  user: ProfileFormData;
  
  // Validation state
  isValidating?: boolean;
  validationErrors?: Partial<Record<keyof ProfileFormData, string>>;
  
  // Saving state
  isSaving?: boolean;
  saveSuccess?: boolean;
  saveError?: string;
  
  // Feature flags
  showCampusFeatures?: boolean;
  showAdvancedPrivacy?: boolean;
  showNotificationSettings?: boolean;
  
  // Callbacks
  onSave: (data: ProfileFormData) => Promise<void>;
  onUploadAvatar?: (file: File) => Promise<string>;
  onDeleteAccount?: () => void;
  
  className?: string;
}

// === SETTINGS SECTIONS ===
const settingsSections: NavigationItem[] = [
  { id: 'basic', label: 'Basic Info', icon: User },
  { id: 'campus', label: 'Campus Info', icon: GraduationCap },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'advanced', label: 'Advanced', icon: Activity }
];

// === VALIDATION RULES ===
const validationRules = {
  fullName: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Please enter your full name (letters, spaces, hyphens, and apostrophes only)'
  },
  handle: {
    required: true,
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
    message: 'Handle must be 3-20 characters (letters, numbers, underscores, hyphens only)'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@buffalo\.edu$/,
    message: 'Must be a valid @buffalo.edu email address'
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  website: {
    pattern: /^https?:\/\/.+/,
    message: 'Website must start with http:// or https://'
  },
  bio: {
    maxLength: 500,
    message: 'Bio must be under 500 characters'
  }
};

// === FORM VALIDATION ===
const validateField = (fieldName: keyof ProfileFormData, value: any): string | undefined => {
  const rules = validationRules[fieldName as keyof typeof validationRules];
  if (!rules) return undefined;
  
  const stringValue = String(value || '').trim();
  
  if (rules.required && !stringValue) {
    return `${fieldName} is required`;
  }
  
  if (stringValue && rules.minLength && stringValue.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }
  
  if (stringValue && rules.maxLength && stringValue.length > rules.maxLength) {
    return `Must be under ${rules.maxLength} characters`;
  }
  
  if (stringValue && rules.pattern && !rules.pattern.test(stringValue)) {
    return rules.message;
  }
  
  return undefined;
};

// === PRIVACY LEVELS ===
const privacyLevels = [
  { 
    value: 'public', 
    label: 'Public', 
    description: 'Visible to everyone on the internet',
    icon: Globe
  },
  { 
    value: 'campus', 
    label: 'Campus Only', 
    description: 'Visible to all UB students and faculty',
    icon: GraduationCap
  },
  { 
    value: 'connections', 
    label: 'Connections Only', 
    description: 'Visible only to your campus connections',
    icon: Users
  },
  { 
    value: 'private', 
    label: 'Private', 
    description: 'Only visible to you',
    icon: Lock
  }
] as const;

// === MAIN COMPONENT ===
export const EnhancedProfileSettings = React.forwardRef<HTMLDivElement, EnhancedProfileSettingsProps>(
  ({
    user,
    isValidating = false,
    validationErrors = {},
    isSaving = false,
    saveSuccess = false,
    saveError,
    showCampusFeatures = true,
    showAdvancedPrivacy = true,
    showNotificationSettings = true,
    onSave,
    onUploadAvatar,
    onDeleteAccount,
    className
  }, ref) => {
    
    const [activeSection, setActiveSection] = useState<string>('basic');
    const [formData, setFormData] = useState<ProfileFormData>(user);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ProfileFormData, string>>>({});
    const [hasChanges, setHasChanges] = useState(false);
    
    // Handle field changes with validation
    const handleFieldChange = useCallback((fieldName: keyof ProfileFormData, value: any) => {
      setFormData(prev => ({ ...prev, [fieldName]: value }));
      setHasChanges(true);
      
      // Real-time validation
      const error = validateField(fieldName, value);
      setFieldErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }, []);
    
    // Handle form save
    const handleSave = useCallback(async () => {
      try {
        await onSave(formData);
        setHasChanges(false);
      } catch (error) {
        console.error('Failed to save profile:', error);
      }
    }, [formData, onSave]);
    
    // Render section content
    const renderSectionContent = () => {
      switch (activeSection) {
        case 'basic':
          return (
            <div className="space-y-6">
              <ComprehensiveFormField
                id="fullName"
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={(value) => handleFieldChange('fullName', value)}
                error={fieldErrors.fullName || validationErrors.fullName}
                required
                campusOptimized
                icon={User}
                helpText="Your name as it appears on your student ID"
              />
              
              <ComprehensiveFormField
                id="handle"
                label="Handle"
                type="text"
                value={formData.handle}
                onChange={(value) => handleFieldChange('handle', value)}
                error={fieldErrors.handle || validationErrors.handle}
                required
                campusOptimized
                helpText="Your unique identifier on HIVE (@handle)"
              />
              
              <ComprehensiveFormField
                id="bio"
                label="Bio"
                type="text"
                value={formData.bio}
                onChange={(value) => handleFieldChange('bio', value)}
                error={fieldErrors.bio || validationErrors.bio}
                helpText={`${formData.bio.length}/500 characters`}
              />
              
              <ComprehensiveFormField
                id="email"
                label="University Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleFieldChange('email', value)}
                error={fieldErrors.email || validationErrors.email}
                required
                campusOptimized
                icon={Mail}
                helpText="Your official @buffalo.edu email address"
              />
              
              <ComprehensiveFormField
                id="phone"
                label="Phone Number"
                type="tel"
                value={formData.phone || ''}
                onChange={(value) => handleFieldChange('phone', value)}
                error={fieldErrors.phone || validationErrors.phone}
                icon={Phone}
                helpText="Optional: For campus notifications and coordination"
              />
              
              <ComprehensiveFormField
                id="website"
                label="Personal Website"
                type="url"
                value={formData.website || ''}
                onChange={(value) => handleFieldChange('website', value)}
                error={fieldErrors.website || validationErrors.website}
                icon={Globe}
                helpText="Optional: Portfolio, GitHub, or personal site"
              />
            </div>
          );
          
        case 'campus':
          return (
            <div className="space-y-6">
              <ComprehensiveFormField
                id="major"
                label="Major"
                type="text"
                value={formData.major}
                onChange={(value) => handleFieldChange('major', value)}
                error={fieldErrors.major || validationErrors.major}
                required
                campusOptimized
                icon={GraduationCap}
                helpText="Your primary area of study"
              />
              
              <ComprehensiveFormField
                id="graduationYear"
                label="Graduation Year"
                type="number"
                value={formData.graduationYear.toString()}
                onChange={(value) => handleFieldChange('graduationYear', parseInt(value) || new Date().getFullYear())}
                required
                campusOptimized
                icon={Calendar}
                helpText="Expected graduation year"
              />
              
              <ComprehensiveFormField
                id="dorm"
                label="Residence Hall"
                type="text"
                value={formData.dorm || ''}
                onChange={(value) => handleFieldChange('dorm', value)}
                icon={MapPin}
                helpText="Optional: For campus community building"
              />
              
              <ComprehensiveFormField
                id="roomNumber"
                label="Room Number"
                type="text"
                value={formData.roomNumber || ''}
                onChange={(value) => handleFieldChange('roomNumber', value)}
                helpText="Optional: For floor/building connections"
              />
            </div>
          );
          
        case 'privacy':
          return (
            <div className="space-y-6">
              {/* Profile Visibility */}
              <div>
                <label className="block font-medium text-[var(--hive-text-primary)] mb-3">
                  Profile Visibility
                </label>
                <div className="space-y-3">
                  {privacyLevels.map(level => {
                    const IconComponent = level.icon;
                    return (
                      <label
                        key={level.value}
                        className={cn(
                          'flex items-start gap-3 p-4 rounded-lg border cursor-pointer',
                          'hover:bg-[var(--hive-bg-subtle)]',
                          'transition-colors',
                          formData.profileVisibility === level.value
                            ? 'border-[var(--hive-gold-primary)] bg-[var(--hive-gold-background)]'
                            : 'border-[var(--hive-border-subtle)]'
                        )}
                      >
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={level.value}
                          checked={formData.profileVisibility === level.value}
                          onChange={(e) => handleFieldChange('profileVisibility', e.target.value)}
                          className="mt-1"
                        />
                        <IconComponent className={cn(
                          iconComposition.sizes.base.className,
                          'text-[var(--hive-text-secondary)] mt-0.5'
                        )} />
                        <div className="flex-1">
                          <div className="font-medium text-[var(--hive-text-primary)]">
                            {level.label}
                          </div>
                          <div className="text-sm text-[var(--hive-text-secondary)]">
                            {level.description}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
              
              {/* Contact Info Visibility */}
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Contact Information</h4>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.showEmail}
                    onChange={(e) => handleFieldChange('showEmail', e.target.checked)}
                  />
                  <span>Show email address on profile</span>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.showPhone}
                    onChange={(e) => handleFieldChange('showPhone', e.target.checked)}
                  />
                  <span>Show phone number to connections</span>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.showDorm}
                    onChange={(e) => handleFieldChange('showDorm', e.target.checked)}
                  />
                  <span>Show residence hall for campus connections</span>
                </label>
              </div>
              
              {/* Ghost Mode */}
              <div className="p-4 rounded-lg border border-[var(--hive-warning-border)] bg-[var(--hive-warning-background)]">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.ghostMode}
                    onChange={(e) => handleFieldChange('ghostMode', e.target.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {formData.ghostMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span className="font-medium">Ghost Mode</span>
                    </div>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Hide your online status and reduce your visibility in campus discovery features
                    </p>
                  </div>
                </label>
              </div>
            </div>
          );
          
        case 'notifications':
          return (
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Email Notifications</h4>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => handleFieldChange('emailNotifications', e.target.checked)}
                  />
                  <div>
                    <span className="font-medium">Email notifications</span>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Receive important updates via email
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.weeklyDigest}
                    onChange={(e) => handleFieldChange('weeklyDigest', e.target.checked)}
                  />
                  <div>
                    <span className="font-medium">Weekly digest</span>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Summary of your campus activity and opportunities
                    </p>
                  </div>
                </label>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Platform Notifications</h4>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.spacesNotifications}
                    onChange={(e) => handleFieldChange('spacesNotifications', e.target.checked)}
                  />
                  <span>Space activity and invitations</span>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.toolsNotifications}
                    onChange={(e) => handleFieldChange('toolsNotifications', e.target.checked)}
                  />
                  <span>Tool updates and collaboration requests</span>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.eventsNotifications}
                    onChange={(e) => handleFieldChange('eventsNotifications', e.target.checked)}
                  />
                  <span>Campus events and calendar reminders</span>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.connectionRequests}
                    onChange={(e) => handleFieldChange('connectionRequests', e.target.checked)}
                  />
                  <span>Connection requests and messages</span>
                </label>
              </div>
            </div>
          );
          
        case 'advanced':
          return (
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Campus Integration</h4>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.enableCalendarSync}
                    onChange={(e) => handleFieldChange('enableCalendarSync', e.target.checked)}
                  />
                  <div>
                    <span className="font-medium">Calendar sync</span>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Sync with your UB calendar and class schedule
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.enableLocationSharing}
                    onChange={(e) => handleFieldChange('enableLocationSharing', e.target.checked)}
                  />
                  <div>
                    <span className="font-medium">Location sharing</span>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Show your campus location to help with coordination
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.enableMutualConnections}
                    onChange={(e) => handleFieldChange('enableMutualConnections', e.target.checked)}
                  />
                  <div>
                    <span className="font-medium">Mutual connections</span>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Show mutual connections to help discover classmates
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.enableActivityTracking}
                    onChange={(e) => handleFieldChange('enableActivityTracking', e.target.checked)}
                  />
                  <div>
                    <span className="font-medium">Activity tracking</span>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Track your campus engagement for personalized insights
                    </p>
                  </div>
                </label>
              </div>
              
              {/* Danger Zone */}
              <div className="p-4 rounded-lg border border-[var(--hive-error-border)] bg-[var(--hive-error-background)]">
                <h4 className="font-medium text-[var(--hive-error-primary)] mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Danger Zone
                </h4>
                <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
                  These actions cannot be undone. Please be careful.
                </p>
                <button
                  onClick={onDeleteAccount}
                  className={cn(
                    'px-4 py-2 rounded-md',
                    'bg-[var(--hive-error-primary)]',
                    'text-[var(--hive-bg-primary)]',
                    'font-medium text-sm',
                    'hover:opacity-90',
                    'transition-opacity'
                  )}
                >
                  Delete Account
                </button>
              </div>
            </div>
          );
          
        default:
          return null;
      }
    };
    
    return (
      <div ref={ref} className={cn('max-w-4xl mx-auto', className)}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <NavigationMenu
              items={settingsSections}
              activeId={activeSection}
              variant="sidebar"
              orientation="vertical"
              layout="sidebar"
              size="base"
              campusOptimized
              onItemClick={(item) => setActiveSection(item.id)}
              className="sticky top-6"
            />
          </div>
          
          {/* Settings Content */}
          <div className="lg:col-span-3">
            <ComprehensiveCard
              variant="primary"
              size="comfortable"
              campusOptimized
            >
              <div className="space-y-6">
                {/* Section Header */}
                <div className="border-b border-[var(--hive-border-subtle)] pb-4">
                  <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                    {settingsSections.find(s => s.id === activeSection)?.label}
                  </h2>
                </div>
                
                {/* Section Content */}
                {renderSectionContent()}
                
                {/* Save Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-[var(--hive-border-subtle)]">
                  <div className="flex items-center gap-2">
                    {saveSuccess && (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[var(--hive-success-primary)]" />
                        <span className="text-sm text-[var(--hive-success-primary)]">
                          Settings saved successfully
                        </span>
                      </>
                    )}
                    
                    {saveError && (
                      <>
                        <AlertCircle className="w-4 h-4 text-[var(--hive-error-primary)]" />
                        <span className="text-sm text-[var(--hive-error-primary)]">
                          {saveError}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {hasChanges && (
                      <span className="text-sm text-[var(--hive-text-secondary)]">
                        You have unsaved changes
                      </span>
                    )}
                    
                    <button
                      onClick={handleSave}
                      disabled={!hasChanges || isSaving || Object.keys(fieldErrors).some(key => fieldErrors[key as keyof ProfileFormData])}
                      className={cn(
                        'flex items-center gap-2 px-6 py-2 rounded-lg',
                        'font-medium',
                        'bg-[var(--hive-gold-primary)]',
                        'text-[var(--hive-bg-primary)]',
                        'hover:opacity-90',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        'transition-opacity'
                      )}
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </ComprehensiveCard>
          </div>
        </div>
      </div>
    );
  }
);

EnhancedProfileSettings.displayName = 'EnhancedProfileSettings';

export type { EnhancedProfileSettingsProps, ProfileFormData };
export { validationRules, validateField, privacyLevels };