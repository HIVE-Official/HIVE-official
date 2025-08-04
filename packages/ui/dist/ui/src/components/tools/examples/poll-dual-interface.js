"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../../index.js';
import { BarChart3, Plus, Trash2, Settings, Eye, Vote, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../../../lib/utils.js';
// Interface Component - For Leaders/Builders (Utility Side)
const PollInterface = ({ poll, onUpdate, onDelete, onToggleActive }) => {
    const [editingQuestion, setEditingQuestion] = useState(poll.question);
    const [editingOptions, setEditingOptions] = useState(poll.options);
    const addOption = () => {
        const newOption = {
            id: `option_${Date.now()}`,
            text: '',
            votes: 0,
            voters: []
        };
        setEditingOptions([...editingOptions, newOption]);
    };
    const updateOption = (optionId, text) => {
        setEditingOptions(options => options.map(opt => opt.id === optionId ? { ...opt, text } : opt));
    };
    const removeOption = (optionId) => {
        if (editingOptions.length > 2) {
            setEditingOptions(options => options.filter(opt => opt.id !== optionId));
        }
    };
    const saveChanges = () => {
        onUpdate({
            question: editingQuestion,
            options: editingOptions.filter(opt => opt.text.trim())
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BarChart3, { className: "w-5 h-5 text-blue-600" }), _jsx("h3", { className: "font-semibold text-gray-900", children: "Poll Configuration" }), _jsx(HiveBadge, { className: "bg-blue-100 text-blue-800 border-blue-200", children: "Interface" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveBadge, { className: poll.isActive
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-red-100 text-red-800 border-red-200", children: poll.isActive ? 'Active' : 'Inactive' }), _jsx(HiveButton, { size: "sm", variant: "outline", onClick: onToggleActive, children: poll.isActive ? 'Deactivate' : 'Activate' })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs(HiveCard, { className: "p-3 text-center", children: [_jsx("div", { className: "text-xl font-bold text-gray-900", children: poll.totalVotes }), _jsx("div", { className: "text-xs text-gray-500", children: "Total Votes" })] }), _jsxs(HiveCard, { className: "p-3 text-center", children: [_jsx("div", { className: "text-xl font-bold text-green-600", children: poll.totalVoters }), _jsx("div", { className: "text-xs text-gray-500", children: "Voters" })] }), _jsxs(HiveCard, { className: "p-3 text-center", children: [_jsxs("div", { className: "text-xl font-bold text-blue-600", children: [poll.totalVotes > 0 ? Math.round((poll.totalVoters / poll.totalVotes) * 100) : 0, "%"] }), _jsx("div", { className: "text-xs text-gray-500", children: "Participation" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Poll Question" }), _jsx("input", { type: "text", value: editingQuestion, onChange: (e) => setEditingQuestion(e.target.value), placeholder: "Enter your poll question...", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Poll Options" }), _jsxs(HiveButton, { size: "sm", onClick: addOption, children: [_jsx(Plus, { className: "w-3 h-3 mr-1" }), "Add Option"] })] }), _jsx("div", { className: "space-y-2", children: editingOptions.map((option, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-sm text-gray-500 w-6", children: [index + 1, "."] }), _jsx("input", { type: "text", value: option.text, onChange: (e) => updateOption(option.id, e.target.value), placeholder: `Option ${index + 1}`, className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }), _jsxs("div", { className: "text-sm text-gray-500 w-16 text-center", children: [option.votes, " votes"] }), editingOptions.length > 2 && (_jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => removeOption(option.id), children: _jsx(Trash2, { className: "w-3 h-3" }) }))] }, option.id))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-gray-900", children: "Poll Settings" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: poll.allowMultiple, onChange: (e) => onUpdate({ allowMultiple: e.target.checked }), className: "rounded border-gray-300 focus:ring-amber-500" }), _jsx("span", { className: "text-sm text-gray-700", children: "Allow multiple selections" })] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: poll.isAnonymous, onChange: (e) => onUpdate({ isAnonymous: e.target.checked }), className: "rounded border-gray-300 focus:ring-amber-500" }), _jsx("span", { className: "text-sm text-gray-700", children: "Anonymous voting" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gray-200", children: [_jsxs(HiveButton, { variant: "outline", onClick: onDelete, className: "text-red-600", children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), "Delete Poll"] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "outline", children: [_jsx(BarChart3, { className: "w-4 h-4 mr-2" }), "View Analytics"] }), _jsxs(HiveButton, { onClick: saveChanges, children: [_jsx(CheckCircle, { className: "w-4 h-4 mr-2" }), "Save Changes"] })] })] })] }));
};
// Surface Component - For Post Board (Informational Side)
const PollSurface = ({ poll, userId, userRole, onVote, hasVoted }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleOptionToggle = (optionId) => {
        if (!poll.isActive)
            return;
        if (poll.allowMultiple) {
            setSelectedOptions(prev => prev.includes(optionId)
                ? prev.filter(id => id !== optionId)
                : [...prev, optionId]);
        }
        else {
            setSelectedOptions([optionId]);
        }
    };
    const handleVote = () => {
        if (selectedOptions.length > 0) {
            onVote(selectedOptions);
            setSelectedOptions([]);
        }
    };
    const getOptionPercentage = (option) => {
        return poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
    };
    const hasUserVoted = poll.options.some(option => option.voters.includes(userId));
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Vote, { className: "w-4 h-4 text-green-600" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 border-green-200", children: "Surface" })] }), !poll.isActive && (_jsx(HiveBadge, { variant: "outline", children: "Poll Closed" }))] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: poll.question }), poll.allowMultiple && (_jsx("p", { className: "text-sm text-gray-600", children: "Select all that apply" }))] }), _jsx("div", { className: "space-y-3", children: poll.options.map((option) => {
                    const percentage = getOptionPercentage(option);
                    const isSelected = selectedOptions.includes(option.id);
                    const userVotedForThis = option.voters.includes(userId);
                    return (_jsx("div", { className: "space-y-2", children: _jsxs("button", { onClick: () => handleOptionToggle(option.id), disabled: !poll.isActive || hasUserVoted, className: cn("w-full text-left p-3 rounded-lg border transition-all", poll.isActive && !hasUserVoted && "hover:border-amber-300", isSelected && "border-amber-500 bg-amber-50", userVotedForThis && "border-green-500 bg-green-50", (!poll.isActive || hasUserVoted) && "opacity-60 cursor-not-allowed"), children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-medium text-gray-900", children: option.text }), _jsxs("div", { className: "flex items-center gap-2", children: [userVotedForThis && (_jsx(CheckCircle, { className: "w-4 h-4 text-green-600" })), _jsxs("span", { className: "text-sm text-gray-600", children: [option.votes, " vote", option.votes !== 1 ? 's' : '', " (", percentage, "%)"] })] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: cn("h-2 rounded-full transition-all duration-500", userVotedForThis ? "bg-green-500" : "bg-amber-500"), style: { width: `${percentage}%` } }) })] }) }, option.id));
                }) }), poll.isActive && !hasUserVoted && (_jsxs(HiveButton, { onClick: handleVote, disabled: selectedOptions.length === 0, className: "w-full", children: [_jsx(Vote, { className: "w-4 h-4 mr-2" }), "Submit Vote", selectedOptions.length > 1 ? 's' : ''] })), _jsxs("div", { className: "pt-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { children: [poll.totalVotes, " total votes"] }), _jsxs("span", { children: [poll.totalVoters, " participants"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: poll.endDate
                                    ? `Ends ${poll.endDate.toLocaleDateString()}`
                                    : 'No end date' })] })] })] }));
};
export function PollDualInterface({ poll, userRole, userId, onUpdatePoll, onVote, onDeletePoll, showInterface = false }) {
    const [currentView, setCurrentView] = useState(showInterface && userRole === 'leader' ? 'interface' : 'surface');
    const hasUserVoted = poll.options.some(option => option.voters.includes(userId));
    const canEdit = userRole === 'leader' || poll.createdBy === userId;
    const handleUpdatePoll = useCallback(async (updates) => {
        try {
            await onUpdatePoll?.(updates);
        }
        catch (error) {
            console.error('Failed to update poll:', error);
        }
    }, [onUpdatePoll]);
    const handleVote = useCallback(async (optionIds) => {
        try {
            await onVote?.(optionIds);
        }
        catch (error) {
            console.error('Failed to vote:', error);
        }
    }, [onVote]);
    const handleToggleActive = () => {
        handleUpdatePoll({ isActive: !poll.isActive });
    };
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this poll?')) {
            try {
                await onDeletePoll?.();
            }
            catch (error) {
                console.error('Failed to delete poll:', error);
            }
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [canEdit && (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900", children: "Poll View" }), _jsx("p", { className: "text-sm text-gray-600", children: "Toggle between configuration and public view" })] }), _jsxs("div", { className: "flex items-center bg-white rounded-lg p-1 shadow-sm", children: [_jsxs(HiveButton, { size: "sm", variant: currentView === 'interface' ? 'primary' : 'ghost', onClick: () => setCurrentView('interface'), children: [_jsx(Settings, { className: "w-3 h-3 mr-1" }), "Interface"] }), _jsxs(HiveButton, { size: "sm", variant: currentView === 'surface' ? 'primary' : 'ghost', onClick: () => setCurrentView('surface'), children: [_jsx(Eye, { className: "w-3 h-3 mr-1" }), "Surface"] }), _jsx(HiveButton, { size: "sm", variant: currentView === 'both' ? 'primary' : 'ghost', onClick: () => setCurrentView('both'), children: "Both" })] })] })), _jsxs("div", { className: cn("grid gap-6", currentView === 'both' ? "lg:grid-cols-2" : "lg:grid-cols-1"), children: [(currentView === 'interface' || currentView === 'both') && canEdit && (_jsx(HiveCard, { className: "p-6", children: _jsx(PollInterface, { poll: poll, onUpdate: handleUpdatePoll, onDelete: handleDelete, onToggleActive: handleToggleActive }) })), (currentView === 'surface' || currentView === 'both') && (_jsx(HiveCard, { className: "p-6", children: _jsx(PollSurface, { poll: poll, userId: userId, userRole: userRole, onVote: handleVote, hasVoted: hasUserVoted }) }))] })] }));
}
export default PollDualInterface;
//# sourceMappingURL=poll-dual-interface.js.map