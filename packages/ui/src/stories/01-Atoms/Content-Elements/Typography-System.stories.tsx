/**
 * TYPOGRAPHY SYSTEM - CAMPUS CONTENT HIERARCHY
 * 
 * The complete text system for HIVE platform with semantic hierarchy,
 * accessibility features, and campus-specific content patterns for University at Buffalo.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../atomic/ui/card';
import { Button } from '../../../atomic/atoms/button-enhanced';
import { Badge } from '../../../atomic/atoms/badge';
import { 
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Eye,
  Accessibility,
  Smartphone,
  Monitor,
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  MessageCircle,
  FileText,
  Hash,
  Quote,
  List,
  Ruler
} from 'lucide-react';
import '../../../hive-tokens.css';

// Create a component wrapper for the story
const TypographySystem = () => (
  <div className="p-6 space-y-8">
    <h2 className="text-2xl font-semibold">Typography System</h2>
    <p className="text-muted-foreground">Campus content hierarchy and text system</p>
  </div>
);

const meta: Meta<typeof TypographySystem> = {
  component: TypographySystem,
  title: '02-Atoms/Content Elements/Typography System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ⚛️ Typography System - Campus Content Hierarchy

**The foundational text system that creates clear, accessible, and engaging content across the HIVE platform**

The Typography System provides semantic text hierarchy, optimal readability, and campus-appropriate content patterns that help University at Buffalo students quickly scan, understand, and engage with information. Every text element serves the platform's mission of authentic social utility.

## 🎯 TYPOGRAPHY DESIGN PHILOSOPHY

### **Campus-First Content Design**
Every typography choice supports University at Buffalo student scenarios:
- **Academic Content** - Clear hierarchy for course materials, study coordination, academic discussions
- **Social Communication** - Readable, engaging text for community building and event coordination
- **Administrative Information** - Professional, accessible text for settings, policies, help content
- **Mobile Campus Usage** - Optimized for between-class reading and one-handed mobile interaction

### **Semantic Information Architecture**
- **Clear Hierarchy** - H1-H6 heading structure that reflects content importance
- **Scannable Content** - Typography patterns optimized for quick information consumption
- **Accessibility First** - WCAG 2.1 AA compliant with enhanced readability features
- **Responsive Design** - Text that scales appropriately across all campus device types

## 🔤 FONT SYSTEM

### **Primary Typeface: Inter**
- **Excellent Readability** - Designed specifically for digital interfaces and long-form reading
- **Academic Professionalism** - Clean, modern appearance appropriate for university environments
- **Comprehensive Character Set** - Full Unicode support for diverse student names and content
- **Variable Font Support** - Efficient loading with weight variations from 100-900

### **Font Weight Hierarchy**
- **Inter Thin (100)** - Decorative text, large display elements
- **Inter Light (300)** - Subtle secondary information, captions
- **Inter Regular (400)** - Body text, standard content, readable paragraphs
- **Inter Medium (500)** - Emphasized content, important information, section headers
- **Inter Semibold (600)** - Card titles, component headers, navigation labels
- **Inter Bold (700)** - Page titles, major headings, primary navigation
- **Inter Extrabold (800)** - Hero headlines, landing page headers
- **Inter Black (900)** - Brand elements, high-impact display text

### **Monospace: JetBrains Mono**
- **Code Display** - Tool creation, technical content, code examples
- **Data Tables** - Aligned numeric data, structured information
- **Technical Documentation** - API references, development guides

## 📏 SIZE SCALE SYSTEM

### **Responsive Text Scale**
- **text-xs (12px)** - Micro-content, timestamps, legal text, fine print
- **text-sm (14px)** - Captions, labels, secondary information, mobile optimization
- **text-base (16px)** - Body text baseline, comfortable reading, default content
- **text-lg (18px)** - Emphasized content, important paragraphs, featured text
- **text-xl (20px)** - Section introductions, card titles, component headers
- **text-2xl (24px)** - Page subtitles, major section headers
- **text-3xl (30px)** - Page titles, feature headlines
- **text-4xl (36px)** - Hero headlines, landing page titles
- **text-5xl (48px)** - Brand elements, marketing headlines
- **text-6xl (60px)** - Display text, special occasions

### **Line Height Standards**
- **Tight (1.25)** - Headlines, display text, compact layouts
- **Snug (1.375)** - Subheadings, card titles, navigation
- **Normal (1.5)** - Body text, readable content, optimal for scanning
- **Relaxed (1.625)** - Long-form content, academic reading
- **Loose (2.0)** - Accessibility enhancement, dyslexia-friendly spacing

## 🎨 SEMANTIC HIERARCHY

### **Heading Structure (H1-H6)**
- **H1 (text-4xl)** - Page main titles, unique content identifiers
- **H2 (text-3xl)** - Major section headers, content organization
- **H3 (text-2xl)** - Subsection headers, content groupings
- **H4 (text-xl)** - Component titles, card headers
- **H5 (text-lg)** - Item titles, list headers
- **H6 (text-base)** - Detail headers, micro-sections

### **Body Text Patterns**
- **Paragraph (text-base)** - Standard content, comfortable reading
- **Lead Text (text-lg)** - Introduction paragraphs, featured content
- **Small Text (text-sm)** - Secondary information, helper text
- **Micro Text (text-xs)** - Metadata, timestamps, legal information

### **Interactive Text**
- **Links** - Underlined, campus-appropriate color, clear hover states
- **Buttons** - Medium weight, clear hierarchy, action-oriented
- **Navigation** - Semibold weight, consistent sizing, accessible contrast
- **Form Labels** - Clear association, appropriate sizing, helpful context

## 🎓 CAMPUS CONTENT PATTERNS

### **Academic Content Typography**
- **Course Information** - Clear hierarchy for course codes, titles, descriptions
- **Study Materials** - Readable formatting for notes, assignments, academic discussions
- **Academic Calendar** - Scannable event information with clear date/time hierarchy
- **Grade Information** - Professional presentation of academic performance data

### **Social Coordination Typography**
- **Event Descriptions** - Engaging, scannable event information with clear details
- **Community Discussions** - Readable thread formatting with clear author attribution
- **Friend Profiles** - Personal information presented with appropriate privacy awareness
- **Activity Updates** - Quick-scan formatting for social feed content

### **Administrative Typography**
- **Settings Pages** - Clear, professional formatting for configuration options
- **Privacy Policies** - Readable legal text with appropriate emphasis and organization
- **Help Documentation** - Step-by-step formatting with clear instruction hierarchy
- **Error Messages** - Clear, helpful error communication with solution guidance

## ♿ ACCESSIBILITY FEATURES

### **Visual Accessibility**
- **High Contrast** - 4.5:1 minimum contrast ratio for all text
- **Color Independence** - No information conveyed through color alone
- **Scalable Text** - Support for 200% zoom without horizontal scrolling
- **Focus Indicators** - Clear text selection and focus states

### **Cognitive Accessibility**
- **Predictable Patterns** - Consistent typography hierarchy across platform
- **Clear Language** - Plain language principles, appropriate reading level
- **Chunked Information** - Manageable content blocks, good white space usage
- **Scan-Friendly** - Bullet points, numbered lists, clear section breaks

### **Motor Accessibility**
- **Large Click Targets** - Text links with adequate touch areas
- **Easy Selection** - Text selection that works with various input methods
- **Keyboard Navigation** - Proper focus order through text content
- **Voice Navigation** - Text that works well with speech recognition

## 📱 MOBILE TYPOGRAPHY OPTIMIZATION

### **Between-Class Reading (2-5 minutes)**
- **Scannable Headlines** - Clear, action-oriented headings for quick decisions
- **Compact Information** - Essential details presented efficiently
- **Thumb-Friendly Links** - Touch targets appropriately sized for mobile interaction
- **Quick Comprehension** - Information hierarchy optimized for rapid consumption

### **Study Session Reading (10+ minutes)**
- **Comfortable Body Text** - Optimal sizing and spacing for extended reading
- **Clear Section Breaks** - Visual separation for different content areas
- **Readable Line Length** - Appropriate measure for sustained reading
- **Eye Strain Reduction** - Spacing and contrast optimized for longer sessions

## 🔧 TECHNICAL IMPLEMENTATION

### **CSS Typography System**
- **Custom Properties** - CSS variables for consistent sizing and spacing
- **Responsive Units** - rem-based sizing for scalable, accessible text
- **Font Loading** - Optimized web font loading with fallback stacks
- **Performance** - Minimal font file sizes with variable font technology

### **React Component Integration**
- **Semantic HTML** - Proper heading structure and text semantics
- **TypeScript Props** - Type-safe typography component interfaces
- **Accessibility Attributes** - ARIA labels and semantic markup
- **Responsive Design** - Mobile-first typography scaling

### **Content Management**
- **Consistent Patterns** - Reusable typography components for common patterns
- **Content Guidelines** - Clear rules for content creators and developers
- **Quality Assurance** - Typography validation in design and development workflow
- **Performance Monitoring** - Text rendering performance across campus devices

## 🎓 CAMPUS TYPOGRAPHY SCENARIOS

### **Academic Workflow Typography**
- Study group coordination with clear event details and academic context
- Course discussion formatting with proper attribution and academic tone
- Assignment collaboration with clear formatting for shared academic work
- Academic calendar integration with semester-aware typography patterns

### **Social Coordination Typography**
- Event planning with engaging, scannable event information and RSVP details
- Community building with personal, warm typography that encourages participation
- Friend discovery with clear personal information and connection opportunities
- Activity sharing with quick-scan formatting for social feed engagement

### **Administrative Typography**
- Profile management with clear, professional formatting for personal information
- Privacy settings with transparent, trustworthy typography for sensitive information
- Help documentation with step-by-step, patient typography for user guidance
- System notifications with clear, actionable typography for important updates
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
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// TYPOGRAPHY SYSTEM DATA
// =============================================================================

const headingHierarchy = [
  { level: 'H1', size: 'text-4xl', weight: 'font-bold', usage: 'Page main titles', example: 'Welcome to HIVE' },
  { level: 'H2', size: 'text-3xl', weight: 'font-bold', usage: 'Major section headers', example: 'Your Campus Spaces' },
  { level: 'H3', size: 'text-2xl', weight: 'font-semibold', usage: 'Subsection headers', example: 'Academic Communities' },
  { level: 'H4', size: 'text-xl', weight: 'font-semibold', usage: 'Component titles', example: 'Recent Activity' },
  { level: 'H5', size: 'text-lg', weight: 'font-medium', usage: 'Item titles', example: 'CSE 115 Study Group' },
  { level: 'H6', size: 'text-base', weight: 'font-medium', usage: 'Detail headers', example: 'Group Details' }
];

const textSizeScale = [
  { name: 'text-xs', size: '12px', weight: 'font-normal', usage: 'Micro-content, timestamps', example: '2 minutes ago' },
  { name: 'text-sm', size: '14px', weight: 'font-normal', usage: 'Captions, labels', example: 'Course: CSE 115' },
  { name: 'text-base', size: '16px', weight: 'font-normal', usage: 'Body text baseline', example: 'Join our study group for the upcoming midterm exam.' },
  { name: 'text-lg', size: '18px', weight: 'font-normal', usage: 'Emphasized content', example: 'Important deadline reminder' },
  { name: 'text-xl', size: '20px', weight: 'font-medium', usage: 'Section introductions', example: 'Upcoming Events This Week' },
  { name: 'text-2xl', size: '24px', weight: 'font-semibold', usage: 'Page subtitles', example: 'Dashboard Overview' }
];

const fontWeights = [
  { name: 'font-thin', weight: '100', usage: 'Decorative text', example: 'HIVE' },
  { name: 'font-light', weight: '300', usage: 'Subtle information', example: 'Optional field' },
  { name: 'font-normal', weight: '400', usage: 'Body text', example: 'This is standard body text for reading.' },
  { name: 'font-medium', weight: '500', usage: 'Emphasized content', example: 'Important information' },
  { name: 'font-semibold', weight: '600', usage: 'Component headers', example: 'Study Group Details' },
  { name: 'font-bold', weight: '700', usage: 'Page titles', example: 'Campus Events' },
  { name: 'font-extrabold', weight: '800', usage: 'Hero headlines', example: 'Connect Your Campus' },
  { name: 'font-black', weight: '900', usage: 'Brand elements', example: 'HIVE' }
];

const campusContentPatterns = [
  {
    category: 'Academic Content',
    description: 'Course materials and study coordination',
    patterns: [
      {
        title: 'Course Announcement',
        content: `
          <h3 class="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">CSE 115 - Midterm Study Session</h3>
          <div class="text-sm text-[var(--hive-text-secondary)] mb-3">Posted by Dr. Smith • 2 hours ago</div>
          <p class="text-base text-[var(--hive-text-primary)] mb-4 leading-relaxed">Join us for a comprehensive review session covering all material from chapters 1-8. We'll focus on data structures, algorithms, and practical coding examples.</p>
          <div class="space-y-1">
            <div class="text-sm"><span class="font-medium text-[var(--hive-text-primary)]">When:</span> <span class="text-[var(--hive-text-secondary)]">Wednesday, March 15 at 7:00 PM</span></div>
            <div class="text-sm"><span class="font-medium text-[var(--hive-text-primary)]">Where:</span> <span class="text-[var(--hive-text-secondary)]">Davis Hall, Room 101</span></div>
            <div class="text-sm"><span class="font-medium text-[var(--hive-text-primary)]">Duration:</span> <span class="text-[var(--hive-text-secondary)]">2 hours</span></div>
          </div>
        `
      },
      {
        title: 'Study Group Discussion',
        content: `
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center">
                <span class="text-xs font-semibold text-[var(--hive-brand-primary)]">AJ</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium text-[var(--hive-text-primary)]">Alex Johnson</span>
                  <span class="text-xs text-[var(--hive-text-muted)]">Computer Science • Junior</span>
                </div>
                <p class="text-sm text-[var(--hive-text-primary)]">Can someone explain the difference between breadth-first and depth-first search? I'm struggling with the implementation details.</p>
                <div class="text-xs text-[var(--hive-text-muted)] mt-2">15 minutes ago</div>
              </div>
            </div>
          </div>
        `
      }
    ]
  },
  {
    category: 'Social Coordination',
    description: 'Community building and event planning',
    patterns: [
      {
        title: 'Event Invitation',
        content: `
          <h4 class="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">Floor Movie Night 🍿</h4>
          <p class="text-lg text-[var(--hive-text-primary)] mb-4">Join us for a cozy movie night in the Ellicott lounge! We're watching Spider-Man and have plenty of popcorn.</p>
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div class="text-sm font-medium text-[var(--hive-text-primary)]">Date & Time</div>
              <div class="text-sm text-[var(--hive-text-secondary)]">Friday, 8:00 PM</div>
            </div>
            <div>
              <div class="text-sm font-medium text-[var(--hive-text-primary)]">Location</div>
              <div class="text-sm text-[var(--hive-text-secondary)]">Ellicott Main Lounge</div>
            </div>
          </div>
          <div class="text-sm text-[var(--hive-text-secondary)]">
            <span class="font-medium">12 people attending</span> • <span class="text-[var(--hive-brand-primary)]">Will you join us?</span>
          </div>
        `
      },
      {
        title: 'Community Update',
        content: `
          <h5 class="text-lg font-medium text-[var(--hive-text-primary)] mb-2">Third Floor Community Updates</h5>
          <ul class="space-y-2 text-sm text-[var(--hive-text-primary)]">
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full mt-2"></div>
              <span>Laundry room schedule updated - peak hours are now 2-6 PM</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full mt-2"></div>
              <span>Study room reservations now available through the HIVE app</span>
            </li>
            <li class="flex items-start gap-2">
              <div class="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full mt-2"></div>
              <span>Monthly floor meeting: Sunday 7 PM in the main lounge</span>
            </li>
          </ul>
        `
      }
    ]
  }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const HeadingHierarchyShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Semantic Heading Hierarchy (H1-H6)
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="space-y-6">
            {headingHierarchy.map((heading, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="w-20 shrink-0">
                  <Badge variant="secondary" className="text-xs">
                    {heading.level}
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className={`${heading.size} ${heading.weight} text-[var(--hive-text-primary)] mb-2`}>
                    {heading.example}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)] mb-1">
                    {heading.size} • {heading.weight}
                  </div>
                  <div className="text-xs text-[var(--hive-text-muted)]">
                    {heading.usage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TextSizeShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Text Size Scale System
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="space-y-6">
            {textSizeScale.map((textSize, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="w-24 shrink-0">
                  <Badge variant="secondary" className="text-xs">
                    {textSize.size}
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className={`${textSize.name} ${textSize.weight} text-[var(--hive-text-primary)] mb-2`}>
                    {textSize.example}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)] mb-1">
                    {textSize.name} ({textSize.size}) • {textSize.weight}
                  </div>
                  <div className="text-xs text-[var(--hive-text-muted)]">
                    {textSize.usage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FontWeightShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Font Weight Hierarchy
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fontWeights.map((weight, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">
                    {weight.weight}
                  </Badge>
                  <span className="text-sm text-[var(--hive-text-secondary)]">
                    {weight.name}
                  </span>
                </div>
                <div className={`text-lg ${weight.name} text-[var(--hive-text-primary)]`}>
                  {weight.example}
                </div>
                <div className="text-xs text-[var(--hive-text-muted)]">
                  {weight.usage}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CampusContentShowcase = () => {
  const [activePattern, setActivePattern] = useState(0);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Content Patterns
      </h3>
      
      <div className="space-y-6">
        {campusContentPatterns.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
                {category.category === 'Academic Content' ? (
                  <GraduationCap className="w-5 h-5" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
                {category.category}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {category.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {category.patterns.map((pattern, patternIndex) => (
                  <div key={patternIndex} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                      <span className="font-medium text-[var(--hive-text-primary)]">
                        {pattern.title}
                      </span>
                    </div>
                    <Card className="border border-[var(--hive-border-default)] bg-[var(--hive-background-primary)]">
                      <CardContent className="p-4">
                        <div 
                          dangerouslySetInnerHTML={{ __html: pattern.content.trim() }}
                          className="[&>*]:mb-0 [&>*:not(:last-child)]:mb-4"
                        />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AccessibilityShowcase = () => {
  const [textSize, setTextSize] = useState('100%');
  
  const textSizeOptions = [
    { value: '100%', label: 'Default (100%)' },
    { value: '125%', label: 'Large (125%)' },
    { value: '150%', label: 'Larger (150%)' },
    { value: '200%', label: 'Largest (200%)' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Typography Accessibility Features
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
            <Accessibility className="w-5 h-5" />
            Campus Accessibility Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Scaling Demo */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Text Scaling Support
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {textSizeOptions.map((option: any) => (
                <Button
                  key={option.value}
                  variant={textSize === option.value ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setTextSize(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <Card className="border border-[var(--hive-border-default)] bg-[var(--hive-background-primary)]">
              <CardContent className="p-4" style={{ fontSize: textSize }}>
                <h4 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                  Campus Study Group
                </h4>
                <p className="text-base text-[var(--hive-text-primary)] mb-3">
                  Join our Computer Science study group for collaborative learning and exam preparation. 
                  We meet weekly in Davis Hall and coordinate through HIVE for maximum accessibility.
                </p>
                <div className="text-sm text-[var(--hive-text-secondary)]">
                  Meetings: Every Tuesday at 7:00 PM
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accessibility Features */}
          <div>
            <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
              Built-in Accessibility Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Visual Accessibility
                </h5>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• 4.5:1+ contrast ratio for all text</div>
                  <div>• 200% zoom support without horizontal scrolling</div>
                  <div>• Clear focus indicators for interactive text</div>
                  <div>• Color-independent information design</div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Cognitive Accessibility
                </h5>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Clear, predictable heading hierarchy</div>
                  <div>• Scannable content with logical flow</div>
                  <div>• Plain language principles</div>
                  <div>• Appropriate line spacing for readability</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// =============================================================================
// TYPOGRAPHY SYSTEM MAIN COMPONENT
// =============================================================================

const TypographySystemShowcase = () => {
  const [activeSection, setActiveSection] = useState('hierarchy');

  const sections = [
    { id: 'hierarchy', label: 'Heading Hierarchy', icon: Hash },
    { id: 'sizes', label: 'Size Scale', icon: Ruler },
    { id: 'weights', label: 'Font Weights', icon: Bold },
    { id: 'patterns', label: 'Campus Patterns', icon: FileText },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility }
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
                Typography System
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                Campus Content Hierarchy
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The foundational text system that creates clear, accessible, and engaging content across the HIVE platform. 
            Semantic hierarchy optimized for University at Buffalo campus reading patterns.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sections.map((section: any) => (
            <Button
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
          {activeSection === 'hierarchy' && <HeadingHierarchyShowcase />}
          {activeSection === 'sizes' && <TextSizeShowcase />}
          {activeSection === 'weights' && <FontWeightShowcase />}
          {activeSection === 'patterns' && <CampusContentShowcase />}
          {activeSection === 'accessibility' && <AccessibilityShowcase />}
        </div>

        {/* Font System Information */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <Type className="w-5 h-5" />
              HIVE Font System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Primary Typeface: Inter</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Optimized for digital interface reading
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Academic professionalism with modern clarity
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Variable font technology for performance
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Campus Usage Optimization</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Mobile-first sizing for between-class reading
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Extended reading comfort for study sessions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-sm text-[var(--hive-text-secondary)]">
                      Accessibility compliance for all campus users
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const TypographySystemShowcaseStory: Story = {
  render: () => <TypographySystemShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete Typography System showcase with heading hierarchy, size scale, font weights, campus patterns, and accessibility features optimized for University at Buffalo usage.'
      }
    }
  }
};

export const HeadingHierarchy: Story = {
  render: () => <HeadingHierarchyShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Semantic heading hierarchy (H1-H6) with campus-appropriate sizing and usage examples.'
      }
    }
  }
};

export const TextSizeScale: Story = {
  render: () => <TextSizeShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete text size scale from micro-content to display headlines with campus usage contexts.'
      }
    }
  }
};

