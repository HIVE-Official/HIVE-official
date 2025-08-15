import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Plus, Users, Calendar, BookOpen, X, AlertTriangle, CheckCircle, Info, Trash2, Edit, Share2, Settings, UserPlus, MessageSquare, Upload, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Input } from '../../atomic/atoms/input-enhanced';
import { Label } from '../../atomic/atoms/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Textarea } from '../../atomic/atoms/textarea-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../atomic/atoms/avatar';

const meta: Meta = {
  title: '03-Molecules/Modal-Components/Action Modal System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Action Modal System

A comprehensive modal system for University at Buffalo campus actions and interactions. These molecular components handle user flows like creating content, joining spaces, managing settings, and performing campus-specific actions with proper validation and feedback.

## Campus Integration Features
- **Content Creation** - Create posts, events, study sessions, and campus announcements
- **Space Management** - Join spaces, invite members, and configure space settings
- **Academic Actions** - Schedule study sessions, share resources, and coordinate academic activities
- **Social Interactions** - Send connection requests, start conversations, and plan campus events

## Modal Types
- **Creation Modals** - Multi-step forms for creating spaces, events, and content
- **Confirmation Modals** - Action confirmations with clear consequences and alternatives
- **Settings Modals** - Configuration interfaces for preferences and account management
- **Information Modals** - Display detailed information with contextual actions

## Interaction Patterns
- **Progressive Disclosure** - Step-by-step forms that guide users through complex actions
- **Smart Validation** - Real-time validation with campus-specific data verification
- **Contextual Actions** - Actions that adapt based on user permissions and campus context
- **Mobile Optimization** - Touch-friendly modal interfaces for on-campus mobile usage

## Accessibility Features
- **Focus Management** - Proper focus trapping and keyboard navigation within modals
- **Screen Reader Support** - Clear modal structure with appropriate ARIA labels
- **Escape Handling** - Multiple ways to close modals including ESC key and overlay clicks
- **Content Hierarchy** - Logical heading structure and clear action priorities
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Modal Data
const campusModalData = {
  spaceTypes: [
    { value: 'study-group', label: 'Study Group', description: 'Academic collaboration and learning' },
    { value: 'social-event', label: 'Social Event', description: 'Campus social activities and gatherings' },
    { value: 'dorm-community', label: 'Dorm Community', description: 'Residence hall floor or building' },
    { value: 'club-organization', label: 'Club/Organization', description: 'Official student organizations' },
    { value: 'project-team', label: 'Project Team', description: 'Collaborative academic or personal projects' }
  ],
  campusLocations: [
    'Lockwood Library',
    'Student Union',
    'Capen Hall',
    'Knox Hall',
    'Hochstetter Hall',
    'Davis Hall',
    'Alumni Arena',
    'Ellicott Complex',
    'Governors Complex',
    'South Campus'
  ],
  privacyLevels: [
    { value: 'public', label: 'Public', description: 'Visible to all UB students' },
    { value: 'campus-only', label: 'Campus Only', description: 'Visible to your school/department' },
    { value: 'friends-only', label: 'Friends Only', description: 'Visible to your connections' },
    { value: 'invite-only', label: 'Invite Only', description: 'Invitation required to join' }
  ]
};

// Create Space Modal Story
export const CreateSpaceModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
      name: '',
      description: '',
      type: '',
      privacy: '',
      location: '',
      maxMembers: '',
      tags: [] as string[]
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const totalSteps = 3;

    const handleInputChange = (field: string, value: string | string[]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const validateStep = (step: number) => {
      const newErrors: Record<string, string> = {};
      
      if (step === 1) {
        if (!formData.name) newErrors.name = 'Space name is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.type) newErrors.type = 'Please select a space type';
      } else if (step === 2) {
        if (!formData.privacy) newErrors.privacy = 'Please select privacy level';
        if (!formData.location) newErrors.location = 'Please select a location';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          setCurrentStep(currentStep + 1);
        } else {
          handleSubmit();
        }
      }
    };

    const handleSubmit = () => {
      console.log('Creating space:', formData);
      setIsOpen(false);
      setCurrentStep(1);
      setFormData({
        name: '',
        description: '',
        type: '',
        privacy: '',
        location: '',
        maxMembers: '',
        tags: []
      });
    };

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Space Modal</h2>
          <p className="text-lg text-gray-600">Multi-step space creation with validation</p>
        </div>

        <div className="text-center">
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Space
          </Button>
        </div>

        {/* Modal Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Create Campus Space</CardTitle>
                    <CardDescription>Step {currentStep} of {totalSteps}</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center mt-4">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                      <p className="text-sm text-gray-600">Tell us about your space</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="space-name">Space Name</Label>
                      <Input
                        id="space-name"
                        placeholder="e.g., CSE 115 Study Group"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <div className="text-sm text-red-600">{errors.name}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="space-description">Description</Label>
                      <Textarea
                        id="space-description"
                        placeholder="Describe your space's purpose and what members can expect..."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className={`min-h-[100px] ${errors.description ? 'border-red-500' : ''}`}
                      />
                      {errors.description && (
                        <div className="text-sm text-red-600">{errors.description}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="space-type">Space Type</Label>
                      <Select onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                          <SelectValue placeholder="What type of space is this?" />
                        </SelectTrigger>
                        <SelectContent>
                          {campusModalData.spaceTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-sm text-gray-600">{type.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <div className="text-sm text-red-600">{errors.type}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Privacy & Location */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Privacy & Location</h3>
                      <p className="text-sm text-gray-600">Configure access and meeting details</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="space-privacy">Privacy Level</Label>
                      <Select onValueChange={(value) => handleInputChange('privacy', value)}>
                        <SelectTrigger className={errors.privacy ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Who can see and join this space?" />
                        </SelectTrigger>
                        <SelectContent>
                          {campusModalData.privacyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <div>
                                <div className="font-medium">{level.label}</div>
                                <div className="text-sm text-gray-600">{level.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.privacy && (
                        <div className="text-sm text-red-600">{errors.privacy}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="space-location">Primary Meeting Location</Label>
                      <Select onValueChange={(value) => handleInputChange('location', value)}>
                        <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Where does your space typically meet?" />
                        </SelectTrigger>
                        <SelectContent>
                          {campusModalData.campusLocations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.location && (
                        <div className="text-sm text-red-600">{errors.location}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-members">Maximum Members (Optional)</Label>
                      <Input
                        id="max-members"
                        type="number"
                        placeholder="Leave empty for unlimited"
                        value={formData.maxMembers}
                        onChange={(e) => handleInputChange('maxMembers', e.target.value)}
                        min="2"
                        max="500"
                      />
                      <div className="text-xs text-gray-500">
                        Helps manage space size and ensures quality discussions
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Final Review */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Review & Create</h3>
                      <p className="text-sm text-gray-600">Confirm your space details</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <div className="font-medium text-gray-900">{formData.name}</div>
                        <div className="text-sm text-gray-600">{formData.description}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-gray-700">Type</div>
                          <div className="text-gray-600">
                            {campusModalData.spaceTypes.find(t => t.value === formData.type)?.label}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Privacy</div>
                          <div className="text-gray-600">
                            {campusModalData.privacyLevels.find(p => p.value === formData.privacy)?.label}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Location</div>
                          <div className="text-gray-600">{formData.location}</div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Max Members</div>
                          <div className="text-gray-600">{formData.maxMembers || 'Unlimited'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <div className="font-medium mb-1">Ready to create your space!</div>
                          <div>You'll be the space administrator and can invite members, manage settings, and moderate content.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setIsOpen(false)}
                  >
                    {currentStep > 1 ? 'Back' : 'Cancel'}
                  </Button>
                  
                  <Button onClick={handleNext}>
                    {currentStep === totalSteps ? 'Create Space' : 'Continue'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
};

// Confirmation Modal Story
export const ConfirmationModal: Story = {
  render: () => {
    const [activeModal, setActiveModal] = React.useState<string | null>(null);

    const confirmationModals = [
      {
        id: 'leave-space',
        type: 'warning',
        icon: AlertTriangle,
        title: 'Leave Space',
        message: 'Are you sure you want to leave "CSE 115 Study Group"? You\'ll lose access to all posts, resources, and conversations.',
        confirmText: 'Leave Space',
        confirmVariant: 'destructive' as const,
        cancelText: 'Stay in Space'
      },
      {
        id: 'delete-post',
        type: 'danger',
        icon: Trash2,
        title: 'Delete Post',
        message: 'This will permanently delete your post and all its comments. This action cannot be undone.',
        confirmText: 'Delete Forever',
        confirmVariant: 'destructive' as const,
        cancelText: 'Keep Post'
      },
      {
        id: 'send-invite',
        type: 'success',
        icon: UserPlus,
        title: 'Invite to Space',
        message: 'Send an invitation to Emily Rodriguez to join "Psychology Research Group"? She\'ll receive a notification with space details.',
        confirmText: 'Send Invitation',
        confirmVariant: 'default' as const,
        cancelText: 'Cancel'
      }
    ];

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Confirmation Modals</h2>
          <p className="text-lg text-gray-600">Action confirmations with clear consequences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {confirmationModals.map((modal) => (
            <Button 
              key={modal.id}
              variant="outline" 
              onClick={() => setActiveModal(modal.id)}
              className="h-auto p-4"
            >
              <div className="text-center">
                <modal.icon className="h-6 w-6 mx-auto mb-2" />
                <div className="font-medium">{modal.title}</div>
                <div className="text-sm text-gray-600 mt-1">Click to preview</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Modal Overlays */}
        {confirmationModals.map((modal) => {
          const IconComponent = modal.icon;
          return activeModal === modal.id ? (
            <div key={modal.id} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      modal.type === 'danger' ? 'bg-red-100' :
                      modal.type === 'warning' ? 'bg-yellow-100' :
                      'bg-green-100'
                    }`}>
                      <IconComponent className={`h-8 w-8 ${
                        modal.type === 'danger' ? 'text-red-600' :
                        modal.type === 'warning' ? 'text-yellow-600' :
                        'text-green-600'
                      }`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{modal.title}</h3>
                    <p className="text-gray-600">{modal.message}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveModal(null)}
                      className="flex-1"
                    >
                      {modal.cancelText}
                    </Button>
                    <Button 
                      variant={modal.confirmVariant}
                      onClick={() => {
                        console.log(`Confirmed: ${modal.id}`);
                        setActiveModal(null);
                      }}
                      className="flex-1"
                    >
                      {modal.confirmText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : null;
        })}
      </div>
    );
  }
};

// Interactive Modal Demo Story
export const InteractiveModalDemo: Story = {
  render: () => {
    const [activeModal, setActiveModal] = React.useState<string | null>(null);
    const [formData, setFormData] = React.useState({
      eventTitle: '',
      eventDate: '',
      eventTime: '',
      eventLocation: ''
    });

    const modalActions = [
      {
        id: 'create-event',
        title: 'Create Event',
        icon: Calendar,
        description: 'Plan a campus event or study session',
        color: 'bg-blue-600 hover:bg-blue-700'
      },
      {
        id: 'invite-friends',
        title: 'Invite Friends',
        icon: Users,
        description: 'Invite connections to join a space',
        color: 'bg-green-600 hover:bg-green-700'
      },
      {
        id: 'share-resource',
        title: 'Share Resource',
        icon: BookOpen,
        description: 'Share academic materials or links',
        color: 'bg-purple-600 hover:bg-purple-700'
      },
      {
        id: 'account-settings',
        title: 'Account Settings',
        icon: Settings,
        description: 'Manage your profile and preferences',
        color: 'bg-gray-600 hover:bg-gray-700'
      }
    ];

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      setActiveModal(null);
      setFormData({
        eventTitle: '',
        eventDate: '',
        eventTime: '',
        eventLocation: ''
      });
    };

    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Modal System</h2>
          <p className="text-lg text-gray-600">Experience various campus action modals</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modalActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => setActiveModal(action.id)}
                className={`p-6 rounded-xl text-white transition-colors ${action.color}`}
              >
                <IconComponent className="h-8 w-8 mx-auto mb-3" />
                <div className="font-semibold mb-2">{action.title}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </button>
            );
          })}
        </div>

        {/* Create Event Modal */}
        {activeModal === 'create-event' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Create Campus Event
                    </CardTitle>
                    <CardDescription>Plan an event for your community</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveModal(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    placeholder="Study session, social event, meeting..."
                    value={formData.eventTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventTitle: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input
                      id="event-time"
                      type="time"
                      value={formData.eventTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-location">Location</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, eventLocation: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a campus location" />
                    </SelectTrigger>
                    <SelectContent>
                      {campusModalData.campusLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    Create Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Invite Friends Modal */}
        {activeModal === 'invite-friends' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Invite to Space
                    </CardTitle>
                    <CardDescription>Send invitations to your connections</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveModal(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Label>Inviting to: Psychology Research Group</Label>
                  <div className="bg-gray-50 rounded-lg p-3 mt-2">
                    <div className="text-sm text-gray-600">
                      Academic Space • 18 members • Public
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Select friends to invite:</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {[
                      { name: 'Emily Rodriguez', major: 'Psychology', avatar: '/api/placeholder/32/32' },
                      { name: 'Marcus Johnson', major: 'Business', avatar: '/api/placeholder/32/32' },
                      { name: 'David Kim', major: 'Engineering', avatar: null }
                    ].map((friend, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="text-xs">
                            {friend.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{friend.name}</div>
                          <div className="text-xs text-gray-600">{friend.major}</div>
                        </div>
                        <Button size="sm" variant="outline">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={() => setActiveModal(null)} className="flex-1">
                    Send Invites
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Share Resource Modal */}
        {activeModal === 'share-resource' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Share Resource
                    </CardTitle>
                    <CardDescription>Share academic materials or useful links</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveModal(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Resource Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="h-auto p-3">
                      <div className="text-center">
                        <Upload className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-xs">Upload File</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-3">
                      <div className="text-center">
                        <Share2 className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-xs">Share Link</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-3">
                      <div className="text-center">
                        <MessageSquare className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-xs">Text Note</div>
                      </div>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resource-title">Title</Label>
                  <Input
                    id="resource-title"
                    placeholder="Study guide, research paper, useful tool..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resource-description">Description</Label>
                  <Textarea
                    id="resource-description"
                    placeholder="Brief description of the resource and how it's helpful..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Share to:</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose where to share" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse115">CSE 115 Study Group</SelectItem>
                      <SelectItem value="psychology">Psychology Research Group</SelectItem>
                      <SelectItem value="personal">My Profile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={() => setActiveModal(null)} className="flex-1">
                    Share Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Modal */}
        {activeModal === 'account-settings' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>Manage your profile and preferences</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveModal(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    {[
                      'Profile visibility to other students',
                      'Show activity in spaces',
                      'Allow friend requests',
                      'Campus location sharing'
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">{setting}</div>
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Notification Settings</h3>
                  <div className="space-y-3">
                    {[
                      'Space updates and posts',
                      'Friend requests and messages',
                      'Event reminders',
                      'Study session invitations'
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">{setting}</div>
                        <Badge variant="secondary">Enabled</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={() => setActiveModal(null)} className="flex-1">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-2">Modal System Features</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Progressive disclosure with multi-step forms for complex actions</li>
            <li>• Context-aware validation with campus-specific data verification</li>
            <li>• Accessible modal design with proper focus management and keyboard navigation</li>
            <li>• Mobile-optimized interfaces for on-campus usage scenarios</li>
          </ul>
        </div>
      </div>
    );
  }
};