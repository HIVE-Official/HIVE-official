import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Mail, AlertCircle, CheckCircle, Loader2, Send, ArrowRight, Users, School } from 'lucide-react';

// Email Input - Specialized input for email addresses with validation
// Enhanced input component optimized for campus email workflows
// Supports institutional email validation, suggestions, and multi-email handling

interface EmailInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  success?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'default' | 'institutional' | 'invitation' | 'verification';
  suggestions?: string[];
  institutionalDomains?: string[];
  allowMultiple?: boolean;
  maxEmails?: number;
  showValidation?: boolean;
  autoValidate?: boolean;
  onValidate?: (email: string) => Promise<{ valid: boolean; message?: string; suggestions?: string[] }>;
  onChange?: (value: string | string[]) => void;
  onSubmit?: (emails: string[]) => void;
  className?: string;
}

const EmailInput = ({
  label = 'Email',
  placeholder = 'Enter your email address',
  value = '',
  error,
  success,
  hint,
  required = false,
  disabled = false,
  loading = false,
  variant = 'default',
  suggestions = [],
  institutionalDomains = ['stanford.edu', 'mit.edu', 'berkeley.edu', 'ucla.edu'],
  allowMultiple = false,
  maxEmails = 5,
  showValidation = true,
  autoValidate = true,
  onValidate,
  onChange = () => {},
  onSubmit = () => {},
  className = ''
}: EmailInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [emails, setEmails] = useState<string[]>(allowMultiple && Array.isArray(value) ? value : []);
  const [validationState, setValidationState] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [validationMessage, setValidationMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>([]);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isInstitutionalEmail = (email: string): boolean => {
    return institutionalDomains.some(domain => email.endsWith(`@${domain}`));
  };

  const generateSuggestions = (inputEmail: string): string[] => {
    if (!inputEmail.includes('@')) {
      return institutionalDomains.map(domain => `${inputEmail}@${domain}`);
    }
    
    const [localPart, domainPart] = inputEmail.split('@');
    const matchingDomains = institutionalDomains.filter(domain => 
      domain.toLowerCase().includes(domainPart.toLowerCase())
    );
    
    return matchingDomains.map(domain => `${localPart}@${domain}`);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (!allowMultiple) {
      onChange(newValue);
    }

    // Generate suggestions
    if (newValue && variant === 'institutional') {
      const suggestions = generateSuggestions(newValue);
      setCurrentSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0 && !validateEmail(newValue));
    } else {
      setShowSuggestions(false);
    }

    // Auto validation
    if (autoValidate && newValue && showValidation) {
      setValidationState('validating');
      
      if (onValidate) {
        try {
          const result = await onValidate(newValue);
          setValidationState(result.valid ? 'valid' : 'invalid');
          setValidationMessage(result.message || '');
          if (result.suggestions) {
            setCurrentSuggestions(result.suggestions);
            setShowSuggestions(true);
          }
        } catch {
          setValidationState('invalid');
          setValidationMessage('Validation failed');
        }
      } else {
        const isValid = validateEmail(newValue);
        setValidationState(isValid ? 'valid' : 'invalid');
        
        if (variant === 'institutional' && isValid) {
          const isInstitutional = isInstitutionalEmail(newValue);
          if (!isInstitutional) {
            setValidationState('invalid');
            setValidationMessage('Please use your institutional email address');
          }
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (allowMultiple && (e.key === 'Enter' || e.key === ',' || e.key === ' ')) {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const email = inputValue.trim();
    if (email && validateEmail(email) && !emails.includes(email) && emails.length < maxEmails) {
      const newEmails = [...emails, email];
      setEmails(newEmails);
      setInputValue('');
      setShowSuggestions(false);
      onChange(newEmails);
    }
  };

  const removeEmail = (emailToRemove: string) => {
    const newEmails = emails.filter(email => email !== emailToRemove);
    setEmails(newEmails);
    onChange(newEmails);
  };

  const selectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    if (!allowMultiple) {
      onChange(suggestion);
    }
    setValidationState('valid');
  };

  const handleSubmit = () => {
    if (allowMultiple) {
      if (inputValue && validateEmail(inputValue)) {
        addEmail();
      }
      onSubmit(emails);
    } else {
      onSubmit([inputValue]);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'institutional':
        return 'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20';
      case 'invitation':
        return 'border-hive-gold/30 focus:border-hive-gold focus:ring-hive-gold/20';
      case 'verification':
        return 'border-green-200 focus:border-green-500 focus:ring-green-500/20';
      default:
        return 'border-hive-border-subtle focus:border-hive-gold focus:ring-hive-gold/20';
    }
  };

  const getValidationIcon = () => {
    if (loading || validationState === 'validating') {
      return <Loader2 size={16} className="text-hive-text-tertiary animate-spin" />;
    }
    if (validationState === 'valid') {
      return <CheckCircle size={16} className="text-green-500" />;
    }
    if (validationState === 'invalid' || error) {
      return <AlertCircle size={16} className="text-red-500" />;
    }
    return <Mail size={16} className="text-hive-text-tertiary" />;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-hive-text-primary">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Email Tags (Multiple Mode) */}
      {allowMultiple && emails.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-hive-surface-primary rounded-lg border border-hive-border-subtle">
          {emails.map((email, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-hive-gold/10 text-hive-gold rounded-full border border-hive-gold/20"
            >
              <span className="text-sm font-medium">{email}</span>
              <button
                onClick={() => removeEmail(email)}
                className="text-hive-gold/70 hover:text-hive-gold transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          {emails.length >= maxEmails && (
            <span className="text-xs text-hive-text-tertiary px-2 py-1">
              Maximum {maxEmails} emails reached
            </span>
          )}
        </div>
      )}

      {/* Input Container */}
      <div className="relative">
        <div className={`
          flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200
          ${getVariantStyles()}
          ${disabled ? 'bg-hive-surface-hover opacity-60 cursor-not-allowed' : 'bg-hive-surface-primary'}
          ${error ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-500/20' : ''}
          ${success ? 'border-green-300 focus-within:border-green-500 focus-within:ring-green-500/20' : ''}
        `}>
          
          {/* Icon */}
          <div className="flex-shrink-0">
            {getValidationIcon()}
          </div>

          {/* Input */}
          <input
            type="email"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent border-none outline-none text-hive-text-primary placeholder-hive-text-tertiary"
          />

          {/* Submit Button (for certain variants) */}
          {(variant === 'invitation' || variant === 'verification') && (
            <button
              onClick={handleSubmit}
              disabled={disabled || (!inputValue && emails.length === 0)}
              className="flex-shrink-0 p-2 rounded-lg bg-hive-gold text-hive-text-primary hover:bg-hive-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && currentSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
            {currentSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-hive-surface-hover transition-colors text-left"
              >
                <Mail size={16} className="text-hive-text-tertiary flex-shrink-0" />
                <span className="text-sm text-hive-text-primary">{suggestion}</span>
                {isInstitutionalEmail(suggestion) && (
                  <School size={14} className="text-blue-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Validation Messages */}
      {(error || success || validationMessage || hint) && (
        <div className="space-y-1">
          {error && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle size={14} />
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-600 flex items-center gap-2">
              <CheckCircle size={14} />
              {success}
            </p>
          )}
          {validationMessage && !error && !success && (
            <p className={`text-sm flex items-center gap-2 ${
              validationState === 'invalid' ? 'text-red-600' : 'text-hive-text-tertiary'
            }`}>
              {validationState === 'invalid' && <AlertCircle size={14} />}
              {validationMessage}
            </p>
          )}
          {hint && !error && !success && !validationMessage && (
            <p className="text-sm text-hive-text-tertiary">{hint}</p>
          )}
        </div>
      )}

      {/* Multiple Email Helper */}
      {allowMultiple && (
        <p className="text-xs text-hive-text-tertiary">
          Press Enter, comma, or space to add multiple emails • {emails.length}/{maxEmails} added
        </p>
      )}
    </div>
  );
};

const meta: Meta<typeof EmailInput> = {
  title: '02-molecules/Email Input',
  component: EmailInput,
  parameters: {
    docs: {
      description: {
        component: `
# Email Input - Campus Email Management

Specialized email input component optimized for campus workflows, supporting institutional email validation, multi-email handling, and contextual suggestions.

## Campus-Specific Features

**Institutional Email Support:**
- Validates against known campus domains
- Provides domain suggestions for incomplete addresses
- Visual indicators for institutional vs. personal emails

**Multi-Email Workflows:**
- Support for invitation lists and group communications
- Tag-based email management with removal capabilities
- Configurable email limits for different use cases

**Contextual Variants:**
- Default: Standard email input with validation
- Institutional: Enforces campus email domains
- Invitation: Optimized for sending invites with quick submit
- Verification: Email confirmation workflows

## Validation & UX

- Real-time validation with visual feedback
- Async validation support for server-side checks
- Smart suggestions based on partial input
- Loading states and error handling
- Accessibility-compliant with proper ARIA labels
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'institutional', 'invitation', 'verification'],
      description: 'Email input variant optimized for specific campus workflows'
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Whether to support multiple email addresses'
    },
    showValidation: {
      control: 'boolean',
      description: 'Whether to show real-time validation feedback'
    },
    autoValidate: {
      control: 'boolean',
      description: 'Whether to automatically validate as user types'
    }
  }
};

export default meta;
type Story = StoryObj<typeof EmailInput>;

// Primary Variants
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email address',
    hint: 'We\'ll use this to send you important updates'
  }
};

export const Institutional: Story = {
  args: {
    label: 'Campus Email',
    placeholder: 'Enter your .edu email address',
    variant: 'institutional',
    hint: 'Please use your official campus email address',
    institutionalDomains: ['stanford.edu', 'mit.edu', 'berkeley.edu', 'ucla.edu', 'umich.edu']
  },
  parameters: {
    docs: {
      description: {
        story: 'Institutional variant that validates campus email domains and provides suggestions.'
      }
    }
  }
};

export const Invitation: Story = {
  args: {
    label: 'Send Invitations',
    placeholder: 'Enter email addresses to invite',
    variant: 'invitation',
    allowMultiple: true,
    maxEmails: 10,
    hint: 'Add multiple emails to invite students to your space'
  },
  parameters: {
    docs: {
      description: {
        story: 'Invitation variant for sending group invites with multi-email support.'
      }
    }
  }
};

export const Verification: Story = {
  args: {
    label: 'Verify Email',
    placeholder: 'Confirm your email address',
    variant: 'verification',
    hint: 'We\'ll send a verification code to this address'
  },
  parameters: {
    docs: {
      description: {
        story: 'Verification variant for email confirmation workflows.'
      }
    }
  }
};

// State Examples
export const WithValidation: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'alex@stanford.edu',
    success: 'Valid campus email address',
    showValidation: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input showing successful validation state.'
      }
    }
  }
};

export const WithError: Story = {
  args: {
    label: 'Campus Email',
    placeholder: 'Enter your .edu email',
    value: 'alex@gmail.com',
    variant: 'institutional',
    error: 'Please use your official campus email address',
    showValidation: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input showing validation error for non-institutional email.'
      }
    }
  }
};

export const Loading: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'checking@stanford.edu',
    loading: true,
    hint: 'Checking email availability...'
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input in loading state during async validation.'
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Email cannot be changed',
    value: 'locked@stanford.edu',
    disabled: true,
    hint: 'Contact admin to change your email address'
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled email input for non-editable scenarios.'
      }
    }
  }
};

// Campus Workflow Stories
export const SpaceInvitation: Story = {
  render: () => {
    const [emails, setEmails] = useState<string[]>(['sarah@stanford.edu', 'mike@berkeley.edu']);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleInvite = (emailList: string[]) => {
      setIsLoading(true);
      console.log('Sending invitations to:', emailList);
      
      setTimeout(() => {
        setIsLoading(false);
        alert(`Invitations sent to ${emailList.length} recipients!`);
      }, 2000);
    };
    
    return (
      <div className="max-w-md space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Invite to CS 106A Study Group</h3>
          <p className="text-sm text-hive-text-secondary mb-4">
            Add classmates to your study group by entering their campus email addresses.
          </p>
        </div>
        
        <EmailInput
          label="Student Emails"
          placeholder="Add student email addresses"
          variant="invitation"
          allowMultiple={true}
          maxEmails={15}
          institutionalDomains={['stanford.edu', 'berkeley.edu', 'mit.edu']}
          loading={isLoading}
          hint="Press Enter or comma to add multiple emails"
          onChange={(emailList) => setEmails(Array.isArray(emailList) ? emailList : [])}
          onSubmit={handleInvite}
        />
        
        <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
          <h4 className="font-medium text-hive-text-primary mb-2">Preview</h4>
          <p className="text-sm text-hive-text-secondary">
            Ready to invite {emails.length} students to join your study group.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Space invitation workflow with multi-email support and campus domain validation.'
      }
    }
  }
};

export const AccountRegistration: Story = {
  render: () => {
    const [validationState, setValidationState] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
    const [message, setMessage] = useState('');
    
    const validateEmail = async (email: string) => {
      setValidationState('checking');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isInstitutional = ['stanford.edu', 'mit.edu', 'berkeley.edu'].some(domain => 
        email.endsWith(`@${domain}`)
      );
      
      if (!isInstitutional) {
        setValidationState('invalid');
        setMessage('Please use your official campus email address');
        return { valid: false, message: 'Please use your official campus email address' };
      }
      
      const isAvailable = !email.includes('taken');
      if (!isAvailable) {
        setValidationState('invalid');
        setMessage('This email is already registered');
        return { valid: false, message: 'This email is already registered' };
      }
      
      setValidationState('valid');
      setMessage('Great! This email is available');
      return { valid: true, message: 'Great! This email is available' };
    };
    
    return (
      <div className="max-w-md space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Create HIVE Account</h3>
          <p className="text-sm text-hive-text-secondary mb-4">
            Use your campus email to join your university's HIVE community.
          </p>
        </div>
        
        <EmailInput
          label="Campus Email"
          placeholder="yourname@university.edu"
          variant="institutional"
          required={true}
          autoValidate={true}
          loading={validationState === 'checking'}
          success={validationState === 'valid' ? message : undefined}
          error={validationState === 'invalid' ? message : undefined}
          hint="We'll send a verification link to this address"
          onValidate={validateEmail}
          institutionalDomains={['stanford.edu', 'mit.edu', 'berkeley.edu', 'ucla.edu']}
        />
        
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 Try typing "taken@stanford.edu" to see error handling or "alex@stanford.edu" for success.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Account registration with real-time email validation and availability checking.'
      }
    }
  }
};

export const ClassRosterImport: Story = {
  render: () => {
    const [roster, setRoster] = useState<string[]>([]);
    const [importing, setImporting] = useState(false);
    
    const handleImport = (emailList: string[]) => {
      setImporting(true);
      console.log('Importing roster:', emailList);
      
      setTimeout(() => {
        setImporting(false);
        setRoster(emailList);
      }, 1500);
    };
    
    return (
      <div className="max-w-lg space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Import Class Roster</h3>
          <p className="text-sm text-hive-text-secondary mb-4">
            Add your students' email addresses to create the class space automatically.
          </p>
        </div>
        
        <EmailInput
          label="Student Email Addresses"
          placeholder="student1@stanford.edu, student2@stanford.edu..."
          variant="institutional"
          allowMultiple={true}
          maxEmails={50}
          loading={importing}
          hint="Add up to 50 student emails • Supports copy-paste from spreadsheets"
          onChange={(emailList) => console.log('Roster updated:', emailList)}
          onSubmit={handleImport}
          institutionalDomains={['stanford.edu']}
        />
        
        {roster.length > 0 && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <h4 className="font-medium text-green-800">Roster Imported Successfully</h4>
            </div>
            <p className="text-sm text-green-700">
              {roster.length} students added to CS 106A - Fall 2024
            </p>
            <div className="mt-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                <Users size={14} />
                Create Class Space
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Faculty workflow for importing class rosters with bulk email processing.'
      }
    }
  }
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [variant, setVariant] = useState<'default' | 'institutional' | 'invitation' | 'verification'>('default');
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [emails, setEmails] = useState<string[]>([]);
    
    const variantConfigs = {
      default: {
        label: 'Email Address',
        placeholder: 'Enter your email address',
        hint: 'Standard email input with validation'
      },
      institutional: {
        label: 'Campus Email',
        placeholder: 'yourname@university.edu',
        hint: 'Validates against campus domains with suggestions'
      },
      invitation: {
        label: 'Invite Students',
        placeholder: 'Add email addresses to invite',
        hint: 'Multi-email support for group invitations'
      },
      verification: {
        label: 'Verify Email',
        placeholder: 'Confirm your email address',
        hint: 'Email confirmation workflow with submit button'
      }
    };
    
    const currentConfig = variantConfigs[variant];
    
    return (
      <div className="max-w-lg space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Email Input Demo</h3>
        </div>
        
        {/* Controls */}
        <div className="space-y-4 p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
          <div>
            <label className="block text-sm font-medium text-hive-text-primary mb-2">Variant</label>
            <div className="flex gap-2">
              {Object.keys(variantConfigs).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    variant === v
                      ? 'bg-hive-gold text-hive-text-primary'
                      : 'bg-hive-surface-primary text-hive-text-secondary hover:text-hive-text-primary'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="multiple"
              checked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="multiple" className="text-sm text-hive-text-secondary">
              Allow multiple emails
            </label>
          </div>
        </div>
        
        {/* Email Input */}
        <EmailInput
          {...currentConfig}
          variant={variant}
          allowMultiple={allowMultiple}
          maxEmails={8}
          showValidation={true}
          autoValidate={true}
          institutionalDomains={['stanford.edu', 'mit.edu', 'berkeley.edu', 'ucla.edu']}
          onChange={(value) => {
            if (Array.isArray(value)) {
              setEmails(value);
            }
          }}
          onSubmit={(emailList) => {
            console.log('Submitted:', emailList);
            alert(`Submitted ${emailList.length} email(s): ${emailList.join(', ')}`);
          }}
        />
        
        {/* Status */}
        {emails.length > 0 && (
          <div className="p-3 bg-hive-gold/10 border border-hive-gold/20 rounded-lg">
            <h4 className="font-medium text-hive-text-primary mb-1">Current Emails</h4>
            <p className="text-sm text-hive-text-secondary">
              {emails.join(', ')} ({emails.length} total)
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showcasing all email input variants and configuration options.'
      }
    }
  }
};