import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveModal, HiveConfirmModal, HiveAlertModal } from '../../components/hive-modal';
import { HiveButton } from '../../components/hive-button';
import { HiveFormInput } from '../../components/hive-form';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Trash2, 
  Star, 
  Users, 
  Settings, 
  Upload,
  UserPlus,
  GraduationCap,
  Trophy,
  Calendar,
  FileText
} from 'lucide-react';

const meta: Meta<typeof HiveModal> = {
  title: '04-HIVE/Modal System',
  component: HiveModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Modal System with matte obsidian glass design, liquid metal animations, and comprehensive modal variants. Features backdrop blur, escape key handling, and sophisticated campus-specific use cases.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'premium', 'destructive', 'success'],
      description: 'Visual style variant with different accent colors'
    },
    size: {
      control: 'select', 
      options: ['sm', 'default', 'lg', 'xl', 'full'],
      description: 'Modal size for different content needs'
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility state'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show X close button in header'
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close modal when clicking backdrop'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close modal when pressing Escape key'
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Modal Trigger Component for Stories
const ModalTrigger = ({ children, buttonText = "Open Modal", buttonVariant = "default", ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <HiveButton variant={buttonVariant} onClick={() => setIsOpen(true)}>
        {buttonText}
      </HiveButton>
      <HiveModal
        {...props}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {children}
      </HiveModal>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalTrigger {...args}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <Info className="text-blue-400" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)]">Welcome to HIVE</h3>
            <p className="text-gray-400 text-sm">Getting started with your campus experience</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Discover spaces, connect with peers, and build tools that enhance your academic journey. 
          HIVE is designed to bring your campus community together through collaboration and innovation.
        </p>
        <div className="flex space-x-3 pt-4">
          <HiveButton variant="premium">Get Started</HiveButton>
          <HiveButton variant="outline">Learn More</HiveButton>
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    variant: 'default',
    size: 'default',
    title: 'Welcome to HIVE',
    description: 'Your campus collaboration platform',
  },
};

export const PremiumVariant: Story = {
  render: (args) => (
    <ModalTrigger {...args} buttonText="View Premium Features" buttonVariant="premium">
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full mx-auto flex items-center justify-center border border-yellow-500/20">
            <Star className="text-yellow-400" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-[var(--hive-text-primary)]">HIVE Premium</h3>
          <p className="text-gray-400 max-w-md">
            Unlock advanced features, priority support, and enhanced collaboration tools 
            for serious campus builders and leaders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <Trophy className="text-yellow-400" size={20} />
              <div className="text-yellow-400 font-semibold">Advanced Analytics</div>
            </div>
            <div className="text-gray-400 text-sm">Deep insights into space engagement and tool performance</div>
          </div>
          
          <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="text-yellow-400" size={20} />
              <div className="text-yellow-400 font-semibold">Priority Support</div>
            </div>
            <div className="text-gray-400 text-sm">24/7 dedicated assistance and direct access to our team</div>
          </div>
          
          <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <Settings className="text-yellow-400" size={20} />
              <div className="text-yellow-400 font-semibold">Custom Tools</div>
            </div>
            <div className="text-gray-400 text-sm">Build and deploy unlimited custom tools for your community</div>
          </div>
          
          <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <GraduationCap className="text-yellow-400" size={20} />
              <div className="text-yellow-400 font-semibold">Campus Integration</div>
            </div>
            <div className="text-gray-400 text-sm">Seamless integration with university systems and APIs</div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">$29<span className="text-base text-gray-400 font-normal">/month</span></div>
              <div className="text-sm text-gray-400">Billed annually • 30-day free trial</div>
            </div>
          </div>
          <HiveButton variant="premium" className="w-full">
            Start Free Trial
          </HiveButton>
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    variant: 'premium',
    size: 'lg',
    title: 'Upgrade to Premium',
    description: 'Unlock the full potential of HIVE',
  },
};

