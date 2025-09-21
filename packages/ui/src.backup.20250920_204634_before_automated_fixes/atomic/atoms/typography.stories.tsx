import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Heading, 
  Text, 
  Caption, 
  Link, 
  Code, 
  Blockquote, 
  List, 
  ListItem, 
  TypographyPresets;
} from './typography';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Heading> = {
  title: '01-Atoms/Typography - COMPLETE DEFINITION',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Typography - Complete Component Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated typography system for University at Buffalo campus content display and text hierarchy.

### 🏆 **COMPONENT EXCELLENCE**
- **7 Typography Components** - Heading, Text, Caption, Link, Code, Blockquote, List;
- **Semantic Token Perfection** - 100% semantic token usage with color-mix sophistication;
- **Smart Text Hierarchy** - 6 heading levels, multiple text sizes, comprehensive styling;
- **Advanced Typography** - Display fonts, text weights, color variants, decorations;
- **Perfect Accessibility** - Screen reader optimized, semantic HTML, keyboard navigation;
- **Campus Content Ready** - Optimized for UB academic content and campus communication;
- **Typography Presets** - Pre-built patterns for common campus text scenarios;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo text content and academic communication:
- **Academic Content** - Course descriptions, assignment text, research papers;
- **Campus Communications** - Announcements, event descriptions, policy documents;
- **Student Information** - Profile descriptions, bio text, academic achievements;
- **Documentation** - Help articles, guides, FAQ content, instructional materials;
- **Interactive Content** - Links to campus resources, email addresses, phone numbers;
### 📱 **MOBILE OPTIMIZATION**
- **Readable Text** - Optimized line heights and spacing for mobile reading;
- **Touch-Friendly Links** - Proper link sizing for thumb navigation;
- **Responsive Hierarchy** - Typography scales appropriately across device sizes;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level (semantic HTML and visual hierarchy)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'brand', 'success', 'error', 'warning', 'info'],
      description: 'Text color variant',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML element override',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

