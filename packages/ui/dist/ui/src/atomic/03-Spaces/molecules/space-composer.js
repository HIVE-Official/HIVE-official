'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * SpaceComposer - Minimal in-space composer with reduced chrome
 * No avatar, consolidated attachment button
 * Based on YC/SF minimalism: focus on the content, not the chrome
 */
import { useState } from 'react';
import { Plus, Image, Calendar, Wrench } from 'lucide-react';
import { Button } from '../../00-Global/atoms/button';
import { Textarea } from '../../00-Global/atoms/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '../../00-Global/molecules/dropdown-menu';
import { MotionDiv } from '../../../shells/motion-safe';
const HIVE_EASING = {
    reveal: [0.23, 1, 0.32, 1],
    interactive: [0.25, 0.46, 0.45, 0.94],
};
export function SpaceComposer({ spaceName, canCreateEvents = false, canUseTools = false, onSubmit, placeholder = "What's happening?", }) {
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState([]);
    const handleSubmit = () => {
        if (!content.trim() && attachments.length === 0)
            return;
        onSubmit?.(content, attachments);
        setContent('');
        setAttachments([]);
    };
    const handleAddAttachment = (type) => {
        // Placeholder - would open respective modals
        console.log(`Add ${type}`);
    };
    const canPost = content.trim().length > 0 || attachments.length > 0;
    return (_jsxs(MotionDiv, { className: "bg-black/20 border border-white/8 rounded-xl p-4", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: HIVE_EASING.reveal }, children: [_jsx(Textarea, { value: content, onChange: (e) => setContent(e.target.value), placeholder: placeholder, className: "min-h-[80px] bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 resize-none" }), attachments.length > 0 && (_jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: attachments.map((att, i) => (_jsxs("div", { className: "px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70", children: [att.type === 'image' && '📷 Image', att.type === 'event' && '📅 Event', att.type === 'tool' && '🔧 Tool'] }, i))) })), _jsxs("div", { className: "flex items-center justify-between mt-3 pt-3 border-t border-white/8", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "text-white/60 hover:text-white hover:bg-white/5 gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add"] }) }), _jsxs(DropdownMenuContent, { align: "start", className: "bg-black/95 border-white/10", children: [_jsxs(DropdownMenuItem, { onClick: () => handleAddAttachment('image'), className: "text-white/80 hover:text-white cursor-pointer", children: [_jsx(Image, { className: "w-4 h-4 mr-2" }), "Photo"] }), canCreateEvents && (_jsxs(DropdownMenuItem, { onClick: () => handleAddAttachment('event'), className: "text-white/80 hover:text-white cursor-pointer", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), "Event"] })), canUseTools && (_jsxs(DropdownMenuItem, { onClick: () => handleAddAttachment('tool'), className: "text-white/80 hover:text-white cursor-pointer", children: [_jsx(Wrench, { className: "w-4 h-4 mr-2" }), "Tool"] }))] })] }), _jsx(Button, { variant: "brand", size: "sm", onClick: handleSubmit, disabled: !canPost, className: "min-w-[80px]", children: "Post" })] })] }));
}
//# sourceMappingURL=space-composer.js.map