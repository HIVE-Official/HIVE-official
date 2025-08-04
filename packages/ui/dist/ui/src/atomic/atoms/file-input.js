'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
import { Upload, X, File, Image as ImageIcon, FileText } from 'lucide-react';
const fileInputSizes = {
    sm: {
        dropzone: 'p-4 text-sm',
        button: 'px-3 py-2 text-sm',
        preview: 'w-16 h-16'
    },
    md: {
        dropzone: 'p-6 text-base',
        button: 'px-4 py-2.5 text-sm',
        preview: 'w-20 h-20'
    },
    lg: {
        dropzone: 'p-8 text-lg',
        button: 'px-6 py-3 text-base',
        preview: 'w-24 h-24'
    }
};
const formatFileSize = (bytes) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
        return _jsx(ImageIcon, { className: "w-full h-full" });
    }
    if (file.type.includes('text/') || file.type.includes('document')) {
        return _jsx(FileText, { className: "w-full h-full" });
    }
    return _jsx(File, { className: "w-full h-full" });
};
export const FileInput = React.forwardRef(({ accept, multiple = false, maxSize, maxFiles, preview = false, variant = 'default', size = 'md', error, label, helperText, onFileSelect, onFileRemove, showFileList = true, className, disabled, ...props }, ref) => {
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [dragActive, setDragActive] = React.useState(false);
    const [previewUrls, setPreviewUrls] = React.useState([]);
    const inputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => inputRef.current);
    const validateFile = (file) => {
        if (maxSize && file.size > maxSize) {
            return `File size must be less than ${formatFileSize(maxSize)}`;
        }
        return null;
    };
    const handleFileChange = (files) => {
        if (!files)
            return;
        const fileArray = Array.from(files);
        const validFiles = [];
        const errors = [];
        fileArray.forEach(file => {
            const error = validateFile(file);
            if (error) {
                errors.push(`${file.name}: ${error}`);
            }
            else {
                validFiles.push(file);
            }
        });
        if (maxFiles && selectedFiles.length + validFiles.length > maxFiles) {
            errors.push(`Maximum ${maxFiles} files allowed`);
            return;
        }
        const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles.slice(0, 1);
        setSelectedFiles(newFiles);
        // Generate preview URLs for images
        if (preview) {
            const newUrls = newFiles.map(file => {
                if (file.type.startsWith('image/')) {
                    return URL.createObjectURL(file);
                }
                return '';
            });
            setPreviewUrls(newUrls);
        }
        onFileSelect?.(files);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (!disabled) {
            handleFileChange(e.dataTransfer.files);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        if (!disabled) {
            setDragActive(true);
        }
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };
    const removeFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        if (preview) {
            const newUrls = previewUrls.filter((_, i) => i !== index);
            // Clean up old URL
            if (previewUrls[index]) {
                URL.revokeObjectURL(previewUrls[index]);
            }
            setPreviewUrls(newUrls);
        }
        onFileRemove?.(index);
    };
    const openFileDialog = () => {
        if (!disabled) {
            inputRef.current?.click();
        }
    };
    // Cleanup URLs on unmount
    React.useEffect(() => {
        return () => {
            previewUrls.forEach(url => {
                if (url)
                    URL.revokeObjectURL(url);
            });
        };
    }, []);
    const renderDefaultInput = () => (_jsx("div", { className: "space-y-2", children: _jsxs("div", { className: cn('relative', 'border-2 border-dashed border-hive-border-default', 'rounded-xl', 'transition-all duration-200 ease-out', fileInputSizes[size].dropzone, dragActive && 'border-hive-gold bg-[var(--hive-brand-secondary)]/5', error && 'border-hive-ruby', disabled && 'opacity-50 cursor-not-allowed'), children: [_jsx("input", { ref: inputRef, type: "file", accept: accept, multiple: multiple, disabled: disabled, onChange: (e) => handleFileChange(e.target.files), className: "sr-only", ...props }), _jsxs("div", { className: "text-center", children: [_jsx(Upload, { className: "mx-auto h-8 w-8 text-hive-text-secondary mb-2" }), _jsx("p", { className: "text-hive-text-primary font-medium", children: "Click to upload or drag and drop" }), accept && (_jsx("p", { className: "text-hive-text-secondary text-sm mt-1", children: accept.split(',').join(', ') })), maxSize && (_jsxs("p", { className: "text-hive-text-secondary text-sm", children: ["Max size: ", formatFileSize(maxSize)] }))] })] }) }));
    const renderDropzone = () => (_jsxs("div", { className: cn('border-2 border-dashed rounded-xl', 'transition-all duration-200 ease-out', 'cursor-pointer', fileInputSizes[size].dropzone, dragActive
            ? 'border-hive-gold bg-[var(--hive-brand-secondary)]/5'
            : 'border-hive-border-default hover:border-hive-gold hover:bg-hive-background-interactive', error && 'border-hive-ruby', disabled && 'opacity-50 cursor-not-allowed pointer-events-none'), onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onClick: openFileDialog, children: [_jsx("input", { ref: inputRef, type: "file", accept: accept, multiple: multiple, disabled: disabled, onChange: (e) => handleFileChange(e.target.files), className: "sr-only", ...props }), _jsxs("div", { className: "text-center", children: [_jsx(Upload, { className: "mx-auto h-12 w-12 text-hive-text-secondary mb-4" }), _jsx("p", { className: "text-hive-text-primary font-medium mb-2", children: dragActive ? 'Drop files here' : 'Drag & drop files here' }), _jsxs("p", { className: "text-hive-text-secondary", children: ["or ", _jsx("span", { className: "text-[var(--hive-brand-secondary)] font-medium", children: "browse" }), " to choose files"] })] })] }));
    const renderButtonInput = () => (_jsxs("button", { type: "button", onClick: openFileDialog, disabled: disabled, className: cn('inline-flex items-center gap-2', 'border border-hive-border-default', 'rounded-xl', 'bg-hive-background-secondary', 'text-hive-text-primary', 'font-medium', 'transition-all duration-200 ease-out', 'hover:bg-hive-background-interactive hover:border-hive-gold', 'focus:outline-none focus:ring-2 focus:ring-hive-gold/20 focus:border-hive-gold', 'disabled:opacity-50 disabled:cursor-not-allowed', fileInputSizes[size].button, error && 'border-hive-ruby'), children: [_jsx("input", { ref: inputRef, type: "file", accept: accept, multiple: multiple, disabled: disabled, onChange: (e) => handleFileChange(e.target.files), className: "sr-only", ...props }), _jsx(Upload, { className: "w-4 h-4" }), "Choose Files"] }));
    const renderFileList = () => {
        if (!showFileList || selectedFiles.length === 0)
            return null;
        return (_jsxs("div", { className: "space-y-2 mt-4", children: [_jsxs("h4", { className: "text-sm font-medium text-hive-text-primary", children: ["Selected Files (", selectedFiles.length, ")"] }), _jsx("div", { className: "space-y-2", children: selectedFiles.map((file, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-hive-background-secondary rounded-lg border border-hive-border-default", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [preview && previewUrls[index] ? (_jsx("img", { src: previewUrls[index], alt: file.name, className: cn('object-cover rounded border border-hive-border-default', fileInputSizes[size].preview) })) : (_jsx("div", { className: cn('flex items-center justify-center', 'bg-hive-background-tertiary rounded border border-hive-border-default', 'text-hive-text-secondary', fileInputSizes[size].preview), children: getFileIcon(file) })), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-sm font-medium text-hive-text-primary truncate", children: file.name }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: formatFileSize(file.size) })] })] }), _jsx("button", { type: "button", onClick: () => removeFile(index), className: "ml-2 p-1 text-hive-text-secondary hover:text-hive-ruby transition-colors duration-200", "aria-label": `Remove ${file.name}`, children: _jsx(X, { className: "w-4 h-4" }) })] }, `${file.name}-${index}`))) })] }));
    };
    return (_jsxs("div", { className: cn('space-y-2', className), children: [label && (_jsx("label", { className: "block text-sm font-medium text-hive-text-primary", children: label })), variant === 'dropzone' && renderDropzone(), variant === 'button' && renderButtonInput(), variant === 'default' && renderDefaultInput(), (error || helperText) && (_jsx("p", { className: cn('text-xs', error ? 'text-hive-ruby' : 'text-hive-text-secondary'), children: error || helperText })), renderFileList()] }));
});
FileInput.displayName = 'FileInput';
// Convenient preset components
export const ImageInput = (props) => (_jsx(FileInput, { accept: "image/*", preview: true, ...props }));
export const DocumentInput = (props) => (_jsx(FileInput, { accept: ".pdf,.doc,.docx,.txt,.rtf", ...props }));
export const DropzoneInput = (props) => (_jsx(FileInput, { variant: "dropzone", ...props }));
export const ButtonFileInput = (props) => (_jsx(FileInput, { variant: "button", ...props }));
//# sourceMappingURL=file-input.js.map