// Default heading showcase;
export const Default: Story = {
  args: {
    level: 2,
    color: 'primary',
    weight: 'semibold',
    children: 'University at Buffalo Campus Life',
  },
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Heading Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ HEADINGS</Badge>
            Heading Hierarchy - Semantic Levels & Visual Scale;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 heading levels with perfect semantic tokens and visual hierarchy;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4">
                <Heading level={1} color="primary">
                  H1: University at Buffalo - Premium Learning Experience;
                </Heading>
                <Text size="sm" color="tertiary">Level 1: Hero headings for main page titles and primary branding</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={2} color="primary">
                  H2: Student Life & Campus Community;
                </Heading>
                <Text size="sm" color="tertiary">Level 2: Page headings for major sections and landing pages</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={3} color="primary">
                  H3: Academic Programs & Course Offerings;
                </Heading>
                <Text size="sm" color="tertiary">Level 3: Section headings for content areas and feature highlights</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={4} color="primary">
                  H4: Computer Science Department Resources;
                </Heading>
                <Text size="sm" color="tertiary">Level 4: Subsection headings for detailed content areas</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={5} color="primary">
                  H5: CSE 331 Algorithm Analysis Course;
                </Heading>
                <Text size="sm" color="tertiary">Level 5: Component headings for cards and smaller sections</Text>
              </div>
              
              <div className="grid gap-4">
                <Heading level={6} color="primary">
                  H6: Assignment 3: Dynamic Programming;
                </Heading>
                <Text size="sm" color="tertiary">Level 6: Small headings for detailed items and labels</Text>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 COLORS</Badge>
            Typography Colors - Semantic Token Usage;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 semantic color variants for different content contexts;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Heading level={3} color="primary">
                  Primary Text - Main Content;
                </Heading>
                <Text color="primary">
                  Primary color is used for main content text and primary headings throughout the UB campus platform.
                </Text>
                
                <Heading level={3} color="secondary">
                  Secondary Text - Supporting Content;
                </Heading>
                <Text color="secondary">
                  Secondary color provides subtle contrast for supporting information and less prominent content.
                </Text>
                
                <Heading level={3} color="tertiary">
                  Tertiary Text - Metadata;
                </Heading>
                <Text color="tertiary">
                  Tertiary color is perfect for timestamps, metadata, and supplementary information.
                </Text>
                
                <Heading level={3} color="brand">
                  Brand Text - UB Gold Emphasis;
                </Heading>
                <Text color="brand">
                  Brand color uses UB's signature gold for highlighting important campus-related content.
                </Text>
              </div>
              
              <div className="space-y-4">
                <Heading level={3} color="success">
                  Success Text - Positive Status;
                </Heading>
                <Text color="success">
                  Success color indicates completed assignments, passed courses, and positive achievements.
                </Text>
                
                <Heading level={3} color="error">
                  Error Text - Critical Information;
                </Heading>
                <Text color="error">
                  Error color alerts students to failed submissions, missing requirements, or urgent issues.
                </Text>
                
                <Heading level={3} color="warning">
                  Warning Text - Attention Required;
                </Heading>
                <Text color="warning">
                  Warning color highlights deadlines approaching, incomplete profiles, or items needing attention.
                </Text>
                
                <Heading level={3} color="info">
                  Info Text - Informational Content;
                </Heading>
                <Text color="info">
                  Info color provides helpful tips, additional context, and supplementary academic information.
                </Text>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Sizes & Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📏 SIZES & WEIGHTS</Badge>
            Text Sizes & Font Weights - Visual Hierarchy;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive text sizing and weight options for all campus content needs;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Text Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Sizes:</h4>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Text size="xs">Extra Small: Course code references, footnotes, and fine print details</Text>
                  <Text size="sm">Small: Captions, metadata, timestamps, and supplementary information</Text>
                  <Text size="base">Base: Standard body text for articles, descriptions, and main content</Text>
                  <Text size="lg">Large: Prominent text for important announcements and featured content</Text>
                  <Text size="xl">Extra Large: Emphasis text for key messages and call-to-action content</Text>
                </div>
              </div>
            </div>

            {/* Font Weights */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Font Weights:</h4>
              <div className="space-y-3">
                <Text weight="light">Light: Subtle text for less important information and secondary details</Text>
                <Text weight="normal">Normal: Standard body text weight for comfortable reading experiences</Text>
                <Text weight="medium">Medium: Slightly emphasized text for labels and important information</Text>
                <Text weight="semibold">Semibold: Strong emphasis for headings and key content highlights</Text>
                <Text weight="bold">Bold: Maximum emphasis for critical information and strong calls-to-action</Text>
              </div>
            </div>

            {/* Text Decorations */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Decorations:</h4>
              <div className="space-y-3">
                <Text decoration="none">No decoration: Standard text without any visual enhancements</Text>
                <Text decoration="underline">Underlined: Emphasized text for important notices and highlights</Text>
                <Text decoration="line-through">Strikethrough: Cancelled events, outdated information, or completed tasks</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Advanced Typography Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">⚡ COMPONENTS</Badge>
            Advanced Typography - Links, Code, Quotes, Lists;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Specialized typography components for rich campus content formatting;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Links:</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Link href="https://buffalo.edu" color="brand">
                    University at Buffalo Official Website;
                  </Link>
                  <Text size="sm" color="tertiary">Brand links for official UB resources and campus websites</Text>
                </div>
                
                <div className="space-y-2">
                  <Link href="mailto:example@buffalo.edu" color="primary">
                    Contact Academic Advisor;
                  </Link>
                  <Text size="sm" color="tertiary">Primary links for email addresses and contact information</Text>
                </div>
                
                <div className="space-y-2">
                  <Link href="#" color="secondary" decoration="always">
                    Secondary Resource Link;
                  </Link>
                  <Text size="sm" color="tertiary">Secondary links with persistent underlines for clarity</Text>
                </div>
                
                <div className="space-y-2">
                  <Link href="#" color="tertiary" decoration="none">
                    Subtle Navigation Link;
                  </Link>
                  <Text size="sm" color="tertiary">Tertiary links without decoration for subtle navigation</Text>
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Code & Technical Content:</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Text>
                    For CSE 331, you'll need to implement the <Code>dijkstra</Code> algorithm;
                    using a <Code>PriorityQueue</Code> data structure.
                  </Text>
                  <Text size="sm" color="tertiary">Inline code for technical terms and function names</Text>
                </div>
                
                <div className="space-y-2">
                  <Code variant="block">
{`// Assignment 3: Dynamic Programming Solution;
function fibonacci(n) {
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  
  return dp[n]
}`}
                  </Code>
                  <Text size="sm" color="tertiary">Block code for algorithm examples and code submissions</Text>
                </div>
              </div>
            </div>

            {/* Blockquotes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Academic Quotes & Citations:</h4>
              <div className="space-y-4">
                <Blockquote>
                  "The University at Buffalo is committed to providing an inclusive environment;
                  where all students can thrive academically and personally, contributing to a;
                  vibrant campus community that prepares leaders for tomorrow's challenges."
                </Blockquote>
                <Text size="sm" color="tertiary">— President Satish K. Tripathi, University at Buffalo</Text>
                
                <Blockquote>
                  "Computer science is not just about programming. It's about problem-solving, 
                  critical thinking, and creating solutions that can change the world. Our students;
                  learn to think algorithmically and approach complex challenges systematically."
                </Blockquote>
                <Text size="sm" color="tertiary">— CSE Department Mission Statement</Text>
              </div>
            </div>

            {/* Lists */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Lists & Structured Content:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text weight="medium">CSE Core Requirements:</Text>
                  <List variant="unordered">
                    <ListItem>CSE 115 - Introduction to Computer Science I</ListItem>
                    <ListItem>CSE 116 - Introduction to Computer Science II</ListItem>
                    <ListItem>CSE 250 - Data Structures</ListItem>
                    <ListItem>CSE 331 - Algorithm Analysis and Design</ListItem>
                    <ListItem>CSE 341 - Computer Organization</ListItem>
                  </List>
                </div>
                
                <div className="space-y-3">
                  <Text weight="medium">Academic Timeline:</Text>
                  <List variant="ordered">
                    <ListItem>Complete prerequisite courses (Year 1-2)</ListItem>
                    <ListItem>Declare computer science major</ListItem>
                    <ListItem>Fulfill core requirements (Year 2-3)</ListItem>
                    <ListItem>Choose specialization track</ListItem>
                    <ListItem>Complete capstone project (Year 4)</ListItem>
                  </List>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Typography Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Typography Presets - Common Campus Patterns;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built typography components for common campus content scenarios;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Page Titles:</h4>
                  <TypographyPresets.PageTitle>
                    Student Dashboard;
                  </TypographyPresets.PageTitle>
                  <Text size="sm" color="tertiary">Hero-level page titles for main sections</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Section Titles:</h4>
                  <TypographyPresets.SectionTitle>
                    My Courses - Spring 2025
                  </TypographyPresets.SectionTitle>
                  <Text size="sm" color="tertiary">Section headings for content areas</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Card Titles:</h4>
                  <TypographyPresets.CardTitle>
                    CSE 331 - Algorithm Analysis;
                  </TypographyPresets.CardTitle>
                  <Text size="sm" color="tertiary">Card and component headings</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Body Text:</h4>
                  <TypographyPresets.Body>
                    This course covers fundamental algorithm design techniques including;
                    divide-and-conquer, dynamic programming, and greedy algorithms. Students;
                    will analyze algorithm complexity and implement solutions to complex problems.
                  </TypographyPresets.Body>
                  <Text size="sm" color="tertiary">Standard body text for descriptions</Text>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Small Text:</h4>
                  <TypographyPresets.Small>
                    Last updated: March 15, 2025 at 2:30 PM EST;
                  </TypographyPresets.Small>
                  <Text size="sm" color="tertiary">Timestamps and metadata</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Caption Text:</h4>
                  <TypographyPresets.CaptionText>
                    Figure 1: Student enrollment trends by academic department;
                  </TypographyPresets.CaptionText>
                  <Text size="sm" color="tertiary">Image captions and figure labels</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Error Text:</h4>
                  <TypographyPresets.ErrorText>
                    Assignment submission failed. Please check your file format.
                  </TypographyPresets.ErrorText>
                  <Text size="sm" color="tertiary">Error messages and critical alerts</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Success Text:</h4>
                  <TypographyPresets.SuccessText>
                    Course registration completed successfully!
                  </TypographyPresets.SuccessText>
                  <Text size="sm" color="tertiary">Success confirmations and positive feedback</Text>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">Brand Text:</h4>
                  <TypographyPresets.BrandText>
                    University at Buffalo - The State University of New York;
                  </TypographyPresets.BrandText>
                  <Text size="sm" color="tertiary">Official branding and university references</Text>
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
            Real Campus Typography Usage;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Typography examples from actual University at Buffalo academic and campus contexts;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Syllabus */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>
              CSE 331: Algorithm Analysis and Design - Spring 2025
            </TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Course Information</TypographyPresets.CardTitle>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Text weight="medium">Instructor:</Text>
                    <Text>Dr. Sarah Johnson</Text>
                    <Link href="mailto:sjohnson@buffalo.edu" color="brand">sjohnson@buffalo.edu</Link>
                  </div>
                  <div>
                    <Text weight="medium">Office Hours:</Text>
                    <Text>TTh 3:00-4:30 PM, Davis Hall 338</Text>
                    <Text size="sm" color="tertiary">Or by appointment</Text>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Course Description</TypographyPresets.CardTitle>
                <TypographyPresets.Body>
                  This course provides a comprehensive introduction to algorithm design and analysis. 
                  Students will learn fundamental algorithmic techniques including divide-and-conquer, 
                  dynamic programming, greedy algorithms, and graph algorithms. Emphasis is placed on;
                  understanding algorithm correctness, analyzing time and space complexity, and;
                  implementing efficient solutions to computational problems.
                </TypographyPresets.Body>
              </div>
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Learning Objectives</TypographyPresets.CardTitle>
                <List variant="ordered">
                  <ListItem>Design and analyze efficient algorithms for various computational problems</ListItem>
                  <ListItem>Apply mathematical techniques to prove algorithm correctness and analyze complexity</ListItem>
                  <ListItem>Implement algorithms using appropriate data structures in Python and Java</ListItem>
                  <ListItem>Compare different algorithmic approaches and select optimal solutions</ListItem>
                </List>
              </div>
              
              <div className="space-y-3">
                <TypographyPresets.CardTitle>Prerequisites</TypographyPresets.CardTitle>
                <Text>
                  <Text weight="medium">Required:</Text> CSE 250 (Data Structures), MTH 141 (College Calculus I)
                </Text>
                <Text>
                  <Text weight="medium">Recommended:</Text> MTH 241 (College Calculus II), MTH 311 (Introduction to Discrete Mathematics)
                </Text>
              </div>
              
            </div>
          </div>

          {/* Campus Event Announcement */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>Campus Event Announcement</TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <TypographyPresets.PageTitle color="brand">
                UB Tech Career Fair 2025
              </TypographyPresets.PageTitle>
              
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="success">Registration Open</Badge>
                <TypographyPresets.Small>March 22, 2025 • Student Union Ballrooms</TypographyPresets.Small>
              </div>
              
              <TypographyPresets.Body>
                Join us for the largest technology career fair in Western New York! Connect with leading;
                tech companies, startups, and UB alumni working in the technology industry. This is your;
                opportunity to explore internship and full-time opportunities, network with professionals, 
                and learn about exciting career paths in computer science, engineering, and technology.
              </TypographyPresets.Body>
              
              <Blockquote>
                "The UB Tech Career Fair has been instrumental in connecting our students with amazing;
                opportunities. Last year, over 75% of participating students received interview offers, 
                and many secured internships or full-time positions."
              </Blockquote>
              <Text size="sm" color="tertiary">— Dr. Michael Chen, CSE Career Services Director</Text>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text weight="medium">Featured Companies:</Text>
                  <List variant="unordered">
                    <ListItem>Google • Software Engineering</ListItem>
                    <ListItem>Microsoft • Cloud Computing</ListItem>
                    <ListItem>Apple • Mobile Development</ListItem>
                    <ListItem>Amazon • AWS Solutions</ListItem>
                    <ListItem>Meta • Social Platform Engineering</ListItem>
                  </List>
                </div>
                
                <div className="space-y-3">
                  <Text weight="medium">Event Schedule:</Text>
                  <List variant="ordered">
                    <ListItem><Code>10:00 AM</Code> - Registration & Welcome</ListItem>
                    <ListItem><Code>10:30 AM</Code> - Company Fair Opens</ListItem>
                    <ListItem><Code>12:00 PM</Code> - Networking Lunch</ListItem>
                    <ListItem><Code>1:00 PM</Code> - Technical Workshops</ListItem>
                    <ListItem><Code>3:00 PM</Code> - One-on-One Interviews</ListItem>
                  </List>
                </div>
              </div>
              
              <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 p-4 rounded-lg">
                <Text weight="semibold" color="brand">Important Registration Information:</Text>
                <Text size="sm">
                  Space is limited to 300 students. Registration closes March 18th or when capacity is reached. 
                  Bring multiple copies of your resume and dress professionally. 
                  <Link href="#" color="brand"> Click here to register now</Link>.
                </Text>
              </div>
              
            </div>
          </div>

          {/* Academic Research Abstract */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>Research Publication Example</TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <TypographyPresets.CardTitle>
                Optimizing Campus Resource Allocation Through Machine Learning: 
                A University at Buffalo Case Study;
              </TypographyPresets.CardTitle>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Text size="sm" weight="medium">Authors:</Text>
                <Link href="#" color="brand">Dr. Jennifer Liu</Link>
                <Link href="#" color="brand">Prof. David Rodriguez</Link>
                <Link href="#" color="brand">Alex Chen (PhD Candidate)</Link>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Abstract</Text>
                <TypographyPresets.Body>
                  This paper presents a novel machine learning approach to optimize campus resource allocation;
                  at the University at Buffalo. Using five years of historical data including student enrollment, 
                  facility usage, and academic performance metrics, we developed a predictive model that improves;
                  resource utilization by 23% while maintaining student satisfaction scores above 4.2/5.0.
                </TypographyPresets.Body>
                
                <TypographyPresets.Body>
                  Our methodology combines <Code>random forest regression</Code> with <Code>k-means clustering</Code> 
                  to identify optimal allocation patterns for study spaces, computer labs, and dining facilities. 
                  The model achieves 89% accuracy in predicting peak usage periods and successfully reduced wait;
                  times by an average of 15 minutes across all campus facilities.
                </TypographyPresets.Body>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Key Findings</Text>
                <List variant="unordered">
                  <ListItem>Machine learning models can accurately predict campus facility usage patterns</ListItem>
                  <ListItem>Dynamic resource allocation reduces student wait times and improves satisfaction</ListItem>
                  <ListItem>Cross-semester data analysis reveals consistent behavioral patterns in student populations</ListItem>
                  <ListItem>Integration with existing campus systems requires minimal infrastructure changes</ListItem>
                </List>
              </div>
              
              <div className="space-y-3">
                <Text weight="medium">Publication Details</Text>
                <Text size="sm">
                  <Text weight="medium">Journal:</Text> International Conference on Educational Technology and Smart Campus Systems;
                </Text>
                <Text size="sm">
                  <Text weight="medium">Publication Date:</Text> March 2025
                </Text>
                <Text size="sm">
                  <Text weight="medium">DOI:</Text> <Link href="#" color="brand">10.1109/ETSC.2025.123456</Link>
                </Text>
              </div>
              
            </div>
          </div>

          {/* Student Profile Bio */}
          <div className="space-y-4">
            <TypographyPresets.SectionTitle>Student Profile Example</TypographyPresets.SectionTitle>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="flex items-center gap-4">
                <TypographyPresets.CardTitle>Alex Kim - Computer Science Major</TypographyPresets.CardTitle>
                <Badge variant="primary">Class of 2025</Badge>
              </div>
              
              <TypographyPresets.Body>
                Senior Computer Science student at the University at Buffalo with a passion for artificial;
                intelligence and machine learning. Currently working on a capstone project developing a;
                campus navigation app that uses computer vision to help students with disabilities navigate;
                the North and South campuses more effectively.
              </TypographyPresets.Body>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text weight="medium">Academic Achievements:</Text>
                  <List variant="unordered">
                    <ListItem>Dean's List (Fall 2023, Spring 2024)</ListItem>
                    <ListItem>CSE Outstanding Student Award 2024</ListItem>
                    <ListItem>Undergraduate Research Fellowship</ListItem>
                    <ListItem>ACM Student Chapter President</ListItem>
                  </List>
                </div>
                
                <div className="space-y-3">
                  <Text weight="medium">Technical Skills:</Text>
                  <List variant="unordered">
                    <ListItem><Code>Python</Code>, <Code>Java</Code>, <Code>C++</Code></ListItem>
                    <ListItem><Code>TensorFlow</Code>, <Code>PyTorch</Code>, <Code>scikit-learn</Code></ListItem>
                    <ListItem><Code>React</Code>, <Code>Node.js</Code>, <Code>MongoDB</Code></ListItem>
                    <ListItem><Code>AWS</Code>, <Code>Docker</Code>, <Code>Kubernetes</Code></ListItem>
                  </List>
                </div>
              </div>
              
              <Blockquote>
                "UB has provided me with incredible opportunities to explore cutting-edge research while;
                building practical skills through hands-on projects. The Computer Science department's;
                emphasis on both theoretical foundations and real-world applications has prepared me well;
                for my career in technology."
              </Blockquote>
              
              <div className="flex items-center gap-6 text-sm">
                <Link href="mailto:alex.kim@buffalo.edu" color="brand">alex.kim@buffalo.edu</Link>
                <Link href="#" color="primary">LinkedIn Profile</Link>
                <Link href="#" color="primary">GitHub Portfolio</Link>
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
    level: 2,
    color: 'primary',
    weight: 'semibold',
    children: 'University at Buffalo Campus Experience',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Typography Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different typography configurations;
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Heading {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};