export const FontWeights: Story = {
  render: () => <FontWeightShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Font weight hierarchy from thin to black with appropriate usage scenarios for campus content.'
      }
    }
  }
};

export const CampusContentPatterns: Story = {
  render: () => <CampusContentShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Real-world campus content patterns for academic and social coordination with proper typography hierarchy.'
      }
    }
  }
};

export const AccessibilityFeatures: Story = {
  render: () => <AccessibilityShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Typography accessibility features including text scaling, contrast standards, and cognitive accessibility support.'
      }
    }
  }
};

// Individual text examples
export const HeadingExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)]">H1: Welcome to HIVE</h1>
      <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">H2: Your Campus Spaces</h2>
      <h3 className="text-2xl font-semibold text-[var(--hive-text-primary)]">H3: Academic Communities</h3>
      <h4 className="text-xl font-semibold text-[var(--hive-text-primary)]">H4: Recent Activity</h4>
      <h5 className="text-lg font-medium text-[var(--hive-text-primary)]">H5: CSE 115 Study Group</h5>
      <h6 className="text-base font-medium text-[var(--hive-text-primary)]">H6: Group Details</h6>
    </div>
  ),
};

export const BodyTextExamples: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <p className="text-lg text-[var(--hive-text-primary)] leading-relaxed">
        <strong>Lead paragraph:</strong> Welcome to HIVE, the social platform where University at Buffalo students build authentic campus communities around solving real problems together.
      </p>
      <p className="text-base text-[var(--hive-text-primary)] leading-relaxed">
        <strong>Body text:</strong> Join study groups, coordinate events, and connect with your campus community in ways that actually make your college experience better. Every connection has purpose, every community gets things done.
      </p>
      <p className="text-sm text-[var(--hive-text-secondary)]">
        <strong>Supporting text:</strong> Connect with students in your major, residence hall, or areas of interest.
      </p>
      <p className="text-xs text-[var(--hive-text-muted)]">
        <strong>Micro text:</strong> Posted 2 hours ago • 47 students interested
      </p>
    </div>
  ),
};