import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  Plus, Users, Calendar, FileText, MessageSquare, DollarSign, 
  MapPin, Clock, Star, Zap, Settings, Eye, Copy, Share2,
  Layers, Code, Puzzle, Wrench, Lightbulb, ArrowRight,
  CheckCircle, Play, Pause, RotateCcw, Download;
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';

const meta: Meta = {
  title: '03-Molecules/Creation-Components/HiveLAB Element System',
  parameters: {
    docs: {
      description: {
        component: `
# HiveLAB Element System;
The core creation system for University at Buffalo students to build exactly what their communities need. HiveLAB provides powerful building blocks (Elements) that students combine to create custom coordination tools, eliminating the need for pre-built "utility" tools that students won't use.

## Creation-First Philosophy;
- **Student Agency** - Students build exactly what their communities need, not what we think they need;
- **Real Problems** - Tools exist because they solve actual coordination challenges in spaces;
- **Community Spread** - Successful tools spread organically because they work, not because they're promoted;
- **Authentic Network Effects** - Natural adoption driven by proven value;
## Element Categories;
- **Coordination Elements** - Sign-ups, scheduling, polling, resource sharing;
- **Communication Elements** - Announcements, discussions, notifications, status updates;
- **Data Elements** - Collection forms, surveys, feedback systems, member tracking;
- **Action Elements** - Payments, reservations, task assignments, workflow triggers;
## Creation Flow;
1. **Need Identification** - Space leader identifies coordination challenge;
2. **Element Selection** - Browse library of building blocks with clear use cases;
3. **Tool Assembly** - Combine elements using visual interface;
4. **Community Testing** - Deploy in space for immediate feedback;
5. **Organic Spread** - Working tools get installed by other spaces;
## Success Metrics;
- **Tools Actually Used** - Real engagement, not just creation;
- **Community Adoption** - How many spaces install successful tools;
- **Problem Resolution** - Whether tools solve the coordination challenges they target;
- **Creator Satisfaction** - Students proud of what they built;
## Anti-Patterns Avoided;
- ❌ Pre-built "useful" tools (GPA calculators, generic schedulers)
- ❌ Marketplace promotion of unused features;
- ❌ Complex tool categories and artificial hierarchies;
- ❌ Top-down decisions about what students "should" want;
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Element Library Data;
const elementLibrary = {
  coordination: [
    {
      id: 'signup-sheet',
      name: 'Sign-up Sheet',
      description: 'Collect names for events, activities, time slots',
      icon: Users,
      useCases: ['Event registration', 'Study session planning', 'Potluck coordination'],
      complexity: 'Simple',
      popularity: 94,
      recentUse: 'Ellicott Floor Movie Night'
    },
    {
      id: 'scheduling-poll',
      name: 'Scheduling Poll', 
      description: 'Find times that work for everyone',
      icon: Calendar,
      useCases: ['Group meeting times', 'Study sessions', 'Social events'],
      complexity: 'Simple',
      popularity: 87,
      recentUse: 'CSE 474 Study Group'
    },
    {
      id: 'resource-sharing',
      name: 'Resource Pool',
      description: 'Share and track community resources',
      icon: Layers,
      useCases: ['Textbook lending', 'Equipment sharing', 'Ride coordination'],
      complexity: 'Medium',
      popularity: 73,
      recentUse: 'Psychology Research Lab'
    }
  ],
  communication: [
    {
      id: 'announcement-board',
      name: 'Announcement Board',
      description: 'Important updates with read tracking',
      icon: MessageSquare,
      useCases: ['Policy updates', 'Event announcements', 'Emergency notices'],
      complexity: 'Simple',
      popularity: 91,
      recentUse: 'Entrepreneurship Club'
    },
    {
      id: 'notification-system',
      name: 'Smart Notifications',
      description: 'Targeted alerts based on member preferences',
      icon: Star,
      useCases: ['Deadline reminders', 'Event updates', 'Activity alerts'],
      complexity: 'Medium',
      popularity: 82,
      recentUse: 'Business Student Association'
    }
  ],
  data: [
    {
      id: 'feedback-collector',
      name: 'Feedback Collector',
      description: 'Gather input and suggestions from community',
      icon: FileText,
      useCases: ['Event feedback', 'Improvement suggestions', 'Anonymous reports'],
      complexity: 'Simple',
      popularity: 79,
      recentUse: 'UB Women in CS'
    },
    {
      id: 'member-tracker',
      name: 'Member Tracker',
      description: 'Track participation and engagement',
      icon: Eye,
      useCases: ['Attendance tracking', 'Participation metrics', 'Member recognition'],
      complexity: 'Medium',
      popularity: 68,
      recentUse: 'Robotics Club'
    }
  ],
  action: [
    {
      id: 'payment-collector',
      name: 'Payment Collector',
      description: 'Collect money for group activities',
      icon: DollarSign,
      useCases: ['Event fees', 'Food orders', 'Equipment purchases'],
      complexity: 'Medium',
      popularity: 85,
      recentUse: 'Floor Pizza Orders'
    },
    {
      id: 'location-coordinator',
      name: 'Location Coordinator',
      description: 'Manage spaces and meeting locations',
      icon: MapPin,
      useCases: ['Room booking', 'Location sharing', 'Meeting coordination'],
      complexity: 'Simple',
      popularity: 77,
      recentUse: 'Engineering Study Groups'
    }
  ]
};

// Student-Created Tools Data;
const studentTools = [
  {
    id: 'potluck-coordinator',
    name: 'Potluck Coordinator',
    creator: 'Alex Rivera - Ellicott Floor 3',
    description: 'Complete potluck management with sign-ups, payments, and logistics',
    elements: ['Sign-up Sheet', 'Payment Collector', 'Notification System'],
    spaces: 12,
    installations: 47,
    rating: 4.8,
    lastWeek: '+6 installations',
    category: 'Social Events',
    problem: 'Organizing floor potlucks was chaotic - no one knew who was bringing what, collecting money was awkward, people forgot about events.',
    solution: 'Combined sign-up tracking with payment collection and smart reminders. Now potlucks run themselves.',
    impact: 'Floor events went from 30% participation to 85%. Other floors started copying the system.'
  },
  {
    id: 'textbook-exchange',
    name: 'Textbook Exchange',
    creator: 'Maria Santos - Psychology Research',
    description: 'Peer textbook lending with availability tracking and reminders',
    elements: ['Resource Pool', 'Member Tracker', 'Notification System'],
    spaces: 8,
    installations: 23,
    rating: 4.6,
    lastWeek: '+3 installations',
    category: 'Academic',
    problem: 'Students were asking about textbooks in chat but no one could track who had what available.',
    solution: 'Created a system where students list available books, others can request them, automatic reminders to return.',
    impact: 'Saved students $2000+ in textbook costs this semester. Reduced "anyone have X book?" messages by 90%.'
  },
  {
    id: 'study-session-planner',
    name: 'Study Session Planner',
    creator: 'David Kim - CSE 474 Group',
    description: 'Find optimal study times and automatically book study rooms',
    elements: ['Scheduling Poll', 'Location Coordinator', 'Announcement Board'],
    spaces: 15,
    installations: 89,
    rating: 4.9,
    lastWeek: '+12 installations',
    category: 'Academic',
    problem: 'Coordinating study sessions took forever - polling for times, finding rooms, remembering to announce location.',
    solution: 'One tool that polls availability, books the room, and notifies everyone with location details.',
    impact: 'Study sessions went from taking 3 days to coordinate to 30 minutes. Group study frequency increased 3x.'
  }
];

// Element Library Story;
export const ElementLibraryBrowser: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = React.useState('coordination');
    const [selectedElement, setSelectedElement] = React.useState<string | null>(null);

    const categories = [
      { id: 'coordination', label: 'Coordination', icon: Users, count: 3 },
      { id: 'communication', label: 'Communication', icon: MessageSquare, count: 2 },
      { id: 'data', label: 'Data Collection', icon: FileText, count: 2 },
      { id: 'action', label: 'Actions', icon: Zap, count: 2 }
    ];

    const elements = elementLibrary[selectedCategory as keyof typeof elementLibrary] || [];

    return (
      <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">HiveLAB Element Library</h2>
          <p className="text-lg text-gray-600">Building blocks for campus coordination tools</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Element Categories</CardTitle>
                <CardDescription>Choose your building blocks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button;
                      key={category.id}}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id;
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <div className="flex-1">
                        <p className="font-medium">{category.label}</p>
                        <p className={`text-sm ${
                          selectedCategory === category.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {category.count} elements;
                        </p>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="text-center">
                  <Lightbulb className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 mb-1">Need Something New?</p>
                  <p className="text-xs text-gray-600 mb-3">Suggest new elements based on real coordination challenges</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Suggest Element;
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Elements Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {elements.map((element) => {
                const IconComponent = element.icon;
                const isSelected = selectedElement === element.id;
                
                return (
                  <Card;
                    key={element.id} }
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedElement(isSelected ? null : element.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{element.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {element.complexity}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Star className="h-3 w-3 fill-current text-yellow-500" />
                                <span>{element.popularity}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-600 mb-4">{element.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Common Use Cases</p>
                          <div className="flex flex-wrap gap-1">
                            {element.useCases.map((useCase, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {useCase}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Recently used in:</span>
                          <span className="font-medium">{element.recentUse}</span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">
                              <Play className="h-4 w-4 mr-2" />
                              Add to Tool;
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Code className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

// Student-Created Tools Story;
export const StudentCreatedTools: Story = {
  render: () => {
    const [selectedTool, setSelectedTool] = React.useState<string | null>(null);
    const [filter, setFilter] = React.useState('all');

    const filters = [
      { id: 'all', label: 'All Tools', count: studentTools.length },
      { id: 'trending', label: 'Trending', count: 2 },
      { id: 'academic', label: 'Academic', count: 2 },
      { id: 'social', label: 'Social Events', count: 1 }
    ];

    const filteredTools = studentTools.filter(tool => {
      if (filter === 'all') return true;
      if (filter === 'trending') return tool.installations > 50;
      if (filter === 'academic') return tool.category === 'Academic';
      if (filter === 'social') return tool.category === 'Social Events';
      return true;
    })};

    return (
      <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Student-Created Solutions</h2>
          <p className="text-lg text-gray-600">Tools built by UB students that actually work</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {filters.map((filterOption) => (
            <button;
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterOption.id;
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredTools.map((tool) => {
            const isExpanded = selectedTool === tool.id;
            
            return (
              <Card;
                key={tool.id}}
                className={`overflow-hidden transition-all cursor-pointer ${
                  isExpanded ? 'ring-2 ring-green-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTool(isExpanded ? null : tool.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Puzzle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{tool.name}</CardTitle>
                          <p className="text-sm text-gray-600">by {tool.creator}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{tool.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />
                          <span>{tool.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{tool.installations} installations</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{tool.spaces} spaces</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {tool.lastWeek}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Install;
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Problem & Solution */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">The Problem</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{tool.problem}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">The Solution</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{tool.solution}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                          <p className="text-green-700 text-sm font-medium leading-relaxed">{tool.impact}</p>
                        </div>
                      </div>
                      
                      {/* Technical Details */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Elements Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {tool.elements.map((element, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Layers className="h-3 w-3 mr-1" />
                                {element}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Active In Spaces</h4>
                          <div className="space-y-2">
                            {[
                              'Ellicott Floor 3',
                              'CSE Study Groups', 
                              'Business Student Association',
                              `+${tool.spaces - 3} more spaces`
                            ].slice(0, tool.spaces > 3 ? 4 : tool.spaces).map((space, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-1 h-1 bg-green-600 rounded-full" />
                                <span>{space}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <Download className="h-4 w-4 mr-2" />
                            Install in Your Space;
                          </Button>
                          <p className="text-xs text-gray-500 text-center mt-2">
                            Free installation • Customizable for your community;
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
          <h4 className="font-semibold text-emerald-900 mb-2">How Student Tools Spread</h4>
          <ul className="text-sm text-emerald-800 space-y-1">
            <li>• Students solve real coordination problems in their spaces</li>
            <li>• Other space leaders see tools working and request installation</li>
            <li>• Tools evolve based on feedback from multiple communities</li>
            <li>• Successful solutions become campus standards organically</li>
          </ul>
        </div>
      </div>
    )
  }
};

// Tool Creation Interface Story;
export const ToolCreationInterface: Story = {
  render: () => {
    const [selectedElements, setSelectedElements] = React.useState<string[]>([]);
    const [toolName, setToolName] = React.useState('');
    const [creationStep, setCreationStep] = React.useState(1);

    const availableElements = [
      { id: 'signup', name: 'Sign-up Sheet', icon: Users, description: 'Collect participant names and details' },
      { id: 'poll', name: 'Scheduling Poll', icon: Calendar, description: 'Find times that work for everyone' },
      { id: 'payment', name: 'Payment Collector', icon: DollarSign, description: 'Collect money for activities' },
      { id: 'notifications', name: 'Smart Notifications', icon: Star, description: 'Send targeted alerts to members' },
      { id: 'feedback', name: 'Feedback Collector', icon: FileText, description: 'Gather input and suggestions' }
    ];

    const toggleElement = (elementId: string) => {
      setSelectedElements(prev => 
        prev.includes(elementId) 
          ? prev.filter(id => id !== elementId)
          : [...prev, elementId]
      )
    };

    const commonCombinations = [
      {
        name: 'Event Coordinator',
        elements: ['signup', 'payment', 'notifications'],
        description: 'Complete event management with registration and payments',
        useCase: 'Campus events, workshops, social activities'
      },
      {
        name: 'Study Session Planner', 
        elements: ['poll', 'signup', 'notifications'],
        description: 'Find optimal times and coordinate group study',
        useCase: 'Academic study groups, exam prep sessions'
      },
      {
        name: 'Feedback Hub',
        elements: ['feedback', 'notifications'],
        description: 'Collect and respond to community input',
        useCase: 'Space improvements, event feedback, suggestions'
      }
    ];

    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Coordination Tool</h2>
          <p className="text-lg text-gray-600">Combine elements to solve your space's specific challenges</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Creation Steps */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Creation Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Define Your Problem', description: 'What coordination challenge are you solving?' },
                    { step: 2, title: 'Select Elements', description: 'Choose building blocks for your solution' },
                    { step: 3, title: 'Configure & Test', description: 'Set up the tool and test with your community' },
                    { step: 4, title: 'Deploy & Share', description: 'Launch in your space and share with others' }
                  ].map((item) => (
                    <div key={item.step} className={`flex gap-3 p-3 rounded-lg ${
                      creationStep === item.step ? 'bg-purple-100' : 'bg-gray-50'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        creationStep === item.step ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {item.step}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Start Templates</CardTitle>
                <CardDescription>Popular element combinations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {commonCombinations.map((combo, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-4 w-4 text-purple-600" />
                      <p className="font-medium text-gray-900">{combo.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{combo.description}</p>
                    <p className="text-xs text-gray-500">{combo.useCase}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Creation Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tool Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5 text-purple-600" />
                  Tool Configuration;
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    What are you trying to coordinate?
                  </label>
                  <input;
                    type="text"
                    placeholder="e.g., Floor movie night, Study session for CSE 474, Food order..."
                    value={toolName}
                    onChange={(e) => setToolName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                {toolName && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm text-purple-800">
                      <strong>Suggested tool name:</strong> {toolName} Coordinator;
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Element Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Available Elements</CardTitle>
                <CardDescription>
                  Selected: {selectedElements.length} elements;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {availableElements.map((element) => {
                    const IconComponent = element.icon;
                    const isSelected = selectedElements.includes(element.id);
                    
                    return (
                      <div;
                        key={element.id}}
                        onClick={() => toggleElement(element.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected;
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected ? 'bg-purple-100' : 'bg-gray-100'
                          }`}>
                            <IconComponent className={`h-5 w-5 ${
                              isSelected ? 'text-purple-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900">{element.name}</p>
                              {isSelected && (
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{element.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            {selectedElements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-600" />
                    Tool Preview;
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {toolName || 'Your Custom Tool'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        This tool combines {selectedElements.length} elements to help coordinate your activity.
                      </p>
                      
                      <div className="space-y-2">
                        {selectedElements.map((elementId) => {
                          const element = availableElements.find(e => e.id === elementId);
                          if (!element) return null;
                          
                          const IconComponent = element.icon;
                          return (
                            <div key={elementId} className="flex items-center gap-2 text-sm">
                              <IconComponent className="h-4 w-4 text-purple-600" />
                              <span>{element.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Play className="h-4 w-4 mr-2" />
                        Create Tool;
                      </Button>
                      <Button variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-8 bg-violet-50 rounded-xl p-6 border border-violet-100">
          <h4 className="font-semibold text-violet-900 mb-2">HiveLAB Philosophy</h4>
          <ul className="text-sm text-violet-800 space-y-1">
            <li>• Students build exactly what their communities need, not what seems "useful"</li>
            <li>• Tools exist because they solve real coordination problems</li>
            <li>• Successful solutions spread organically through community adoption</li>
            <li>• No marketplace promotion - only proven value drives tool usage</li>
          </ul>
        </div>
      </div>
    )
  }
};