"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { CheckCircle, AlertCircle, Loader2, Upload, Camera, XIcon, Shuffle, Crop, } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
import { ImageCropModal } from './image-crop-modal';
export const CreateProfileStep = ({ displayName, onDisplayNameChange, handle, onHandleChange, handleAvailability, avatarUrl, avatarModerationStatus, onFileSelect, onSubmit, isUploading, error, selectedFile, termsAccepted, onTermsAcceptedChange, userRole = 'student', schoolName = 'your school', photos = [], onPhotosChange, }) => {
    const fileInputRef = useRef(null);
    const { variants: _variants } = useAdaptiveMotion('academic');
    const [showCropModal, setShowCropModal] = useState(false);
    const [cropImageFile, setCropImageFile] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const allPhotos = [...photos, ...(selectedFile ? [URL.createObjectURL(selectedFile)] : []), ...(avatarUrl ? [avatarUrl] : [])].filter(Boolean);
    const maxPhotos = 1;
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    const handleRemovePhoto = () => {
        // Clear the selected file if it exists
        if (selectedFile) {
            onFileSelect(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        // Clear existing photos
        if (onPhotosChange && photos.length > 0) {
            onPhotosChange([]);
        }
    };
    const handleCropComplete = (croppedFile) => {
        onFileSelect(croppedFile);
        setShowCropModal(false);
        setCropImageFile(null);
    };
    const handleCropPhoto = async () => {
        if (allPhotos.length === 0)
            return;
        const photoUrl = allPhotos[0];
        // If it's a selectedFile (blob URL), use it directly
        if (selectedFile) {
            setCropImageFile(selectedFile);
            setShowCropModal(true);
            return;
        }
        // If it's an existing photo URL, convert to File
        try {
            const response = await fetch(photoUrl);
            const blob = await response.blob();
            const file = new File([blob], 'profile-photo.jpg', { type: 'image/jpeg' });
            setCropImageFile(file);
            setShowCropModal(true);
        }
        catch (error) {
            console.error('Failed to load photo for cropping:', error);
        }
    };
    const generateSuggestions = () => {
        if (!displayName || displayName.trim().length === 0) {
            // If no name provided, show message
            setSuggestions([]);
            return;
        }
        // Import the functions dynamically to avoid build issues
        import("@hive/core").then(({ generateHandleSuggestions }) => {
            const newSuggestions = generateHandleSuggestions(displayName, 4);
            setSuggestions(newSuggestions);
        }).catch(() => {
            // Fallback name-based suggestions if import fails
            const cleanName = displayName.toLowerCase().replace(/[^a-z0-9]/g, "");
            const names = displayName.trim().split(/\s+/);
            const firstName = names[0]?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
            const lastName = names[names.length - 1]?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
            const fallbackSuggestions = [];
            if (cleanName) {
                fallbackSuggestions.push(`${cleanName}${Math.floor(Math.random() * 99) + 1}`);
            }
            if (firstName && lastName && firstName !== lastName) {
                fallbackSuggestions.push(`${firstName}.${lastName}`);
                fallbackSuggestions.push(`${firstName}${lastName?.charAt(0) || ""}`);
            }
            if (firstName) {
                fallbackSuggestions.push(`${firstName}${Math.floor(Math.random() * 999) + 1}`);
            }
            setSuggestions(fallbackSuggestions.slice(0, 4));
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs(motion.div, { className: "w-full max-w-2xl bg-surface border border-border rounded-lg p-8 space-y-8", variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "text-center space-y-3", variants: hiveVariants.item, children: [_jsx("h2", { className: "text-2xl font-display font-medium text-foreground", children: userRole === 'student'
                                    ? `Welcome to ${schoolName}!`
                                    : userRole === 'faculty'
                                        ? `Welcome, Professor!`
                                        : `Welcome to HIVE!` }), _jsx("p", { className: "text-muted font-body text-base", children: userRole === 'student'
                                    ? `Let's create your student profile so you can connect with classmates and discover campus communities.`
                                    : userRole === 'faculty'
                                        ? `Set up your faculty profile to connect with colleagues and guide students in their journey.`
                                        : `Tell us about yourself to get started on your HIVE journey.` }), _jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-accent" }), _jsx("span", { className: "text-sm font-medium text-accent font-body", children: "Step 2 of 4" })] })] }), _jsxs(motion.form, { onSubmit: onSubmit, className: "space-y-6", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "bg-surface-01 border border-border rounded-lg overflow-hidden", variants: hiveVariants.item, children: [_jsx("div", { className: "p-6 border-b border-border", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-sm font-medium text-foreground font-body", children: "Profile Photo" }), _jsx("span", { className: "text-xs text-muted", children: allPhotos.length > 0 ? '1/1' : '0/1' })] }) }), _jsxs("div", { className: "relative h-80 bg-surface-02 overflow-hidden", children: [_jsx(AnimatePresence, { mode: "wait", children: allPhotos.length > 0 ? (_jsxs(motion.div, { className: "relative h-full", variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", exit: "hidden", children: [_jsx("img", { src: allPhotos[0], alt: "Profile photo", className: "w-full h-full object-cover" }), _jsx(motion.button, { type: "button", onClick: handleRemovePhoto, className: "absolute top-4 right-4 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-muted hover:text-accent transition-colors", whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(XIcon, { className: "w-4 h-4" }) })] }, "photo")) : (_jsxs(motion.div, { onClick: handleUploadClick, className: "h-full flex flex-col items-center justify-center cursor-pointer hover:bg-surface-03 transition-colors", variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", exit: "hidden", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Camera, { className: "w-12 h-12 text-muted mb-4" }), _jsx("h4", { className: "text-lg font-medium text-foreground mb-2", children: "Add your photo" }), _jsx("p", { className: "text-sm text-muted text-center max-w-xs", children: "Share a photo to help others get to know you better" })] }, "empty")) }), _jsx("input", { type: "file", ref: fileInputRef, onChange: (e) => onFileSelect(e.target.files?.[0] || null), className: "hidden", accept: "image/*" })] }), _jsxs("div", { className: "p-6 border-t border-border bg-surface-02", children: [_jsxs("div", { className: "flex gap-3 justify-center", children: [_jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: handleUploadClick, disabled: allPhotos.length >= maxPhotos, children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), allPhotos.length === 0 ? 'Add Photo' : 'Replace Photo'] }), (allPhotos.length > 0) && (_jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: handleCropPhoto, children: [_jsx(Crop, { className: "w-4 h-4 mr-2" }), "Edit Photo"] }))] }), _jsxs("div", { className: "text-center mt-4", children: [_jsx("p", { className: "text-sm text-muted font-body", children: "Your photo helps you make genuine connections - add one to get started" }), avatarModerationStatus && avatarModerationStatus !== 'approved' && (_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-surface-02 text-muted border border-border mt-3", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-muted" }), avatarModerationStatus === 'pending' && 'Photo under review', avatarModerationStatus === 'under_review' && 'Photo being reviewed', avatarModerationStatus === 'rejected' && 'Photo needs update'] }))] })] })] }), _jsxs(motion.div, { className: "space-y-2", variants: hiveVariants.item, children: [_jsx(Label, { htmlFor: "displayName", children: "Full Name" }), _jsx(Input, { id: "displayName", value: displayName, onChange: (e) => onDisplayNameChange(e.target.value), placeholder: "Ada Lovelace", variant: "accent", required: true })] }), _jsxs(motion.div, { className: "space-y-3", variants: hiveVariants.item, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "handle", children: "Username" }), _jsxs(Button, { type: "button", variant: "ghost", size: "sm", onClick: generateSuggestions, className: "text-xs text-muted hover:text-accent", children: [_jsx(Shuffle, { className: "w-3 h-3 mr-1" }), "Randomize"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "handle", value: handle, onChange: (e) => onHandleChange(e.target.value), placeholder: "your.username", variant: "accent", required: true, className: "pr-10" }), _jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: _jsxs(AnimatePresence, { mode: "wait", children: [handleAvailability.isChecking && (_jsx(motion.div, { variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", exit: "hidden", children: _jsx(Loader2, { className: "h-5 w-5 animate-spin text-muted" }) }, "checking")), handleAvailability.available === true && (_jsx(motion.div, { variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", exit: "hidden", children: _jsx(CheckCircle, { className: "h-5 w-5 text-accent" }) }, "available")), handleAvailability.available === false && (_jsx(motion.div, { variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", exit: "hidden", children: _jsx(AlertCircle, { className: "h-5 w-5 text-muted" }) }, "unavailable"))] }) })] }), _jsx(AnimatePresence, { children: suggestions.length > 0 && (_jsx(motion.div, { className: "flex flex-wrap gap-2", variants: hiveVariants.slideDown, initial: "hidden", animate: "visible", exit: "hidden", children: suggestions.map((suggestion, index) => (_jsx(motion.button, { type: "button", onClick: () => onHandleChange(suggestion), className: "px-3 py-1.5 text-xs bg-surface-01 border border-border rounded-md hover:bg-surface-02 hover:border-accent/30 text-muted hover:text-accent transition-all", variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", transition: { delay: index * 0.1 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: suggestion }, suggestion))) })) })] }), _jsxs(motion.div, { className: "flex items-start space-x-3", variants: hiveVariants.item, children: [_jsx(Checkbox, { id: "terms", checked: termsAccepted, onCheckedChange: onTermsAcceptedChange, className: "mt-1" }), _jsxs(Label, { htmlFor: "terms", className: "text-sm font-normal text-muted-foreground leading-normal", children: ["I agree to the", ' ', _jsx("a", { href: "/legal/terms", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-accent", children: "Terms of Service" }), ' ', "and", ' ', _jsx("a", { href: "/legal/privacy", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-accent", children: "Privacy Policy" }), "."] })] }), _jsx(AnimatePresence, { children: error && (_jsx(motion.p, { className: "text-sm text-muted italic", variants: hiveVariants.slideDown, initial: "hidden", animate: "visible", exit: "hidden", children: error })) }), _jsx(motion.div, { variants: hiveVariants.item, children: _jsx(Button, { type: "submit", variant: "ritual", fullWidth: true, disabled: isUploading || !termsAccepted, children: isUploading ? _jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : 'Continue' }) })] })] }), _jsx(ImageCropModal, { isOpen: showCropModal, onClose: () => {
                    setShowCropModal(false);
                    setCropImageFile(null);
                }, imageFile: cropImageFile, onCropComplete: handleCropComplete })] }));
};
//# sourceMappingURL=create-profile-step.js.map