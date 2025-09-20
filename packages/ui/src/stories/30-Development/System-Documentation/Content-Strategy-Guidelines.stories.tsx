/**
 * HIVE Content Strategy Guidelines
 * Content strategy documentation for campus-first social utility communications
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import { 
  MessageSquare, 
  Users, 
  BookOpen, 
  Lightbulb, 
  Target, 
  Heart, 
  Zap, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Volume2,
  Edit3,
  FileText,
  Megaphone,
  UserCheck,
  Award,
  Clock,
  TrendingUp,
  Smile
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../../hive-tokens.css';

const meta = {
  title: '12-Content-Strategy/Guidelines',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Content Strategy Guidelines

Comprehensive content strategy for campus-first social utility communications that build community, facilitate coordination, and encourage authentic connections.

## Content Philosophy
- **Campus Authentic**: Language and tone that resonates with university social dynamics
- **Utility First**: Every piece of content serves a functional purpose
- **Community Building**: Content that strengthens connections and encourages participation
- **Inclusive Voice**: Accessible, welcoming language for diverse campus communities

## Content Pillars
1. **Community Coordination**: Helping students organize and connect
2. **Academic Support**: Content that supports educational goals
3. **Social Connection**: Facilitating meaningful relationships
4. **Campus Life Enhancement**: Making university experience better
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ContentStrategyShowcase = () => {
  const [activeSection, setActiveSection] = useState<string>('voice-tone');
  const [selectedExample, setSelectedExample] = useState<any>(null);
  const [contentAnalysis, setContentAnalysis] = useState<string>('');

  // Voice & Tone Guidelines
  const voiceGuidelines = {
    'voice-tone': {
      title: 'Voice & Tone',
      icon: Volume2,
      description: 'HIVE\'s consistent voice across all campus communications',
      guidelines: [
        {
          principle: 'Campus Friendly',
          description: 'Approachable and inclusive, like talking to a helpful classmate',
          good: [
            "Join your study group and ace that exam together! 📚",
            "Found an amazing CS study space? Share it with your coding crew!",
            "Your dorm floor is getting organized - jump in and make it happen!"
          ],
          avoid: [
            "Utilize our platform to optimize your academic performance metrics",
            "Leverage synergistic study methodologies for maximum efficiency",
            "Deploy strategic networking initiatives across dormitory ecosystems"
          ]
        },
        {
          principle: 'Purposeful & Clear',
          description: 'Direct communication that serves real campus utility',
          good: [
            "3 people need a ride to Target - who's driving?",
            "Database project due Monday. Study group forming now.",
            "Lockwood Library room 204 has great WiFi and power outlets"
          ],
          avoid: [
            "Discover amazing opportunities to connect with like-minded individuals",
            "Experience the future of collaborative academic engagement",
            "Unlock your potential through strategic social networking"
          ]
        },
        {
          principle: 'Community Focused',
          description: 'Language that builds connections and encourages participation',
          good: [
            "Sarah shared her intro psych notes - they're really helpful!",
            "Who else is struggling with organic chemistry? Let's figure it out together",
            "Floor 3 is organizing a group order from Panda Express"
          ],
          avoid: [
            "Optimize your individual learning outcomes",
            "Maximize personal productivity through strategic resource allocation",
            "Achieve superior academic performance through competitive advantages"
          ]
        }
      ]
    },
    'content-types': {
      title: 'Content Types',
      icon: FileText,
      description: 'Different content formats for various campus interactions',
      guidelines: [
        {
          principle: 'Space Descriptions',
          description: 'Clear, compelling descriptions that help students decide if a space is right for them',
          good: [
            "Weekly study sessions every Tuesday at 7pm in Lockwood Library. Come prepared with questions and we'll work through problem sets together! Perfect for CS 101-220 students.",
            "3rd floor Ellicott community chat. Share memes, coordinate laundry schedules, plan floor events, and ask for help when you need it. Your home away from home! 🏠",
            "Pre-med study group focused on organic chemistry and MCAT prep. We meet Sundays 2-5pm with snacks and serious focus. Previous members scored average 518 on MCAT."
          ],
          avoid: [
            "Comprehensive academic optimization space for educational enhancement",
            "Multi-functional community engagement platform for residential coordination",
            "High-performance academic achievement group with quantified success metrics"
          ]
        },
        {
          principle: 'Call-to-Action Copy',
          description: 'Action-oriented copy that motivates campus participation',
          good: [
            "Join Study Group",
            "Share Your Notes",
            "Coordinate Ride",
            "Plan Floor Event",
            "Find Study Buddy"
          ],
          avoid: [
            "Optimize Learning Experience",
            "Leverage Academic Resources", 
            "Maximize Networking Potential",
            "Deploy Social Strategies",
            "Activate Academic Synergies"
          ]
        },
        {
          principle: 'Notification Messages',
          description: 'Timely, relevant notifications that add value without spam',
          good: [
            "New message in CS Study Group: 'Anyone free to review linked lists tomorrow?'",
            "Floor meeting tonight at 8pm - pizza will be provided! 🍕",
            "Reminder: Organic Chem study group starts in 30 minutes in Library room 204"
          ],
          avoid: [
            "Engagement opportunity detected in your primary academic network",
            "Social coordination event scheduled for optimized participation",
            "Academic collaboration session commencing shortly - attendance recommended"
          ]
        }
      ]
    },
    'campus-context': {
      title: 'Campus Context',
      icon: Users,
      description: 'Content that reflects authentic university social dynamics',
      guidelines: [
        {
          principle: 'Academic Rhythm',
          description: 'Content that acknowledges the natural flow of academic life',
          good: [
            "Finals week survival guide: best study spots that are actually quiet",
            "Spring break is coming - who wants to split an Airbnb?",
            "Course registration opens Monday - share your professor recommendations!"
          ],
          avoid: [
            "Optimize your productivity during high-stress academic periods",
            "Strategic vacation planning for maximum social coordination",
            "Academic planning optimization through crowdsourced intelligence"
          ]
        },
        {
          principle: 'Social Dynamics',
          description: 'Understanding how students actually connect and coordinate',
          good: [
            "That awkward moment when you're the only one who didn't know about the group chat",
            "Looking for someone to split Costco bulk snacks with - serious inquiry only 😂",
            "Is it just me or does everyone seem to know about parties except me?"
          ],
          avoid: [
            "Enhance your social integration through strategic network participation",
            "Optimize group purchasing decisions through collaborative economics",
            "Maximize social information access through improved network positioning"
          ]
        },
        {
          principle: 'Campus Life Reality',
          description: 'Content that reflects real campus challenges and solutions',
          good: [
            "Dining hall closed again? Let's coordinate a group food run",
            "WiFi down in the dorms - anyone know which coffee shops have good internet?",
            "Laundry room etiquette: please don't leave your clothes in the washer for 3 hours"
          ],
          avoid: [
            "Navigate service disruptions through alternative resource coordination",
            "Optimize connectivity solutions via distributed workspace networks",
            "Implement community resource management protocols for shared facilities"
          ]
        }
      ]
    }
  };

  // Content Quality Framework
  const qualityFramework = {
    checklist: [
      { 
        category: 'Campus Relevance',
        questions: [
          'Does this solve a real campus problem?',
          'Would students actually use/need this?',
          'Does it fit into university social dynamics?'
        ]
      },
      {
        category: 'Clarity & Utility', 
        questions: [
          'Is the purpose immediately clear?',
          'Can students take action based on this?',
          'Does it reduce confusion or increase it?'
        ]
      },
      {
        category: 'Community Building',
        questions: [
          'Does this encourage positive connections?',
          'Is it inclusive and welcoming?',
          'Does it strengthen campus community?'
        ]
      }
    ],
    examples: {
      excellent: {
        title: 'Excellent Campus Content',
        examples: [
          {
            content: "CS 220 project partners needed! I'm working on the social media analyzer and looking for someone strong in API integration. Meet for coffee this week?",
            why: 'Specific need, clear skill requirement, friendly invitation to connect'
          },
          {
            content: "Ellicott 3rd floor group grocery run to Wegmans Sunday 2pm. Split gas & parking. Sign up in comments with what you need!",
            why: 'Practical solution, clear logistics, easy participation method'
          },
          {
            content: "Free tutoring for intro calculus - I'm a math major and love helping! Tuesdays/Thursdays 6-8pm in math lounge. Just show up!",
            why: 'Generous offer, establishes credibility, removes barriers to participation'
          }
        ]
      },
      needs_work: {
        title: 'Content That Needs Improvement',
        examples: [
          {
            content: "Leverage cross-functional collaboration opportunities to optimize your academic performance trajectory through strategic peer networking initiatives.",
            why: 'Corporate jargon, unclear purpose, intimidating language'
          },
          {
            content: "Join our exclusive high-performance study ecosystem designed for academic excellence maximization.",
            why: 'Exclusionary tone, buzzwords, focuses on optimization over community'
          },
          {
            content: "Deploy synergistic learning methodologies through our innovative campus engagement platform.",
            why: 'Meaningless buzzwords, no clear value proposition, sounds like marketing copy'
          }
        ]
      }
    }
  };

  // Content Templates
  const contentTemplates = [
    {
      category: 'Study Group Formation',
      template: '[Course] study group forming! We meet [when] in [where] to work on [what]. Looking for [number] more people who are [qualities]. [Contact method]',
      example: 'CS 101 study group forming! We meet Tuesdays 7pm in Lockwood Library room 204 to work through programming assignments. Looking for 2 more people who are committed to showing up consistently. Message me!'
    },
    {
      category: 'Resource Sharing',
      template: 'Has anyone [problem/need]? I have [solution/resource] and would love to share/trade for [what you need].',
      example: 'Has anyone struggled with organic chemistry? I have last year\'s study guides and practice exams from Professor Chen and would love to share them!'
    },
    {
      category: 'Event Coordination',
      template: '[Event type] happening [when] at [where]! We\'ll be [activity] and need [what you need from participants]. [How to join/RSVP]',
      example: 'Floor pizza night happening Friday 8pm in the lounge! We\'ll be watching Netflix and hanging out and need everyone to chip in $5. Reply with your topping preference!'
    },
    {
      category: 'Community Problem Solving',
      template: 'Anyone else dealing with [shared problem]? I found [solution/workaround] that might help. [Details and how to implement]',
      example: 'Anyone else dealing with spotty WiFi in Governors? I found that connecting to "UB-Secure" instead of "UB-Guest" gives much better speeds. Just use your UB credentials!'
    }
  ];

  // Interactive Content Analyzer
  const analyzeContent = (text: string) => {
    const criteria = [
      {
        name: 'Campus Relevant',
        check: (text: string) => 
          /study|class|dorm|campus|library|dining|group|project|exam|professor/i.test(text),
        weight: 30
      },
      {
        name: 'Clear & Actionable', 
        check: (text: string) =>
          /join|meet|help|need|looking|share|coordinate/i.test(text) && text.length < 200,
        weight: 25
      },
      {
        name: 'Community Focused',
        check: (text: string) =>
          /we|us|together|anyone|everyone|group|community|floor|dorm/i.test(text),
        weight: 25
      },
      {
        name: 'Natural Language',
        check: (text: string) =>
          !/optimize|leverage|synergy|maximize|strategic|deploy|utilize/i.test(text),
        weight: 20
      }
    ];

    return criteria.map(criterion => ({
      ...criterion,
      passed: criterion.check(text)
    })})
  };

  const ContentExample = ({ example, type }: { example: any; type: 'good' | 'avoid' }) => (
    <motion.div
      className={`p-4 rounded-lg border-l-4 ${
        type === 'good' 
          ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' 
          : 'border-l-red-500 bg-red-50 dark:bg-red-900/20'
      }`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-start space-x-3">
        {type === 'good' ? (
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium mb-1" style={{ 
            color: type === 'good' ? 'var(--hive-status-success)' : 'var(--hive-status-error)'
          }}>
            {type === 'good' ? 'Good Example' : 'Avoid This'}
          </p>
          {typeof example === 'string' ? (
            <p className="text-sm" style={{ color: 'var(--hive-text-primary)' }}>
              "{example}"
            </p>
          ) : (
            <>
              <p className="text-sm mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                "{example.content}"
              </p>
              <p className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                Why: {example.why}
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-8" style={{ 
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 hive-interactive p-2"
                 style={{ 
                   backgroundColor: 'var(--hive-background-tertiary)',
                   border: '1px solid var(--hive-border-gold)'
                 }}>
              <MessageSquare className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              Content Strategy
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Campus-first content guidelines for authentic social utility communications that build community and facilitate meaningful connections.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">Campus Authentic</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Community Building</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Utility First</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Inclusive Voice</Badge>
          </div>
        </motion.div>

        {/* Section Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-3">
            {Object.entries(voiceGuidelines).map(([key, section]) => {
              const IconComponent = section.icon;
              const isActive = activeSection === key;
              return (
                <Button
                  key={key}
                  variant={isActive ? "default" : "outline"}
                  size="lg"
                  className="hive-interactive"
                  style={isActive ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)',
                    borderColor: 'var(--hive-border-gold)'
                  } : {
                    borderColor: 'var(--hive-border-primary)',
                    color: 'var(--hive-text-secondary)'
                  }}
                  onClick={() => setActiveSection(key)}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {section.title}
                </Button>
              )
            })}
            <Button
              variant={activeSection === 'templates' ? "default" : "outline"}
              size="lg"
              className="hive-interactive"
              style={activeSection === 'templates' ? {
                backgroundColor: 'var(--hive-brand-primary)',
                color: 'var(--hive-text-inverse)',
                borderColor: 'var(--hive-border-gold)'
              } : {
                borderColor: 'var(--hive-border-primary)',
                color: 'var(--hive-text-secondary)'
              }}
              onClick={() => setActiveSection('templates')}
            >
              <Edit3 className="w-5 h-5 mr-2" />
              Templates
            </Button>
            <Button
              variant={activeSection === 'analyzer' ? "default" : "outline"}
              size="lg"
              className="hive-interactive"
              style={activeSection === 'analyzer' ? {
                backgroundColor: 'var(--hive-brand-primary)',
                color: 'var(--hive-text-inverse)',
                borderColor: 'var(--hive-border-gold)'
              } : {
                borderColor: 'var(--hive-border-primary)',
                color: 'var(--hive-text-secondary)'
              }}
              onClick={() => setActiveSection('analyzer')}
            >
              <Target className="w-5 h-5 mr-2" />
              Content Analyzer
            </Button>
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {Object.keys(voiceGuidelines).includes(activeSection) && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                    {React.createElement(voiceGuidelines[activeSection as keyof typeof voiceGuidelines].icon, { className: "w-6 h-6 mr-2" })
                    {voiceGuidelines[activeSection as keyof typeof voiceGuidelines].title}
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    {voiceGuidelines[activeSection as keyof typeof voiceGuidelines].description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {voiceGuidelines[activeSection as keyof typeof voiceGuidelines].guidelines.map((guideline, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-6"
                      >
                        <div>
                          <h4 className="font-medium text-lg mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                            {guideline.principle}
                          </h4>
                          <p className="text-sm mb-6" style={{ color: 'var(--hive-text-muted)' }}>
                            {guideline.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h5 className="font-medium text-sm" style={{ color: 'var(--hive-status-success)' }}>
                              ✓ Good Examples
                            </h5>
                            {guideline.good.map((example, idx) => (
                              <ContentExample key={idx} example={example} type="good" />
                            ))}
                          </div>

                          <div className="space-y-4">
                            <h5 className="font-medium text-sm" style={{ color: 'var(--hive-status-error)' }}>
                              ✗ Avoid These
                            </h5>
                            {guideline.avoid.map((example, idx) => (
                              <ContentExample key={idx} example={example} type="avoid" />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    Content Templates
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Proven templates for common campus content scenarios
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {contentTemplates.map((template, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-lg border"
                        style={{
                          backgroundColor: 'var(--hive-background-secondary)',
                          borderColor: 'var(--hive-border-primary)'
                        }}
                      >
                        <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                          {template.category}
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--hive-text-secondary)' }}>
                              Template:
                            </h5>
                            <div className="p-3 rounded-lg font-mono text-sm"
                                 style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-muted)' }}>
                              {template.template}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--hive-text-secondary)' }}>
                              Example:
                            </h5>
                            <div className="p-3 rounded-lg border-l-4 border-l-green-500"
                                 style={{ backgroundColor: 'var(--hive-overlay-success-subtle)' }}>
                              <p className="text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                                "{template.example}"
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeSection === 'analyzer' && (
            <motion.div
              key="analyzer"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="hive-glass border border-gray-700">
                <CardHeader>
                  <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                    Interactive Content Analyzer
                  </CardTitle>
                  <p style={{ color: 'var(--hive-text-muted)' }}>
                    Test your content against HIVE's campus content guidelines
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                        Enter content to analyze:
                      </label>
                      <Textarea
                        placeholder="Try: 'CS 220 study group forming! We meet Tuesdays 7pm in library room 204 to work through programming assignments. Looking for 2 more committed people. Message me!'"
                        value={contentAnalysis}
                        onChange={(e) => setContentAnalysis(e.target.value)}
                        className="min-h-24"
                        style={{
                          backgroundColor: 'var(--hive-background-secondary)',
                          borderColor: 'var(--hive-border-primary)',
                          color: 'var(--hive-text-primary)'
                        }}
                      />
                    </div>

                    {contentAnalysis.length > 10 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                          Analysis Results:
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {analyzeContent(contentAnalysis).map((result, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className={`p-4 rounded-lg border ${
                                result.passed ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {result.passed ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                )}
                                <span className="font-medium text-sm" style={{
                                  color: result.passed ? 'var(--hive-status-success)' : 'var(--hive-status-error)'
                                }}>
                                  {result.name}
                                </span>
                                <Badge style={{
                                  backgroundColor: result.passed ? 'var(--hive-status-success)' : 'var(--hive-status-error)',
                                  color: 'white'
                                }}>
                                  {result.weight}%
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <h5 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                            Overall Score:
                          </h5>
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              {(() => {
                                const results = analyzeContent(contentAnalysis);
                                const score = results.reduce((acc, result) => 
                                  acc + (result.passed ? result.weight : 0), 0
                                );
                                const color = score >= 80 ? 'var(--hive-status-success)' : 
                                            score >= 60 ? 'var(--hive-status-warning)' : 
                                            'var(--hive-status-error)';
                                
                                return (
                                  <>
                                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                                      <motion.div
                                        className="h-3 rounded-full"
                                        style={{ backgroundColor: color }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                      />
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span style={{ color: 'var(--hive-text-muted)' }}>
                                        {score}% Campus Content Score
                                      </span>
                                      <span style={{ color }}>
                                        {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good' : 'Needs Work'}
                                      </span>
                                    </div>
                                  </>
                                )
                              })}()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quality Framework */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Content Quality Framework
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Questions to ask before publishing any campus content
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                    Content Quality Checklist
                  </h4>
                  {qualityFramework.checklist.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--hive-background-secondary)' }}
                    >
                      <h5 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                        {category.category}
                      </h5>
                      <ul className="space-y-2">
                        {category.questions.map((question, idx) => (
                          <li key={idx} className="flex items-start text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                            <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                                 style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h4 className="font-medium" style={{ color: 'var(--hive-text-primary)' }}>
                    Quality Examples
                  </h4>
                  
                  {Object.entries(qualityFramework.examples).map(([key, section]) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + Object.keys(qualityFramework.examples).indexOf(key) * 0.1 }}
                      className="space-y-4"
                    >
                      <h5 className="font-medium" style={{ 
                        color: key === 'excellent' ? 'var(--hive-status-success)' : 'var(--hive-status-warning)'
                      }}>
                        {section.title}
                      </h5>
                      
                      {section.examples.map((example, idx) => (
                        <ContentExample 
                          key={idx} 
                          example={example} 
                          type={key === 'excellent' ? 'good' : 'avoid'} 
                        />
                      ))}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Guidelines */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Implementation Guidelines
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Practical steps for implementing campus content strategy across HIVE
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Content Review Process
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Run content through quality framework checklist
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Test with diverse campus community members
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Verify mobile readability and scan-ability
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Check for inclusive, welcoming language
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Team Training
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Regular voice & tone workshops with current students
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Content audit sessions for existing materials
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Campus immersion for non-student team members
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Template library maintenance and updates
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Success Metrics
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Content engagement rates (likes, comments, shares)
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Action completion rates (joining, participating)
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Student feedback on content helpfulness
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Community growth and retention metrics
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Continuous Improvement
                    </h4>
                    <div className="p-4 rounded-lg"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>
                      <div className="text-sm space-y-2" style={{ color: 'var(--hive-text-muted)' }}>
                        <p>• Monthly content performance reviews</p>
                        <p>• Quarterly student focus groups</p>
                        <p>• Seasonal campus context updates</p>
                        <p>• Annual voice & tone evolution</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
};

export const ContentStrategyGuidelines: Story = {
  render: () => <ContentStrategyShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};