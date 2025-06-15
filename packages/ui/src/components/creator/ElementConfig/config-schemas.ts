import type { ElementConfigSchema } from './types';

// Configuration schemas for all element types
export const ELEMENT_CONFIG_SCHEMAS: Record<string, ElementConfigSchema> = {
  textBlock: {
    elementType: 'textBlock',
    displayName: 'Text Block',
    properties: [
      {
        key: 'text',
        label: 'Text Content',
        type: 'textarea',
        required: true,
        placeholder: 'Enter your text content...',
        helpText: 'The text content to display. Supports basic formatting.',
      },
      {
        key: 'fontSize',
        label: 'Font Size',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
          { label: 'Extra Large', value: 'xlarge' },
        ],
        helpText: 'Size of the text display.',
      },
      {
        key: 'textAlign',
        label: 'Text Alignment',
        type: 'select',
        defaultValue: 'left',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
      {
        key: 'color',
        label: 'Text Color',
        type: 'color',
        defaultValue: '#ffffff',
        helpText: 'Color of the text content.',
      },
    ],
    presets: [
      {
        name: 'Heading',
        description: 'Large, centered heading text',
        config: {
          text: 'Your Heading Here',
          fontSize: 'xlarge',
          textAlign: 'center',
          color: '#fbbf24',
        },
      },
      {
        name: 'Body Text',
        description: 'Standard paragraph text',
        config: {
          text: 'Your content goes here...',
          fontSize: 'medium',
          textAlign: 'left',
          color: '#ffffff',
        },
      },
    ],
  },

  button: {
    elementType: 'button',
    displayName: 'Button',
    properties: [
      {
        key: 'label',
        label: 'Button Text',
        type: 'text',
        required: true,
        placeholder: 'Button',
        helpText: 'The text displayed on the button.',
      },
      {
        key: 'action',
        label: 'Action Type',
        type: 'select',
        required: true,
        defaultValue: 'submit',
        options: [
          { label: 'Submit Form', value: 'submit' },
          { label: 'Go to URL', value: 'url' },
          { label: 'Show Message', value: 'message' },
          { label: 'Custom Action', value: 'custom' },
        ],
        helpText: 'What happens when the button is clicked.',
      },
      {
        key: 'url',
        label: 'Target URL',
        type: 'url',
        placeholder: 'https://example.com',
        helpText: 'URL to navigate to when action is "Go to URL".',
      },
      {
        key: 'size',
        label: 'Button Size',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
      },
      {
        key: 'variant',
        label: 'Style Variant',
        type: 'select',
        defaultValue: 'primary',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Outline', value: 'outline' },
        ],
      },
    ],
    presets: [
      {
        name: 'Submit Button',
        description: 'Primary submit button',
        config: {
          label: 'Submit',
          action: 'submit',
          size: 'large',
          variant: 'primary',
        },
      },
      {
        name: 'Link Button',
        description: 'Button that navigates to a URL',
        config: {
          label: 'Learn More',
          action: 'url',
          url: 'https://example.com',
          size: 'medium',
          variant: 'outline',
        },
      },
    ],
  },

  textInput: {
    elementType: 'textInput',
    displayName: 'Text Input',
    properties: [
      {
        key: 'label',
        label: 'Field Label',
        type: 'text',
        placeholder: 'Enter label...',
        helpText: 'Label text displayed above the input field.',
      },
      {
        key: 'placeholder',
        label: 'Placeholder Text',
        type: 'text',
        placeholder: 'Enter placeholder...',
        helpText: 'Hint text shown when the input is empty.',
      },
      {
        key: 'required',
        label: 'Required Field',
        type: 'boolean',
        defaultValue: false,
        helpText: 'Whether this field must be filled out.',
      },
      {
        key: 'inputType',
        label: 'Input Type',
        type: 'select',
        defaultValue: 'text',
        options: [
          { label: 'Text', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Phone', value: 'tel' },
          { label: 'Number', value: 'number' },
          { label: 'Password', value: 'password' },
          { label: 'Multi-line', value: 'textarea' },
        ],
        helpText: 'Type of input field and validation.',
      },
      {
        key: 'maxLength',
        label: 'Maximum Length',
        type: 'number',
        min: 1,
        max: 1000,
        helpText: 'Maximum number of characters allowed.',
      },
    ],
    presets: [
      {
        name: 'Email Field',
        description: 'Email input with validation',
        config: {
          label: 'Email Address',
          placeholder: 'Enter your email...',
          required: true,
          inputType: 'email',
        },
      },
      {
        name: 'Name Field',
        description: 'Simple text input for names',
        config: {
          label: 'Full Name',
          placeholder: 'Enter your name...',
          required: true,
          inputType: 'text',
          maxLength: 100,
        },
      },
    ],
  },

  choiceSelect: {
    elementType: 'choiceSelect',
    displayName: 'Choice Select',
    properties: [
      {
        key: 'label',
        label: 'Field Label',
        type: 'text',
        placeholder: 'Enter label...',
        helpText: 'Label text displayed above the select field.',
      },
      {
        key: 'options',
        label: 'Options',
        type: 'textarea',
        required: true,
        helpText: 'List of options for the user to choose from (one per line).',
      },
      {
        key: 'multiple',
        label: 'Allow Multiple',
        type: 'boolean',
        defaultValue: false,
        helpText: 'Whether users can select multiple options.',
      },
      {
        key: 'required',
        label: 'Required Field',
        type: 'boolean',
        defaultValue: false,
        helpText: 'Whether this field must be filled out.',
      },
    ],
    presets: [
      {
        name: 'Single Choice',
        description: 'Single selection dropdown',
        config: {
          label: 'Choose an option',
          options: ['Option 1', 'Option 2', 'Option 3'],
          multiple: false,
          required: true,
        },
      },
      {
        name: 'Multiple Choice',
        description: 'Multiple selection field',
        config: {
          label: 'Select all that apply',
          options: ['Choice A', 'Choice B', 'Choice C'],
          multiple: true,
          required: false,
        },
      },
    ],
  },

  imageBlock: {
    elementType: 'imageBlock',
    displayName: 'Image Block',
    properties: [
      {
        key: 'src',
        label: 'Image URL',
        type: 'url',
        required: true,
        placeholder: 'https://example.com/image.jpg',
        helpText: 'URL of the image to display.',
      },
      {
        key: 'alt',
        label: 'Alt Text',
        type: 'text',
        placeholder: 'Describe the image...',
        helpText: 'Alternative text for accessibility.',
      },
      {
        key: 'width',
        label: 'Width',
        type: 'select',
        defaultValue: 'full',
        options: [
          { label: 'Small (25%)', value: 'small' },
          { label: 'Medium (50%)', value: 'medium' },
          { label: 'Large (75%)', value: 'large' },
          { label: 'Full Width', value: 'full' },
        ],
      },
      {
        key: 'alignment',
        label: 'Alignment',
        type: 'select',
        defaultValue: 'center',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
    ],
    presets: [
      {
        name: 'Hero Image',
        description: 'Full-width centered image',
        config: {
          src: 'https://via.placeholder.com/800x400',
          alt: 'Hero image',
          width: 'full',
          alignment: 'center',
        },
      },
      {
        name: 'Inline Image',
        description: 'Medium-sized inline image',
        config: {
          src: 'https://via.placeholder.com/400x300',
          alt: 'Inline image',
          width: 'medium',
          alignment: 'left',
        },
      },
    ],
  },

  divider: {
    elementType: 'divider',
    displayName: 'Divider',
    properties: [
      {
        key: 'style',
        label: 'Divider Style',
        type: 'select',
        defaultValue: 'solid',
        options: [
          { label: 'Solid Line', value: 'solid' },
          { label: 'Dashed Line', value: 'dashed' },
          { label: 'Dotted Line', value: 'dotted' },
          { label: 'Spacer (Invisible)', value: 'spacer' },
        ],
      },
      {
        key: 'thickness',
        label: 'Thickness',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Thin', value: 'thin' },
          { label: 'Medium', value: 'medium' },
          { label: 'Thick', value: 'thick' },
        ],
      },
      {
        key: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#ffffff',
        helpText: 'Color of the divider line.',
      },
      {
        key: 'spacing',
        label: 'Spacing',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
        helpText: 'Space above and below the divider.',
      },
    ],
    presets: [
      {
        name: 'Section Break',
        description: 'Standard section divider',
        config: {
          style: 'solid',
          thickness: 'thin',
          color: '#ffffff',
          spacing: 'medium',
        },
      },
      {
        name: 'Spacer',
        description: 'Invisible spacing element',
        config: {
          style: 'spacer',
          spacing: 'large',
        },
      },
    ],
  },
};

export function getElementConfigSchema(elementType: string): ElementConfigSchema | null {
  return ELEMENT_CONFIG_SCHEMAS[elementType] || null;
}

export function getAllElementConfigSchemas(): ElementConfigSchema[] {
  return Object.values(ELEMENT_CONFIG_SCHEMAS);
} 