export const DestructiveVariant: Story = {
  render: (args) => (
    <ModalTrigger {...args} buttonText="Delete Space" buttonVariant="destructive">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)]">Delete Space</h3>
            <p className="text-gray-400">This action cannot be undone</p>
          </div>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <h4 className="text-red-400 font-semibold mb-2">What will be deleted:</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• All posts and conversations</li>
            <li>• All uploaded files and media</li>
            <li>• All custom tools and configurations</li>
            <li>• All member data and permissions</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <p className="text-gray-300">
            Are you absolutely sure you want to delete the <strong className="text-[var(--hive-text-primary)]">"CS Study Group"</strong> space? 
            This will permanently remove all content and cannot be recovered.
          </p>
          
          <div className="p-3 bg-[var(--hive-background-primary)]/20 rounded-lg border border-white/10">
            <label className="block text-sm text-gray-400 mb-2">Type "delete" to confirm:</label>
            <input 
              className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm"
              placeholder="delete"
            />
          </div>
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    variant: 'destructive',
    size: 'default',
    showCloseButton: true,
  },
};

export const SuccessVariant: Story = {
  render: (args) => (
    <ModalTrigger {...args} buttonText="Complete Setup" buttonVariant="default">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center border border-green-500/30">
            <CheckCircle className="text-green-400" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[var(--hive-text-primary)]">Setup Complete!</h3>
            <p className="text-gray-400">Your HIVE space is ready to go</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <h4 className="text-green-400 font-semibold mb-2">✅ Successfully configured:</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Space settings and permissions</li>
              <li>• Member invitations sent</li>
              <li>• Integration with campus systems</li>
              <li>• Custom tools deployed</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-[var(--hive-text-primary)]/5 rounded-lg text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">12</div>
              <div className="text-xs text-gray-400">Members Invited</div>
            </div>
            <div className="p-3 bg-[var(--hive-text-primary)]/5 rounded-lg text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">3</div>
              <div className="text-xs text-gray-400">Tools Activated</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <HiveButton variant="premium" className="w-full">
            Visit Your Space
          </HiveButton>
          <HiveButton variant="outline" className="w-full">
            Invite More Members
          </HiveButton>
        </div>
      </div>
    </ModalTrigger>
  ),
  args: {
    variant: 'success',
    size: 'default',
    title: 'Space Created Successfully',
    description: 'Your new campus space is ready for collaboration',
  },
};

export const SizeVariations: Story = {
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    
    const sizes = [
      { key: 'sm', label: 'Small Modal', size: 'sm' as const },
      { key: 'default', label: 'Default Modal', size: 'default' as const },
      { key: 'lg', label: 'Large Modal', size: 'lg' as const },
      { key: 'xl', label: 'Extra Large Modal', size: 'xl' as const },
    ];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sizes.map((modal) => (
            <HiveButton
              key={modal.key}
              variant="outline"
              onClick={() => setActiveModal(modal.key)}
              className="text-sm"
            >
              {modal.label}
            </HiveButton>
          ))}
        </div>
        
        {sizes.map((modal) => (
          <HiveModal
            key={modal.key}
            variant="default"
            size={modal.size}
            isOpen={activeModal === modal.key}
            onClose={() => setActiveModal(null)}
            title={`${modal.label} Example`}
            description={`Showcasing ${modal.size} modal size`}
          >
            <div className="space-y-4">
              <p className="text-gray-400">
                This is a {modal.size} modal demonstrating the size variant. 
                Different sizes accommodate various content needs from quick confirmations to complex forms.
              </p>
              <div className="flex space-x-3">
                <HiveButton variant="premium" onClick={() => setActiveModal(null)}>
                  Confirm
                </HiveButton>
                <HiveButton variant="outline" onClick={() => setActiveModal(null)}>
                  Cancel
                </HiveButton>
              </div>
            </div>
          </HiveModal>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different modal sizes for various content requirements'
      }
    }
  }
};

