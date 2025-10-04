"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../atoms/sheet";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Textarea } from "../atoms/textarea";
import { Label } from "../atoms/label";
import { Badge } from "../atoms/badge";
import { Separator } from "../atoms/separator";
import { Edit, Upload, X } from "lucide-react";
/**
 * Profile Edit Sheet
 *
 * Side drawer for inline profile editing.
 * Better UX than full-page forms - students can edit without losing context.
 *
 * Features:
 * - Photo carousel editing (upload/reorder/remove)
 * - Inline field editing
 * - Interest tag management
 * - Auto-save on blur (optional)
 * - Validation feedback
 */
const ProfileEditSheet = React.forwardRef(({ className, profile, onSave, onUploadPhoto, onRemovePhoto, trigger, isLoading = false, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [editedData, setEditedData] = React.useState(profile);
    const [isDirty, setIsDirty] = React.useState(false);
    // Reset edited data when profile changes or sheet opens
    React.useEffect(() => {
        if (open) {
            setEditedData(profile);
            setIsDirty(false);
        }
    }, [open, profile]);
    const handleFieldChange = (field, value) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };
    const handleSave = async () => {
        if (onSave) {
            await onSave(editedData);
        }
        setIsDirty(false);
        setOpen(false);
    };
    const handleCancel = () => {
        setEditedData(profile);
        setIsDirty(false);
        setOpen(false);
    };
    const handlePhotoUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !onUploadPhoto)
            return;
        try {
            const photoUrl = await onUploadPhoto(file);
            setEditedData(prev => ({
                ...prev,
                photos: [...(prev.photos || []), photoUrl].slice(0, 5) // Max 5 photos
            }));
            setIsDirty(true);
        }
        catch (error) {
            console.error('Failed to upload photo:', error);
        }
    };
    const handleRemovePhoto = (photoUrl) => {
        if (onRemovePhoto) {
            onRemovePhoto(photoUrl);
        }
        setEditedData(prev => ({
            ...prev,
            photos: prev.photos?.filter(p => p !== photoUrl)
        }));
        setIsDirty(true);
    };
    const initials = editedData.fullName
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    return (_jsxs(Sheet, { open: open, onOpenChange: setOpen, children: [_jsx(SheetTrigger, { asChild: true, children: trigger || (_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Edit, { className: "h-4 w-4 mr-2" }), "Edit Profile"] })) }), _jsxs(SheetContent, { side: "right", className: "w-full sm:max-w-lg overflow-y-auto", children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Edit Profile" }), _jsx(SheetDescription, { children: "Make changes to your profile. Changes are saved when you click \"Save Changes\"." })] }), _jsxs("div", { className: "py-6 space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "Profile Photos (max 5)" }), _jsxs("div", { className: "grid grid-cols-5 gap-2", children: [editedData.photos?.map((photo, index) => (_jsxs("div", { className: "relative aspect-[3/4] rounded-lg overflow-hidden border group", children: [_jsx("img", { src: photo, alt: `Photo ${index + 1}`, className: "w-full h-full object-cover" }), _jsx("button", { type: "button", onClick: () => handleRemovePhoto(photo), className: "absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(X, { className: "h-3 w-3" }) })] }, index))), (!editedData.photos || editedData.photos.length < 5) && (_jsxs("label", { className: "aspect-[3/4] rounded-lg border-2 border-dashed border-muted-foreground/40 hover:border-primary cursor-pointer flex flex-col items-center justify-center transition-colors", children: [_jsx(Upload, { className: "h-5 w-5 text-muted-foreground mb-1" }), _jsx("span", { className: "text-[10px] text-muted-foreground", children: "Upload" }), _jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handlePhotoUpload, disabled: isLoading })] }))] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [editedData.photos?.length || 0, " / 5 photos \u2022 3:4 aspect ratio recommended"] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "fullName", children: "Full Name *" }), _jsx(Input, { id: "fullName", value: editedData.fullName, onChange: (e) => handleFieldChange('fullName', e.target.value), placeholder: "Sarah Chen", disabled: isLoading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "bio", children: "Bio" }), _jsx(Textarea, { id: "bio", value: editedData.bio || '', onChange: (e) => handleFieldChange('bio', e.target.value), placeholder: "Tell people about yourself...", rows: 3, disabled: isLoading, className: "resize-none" }), _jsxs("p", { className: "text-xs text-muted-foreground", children: [editedData.bio?.length || 0, " / 150 characters"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "pronouns", children: "Pronouns" }), _jsx(Input, { id: "pronouns", value: editedData.pronouns || '', onChange: (e) => handleFieldChange('pronouns', e.target.value), placeholder: "she/her", disabled: isLoading })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "major", children: "Major *" }), _jsx(Input, { id: "major", value: editedData.major, onChange: (e) => handleFieldChange('major', e.target.value), placeholder: "Computer Science", disabled: isLoading })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "academicYear", children: "Year" }), _jsxs("select", { id: "academicYear", value: editedData.academicYear || '', onChange: (e) => handleFieldChange('academicYear', e.target.value), disabled: isLoading, className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", children: [_jsx("option", { value: "", children: "Select year" }), _jsx("option", { value: "Freshman", children: "Freshman" }), _jsx("option", { value: "Sophomore", children: "Sophomore" }), _jsx("option", { value: "Junior", children: "Junior" }), _jsx("option", { value: "Senior", children: "Senior" }), _jsx("option", { value: "Graduate", children: "Graduate" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "graduationYear", children: "Grad Year" }), _jsx(Input, { id: "graduationYear", type: "number", value: editedData.graduationYear || '', onChange: (e) => handleFieldChange('graduationYear', parseInt(e.target.value)), placeholder: "2026", disabled: isLoading })] })] })] }), _jsx(Separator, {}), editedData.interests && (_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "Interests" }), _jsx("div", { className: "flex flex-wrap gap-2", children: editedData.interests.map((interest, index) => (_jsx(Badge, { variant: "sophomore", children: interest }, index))) }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Interest editing coming soon" })] }))] }), _jsxs("div", { className: "flex gap-3 pt-6 border-t", children: [_jsx(Button, { variant: "outline", onClick: handleCancel, disabled: isLoading, className: "flex-1", children: "Cancel" }), _jsx(Button, { onClick: handleSave, disabled: !isDirty || isLoading, className: "flex-1", children: isLoading ? 'Saving...' : 'Save Changes' })] })] })] }));
});
ProfileEditSheet.displayName = "ProfileEditSheet";
export { ProfileEditSheet };
//# sourceMappingURL=profile-edit-sheet.js.map