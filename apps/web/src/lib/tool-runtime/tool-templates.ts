/**
 * Pre-built Tool Templates
 * Ready-to-use tools that students can customize
 */

import { ToolInstance } from './execution-engine';

export interface ToolTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  thumbnail?: string;
  
  // Template metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes to set up
  tags: string[];
  
  // The actual tool configuration
  instance: ToolInstance;
  
  // Customization options
  customizable: {
    fields: Array<{
      path: string; // JSON path to the field
      label: string;
      type: 'text' | 'number' | 'select' | 'color';
      options?: Array<{ value: string; label: string }>;
    }>;
  };
}

/**
 * Event RSVP Tracker Template
 */
export const EVENT_RSVP_TRACKER: ToolTemplate = {
  id: 'event_rsvp_tracker',
  name: 'Event RSVP Tracker',
  description: 'Track who\'s attending events, send reminders, and manage capacity',
  category: 'coordination',
  icon: '📅',
  difficulty: 'beginner',
  estimatedTime: 5,
  tags: ['events', 'rsvp', 'attendance', 'organization'],
  
  instance: {
    id: 'event_rsvp_1',
    toolId: 'event_rsvp_tracker',
    spaceId: '',
    elements: [
      {
        id: 'event_select',
        elementId: 'select_dropdown',
        position: { x: 100, y: 100 },
        config: {
          label: 'Select Event',
          options: [], // Will be populated with space events
          defaultValue: ''
        }
      },
      {
        id: 'rsvp_button',
        elementId: 'button',
        position: { x: 100, y: 200 },
        config: {
          text: 'RSVP to Event',
          variant: 'primary'
        }
      },
      {
        id: 'attendee_list',
        elementId: 'list_display',
        position: { x: 400, y: 100 },
        config: {
          title: 'Confirmed Attendees',
          showNumbers: true
        }
      },
      {
        id: 'capacity_display',
        elementId: 'text_display',
        position: { x: 400, y: 300 },
        config: {
          text: 'Capacity: 0/0',
          size: 'large',
          color: '#FFE255'
        }
      },
      {
        id: 'reminder_action',
        elementId: 'send_notification',
        position: { x: 100, y: 400 },
        config: {
          notificationType: 'info'
        }
      }
    ],
    connections: [
      {
        id: 'conn1',
        from: { elementId: 'rsvp_button', portId: 'clicked' },
        to: { elementId: 'reminder_action', portId: 'trigger' },
        type: 'trigger'
      }
    ],
    variables: {
      maxCapacity: 50,
      reminderHours: 24
    },
    config: {
      name: 'Event RSVP Tracker',
      description: 'Manage event attendance',
      autoRun: false,
      triggers: ['event_created', 'event_updated'],
      permissions: {
        canExecute: ['member'],
        dataAccess: ['events', 'members']
      }
    }
  },
  
  customizable: {
    fields: [
      {
        path: 'elements[1].config.text',
        label: 'Button Text',
        type: 'text'
      },
      {
        path: 'variables.maxCapacity',
        label: 'Default Capacity',
        type: 'number'
      },
      {
        path: 'variables.reminderHours',
        label: 'Reminder Hours Before',
        type: 'select',
        options: [
          { value: '1', label: '1 hour' },
          { value: '6', label: '6 hours' },
          { value: '24', label: '24 hours' },
          { value: '48', label: '48 hours' }
        ]
      }
    ]
  }
};

/**
 * Study Session Matcher Template
 */
