import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import '../../hive-tokens.css';

const meta: Meta<typeof Label> = {
  title: '01-Atoms/Label - COMPLETE DEFINITION',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Label - Complete Component Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated form label system for University at Buffalo campus forms and data input interfaces.

### 🏆 **COMPONENT EXCELLENCE**
- **3 Visual Variants** - Default, inline, floating for different form layouts;
- **3 Size Options** - Small, medium, large for flexible typography integration;
- **Required Field Indicator** - Automatic asterisk display with proper accessibility;
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states;
- **Smart Accessibility** - Proper label association, ARIA attributes, screen reader support;
- **Campus Form Ready** - Optimized for UB academic and administrative form patterns;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo form labels and data input contexts:
- **Academic Forms** - Course registration, grade entry, academic records;
- **Student Services** - Housing applications, dining plans, activity registration;
- **Administrative Tools** - User management, system configuration, data entry;
- **Campus Information** - Event registration, survey forms, feedback collection;
- **Profile Management** - Student profiles, faculty information, contact details;
- **Mobile Forms** - Touch-friendly labels for mobile campus access;
### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Targets** - Appropriate label sizing for mobile interaction;
- **Clear Typography** - Readable text sizes across all device types;
- **Responsive Behavior** - Consistent appearance and functionality on mobile;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'Associates label with form element ID',
    },
    required: {
      control: 'boolean',
      description: 'Shows required field indicator',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Label text size',
    },
    variant: {
      control: 'select',
      options: ['default', 'inline', 'floating'],
      description: 'Label layout variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state appearance',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// Default label showcase;
export const Default: Story = {
  args: {
    htmlFor: 'example-input',
    required: false,
    size: 'md',
    variant: 'default',
    disabled: false,
    children: 'Student Email Address',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label {...args} />
            <input;
              id="example-input"
              type="email"
              className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
              placeholder="Enter your @buffalo.edu email"
            />
          </div>
          <Text variant="body-sm" color="secondary">
            Default label styling for University at Buffalo forms;
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎭 VARIANTS</Badge>
            Label Variants - Form Layout Options;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 visual variants for different form layouts and user interface patterns;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Standard Form Layout:</Text>
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    <div className="space-y-2">
                      <Label variant="default" htmlFor="student-id" required>Student ID</Label>
                      <input;
                        id="student-id"
                        type="text"
                        className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
                        placeholder="50123456"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label variant="default" htmlFor="student-name" required>Full Name</Label>
                      <input;
                        id="student-name"
                        type="text"
                        className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label variant="default" htmlFor="student-email" required>University Email</Label>
                      <input;
                        id="student-email"
                        type="email"
                        className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
                        placeholder="username@buffalo.edu"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label variant="default" htmlFor="student-major">Academic Major</Label>
                      <select;
                        id="student-major"
                        className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
                      >
                        <option value="">Select your major</option>
                        <option value="cse">Computer Science & Engineering</option>
                        <option value="me">Mechanical Engineering</option>
                        <option value="bio">Biological Sciences</option>
                        <option value="psych">Psychology</option>
                      </select>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Inline Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Compact Form Layout:</Text>
                  <div className="space-y-4">
                    
                    <div className="flex items-center gap-4">
                      <Label variant="inline" htmlFor="notification-email" required>Email Notifications</Label>
                      <input;
                        id="notification-email"
                        type="checkbox"
                        className="h-4 w-4 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)] border-[var(--hive-border-primary)] rounded"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <Label variant="inline" htmlFor="sms-alerts">SMS Alerts</Label>
                      <input;
                        id="sms-alerts"
                        type="checkbox"
                        className="h-4 w-4 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)] border-[var(--hive-border-primary)] rounded"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <Label variant="inline" htmlFor="marketing-consent">Marketing Communications</Label>
                      <input;
                        id="marketing-consent"
                        type="checkbox"
                        className="h-4 w-4 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)] border-[var(--hive-border-primary)] rounded"
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Floating Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Modern Floating Labels:</Text>
                  <div className="grid md:grid-cols-2 gap-6">
                    
                    <div className="relative">
                      <input;
                        id="floating-email"
                        type="email"
                        className="peer w-full px-3 pt-6 pb-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] placeholder-transparent focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
                        placeholder="Enter email"
                      />
                      <Label variant="floating" htmlFor="floating-email" required>Email Address</Label>
                    </div>

                    <div className="relative">
                      <input;
                        id="floating-phone"
                        type="tel"
                        className="peer w-full px-3 pt-6 pb-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] placeholder-transparent focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
                        placeholder="Enter phone"
                      />
                      <Label variant="floating" htmlFor="floating-phone">Phone Number</Label>
                    </div>

                    <div className="relative">
                      <textarea;
                        id="floating-message"
                        rows={3}
                        className="peer w-full px-3 pt-6 pb-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] placeholder-transparent focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent resize-none"
                        placeholder="Enter message"
                      />
                      <Label variant="floating" htmlFor="floating-message">Message</Label>
                    </div>

                    <div className="relative">
                      <input;
                        id="floating-graduation"
                        type="date"
                        className="peer w-full px-3 pt-6 pb-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] placeholder-transparent focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
                        placeholder="Select date"
                      />
                      <Label variant="floating" htmlFor="floating-graduation">Expected Graduation</Label>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Label Sizes - Typography Integration;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for seamless integration with different form contexts and typography scales;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Small (sm):</Text>
                    <div className="space-y-2">
                      <Label size="sm" htmlFor="small-input" required>Compact Form Field</Label>
                      <input;
                        id="small-input"
                        type="text"
                        className="w-full px-2 py-1 text-sm border border-[var(--hive-border-primary)] rounded bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-1 focus:ring-[var(--hive-brand-primary)]"
                        placeholder="Small input"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                    <div className="space-y-2">
                      <Label size="md" htmlFor="medium-input" required>Standard Form Field</Label>
                      <input;
                        id="medium-input"
                        type="text"
                        className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                        placeholder="Medium input"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                    <div className="space-y-2">
                      <Label size="lg" htmlFor="large-input" required>Prominent Form Field</Label>
                      <input;
                        id="large-input"
                        type="text"
                        className="w-full px-4 py-3 text-lg border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                        placeholder="Large input"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Required Field Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚠️ REQUIRED</Badge>
            Required Field Indicators - Form Validation;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Clear visual and accessible indicators for required form fields;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Required vs Optional Fields:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Required Fields:</Text>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="req-name" required>Full Name</Label>
                        <input;
                          id="req-name"
                          type="text"
                          className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="req-email" required>University Email</Label>
                        <input;
                          id="req-email"
                          type="email"
                          className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                          placeholder="username@buffalo.edu"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="req-major" required>Academic Major</Label>
                        <select;
                          id="req-major"
                          className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                        >
                          <option value="">Select your major</option>
                          <option value="cse">Computer Science & Engineering</option>
                          <option value="me">Mechanical Engineering</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Optional Fields:</Text>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="opt-nickname">Preferred Name</Label>
                        <input;
                          id="opt-nickname"
                          type="text"
                          className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                          placeholder="Optional nickname"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opt-phone">Phone Number</Label>
                        <input;
                          id="opt-phone"
                          type="tel"
                          className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                          placeholder="(xxx) xxx-xxxx"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opt-bio">Bio</Label>
                        <textarea;
                          id="opt-bio"
                          rows={3}
                          className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] resize-none"
                          placeholder="Optional bio"
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* States Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="warning">⚡ STATES</Badge>
            Label States - Form Context;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Different label states for various form contexts and user interactions;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Label States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Normal State:</Text>
                    <div className="space-y-2">
                      <Label htmlFor="normal-field" required>Student Information</Label>
                      <input;
                        id="normal-field"
                        type="text"
                        className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                        placeholder="Enter information"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Disabled State:</Text>
                    <div className="space-y-2">
                      <Label htmlFor="disabled-field" disabled required>Read-Only Field</Label>
                      <input;
                        id="disabled-field"
                        type="text"
                        disabled;
                        value="Pre-filled data"
                        className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] cursor-not-allowed"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Form Examples;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Label usage in actual University at Buffalo academic and administrative forms;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration Form */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration Form:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                Course Enrollment - Spring 2025
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-code" required>Course Code</Label>
                    <input;
                      id="course-code"
                      type="text"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                      placeholder="CSE 331"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section-number" required>Section Number</Label>
                    <select;
                      id="section-number"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                    >
                      <option value="">Select section</option>
                      <option value="A1">A1 - MW 2:00-3:20 PM</option>
                      <option value="A2">A2 - TR 9:30-10:50 AM</option>
                      <option value="B1">B1 - MWF 11:00-11:50 AM</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="enrollment-reason">Enrollment Reason</Label>
                    <select;
                      id="enrollment-reason"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                    >
                      <option value="">Select reason</option>
                      <option value="requirement">Major Requirement</option>
                      <option value="elective">Technical Elective</option>
                      <option value="interest">Personal Interest</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-level" required>Student Level</Label>
                    <select;
                      id="student-level"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                    >
                      <option value="">Select level</option>
                      <option value="freshman">Freshman</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credit-hours" required>Credit Hours</Label>
                    <input;
                      id="credit-hours"
                      type="number"
                      min="1"
                      max="6"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                      placeholder="4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special-notes">Special Accommodations</Label>
                    <textarea;
                      id="special-notes"
                      rows={3}
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] resize-none"
                      placeholder="Optional notes about accommodations needed"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Student Profile Form */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile Form:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                Update Student Profile;
              </Text>

              <div className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-student-id" required>Student ID</Label>
                    <input;
                      id="profile-student-id"
                      type="text"
                      disabled;
                      value="50123456"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-ub-email" required>University Email</Label>
                    <input;
                      id="profile-ub-email"
                      type="email"
                      disabled;
                      value="jsmith@buffalo.edu"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-first-name" required>First Name</Label>
                    <input;
                      id="profile-first-name"
                      type="text"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                      placeholder="John"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-last-name" required>Last Name</Label>
                    <input;
                      id="profile-last-name"
                      type="text"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-major" required>Academic Major</Label>
                    <select;
                      id="profile-major"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                    >
                      <option value="">Select your major</option>
                      <option value="cse">Computer Science & Engineering</option>
                      <option value="ee">Electrical Engineering</option>
                      <option value="me">Mechanical Engineering</option>
                      <option value="bio">Biological Sciences</option>
                      <option value="psych">Psychology</option>
                      <option value="business">Business Administration</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-graduation" required>Expected Graduation</Label>
                    <input;
                      id="profile-graduation"
                      type="date"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-bio">Academic Interests</Label>
                  <textarea;
                    id="profile-bio"
                    rows={4}
                    className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] resize-none"
                    placeholder="Describe your academic interests and career goals"
                  />
                </div>

              </div>

            </div>
          </div>

          {/* Event Registration Form */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Event Registration Form:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text as="h3" variant="heading-sm" color="primary">
                CS Department Career Fair Registration;
              </Text>

              <div className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-name" required>Full Name</Label>
                    <input;
                      id="event-name"
                      type="text"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-email" required>Contact Email</Label>
                    <input;
                      id="event-email"
                      type="email"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                      placeholder="username@buffalo.edu"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-year" required>Academic Year</Label>
                    <select;
                      id="event-year"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]"
                    >
                      <option value="">Select year</option>
                      <option value="freshman">Freshman</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate Student</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-resume">Resume Upload</Label>
                    <input;
                      id="event-resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[var(--hive-brand-primary)] file:text-white hover:file:bg-[var(--hive-brand-secondary)]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="event-companies">Companies of Interest</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input;
                        id="google"
                        type="checkbox"
                        className="h-4 w-4 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)] border-[var(--hive-border-primary)] rounded"
                      />
                      <Label variant="inline" htmlFor="google">Google</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input;
                        id="microsoft"
                        type="checkbox"
                        className="h-4 w-4 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)] border-[var(--hive-border-primary)] rounded"
                      />
                      <Label variant="inline" htmlFor="microsoft">Microsoft</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input;
                        id="meta"
                        type="checkbox"
                        className="h-4 w-4 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)] border-[var(--hive-border-primary)] rounded"
                      />
                      <Label variant="inline" htmlFor="meta">Meta</Label>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground;
export const Playground: Story = {
  args: {
    htmlFor: 'playground-input',
    required: true,
    size: 'md',
    variant: 'default',
    disabled: false,
    children: 'University Email',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Label Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different label configurations;
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label {...args} />
            <input;
              id="playground-input"
              type="email"
              className="w-full px-3 py-2 border border-[var(--hive-border-primary)] rounded-lg bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:border-transparent"
              placeholder="username@buffalo.edu"
            />
          </div>
          <Text variant="body-sm" color="secondary">
            Interactive label testing for University at Buffalo forms;
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};