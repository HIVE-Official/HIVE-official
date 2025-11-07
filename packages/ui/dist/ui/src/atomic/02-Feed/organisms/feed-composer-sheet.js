'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, Button, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, ImageIcon, XIcon, LoaderIcon, } from '../atoms';
export const FeedComposerSheet = React.forwardRef(({ open, onOpenChange, spaces, selectedSpaceId, onSpaceChange, onSubmit, isSubmitting = false, maxLength = 5000, allowMedia = true, className, customFooter, }, ref) => {
    const [content, setContent] = React.useState('');
    const [selectedSpace, setSelectedSpace] = React.useState(selectedSpaceId || '');
    const [mediaFiles, setMediaFiles] = React.useState([]);
    const fileInputRef = React.useRef(null);
    const remainingChars = maxLength - content.length;
    const isValid = content.trim().length > 0 && selectedSpace && remainingChars >= 0;
    React.useEffect(() => {
        if (selectedSpaceId) {
            setSelectedSpace(selectedSpaceId);
        }
    }, [selectedSpaceId]);
    const handleSpaceChange = (value) => {
        setSelectedSpace(value);
        onSpaceChange?.(value);
    };
    const handleSubmit = () => {
        if (!isValid || isSubmitting)
            return;
        onSubmit?.({
            content: content.trim(),
            spaceId: selectedSpace,
            media: mediaFiles,
        });
        // Reset form
        setContent('');
        setMediaFiles([]);
    };
    const handleMediaUpload = (event) => {
        const files = event.target.files;
        if (!files)
            return;
        const newFiles = Array.from(files).map((file, index) => ({
            id: `${Date.now()}-${index}`,
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video/') ? 'video' : 'image',
            name: file.name,
        }));
        setMediaFiles((prev) => [...prev, ...newFiles].slice(0, 4)); // Max 4 files
    };
    const removeMedia = (id) => {
        setMediaFiles((prev) => prev.filter((file) => file.id !== id));
    };
    return (_jsx(Sheet, { open: open, onOpenChange: onOpenChange, children: _jsxs(SheetContent, { side: "bottom", className: cn('max-h-[90vh] sm:max-w-2xl sm:mx-auto', className), ref: ref, children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Create Post" }), _jsx(SheetDescription, { children: "Share your thoughts, photos, or updates with your spaces." })] }), _jsxs("div", { className: "flex flex-col gap-4 py-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]", children: "Post to" }), _jsxs(Select, { value: selectedSpace, onValueChange: handleSpaceChange, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a space" }) }), _jsx(SelectContent, { children: spaces.map((space) => (_jsx(SelectItem, { value: space.id, children: _jsxs("div", { className: "flex items-center gap-2", children: [space.icon && _jsx("span", { children: space.icon }), _jsx("span", { children: space.name })] }) }, space.id))) })] })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { className: "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]", children: "What's on your mind?" }), _jsx(Textarea, { value: content, onChange: (e) => setContent(e.target.value), placeholder: "Share something with your space...", className: "min-h-[120px] resize-none", maxLength: maxLength, disabled: isSubmitting }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("span", { className: cn('text-xs text-[var(--hive-text-tertiary)]', remainingChars < 100 && 'text-yellow-400', remainingChars < 0 && 'text-red-400'), children: [remainingChars, " characters remaining"] }) })] }), mediaFiles.length > 0 && (_jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: mediaFiles.map((file) => (_jsxs("div", { className: "group relative aspect-square overflow-hidden rounded-lg border border-[var(--hive-border-default)]", children: [file.type === 'image' ? (_jsx("img", { src: file.url, alt: file.name, className: "h-full w-full object-cover" })) : (_jsx("video", { src: file.url, className: "h-full w-full object-cover" })), _jsx("button", { onClick: () => removeMedia(file.id), className: "absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100", children: _jsx(XIcon, { className: "h-4 w-4" }) })] }, file.id))) })), allowMedia && mediaFiles.length < 4 && (_jsxs("div", { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*,video/*", multiple: true, onChange: handleMediaUpload, className: "hidden", disabled: isSubmitting }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => fileInputRef.current?.click(), disabled: isSubmitting, className: "w-full border border-dashed border-[var(--hive-border-default)] hover:border-[var(--hive-brand-primary)]/40", children: [_jsx(ImageIcon, { className: "mr-2 h-4 w-4" }), "Add photos or videos (", 4 - mediaFiles.length, " remaining)"] })] }))] }), customFooter, _jsx(SheetFooter, { children: _jsxs("div", { className: "flex w-full items-center justify-between gap-3", children: [_jsx(Button, { variant: "ghost", onClick: () => onOpenChange(false), disabled: isSubmitting, children: "Cancel" }), _jsx(Button, { variant: "brand", onClick: handleSubmit, disabled: !isValid || isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(LoaderIcon, { className: "mr-2 h-4 w-4 animate-spin" }), "Posting..."] })) : ('Post') })] }) })] }) }));
});
FeedComposerSheet.displayName = 'FeedComposerSheet';
//# sourceMappingURL=feed-composer-sheet.js.map