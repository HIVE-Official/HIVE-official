#!/usr/bin/env tsx

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore'
import { Element, ElementId, createElementId } from '../../packages/core/src/domain/creation/element'

// Firebase configuration (use your actual config)
const firebaseConfig = {
  // Add your Firebase config here
  projectId: process.env.FIREBASE_PROJECT_ID || 'hive-dev',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Core 12 vBETA Elements with immutable versioning
const coreElements: Omit<Element, 'createdAt' | 'updatedAt'>[] = [
  // Display & Layout Category
  {
    id: createElementId('textBlock', 1),
    name: 'Text Block',
    type: 'textBlock',
    category: 'Display & Layout',
    description: 'Display formatted text content with styling options',
    icon: 'Type',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        text: { type: 'string', maxLength: 1000 },
        style: {
          type: 'object',
          properties: {
            fontSize: { type: 'string', enum: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'] },
            fontWeight: { type: 'string', enum: ['normal', 'medium', 'semibold', 'bold'] },
            textAlign: { type: 'string', enum: ['left', 'center', 'right'] },
            textColor: { type: 'string' },
            backgroundColor: { type: 'string' },
          }
        }
      },
      required: ['text']
    }),
    defaultConfig: {
      text: 'Enter your text here',
      style: {
        fontSize: 'base',
        fontWeight: 'normal',
        textAlign: 'left',
      }
    },
    presets: [
      {
        id: 'heading-large',
        name: 'Large Heading',
        description: 'Bold, large text for main headings',
        elementType: 'textBlock',
        config: {
          text: 'Main Heading',
          style: { fontSize: '3xl', fontWeight: 'bold', textAlign: 'center' }
        },
        tags: ['heading', 'title'],
        popularity: 95
      },
      {
        id: 'body-text',
        name: 'Body Text',
        description: 'Standard paragraph text',
        elementType: 'textBlock',
        config: {
          text: 'This is body text for paragraphs and descriptions.',
          style: { fontSize: 'base', fontWeight: 'normal' }
        },
        tags: ['paragraph', 'content'],
        popularity: 85
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('imageBlock', 1),
    name: 'Image Block',
    type: 'imageBlock',
    category: 'Display & Layout',
    description: 'Display images with captions and styling',
    icon: 'Image',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        src: { type: 'string', format: 'uri' },
        alt: { type: 'string', maxLength: 200 },
        caption: { type: 'string', maxLength: 300 },
        style: {
          type: 'object',
          properties: {
            width: { oneOf: [{ type: 'number' }, { type: 'string', enum: ['auto', 'full'] }] },
            height: { oneOf: [{ type: 'number' }, { type: 'string', enum: ['auto', 'full'] }] },
            borderRadius: { type: 'number', minimum: 0, maximum: 50 },
          }
        }
      },
      required: ['src', 'alt']
    }),
    defaultConfig: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Placeholder image',
      style: {
        width: 'auto',
        borderRadius: 8,
      }
    },
    presets: [
      {
        id: 'hero-image',
        name: 'Hero Image',
        description: 'Full-width banner image',
        elementType: 'imageBlock',
        config: {
          src: 'https://via.placeholder.com/800x400',
          alt: 'Hero banner',
          style: { width: 'full', borderRadius: 0 }
        },
        tags: ['banner', 'hero'],
        popularity: 75
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('divider', 1),
    name: 'Divider',
    type: 'divider',
    category: 'Display & Layout',
    description: 'Visual separator between content sections',
    icon: 'Minus',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        thickness: { type: 'number', minimum: 1, maximum: 10 },
        color: { type: 'string' },
        style: { type: 'string', enum: ['solid', 'dashed', 'dotted'] },
        margin: { type: 'number', minimum: 0, maximum: 50 },
      }
    }),
    defaultConfig: {
      thickness: 1,
      color: '#e5e7eb',
      style: 'solid',
      margin: 16,
    },
    presets: [
      {
        id: 'section-break',
        name: 'Section Break',
        description: 'Thick divider for major sections',
        elementType: 'divider',
        config: {
          thickness: 3,
          color: '#3b82f6',
          style: 'solid',
          margin: 24,
        },
        tags: ['section', 'break'],
        popularity: 60
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('stack', 1),
    name: 'Stack',
    type: 'stack',
    category: 'Display & Layout',
    description: 'Container for arranging elements vertically or horizontally',
    icon: 'Layers',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        direction: { type: 'string', enum: ['vertical', 'horizontal'] },
        spacing: { type: 'number', minimum: 0, maximum: 50 },
        alignment: { type: 'string', enum: ['start', 'center', 'end', 'stretch'] },
        wrap: { type: 'boolean' },
        style: {
          type: 'object',
          properties: {
            backgroundColor: { type: 'string' },
            padding: { type: 'number', minimum: 0, maximum: 100 },
            borderRadius: { type: 'number', minimum: 0, maximum: 50 },
          }
        }
      }
    }),
    defaultConfig: {
      direction: 'vertical',
      spacing: 8,
      alignment: 'start',
      wrap: false,
      style: {
        padding: 16,
      }
    },
    presets: [
      {
        id: 'card-container',
        name: 'Card Container',
        description: 'Styled container with background and padding',
        elementType: 'stack',
        config: {
          direction: 'vertical',
          spacing: 12,
          alignment: 'start',
          style: {
            backgroundColor: '#ffffff',
            padding: 24,
            borderRadius: 12,
          }
        },
        tags: ['card', 'container'],
        popularity: 80
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  // Inputs & Choices Category
  {
    id: createElementId('button', 1),
    name: 'Button',
    type: 'button',
    category: 'Inputs & Choices',
    description: 'Interactive button for actions and navigation',
    icon: 'MousePointer',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        text: { type: 'string', maxLength: 100 },
        variant: { type: 'string', enum: ['primary', 'secondary', 'outline', 'ghost'] },
        size: { type: 'string', enum: ['sm', 'md', 'lg'] },
        disabled: { type: 'boolean' },
        onClick: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['navigate', 'submit', 'reset', 'custom'] },
            target: { type: 'string' },
            data: { type: 'object' },
          }
        }
      },
      required: ['text']
    }),
    defaultConfig: {
      text: 'Click me',
      variant: 'primary',
      size: 'md',
      disabled: false,
    },
    presets: [
      {
        id: 'submit-button',
        name: 'Submit Button',
        description: 'Primary button for form submission',
        elementType: 'button',
        config: {
          text: 'Submit',
          variant: 'primary',
          size: 'lg',
          onClick: { type: 'submit' }
        },
        tags: ['submit', 'form'],
        popularity: 90
      },
      {
        id: 'cancel-button',
        name: 'Cancel Button',
        description: 'Secondary button for canceling actions',
        elementType: 'button',
        config: {
          text: 'Cancel',
          variant: 'outline',
          size: 'md',
          onClick: { type: 'reset' }
        },
        tags: ['cancel', 'secondary'],
        popularity: 70
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('choiceSelect', 1),
    name: 'Choice Select',
    type: 'choiceSelect',
    category: 'Inputs & Choices',
    description: 'Dropdown or multi-select for choosing from options',
    icon: 'ChevronDown',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', maxLength: 200 },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              value: { type: 'string' },
              label: { type: 'string', maxLength: 100 },
              disabled: { type: 'boolean' },
            },
            required: ['value', 'label']
          },
          minItems: 1,
          maxItems: 20
        },
        multiple: { type: 'boolean' },
        required: { type: 'boolean' },
        placeholder: { type: 'string', maxLength: 100 },
      },
      required: ['label', 'options']
    }),
    defaultConfig: {
      label: 'Select an option',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ],
      multiple: false,
      required: false,
      placeholder: 'Choose...',
    },
    presets: [
      {
        id: 'yes-no-select',
        name: 'Yes/No Choice',
        description: 'Simple binary choice selector',
        elementType: 'choiceSelect',
        config: {
          label: 'Do you agree?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          required: true,
        },
        tags: ['binary', 'agreement'],
        popularity: 85
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('textInput', 1),
    name: 'Text Input',
    type: 'textInput',
    category: 'Inputs & Choices',
    description: 'Single or multi-line text input field',
    icon: 'Type',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', maxLength: 200 },
        placeholder: { type: 'string', maxLength: 100 },
        type: { type: 'string', enum: ['text', 'email', 'password', 'number', 'tel', 'url'] },
        required: { type: 'boolean' },
        minLength: { type: 'number', minimum: 0 },
        maxLength: { type: 'number', minimum: 1, maximum: 1000 },
        pattern: { type: 'string' },
      },
      required: ['label']
    }),
    defaultConfig: {
      label: 'Enter text',
      type: 'text',
      required: false,
      placeholder: 'Type here...',
    },
    presets: [
      {
        id: 'email-input',
        name: 'Email Input',
        description: 'Email address input with validation',
        elementType: 'textInput',
        config: {
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'your@email.com',
        },
        tags: ['email', 'contact'],
        popularity: 95
      },
      {
        id: 'name-input',
        name: 'Name Input',
        description: 'Full name text input',
        elementType: 'textInput',
        config: {
          label: 'Full Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your full name',
          minLength: 2,
          maxLength: 100,
        },
        tags: ['name', 'identity'],
        popularity: 90
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('ratingStars', 1),
    name: 'Rating Stars',
    type: 'ratingStars',
    category: 'Inputs & Choices',
    description: 'Star rating input for feedback and reviews',
    icon: 'Star',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', maxLength: 200 },
        maxRating: { type: 'number', minimum: 3, maximum: 10 },
        allowHalf: { type: 'boolean' },
        required: { type: 'boolean' },
        size: { type: 'string', enum: ['sm', 'md', 'lg'] },
        color: { type: 'string' },
      },
      required: ['label']
    }),
    defaultConfig: {
      label: 'Rate this',
      maxRating: 5,
      allowHalf: false,
      required: false,
      size: 'md',
      color: '#fbbf24',
    },
    presets: [
      {
        id: 'satisfaction-rating',
        name: 'Satisfaction Rating',
        description: '5-star satisfaction survey',
        elementType: 'ratingStars',
        config: {
          label: 'How satisfied are you?',
          maxRating: 5,
          required: true,
          size: 'lg',
        },
        tags: ['satisfaction', 'survey'],
        popularity: 80
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  // Logic & Dynamics Category
  {
    id: createElementId('countdownTimer', 1),
    name: 'Countdown Timer',
    type: 'countdownTimer',
    category: 'Logic & Dynamics',
    description: 'Dynamic countdown to a specific date and time',
    icon: 'Clock',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', maxLength: 200 },
        targetDate: { type: 'string', format: 'date-time' },
        format: { type: 'string', enum: ['days', 'hours', 'minutes', 'seconds', 'dhms'] },
        onComplete: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['message', 'redirect', 'trigger'] },
            value: { type: 'string' },
          }
        }
      },
      required: ['targetDate']
    }),
    defaultConfig: {
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      format: 'dhms',
      label: 'Time remaining',
    },
    presets: [
      {
        id: 'deadline-timer',
        name: 'Assignment Deadline',
        description: 'Countdown to assignment due date',
        elementType: 'countdownTimer',
        config: {
          label: 'Assignment due in:',
          format: 'dhms',
          onComplete: {
            type: 'message',
            value: 'Assignment deadline has passed!'
          }
        },
        tags: ['deadline', 'assignment'],
        popularity: 75
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('progressBar', 1),
    name: 'Progress Bar',
    type: 'progressBar',
    category: 'Logic & Dynamics',
    description: 'Visual progress indicator with customizable styling',
    icon: 'BarChart3',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', maxLength: 200 },
        value: { type: 'number', minimum: 0, maximum: 100 },
        max: { type: 'number', minimum: 1 },
        showPercentage: { type: 'boolean' },
        color: { type: 'string' },
        backgroundColor: { type: 'string' },
        height: { type: 'number', minimum: 4, maximum: 50 },
      }
    }),
    defaultConfig: {
      value: 0,
      max: 100,
      showPercentage: true,
      color: '#3b82f6',
      backgroundColor: '#e5e7eb',
      height: 8,
    },
    presets: [
      {
        id: 'course-progress',
        name: 'Course Progress',
        description: 'Track completion of course materials',
        elementType: 'progressBar',
        config: {
          label: 'Course Completion',
          value: 65,
          showPercentage: true,
          color: '#10b981',
          height: 12,
        },
        tags: ['course', 'completion'],
        popularity: 70
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('conditionGate', 1),
    name: 'Condition Gate',
    type: 'conditionGate',
    category: 'Logic & Dynamics',
    description: 'Show/hide elements based on conditional logic',
    icon: 'GitBranch',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        conditions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sourceElementId: { type: 'string' },
              sourceProperty: { type: 'string' },
              operator: { type: 'string', enum: ['equals', 'notEquals', 'contains', 'greaterThan', 'lessThan'] },
              value: { oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
            },
            required: ['sourceElementId', 'sourceProperty', 'operator']
          },
          minItems: 1
        },
        logic: { type: 'string', enum: ['and', 'or'] },
        onTrue: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['show', 'hide', 'setValue', 'trigger'] },
              targetElementId: { type: 'string' },
              value: {}
            },
            required: ['type', 'targetElementId']
          }
        },
        onFalse: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['show', 'hide', 'setValue', 'trigger'] },
              targetElementId: { type: 'string' },
              value: {}
            },
            required: ['type', 'targetElementId']
          }
        }
      },
      required: ['conditions', 'onTrue']
    }),
    defaultConfig: {
      conditions: [],
      logic: 'and',
      onTrue: [],
      onFalse: [],
    },
    presets: [
      {
        id: 'show-if-yes',
        name: 'Show if Yes',
        description: 'Show elements when user selects "Yes"',
        elementType: 'conditionGate',
        config: {
          logic: 'and',
          onTrue: [{ type: 'show', targetElementId: 'target-element' }],
          onFalse: [{ type: 'hide', targetElementId: 'target-element' }],
        },
        tags: ['conditional', 'logic'],
        popularity: 60
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },

  {
    id: createElementId('pingTrigger', 1),
    name: 'Ping Trigger',
    type: 'pingTrigger',
    category: 'Logic & Dynamics',
    description: 'Trigger actions based on user interactions or timers',
    icon: 'Zap',
    version: 1,
    configSchema: JSON.stringify({
      type: 'object',
      properties: {
        label: { type: 'string', maxLength: 200 },
        triggerOn: { type: 'string', enum: ['click', 'hover', 'focus', 'timer'] },
        delay: { type: 'number', minimum: 0, maximum: 10000 },
        target: {
          type: 'object',
          properties: {
            type: { type: 'string', enum: ['element', 'external', 'analytics'] },
            elementId: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            event: { type: 'string' },
            data: { type: 'object' },
          },
          required: ['type']
        }
      },
      required: ['label', 'triggerOn', 'target']
    }),
    defaultConfig: {
      label: 'Trigger',
      triggerOn: 'click',
      delay: 0,
      target: {
        type: 'analytics',
        event: 'custom_event',
      },
    },
    presets: [
      {
        id: 'analytics-tracker',
        name: 'Analytics Tracker',
        description: 'Track custom events for analytics',
        elementType: 'pingTrigger',
        config: {
          label: 'Track Event',
          triggerOn: 'click',
          target: {
            type: 'analytics',
            event: 'button_clicked',
            data: { source: 'tool' }
          }
        },
        tags: ['analytics', 'tracking'],
        popularity: 55
      }
    ],
    isOfficial: true,
    isDeprecated: false,
    usageCount: 0,
  },
]

async function seedElements() {
  console.log('🌱 Seeding core elements...')
  
  const batch = writeBatch(db)
  const now = new Date()
  
  for (const elementData of coreElements) {
    const element: Element = {
      ...elementData,
      createdAt: now,
      updatedAt: now,
    }
    
    const elementRef = doc(collection(db, 'elements'), element.id)
    batch.set(elementRef, element)
    
    console.log(`  ✓ ${element.name} (${element.id})`)
  }
  
  await batch.commit()
  
  console.log(`✅ Successfully seeded ${coreElements.length} core elements`)
  console.log('\nElement summary by category:')
  
  const categories = ['Display & Layout', 'Inputs & Choices', 'Logic & Dynamics']
  for (const category of categories) {
    const categoryElements = coreElements.filter(e => e.category === category)
    console.log(`  ${category}: ${categoryElements.length} elements`)
    categoryElements.forEach(e => console.log(`    - ${e.name}`))
  }
}

// Run the seed script
if (require.main === module) {
  seedElements()
    .then(() => {
      console.log('\n🎉 Element seeding completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Error seeding elements:', error)
      process.exit(1)
    })
}

export { seedElements, coreElements } 