// Campus-Specific Tool Templates for University of Buffalo Students
// These templates solve real campus problems and encourage viral sharing

import { ToolComposition } from './element-system';

export interface CampusToolTemplate extends ToolComposition {
  category: 'academic' | 'social' | 'events' | 'resources' | 'services';
  viralPotential: 'low' | 'medium' | 'high' | 'very-high';
  socialIntegration: {
    feedPost: boolean;
    spaceNotification: boolean;
    directSharing: boolean;
    deadlineReminders?: boolean;
    calendarIntegration?: boolean;
    reminderNotifications?: boolean;
  };
  ubSpecific: {
    locations?: string[];
    departments?: string[];
    targetYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'all';
  };
}

export const CAMPUS_TOOL_TEMPLATES: CampusToolTemplate[] = [
  {
    id: 'study-group-signup',
    name: 'Study Group Signup',
    description: 'Organize study sessions for courses with time matching and location coordination',
    category: 'academic',
    viralPotential: 'very-high',
    socialIntegration: {
      feedPost: true,
      spaceNotification: true,
      directSharing: true,
      reminderNotifications: true
    },
    ubSpecific: {
      locations: ['Lockwood Library', 'Capen Hall', 'Davis Hall', 'Student Union', 'Online'],
      departments: ['CSE', 'EAS', 'SOM', 'CAS'],
      targetYear: 'all'
    },
    elements: [
      {
        elementId: 'form-builder',
        instanceId: 'study-form',
        config: {
          fields: [
            {
              name: 'course',
              type: 'text',
              required: true,
              label: 'Course Code',
              placeholder: 'e.g. CSE 115, MTH 141, ENG 105'
            },
            {
              name: 'topic',
              type: 'text',
              required: true,
              label: 'Study Topic',
              placeholder: 'What are we studying? (e.g. Exam 2, Final Project)'
            },
            {
              name: 'location',
              type: 'select',
              required: true,
              label: 'Study Location',
              options: [
                { value: 'lockwood', label: 'Lockwood Library (Quiet Study)' },
                { value: 'lockwood-group', label: 'Lockwood Library (Group Study Rooms)' },
                { value: 'capen', label: 'Capen Hall Study Areas' },
                { value: 'davis', label: 'Davis Hall Lounge' },
                { value: 'commons', label: 'Student Union' },
                { value: 'online', label: 'Virtual (Zoom/Discord)' },
                { value: 'other', label: 'Other (specify in notes)' }
              ]
            },
            {
              name: 'groupSize',
              type: 'select',
              required: true,
              label: 'Ideal Group Size',
              options: [
                { value: '2-3', label: '2-3 people (intimate)' },
                { value: '4-6', label: '4-6 people (small group)' },
                { value: '7-10', label: '7-10 people (large group)' },
                { value: '10+', label: '10+ people (study session)' }
              ]
            },
            {
              name: 'notes',
              type: 'textarea',
              required: false,
              label: 'Additional Notes',
              placeholder: 'Any prep materials, specific topics, or other details...'
            }
          ],
          submitText: '📚 Create Study Group',
          successMessage: 'Study group created! Your classmates can now sign up.'
        },
        position: { x: 0, y: 0 },
        size: { width: 8, height: 6 }
      },
      {
        elementId: 'date-picker',
        instanceId: 'study-datetime',
        config: {
          includeTime: true,
          label: 'When should we meet?',
          minDate: new Date().toISOString().split('T')[0],
          defaultTime: '19:00'
        },
        position: { x: 8, y: 0 },
        size: { width: 4, height: 3 }
      },
      {
        elementId: 'user-selector',
        instanceId: 'invite-classmates',
        config: {
          allowMultiple: true,
          label: 'Invite Specific Classmates',
          placeholder: 'Search for classmates to invite directly...',
          filterBySpace: true,
          showAvatars: true
        },
        position: { x: 8, y: 3 },
        size: { width: 4, height: 3 }
      }
    ],
    connections: [
      {
        from: { instanceId: 'study-form', output: 'formData' },
        to: { instanceId: 'study-coordinator', input: 'studyDetails' }
      },
      {
        from: { instanceId: 'study-datetime', output: 'selectedDateTime' },
        to: { instanceId: 'study-coordinator', input: 'meetingTime' }
      },
      {
        from: { instanceId: 'invite-classmates', output: 'selectedUsers' },
        to: { instanceId: 'study-coordinator', input: 'invitedUsers' }
      }
    ],
    layout: 'grid'
  },

  {
    id: 'food-order-coordinator',
    name: 'Group Food Order',
    description: 'Coordinate group food orders with automatic cost splitting and delivery logistics',
    category: 'social',
    viralPotential: 'very-high',
    socialIntegration: {
      feedPost: true,
      spaceNotification: true,
      directSharing: true,
      deadlineReminders: true
    },
    ubSpecific: {
      locations: ['Ellicott Complex', 'Governors Complex', 'South Campus', 'Flint Loop'],
      targetYear: 'all'
    },
    elements: [
      {
        elementId: 'form-builder',
        instanceId: 'order-form',
        config: {
          fields: [
            {
              name: 'restaurant',
              type: 'select',
              required: true,
              label: 'Restaurant/Food Place',
              options: [
                { value: 'chipotle', label: '🌯 Chipotle' },
                { value: 'panera', label: '🥖 Panera Bread' },
                { value: 'subway', label: '🥪 Subway' },
                { value: 'pizza-hut', label: '🍕 Pizza Hut' },
                { value: 'taco-bell', label: '🌮 Taco Bell' },
                { value: 'mcdonalds', label: '🍟 McDonald\'s' },
                { value: 'campus-dining', label: '🍽️ Campus Dining' },
                { value: 'other', label: '🍴 Other (specify in notes)' }
              ]
            },
            {
              name: 'deliveryLocation',
              type: 'select',
              required: true,
              label: 'Delivery/Pickup Location',
              options: [
                { value: 'ellicott-lobby', label: 'Ellicott Complex (Main Lobby)' },
                { value: 'governors-lobby', label: 'Governors Complex (Lobby)' },
                { value: 'south-campus', label: 'South Campus Apartments' },
                { value: 'flint-loop', label: 'Flint Loop' },
                { value: 'commons-pickup', label: 'Student Union (Pickup)' },
                { value: 'lockwood-entrance', label: 'Lockwood Library Entrance' },
                { value: 'other', label: 'Other Location' }
              ]
            },
            {
              name: 'costSplitting',
              type: 'select',
              required: true,
              label: 'Cost Splitting Method',
              options: [
                { value: 'individual', label: 'Everyone pays for their own order' },
                { value: 'equal-split', label: 'Split total cost equally' },
                { value: 'organizer-pays', label: 'I\'ll pay for everyone (Venmo me back)' },
                { value: 'group-fund', label: 'Use group fund/shared money' }
              ]
            },
            {
              name: 'orderNotes',
              type: 'textarea',
              required: false,
              label: 'Order Details & Notes',
              placeholder: 'Group deals, delivery instructions, dietary restrictions, etc.'
            }
          ],
          submitText: '🍕 Start Group Order',
          successMessage: 'Group order created! Share the link to let friends join.'
        },
        position: { x: 0, y: 0 },
        size: { width: 8, height: 6 }
      },
      {
        elementId: 'date-picker',
        instanceId: 'order-deadline',
        config: {
          includeTime: true,
          label: 'Order Deadline',
          minDate: new Date().toISOString().split('T')[0],
          defaultTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split('T')[1].substring(0, 5) // 2 hours from now
        },
        position: { x: 8, y: 0 },
        size: { width: 4, height: 3 }
      },
      {
        elementId: 'user-selector',
        instanceId: 'invite-friends',
        config: {
          allowMultiple: true,
          label: 'Invite Friends Directly',
          showAvatars: true,
          placeholder: 'Search friends to invite...'
        },
        position: { x: 8, y: 3 },
        size: { width: 4, height: 3 }
      }
    ],
    connections: [
      {
        from: { instanceId: 'order-form', output: 'formData' },
        to: { instanceId: 'order-coordinator', input: 'orderDetails' }
      },
      {
        from: { instanceId: 'order-deadline', output: 'selectedDateTime' },
        to: { instanceId: 'order-coordinator', input: 'deadline' }
      },
      {
        from: { instanceId: 'invite-friends', output: 'selectedUsers' },
        to: { instanceId: 'order-coordinator', input: 'invitedUsers' }
      }
    ],
    layout: 'grid'
  },

  {
    id: 'ride-share-organizer',
    name: 'Ride Share Organizer',
    description: 'Coordinate rides to Buffalo area destinations or back home',
    category: 'services',
    viralPotential: 'high',
    socialIntegration: {
      feedPost: true,
      spaceNotification: true,
      directSharing: true,
      reminderNotifications: true
    },
    ubSpecific: {
      locations: ['Buffalo Airport', 'Downtown Buffalo', 'Elmwood Village', 'Wegmans', 'Walden Galleria'],
      targetYear: 'all'
    },
    elements: [
      {
        elementId: 'form-builder',
        instanceId: 'ride-form',
        config: {
          fields: [
            {
              name: 'destination',
              type: 'select',
              required: true,
              label: 'Destination',
              options: [
                { value: 'airport', label: '✈️ Buffalo Airport' },
                { value: 'downtown', label: '🏙️ Downtown Buffalo' },
                { value: 'elmwood', label: '🛍️ Elmwood Village' },
                { value: 'wegmans', label: '🛒 Wegmans (Amherst)' },
                { value: 'galleria', label: '🛍️ Walden Galleria Mall' },
                { value: 'target', label: '🎯 Target' },
                { value: 'home', label: '🏠 Going Home (specify in notes)' },
                { value: 'other', label: '📍 Other Destination' }
              ]
            },
            {
              name: 'rideType',
              type: 'select',
              required: true,
              label: 'Ride Type',
              options: [
                { value: 'offering', label: '🚗 I\'m driving - offering rides' },
                { value: 'needed', label: '🙋 I need a ride' },
                { value: 'shared-cost', label: '💰 Let\'s split Uber/Lyft cost' }
              ]
            },
            {
              name: 'seats',
              type: 'select',
              required: false,
              label: 'Available Seats (if driving)',
              options: [
                { value: '1', label: '1 passenger' },
                { value: '2', label: '2 passengers' },
                { value: '3', label: '3 passengers' },
                { value: '4', label: '4+ passengers' }
              ]
            },
            {
              name: 'meetupLocation',
              type: 'select',
              required: true,
              label: 'Campus Pickup/Meetup Point',
              options: [
                { value: 'commons', label: 'Student Union (Main Entrance)' },
                { value: 'ellicott', label: 'Ellicott Complex' },
                { value: 'governors', label: 'Governors Complex' },
                { value: 'south-campus', label: 'South Campus Apartments' },
                { value: 'lockwood', label: 'Lockwood Library' },
                { value: 'other', label: 'Other Campus Location' }
              ]
            },
            {
              name: 'rideNotes',
              type: 'textarea',
              required: false,
              label: 'Additional Details',
              placeholder: 'Cost splitting, music preferences, stops along the way, etc.'
            }
          ],
          submitText: '🚗 Organize Ride',
          successMessage: 'Ride organized! Others can now join or contact you.'
        },
        position: { x: 0, y: 0 },
        size: { width: 8, height: 6 }
      },
      {
        elementId: 'date-picker',
        instanceId: 'departure-time',
        config: {
          includeTime: true,
          label: 'Departure Date & Time',
          minDate: new Date().toISOString().split('T')[0]
        },
        position: { x: 8, y: 0 },
        size: { width: 4, height: 3 }
      },
      {
        elementId: 'user-selector',
        instanceId: 'invite-riders',
        config: {
          allowMultiple: true,
          label: 'Invite Specific People',
          showAvatars: true,
          placeholder: 'Invite friends who might need/want this ride...'
        },
        position: { x: 8, y: 3 },
        size: { width: 4, height: 3 }
      }
    ],
    connections: [
      {
        from: { instanceId: 'ride-form', output: 'formData' },
        to: { instanceId: 'ride-coordinator', input: 'rideDetails' }
      },
      {
        from: { instanceId: 'departure-time', output: 'selectedDateTime' },
        to: { instanceId: 'ride-coordinator', input: 'departureTime' }
      }
    ],
    layout: 'grid'
  },

  {
    id: 'event-rsvp-manager',
    name: 'Event RSVP Manager',
    description: 'Create events with RSVP tracking, capacity limits, and automatic reminders',
    category: 'events',
    viralPotential: 'high',
    socialIntegration: {
      feedPost: true,
      spaceNotification: true,
      calendarIntegration: true,
      reminderNotifications: true,
      directSharing: true
    },
    ubSpecific: {
      locations: ['Student Union', 'Lockwood Library', 'Alumni Arena', 'Baird Point', 'Davis Hall'],
      targetYear: 'all'
    },
    elements: [
      {
        elementId: 'form-builder',
        instanceId: 'event-form',
        config: {
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Event Title',
              placeholder: 'Give your event a catchy name...'
            },
            {
              name: 'description',
              type: 'textarea',
              required: false,
              label: 'Event Description',
              placeholder: 'What\'s happening? What should people expect?'
            },
            {
              name: 'eventType',
              type: 'select',
              required: true,
              label: 'Event Type',
              options: [
                { value: 'social', label: '🎉 Social Gathering' },
                { value: 'study', label: '📚 Study/Academic Event' },
                { value: 'gaming', label: '🎮 Gaming Session' },
                { value: 'sports', label: '⚽ Sports Activity' },
                { value: 'food', label: '🍕 Food Event' },
                { value: 'movie', label: '🎬 Movie Night' },
                { value: 'meeting', label: '🤝 Meeting/Workshop' },
                { value: 'other', label: '📅 Other Event' }
              ]
            },
            {
              name: 'location',
              type: 'select',
              required: true,
              label: 'Event Location',
              options: [
                { value: 'commons-ballroom', label: 'Student Union (Main Ballroom)' },
                { value: 'commons-meeting', label: 'Student Union (Meeting Rooms)' },
                { value: 'lockwood-study', label: 'Lockwood Library (Study Areas)' },
                { value: 'alumni-arena', label: 'Alumni Arena' },
                { value: 'baird-point', label: 'Baird Point' },
                { value: 'davis-hall', label: 'Davis Hall Lounges' },
                { value: 'outdoor-campus', label: 'Outdoor Campus Location' },
                { value: 'virtual', label: 'Virtual Event (Zoom/Discord)' },
                { value: 'off-campus', label: 'Off-Campus Location' }
              ]
            },
            {
              name: 'capacity',
              type: 'select',
              required: false,
              label: 'Max Attendees (optional)',
              options: [
                { value: '5', label: '5 people (small group)' },
                { value: '10', label: '10 people' },
                { value: '20', label: '20 people' },
                { value: '50', label: '50 people' },
                { value: '100', label: '100+ people' },
                { value: 'unlimited', label: 'No limit' }
              ]
            }
          ],
          submitText: '🎉 Create Event',
          successMessage: 'Event created! People can now RSVP and get notifications.'
        },
        position: { x: 0, y: 0 },
        size: { width: 8, height: 6 }
      },
      {
        elementId: 'date-picker',
        instanceId: 'event-datetime',
        config: {
          includeTime: true,
          allowRange: false,
          label: 'Event Date & Time',
          minDate: new Date().toISOString().split('T')[0]
        },
        position: { x: 8, y: 0 },
        size: { width: 4, height: 3 }
      },
      {
        elementId: 'user-selector',
        instanceId: 'event-invites',
        config: {
          allowMultiple: true,
          label: 'Invite Specific People',
          showAvatars: true,
          placeholder: 'Invite friends directly to this event...'
        },
        position: { x: 8, y: 3 },
        size: { width: 4, height: 3 }
      }
    ],
    connections: [
      {
        from: { instanceId: 'event-form', output: 'formData' },
        to: { instanceId: 'event-creator', input: 'eventDetails' }
      },
      {
        from: { instanceId: 'event-datetime', output: 'selectedDateTime' },
        to: { instanceId: 'event-creator', input: 'eventTime' }
      },
      {
        from: { instanceId: 'event-invites', output: 'selectedUsers' },
        to: { instanceId: 'event-creator', input: 'invitedUsers' }
      }
    ],
    layout: 'grid'
  },

  {
    id: 'textbook-exchange',
    name: 'Textbook Exchange',
    description: 'Buy, sell, or trade textbooks with other UB students',
    category: 'resources',
    viralPotential: 'medium',
    socialIntegration: {
      feedPost: true,
      spaceNotification: true,
      directSharing: true
    },
    ubSpecific: {
      departments: ['CSE', 'MTH', 'PHY', 'CHE', 'BIO', 'ENG', 'ECO', 'PSY'],
      targetYear: 'all'
    },
    elements: [
      {
        elementId: 'form-builder',
        instanceId: 'textbook-form',
        config: {
          fields: [
            {
              name: 'listingType',
              type: 'select',
              required: true,
              label: 'Listing Type',
              options: [
                { value: 'selling', label: '💰 Selling' },
                { value: 'buying', label: '🛒 Looking to Buy' },
                { value: 'trading', label: '🔄 Trading/Exchange' },
                { value: 'free', label: '🆓 Giving Away Free' }
              ]
            },
            {
              name: 'bookTitle',
              type: 'text',
              required: true,
              label: 'Book Title',
              placeholder: 'Enter the full title of the textbook'
            },
            {
              name: 'course',
              type: 'text',
              required: true,
              label: 'Course',
              placeholder: 'e.g. CSE 115, MTH 141, PHY 107'
            },
            {
              name: 'author',
              type: 'text',
              required: false,
              label: 'Author(s)',
              placeholder: 'Book author(s)'
            },
            {
              name: 'edition',
              type: 'text',
              required: false,
              label: 'Edition',
              placeholder: 'e.g. 5th Edition, 2020'
            },
            {
              name: 'condition',
              type: 'select',
              required: true,
              label: 'Condition',
              options: [
                { value: 'new', label: '📗 Like New' },
                { value: 'excellent', label: '📘 Excellent' },
                { value: 'good', label: '📙 Good (minor wear)' },
                { value: 'fair', label: '📕 Fair (noticeable wear)' },
                { value: 'poor', label: '📔 Poor (heavy wear)' }
              ]
            },
            {
              name: 'price',
              type: 'text',
              required: false,
              label: 'Price',
              placeholder: 'e.g. $50, $25 OBO, or leave blank if free/trading'
            },
            {
              name: 'notes',
              type: 'textarea',
              required: false,
              label: 'Additional Notes',
              placeholder: 'Highlighting, missing pages, access codes, etc.'
            }
          ],
          submitText: '📚 Post Listing',
          successMessage: 'Textbook listing posted! Students will be able to contact you.'
        },
        position: { x: 0, y: 0 },
        size: { width: 12, height: 6 }
      }
    ],
    connections: [],
    layout: 'grid'
  }
];

