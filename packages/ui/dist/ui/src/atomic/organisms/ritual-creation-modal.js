'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
import { HiveModal } from '../../components/hive-modal.js';
import { X, Plus, Calendar, Users, Target, Sparkles, Trophy, Gift, CheckCircle, ArrowLeft, ArrowRight, Hash, Zap } from 'lucide-react';
const RITUAL_TYPE_CONFIG = {
    onboarding: { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-500/20', label: 'Welcome Journey' },
    seasonal: { icon: Calendar, color: 'text-orange-400', bgColor: 'bg-orange-500/20', label: 'Seasonal Event' },
    achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', label: 'Achievement Challenge' },
    community: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-500/20', label: 'Community Building' },
    creative: { icon: Zap, color: 'text-pink-400', bgColor: 'bg-pink-500/20', label: 'Creative Project' },
    emergency: { icon: Target, color: 'text-red-400', bgColor: 'bg-red-500/20', label: 'Emergency Response' },
    legacy: { icon: Gift, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20', label: 'Legacy Tradition' }
};
const ACTION_TYPE_CONFIG = {
    post: { label: 'Create Post', icon: Hash },
    join_space: { label: 'Join Space', icon: Users },
    create_tool: { label: 'Create Tool', icon: Zap },
    interact: { label: 'Interact', icon: Target },
    vote: { label: 'Vote/Poll', icon: CheckCircle },
    share: { label: 'Share Content', icon: ArrowRight },
    comment: { label: 'Comment', icon: Hash },
    attend: { label: 'Attend Event', icon: Calendar }
};
export function RitualCreationModal({ isOpen, onClose, onSubmit, spaceId, isLoading = false }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        tagline: '',
        type: 'community',
        category: 'general',
        tags: [],
        startTime: '',
        timezone: 'America/New_York',
        participationType: 'collective',
        requiresInvitation: false,
        universities: ['buffalo'],
        isGlobal: false,
        actions: [],
        milestones: [],
        rewards: [],
        prerequisites: {}
    });
    const [errors, setErrors] = useState({});
    const [previewMode, setPreviewMode] = useState(false);
    const validateStep = (stepNum) => {
        const newErrors = {};
        switch (stepNum) {
            case 1:
                if (!formData.name?.trim())
                    newErrors.name = 'Ritual name is required';
                if (!formData.title?.trim())
                    newErrors.title = 'Title is required';
                if (!formData.description?.trim())
                    newErrors.description = 'Description is required';
                if (!formData.tagline?.trim())
                    newErrors.tagline = 'Tagline is required';
                break;
            case 2:
                if (!formData.startTime)
                    newErrors.startTime = 'Start time is required';
                if (formData.endTime && new Date(formData.endTime) <= new Date(formData.startTime)) {
                    newErrors.endTime = 'End time must be after start time';
                }
                break;
            case 3:
                if (!formData.actions?.length)
                    newErrors.actions = 'At least one action is required';
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleNext = () => {
        if (validateStep(step)) {
            setStep(Math.min(step + 1, 5));
        }
    };
    const handlePrev = () => {
        setStep(Math.max(step - 1, 1));
    };
    const handleSubmit = async () => {
        if (validateStep(step) && formData) {
            await onSubmit(formData);
        }
    };
    const addAction = () => {
        const newAction = {
            id: `action-${Date.now()}`,
            type: 'post',
            name: '',
            description: '',
            isRequired: false,
            weight: 10,
            maxOccurrences: 1
        };
        setFormData(prev => ({
            ...prev,
            actions: [...(prev.actions || []), newAction]
        }));
    };
    const updateAction = (index, updates) => {
        setFormData(prev => ({
            ...prev,
            actions: prev.actions?.map((action, i) => i === index ? { ...action, ...updates } : action) || []
        }));
    };
    const removeAction = (index) => {
        setFormData(prev => ({
            ...prev,
            actions: prev.actions?.filter((_, i) => i !== index) || []
        }));
    };
    const addMilestone = () => {
        const newMilestone = {
            id: `milestone-${Date.now()}`,
            name: '',
            description: '',
            participantThreshold: 1,
            progressThreshold: 50,
            unlocks: []
        };
        setFormData(prev => ({
            ...prev,
            milestones: [...(prev.milestones || []), newMilestone]
        }));
    };
    const updateMilestone = (index, updates) => {
        setFormData(prev => ({
            ...prev,
            milestones: prev.milestones?.map((milestone, i) => i === index ? { ...milestone, ...updates } : milestone) || []
        }));
    };
    const removeMilestone = (index) => {
        setFormData(prev => ({
            ...prev,
            milestones: prev.milestones?.filter((_, i) => i !== index) || []
        }));
    };
    const addReward = () => {
        const newReward = {
            id: `reward-${Date.now()}`,
            type: 'badge',
            name: '',
            description: '',
            requiresCompletion: true,
            minimumParticipation: 80,
            rarity: 'common',
            isTimeLimited: false,
            unlockScope: 'user'
        };
        setFormData(prev => ({
            ...prev,
            rewards: [...(prev.rewards || []), newReward]
        }));
    };
    const updateReward = (index, updates) => {
        setFormData(prev => ({
            ...prev,
            rewards: prev.rewards?.map((reward, i) => i === index ? { ...reward, ...updates } : reward) || []
        }));
    };
    const removeReward = (index) => {
        setFormData(prev => ({
            ...prev,
            rewards: prev.rewards?.filter((_, i) => i !== index) || []
        }));
    };
    const renderStep = () => {
        switch (step) {
            case 1:
                return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Basic Information" }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Ritual Type" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: Object.entries(RITUAL_TYPE_CONFIG).map(([type, config]) => {
                                            const Icon = config.icon;
                                            return (_jsx("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, type: type })), className: cn("p-4 rounded-xl border transition-all text-left", formData.type === type
                                                    ? "border-[var(--hive-gold)] bg-[var(--hive-gold)]/10"
                                                    : "border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-glass)]"), children: _jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: cn("p-2 rounded-lg", config.bgColor), children: _jsx(Icon, { className: cn("h-4 w-4", config.color) }) }), _jsx("span", { className: "font-medium text-[var(--hive-text-primary)]", children: config.label })] }) }, type));
                                        }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Ritual Name *" }), _jsx("input", { type: "text", value: formData.name || '', onChange: (e) => setFormData(prev => ({ ...prev, name: e.target.value })), className: cn("w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", errors.name ? "border-red-500" : "border-[var(--hive-border-subtle)]"), placeholder: "e.g., Welcome Week 2025" }), errors.name && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.name }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Display Title *" }), _jsx("input", { type: "text", value: formData.title || '', onChange: (e) => setFormData(prev => ({ ...prev, title: e.target.value })), className: cn("w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", errors.title ? "border-red-500" : "border-[var(--hive-border-subtle)]"), placeholder: "e.g., Welcome to Campus Life" }), errors.title && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.title }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Tagline *" }), _jsx("input", { type: "text", value: formData.tagline || '', onChange: (e) => setFormData(prev => ({ ...prev, tagline: e.target.value })), className: cn("w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", errors.tagline ? "border-red-500" : "border-[var(--hive-border-subtle)]"), placeholder: "e.g., Connect, Explore, and Make Your Mark" }), errors.tagline && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.tagline }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Description *" }), _jsx("textarea", { value: formData.description || '', onChange: (e) => setFormData(prev => ({ ...prev, description: e.target.value })), rows: 4, className: cn("w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] resize-none", errors.description ? "border-red-500" : "border-[var(--hive-border-subtle)]"), placeholder: "Describe what this ritual is about and what participants will experience..." }), errors.description && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.description }))] })] })] }) }));
            case 2:
                return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Timing & Participation" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Start Time *" }), _jsx("input", { type: "datetime-local", value: formData.startTime || '', onChange: (e) => setFormData(prev => ({ ...prev, startTime: e.target.value })), className: cn("w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", errors.startTime ? "border-red-500" : "border-[var(--hive-border-subtle)]") }), errors.startTime && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.startTime }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "End Time (optional)" }), _jsx("input", { type: "datetime-local", value: formData.endTime || '', onChange: (e) => setFormData(prev => ({ ...prev, endTime: e.target.value })), className: cn("w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", errors.endTime ? "border-red-500" : "border-[var(--hive-border-subtle)]") }), errors.endTime && (_jsx("p", { className: "mt-1 text-sm text-red-400", children: errors.endTime }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Participation Type" }), _jsxs("select", { value: formData.participationType || 'collective', onChange: (e) => setFormData(prev => ({ ...prev, participationType: e.target.value })), className: "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]", children: [_jsx("option", { value: "individual", children: "Individual - Personal journey" }), _jsx("option", { value: "collective", children: "Collective - Community effort" }), _jsx("option", { value: "progressive", children: "Progressive - Step by step" }), _jsx("option", { value: "competitive", children: "Competitive - Rankings and leaderboards" }), _jsx("option", { value: "collaborative", children: "Collaborative - Work together" }), _jsx("option", { value: "creative", children: "Creative - Express and create" }), _jsx("option", { value: "social", children: "Social - Meet and connect" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Max Participants" }), _jsx("input", { type: "number", min: "1", value: formData.maxParticipants || '', onChange: (e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || undefined })), className: "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]", placeholder: "Unlimited" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Min Participants" }), _jsx("input", { type: "number", min: "1", value: formData.minParticipants || '', onChange: (e) => setFormData(prev => ({ ...prev, minParticipants: parseInt(e.target.value) || undefined })), className: "w-full px-4 py-3 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]", placeholder: "No minimum" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", id: "requiresInvitation", checked: formData.requiresInvitation || false, onChange: (e) => setFormData(prev => ({ ...prev, requiresInvitation: e.target.checked })), className: "rounded border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]" }), _jsx("label", { htmlFor: "requiresInvitation", className: "text-sm text-[var(--hive-text-primary)]", children: "Requires invitation to join" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", id: "isGlobal", checked: formData.isGlobal || false, onChange: (e) => setFormData(prev => ({ ...prev, isGlobal: e.target.checked })), className: "rounded border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]" }), _jsx("label", { htmlFor: "isGlobal", className: "text-sm text-[var(--hive-text-primary)]", children: "Global ritual (all universities)" })] })] })] })] }) }));
            case 3:
                return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Actions & Requirements" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Required Actions" }), _jsxs("button", { type: "button", onClick: addAction, className: "flex items-center gap-2 px-3 py-2 text-sm bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Action"] })] }), formData.actions?.map((action, index) => {
                                        const ActionIcon = ACTION_TYPE_CONFIG[action.type].icon;
                                        return (_jsxs("div", { className: "p-4 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsxs("div", { className: "flex items-center gap-2 flex-1", children: [_jsx(ActionIcon, { className: "h-4 w-4 text-[var(--hive-text-secondary)]" }), _jsx("select", { value: action.type, onChange: (e) => updateAction(index, { type: e.target.value }), className: "px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]", children: Object.entries(ACTION_TYPE_CONFIG).map(([key, config]) => (_jsx("option", { value: key, children: config.label }, key))) })] }), _jsx("button", { type: "button", onClick: () => removeAction(index), className: "p-2 text-red-400 hover:bg-red-500/10 rounded-lg", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsx("input", { type: "text", value: action.name, onChange: (e) => updateAction(index, { name: e.target.value }), placeholder: "Action name", className: "w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]" }), _jsx("textarea", { value: action.description, onChange: (e) => updateAction(index, { description: e.target.value }), placeholder: "Action description", rows: 2, className: "w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] resize-none" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", id: `required-${action.id}`, checked: action.isRequired, onChange: (e) => updateAction(index, { isRequired: e.target.checked }), className: "rounded border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]" }), _jsx("label", { htmlFor: `required-${action.id}`, className: "text-sm text-[var(--hive-text-primary)]", children: "Required" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-sm text-[var(--hive-text-primary)]", children: "Points:" }), _jsx("input", { type: "number", min: "1", max: "100", value: action.weight, onChange: (e) => updateAction(index, { weight: parseInt(e.target.value) || 10 }), className: "w-16 px-2 py-1 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]" })] })] })] })] }, action.id));
                                    }), errors.actions && (_jsx("p", { className: "text-sm text-red-400", children: errors.actions })), formData.actions?.length === 0 && (_jsxs("div", { className: "text-center py-8 text-[var(--hive-text-secondary)]", children: [_jsx(Target, { className: "h-12 w-12 mx-auto mb-3 opacity-50" }), _jsx("p", { children: "No actions defined yet. Add actions for participants to complete." })] }))] })] }) }));
            case 4:
                return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Milestones & Rewards" }), _jsxs("div", { className: "space-y-4 mb-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Milestones" }), _jsxs("button", { type: "button", onClick: addMilestone, className: "flex items-center gap-2 px-3 py-2 text-sm bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Milestone"] })] }), formData.milestones?.map((milestone, index) => (_jsxs("div", { className: "p-4 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx(Trophy, { className: "h-5 w-5 text-[var(--hive-gold)] mt-1" }), _jsx("button", { type: "button", onClick: () => removeMilestone(index), className: "p-1 text-red-400 hover:bg-red-500/10 rounded", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "text", value: milestone.name, onChange: (e) => updateMilestone(index, { name: e.target.value }), placeholder: "Milestone name", className: "w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]" }), _jsx("textarea", { value: milestone.description, onChange: (e) => updateMilestone(index, { description: e.target.value }), placeholder: "Milestone description", rows: 2, className: "w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] resize-none" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-secondary)] mb-1", children: "Participant Threshold" }), _jsx("input", { type: "number", min: "1", value: milestone.participantThreshold, onChange: (e) => updateMilestone(index, { participantThreshold: parseInt(e.target.value) || 1 }), className: "w-full px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs text-[var(--hive-text-secondary)] mb-1", children: "Progress Threshold (%)" }), _jsx("input", { type: "number", min: "0", max: "100", value: milestone.progressThreshold, onChange: (e) => updateMilestone(index, { progressThreshold: parseInt(e.target.value) || 50 }), className: "w-full px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]" })] })] })] })] }, milestone.id)))] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Rewards" }), _jsxs("button", { type: "button", onClick: addReward, className: "flex items-center gap-2 px-3 py-2 text-sm bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Reward"] })] }), formData.rewards?.map((reward, index) => (_jsxs("div", { className: "p-4 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx(Gift, { className: "h-5 w-5 text-[var(--hive-gold)] mt-1" }), _jsx("button", { type: "button", onClick: () => removeReward(index), className: "p-1 text-red-400 hover:bg-red-500/10 rounded", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx("input", { type: "text", value: reward.name, onChange: (e) => updateReward(index, { name: e.target.value }), placeholder: "Reward name", className: "px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]" }), _jsxs("select", { value: reward.type, onChange: (e) => updateReward(index, { type: e.target.value }), className: "px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]", children: [_jsx("option", { value: "badge", children: "Badge" }), _jsx("option", { value: "feature", children: "Feature Unlock" }), _jsx("option", { value: "access", children: "Special Access" }), _jsx("option", { value: "recognition", children: "Recognition" }), _jsx("option", { value: "tool", children: "Tool Access" }), _jsx("option", { value: "customization", children: "Customization" })] })] }), _jsx("textarea", { value: reward.description, onChange: (e) => updateReward(index, { description: e.target.value }), placeholder: "Reward description", rows: 2, className: "w-full px-3 py-2 rounded-lg border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)] resize-none" }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("select", { value: reward.rarity, onChange: (e) => updateReward(index, { rarity: e.target.value }), className: "px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]", children: [_jsx("option", { value: "common", children: "Common" }), _jsx("option", { value: "uncommon", children: "Uncommon" }), _jsx("option", { value: "rare", children: "Rare" }), _jsx("option", { value: "epic", children: "Epic" }), _jsx("option", { value: "legendary", children: "Legendary" })] }), _jsxs("select", { value: reward.unlockScope, onChange: (e) => updateReward(index, { unlockScope: e.target.value }), className: "px-3 py-2 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]", children: [_jsx("option", { value: "user", children: "Personal" }), _jsx("option", { value: "space", children: "Space-wide" }), _jsx("option", { value: "campus", children: "Campus-wide" }), _jsx("option", { value: "platform", children: "Platform-wide" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Min %:" }), _jsx("input", { type: "number", min: "0", max: "100", value: reward.minimumParticipation, onChange: (e) => updateReward(index, { minimumParticipation: parseInt(e.target.value) || 80 }), className: "w-16 px-2 py-1 text-sm rounded border bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border-[var(--hive-border-subtle)]" })] })] })] })] }, reward.id)))] })] }) }));
            case 5:
                return (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Preview & Confirm" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "p-6 bg-[var(--hive-background-tertiary)] rounded-xl border border-[var(--hive-border-subtle)]", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [formData.type && (_jsx("div", { className: cn("p-3 rounded-xl", RITUAL_TYPE_CONFIG[formData.type].bgColor), children: React.createElement(RITUAL_TYPE_CONFIG[formData.type].icon, {
                                                                    className: cn("h-6 w-6", RITUAL_TYPE_CONFIG[formData.type].color)
                                                                }) })), _jsxs("div", { children: [_jsx("h4", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: formData.title }), _jsx("p", { className: "text-sm text-[var(--hive-gold)]", children: formData.tagline })] })] }), _jsx("div", { className: "px-3 py-1 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] text-sm rounded-lg", children: formData.type && RITUAL_TYPE_CONFIG[formData.type].label })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-6", children: formData.description }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: formData.actions?.length || 0 }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Actions" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: formData.milestones?.length || 0 }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Milestones" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: formData.rewards?.length || 0 }), _jsx("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Rewards" })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "text-[var(--hive-text-secondary)]", children: ["Participation: ", formData.participationType] }), _jsx("div", { className: "text-[var(--hive-text-secondary)]", children: formData.startTime && new Date(formData.startTime).toLocaleDateString() })] })] }), _jsx("div", { className: "p-4 bg-[var(--hive-gold)]/10 rounded-lg border border-[var(--hive-gold)]/30", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-[var(--hive-gold)] mt-0.5" }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-[var(--hive-text-primary)] mb-1", children: "Ready to Create" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Your ritual \"", formData.title, "\" is configured and ready to be created. It will be saved as a draft and can be scheduled to go live later."] })] })] }) })] })] }) }));
            default:
                return null;
        }
    };
    return (_jsx(HiveModal, { isOpen: isOpen, onClose: onClose, size: "xl", className: "max-h-[90vh] overflow-hidden", children: _jsxs("div", { className: "relative", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-[var(--hive-border-subtle)]", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Create New Ritual" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: ["Step ", step, " of 5: ", step === 1 ? 'Basic Information' :
                                            step === 2 ? 'Timing & Participation' :
                                                step === 3 ? 'Actions & Requirements' :
                                                    step === 4 ? 'Milestones & Rewards' :
                                                        'Preview & Confirm'] })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-[var(--hive-background-tertiary)] rounded-lg transition-colors", disabled: isLoading, children: _jsx(X, { className: "h-5 w-5 text-[var(--hive-text-secondary)]" }) })] }), _jsx("div", { className: "h-1 bg-[var(--hive-background-tertiary)]", children: _jsx("div", { className: "h-full bg-[var(--hive-gold)] transition-all duration-300", style: { width: `${(step / 5) * 100}%` } }) }), _jsx("div", { className: "p-6 max-h-[calc(90vh-200px)] overflow-y-auto", children: _jsx(AnimatePresence, { mode: "wait", children: renderStep() }) }), _jsxs("div", { className: "flex items-center justify-between p-6 border-t border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)]", children: [_jsxs("button", { onClick: handlePrev, disabled: step === 1 || isLoading, className: cn("flex items-center gap-2 px-4 py-2 rounded-lg transition-all", step === 1 || isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)]"), children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Previous"] }), _jsx("div", { className: "flex gap-2", children: Array.from({ length: 5 }, (_, i) => (_jsx("div", { className: cn("w-2 h-2 rounded-full transition-all", i + 1 === step
                                    ? "bg-[var(--hive-gold)]"
                                    : i + 1 < step
                                        ? "bg-[var(--hive-gold)]/60"
                                        : "bg-[var(--hive-border-subtle)]") }, i))) }), step < 5 ? (_jsxs("button", { onClick: handleNext, disabled: isLoading, className: "flex items-center gap-2 px-4 py-2 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90 disabled:opacity-50 disabled:cursor-not-allowed", children: ["Next", _jsx(ArrowRight, { className: "h-4 w-4" })] })) : (_jsx("button", { onClick: handleSubmit, disabled: isLoading, className: "flex items-center gap-2 px-6 py-2 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90 disabled:opacity-50 disabled:cursor-not-allowed", children: isLoading ? (_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" }, children: _jsx(ArrowRight, { className: "h-4 w-4" }) })) : (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { className: "h-4 w-4" }), "Create Ritual"] })) }))] })] }) }));
}
//# sourceMappingURL=ritual-creation-modal.js.map