export const STUDY_SESSION_MATCHER: ToolTemplate = {
  id: 'study_session_matcher',
  name: 'Study Session Matcher',
  description: 'Match students by courses and availability for group study sessions',
  category: 'study',
  icon: '📚',
  difficulty: 'intermediate',
  estimatedTime: 10,
  tags: ['study', 'academic', 'collaboration', 'scheduling'],
  
  instance: {
    id: 'study_matcher_1',
    toolId: 'study_session_matcher',
    spaceId: '',
    elements: [
      {
        id: 'course_input',
        elementId: 'text_input',
        position: { x: 100, y: 100 },
        config: {
          label: 'Course Code (e.g., CS 220)',
          placeholder: 'Enter course code',
          required: true,
          maxLength: 20
        }
      },
      {
        id: 'time_picker',
        elementId: 'date_picker',
        position: { x: 100, y: 200 },
        config: {
          label: 'Preferred Study Time',
          includeTime: true,
          minDate: new Date().toISOString()
        }
      },
      {
        id: 'duration_select',
        elementId: 'select_dropdown',
        position: { x: 100, y: 300 },
        config: {
          label: 'Session Duration',
          options: [
            { value: '30', label: '30 minutes' },
            { value: '60', label: '1 hour' },
            { value: '90', label: '1.5 hours' },
            { value: '120', label: '2 hours' }
          ],
          defaultValue: '60'
        }
      },
      {
        id: 'find_button',
        elementId: 'button',
        position: { x: 100, y: 400 },
        config: {
          text: 'Find Study Partners',
          variant: 'primary'
        }
      },
      {
        id: 'matches_display',
        elementId: 'list_display',
        position: { x: 400, y: 100 },
        config: {
          title: 'Available Study Partners',
          showNumbers: false
        }
      },
      {
        id: 'create_session',
        elementId: 'create_post',
        position: { x: 400, y: 400 },
        config: {
          postType: 'discussion'
        }
      }
    ],
    connections: [
      {
        id: 'conn1',
        from: { elementId: 'find_button', portId: 'clicked' },
        to: { elementId: 'create_session', portId: 'trigger' },
        type: 'trigger'
      },
      {
        id: 'conn2',
        from: { elementId: 'course_input', portId: 'value' },
        to: { elementId: 'create_session', portId: 'title' },
        type: 'data'
      }
    ],
    variables: {
      maxGroupSize: 5,
      matchRadius: 2 // hours flexibility
    },
    config: {
      name: 'Study Session Matcher',
      description: 'Find and organize study groups',
      autoRun: false,
      triggers: [],
      permissions: {
        canExecute: ['member'],
        dataAccess: ['members', 'posts']
      }
    }
  },
  
  customizable: {
    fields: [
      {
        path: 'variables.maxGroupSize',
        label: 'Maximum Group Size',
        type: 'number'
      },
      {
        path: 'elements[3].config.text',
        label: 'Button Text',
        type: 'text'
      }
    ]
  }
};

/**
 * Food Run Coordinator Template
 */
export const FOOD_RUN_COORDINATOR: ToolTemplate = {
  id: 'food_run_coordinator',
  name: 'Food Run Coordinator',
  description: 'Organize group food orders with payment tracking and pickup coordination',
  category: 'social',
  icon: '🍕',
  difficulty: 'beginner',
  estimatedTime: 5,
  tags: ['food', 'social', 'coordination', 'payments'],
  
  instance: {
    id: 'food_run_1',
    toolId: 'food_run_coordinator',
    spaceId: '',
    elements: [
      {
        id: 'restaurant_select',
        elementId: 'select_dropdown',
        position: { x: 100, y: 100 },
        config: {
          label: 'Restaurant',
          options: [
            { value: 'dominos', label: 'Domino\'s Pizza' },
            { value: 'chipotle', label: 'Chipotle' },
            { value: 'subway', label: 'Subway' },
            { value: 'starbucks', label: 'Starbucks' },
            { value: 'other', label: 'Other' }
          ],
          defaultValue: 'dominos'
        }
      },
      {
        id: 'pickup_time',
        elementId: 'date_picker',
        position: { x: 100, y: 200 },
        config: {
          label: 'Pickup Time',
          includeTime: true,
          minDate: new Date().toISOString()
        }
      },
      {
        id: 'order_deadline',
        elementId: 'date_picker',
        position: { x: 100, y: 300 },
        config: {
          label: 'Order Deadline',
          includeTime: true,
          minDate: new Date().toISOString()
        }
      },
      {
        id: 'start_run_button',
        elementId: 'button',
        position: { x: 100, y: 400 },
        config: {
          text: 'Start Food Run',
          variant: 'primary'
        }
      },
      {
        id: 'orders_list',
        elementId: 'list_display',
        position: { x: 400, y: 100 },
        config: {
          title: 'Current Orders',
          showNumbers: true
        }
      },
      {
        id: 'total_display',
        elementId: 'text_display',
        position: { x: 400, y: 300 },
        config: {
          text: 'Total: $0.00',
          size: 'large',
          color: '#4ADE80'
        }
      },
      {
        id: 'create_post_action',
        elementId: 'create_post',
        position: { x: 700, y: 100 },
        config: {
          postType: 'announcement'
        }
      },
      {
        id: 'notify_action',
        elementId: 'send_notification',
        position: { x: 700, y: 300 },
        config: {
          notificationType: 'info'
        }
      }
    ],
    connections: [
      {
        id: 'conn1',
        from: { elementId: 'start_run_button', portId: 'clicked' },
        to: { elementId: 'create_post_action', portId: 'trigger' },
        type: 'trigger'
      },
      {
        id: 'conn2',
        from: { elementId: 'start_run_button', portId: 'clicked' },
        to: { elementId: 'notify_action', portId: 'trigger' },
        type: 'trigger'
      }
    ],
    variables: {
      deliveryFee: 5,
      maxOrders: 10,
      paymentMethods: ['venmo', 'cash', 'zelle']
    },
    config: {
      name: 'Food Run Coordinator',
      description: 'Organize group food orders',
      autoRun: false,
      triggers: [],
      permissions: {
        canExecute: ['member'],
        dataAccess: ['posts', 'members']
      }
    }
  },
  
  customizable: {
    fields: [
      {
        path: 'elements[0].config.options',
        label: 'Restaurant Options',
        type: 'text'
      },
      {
        path: 'variables.deliveryFee',
        label: 'Delivery Fee',
        type: 'number'
      },
      {
        path: 'variables.maxOrders',
        label: 'Maximum Orders',
        type: 'number'
      }
    ]
  }
};