// Tool categories for easy filtering and discovery
export const CAMPUS_TOOL_CATEGORIES = {
  academic: {
    name: 'Academic',
    description: 'Study groups, tutoring, course resources',
    icon: '📚',
    tools: ['study-group-signup', 'textbook-exchange']
  },
  social: {
    name: 'Social',
    description: 'Hangouts, food orders, group activities',
    icon: '🎉',
    tools: ['food-order-coordinator']
  },
  events: {
    name: 'Events',
    description: 'Parties, meetings, campus activities',
    icon: '📅',
    tools: ['event-rsvp-manager']
  },
  resources: {
    name: 'Resources',
    description: 'Textbooks, supplies, sharing economy',
    icon: '🔄',
    tools: ['textbook-exchange']
  },
  services: {
    name: 'Services',
    description: 'Rides, deliveries, campus services',
    icon: '🚗',
    tools: ['ride-share-organizer']
  }
} as const;

// Get templates by category
export function getTemplatesByCategory(category: keyof typeof CAMPUS_TOOL_CATEGORIES): CampusToolTemplate[] {
  return CAMPUS_TOOL_TEMPLATES.filter(template => template.category === category);
}

// Get high-viral-potential templates for featured section
export function getViralTemplates(): CampusToolTemplate[] {
  return CAMPUS_TOOL_TEMPLATES.filter(template => 
    template.viralPotential === 'high' || template.viralPotential === 'very-high'
  );
}

// Get templates suitable for freshmen
export function getFreshmanFriendlyTemplates(): CampusToolTemplate[] {
  return CAMPUS_TOOL_TEMPLATES.filter(template =>
    template.ubSpecific.targetYear === 'all' || template.ubSpecific.targetYear === 'freshman'
  );
}