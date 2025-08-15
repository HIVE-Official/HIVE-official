'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Camera, Upload, Edit, Settings, Crown, Shield, User, MapPin, Building2, EyeOff, Save, X } from 'lucide-react';
// Photo Upload Component
function PhotoUploadDialog({ currentPhoto, onUpload, isOpen, onOpenChange }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileSelect = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        // Validate file
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('File size must be less than 5MB');
            return;
        }
        // Create preview
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    }, []);
    const handleUpload = useCallback(async () => {
        const file = fileInputRef.current?.files?.[0];
        if (!file)
            return;
        setUploading(true);
        try {
            await onUpload(file);
            onOpenChange(false);
            setPreview(null);
        }
        catch (error) {
            console.error('Upload failed:', error);
            alert('Failed to upload photo');
        }
        finally {
            setUploading(false);
        }
    }, [onUpload, onOpenChange]);
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Update Profile Photo" }) }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsxs(Avatar, { className: "w-32 h-32", children: [_jsx(AvatarImage, { src: preview || currentPhoto }), _jsx(AvatarFallback, { className: "text-4xl", children: _jsx(User, { className: "w-16 h-16" }) })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileSelect, className: "hidden" }), _jsxs(Button, { variant: "outline", className: "w-full", onClick: () => fileInputRef.current?.click(), children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Choose Photo"] }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)] text-center", children: "JPG, PNG, or WebP. Max 5MB." })] }), preview && (_jsx(Button, { className: "w-full", onClick: handleUpload, disabled: uploading, children: uploading ? (_jsxs(_Fragment, { children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: 'linear' }, className: "w-4 h-4 mr-2", children: _jsx(Upload, { className: "w-4 h-4" }) }), "Uploading..."] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Update Photo"] })) }))] })] }) }));
}
// Profile Editing Form
function ProfileEditForm({ profile, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        displayName: profile.displayName,
        bio: profile.bio,
        academicInfo: { ...profile.academicInfo }
    });
    const [hasChanges, setHasChanges] = useState(false);
    const handleChange = useCallback((field, value) => {
        setFormData(prev => {
            const updated = { ...prev };
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                updated[parent] = {
                    ...updated[parent],
                    [child]: value
                };
            }
            else {
                updated[field] = value;
            }
            return updated;
        });
        setHasChanges(true);
    }, []);
    const handleSave = useCallback(() => {
        onSave(formData);
        setHasChanges(false);
    }, [formData, onSave]);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "space-y-4 p-4 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Edit Profile" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: onCancel, children: _jsx(X, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", onClick: handleSave, disabled: !hasChanges, children: _jsx(Save, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Display Name" }), _jsx(Input, { value: formData.displayName, onChange: (e) => handleChange('displayName', e.target.value), placeholder: "Your name" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Bio" }), _jsx(Textarea, { value: formData.bio, onChange: (e) => handleChange('bio', e.target.value), placeholder: "Tell others about yourself...", rows: 3 })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Year" }), _jsx(Input, { value: formData.academicInfo.year, onChange: (e) => handleChange('academicInfo.year', e.target.value), placeholder: "2026" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Major" }), _jsx(Input, { value: formData.academicInfo.major, onChange: (e) => handleChange('academicInfo.major', e.target.value), placeholder: "Computer Science" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Housing" }), _jsx(Input, { value: formData.academicInfo.housing || '', onChange: (e) => handleChange('academicInfo.housing', e.target.value), placeholder: "West Campus" })] })] })] }));
}
// Main Avatar Card Component
export function AvatarCard({ profile, isEditMode, onProfileUpdate, onPhotoUpload, onEditClick, onSettingsClick, className }) {
    const [isEditing, setIsEditing] = useState(false);
    const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
    const [showFullBio, setShowFullBio] = useState(false);
    const handlePhotoClick = useCallback(() => {
        if (isEditMode)
            return;
        setPhotoDialogOpen(true);
    }, [isEditMode]);
    const handleEditProfile = useCallback(() => {
        setIsEditing(true);
        onEditClick?.();
    }, [onEditClick]);
    const handleSaveProfile = useCallback((updates) => {
        onProfileUpdate(updates);
        setIsEditing(false);
    }, [onProfileUpdate]);
    const handleCancelEdit = useCallback(() => {
        setIsEditing(false);
    }, []);
    // Bio truncation for compact display
    const bioPreview = profile.bio.length > 120
        ? `${profile.bio.substring(0, 120)}...`
        : profile.bio;
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { className: cn('h-full overflow-hidden', className), children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "relative", children: _jsx("div", { className: cn('absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white', profile.isOnline ? 'bg-green-500' : 'bg-gray-400', profile.ghostMode && 'bg-gray-300 opacity-50') }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] truncate", children: profile.displayName }), _jsxs("p", { className: "text-sm text-[var(--hive-text-muted)]", children: [profile.academicInfo.year, " \u2022 ", profile.academicInfo.major] })] })] }), !isEditMode && (_jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: handleEditProfile, className: "h-8 w-8 p-0", children: _jsx(Edit, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: onSettingsClick, className: "h-8 w-8 p-0", children: _jsx(Settings, { className: "w-4 h-4" }) })] }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "relative group cursor-pointer", onClick: handlePhotoClick, children: [_jsxs(Avatar, { className: "w-16 h-16", children: [_jsx(AvatarImage, { src: profile.profilePhotoURL }), _jsx(AvatarFallback, { className: "text-lg", children: profile.displayName.split(' ').map(n => n[0]).join('') })] }), !isEditMode && (_jsx(motion.div, { initial: { opacity: 0 }, whileHover: { opacity: 1 }, className: "absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center", children: _jsx(Camera, { className: "w-5 h-5 text-white" }) })), profile.builderStatus && (_jsx("div", { className: "absolute -top-2 -right-2", children: _jsx("div", { className: "w-6 h-6 bg-[var(--hive-brand-gold)] rounded-full flex items-center justify-center", children: _jsx(Crown, { className: "w-3 h-3 text-white" }) }) })), profile.ghostMode && (_jsx("div", { className: "absolute -bottom-1 -right-1", children: _jsx("div", { className: "w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center", children: _jsx(EyeOff, { className: "w-3 h-3 text-white" }) }) }))] }), _jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [_jsxs("div", { className: "flex flex-wrap gap-1", children: [profile.builderStatus && (_jsxs(Badge, { variant: "default", className: "bg-[var(--hive-brand-gold)] text-white text-xs", children: [_jsx(Crown, { className: "w-3 h-3 mr-1" }), "Builder"] })), profile.isVerified && (_jsxs(Badge, { variant: "outline", className: "text-xs", children: [_jsx(Shield, { className: "w-3 h-3 mr-1" }), "Verified"] })), profile.ghostMode && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [_jsx(EyeOff, { className: "w-3 h-3 mr-1" }), "Ghost"] }))] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-muted)]", children: [_jsx(Building2, { className: "w-3 h-3" }), profile.academicInfo.school] }), profile.academicInfo.housing && (_jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-muted)]", children: [_jsx(MapPin, { className: "w-3 h-3" }), profile.academicInfo.housing] }))] }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("div", { className: cn('w-2 h-2 rounded-full', profile.isOnline ? 'bg-green-500' : 'bg-gray-400', profile.ghostMode && 'bg-gray-300 opacity-50') }), _jsx("span", { className: "text-[var(--hive-text-muted)]", children: profile.ghostMode
                                                            ? 'Ghost Mode'
                                                            : profile.isOnline
                                                                ? 'Online'
                                                                : `Last seen ${profile.lastSeen}` })] })] })] }), !isEditing && profile.bio && (_jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: showFullBio ? profile.bio : bioPreview }), profile.bio.length > 120 && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setShowFullBio(!showFullBio), className: "h-6 px-2 text-xs", children: showFullBio ? 'Show less' : 'Show more' }))] })), _jsx(AnimatePresence, { children: isEditing && (_jsx(ProfileEditForm, { profile: profile, onSave: handleSaveProfile, onCancel: handleCancelEdit })) })] })] }), _jsx(PhotoUploadDialog, { currentPhoto: profile.profilePhotoURL, onUpload: onPhotoUpload, isOpen: photoDialogOpen, onOpenChange: setPhotoDialogOpen })] }));
}
// Default props for development
export const mockUserProfile = {
    id: 'user-1',
    displayName: 'Sarah Chen',
    email: 'sarahc@buffalo.edu',
    profilePhotoURL: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
    bio: 'CS student passionate about building tools that help campus life. Always down for a good study session! 🚀 Love working on projects that make a real difference.',
    academicInfo: {
        year: '2026',
        major: 'Computer Science',
        school: 'University at Buffalo',
        housing: 'West Campus'
    },
    builderStatus: true,
    isVerified: false,
    ghostMode: false,
    lastSeen: '2 hours ago',
    isOnline: true
};
//# sourceMappingURL=avatar-card.js.map