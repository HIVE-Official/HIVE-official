import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PropertyField } from './property-field';

/**
 * # Property Field
 *
 * Single configuration field in the properties panel. Supports multiple field types
 * for editing element configuration: text, number, boolean, select, textarea, color, date.
 *
 * ## Features
 * - 7 field types with appropriate inputs
 * - Required indicator (red asterisk)
 * - Help text with tooltip
 * - Placeholder support
 * - Min/max validation for numbers
 * - Options for select dropdowns
 * - Color picker with hex input
 * - Disabled state
 * - Change handlers with typed values
 *
 * ## Usage
 * ```tsx
 * <PropertyField
 *   label="Button Label"
 *   type="text"
 *   value={value}
 *   onChange={setValue}
 *   required
 *   helpText="Text shown on the button"
 * />
 * ```
 */
const meta = {
  title: '05-HiveLab/Panels/PropertyField',
  component: PropertyField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PropertyField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Text field
 */
export const TextField: Story = {
  args: {
    label: 'Button Label',
    type: 'text',
    value: 'Click Me',
    placeholder: 'Enter text...',
    required: true,
    helpText: 'Text displayed on the button',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <PropertyField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/**
 * Number field
 */
export const NumberField: Story = {
  args: {
    label: 'Max Length',
    type: 'number',
    value: 100,
    min: 1,
    max: 500,
    helpText: 'Maximum number of characters',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <PropertyField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/**
 * Boolean field (switch)
 */
export const BooleanField: Story = {
  args: {
    label: 'Required Field',
    type: 'boolean',
    value: true,
    helpText: 'User must provide a value',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <PropertyField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/**
 * Select field (dropdown)
 */
export const SelectField: Story = {
  args: {
    label: 'Validation Type',
    type: 'select',
    value: 'email',
    placeholder: 'Choose validation...',
    options: [
      { value: 'none', label: 'None' },
      { value: 'email', label: 'Email Address' },
      { value: 'url', label: 'URL' },
      { value: 'phone', label: 'Phone Number' },
      { value: 'custom', label: 'Custom Regex' },
    ],
    helpText: 'Type of validation to apply',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <PropertyField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/**
 * Textarea field
 */
export const TextareaField: Story = {
  args: {
    label: 'Description',
    type: 'textarea',
    value: 'This is a longer text field that supports multiple lines of input.',
    placeholder: 'Enter description...',
    helpText: 'Detailed description of the element',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <PropertyField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/**
 * Color field (picker + hex input)
 */
export const ColorField: Story = {
  args: {
    label: 'Button Color',
    type: 'color',
    value: '#3b82f6',
    helpText: 'Background color of the button',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <PropertyField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/**
 * Date field
 */
export const DateField: Story = {
  args: {
    label: 'Event Date',
    type: 'date',
    value: '2025-12-31',
    required: true,
    helpText: 'Date when the event occurs',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-[400px]">
        <PropertyField {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};

/**
 * All field types
 */
export const AllFieldTypes: Story = {
  render: () => {
    const [values, setValues] = useState({
      text: 'Sample Text',
      number: 42,
      boolean: true,
      select: 'option2',
      textarea: 'Multi-line\ntext content',
      color: '#10b981',
      date: '2025-10-01',
    });

    return (
      <div className="w-[400px] space-y-4">
        <PropertyField
          label="Text Input"
          type="text"
          value={values.text}
          onChange={(v) => setValues({ ...values, text: v })}
          placeholder="Enter text..."
        />

        <PropertyField
          label="Number Input"
          type="number"
          value={values.number}
          onChange={(v) => setValues({ ...values, number: v })}
          min={0}
          max={100}
        />

        <PropertyField
          label="Boolean Switch"
          type="boolean"
          value={values.boolean}
          onChange={(v) => setValues({ ...values, boolean: v })}
        />

        <PropertyField
          label="Select Dropdown"
          type="select"
          value={values.select}
          onChange={(v) => setValues({ ...values, select: v })}
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
        />

        <PropertyField
          label="Textarea"
          type="textarea"
          value={values.textarea}
          onChange={(v) => setValues({ ...values, textarea: v })}
        />

        <PropertyField
          label="Color Picker"
          type="color"
          value={values.color}
          onChange={(v) => setValues({ ...values, color: v })}
        />

        <PropertyField
          label="Date Picker"
          type="date"
          value={values.date}
          onChange={(v) => setValues({ ...values, date: v })}
        />
      </div>
    );
  },
};

/**
 * Required fields
 */
export const RequiredFields: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <PropertyField
        label="Required Text"
        type="text"
        value=""
        onChange={() => {}}
        required
        placeholder="This field is required"
      />

      <PropertyField
        label="Required Number"
        type="number"
        value={0}
        onChange={() => {}}
        required
      />

      <PropertyField
        label="Required Date"
        type="date"
        value=""
        onChange={() => {}}
        required
      />
    </div>
  ),
};

/**
 * With help text
 */
export const WithHelpText: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <PropertyField
        label="API Endpoint"
        type="text"
        value="https://api.example.com/data"
        onChange={() => {}}
        helpText="Full URL to the API endpoint (including https://)"
        placeholder="https://..."
      />

      <PropertyField
        label="Timeout (seconds)"
        type="number"
        value={30}
        onChange={() => {}}
        helpText="How long to wait for a response before timing out"
        min={1}
        max={300}
      />

      <PropertyField
        label="Enable Caching"
        type="boolean"
        value={true}
        onChange={() => {}}
        helpText="Cache responses to improve performance"
      />
    </div>
  ),
};

/**
 * Disabled fields
 */
export const DisabledFields: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <PropertyField
        label="Read-only Text"
        type="text"
        value="Cannot edit this"
        onChange={() => {}}
        disabled
      />

      <PropertyField
        label="Disabled Number"
        type="number"
        value={100}
        onChange={() => {}}
        disabled
      />

      <PropertyField
        label="Disabled Boolean"
        type="boolean"
        value={true}
        onChange={() => {}}
        disabled
      />

      <PropertyField
        label="Disabled Select"
        type="select"
        value="option1"
        onChange={() => {}}
        disabled
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
};

/**
 * In properties panel
 */
export const InPropertiesPanel: Story = {
  render: () => {
    const [config, setConfig] = useState({
      label: 'Submit',
      placeholder: 'Enter your email',
      required: true,
      validation: 'email',
      maxLength: 100,
      helpText: 'We will never share your email',
      buttonColor: '#3b82f6',
      enableAnalytics: true,
    });

    return (
      <div className="w-[400px] bg-background border rounded-lg shadow-lg">
        {/* Header */}
        <div className="px-4 py-3 border-b">
          <h3 className="text-sm font-semibold">Element Properties</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Text Input Configuration
          </p>
        </div>

        {/* Properties */}
        <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
          <PropertyField
            label="Button Label"
            type="text"
            value={config.label}
            onChange={(v) => setConfig({ ...config, label: v })}
            required
            helpText="Text displayed on the submit button"
          />

          <PropertyField
            label="Placeholder"
            type="text"
            value={config.placeholder}
            onChange={(v) => setConfig({ ...config, placeholder: v })}
            helpText="Hint text shown when field is empty"
          />

          <PropertyField
            label="Required Field"
            type="boolean"
            value={config.required}
            onChange={(v) => setConfig({ ...config, required: v })}
            helpText="User must provide a value"
          />

          <PropertyField
            label="Validation"
            type="select"
            value={config.validation}
            onChange={(v) => setConfig({ ...config, validation: v })}
            options={[
              { value: 'none', label: 'None' },
              { value: 'email', label: 'Email Address' },
              { value: 'url', label: 'URL' },
              { value: 'phone', label: 'Phone Number' },
            ]}
            helpText="Type of validation to apply"
          />

          <PropertyField
            label="Max Length"
            type="number"
            value={config.maxLength}
            onChange={(v) => setConfig({ ...config, maxLength: v })}
            min={1}
            max={500}
            helpText="Maximum number of characters"
          />

          <PropertyField
            label="Help Text"
            type="textarea"
            value={config.helpText}
            onChange={(v) => setConfig({ ...config, helpText: v })}
            placeholder="Optional help text..."
            helpText="Additional help shown below the input"
          />

          <PropertyField
            label="Button Color"
            type="color"
            value={config.buttonColor}
            onChange={(v) => setConfig({ ...config, buttonColor: v })}
            helpText="Background color of the submit button"
          />

          <PropertyField
            label="Enable Analytics"
            type="boolean"
            value={config.enableAnalytics}
            onChange={(v) => setConfig({ ...config, enableAnalytics: v })}
            helpText="Track form submissions in analytics"
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t flex justify-end gap-2">
          <button className="px-3 py-1.5 text-sm rounded hover:bg-muted">
            Reset
          </button>
          <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Apply
          </button>
        </div>
      </div>
    );
  },
};

/**
 * Validation states
 */
export const ValidationStates: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);

    const isValidEmail = email.includes('@') && email.includes('.');
    const isValidAge = age >= 18 && age <= 120;

    return (
      <div className="w-[400px] space-y-4">
        <div>
          <PropertyField
            label="Email Address"
            type="text"
            value={email}
            onChange={setEmail}
            required
            placeholder="you@example.com"
            helpText="Must be a valid email address"
          />
          {email && !isValidEmail && (
            <p className="text-xs text-destructive mt-1">Invalid email format</p>
          )}
          {email && isValidEmail && (
            <p className="text-xs text-green-600 mt-1">✓ Valid email</p>
          )}
        </div>

        <div>
          <PropertyField
            label="Age"
            type="number"
            value={age}
            onChange={setAge}
            min={18}
            max={120}
            required
            helpText="Must be 18 or older"
          />
          {age > 0 && !isValidAge && (
            <p className="text-xs text-destructive mt-1">Age must be between 18 and 120</p>
          )}
          {age > 0 && isValidAge && (
            <p className="text-xs text-green-600 mt-1">✓ Valid age</p>
          )}
        </div>
      </div>
    );
  },
};
