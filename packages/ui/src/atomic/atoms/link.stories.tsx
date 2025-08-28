import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './link';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { Icon } from './icon';
import { ExternalLink, ArrowRight, Download, Mail, Phone, Globe } from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof Link> = {
  title: '01-Atoms/Link - COMPLETE DEFINITION',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Link - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated link system for University at Buffalo campus navigation and external resource access.

### 🏆 **COMPONENT EXCELLENCE**
- **4 Visual Variants** - Default, ghost, underline, button for different link contexts
- **3 Size Options** - Small, medium, large for flexible typography integration
- **4 Semantic Colors** - Primary, secondary, gold, muted for consistent brand expression
- **External Link Support** - Automatic external link indicators and security attributes
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and interactions
- **Smart Accessibility** - Proper ARIA attributes, focus states, and screen reader support
- **Campus Navigation Ready** - Optimized for UB internal and external link patterns

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo navigation and resource linking:
- **Academic Links** - Course catalogs, enrollment systems, academic calendars
- **Campus Services** - Dining, housing, library, recreation, transportation
- **Administrative Resources** - Student services, financial aid, registrar, career center
- **External Partners** - Academic databases, research tools, partner institutions
- **Social Features** - Profile links, messaging, group coordination
- **Mobile Navigation** - Touch-friendly links for mobile campus access

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Appropriate target sizes for mobile interaction
- **Clear Visual Feedback** - Distinct hover and active states for mobile browsers
- **Accessible Focus** - Keyboard navigation support with visible focus indicators
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'underline', 'button'],
      description: 'Link visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Link size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gold', 'muted'],
      description: 'Link color using semantic tokens',
    },
    external: {
      control: 'boolean',
      description: 'External link with indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    href: {
      control: 'text',
      description: 'Link destination URL',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

// Default link showcase
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    external: false,
    disabled: false,
    href: 'https://buffalo.edu',
    children: 'University at Buffalo',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Visit the official{' '}
            <Link {...args} />
            {' '}website for more information.
          </Text>
          <Text variant="body-sm" color="secondary">
            Default link styling for University at Buffalo navigation
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎭 VARIANTS</Badge>
            Link Variants - Navigation Styles
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visual variants for different link contexts and user interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Standard Links:</Text>
                  <div className="space-y-2">
                    <div>
                      <Link variant="primary" href="https://buffalo.edu">University at Buffalo Homepage</Link>
                    </div>
                    <div>
                      <Link variant="primary" href="https://registrar.buffalo.edu">Academic Records</Link>
                    </div>
                    <div>
                      <Link variant="primary" href="https://buffalo.edu/campus-life">Campus Life</Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">With External Indicators:</Text>
                  <div className="space-y-2">
                    <div>
                      <Link variant="primary" href="https://scholar.google.com" external>Google Scholar</Link>
                    </div>
                    <div>
                      <Link variant="primary" href="https://github.com" external>GitHub</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Ghost Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Subtle Navigation:</Text>
                  <div className="space-y-2">
                    <div>
                      <Link variant="ghost" href="/courses">Browse Courses</Link>
                    </div>
                    <div>
                      <Link variant="ghost" href="/schedule">My Schedule</Link>
                    </div>
                    <div>
                      <Link variant="ghost" href="/grades">View Grades</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Underline Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Inline Text Links:</Text>
                  <Text variant="body-md" color="primary">
                    Students can access their academic records through the{' '}
                    <Link variant="underline" href="/student-portal">Student Portal</Link>
                    {' '}or contact the{' '}
                    <Link variant="underline" href="/registrar">Office of the Registrar</Link>
                    {' '}for assistance with enrollment questions.
                  </Text>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Button Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Call-to-Action Links:</Text>
                  <div className="flex flex-wrap gap-3">
                    <Link variant="button" href="/register">Register for Courses</Link>
                    <Link variant="button" href="/apply">Apply Now</Link>
                    <Link variant="button" href="/visit">Schedule Campus Visit</Link>
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
            Link Sizes - Typography Integration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for seamless integration with different text contexts and hierarchy levels
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Comparison:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (sm):</Text>
                  <div className="space-y-2">
                    <Text variant="body-sm" color="primary">
                      See{' '}<Link size="sm" href="/terms">Terms of Service</Link>{' '}for details.
                    </Text>
                    <div className="flex gap-3">
                      <Link size="sm" variant="button" href="/help">Help</Link>
                      <Link size="sm" variant="ghost" href="/support">Support</Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (md - default):</Text>
                  <div className="space-y-2">
                    <Text variant="body-md" color="primary">
                      Access your{' '}<Link size="md" href="/dashboard">Academic Dashboard</Link>{' '}here.
                    </Text>
                    <div className="flex gap-3">
                      <Link size="md" variant="button" href="/courses">Browse Courses</Link>
                      <Link size="md" variant="ghost" href="/calendar">View Calendar</Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (lg):</Text>
                  <div className="space-y-2">
                    <Text variant="body-lg" color="primary">
                      Welcome to{' '}<Link size="lg" href="/">HIVE</Link>{' '}at University at Buffalo.
                    </Text>
                    <div className="flex gap-3">
                      <Link size="lg" variant="button" href="/get-started">Get Started</Link>
                      <Link size="lg" variant="ghost" href="/learn-more">Learn More</Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Color Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎨 COLORS</Badge>
            Link Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 semantic colors for consistent brand expression and visual hierarchy
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Hierarchy Colors:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Primary:</Text>
                  <Link color="primary" href="/academics">Academic Programs</Link>
                </div>
                
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Secondary:</Text>
                  <Link color="secondary" href="/resources">Additional Resources</Link>
                </div>
                
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Muted:</Text>
                  <Link color="muted" href="/archive">Archived Content</Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Brand Colors:</h4>
              
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Gold (HIVE Brand):</Text>
                  <Link color="gold" href="/featured">Featured Content</Link>
                </div>
                
                <div>
                  <Text variant="body-sm" color="gold" weight="medium">Button Variants:</Text>
                  <div className="flex gap-2">
                    <Link variant="button" color="primary" href="/action">Primary Action</Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔗 EXTERNAL</Badge>
            External Links - Security & Indicators
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Automatic external link handling with security attributes and visual indicators
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">External Link Examples:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Resources:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://scholar.google.com" external>Google Scholar</Link></div>
                    <div><Link href="https://pubmed.ncbi.nlm.nih.gov" external>PubMed</Link></div>
                    <div><Link href="https://www.jstor.org" external>JSTOR</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">University Partners:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://www.suny.edu" external>SUNY System</Link></div>
                    <div><Link href="https://www.aau.edu" external>Association of American Universities</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Tools:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://github.com" external>GitHub</Link></div>
                    <div><Link href="https://stackoverflow.com" external>Stack Overflow</Link></div>
                    <div><Link href="https://linkedin.com" external>LinkedIn</Link></div>
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
            Link States - Interactive Feedback
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete interactive state system for accessible and responsive link behavior
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive States:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Normal State:</Text>
                  <Link href="/normal">Standard Link Appearance</Link>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Hover State (hover over links):</Text>
                  <Link href="/hover">Hover for Color Change</Link>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Focus State (tab to focus):</Text>
                  <Link href="/focus">Tab to See Focus Ring</Link>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled State:</Text>
                  <Link disabled>Disabled Link Example</Link>
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
            Real Campus Link Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Link usage in actual University at Buffalo academic and administrative contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Quick Academic Links
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Enrollment:</Text>
                    <div className="space-y-2">
                      <div><Link href="/register">Course Registration</Link></div>
                      <div><Link href="/schedule">View Class Schedule</Link></div>
                      <div><Link href="/waitlist">Manage Waitlists</Link></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Records:</Text>
                    <div className="space-y-2">
                      <div><Link href="/grades">Current Grades</Link></div>
                      <div><Link href="/transcript">Official Transcript</Link></div>
                      <div><Link href="/degree-audit">Degree Audit</Link></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Campus Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Services:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Life:</Text>
                  <div className="space-y-2">
                    <div><Link href="/dining">Dining Services</Link></div>
                    <div><Link href="/housing">Housing Portal</Link></div>
                    <div><Link href="/activities">Student Activities</Link></div>
                    <div><Link href="/recreation">Recreation Center</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Support:</Text>
                  <div className="space-y-2">
                    <div><Link href="/library" external>University Libraries</Link></div>
                    <div><Link href="/tutoring">Tutoring Center</Link></div>
                    <div><Link href="/writing-center">Writing Center</Link></div>
                    <div><Link href="/accessibility">Accessibility Services</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Career & Financial:</Text>
                  <div className="space-y-2">
                    <div><Link href="/career-services">Career Services</Link></div>
                    <div><Link href="/financial-aid">Financial Aid</Link></div>
                    <div><Link href="/bursar">Student Accounts</Link></div>
                    <div><Link href="/scholarships">Scholarships</Link></div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Course Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Information Display:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 - Algorithm Analysis and Design
                </Text>
                
                <Text variant="body-md" color="primary">
                  This course provides an introduction to the design and analysis of algorithms. 
                  Students will learn fundamental algorithmic paradigms and complexity analysis techniques.
                </Text>
                
                <div className="flex flex-wrap gap-4">
                  <Link variant="button" href="/enroll/cse331">Enroll Now</Link>
                  <Link variant="ghost" href="/syllabus/cse331">View Syllabus</Link>
                  <Link variant="underline" href="/prerequisites/cse331">Check Prerequisites</Link>
                </div>
                
                <div className="space-y-2">
                  <Text variant="body-sm" color="secondary">
                    Related Resources:
                  </Text>
                  <div className="flex flex-wrap gap-4">
                    <Link href="https://algo.buffalo.edu" external size="sm">Course Website</Link>
                    <Link href="https://piazza.com/buffalo/spring2024/cse331" external size="sm">Piazza Discussion</Link>
                    <Link href="https://autolab.buffalo.edu" external size="sm">Assignment Portal</Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Emergency & Important Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Emergency & Important Links:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Emergency Services:</Text>
                  <div className="space-y-2">
                    <div><Link href="tel:716-645-2222" color="ruby">UB Emergency: (716) 645-2222</Link></div>
                    <div><Link href="/safety">Campus Safety</Link></div>
                    <div><Link href="/health-services">Student Health Services</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Contact:</Text>
                  <div className="space-y-2">
                    <div><Link href="mailto:registrar@buffalo.edu">
                      <Icon icon={Mail} size="sm" className="inline mr-1" />
                      Registrar Office
                    </Link></div>
                    <div><Link href="tel:716-645-8900">
                      <Icon icon={Phone} size="sm" className="inline mr-1" />
                      Student Services
                    </Link></div>
                    <div><Link href="https://buffalo.edu" external>
                      <Icon icon={Globe} size="sm" className="inline mr-1" />
                      UB Homepage
                    </Link></div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* External Academic Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">External Academic Resources:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Access these external resources for enhanced academic research and collaboration:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research Tools:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://scholar.google.com" external>Google Scholar</Link></div>
                    <div><Link href="https://www.jstor.org" external>JSTOR Academic Papers</Link></div>
                    <div><Link href="https://pubmed.ncbi.nlm.nih.gov" external>PubMed Health Sciences</Link></div>
                    <div><Link href="https://arxiv.org" external>arXiv Preprints</Link></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Development Tools:</Text>
                  <div className="space-y-2">
                    <div><Link href="https://github.com" external>GitHub</Link></div>
                    <div><Link href="https://stackoverflow.com" external>Stack Overflow</Link></div>
                    <div><Link href="https://replit.com" external>Replit Online IDE</Link></div>
                    <div><Link href="https://colab.research.google.com" external>Google Colab</Link></div>
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

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'md',
    color: 'primary',
    external: false,
    disabled: false,
    href: 'https://buffalo.edu',
    children: 'University at Buffalo',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Link Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different link configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Text variant="body-md" color="primary">
              Click to visit: <Link {...args} />
            </Text>
            <Text variant="body-sm" color="secondary">
              Interactive link testing for University at Buffalo navigation patterns
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};