export const CampusInviteModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inviteData, setInviteData] = useState({
      emails: '',
      message: '',
      role: 'member'
    });
    
    return (
      <div>
        <HiveButton onClick={() => setIsOpen(true)} variant="premium">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Students
        </HiveButton>
        
        <HiveModal
          variant="premium"
          size="lg"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Invite Students to Space"
          description="Send invitations to students at your university"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Student Emails</label>
                <textarea
                  className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl px-4 py-3 text-[var(--hive-text-primary)] placeholder-white/50 resize-none"
                  rows={4}
                  placeholder="student1@university.edu&#10;student2@university.edu&#10;..."
                  value={inviteData.emails}
                  onChange={(e) => setInviteData({...inviteData, emails: e.target.value})}
                />
                <p className="text-xs text-gray-400">One email per line. Must be university emails (.edu)</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Role</label>
                  <select className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl px-4 py-3 text-[var(--hive-text-primary)]">
                    <option value="member">Member</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl">
                  <h4 className="text-[var(--hive-text-primary)] font-medium mb-2">Invitation Preview</h4>
                  <div className="text-sm text-gray-400">
                    Students will receive an email invitation with:
                    <ul className="mt-2 space-y-1">
                      <li>• Space name and description</li>
                      <li>• Your personal message</li>
                      <li>• Secure join link</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--hive-text-primary)]">Personal Message (Optional)</label>
              <textarea
                className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl px-4 py-3 text-[var(--hive-text-primary)] placeholder-white/50 resize-none"
                rows={3}
                placeholder="Add a personal message to your invitation..."
                value={inviteData.message}
                onChange={(e) => setInviteData({...inviteData, message: e.target.value})}
              />
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <div className="text-sm text-gray-400">
                {inviteData.emails.split('\n').filter(email => email.trim()).length} students will be invited
              </div>
              <div className="flex space-x-3">
                <HiveButton variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </HiveButton>
                <HiveButton variant="premium">
                  Send Invitations
                </HiveButton>
              </div>
            </div>
          </div>
        </HiveModal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex campus invitation modal with form fields and validation'
      }
    }
  }
};

export const ConfirmationModals: Story = {
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    
    const confirmModals = [
      {
        key: 'delete',
        trigger: { text: 'Delete Space', variant: 'destructive' as const },
        props: {
          title: 'Delete Space',
          description: 'Are you sure you want to delete "CS Study Group"? This action cannot be undone.',
          confirmText: 'Delete Forever',
          cancelText: 'Keep Space',
          confirmVariant: 'destructive' as const,
          variant: 'destructive' as const
        }
      },
      {
        key: 'upgrade',
        trigger: { text: 'Upgrade Premium', variant: 'premium' as const },
        props: {
          title: 'Upgrade to Premium',
          description: 'Unlock advanced features and priority support for $29/month.',
          confirmText: 'Upgrade Now',
          cancelText: 'Maybe Later',
          confirmVariant: 'premium' as const,
          variant: 'premium' as const
        }
      },
      {
        key: 'leave',
        trigger: { text: 'Leave Space', variant: 'outline' as const },
        props: {
          title: 'Leave Space',
          description: 'You will lose access to all posts, files, and conversations in this space.',
          confirmText: 'Leave',
          cancelText: 'Stay',
          confirmVariant: 'default' as const,
          variant: 'default' as const
        }
      }
    ];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {confirmModals.map((modal) => (
            <HiveButton
              key={modal.key}
              variant={modal.trigger.variant}
              onClick={() => setActiveModal(modal.key)}
            >
              {modal.trigger.text}
            </HiveButton>
          ))}
        </div>
        
        {confirmModals.map((modal) => (
          <HiveConfirmModal
            key={modal.key}
            {...modal.props}
            isOpen={activeModal === modal.key}
            onClose={() => setActiveModal(null)}
            onConfirm={() => {
              console.log(`Confirmed: ${modal.key}`);
              setActiveModal(null);
            }}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pre-built confirmation modals for common campus actions'
      }
    }
  }
};

