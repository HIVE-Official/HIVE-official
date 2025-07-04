import type { Meta, StoryObj } from '@storybook/react';
import { UBEmailPopup } from '../../components/auth/ub-email-popup';
import { ToastProvider } from '../../components/toast-provider';
import { useState } from 'react';
import { Button } from '../../components/button';

const meta = {
  title: 'Auth/UBEmailPopup',
  component: UBEmailPopup,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="min-h-screen bg-primary">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof UBEmailPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

const UBEmailPopupDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSuccess = (email: string) => {
    setSubmittedEmail(email);
    console.log('Email submitted:', email);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmittedEmail(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-h1 font-display text-white">
          UB Email Popup Demo
        </h1>
        <p className="text-body text-muted max-w-md mx-auto">
          Click the button below to test the University at Buffalo email entry popup.
        </p>
        
        <Button
          variant="ritual"
          size="lg"
          onClick={() => setIsOpen(true)}
        >
          Open UB Email Popup
        </Button>

        {submittedEmail && (
          <div className="mt-4 p-4 bg-surface border border-accent/20 rounded-lg">
            <p className="text-body text-white">
              Last submitted email: <span className="font-medium">{submittedEmail}</span>
            </p>
          </div>
        )}
      </div>

      <UBEmailPopup
        isOpen={isOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onSuccess: () => {},
  },
  render: () => <UBEmailPopupDemo />,
};

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSuccess: (email) => console.log('Success:', email),
  },
  render: (args) => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <UBEmailPopup {...args} />
    </div>
  ),
};

export const WithCustomClassName: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSuccess: (email) => console.log('Success:', email),
    className: 'max-w-lg',
  },
  render: (args) => (
    <div className="min-h-screen flex items-center justify-center p-4">
      <UBEmailPopup {...args} />
    </div>
  ),
};