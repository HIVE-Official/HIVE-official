import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveForm, 
  HiveFormInput, 
  HiveFormTextarea, 
  validationRules,
  ValidationRule 
} from '../../components/hive-form';
import { HiveButton } from '../../components/hive-button';
import { 
  User, 
  Mail, 
  Lock, 
  Building, 
  FileText, 
  Phone, 
  GraduationCap,
  MapPin,
  Calendar,
  Code,
  Star,
  Briefcase
} from 'lucide-react';

const meta: Meta<typeof HiveForm> = {
  title: '04-HIVE/Form System',
  component: HiveForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Form System with advanced validation, real-time feedback, and liquid metal motion. Features context-based form state management with elegant error handling and campus-specific validation patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    validationMode: {
      control: 'select',
      options: ['onChange', 'onBlur', 'onSubmit'],
      description: 'When validation should trigger'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicForm: Story = {
  render: () => {
    const handleSubmit = async (values: Record<string, any>) => {
      console.log('Form submitted:', values);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    };

    return (
      <div className="w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Create Account</h3>
          <p className="text-[var(--hive-text-secondary)]">Join the HIVE community</p>
        </div>
        
        <HiveForm
          onSubmit={handleSubmit}
          initialValues={{ name: '', email: '' }}
          validationMode="onBlur"
        >
          <HiveFormInput
            name="name"
            label="Full Name"
            placeholder="Enter your full name"
            rules={[
              validationRules.required(),
              validationRules.minLength(2, 'Name must be at least 2 characters')
            ]}
          />
          
          <HiveFormInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="your.email@university.edu"
            rules={[
              validationRules.required(),
              validationRules.email(),
              validationRules.pattern(
                /\.edu$/,
                'Must be a valid .edu email address'
              )
            ]}
          />
          
          <div className="pt-4">
            <HiveButton type="submit" variant="premium" className="w-full">
              Create Account
            </HiveButton>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const ValidationShowcase: Story = {
  render: () => {
    const handleSubmit = async (values: Record<string, any>) => {
      console.log('Validation form submitted:', values);
    };

    return (
      <div className="w-full max-w-lg p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Validation</h3>
          <p className="text-[var(--hive-text-secondary)]">Real-time validation with custom rules</p>
        </div>
        
        <HiveForm
          onSubmit={handleSubmit}
          initialValues={{}}
          validationMode="onChange"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HiveFormInput
              name="username"
              label="Username"
              placeholder="Choose a unique username"
              description="3-20 characters, letters, numbers, and underscores only"
              variant="premium"
              rules={[
                validationRules.required(),
                validationRules.minLength(3),
                validationRules.maxLength(20),
                validationRules.pattern(
                  /^[a-zA-Z0-9_]+$/,
                  'Only letters, numbers, and underscores allowed'
                )
              ]}
            />
            
            <HiveFormInput
              name="studentId"
              label="Student ID"
              placeholder="12345678"
              description="8-digit student identification number"
              variant="premium"
              rules={[
                validationRules.required(),
                validationRules.pattern(
                  /^\d{8}$/,
                  'Must be exactly 8 digits'
                )
              ]}
            />
          </div>
          
          <HiveFormInput
            name="email"
            type="email"
            label="University Email"
            placeholder="username@university.edu"
            description="Must use your official university email"
            variant="premium"
            rules={[
              validationRules.required(),
              validationRules.email(),
              validationRules.pattern(
                /\.(edu|ac\.uk|edu\.au)$/,
                'Must be a valid academic email (.edu, .ac.uk, .edu.au)'
              )
            ]}
          />
          
          <HiveFormInput
            name="password"
            type="password"
            label="Password"
            placeholder="Create a secure password"
            description="At least 8 characters with uppercase, lowercase, and number"
            variant="premium"
            showPasswordToggle={true}
            rules={[
              validationRules.required(),
              validationRules.minLength(8),
              validationRules.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Must contain uppercase, lowercase, and number'
              )
            ]}
          />
          
          <HiveFormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            variant="premium"
            showPasswordToggle={true}
            rules={[
              validationRules.required(),
              validationRules.custom(
                (value, formValues) => value === formValues?.password,
                'Passwords must match'
              )
            ]}
          />
          
          <div className="pt-4">
            <HiveButton type="submit" variant="premium" className="w-full">
              Validate & Submit
            </HiveButton>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const CampusProfileForm: Story = {
  render: () => {
    const handleSubmit = async (values: Record<string, any>) => {
      console.log('Profile submitted:', values);
      await new Promise(resolve => setTimeout(resolve, 1500));
    };

    return (
      <div className="w-full max-w-2xl p-8 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white mb-2">Campus Profile Setup</h3>
          <p className="text-[var(--hive-text-secondary)]">Complete your HIVE campus profile</p>
        </div>
        
        <HiveForm
          onSubmit={handleSubmit}
          initialValues={{
            major: 'Computer Science',
            year: 'junior',
            campus: 'main'
          }}
          validationMode="onBlur"
        >
          <div className="space-y-8">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-yellow-400" />
                Personal Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HiveFormInput
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  variant="premium"
                  rules={[
                    validationRules.required(),
                    validationRules.minLength(2)
                  ]}
                />
                
                <HiveFormInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  variant="premium"
                  rules={[
                    validationRules.required(),
                    validationRules.minLength(2)
                  ]}
                />
              </div>
              
              <HiveFormInput
                name="displayName"
                label="Display Name"
                placeholder="How you'd like to appear to others"
                description="This is how other students will see you in HIVE"
                variant="premium"
                rules={[
                  validationRules.required(),
                  validationRules.minLength(2),
                  validationRules.maxLength(50)
                ]}
              />
            </div>
            
            {/* Academic Information */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-yellow-400" />
                Academic Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HiveFormInput
                  name="major"
                  label="Major"
                  placeholder="Computer Science"
                  variant="premium"
                  rules={[validationRules.required()]}
                />
                
                <HiveFormInput
                  name="year"
                  label="Academic Year"
                  placeholder="Junior"
                  variant="premium"
                  rules={[validationRules.required()]}
                />
                
                <HiveFormInput
                  name="gpa"
                  label="GPA (Optional)"
                  placeholder="3.75"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  variant="premium"
                  rules={[
                    validationRules.pattern(
                      /^([0-3](\.\d{1,2})?|4(\.0{1,2})?)$/,
                      'GPA must be between 0.00 and 4.00'
                    )
                  ]}
                />
              </div>
              
              <HiveFormInput
                name="department"
                label="Department/School"
                placeholder="School of Engineering"
                description="Which department or school within your university"
                variant="premium"
                rules={[validationRules.required()]}
              />
            </div>
            
            {/* Contact & Location */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                Contact & Location
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HiveFormInput
                  name="phone"
                  label="Phone Number (Optional)"
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  variant="premium"
                  rules={[
                    validationRules.pattern(
                      /^\+?[\d\s\-\(\)]{10,}$/,
                      'Please enter a valid phone number'
                    )
                  ]}
                />
                
                <HiveFormInput
                  name="campus"
                  label="Campus Location"
                  placeholder="Main Campus"
                  variant="premium"
                  rules={[validationRules.required()]}
                />
              </div>
              
              <HiveFormInput
                name="dormRoom"
                label="Dorm/Residence (Optional)"
                placeholder="Smith Hall, Room 302"
                description="Help other students find you on campus"
                variant="premium"
              />
            </div>
            
            {/* Bio */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                About You
              </h4>
              
              <HiveFormTextarea
                name="bio"
                label="Bio"
                placeholder="Tell other students about yourself, your interests, what you're working on..."
                description="Share your academic interests, hobbies, or what makes you unique"
                variant="premium"
                rows={4}
                rules={[
                  validationRules.maxLength(500, 'Bio must be under 500 characters')
                ]}
              />
              
              <HiveFormInput
                name="website"
                label="Personal Website/Portfolio (Optional)"
                placeholder="https://your-portfolio.com"
                description="Share your personal website, GitHub, or portfolio"
                variant="premium"
                rules={[
                  validationRules.pattern(
                    /^https?:\/\/.+/,
                    'Must be a valid URL starting with http:// or https://'
                  )
                ]}
              />
            </div>
            
            {/* Skills & Interests */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Skills & Interests
              </h4>
              
              <HiveFormTextarea
                name="skills"
                label="Skills & Technologies"
                placeholder="JavaScript, Python, React, Machine Learning, Data Analysis..."
                description="List your technical skills, programming languages, tools, etc."
                variant="premium"
                rows={2}
                rules={[
                  validationRules.maxLength(300, 'Skills must be under 300 characters')
                ]}
              />
              
              <HiveFormTextarea
                name="interests"
                label="Academic Interests"
                placeholder="Artificial Intelligence, Robotics, Sustainable Energy, Startups..."
                description="What academic topics or research areas interest you?"
                variant="premium"
                rows={2}
                rules={[
                  validationRules.maxLength(300, 'Interests must be under 300 characters')
                ]}
              />
            </div>
          </div>
          
          <div className="pt-8 border-t border-[var(--hive-border-subtle)]">
            <div className="flex space-x-4">
              <HiveButton type="submit" variant="premium" className="flex-1">
                Save Campus Profile
              </HiveButton>
              <HiveButton type="button" variant="outline">
                Save as Draft
              </HiveButton>
            </div>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const AsyncValidationDemo: Story = {
  render: () => {
    // Simulate async validation (e.g., checking username availability)
    const checkUsernameAvailability = async (username: string): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return !['admin', 'user', 'test', 'demo'].includes(username.toLowerCase());
    };

    const handleSubmit = async (values: Record<string, any>) => {
      console.log('Async form submitted:', values);
    };

    return (
      <div className="w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">Async Validation</h3>
          <p className="text-[var(--hive-text-secondary)]">Real-time availability checking</p>
        </div>
        
        <HiveForm
          onSubmit={handleSubmit}
          initialValues={{}}
          validationMode="onChange"
        >
          <HiveFormInput
            name="username"
            label="Username"
            placeholder="Choose a unique username"
            description="We'll check if this username is available"
            variant="premium"
            rules={[
              validationRules.required(),
              validationRules.minLength(3),
              validationRules.pattern(
                /^[a-zA-Z0-9_]+$/,
                'Only letters, numbers, and underscores'
              ),
              validationRules.custom(
                checkUsernameAvailability,
                'Username is already taken'
              )
            ]}
          />
          
          <HiveFormInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="your@email.com"
            variant="premium"
            rules={[
              validationRules.required(),
              validationRules.email()
            ]}
          />
          
          <HiveFormInput
            name="inviteCode"
            label="Invite Code"
            placeholder="Enter your invite code"
            description="Check with your administrator for the code"
            variant="premium"
            rules={[
              validationRules.required(),
              validationRules.custom(
                async (code: string) => {
                  await new Promise(resolve => setTimeout(resolve, 800));
                  return code.toUpperCase() === 'HIVE2024';
                },
                'Invalid invite code'
              )
            ]}
          />
          
          <div className="pt-4">
            <HiveButton type="submit" variant="premium" className="w-full">
              Join HIVE
            </HiveButton>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const VariantShowcase: Story = {
  render: () => {
    const handleSubmit = async (values: Record<string, any>) => {
      console.log('Variant form submitted:', values);
    };

    return (
      <div className="space-y-8 p-8 bg-[var(--hive-background-primary)] rounded-2xl max-w-2xl">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-2">Form Variants</h3>
          <p className="text-[var(--hive-text-secondary)]">Different styling options for various contexts</p>
        </div>
        
        <HiveForm onSubmit={handleSubmit} initialValues={{}}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Default Variant */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Default</h4>
              
              <HiveFormInput
                name="defaultName"
                label="Full Name"
                placeholder="Standard styling"
                variant="default"
                rules={[validationRules.required()]}
              />
              
              <HiveFormInput
                name="defaultEmail"
                type="email"
                label="Email"
                placeholder="default@example.com"
                variant="default"
                rules={[validationRules.required(), validationRules.email()]}
              />
              
              <HiveFormTextarea
                name="defaultBio"
                label="Bio"
                placeholder="Default textarea styling"
                variant="default"
                rows={3}
              />
            </div>
            
            {/* Premium Variant */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Premium</h4>
              
              <HiveFormInput
                name="premiumName"
                label="Full Name"
                placeholder="Premium styling"
                variant="premium"
                rules={[validationRules.required()]}
              />
              
              <HiveFormInput
                name="premiumEmail"
                type="email"
                label="Email"
                placeholder="premium@example.com"
                variant="premium"
                rules={[validationRules.required(), validationRules.email()]}
              />
              
              <HiveFormTextarea
                name="premiumBio"
                label="Bio"
                placeholder="Premium textarea styling"
                variant="premium"
                rows={3}
              />
            </div>
            
            {/* Minimal Variant */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Minimal</h4>
              
              <HiveFormInput
                name="minimalName"
                label="Full Name"
                placeholder="Minimal styling"
                variant="minimal"
                rules={[validationRules.required()]}
              />
              
              <HiveFormInput
                name="minimalEmail"
                type="email"
                label="Email"
                placeholder="minimal@example.com"
                variant="minimal"
                rules={[validationRules.required(), validationRules.email()]}
              />
              
              <HiveFormTextarea
                name="minimalBio"
                label="Bio"
                placeholder="Minimal textarea styling"
                variant="minimal"
                rows={3}
              />
            </div>
          </div>
          
          <div className="pt-6 border-t border-[var(--hive-border-subtle)]">
            <HiveButton type="submit" variant="premium" className="w-full">
              Compare Variants
            </HiveButton>
          </div>
        </HiveForm>
      </div>
    );
  }
};

export const ToolBuilderForm: Story = {
  render: () => {
    const handleSubmit = async (values: Record<string, any>) => {
      console.log('Tool builder form:', values);
      await new Promise(resolve => setTimeout(resolve, 2000));
    };

    return (
      <div className="w-full max-w-3xl p-8 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white mb-2">HIVE Tool Builder</h3>
          <p className="text-[var(--hive-text-secondary)]">Create a custom tool for your campus community</p>
        </div>
        
        <HiveForm
          onSubmit={handleSubmit}
          initialValues={{
            category: 'academic',
            isPublic: true
          }}
          validationMode="onBlur"
        >
          <div className="space-y-8">
            {/* Basic Tool Info */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-yellow-400" />
                Tool Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HiveFormInput
                  name="toolName"
                  label="Tool Name"
                  placeholder="GPA Calculator Pro"
                  description="Choose a descriptive name for your tool"
                  variant="premium"
                  rules={[
                    validationRules.required(),
                    validationRules.minLength(3),
                    validationRules.maxLength(50)
                  ]}
                />
                
                <HiveFormInput
                  name="category"
                  label="Category"
                  placeholder="Academic Tools"
                  variant="premium"
                  rules={[validationRules.required()]}
                />
              </div>
              
              <HiveFormTextarea
                name="description"
                label="Description"
                placeholder="Describe what your tool does and how it helps students..."
                description="This will appear in search results and tool listings"
                variant="premium"
                rows={3}
                rules={[
                  validationRules.required(),
                  validationRules.minLength(20),
                  validationRules.maxLength(300)
                ]}
              />
              
              <HiveFormInput
                name="tags"
                label="Tags"
                placeholder="gpa, calculator, academic, grades"
                description="Comma-separated tags to help users discover your tool"
                variant="premium"
                rules={[
                  validationRules.pattern(
                    /^[a-zA-Z0-9\s,]+$/,
                    'Tags can only contain letters, numbers, spaces, and commas'
                  )
                ]}
              />
            </div>
            
            {/* Technical Specifications */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-yellow-400" />
                Technical Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HiveFormInput
                  name="version"
                  label="Version"
                  placeholder="1.0.0"
                  description="Semantic versioning (major.minor.patch)"
                  variant="premium"
                  rules={[
                    validationRules.required(),
                    validationRules.pattern(
                      /^\d+\.\d+\.\d+$/,
                      'Must follow semantic versioning (e.g., 1.0.0)'
                    )
                  ]}
                />
                
                <HiveFormInput
                  name="license"
                  label="License"
                  placeholder="MIT"
                  description="License type for your tool"
                  variant="premium"
                  rules={[validationRules.required()]}
                />
              </div>
              
              <HiveFormTextarea
                name="requirements"
                label="System Requirements"
                placeholder="Modern web browser, internet connection..."
                description="Any specific requirements for using your tool"
                variant="premium"
                rows={2}
              />
              
              <HiveFormInput
                name="repository"
                label="Source Code Repository (Optional)"
                placeholder="https://github.com/username/tool-name"
                description="Link to your tool's source code"
                variant="premium"
                rules={[
                  validationRules.pattern(
                    /^https?:\/\/.+/,
                    'Must be a valid URL'
                  )
                ]}
              />
            </div>
            
            {/* Usage & Documentation */}
            <div>
              <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                Usage & Documentation
              </h4>
              
              <HiveFormTextarea
                name="instructions"
                label="Usage Instructions"
                placeholder="1. Enter your course grades and credit hours\n2. Click calculate to see your GPA\n3. Use the 'What If' feature to predict future GPAs..."
                description="Step-by-step instructions for using your tool"
                variant="premium"
                rows={4}
                rules={[
                  validationRules.required(),
                  validationRules.minLength(50)
                ]}
              />
              
              <HiveFormTextarea
                name="examples"
                label="Examples & Use Cases"
                placeholder="Example: Calculate cumulative GPA for Computer Science major with 45 credit hours..."
                description="Provide examples of how your tool can be used"
                variant="premium"
                rows={3}
              />
              
              <HiveFormInput
                name="documentation"
                label="Documentation URL (Optional)"
                placeholder="https://docs.example.com/tool-guide"
                description="Link to detailed documentation"
                variant="premium"
                rules={[
                  validationRules.pattern(
                    /^https?:\/\/.+/,
                    'Must be a valid URL'
                  )
                ]}
              />
            </div>
          </div>
          
          <div className="pt-8 border-t border-[var(--hive-border-subtle)]">
            <div className="flex space-x-4">
              <HiveButton type="submit" variant="premium" className="flex-1">
                Create HIVE Tool
              </HiveButton>
              <HiveButton type="button" variant="outline">
                Save Draft
              </HiveButton>
            </div>
          </div>
        </HiveForm>
      </div>
    );
  }
};