/**
 * Quick Poll Template
 */
export const QUICK_POLL: ToolTemplate = {
  id: 'quick_poll',
  name: 'Quick Poll',
  description: 'Create instant polls for quick decisions and feedback',
  category: 'communication',
  icon: '📊',
  difficulty: 'beginner',
  estimatedTime: 3,
  tags: ['poll', 'voting', 'feedback', 'decision'],
  
  instance: {
    id: 'poll_1',
    toolId: 'quick_poll',
    spaceId: '',
    elements: [
      {
        id: 'poll_question',
        elementId: 'text_input',
        position: { x: 100, y: 100 },
        config: {
          label: 'Poll Question',
          placeholder: 'What should we vote on?',
          required: true,
          maxLength: 200
        }
      },
      {
        id: 'option1',
        elementId: 'text_input',
        position: { x: 100, y: 200 },
        config: {
          label: 'Option 1',
          placeholder: 'First option',
          required: true
        }
      },
      {
        id: 'option2',
        elementId: 'text_input',
        position: { x: 100, y: 300 },
        config: {
          label: 'Option 2',
          placeholder: 'Second option',
          required: true
        }
      },
      {
        id: 'create_poll_button',
        elementId: 'button',
        position: { x: 100, y: 400 },
        config: {
          text: 'Create Poll',
          variant: 'primary'
        }
      },
      {
        id: 'results_chart',
        elementId: 'chart_display',
        position: { x: 400, y: 100 },
        config: {
          title: 'Poll Results',
          type: 'bar'
        }
      },
      {
        id: 'voters_list',
        elementId: 'list_display',
        position: { x: 400, y: 350 },
        config: {
          title: 'Voters',
          showNumbers: false
        }
      }
    ],
    connections: [
      {
        id: 'conn1',
        from: { elementId: 'create_poll_button', portId: 'clicked' },
        to: { elementId: 'results_chart', portId: 'trigger' },
        type: 'trigger'
      }
    ],
    variables: {
      allowAnonymous: true,
      multipleChoice: false,
      duration: 24 // hours
    },
    config: {
      name: 'Quick Poll',
      description: 'Create instant polls',
      autoRun: false,
      triggers: [],
      permissions: {
        canExecute: ['member'],
        dataAccess: ['posts']
      }
    }
  },
  
  customizable: {
    fields: [
      {
        path: 'variables.allowAnonymous',
        label: 'Allow Anonymous Voting',
        type: 'select',
        options: [
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' }
        ]
      },
      {
        path: 'variables.duration',
        label: 'Poll Duration (hours)',
        type: 'number'
      }
    ]
  }
};

/**
 * Resource Library Template
 */
