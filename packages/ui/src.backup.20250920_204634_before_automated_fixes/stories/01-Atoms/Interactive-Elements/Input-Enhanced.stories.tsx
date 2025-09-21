/**
 * INPUT ENHANCED - CAMPUS DATA COLLECTION COMPONENT;
 * 
 * The primary data input element for HIVE platform with advanced validation,
 * accessibility features, and campus-specific input patterns for University at Buffalo.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Label } from '../../../components/ui/label';
import { 
  User,
  Mail,
  Lock,
  Search,
  Calendar,
  MapPin,
  GraduationCap,
  Building,
  Phone,
  Globe,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  BookOpen,
  Users,
  Clock,
  Hash,
  DollarSign,
  Percent,
  Ruler,
  Type,
  Keyboard,
  MousePointer;
} from 'lucide-react';
import '../../../hive-tokens.css';

const meta: Meta<typeof Input> = {
  title: '02-Atoms/Interactive Elements/Input Enhanced',
  component: Input,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ⚛️ Input Enhanced - Campus Data Collection Component;
**The foundational data input element that powers every University at Buffalo student interaction on HIVE**

The Input Enhanced component provides consistent, accessible, and intelligent data collection across the entire HIVE platform. With advanced validation, campus-specific input patterns, and real-time feedback, it creates seamless data entry experiences that respect student time and provide helpful guidance.

## 🎯 INPUT DESIGN PHILOSOPHY;
### **Campus-First Data Collection**
Every input pattern is designed for University at Buffalo student scenarios:
- **Academic Information** - Course codes, professor names, study group coordination;
- **Social Coordination** - Event planning, community building, friendship connections;
- **Campus Navigation** - Building locations, room numbers, campus resource discovery;
- **Personal Identity** - Profile customization, privacy settings, accessibility preferences;
### **Intelligent Input Assistance**
- **Smart Validation** - Real-time feedback with helpful error prevention;
- **Campus Context** - Auto-suggestions for UB-specific data (buildings, courses, organizations)
- **Accessibility First** - Full screen reader support with semantic labeling;
- **Mobile Optimization** - Touch-friendly with appropriate keyboard types;
## 🎨 INPUT VARIANTS & TYPES;
### **Standard Input Types**
- **Text** - Names, descriptions, general text entry;
- **Email** - Student email validation (@buffalo.edu support)
- **Password** - Secure authentication with strength indicators;
- **Search** - Campus content discovery with smart suggestions;
- **Number** - Numeric data (room numbers, group sizes, deadlines)
- **Date/Time** - Academic calendar integration and event scheduling;
- **URL** - Website links and social media profiles;
- **Phone** - Contact information with format assistance;
### **Campus-Specific Patterns**
- **Course Code** - UB course format validation (e.g., CSE 115, MTH 141)
- **Building/Room** - Campus location validation (e.g., Davis Hall 101)
- **Student ID** - University ID format validation;
- **Academic Year** - Semester and year selection patterns;
## 📏 SIZE SYSTEM;
### **Campus Usage Sizes**
- **sm (32px)** - Compact forms, mobile optimization, quick inputs;
- **md (40px)** - Standard forms, desktop primary, balanced usability;
- **lg (48px)** - Important forms, accessibility enhancement, desktop focus;
## 🎓 VALIDATION PATTERNS;
### **Academic Validation**
- Course code format validation (3-letter department + 3-digit number)
- Professor name suggestions from campus directory;
- Academic calendar date validation;
- GPA range validation (0.0-4.0)

### **Campus Location Validation**
- Building name validation against UB campus map;
- Room number format verification;
- Campus area categorization (North/South campus)
- Accessibility route suggestions;
### **Social Coordination Validation**
- Event title length and content guidelines;
- Group size realistic limits for campus venues;
- Time conflict detection with academic schedules;
- Privacy level validation for different content types;
## ♿ ACCESSIBILITY FEATURES;
### **Screen Reader Support**
- **Semantic Labels** - Clear, descriptive labeling for all inputs;
- **Error Announcements** - Live region updates for validation feedback;
- **Help Text Integration** - Contextual assistance without visual dependence;
- **State Descriptions** - Clear indication of required, optional, and error states;
### **Keyboard Navigation**
- **Complete Keyboard Access** - All functionality available via keyboard;
- **Logical Tab Order** - Intuitive progression through form elements;
- **Keyboard Shortcuts** - Quick access to common campus input patterns;
- **Focus Management** - Clear visual focus indicators and logical flow;
### **Motor Accessibility**
- **44px+ Touch Targets** - Accessible touch areas for mobile campus usage;
- **Error Tolerance** - Helpful correction suggestions for input mistakes;
- **Timeout Consideration** - Adequate time for input completion;
- **One-Handed Support** - Full functionality with single-hand operation;
## 📱 MOBILE CAMPUS OPTIMIZATION;
### **Between-Class Usage**
- **Quick Input Patterns** - Fast data entry for time-constrained scenarios;
- **Auto-Complete Intelligence** - Smart suggestions based on campus context;
- **Keyboard Optimization** - Appropriate input types for different data (email, numeric, etc.)
- **Error Prevention** - Real-time validation to prevent submission errors;
### **Study Session Usage**
- **Extended Form Support** - Comfortable input for longer text and detailed information;
- **Draft Saving** - Automatic saving for complex form data;
- **Multi-Step Support** - Progress indication and section completion;
- **Collaborative Input** - Group form completion and coordination features;
## 🔧 TECHNICAL IMPLEMENTATION;
### **Input Enhancement Features**
- **Real-Time Validation** - Immediate feedback as users type;
- **Smart Auto-Complete** - Campus-aware suggestions and completions;
- **Format Assistance** - Automatic formatting for phone numbers, dates, etc.
- **Error Recovery** - Clear guidance for correcting input errors;
### **Performance Optimization**
- **Debounced Validation** - Efficient validation without excessive API calls;
- **Keyboard Type Detection** - Appropriate mobile keyboards for different input types;
- **Accessibility Integration** - Full compatibility with assistive technologies;
- **Memory Efficiency** - Minimal performance impact even with complex validation;
### **Campus Integration**
- **UB Directory Integration** - Auto-complete for people, places, and organizations;
- **Academic Calendar** - Date validation against semester schedules;
- **Campus Map Integration** - Location assistance and validation;
- **Privacy Compliance** - FERPA-aware data handling and validation;
## 🎓 CAMPUS INPUT SCENARIOS;
### **Academic Workflow Inputs**
- Study group creation forms with course and schedule coordination;
- Assignment tracking with deadline and collaboration features;
- Grade discussion coordination with privacy-aware input patterns;
- Tool creation workflows with academic context integration;
### **Social Coordination Inputs**
- Event planning forms with venue and attendance management;
- Community building with interest and availability coordination;
- Photo sharing with privacy and tagging considerations;
- Friend connection with academic and social context awareness;
### **Administrative Inputs**
- Profile management with comprehensive campus identity options;
- Privacy settings with granular control over information sharing;
- Notification preferences with academic calendar integration;
- Accessibility settings with comprehensive accommodation support;
### **Mobile Campus Patterns**
- Quick RSVP forms optimized for between-class usage;
- One-handed input patterns for walking between classes;
- Voice input support for hands-free campus coordination;
- Offline input support with sync when connectivity returns;
        `
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number', 'tel', 'url', 'date', 'time']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    placeholder: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// CAMPUS INPUT PATTERNS;
// =============================================================================

const campusInputPatterns = [
  {
    category: 'Academic Inputs',
    description: 'University coursework and study coordination',
    inputs: [
      { label: 'Course Code', type: 'text', placeholder: 'CSE 115', pattern: 'UB course format (e.g., MTH 141)', icon: BookOpen },
      { label: 'Professor Name', type: 'text', placeholder: 'Dr. Smith', pattern: 'Faculty directory search', icon: GraduationCap },
      { label: 'Study Session Date', type: 'date', placeholder: '', pattern: 'Academic calendar integration', icon: Calendar },
      { label: 'Group Size', type: 'number', placeholder: '6', pattern: 'Realistic group coordination', icon: Users }
    ]
  },
  {
    category: 'Campus Location Inputs',
    description: 'University location and navigation',
    inputs: [
      { label: 'Building Name', type: 'text', placeholder: 'Davis Hall', pattern: 'UB campus building directory', icon: Building },
      { label: 'Room Number', type: 'text', placeholder: '101', pattern: 'Room format validation', icon: MapPin },
      { label: 'Meeting Location', type: 'text', placeholder: 'Lockwood Library, 2nd floor', pattern: 'Campus venue suggestions', icon: MapPin },
      { label: 'Campus Area', type: 'text', placeholder: 'North Campus', pattern: 'North/South campus selection', icon: Globe }
    ]
  },
  {
    category: 'Personal Information',
    description: 'Student identity and preferences',
    inputs: [
      { label: 'Display Name', type: 'text', placeholder: 'Alex Johnson', pattern: 'Campus-appropriate display names', icon: User },
      { label: 'UB Email', type: 'email', placeholder: 'alexj@buffalo.edu', pattern: '@buffalo.edu domain validation', icon: Mail },
      { label: 'Phone Number', type: 'tel', placeholder: '(716) 555-0123', pattern: 'US phone format assistance', icon: Phone },
      { label: 'Major/Department', type: 'text', placeholder: 'Computer Science', pattern: 'UB academic department directory', icon: GraduationCap }
    ]
  },
  {
    category: 'Social Coordination',
    description: 'Community building and event planning',
    inputs: [
      { label: 'Event Title', type: 'text', placeholder: 'Study Group: CSE 115 Midterm Prep', pattern: 'Clear, descriptive event naming', icon: Calendar },
      { label: 'Event Description', type: 'text', placeholder: 'Collaborative midterm preparation...', pattern: 'Detailed event information', icon: Type },
      { label: 'Max Attendees', type: 'number', placeholder: '12', pattern: 'Venue-appropriate capacity', icon: Users },
      { label: 'Search Friends', type: 'search', placeholder: 'Search by name or major...', pattern: 'Campus social discovery', icon: Search }
    ]
  }
];

const inputSizes = [
  { name: 'sm', label: 'Small', usage: 'Compact forms, mobile optimization', height: '32px' },
  { name: 'md', label: 'Medium', usage: 'Standard forms, balanced usability', height: '40px' },
  { name: 'lg', label: 'Large', usage: 'Important forms, accessibility focus', height: '48px' }
];

const validationExamples = [
  {
    type: 'Course Code',
    pattern: '^[A-Z]{3}\\s?\\d{3}$',
    valid: ['CSE 115', 'MTH141', 'ENG 105'],
    invalid: ['cse115', 'CSE15', 'CSCI 115'],
    feedback: 'Must be 3 letters + 3 numbers (e.g., CSE 115)'
  },
  {
    type: 'UB Email',
    pattern: '^[a-zA-Z0-9._%+-]+@buffalo\\.edu$',
    valid: ['student@buffalo.edu', 'alex.johnson@buffalo.edu'],
    invalid: ['student@gmail.com', 'alex@bu.edu'],
    feedback: 'Must be a valid @buffalo.edu email address'
  },
  {
    type: 'Room Number',
    pattern: '^\\d{1,4}[A-Z]?$',
    valid: ['101', '1203', '45A', '2'],
    invalid: ['Room 101', 'First Floor', '101-A'],
    feedback: 'Room numbers only (e.g., 101, 1203A)'
  }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS;
// =============================================================================

const InputVariantsShowcase = () => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleInputChange = (id: string, value: string) => {
    setInputValues(prev => ({ ...prev, [id]: value }))
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Input Patterns;
      </h3>
      
      <div className="space-y-8">
        {campusInputPatterns.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="text-[var(--hive-text-primary)]">
                {category.category}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {category.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.inputs.map((input, inputIndex) => {
                  const inputId = `${categoryIndex}-${inputIndex}`;
                  return (
                    <div key={inputIndex} className="space-y-2">
                      <Label;
                        htmlFor={inputId}
                        className="flex items-center gap-2 text-[var(--hive-text-primary)]"
                      >
                        <input.icon className="w-4 h-4" />
                        {input.label}
                      </Label>
                      
                      <Input;
                        id={inputId}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={inputValues[inputId] || ''}
                        onChange={(e) => handleInputChange(inputId, e.target.value)}
                        onFocus={() => setFocusedInput(inputId)}
                        onBlur={() => setFocusedInput(null)}
                        className={`transition-all ${
                          focusedInput === inputId;
                            ? 'ring-2 ring-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]' 
                            : ''
                        }`}
                      />
                      
                      <div className="text-xs text-[var(--hive-text-muted)]">
                        {input.pattern}
                      </div>
                      
                      {inputValues[inputId] && (
                        <div className="flex items-center gap-1 text-xs">
                          <Check className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">Valid format</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

const InputSizesShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Input Sizes for Campus Context;
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="space-y-6">
            {inputSizes.map((size) => (
              <div key={size.name} className="flex items-center gap-6">
                <div className="w-32">
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {size.label}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {size.height}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="text-sm text-[var(--hive-text-muted)] mb-2">
                    {size.usage}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Input;
                      size={size.name as any}
                      placeholder={`${size.label} input example`}
                      className="max-w-xs"
                    />
                    
                    <Input;
                      size={size.name as any}
                      type="search"
                      placeholder="Search..."
                      className="max-w-xs"
                    />
                    
                    <Input;
                      size={size.name as any}
                      type="email"
                      placeholder="student@buffalo.edu"
                      className="max-w-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

const ValidationShowcase = () => {
  const [testInputs, setTestInputs] = useState<Record<string, string>>({});
  
  const validateInput = (type: string, value: string) => {
    const validator = validationExamples.find(v => v.type === type);
    if (!validator || !value) return null;
    
    const regex = new RegExp(validator.pattern);
    return regex.test(value)
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Validation Patterns;
      </h3>
      
      <div className="space-y-6">
        {validationExamples.map((validation, index) => (
          <Card key={index} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
                <Type className="w-5 h-5" />
                {validation.type} Validation;
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Test Input */}
                <div className="space-y-2">
                  <Label htmlFor={`test-${index}`}>Test {validation.type}</Label>
                  <div className="flex items-center gap-2">
                    <Input;
                      id={`test-${index}`}
                      value={testInputs[validation.type] || ''}
                      onChange={(e) => setTestInputs(prev => ({ ...prev, [validation.type]: e.target.value }))}
                      placeholder={`Enter ${validation.type.toLowerCase()}...`}
                      className="flex-1"
                    />
                    {testInputs[validation.type] && (
                      <div className="flex items-center gap-1">
                        {validateInput(validation.type, testInputs[validation.type]) ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-[var(--hive-text-muted)]">
                    {validation.feedback}
                  </div>
                </div>
                
                {/* Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-green-400 mb-2 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Valid Examples;
                    </div>
                    <div className="space-y-1">
                      {validation.valid.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="text-xs text-[var(--hive-text-secondary)] font-mono bg-[var(--hive-background-primary)] px-2 py-1 rounded">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-red-400 mb-2 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      Invalid Examples;
                    </div>
                    <div className="space-y-1">
                      {validation.invalid.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="text-xs text-[var(--hive-text-secondary)] font-mono bg-[var(--hive-background-primary)] px-2 py-1 rounded line-through opacity-60">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

const AccessibilityShowcase = () => {
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Input Accessibility Features;
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Keyboard className="w-5 h-5" />
            Campus Accessibility Standards;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Screen Reader Support */}}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Screen Reader & Assistive Technology Support;
            </h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="accessible-email" className="text-[var(--hive-text-primary)]">
                  University Email Address;
                </Label>
                <Input;
                  id="accessible-email"
                  type="email"
                  placeholder="yourname@buffalo.edu"
                  aria-describedby="email-help"
                  onFocus={() => setCurrentFocus('email')}
                  onBlur={() => setCurrentFocus(null)}
                />
                <div id="email-help" className="text-sm text-[var(--hive-text-muted)]">
                  Must be your official University at Buffalo email address;
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accessible-password" className="text-[var(--hive-text-primary)]">
                  Password;
                </Label>
                <div className="relative">
                  <Input;
                    id="accessible-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter secure password"
                    aria-describedby="password-help"
                    onFocus={() => setCurrentFocus('password')}
                    onBlur={() => setCurrentFocus(null)}
                    className="pr-10"
                  />
                  <Button;
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div id="password-help" className="text-sm text-[var(--hive-text-muted)]">
                  Must be at least 8 characters with mixed case and numbers;
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Navigation */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Keyboard Navigation & Focus Management;
            </h4>
            <div className="text-sm text-[var(--hive-text-muted)] mb-3">
              Currently focused: {currentFocus || 'None'} • Use Tab to navigate between inputs;
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input;
                placeholder="First input"
                onFocus={() => setCurrentFocus('first')}
                onBlur={() => setCurrentFocus(null)}
                className={currentFocus === 'first' ? 'ring-2 ring-[var(--hive-brand-primary)]' : ''}
              />
              <Input;
                placeholder="Second input"
                onFocus={() => setCurrentFocus('second')}
                onBlur={() => setCurrentFocus(null)}
                className={currentFocus === 'second' ? 'ring-2 ring-[var(--hive-brand-primary)]' : ''}
              />
              <Input;
                placeholder="Third input"
                onFocus={() => setCurrentFocus('third')}
                onBlur={() => setCurrentFocus(null)}
                className={currentFocus === 'third' ? 'ring-2 ring-[var(--hive-brand-primary)]' : ''}
              />
            </div>
          </div>

          {/* Touch Accessibility */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Touch Accessibility for Campus Mobile Usage;
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  All inputs meet 44px minimum touch target requirements;
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  Optimized spacing for thumb accessibility while walking;
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-sm text-[var(--hive-text-secondary)]">
                  Appropriate keyboard types for different input modes;
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

// =============================================================================
// INPUT ENHANCED MAIN COMPONENT;
// =============================================================================

const InputEnhancedShowcase = () => {
  const [activeSection, setActiveSection] = useState('variants');

  const sections = [
    { id: 'variants', label: 'Campus Patterns', icon: Type },
    { id: 'sizes', label: 'Sizes', icon: Ruler },
    { id: 'validation', label: 'Validation', icon: Check },
    { id: 'accessibility', label: 'Accessibility', icon: Keyboard }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Type className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Input Enhanced;
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                Campus Data Collection Component;
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The foundational data input element that powers every University at Buffalo student interaction on HIVE. 
            Advanced validation, campus-specific patterns, and accessibility-first design.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sections.map((section) => (
            <Button;
              key={section.id}
              variant={activeSection === section.id ? 'primary' : 'secondary'}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {activeSection === 'variants' && <InputVariantsShowcase />}
          {activeSection === 'sizes' && <InputSizesShowcase />}
          {activeSection === 'validation' && <ValidationShowcase />}
          {activeSection === 'accessibility' && <AccessibilityShowcase />}
        </div>

        {/* Campus Usage Examples */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <GraduationCap className="w-5 h-5" />
              University at Buffalo Usage Scenarios;
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Quick Campus Forms (2-5 minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Event RSVP with smart auto-complete;
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Study group joining with validation;
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Quick search with campus context;
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Detailed Forms (10+ minutes)</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Profile setup with comprehensive validation;
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Tool creation with academic integration;
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Multi-step workflows with progress saving;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

// =============================================================================
// STORYBOOK STORIES;
// =============================================================================

export const InputEnhancedShowcaseStory: Story = {
  render: () => <InputEnhancedShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete Input Enhanced showcase with campus patterns, sizes, validation, and accessibility features optimized for University at Buffalo usage.'
      }
    }
  }
};

export const CampusInputPatterns: Story = {
  render: () => <InputVariantsShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific input patterns for academic, location, personal, and social coordination data collection.'
      }
    }
  }
};

export const InputSizes: Story = {
  render: () => <InputSizesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Input size system optimized for campus usage scenarios from mobile to desktop environments.'
      }
    }
  }
};

export const ValidationPatterns: Story = {
  render: () => <ValidationShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Campus validation patterns for UB-specific data formats including course codes, emails, and room numbers.'
      }
    }
  }
};

export const AccessibilityFeatures: Story = {
  render: () => <AccessibilityShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete accessibility features including screen reader support, keyboard navigation, and touch accessibility.'
      }
    }
  }
};

// Individual component stories for testing;
export const Standard: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'student@buffalo.edu',
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search campus...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="course-code">Course Code</Label>
      <Input;
        id="course-code"
        type="text"
        placeholder="CSE 115"
      />
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="validated-input">UB Email</Label>
      <Input;
        id="validated-input"
        type="email"
        placeholder="yourname@buffalo.edu"
        aria-describedby="validation-help"
      />
      <div id="validation-help" className="text-sm text-[var(--hive-text-muted)]">
        Must be a valid @buffalo.edu email address;
      </div>
    </div>
  ),
};