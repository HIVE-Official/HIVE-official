import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveForm, HiveInput, HiveSelect, HiveButton } from '../../components';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';

const meta: Meta = {
  title: '15-Examples/Form System Patterns',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Comprehensive form patterns for the HIVE ecosystem**

Complete form system showcasing HIVE's approach to data collection, validation, and user input. Optimized for Builder workflows, Space creation, and campus-specific forms.

## Form Design Principles
- **Builder-Centric**: Forms designed for creative workflows and tool composition
- **Campus Context**: University-specific form patterns and validation
- **Infrastructure Feel**: Matte obsidian glass with premium form experience
- **Magnetic Interactions**: Form elements snap and flow with liquid metal physics

## Form Types
- **Tool Creation**: Building and configuring tools in HiveLAB
- **Space Setup**: Creating and customizing Spaces
- **Profile Forms**: User onboarding and preference setting
- **Content Forms**: Posts, comments, and community content

## Validation Strategy
- **Real-time feedback** with liquid metal motion
- **Campus-aware validation** (email domains, university data)
- **Builder workflow optimization** with smart defaults
- **Accessibility-first error messaging**

## Accessibility
- WCAG 2.1 AA compliant form structure
- Screen reader friendly labels and descriptions
- Keyboard navigation between form elements
- Clear error messaging and recovery paths
        `
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ToolCreationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      category: '',
      visibility: 'public',
      allowForking: true,
      tags: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        console.log('Tool created:', formData);
      }, 2000);
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-hive-foreground mb-2">Create New Tool</h2>
          <p className="text-hive-foreground-muted">Build a tool to share with your Space and the HIVE community.</p>
        </div>

        <HiveForm onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tool-name">Tool Name *</Label>
              <HiveInput
                id="tool-name"
                placeholder="e.g., Study Timer Pro"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <p className="text-xs text-hive-foreground-muted">Choose a clear, descriptive name</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tool-category">Category *</Label>
              <HiveSelect
                id="tool-category"
                placeholder="Select category..."
                options={[
                  { value: 'productivity', label: 'Productivity' },
                  { value: 'study', label: 'Study Tools' },
                  { value: 'social', label: 'Social' },
                  { value: 'utilities', label: 'Utilities' },
                  { value: 'entertainment', label: 'Entertainment' }
                ]}
                value={formData.category}
                onChange={(value) => setFormData({...formData, category: value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tool-description">Description *</Label>
            <Textarea
              id="tool-description"
              placeholder="Describe what your tool does and how students can use it..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <p className="text-xs text-hive-foreground-muted">
              Help other students understand the value of your tool (200-500 characters recommended)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Visibility</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="public"
                    name="visibility"
                    value="public"
                    checked={formData.visibility === 'public'}
                    onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                    className="text-hive-accent focus:ring-hive-accent"
                  />
                  <Label htmlFor="public" className="text-sm font-normal">
                    Public - Anyone can discover and use
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="space-only"
                    name="visibility"
                    value="space"
                    checked={formData.visibility === 'space'}
                    onChange={(e) => setFormData({...formData, visibility: e.target.value})}
                    className="text-hive-accent focus:ring-hive-accent"
                  />
                  <Label htmlFor="space-only" className="text-sm font-normal">
                    Space Only - Visible to Space members
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Permissions</Label>
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-forking" className="text-sm font-normal">
                  Allow other Builders to fork this tool
                </Label>
                <Switch
                  id="allow-forking"
                  checked={formData.allowForking}
                  onCheckedChange={(checked) => setFormData({...formData, allowForking: checked})}
                />
              </div>
              <p className="text-xs text-hive-foreground-muted">
                Forking helps the community build on your work
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <HiveButton variant="outline" type="button">
              Save as Draft
            </HiveButton>
            <HiveButton type="submit" loading={isSubmitting}>
              {isSubmitting ? 'Creating Tool...' : 'Create Tool'}
            </HiveButton>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const SpaceActivationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      university: '',
      spaceName: '',
      spaceType: '',
      description: '',
      welcomeMessage: '',
      isPrivate: false,
      requireApproval: true
    });

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-hive-foreground mb-2">Activate New Space</h2>
          <p className="text-hive-foreground-muted">Create a community space for your university or department.</p>
        </div>

        <HiveForm className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="university">University *</Label>
            <HiveSelect
              id="university"
              placeholder="Search for your university..."
              searchable
              options={[
                { value: 'stanford', label: 'Stanford University' },
                { value: 'berkeley', label: 'UC Berkeley' },
                { value: 'mit', label: 'MIT' },
                { value: 'harvard', label: 'Harvard University' }
              ]}
              value={formData.university}
              onChange={(value) => setFormData({...formData, university: value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="space-name">Space Name *</Label>
              <HiveInput
                id="space-name"
                placeholder="e.g., Computer Science"
                value={formData.spaceName}
                onChange={(e) => setFormData({...formData, spaceName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="space-type">Space Type *</Label>
              <HiveSelect
                id="space-type"
                placeholder="Select type..."
                options={[
                  { value: 'department', label: 'Academic Department' },
                  { value: 'course', label: 'Course/Class' },
                  { value: 'club', label: 'Student Organization' },
                  { value: 'project', label: 'Project Team' },
                  { value: 'general', label: 'General Interest' }
                ]}
                value={formData.spaceType}
                onChange={(value) => setFormData({...formData, spaceType: value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="space-description">Space Description *</Label>
            <Textarea
              id="space-description"
              placeholder="Describe the purpose and community of this Space..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcome-message">Welcome Message</Label>
            <Textarea
              id="welcome-message"
              placeholder="Welcome new members with a custom message..."
              rows={2}
              value={formData.welcomeMessage}
              onChange={(e) => setFormData({...formData, welcomeMessage: e.target.value})}
            />
            <p className="text-xs text-hive-foreground-muted">
              This message will be shown to new members when they join
            </p>
          </div>

          <div className="space-y-4">
            <Label>Space Settings</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="private-space" className="text-sm font-normal">Private Space</Label>
                  <p className="text-xs text-hive-foreground-muted">Only invited members can join</p>
                </div>
                <Switch
                  id="private-space"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) => setFormData({...formData, isPrivate: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-approval" className="text-sm font-normal">Require Approval</Label>
                  <p className="text-xs text-hive-foreground-muted">Review join requests before approval</p>
                </div>
                <Switch
                  id="require-approval"
                  checked={formData.requireApproval}
                  onCheckedChange={(checked) => setFormData({...formData, requireApproval: checked})}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <HiveButton variant="outline" type="button">
              Preview Space
            </HiveButton>
            <HiveButton type="submit">
              Activate Space
            </HiveButton>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const ProfileOnboardingForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      university: '',
      major: '',
      graduationYear: '',
      interests: [],
      bio: '',
      isBuilder: false
    });

    const totalSteps = 3;

    const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps));
    const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

    return (
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-hive-foreground">Complete Your Profile</h2>
            <span className="text-sm text-hive-foreground-muted">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-hive-background-muted rounded-full h-2">
            <div 
              className="bg-hive-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <HiveForm className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-hive-foreground mb-2">Basic Information</h3>
                <p className="text-hive-foreground-muted">Let's start with the basics</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name *</Label>
                  <HiveInput
                    id="first-name"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name *</Label>
                  <HiveInput
                    id="last-name"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University *</Label>
                <HiveSelect
                  id="university"
                  placeholder="Search for your university..."
                  searchable
                  options={[
                    { value: 'stanford', label: 'Stanford University' },
                    { value: 'berkeley', label: 'UC Berkeley' },
                    { value: 'mit', label: 'MIT' }
                  ]}
                  value={formData.university}
                  onChange={(value) => setFormData({...formData, university: value})}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-hive-foreground mb-2">Academic Details</h3>
                <p className="text-hive-foreground-muted">Help us customize your HIVE experience</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Major/Field of Study *</Label>
                <HiveSelect
                  id="major"
                  placeholder="Select your major..."
                  searchable
                  options={[
                    { value: 'cs', label: 'Computer Science' },
                    { value: 'engineering', label: 'Engineering' },
                    { value: 'business', label: 'Business' },
                    { value: 'psychology', label: 'Psychology' }
                  ]}
                  value={formData.major}
                  onChange={(value) => setFormData({...formData, major: value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduation-year">Expected Graduation *</Label>
                <HiveSelect
                  id="graduation-year"
                  placeholder="Select year..."
                  options={[
                    { value: '2024', label: '2024' },
                    { value: '2025', label: '2025' },
                    { value: '2026', label: '2026' },
                    { value: '2027', label: '2027' },
                    { value: '2028', label: '2028' }
                  ]}
                  value={formData.graduationYear}
                  onChange={(value) => setFormData({...formData, graduationYear: value})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="is-builder" className="text-sm font-medium">I want to become a Builder</Label>
                  <p className="text-xs text-hive-foreground-muted">
                    Get early access to HiveLAB and tool creation features
                  </p>
                </div>
                <Switch
                  id="is-builder"
                  checked={formData.isBuilder}
                  onCheckedChange={(checked) => setFormData({...formData, isBuilder: checked})}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-hive-foreground mb-2">Personalize Your Profile</h3>
                <p className="text-hive-foreground-muted">Help your community get to know you</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio (Optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a bit about yourself, your interests, or what you're working on..."
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
                <p className="text-xs text-hive-foreground-muted">
                  This will be visible on your profile and help others connect with you
                </p>
              </div>

              <div className="space-y-2">
                <Label>Interests (Optional)</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {['AI/ML', 'Web Dev', 'Mobile', 'Data Science', 'Cybersecurity', 'Game Dev', 'Startups', 'Research'].map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-hive-accent focus:ring-hive-accent"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, interests: [...formData.interests, interest]});
                          } else {
                            setFormData({...formData, interests: formData.interests.filter(i => i !== interest)});
                          }
                        }}
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <HiveButton
              variant="outline"
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </HiveButton>
            <HiveButton
              type="button"
              onClick={currentStep === totalSteps ? () => console.log('Complete!') : nextStep}
            >
              {currentStep === totalSteps ? 'Complete Profile' : 'Next'}
            </HiveButton>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const ValidationShowcase: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      username: ''
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validateField = (field: string, value: string) => {
      switch (field) {
        case 'email':
          if (!value) return 'Email is required';
          if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
          if (!value.endsWith('.edu')) return 'Please use your university email (.edu)';
          return '';
        case 'password':
          if (!value) return 'Password is required';
          if (value.length < 8) return 'Password must be at least 8 characters';
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return 'Password must contain uppercase, lowercase, and number';
          }
          return '';
        case 'confirmPassword':
          if (!value) return 'Please confirm your password';
          if (value !== formData.password) return 'Passwords do not match';
          return '';
        case 'username':
          if (!value) return 'Username is required';
          if (value.length < 3) return 'Username must be at least 3 characters';
          if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
          return '';
        default:
          return '';
      }
    };

    const handleFieldChange = (field: string, value: string) => {
      setFormData({...formData, [field]: value});
      
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors({...errors, [field]: error});
      }
    };

    const handleBlur = (field: string) => {
      setTouched({...touched, [field]: true});
      const error = validateField(field, formData[field]);
      setErrors({...errors, [field]: error});
    };

    return (
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-hive-foreground mb-2">Validation Examples</h2>
          <p className="text-hive-foreground-muted">Real-time validation with HIVE styling</p>
        </div>

        <HiveForm className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">University Email *</Label>
            <HiveInput
              id="email"
              type="email"
              placeholder="jane.doe@stanford.edu"
              value={formData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              error={errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <HiveInput
              id="username"
              placeholder="jane_doe_cs"
              value={formData.username}
              onChange={(e) => handleFieldChange('username', e.target.value)}
              onBlur={() => handleBlur('username')}
              error={errors.username}
            />
            {errors.username && (
              <p className="text-xs text-destructive">{errors.username}</p>
            )}
            {!errors.username && formData.username && touched.username && (
              <p className="text-xs text-green-600">✓ Username is available</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <HiveInput
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              error={errors.password}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password *</Label>
            <HiveInput
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          <HiveButton type="submit" className="w-full">
            Create Account
          </HiveButton>
        </HiveForm>
      </div>
    );
  }
};