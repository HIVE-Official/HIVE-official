import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from './email-input';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Email Input',
  component: EmailInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A specialized email input component designed for university and campus environments. Combines a username input field with a predefined domain display, perfect for educational email addresses.

**Key Features:**
- Split input design (username + domain)
- University domain presets;
- Size variants (sm, md, lg)
- Error state handling;
- Accessible labeling;
- Focus and hover states;
- Campus-specific styling;
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Username portion of the email',
    },
    domain: {
      control: 'text',
      description: 'Domain portion of the email (without @)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the username input',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size variant',
    },
  },
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive component for controlled stories;
const InteractiveEmailInput = ({ value: initialValue = '', ...props }: any) => {
  const [value, setValue] = useState(initialValue);
  
  return (
    <EmailInput;
      value={value}}
      onChange={setValue}
      {...props}
    />
  )
};

// Basic Examples;
export const Default: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
  },
};

export const WithValue: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Student Email',
    placeholder: 'username',
    domain: 'stanford.edu',
    value: 'sarah.chen',
  },
};

export const WithError: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    error: 'Username is required',
    value: '',
  },
};

// Size Variants;
export const SmallSize: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'md',
  },
};

export const LargeSize: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'username',
    domain: 'university.edu',
    size: 'lg',
  },
};

// University Domains;
export const StanfordEmail: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Stanford Email',
    placeholder: 'first.last',
    domain: 'stanford.edu',
    value: 'alex.rodriguez',
  },
};

export const MITEmail: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'MIT Email',
    placeholder: 'username',
    domain: 'mit.edu',
    value: 'jdoe',
  },
};

export const UCBerkeleyEmail: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'UC Berkeley Email',
    placeholder: 'firstname_lastname',
    domain: 'berkeley.edu',
    value: 'maya_patel',
  },
};

export const HarvardEmail: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Harvard Email',
    placeholder: 'username',
    domain: 'harvard.edu',
    value: 'ewatson',
  },
};

// Campus Scenarios;
export const StudentRegistration: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Student Email Address',
    placeholder: 'firstname.lastname',
    domain: 'university.edu',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input for student registration or account creation.',
      },
    },
  },
};

export const FacultyEmail: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Faculty Email',
    placeholder: 'professor.name',
    domain: 'faculty.university.edu',
    value: 'dr.smith',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input for faculty members with faculty domain.',
      },
    },
  },
};

export const AlumniEmail: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'Alumni Email',
    placeholder: 'firstname.lastname',
    domain: 'alumni.university.edu',
    value: 'john.doe.2020',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input for alumni with graduation year convention.',
      },
    },
  },
};

// Error States;
export const RequiredFieldError: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    error: 'Email address is required',
  },
};

export const InvalidUsernameError: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'invalid@username',
    error: 'Username cannot contain @ symbol',
  },
};

export const TooShortError: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'ab',
    error: 'Username must be at least 3 characters',
  },
};

export const AlreadyTakenError: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    label: 'University Email',
    placeholder: 'username',
    domain: 'university.edu',
    value: 'admin',
    error: 'This username is already taken',
  },
};

// Without Labels;
export const NoLabel: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    placeholder: 'your-username',
    domain: 'university.edu',
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => <InteractiveEmailInput {...args} />,
  args: {
    placeholder: 'enter your student ID',
    domain: 'student.university.edu',
  },
};

// Form Context Examples;
export const RegistrationForm: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Create Your Account;
      </h3>
      
      <InteractiveEmailInput;
        label="University Email"
        placeholder="firstname.lastname"
        domain="stanford.edu"
      />
      
      <div className="pt-4">
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Use your official university email address to verify your student status.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Email input within a registration form context.',
      },
    },
  },
};

export const MultipleEmailOptions: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
        Choose Your Email Type;
      </h3>
      
      <InteractiveEmailInput;
        label="Student Email"
        placeholder="username"
        domain="student.university.edu"
        size="sm"
      />
      
      <InteractiveEmailInput;
        label="Faculty Email"
        placeholder="professor.name"
        domain="faculty.university.edu"
        size="sm"
      />
      
      <InteractiveEmailInput;
        label="Staff Email"
        placeholder="firstname.lastname"
        domain="staff.university.edu"
        size="sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple email input options for different user types.',
      },
    },
  },
};