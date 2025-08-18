"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { X, Move, ZoomIn, ZoomOut } from 'lucide-react';
export const ImageCropModal = ({ isOpen, onClose, imageFile, onCropComplete, }) => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const handleCropComplete = useCallback(async () => {
        if (!imageFile || !canvasRef.current || !imgRef.current)
            return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // Set canvas size to crop dimensions
        canvas.width = crop.width;
        canvas.height = crop.height;
        // Draw the cropped portion
        ctx.drawImage(imgRef.current, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
        // Convert canvas to blob
        canvas.toBlob((blob) => {
            if (blob) {
                const croppedFile = new File([blob], imageFile.name, {
                    type: imageFile.type,
                    lastModified: Date.now(),
                });
                onCropComplete(croppedFile);
                onClose();
            }
        }, imageFile.type);
    }, [imageFile, crop, onCropComplete, onClose]);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - crop.x, y: e.clientY - crop.y });
    };
    const handleMouseMove = (e) => {
        if (!isDragging)
            return;
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setCrop(prev => ({
            ...prev,
            x: Math.max(0, Math.min(newX, (imgRef.current?.width || 0) - prev.width)),
            y: Math.max(0, Math.min(newY, (imgRef.current?.height || 0) - prev.height)),
        }));
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    // Initialize crop to center when image loads
    useEffect(() => {
        if (imageLoaded && imgRef.current) {
            const img = imgRef.current;
            const imgWidth = img.offsetWidth;
            const imgHeight = img.offsetHeight;
            // Create a centered square crop
            const cropSize = Math.min(imgWidth, imgHeight) * 0.8;
            const centerX = (imgWidth - cropSize) / 2;
            const centerY = (imgHeight - cropSize) / 2;
            setCrop({
                x: centerX,
                y: centerY,
                width: cropSize,
                height: cropSize
            });
        }
    }, [imageLoaded]);
    if (!isOpen || !imageFile)
        return null;
    return (_jsx(AnimatePresence, { children: _jsx(motion.div, { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, children: _jsxs(motion.div, { className: "bg-surface border border-border rounded-lg p-6 max-w-2xl w-full mx-4", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-display font-medium text-foreground", children: "Crop Your Photo" }), _jsx("p", { className: "text-sm text-muted font-body mt-1", children: "Your photo will be displayed prominently like a profile card" })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "relative bg-surface-01 border border-border rounded-lg p-4", children: _jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "relative inline-block", onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onMouseLeave: handleMouseUp, children: [_jsx("img", { ref: imgRef, src: URL.createObjectURL(imageFile), alt: "Crop preview", className: "max-w-full max-h-80 object-contain", style: { transform: `scale(${scale})` }, draggable: false, onLoad: () => setImageLoaded(true) }), _jsx("div", { className: "absolute border-2 border-accent bg-accent/10 cursor-move", style: {
                                                    left: crop.x,
                                                    top: crop.y,
                                                    width: crop.width,
                                                    height: crop.height,
                                                }, onMouseDown: handleMouseDown, children: _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(Move, { className: "w-4 h-4 text-accent" }) }) })] }) }) }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-4 mb-4", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => setScale(Math.max(0.5, scale - 0.2)), children: [_jsx(ZoomOut, { className: "w-4 h-4 mr-2" }), "Zoom Out"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setScale(Math.min(2, scale + 0.2)), children: [_jsx(ZoomIn, { className: "w-4 h-4 mr-2" }), "Zoom In"] })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-sm text-muted font-body", children: "Drag the highlighted area to position your crop" }), _jsx("p", { className: "text-xs text-muted font-body", children: "Make sure your face is clear and well-lit for the best results" })] })] }) }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { variant: "outline", onClick: onClose, className: "flex-1", children: "Cancel" }), _jsx(Button, { variant: "ritual", onClick: handleCropComplete, className: "flex-1", children: "Apply Crop" })] })] }), _jsx("canvas", { ref: canvasRef, className: "hidden" })] }) }) }));
};
//# sourceMappingURL=image-crop-modal.js.map