export const AlertModals: Story = {
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    
    const alertModals = [
      {
        key: 'welcome',
        trigger: { text: 'Welcome Alert', variant: 'default' as const },
        props: {
          title: 'Welcome to HIVE!',
          message: 'You\'ve successfully joined the campus community. Start exploring spaces and connecting with peers.',
          actionText: 'Get Started',
          variant: 'success' as const
        }
      },
      {
        key: 'error',
        trigger: { text: 'Error Alert', variant: 'destructive' as const },
        props: {
          title: 'Connection Error',
          message: 'Unable to connect to the campus network. Please check your connection and try again.',
          actionText: 'Retry',
          variant: 'destructive' as const
        }
      },
      {
        key: 'achievement',
        trigger: { text: 'Achievement Alert', variant: 'premium' as const },
        props: {
          title: 'Achievement Unlocked!',
          message: 'Congratulations! You\'ve completed your first month on HIVE and earned the "Community Builder" badge.',
          actionText: 'View Badge',
          variant: 'premium' as const
        }
      }
    ];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alertModals.map((modal) => (
            <HiveButton
              key={modal.key}
              variant={modal.trigger.variant}
              onClick={() => setActiveModal(modal.key)}
            >
              {modal.trigger.text}
            </HiveButton>
          ))}
        </div>
        
        {alertModals.map((modal) => (
          <HiveAlertModal
            key={modal.key}
            {...modal.props}
            isOpen={activeModal === modal.key}
            onClose={() => setActiveModal(null)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert modals for notifications, achievements, and system messages'
      }
    }
  }
};

export const FullScreenConfiguration: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <HiveButton onClick={() => setIsOpen(true)} variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Advanced Settings
        </HiveButton>
        
        <HiveModal
          variant="default"
          size="full"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Space Configuration"
          description="Configure advanced settings for your campus space"
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* General Settings */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-yellow-400" />
                  General Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">Space Name</label>
                    <input 
                      className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]" 
                      defaultValue="CS Study Group"
                    />
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">Description</label>
                    <textarea 
                      className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)] resize-none" 
                      rows={3}
                      defaultValue="A collaborative space for Computer Science students to study, share resources, and work on projects together."
                    />
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">Category</label>
                    <select className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]">
                      <option>Academic</option>
                      <option>Social</option>
                      <option>Professional</option>
                      <option>Creative</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Privacy & Access */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center">
                  <Users className="w-5 h-5 mr-2 text-yellow-400" />
                  Privacy & Access
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--hive-text-primary)] font-medium">Private Space</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <p className="text-xs text-gray-400">Only invited members can see and join this space</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--hive-text-primary)] font-medium">Require Approval</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <p className="text-xs text-gray-400">New members must be approved by moderators</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--hive-text-primary)] font-medium">University Only</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <p className="text-xs text-gray-400">Restrict to students with verified .edu emails</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">Member Limit</label>
                    <input 
                      type="number" 
                      className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]" 
                      defaultValue="50"
                      min="1"
                      max="500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tools & Features */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                  Tools & Features
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--hive-text-primary)] font-medium">File Sharing</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <p className="text-xs text-gray-400">Allow members to upload and share files</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--hive-text-primary)] font-medium">Study Sessions</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <p className="text-xs text-gray-400">Enable virtual study rooms and scheduling</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[var(--hive-text-primary)] font-medium">Custom Tools</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <p className="text-xs text-gray-400">Allow members to create and deploy custom tools</p>
                  </div>
                  
                  <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10">
                    <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">Storage Limit</label>
                    <select className="w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]">
                      <option>1 GB</option>
                      <option>5 GB</option>
                      <option>10 GB</option>
                      <option>25 GB</option>
                      <option>Unlimited (Premium)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-8 border-t border-white/10">
              <div className="text-sm text-gray-400">
                Changes will be applied immediately and affect all current members
              </div>
              <div className="flex space-x-3">
                <HiveButton variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </HiveButton>
                <HiveButton variant="premium">
                  Save Configuration
                </HiveButton>
              </div>
            </div>
          </div>
        </HiveModal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-screen modal for complex configuration interfaces'
      }
    }
  }
};