import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveModal, HiveConfirmModal, HiveAlertModal } from '../../components/hive-modal';
import { HiveButton } from '../../components/hive-button';
import { AlertTriangle, CheckCircle, Info, Star, Users, Settings, UserPlus, GraduationCap, Trophy, Calendar } from 'lucide-react';
const meta = {
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
// Modal Trigger Component for Stories
const ModalTrigger = ({ children, buttonText = "Open Modal", buttonVariant = "default", ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { className: "flex flex-col items-center space-y-4", children: [_jsx(HiveButton, { variant: buttonVariant, onClick: () => setIsOpen(true), children: buttonText }), _jsx(HiveModal, { ...props, isOpen: isOpen, onClose: () => setIsOpen(false), children: children })] }));
};
export const Default = {
    render: (args) => (_jsx(ModalTrigger, { ...args, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(Info, { className: "text-blue-400", size: 24 }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Welcome to HIVE" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Getting started with your campus experience" })] })] }), _jsx("p", { className: "text-gray-300 leading-relaxed", children: "Discover spaces, connect with peers, and build tools that enhance your academic journey. HIVE is designed to bring your campus community together through collaboration and innovation." }), _jsxs("div", { className: "flex space-x-3 pt-4", children: [_jsx(HiveButton, { variant: "premium", children: "Get Started" }), _jsx(HiveButton, { variant: "outline", children: "Learn More" })] })] }) })),
    args: {
        variant: 'default',
        size: 'default',
        title: 'Welcome to HIVE',
        description: 'Your campus collaboration platform',
    },
};
export const PremiumVariant = {
    render: (args) => (_jsx(ModalTrigger, { ...args, buttonText: "View Premium Features", buttonVariant: "premium", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full mx-auto flex items-center justify-center border border-yellow-500/20", children: _jsx(Star, { className: "text-yellow-400", size: 32 }) }), _jsx("h3", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "HIVE Premium" }), _jsx("p", { className: "text-gray-400 max-w-md", children: "Unlock advanced features, priority support, and enhanced collaboration tools for serious campus builders and leaders." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx(Trophy, { className: "text-yellow-400", size: 20 }), _jsx("div", { className: "text-yellow-400 font-semibold", children: "Advanced Analytics" })] }), _jsx("div", { className: "text-gray-400 text-sm", children: "Deep insights into space engagement and tool performance" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx(Users, { className: "text-yellow-400", size: 20 }), _jsx("div", { className: "text-yellow-400 font-semibold", children: "Priority Support" })] }), _jsx("div", { className: "text-gray-400 text-sm", children: "24/7 dedicated assistance and direct access to our team" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx(Settings, { className: "text-yellow-400", size: 20 }), _jsx("div", { className: "text-yellow-400 font-semibold", children: "Custom Tools" })] }), _jsx("div", { className: "text-gray-400 text-sm", children: "Build and deploy unlimited custom tools for your community" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx(GraduationCap, { className: "text-yellow-400", size: 20 }), _jsx("div", { className: "text-yellow-400 font-semibold", children: "Campus Integration" })] }), _jsx("div", { className: "text-gray-400 text-sm", children: "Seamless integration with university systems and APIs" })] })] }), _jsxs("div", { className: "border-t border-white/10 pt-6", children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: ["$29", _jsx("span", { className: "text-base text-gray-400 font-normal", children: "/month" })] }), _jsx("div", { className: "text-sm text-gray-400", children: "Billed annually \u2022 30-day free trial" })] }) }), _jsx(HiveButton, { variant: "premium", className: "w-full", children: "Start Free Trial" })] })] }) })),
    args: {
        variant: 'premium',
        size: 'lg',
        title: 'Upgrade to Premium',
        description: 'Unlock the full potential of HIVE',
    },
};
export const DestructiveVariant = {
    render: (args) => (_jsx(ModalTrigger, { ...args, buttonText: "Delete Space", buttonVariant: "destructive", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30", children: _jsx(AlertTriangle, { className: "text-red-400", size: 24 }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Delete Space" }), _jsx("p", { className: "text-gray-400", children: "This action cannot be undone" })] })] }), _jsxs("div", { className: "bg-red-500/10 border border-red-500/20 rounded-xl p-4", children: [_jsx("h4", { className: "text-red-400 font-semibold mb-2", children: "What will be deleted:" }), _jsxs("ul", { className: "text-gray-300 text-sm space-y-1", children: [_jsx("li", { children: "\u2022 All posts and conversations" }), _jsx("li", { children: "\u2022 All uploaded files and media" }), _jsx("li", { children: "\u2022 All custom tools and configurations" }), _jsx("li", { children: "\u2022 All member data and permissions" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("p", { className: "text-gray-300", children: ["Are you absolutely sure you want to delete the ", _jsx("strong", { className: "text-[var(--hive-text-primary)]", children: "\"CS Study Group\"" }), " space? This will permanently remove all content and cannot be recovered."] }), _jsxs("div", { className: "p-3 bg-[var(--hive-background-primary)]/20 rounded-lg border border-white/10", children: [_jsx("label", { className: "block text-sm text-gray-400 mb-2", children: "Type \"delete\" to confirm:" }), _jsx("input", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)] text-sm", placeholder: "delete" })] })] })] }) })),
    args: {
        variant: 'destructive',
        size: 'default',
        showCloseButton: true,
    },
};
export const SuccessVariant = {
    render: (args) => (_jsx(ModalTrigger, { ...args, buttonText: "Complete Setup", buttonVariant: "default", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 bg-green-500/20 rounded-full mx-auto flex items-center justify-center border border-green-500/30", children: _jsx(CheckCircle, { className: "text-green-400", size: 32 }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Setup Complete!" }), _jsx("p", { className: "text-gray-400", children: "Your HIVE space is ready to go" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-green-500/10 border border-green-500/20 rounded-xl", children: [_jsx("h4", { className: "text-green-400 font-semibold mb-2", children: "\u2705 Successfully configured:" }), _jsxs("ul", { className: "text-gray-300 text-sm space-y-1", children: [_jsx("li", { children: "\u2022 Space settings and permissions" }), _jsx("li", { children: "\u2022 Member invitations sent" }), _jsx("li", { children: "\u2022 Integration with campus systems" }), _jsx("li", { children: "\u2022 Custom tools deployed" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-3 bg-[var(--hive-text-primary)]/5 rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "12" }), _jsx("div", { className: "text-xs text-gray-400", children: "Members Invited" })] }), _jsxs("div", { className: "p-3 bg-[var(--hive-text-primary)]/5 rounded-lg text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "3" }), _jsx("div", { className: "text-xs text-gray-400", children: "Tools Activated" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(HiveButton, { variant: "premium", className: "w-full", children: "Visit Your Space" }), _jsx(HiveButton, { variant: "outline", className: "w-full", children: "Invite More Members" })] })] }) })),
    args: {
        variant: 'success',
        size: 'default',
        title: 'Space Created Successfully',
        description: 'Your new campus space is ready for collaboration',
    },
};
export const SizeVariations = {
    render: () => {
        const [activeModal, setActiveModal] = useState(null);
        const sizes = [
            { key: 'sm', label: 'Small Modal', size: 'sm' },
            { key: 'default', label: 'Default Modal', size: 'default' },
            { key: 'lg', label: 'Large Modal', size: 'lg' },
            { key: 'xl', label: 'Extra Large Modal', size: 'xl' },
        ];
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: sizes.map((modal) => (_jsx(HiveButton, { variant: "outline", onClick: () => setActiveModal(modal.key), className: "text-sm", children: modal.label }, modal.key))) }), sizes.map((modal) => (_jsx(HiveModal, { variant: "default", size: modal.size, isOpen: activeModal === modal.key, onClose: () => setActiveModal(null), title: `${modal.label} Example`, description: `Showcasing ${modal.size} modal size`, children: _jsxs("div", { className: "space-y-4", children: [_jsxs("p", { className: "text-gray-400", children: ["This is a ", modal.size, " modal demonstrating the size variant. Different sizes accommodate various content needs from quick confirmations to complex forms."] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(HiveButton, { variant: "premium", onClick: () => setActiveModal(null), children: "Confirm" }), _jsx(HiveButton, { variant: "outline", onClick: () => setActiveModal(null), children: "Cancel" })] })] }) }, modal.key)))] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Different modal sizes for various content requirements'
            }
        }
    }
};
export const CampusInviteModal = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        const [inviteData, setInviteData] = useState({
            emails: '',
            message: '',
            role: 'member'
        });
        return (_jsxs("div", { children: [_jsxs(HiveButton, { onClick: () => setIsOpen(true), variant: "premium", children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Invite Students"] }), _jsx(HiveModal, { variant: "premium", size: "lg", isOpen: isOpen, onClose: () => setIsOpen(false), title: "Invite Students to Space", description: "Send invitations to students at your university", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Student Emails" }), _jsx("textarea", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl px-4 py-3 text-[var(--hive-text-primary)] placeholder-white/50 resize-none", rows: 4, placeholder: "student1@university.edu\nstudent2@university.edu\n...", value: inviteData.emails, onChange: (e) => setInviteData({ ...inviteData, emails: e.target.value }) }), _jsx("p", { className: "text-xs text-gray-400", children: "One email per line. Must be university emails (.edu)" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Role" }), _jsxs("select", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl px-4 py-3 text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "member", children: "Member" }), _jsx("option", { value: "moderator", children: "Moderator" }), _jsx("option", { value: "admin", children: "Admin" })] })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-medium mb-2", children: "Invitation Preview" }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Students will receive an email invitation with:", _jsxs("ul", { className: "mt-2 space-y-1", children: [_jsx("li", { children: "\u2022 Space name and description" }), _jsx("li", { children: "\u2022 Your personal message" }), _jsx("li", { children: "\u2022 Secure join link" })] })] })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Personal Message (Optional)" }), _jsx("textarea", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl px-4 py-3 text-[var(--hive-text-primary)] placeholder-white/50 resize-none", rows: 3, placeholder: "Add a personal message to your invitation...", value: inviteData.message, onChange: (e) => setInviteData({ ...inviteData, message: e.target.value }) })] }), _jsxs("div", { className: "flex justify-between items-center pt-4 border-t border-white/10", children: [_jsxs("div", { className: "text-sm text-gray-400", children: [inviteData.emails.split('\n').filter(email => email.trim()).length, " students will be invited"] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(HiveButton, { variant: "outline", onClick: () => setIsOpen(false), children: "Cancel" }), _jsx(HiveButton, { variant: "premium", children: "Send Invitations" })] })] })] }) })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Complex campus invitation modal with form fields and validation'
            }
        }
    }
};
export const ConfirmationModals = {
    render: () => {
        const [activeModal, setActiveModal] = useState(null);
        const confirmModals = [
            {
                key: 'delete',
                trigger: { text: 'Delete Space', variant: 'destructive' },
                props: {
                    title: 'Delete Space',
                    description: 'Are you sure you want to delete "CS Study Group"? This action cannot be undone.',
                    confirmText: 'Delete Forever',
                    cancelText: 'Keep Space',
                    confirmVariant: 'destructive',
                    variant: 'destructive'
                }
            },
            {
                key: 'upgrade',
                trigger: { text: 'Upgrade Premium', variant: 'premium' },
                props: {
                    title: 'Upgrade to Premium',
                    description: 'Unlock advanced features and priority support for $29/month.',
                    confirmText: 'Upgrade Now',
                    cancelText: 'Maybe Later',
                    confirmVariant: 'premium',
                    variant: 'premium'
                }
            },
            {
                key: 'leave',
                trigger: { text: 'Leave Space', variant: 'outline' },
                props: {
                    title: 'Leave Space',
                    description: 'You will lose access to all posts, files, and conversations in this space.',
                    confirmText: 'Leave',
                    cancelText: 'Stay',
                    confirmVariant: 'default',
                    variant: 'default'
                }
            }
        ];
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: confirmModals.map((modal) => (_jsx(HiveButton, { variant: modal.trigger.variant, onClick: () => setActiveModal(modal.key), children: modal.trigger.text }, modal.key))) }), confirmModals.map((modal) => (_jsx(HiveConfirmModal, { ...modal.props, isOpen: activeModal === modal.key, onClose: () => setActiveModal(null), onConfirm: () => {
                        console.log(`Confirmed: ${modal.key}`);
                        setActiveModal(null);
                    } }, modal.key)))] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Pre-built confirmation modals for common campus actions'
            }
        }
    }
};
export const AlertModals = {
    render: () => {
        const [activeModal, setActiveModal] = useState(null);
        const alertModals = [
            {
                key: 'welcome',
                trigger: { text: 'Welcome Alert', variant: 'default' },
                props: {
                    title: 'Welcome to HIVE!',
                    message: 'You\'ve successfully joined the campus community. Start exploring spaces and connecting with peers.',
                    actionText: 'Get Started',
                    variant: 'success'
                }
            },
            {
                key: 'error',
                trigger: { text: 'Error Alert', variant: 'destructive' },
                props: {
                    title: 'Connection Error',
                    message: 'Unable to connect to the campus network. Please check your connection and try again.',
                    actionText: 'Retry',
                    variant: 'destructive'
                }
            },
            {
                key: 'achievement',
                trigger: { text: 'Achievement Alert', variant: 'premium' },
                props: {
                    title: 'Achievement Unlocked!',
                    message: 'Congratulations! You\'ve completed your first month on HIVE and earned the "Community Builder" badge.',
                    actionText: 'View Badge',
                    variant: 'premium'
                }
            }
        ];
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: alertModals.map((modal) => (_jsx(HiveButton, { variant: modal.trigger.variant, onClick: () => setActiveModal(modal.key), children: modal.trigger.text }, modal.key))) }), alertModals.map((modal) => (_jsx(HiveAlertModal, { ...modal.props, isOpen: activeModal === modal.key, onClose: () => setActiveModal(null) }, modal.key)))] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Alert modals for notifications, achievements, and system messages'
            }
        }
    }
};
export const FullScreenConfiguration = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (_jsxs("div", { children: [_jsxs(HiveButton, { onClick: () => setIsOpen(true), variant: "outline", children: [_jsx(Settings, { className: "w-4 h-4 mr-2" }), "Advanced Settings"] }), _jsx(HiveModal, { variant: "default", size: "full", isOpen: isOpen, onClose: () => setIsOpen(false), title: "Space Configuration", description: "Configure advanced settings for your campus space", children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] flex items-center", children: [_jsx(Settings, { className: "w-5 h-5 mr-2 text-yellow-400" }), "General Settings"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Space Name" }), _jsx("input", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]", defaultValue: "CS Study Group" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Description" }), _jsx("textarea", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)] resize-none", rows: 3, defaultValue: "A collaborative space for Computer Science students to study, share resources, and work on projects together." })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Category" }), _jsxs("select", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]", children: [_jsx("option", { children: "Academic" }), _jsx("option", { children: "Social" }), _jsx("option", { children: "Professional" }), _jsx("option", { children: "Creative" })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] flex items-center", children: [_jsx(Users, { className: "w-5 h-5 mr-2 text-yellow-400" }), "Privacy & Access"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "Private Space" }), _jsx("input", { type: "checkbox", className: "rounded" })] }), _jsx("p", { className: "text-xs text-gray-400", children: "Only invited members can see and join this space" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "Require Approval" }), _jsx("input", { type: "checkbox", className: "rounded", defaultChecked: true })] }), _jsx("p", { className: "text-xs text-gray-400", children: "New members must be approved by moderators" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "University Only" }), _jsx("input", { type: "checkbox", className: "rounded", defaultChecked: true })] }), _jsx("p", { className: "text-xs text-gray-400", children: "Restrict to students with verified .edu emails" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Member Limit" }), _jsx("input", { type: "number", className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]", defaultValue: "50", min: "1", max: "500" })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] flex items-center", children: [_jsx(Calendar, { className: "w-5 h-5 mr-2 text-yellow-400" }), "Tools & Features"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "File Sharing" }), _jsx("input", { type: "checkbox", className: "rounded", defaultChecked: true })] }), _jsx("p", { className: "text-xs text-gray-400", children: "Allow members to upload and share files" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "Study Sessions" }), _jsx("input", { type: "checkbox", className: "rounded", defaultChecked: true })] }), _jsx("p", { className: "text-xs text-gray-400", children: "Enable virtual study rooms and scheduling" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)] font-medium", children: "Custom Tools" }), _jsx("input", { type: "checkbox", className: "rounded" })] }), _jsx("p", { className: "text-xs text-gray-400", children: "Allow members to create and deploy custom tools" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-xl border border-white/10", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Storage Limit" }), _jsxs("select", { className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-lg px-3 py-2 text-[var(--hive-text-primary)]", children: [_jsx("option", { children: "1 GB" }), _jsx("option", { children: "5 GB" }), _jsx("option", { children: "10 GB" }), _jsx("option", { children: "25 GB" }), _jsx("option", { children: "Unlimited (Premium)" })] })] })] })] })] }), _jsxs("div", { className: "flex justify-between items-center pt-8 border-t border-white/10", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Changes will be applied immediately and affect all current members" }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(HiveButton, { variant: "outline", onClick: () => setIsOpen(false), children: "Cancel" }), _jsx(HiveButton, { variant: "premium", children: "Save Configuration" })] })] })] }) })] }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Full-screen modal for complex configuration interfaces'
            }
        }
    }
};
//# sourceMappingURL=hive-modal-system.stories.js.map