export const RESOURCE_LIBRARY: ToolTemplate = {
  id: 'resource_library',
  name: 'Resource Library',
  description: 'Share and organize study materials, notes, and resources',
  category: 'resources',
  icon: '📁',
  difficulty: 'intermediate',
  estimatedTime: 8,
  tags: ['resources', 'files', 'academic', 'sharing'],
  
  instance: {
    id: 'library_1',
    toolId: 'resource_library',
    spaceId: '',
    elements: [
      {
        id: 'category_select',
        elementId: 'select_dropdown',
        position: { x: 100, y: 100 },
        config: {
          label: 'Category',
          options: [
            { value: 'notes', label: 'Class Notes' },
            { value: 'assignments', label: 'Assignments' },
            { value: 'exams', label: 'Past Exams' },
            { value: 'guides', label: 'Study Guides' },
            { value: 'other', label: 'Other' }
          ],
          defaultValue: 'notes'
        }
      },
      {
        id: 'course_filter',
        elementId: 'text_input',
        position: { x: 100, y: 200 },
        config: {
          label: 'Filter by Course',
          placeholder: 'e.g., CS 220',
          required: false
        }
      },
      {
        id: 'search_button',
        elementId: 'button',
        position: { x: 100, y: 300 },
        config: {
          text: 'Search Resources',
          variant: 'secondary'
        }
      },
      {
        id: 'resources_list',
        elementId: 'list_display',
        position: { x: 400, y: 100 },
        config: {
          title: 'Available Resources',
          showNumbers: false
        }
      },
      {
        id: 'upload_button',
        elementId: 'button',
        position: { x: 100, y: 400 },
        config: {
          text: 'Upload Resource',
          variant: 'primary'
        }
      },
      {
        id: 'store_action',
        elementId: 'store_data',
        position: { x: 700, y: 100 },
        config: {
          storageKey: 'resources',
          persistent: true
        }
      }
    ],
    connections: [
      {
        id: 'conn1',
        from: { elementId: 'search_button', portId: 'clicked' },
        to: { elementId: 'resources_list', portId: 'trigger' },
        type: 'trigger'
      },
      {
        id: 'conn2',
        from: { elementId: 'upload_button', portId: 'clicked' },
        to: { elementId: 'store_action', portId: 'trigger' },
        type: 'trigger'
      }
    ],
    variables: {
      maxFileSize: 10, // MB
      allowedTypes: ['pdf', 'docx', 'pptx', 'txt', 'md'],
      requireApproval: false
    },
    config: {
      name: 'Resource Library',
      description: 'Share academic resources',
      autoRun: false,
      triggers: [],
      permissions: {
        canExecute: ['member'],
        dataAccess: ['storage', 'posts']
      }
    }
  },
  
  customizable: {
    fields: [
      {
        path: 'elements[0].config.options',
        label: 'Resource Categories',
        type: 'text'
      },
      {
        path: 'variables.maxFileSize',
        label: 'Max File Size (MB)',
        type: 'number'
      },
      {
        path: 'variables.requireApproval',
        label: 'Require Approval',
        type: 'select',
        options: [
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' }
        ]
      }
    ]
  }
};

// Collection of all templates
export const TOOL_TEMPLATES: ToolTemplate[] = [
  EVENT_RSVP_TRACKER,
  STUDY_SESSION_MATCHER,
  FOOD_RUN_COORDINATOR,
  QUICK_POLL,
  RESOURCE_LIBRARY
];

// Get template by ID
export function getTemplate(id: string): ToolTemplate | undefined {
  return TOOL_TEMPLATES.find(template => template.id === id);
}

// Get templates by category
export function getTemplatesByCategory(category: string): ToolTemplate[] {
  return TOOL_TEMPLATES.filter(template => template.category === category);
}

// Clone a template for customization
export function cloneTemplate(templateId: string): ToolInstance | null {
  const template = getTemplate(templateId);
  if (!template) return null;
  
  // Deep clone the instance
  const cloned = JSON.parse(JSON.stringify(template.instance));
  
  // Generate new IDs
  cloned.id = `${template.id}_${Date.now()}`;
  cloned.elements.forEach((element: any, index: number) => {
    element.id = `${element.id}_${Date.now()}_${index}`;
  });
  cloned.connections.forEach((conn: any, index: number) => {
    conn.id = `${conn.id}_${Date.now()}_${index}`;
  });
  
  return cloned;
}