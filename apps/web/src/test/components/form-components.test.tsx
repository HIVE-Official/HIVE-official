import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

// Import form components from the UI package
import { 
  Form,
  FormField,
  FormSection,
  FormValidation,
  MultiStepForm,
  DynamicForm
} from '@hive/ui';

// Mock form validation utilities
const mockValidationRules = {
  required: (value: any) => !!value || 'This field is required',
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
  minLength: (min: number) => (value: string) => value.length >= min || `Minimum ${min} characters required`,
  maxLength: (max: number) => (value: string) => value.length <= max || `Maximum ${max} characters allowed`
};

const mockFormData = {
  createTool: {
    name: '',
    description: '',
    category: '',
    tags: [],
    isPublic: false
  },
  userProfile: {
    displayName: '',
    email: '',
    bio: '',
    school: '',
    major: ''
  }
};

describe('Form Components Test Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Component', () => {
    it('renders form with proper structure and validation', async () => {
      const handleSubmit = vi.fn();
      const handleValidationError = vi.fn();
      
      render(
        <Form
          onSubmit={handleSubmit}
          onValidationError={handleValidationError}
          validationMode="onBlur"
        >
          <FormField
            name="email"
            label="Email Address"
            type="email"
            required
            validate={mockValidationRules.email}
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            required
            validate={mockValidationRules.minLength(8)}
          />
          <button type="submit">Submit</button>
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      const emailField = screen.getByLabelText('Email Address');
      const passwordField = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      expect(emailField).toHaveAttribute('required');
      expect(passwordField).toHaveAttribute('type', 'password');
      
      // Test validation on blur
      await userEvent.type(emailField, 'invalid-email');
      await userEvent.tab();
      
      await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      });
      
      // Test successful validation
      await userEvent.clear(emailField);
      await userEvent.type(emailField, 'user@university.edu');
      await userEvent.type(passwordField, 'password123');
      
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith({
          email: 'user@university.edu',
          password: 'password123'
        });
      });
    });

    it('handles form state management and controlled inputs', async () => {
      const ControlledForm = () => {
        const [formData, setFormData] = React.useState({ name: '', email: '' });
        
        return (
          <Form
            value={formData}
            onChange={setFormData}
            onSubmit={(data) => console.log(data)}
          >
            <FormField
              name="name"
              label="Full Name"
              required
            />
            <FormField
              name="email"
              label="Email"
              type="email"
              required
            />
          </Form>
        );
      };
      
      render(<ControlledForm />);
      
      const nameField = screen.getByLabelText('Full Name');
      const emailField = screen.getByLabelText('Email');
      
      await userEvent.type(nameField, 'John Doe');
      await userEvent.type(emailField, 'john@university.edu');
      
      expect(nameField).toHaveValue('John Doe');
      expect(emailField).toHaveValue('john@university.edu');
    });

    it('supports conditional field rendering', () => {
      const ConditionalForm = () => {
        const [userType, setUserType] = React.useState('student');
        
        return (
          <Form>
            <FormField
              name="userType"
              label="User Type"
              type="select"
              options={[
                { value: 'student', label: 'Student' },
                { value: 'faculty', label: 'Faculty' }
              ]}
              value={userType}
              onChange={(e: React.ChangeEvent) => setUserType(e.target.value)}
            />
            
            {userType === 'student' && (
              <FormField
                name="graduationYear"
                label="Graduation Year"
                type="number"
              />
            )}
            
            {userType === 'faculty' && (
              <FormField
                name="department"
                label="Department"
                type="text"
              />
            )}
          </Form>
        );
      };
      
      render(<ConditionalForm />);
      
      expect(screen.getByLabelText('Graduation Year')).toBeInTheDocument();
      expect(screen.queryByLabelText('Department')).not.toBeInTheDocument();
      
      const userTypeSelect = screen.getByLabelText('User Type');
      fireEvent.change(userTypeSelect, { target: { value: 'faculty' } });
      
      expect(screen.queryByLabelText('Graduation Year')).not.toBeInTheDocument();
      expect(screen.getByLabelText('Department')).toBeInTheDocument();
    });
  });

  describe('FormField Component', () => {
    it('renders different field types correctly', () => {
      const fieldTypes = [
        { type: 'text', label: 'Text Field' },
        { type: 'email', label: 'Email Field' },
        { type: 'password', label: 'Password Field' },
        { type: 'number', label: 'Number Field' },
        { type: 'textarea', label: 'Textarea Field' },
        { type: 'select', label: 'Select Field', options: [{ value: 'option1', label: 'Option 1' }] },
        { type: 'checkbox', label: 'Checkbox Field' },
        { type: 'radio', label: 'Radio Field', options: [{ value: 'radio1', label: 'Radio 1' }] }
      ];
      
      fieldTypes.forEach((field) => {
        const { container } = render(
          <FormField
            name={field.type}
            label={field.label}
            type={field.type}
            options={field.options}
          />
        );
        
        if (field.type === 'textarea') {
          expect(container.querySelector('textarea')).toBeInTheDocument();
        } else if (field.type === 'select') {
          expect(container.querySelector('select')).toBeInTheDocument();
        } else if (field.type === 'checkbox') {
          expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
        } else if (field.type === 'radio') {
          expect(container.querySelector('input[type="radio"]')).toBeInTheDocument();
        } else {
          expect(container.querySelector(`input[type="${field.type}"]`)).toBeInTheDocument();
        }
      });
    });

    it('handles field validation and error display', async () => {
      const handleChange = vi.fn();
      
      render(
        <FormField
          name="testField"
          label="Test Field"
          required
          validate={mockValidationRules.minLength(5)}
          onChange={handleChange}
          showValidation={true}
        />
      );
      
      const field = screen.getByLabelText('Test Field');
      
      // Test required validation
      fireEvent.blur(field);
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeInTheDocument();
      });
      
      // Test custom validation
      await userEvent.type(field, 'abc');
      fireEvent.blur(field);
      
      await waitFor(() => {
        expect(screen.getByText('Minimum 5 characters required')).toBeInTheDocument();
      });
      
      // Test successful validation
      await userEvent.clear(field);
      await userEvent.type(field, 'valid input');
      fireEvent.blur(field);
      
      await waitFor(() => {
        expect(screen.queryByText('Minimum 5 characters required')).not.toBeInTheDocument();
      });
    });

    it('supports field help text and descriptions', () => {
      render(
        <FormField
          name="complexField"
          label="Complex Field"
          helpText="This field requires special formatting"
          description="Enter your data in the format: ABC-123"
          placeholder="ABC-123"
        />
      );
      
      expect(screen.getByText('This field requires special formatting')).toBeInTheDocument();
      expect(screen.getByText('Enter your data in the format: ABC-123')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('ABC-123')).toBeInTheDocument();
    });
  });

  describe('FormSection Component', () => {
    it('organizes fields into logical sections', () => {
      render(
        <Form>
          <FormSection
            title="Personal Information"
            description="Enter your basic personal details"
          >
            <FormField name="firstName" label="First Name" />
            <FormField name="lastName" label="Last Name" />
            <FormField name="email" label="Email" type="email" />
          </FormSection>
          
          <FormSection
            title="Academic Information"
            description="Your educational background"
          >
            <FormField name="school" label="School" />
            <FormField name="major" label="Major" />
            <FormField name="graduationYear" label="Graduation Year" type="number" />
          </FormSection>
        </Form>
      );
      
      expect(screen.getByText('Personal Information')).toBeInTheDocument();
      expect(screen.getByText('Enter your basic personal details')).toBeInTheDocument();
      expect(screen.getByText('Academic Information')).toBeInTheDocument();
      expect(screen.getByText('Your educational background')).toBeInTheDocument();
      
      // Check that fields are properly grouped
      const personalSection = screen.getByText('Personal Information').closest('section');
      const academicSection = screen.getByText('Academic Information').closest('section');
      
      expect(personalSection).toContainElement(screen.getByLabelText('First Name'));
      expect(academicSection).toContainElement(screen.getByLabelText('School'));
    });

    it('supports collapsible sections', async () => {
      render(
        <FormSection
          title="Advanced Settings"
          collapsible
          defaultCollapsed
        >
          <FormField name="advancedOption1" label="Advanced Option 1" />
          <FormField name="advancedOption2" label="Advanced Option 2" />
        </FormSection>
      );
      
      const toggleButton = screen.getByRole('button', { name: /Advanced Settings/ });
      
      // Initially collapsed
      expect(screen.queryByLabelText('Advanced Option 1')).not.toBeVisible();
      
      // Expand section
      await userEvent.click(toggleButton);
      expect(screen.getByLabelText('Advanced Option 1')).toBeVisible();
      
      // Collapse again
      await userEvent.click(toggleButton);
      expect(screen.queryByLabelText('Advanced Option 1')).not.toBeVisible();
    });
  });

  describe('MultiStepForm Component', () => {
    const steps = [
      {
        id: 'personal',
        title: 'Personal Info',
        fields: ['firstName', 'lastName', 'email']
      },
      {
        id: 'academic',
        title: 'Academic Info',
        fields: ['school', 'major', 'graduationYear']
      },
      {
        id: 'preferences',
        title: 'Preferences',
        fields: ['interests', 'notifications']
      }
    ];

    it('handles multi-step form navigation', async () => {
      const handleStepChange = vi.fn();
      const handleComplete = vi.fn();
      
      render(
        <MultiStepForm
          steps={steps}
          onStepChange={handleStepChange}
          onComplete={handleComplete}
        >
          <FormSection step="personal">
            <FormField name="firstName" label="First Name" required />
            <FormField name="lastName" label="Last Name" required />
            <FormField name="email" label="Email" type="email" required />
          </FormSection>
          
          <FormSection step="academic">
            <FormField name="school" label="School" required />
            <FormField name="major" label="Major" required />
            <FormField name="graduationYear" label="Graduation Year" type="number" />
          </FormSection>
          
          <FormSection step="preferences">
            <FormField name="interests" label="Interests" type="textarea" />
            <FormField name="notifications" label="Enable Notifications" type="checkbox" />
          </FormSection>
        </MultiStepForm>
      );
      
      // Check initial step
      expect(screen.getByText('Personal Info')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      
      // Fill required fields
      await userEvent.type(screen.getByLabelText('First Name'), 'John');
      await userEvent.type(screen.getByLabelText('Last Name'), 'Doe');
      await userEvent.type(screen.getByLabelText('Email'), 'john@university.edu');
      
      // Navigate to next step
      const nextButton = screen.getByRole('button', { name: 'Next' });
      await userEvent.click(nextButton);
      
      expect(handleStepChange).toHaveBeenCalledWith(1, 'academic');
      expect(screen.getByText('Academic Info')).toBeInTheDocument();
      
      // Navigate back
      const backButton = screen.getByRole('button', { name: 'Back' });
      await userEvent.click(backButton);
      
      expect(handleStepChange).toHaveBeenCalledWith(0, 'personal');
    });

    it('validates steps before allowing navigation', async () => {
      render(
        <MultiStepForm steps={steps} validateOnNext>
          <FormSection step="personal">
            <FormField name="firstName" label="First Name" required />
            <FormField name="email" label="Email" type="email" required />
          </FormSection>
          
          <FormSection step="academic">
            <FormField name="school" label="School" required />
          </FormSection>
        </MultiStepForm>
      );
      
      const nextButton = screen.getByRole('button', { name: 'Next' });
      
      // Try to navigate without filling required fields
      await userEvent.click(nextButton);
      
      // Should show validation errors and not navigate
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.queryByText('Academic Info')).not.toBeInTheDocument();
      
      // Fill required fields
      await userEvent.type(screen.getByLabelText('First Name'), 'John');
      await userEvent.type(screen.getByLabelText('Email'), 'john@university.edu');
      
      // Now navigation should work
      await userEvent.click(nextButton);
      expect(screen.getByText('Academic Info')).toBeInTheDocument();
    });

    it('displays progress indicator', () => {
      render(
        <MultiStepForm steps={steps} showProgress currentStep={1}>
          <FormSection step="personal">
            <FormField name="firstName" label="First Name" />
          </FormSection>
          <FormSection step="academic">
            <FormField name="school" label="School" />
          </FormSection>
          <FormSection step="preferences">
            <FormField name="interests" label="Interests" />
          </FormSection>
        </MultiStepForm>
      );
      
      const progressIndicator = screen.getByRole('progressbar');
      expect(progressIndicator).toHaveAttribute('aria-valuenow', '1');
      expect(progressIndicator).toHaveAttribute('aria-valuemax', '3');
      
      // Check step indicators
      expect(screen.getByText('1')).toHaveClass('step-completed');
      expect(screen.getByText('2')).toHaveClass('step-current');
      expect(screen.getByText('3')).toHaveClass('step-pending');
    });
  });

  describe('DynamicForm Component', () => {
    const dynamicSchema = {
      type: 'object',
      properties: {
        toolType: {
          type: 'string',
          enum: ['calculator', 'planner', 'tracker'],
          title: 'Tool Type'
        }
      },
      dependencies: {
        toolType: {
          oneOf: [
            {
              properties: {
                toolType: { const: 'calculator' },
                precision: {
                  type: 'number',
                  title: 'Decimal Precision',
                  minimum: 0,
                  maximum: 10
                }
              }
            },
            {
              properties: {
                toolType: { const: 'planner' },
                timeframe: {
                  type: 'string',
                  enum: ['daily', 'weekly', 'monthly'],
                  title: 'Planning Timeframe'
                }
              }
            }
          ]
        }
      }
    };

    it('renders form based on JSON schema', () => {
      render(
        <DynamicForm
          schema={dynamicSchema}
          onSubmit={(data) => console.log(data)}
        />
      );
      
      expect(screen.getByLabelText('Tool Type')).toBeInTheDocument();
      
      const select = screen.getByLabelText('Tool Type');
      expect(select).toHaveAttribute('type', 'select');
    });

    it('handles conditional fields based on schema dependencies', async () => {
      render(
        <DynamicForm
          schema={dynamicSchema}
          onSubmit={(data) => console.log(data)}
        />
      );
      
      const toolTypeSelect = screen.getByLabelText('Tool Type');
      
      // Select calculator type
      fireEvent.change(toolTypeSelect, { target: { value: 'calculator' } });
      
      await waitFor(() => {
        expect(screen.getByLabelText('Decimal Precision')).toBeInTheDocument();
      });
      
      // Change to planner type
      fireEvent.change(toolTypeSelect, { target: { value: 'planner' } });
      
      await waitFor(() => {
        expect(screen.queryByLabelText('Decimal Precision')).not.toBeInTheDocument();
        expect(screen.getByLabelText('Planning Timeframe')).toBeInTheDocument();
      });
    });

    it('validates against schema constraints', async () => {
      const schemaWithValidation = {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            title: 'Name',
            minLength: 3,
            maxLength: 50
          },
          age: {
            type: 'number',
            title: 'Age',
            minimum: 18,
            maximum: 100
          }
        },
        required: ['name', 'age']
      };
      
      render(
        <DynamicForm
          schema={schemaWithValidation}
          onSubmit={(data) => console.log(data)}
        />
      );
      
      const nameField = screen.getByLabelText('Name');
      const ageField = screen.getByLabelText('Age');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      // Test validation
      await userEvent.type(nameField, 'Jo'); // Too short
      await userEvent.type(ageField, '15'); // Too young
      await userEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/minimum 3 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/minimum value is 18/i)).toBeInTheDocument();
      });
    });
  });

  describe('Form Accessibility', () => {
    it('provides proper ARIA labels and descriptions', () => {
      render(
        <Form>
          <FormField
            name="accessibleField"
            label="Accessible Field"
            helpText="This field has help text"
            required
            error="This field has an error"
          />
        </Form>
      );
      
      const field = screen.getByLabelText('Accessible Field');
      
      expect(field).toHaveAttribute('required');
      expect(field).toHaveAttribute('aria-required', 'true');
      expect(field).toHaveAttribute('aria-invalid', 'true');
      expect(field).toHaveAttribute('aria-describedby');
      
      const helpText = screen.getByText('This field has help text');
      const errorText = screen.getByText('This field has an error');
      
      expect(helpText).toHaveAttribute('id');
      expect(errorText).toHaveAttribute('id');
    });

    it('supports keyboard navigation', async () => {
      render(
        <Form>
          <FormField name="field1" label="Field 1" />
          <FormField name="field2" label="Field 2" />
          <FormField name="field3" label="Field 3" type="checkbox" />
          <button type="submit">Submit</button>
        </Form>
      );
      
      const field1 = screen.getByLabelText('Field 1');
      const field2 = screen.getByLabelText('Field 2');
      const field3 = screen.getByLabelText('Field 3');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      // Tab through fields
      field1.focus();
      expect(field1).toHaveFocus();
      
      await userEvent.tab();
      expect(field2).toHaveFocus();
      
      await userEvent.tab();
      expect(field3).toHaveFocus();
      
      await userEvent.tab();
      expect(submitButton).toHaveFocus();
    });

    it('announces form errors to screen readers', async () => {
      render(
        <Form>
          <div role="alert" aria-live="polite" id="form-errors">
            {/* Error messages appear here */}
          </div>
          <FormField
            name="testField"
            label="Test Field"
            required
          />
          <button type="submit">Submit</button>
        </Form>
      );
      
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await userEvent.click(submitButton);
      
      const errorRegion = screen.getByRole('alert');
      expect(errorRegion).toHaveAttribute('aria-live', 'polite');
    });
  });
});