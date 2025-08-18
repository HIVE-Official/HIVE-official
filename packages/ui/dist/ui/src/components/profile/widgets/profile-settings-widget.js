'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from '../../framer-motion-proxy';
import { Settings, User, Bell, Shield, Palette, Moon, Globe, Smartphone } from 'lucide-react';
export const ProfileSettingsWidget = ({ onPrivacyClick, onNotificationsClick, onThemeClick, onAccountClick }) => {
    const settings = [
        {
            id: 'account',
            name: 'Account & Profile',
            description: 'Update your profile information and preferences',
            icon: User,
            color: 'blue',
            onClick: onAccountClick
        },
        {
            id: 'privacy',
            name: 'Privacy & Security',
            description: 'Control who can see your profile and activity',
            icon: Shield,
            color: 'green',
            onClick: onPrivacyClick
        },
        {
            id: 'notifications',
            name: 'Notifications',
            description: 'Manage how and when you receive notifications',
            icon: Bell,
            color: 'yellow',
            onClick: onNotificationsClick
        },
        {
            id: 'appearance',
            name: 'Appearance',
            description: 'Customize your HIVE experience',
            icon: Palette,
            color: 'purple',
            onClick: onThemeClick
        }
    ];
    const getColorClasses = (color) => {
        switch (color) {
            case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'yellow': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default: return 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-hive-brand-secondary/10 rounded-xl mb-4", children: _jsx(Settings, { size: 28, className: "text-hive-brand-secondary" }) }), _jsx("h2", { className: "text-heading-lg font-semibold text-hive-text-primary mb-2", children: "Settings" }), _jsx("p", { className: "text-body-md text-hive-text-secondary", children: "Manage your HIVE account and preferences" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: settings.map((setting, index) => {
                    const IconComponent = setting.icon;
                    return (_jsx(motion.button, { onClick: setting.onClick, className: "p-6 bg-hive-background-tertiary rounded-xl border border-hive-border-subtle text-left hover:border-hive-border-focus transition-all duration-200 group", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1, duration: 0.3 }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `inline-flex items-center justify-center w-12 h-12 rounded-lg ${getColorClasses(setting.color)}`, children: _jsx(IconComponent, { size: 24 }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-hive-text-primary mb-1 group-hover:text-hive-brand-secondary transition-colors", children: setting.name }), _jsx("p", { className: "text-body-sm text-hive-text-secondary", children: setting.description })] })] }) }, setting.id));
                }) }), _jsxs("div", { className: "mt-8 p-6 bg-hive-background-tertiary rounded-xl border border-hive-border-subtle", children: [_jsx("h3", { className: "font-semibold text-hive-text-primary mb-4", children: "Quick Settings" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Moon, { size: 16, className: "text-hive-text-secondary" }), _jsx("span", { className: "text-hive-text-primary", children: "Dark Mode" })] }), _jsx("div", { className: "flex items-center", children: _jsx("button", { className: "relative inline-flex h-6 w-11 items-center rounded-full bg-hive-brand-secondary transition-colors", children: _jsx("span", { className: "inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" }) }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Globe, { size: 16, className: "text-hive-text-secondary" }), _jsx("span", { className: "text-hive-text-primary", children: "Language" })] }), _jsx("span", { className: "text-hive-text-secondary text-sm", children: "English" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Smartphone, { size: 16, className: "text-hive-text-secondary" }), _jsx("span", { className: "text-hive-text-primary", children: "Mobile App" })] }), _jsx("span", { className: "text-hive-text-secondary text-sm", children: "Coming Soon" })] })] })] }), _jsx("div", { className: "text-center pt-4", children: _jsxs("p", { className: "text-body-sm text-hive-text-tertiary", children: ["Need help? Visit our", ' ', _jsx("button", { className: "text-hive-brand-secondary hover:text-hive-brand-primary transition-colors", children: "Support Center" })] }) })] }));
};
export default ProfileSettingsWidget;
//# sourceMappingURL=profile-settings-widget.js.map