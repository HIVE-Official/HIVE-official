"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils.js';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system.js';
import { Upload, X, File, Image, Video, Music, FileText, Archive, Code, Check, AlertCircle, RefreshCw, Eye } from 'lucide-react';
// HIVE File Upload - Magnetic Drag & Drop with Liquid Metal Motion
// Sophisticated file upload with drag & drop, progress tracking, and visual feedback
const hiveFileUploadVariants = cva(
// Base upload styles - matte obsidian glass
"relative w-full border-2 border-dashed rounded-2xl transition-all", {
    variants: {
        variant: {
            default: "border-white/20 bg-[var(--hive-background-primary)]/20 hover:border-white/30 hover:bg-[var(--hive-background-primary)]/30",
            premium: "border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50 hover:bg-yellow-500/10",
            minimal: "border-white/10 bg-transparent hover:border-white/20",
        },
        state: {
            idle: "",
            dragOver: "border-yellow-500 bg-yellow-500/10 scale-[1.02]",
            uploading: "border-blue-500/50 bg-blue-500/5",
            success: "border-green-500/50 bg-green-500/5",
            error: "border-red-500/50 bg-red-500/5",
        },
        size: {
            sm: "p-6 min-h-32",
            default: "p-8 min-h-48",
            lg: "p-12 min-h-64",
        }
    },
    defaultVariants: {
        variant: "default",
        state: "idle",
        size: "default",
    },
});
// File item animation variants
const fileItemVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 300,
            damping: 25,
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: -20,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
// Progress animation variants
const progressVariants = {
    initial: { width: "0%" },
    animate: (progress) => ({
        width: `${progress}%`,
        transition: {
            duration: 0.3,
            ease: liquidMetal.easing,
        }
    })
};
const HiveFileUpload = React.forwardRef(({ className, variant, size, multiple = true, accept, maxSize = 10 * 1024 * 1024, // 10MB default
maxFiles = 10, disabled = false, showPreview = true, showProgress = true, dragToReorder = false, onFilesSelected, onFileRemove, onUpload, customUploadHandler, allowedTypes, placeholder, dropzoneText = "Drop files here or click to browse", uploadText = "Upload Files", ...props }, ref) => {
    const [files, setFiles] = useState([]);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    // Determine upload area state
    const uploadState = dragOver ? 'dragOver' : uploading ? 'uploading' : 'idle';
    // File type detection
    const getFileIcon = (type) => {
        if (type.startsWith('image/'))
            return _jsx(Image, { size: 20 });
        if (type.startsWith('video/'))
            return _jsx(Video, { size: 20 });
        if (type.startsWith('audio/'))
            return _jsx(Music, { size: 20 });
        if (type.includes('text/') || type.includes('document'))
            return _jsx(FileText, { size: 20 });
        if (type.includes('zip') || type.includes('rar') || type.includes('tar'))
            return _jsx(Archive, { size: 20 });
        if (type.includes('javascript') || type.includes('json') || type.includes('css'))
            return _jsx(Code, { size: 20 });
        return _jsx(File, { size: 20 });
    };
    // File size formatting
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    // File validation
    const validateFile = (file) => {
        if (maxSize && file.size > maxSize) {
            return `File size exceeds ${formatFileSize(maxSize)}`;
        }
        if (allowedTypes && !allowedTypes.some(type => file.type.startsWith(type))) {
            return `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`;
        }
        return null;
    };
    // Generate file preview
    const generatePreview = useCallback((file) => {
        return new Promise((resolve) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target?.result);
                reader.onerror = () => resolve(null);
                reader.readAsDataURL(file);
            }
            else {
                resolve(null);
            }
        });
    }, []);
    // Process selected files
    const processFiles = useCallback(async (fileList) => {
        const newFiles = [];
        const fileArray = Array.from(fileList);
        // Check file count limit
        if (files.length + fileArray.length > maxFiles) {
            console.warn(`Maximum ${maxFiles} files allowed`);
            return;
        }
        for (const file of fileArray) {
            const error = validateFile(file);
            const preview = showPreview ? await generatePreview(file) : undefined;
            newFiles.push({
                id: `${Date.now()}-${Math.random()}`,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                status: error ? 'error' : 'pending',
                progress: 0,
                error,
                preview,
            });
        }
        setFiles(prev => [...prev, ...newFiles]);
        onFilesSelected?.(fileArray);
    }, [files.length, maxFiles, maxSize, allowedTypes, showPreview, onFilesSelected, generatePreview, validateFile]);
    // Drag and drop handlers
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setDragOver(true);
        }
    }, [disabled]);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    }, []);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        if (!disabled) {
            const droppedFiles = e.dataTransfer.files;
            processFiles(droppedFiles);
        }
    }, [disabled, processFiles]);
    // File input change handler
    const handleInputChange = useCallback((e) => {
        if (e.target.files) {
            processFiles(e.target.files);
            // Reset input value
            e.target.value = '';
        }
    }, [processFiles]);
    // Remove file
    const removeFile = useCallback((fileId) => {
        setFiles(prev => prev.filter(f => f.id !== fileId));
        onFileRemove?.(fileId);
    }, [onFileRemove]);
    // Upload files
    const uploadFiles = useCallback(async () => {
        const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
        if (pendingFiles.length === 0)
            return;
        setUploading(true);
        try {
            if (customUploadHandler) {
                // Use custom upload handler
                for (const fileItem of pendingFiles) {
                    setFiles(prev => prev.map(f => f.id === fileItem.id
                        ? { ...f, status: 'uploading', progress: 0 }
                        : f));
                    try {
                        const result = await customUploadHandler(fileItem.file);
                        setFiles(prev => prev.map(f => f.id === fileItem.id
                            ? { ...f, status: 'success', progress: 100, url: result.url }
                            : f));
                    }
                    catch (error) {
                        setFiles(prev => prev.map(f => f.id === fileItem.id
                            ? { ...f, status: 'error', error: error instanceof Error ? error.message : 'Upload failed' }
                            : f));
                    }
                }
            }
            else if (onUpload) {
                // Use provided upload handler
                await onUpload(pendingFiles);
            }
            else {
                // Simulate upload with progress
                for (const fileItem of pendingFiles) {
                    setFiles(prev => prev.map(f => f.id === fileItem.id
                        ? { ...f, status: 'uploading' }
                        : f));
                    // Simulate progress
                    for (let progress = 0; progress <= 100; progress += 10) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                        setFiles(prev => prev.map(f => f.id === fileItem.id
                            ? { ...f, progress }
                            : f));
                    }
                    setFiles(prev => prev.map(f => f.id === fileItem.id
                        ? { ...f, status: 'success' }
                        : f));
                }
            }
        }
        catch (error) {
            console.error('Upload error:', error);
        }
        finally {
            setUploading(false);
        }
    }, [files, customUploadHandler, onUpload]);
    // Open file browser
    const openFileBrowser = () => {
        if (!disabled) {
            fileInputRef.current?.click();
        }
    };
    const hasFiles = files.length > 0;
    const hasPendingFiles = files.some(f => f.status === 'pending' || f.status === 'error');
    return (_jsxs("div", { ref: ref, className: cn(hiveFileUploadVariants({ variant, state: uploadState, size, className })), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: handleDrop, ...props, children: [_jsx("input", { ref: fileInputRef, type: "file", multiple: multiple, accept: accept, onChange: handleInputChange, className: "hidden", disabled: disabled }), !hasFiles && (_jsxs(motion.div, { className: "text-center cursor-pointer", onClick: openFileBrowser, whileHover: !disabled ? { scale: 1.02 } : {}, whileTap: !disabled ? { scale: 0.98 } : {}, children: [_jsx(motion.div, { animate: dragOver ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }, transition: { duration: motionDurations.quick }, children: _jsx(Upload, { size: 48, className: cn("mx-auto mb-4", dragOver ? "text-yellow-400" : "text-[var(--hive-text-primary)]/60") }) }), _jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: dragOver ? "Drop files here" : "Upload Files" }), _jsx("p", { className: "text-[var(--hive-text-primary)]/60 mb-4", children: dropzoneText }), maxSize && (_jsxs("p", { className: "text-sm text-[var(--hive-text-primary)]/40", children: ["Maximum file size: ", formatFileSize(maxSize)] })), allowedTypes && (_jsxs("p", { className: "text-sm text-[var(--hive-text-primary)]/40 mt-1", children: ["Accepted types: ", allowedTypes.join(', ')] })), placeholder] })), hasFiles && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: ["Files (", files.length, ")"] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(motion.button, { className: "px-4 py-2 bg-[var(--hive-text-primary)]/10 hover:bg-[var(--hive-text-primary)]/20 text-[var(--hive-text-primary)] rounded-xl transition-colors", onClick: openFileBrowser, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: "Add More" }), hasPendingFiles && (_jsx(motion.button, { className: "px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-xl transition-colors", onClick: uploadFiles, disabled: uploading, whileHover: { scale: uploading ? 1 : 1.02 }, whileTap: { scale: uploading ? 1 : 0.98 }, children: uploading ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RefreshCw, { size: 16, className: "animate-spin" }), _jsx("span", { children: "Uploading..." })] })) : (uploadText) }))] })] }), _jsx(AnimatePresence, { mode: "popLayout", children: files.map((fileItem) => (_jsx(motion.div, { className: "bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-xl p-4", variants: fileItemVariants, initial: "hidden", animate: "visible", exit: "exit", layout: true, children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "shrink-0", children: fileItem.preview ? (_jsx("img", { src: fileItem.preview, alt: fileItem.name, className: "w-12 h-12 object-cover rounded-lg border border-white/10" })) : (_jsx("div", { className: "w-12 h-12 bg-[var(--hive-text-primary)]/10 rounded-lg border border-white/10 flex items-center justify-center text-[var(--hive-text-primary)]/60", children: getFileIcon(fileItem.type) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("h5", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: fileItem.name }), _jsxs("div", { className: "flex items-center space-x-2 shrink-0 ml-2", children: [fileItem.status === 'success' && (_jsx(Check, { size: 16, className: "text-green-400" })), fileItem.status === 'error' && (_jsx(AlertCircle, { size: 16, className: "text-red-400" })), fileItem.status === 'uploading' && (_jsx(RefreshCw, { size: 16, className: "text-blue-400 animate-spin" })), fileItem.url && (_jsx(motion.button, { className: "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 p-1", onClick: () => window.open(fileItem.url, '_blank'), whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(Eye, { size: 14 }) })), _jsx(motion.button, { className: "text-[var(--hive-text-primary)]/60 hover:text-red-400 p-1", onClick: () => removeFile(fileItem.id), whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(X, { size: 14 }) })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm text-[var(--hive-text-primary)]/60", children: [_jsx("span", { children: formatFileSize(fileItem.size) }), _jsx("span", { className: "capitalize", children: fileItem.status })] }), fileItem.error && (_jsx("p", { className: "text-sm text-red-400 mt-1", children: fileItem.error })), showProgress && fileItem.status === 'uploading' && (_jsxs("div", { className: "mt-2", children: [_jsx("div", { className: "bg-[var(--hive-text-primary)]/10 rounded-full h-2 overflow-hidden", children: _jsx(motion.div, { className: "bg-yellow-400 h-full rounded-full", variants: progressVariants, initial: "initial", animate: "animate", custom: fileItem.progress }) }), _jsxs("div", { className: "text-xs text-[var(--hive-text-primary)]/60 mt-1", children: [fileItem.progress, "%"] })] }))] })] }) }, fileItem.id))) })] }))] }));
});
HiveFileUpload.displayName = "HiveFileUpload";
// Hook for file upload management
export function useHiveFileUpload() {
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const addFiles = useCallback((newFiles) => {
        const fileItems = newFiles.map(file => ({
            id: `${Date.now()}-${Math.random()}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'pending',
            progress: 0,
        }));
        setFiles(prev => [...prev, ...fileItems]);
        return fileItems;
    }, []);
    const removeFile = useCallback((fileId) => {
        setFiles(prev => prev.filter(f => f.id !== fileId));
    }, []);
    const updateFileStatus = useCallback((fileId, updates) => {
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, ...updates } : f));
    }, []);
    const clearFiles = useCallback(() => {
        setFiles([]);
    }, []);
    return {
        files,
        isUploading,
        setIsUploading,
        addFiles,
        removeFile,
        updateFileStatus,
        clearFiles,
    };
}
export { HiveFileUpload, hiveFileUploadVariants };
//# sourceMappingURL=hive-file-upload.js.map