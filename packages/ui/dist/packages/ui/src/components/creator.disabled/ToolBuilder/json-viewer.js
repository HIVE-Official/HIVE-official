"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Button } from "../../../index";
import { ScrollArea } from "../../ui/scroll-area";
import { Input } from "../../../index";
import { Copy, Download, Upload, Eye, EyeOff, Search, ChevronRight, Braces, CheckCircle, AlertCircle, } from "lucide-react";
const JsonNode = ({ data, keyName, level = 0, isLast = true, searchTerm = "" }) => {
    const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
    const [isHovered, setIsHovered] = useState(false);
    const dataType = useMemo(() => {
        if (data === null)
            return 'null';
        if (Array.isArray(data))
            return 'array';
        return typeof data;
    }, [data]);
    const isExpandable = dataType === 'object' || dataType === 'array';
    const hasChildren = isExpandable && Object.keys(data || {}).length > 0;
    // Highlight search terms
    const highlightText = useCallback((text) => {
        if (!searchTerm || !text.toLowerCase().includes(searchTerm.toLowerCase())) {
            return text;
        }
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) => regex.test(part) ? (_jsx("span", { className: "bg-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)] px-1 rounded", children: part }, index)) : (part));
    }, [searchTerm]);
    // Color coding based on type
    const getValueColor = (value, type) => {
        switch (type) {
            case 'string':
                return 'text-[var(--hive-status-success)]';
            case 'number':
                return 'text-[var(--hive-brand-primary)]';
            case 'boolean':
                return 'text-[var(--hive-status-warning)]';
            case 'null':
                return 'text-[var(--hive-text-secondary)]';
            default:
                return 'text-[var(--hive-text-primary)]';
        }
    };
    const renderValue = () => {
        if (dataType === 'string') {
            return (_jsxs("span", { className: getValueColor(data, dataType), children: ["\"", highlightText(data), "\""] }));
        }
        if (dataType === 'null') {
            return _jsx("span", { className: getValueColor(data, dataType), children: "null" });
        }
        if (dataType === 'boolean' || dataType === 'number') {
            return (_jsx("span", { className: getValueColor(data, dataType), children: String(data) }));
        }
        return null;
    };
    const renderObjectPreview = () => {
        if (dataType === 'array') {
            return (_jsxs("span", { className: "text-[var(--hive-text-secondary)]", children: ["[", data.length, " items]"] }));
        }
        if (dataType === 'object') {
            const keys = Object.keys(data || {});
            return (_jsxs("span", { className: "text-[var(--hive-text-secondary)]", children: ['{', keys.length > 0 && (_jsxs("span", { className: "ml-1", children: [keys.slice(0, 3).join(', '), keys.length > 3 && '...'] })), '}'] }));
        }
        return null;
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: level * 0.02 }, className: cn("font-mono text-sm", level > 0 && "ml-4 border-l border-[var(--hive-border-primary)]/30 pl-4"), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsxs("div", { className: cn("flex items-center gap-2 py-1 rounded", isHovered && "bg-[var(--hive-background-secondary)]/30"), children: [hasChildren && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsExpanded(!isExpanded), className: "h-4 w-4 p-0 hover:bg-[var(--hive-background-secondary)]", children: _jsx(motion.div, { animate: { rotate: isExpanded ? 90 : 0 }, transition: { duration: 0.2 }, children: _jsx(ChevronRight, { className: "h-3 w-3" }) }) })), keyName && (_jsxs("span", { className: "text-[var(--hive-text-primary)] font-medium", children: [highlightText(keyName), ":"] })), !isExpandable ? (renderValue()) : (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: dataType === 'array' ? '[' : '{' }), !isExpanded && hasChildren && renderObjectPreview(), (!hasChildren || isExpanded) && (_jsx("span", { className: "text-[var(--hive-text-primary)]", children: dataType === 'array' ? ']' : '}' }))] })), _jsx("span", { className: cn("px-1.5 py-0.5 rounded text-xs font-medium", "bg-[var(--hive-background-secondary)]/50 text-[var(--hive-text-secondary)]", isHovered && "opacity-100", !isHovered && "opacity-0", "transition-opacity duration-200"), children: dataType })] }), _jsx(AnimatePresence, { children: isExpandable && isExpanded && hasChildren && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, className: "overflow-hidden", children: dataType === 'array' ? (data.map((item, index) => (_jsx(JsonNode, { data: item, keyName: `[${index}]`, level: level + 1, isLast: index === data.length - 1, searchTerm: searchTerm }, index)))) : (Object.entries(data || {}).map(([key, value], index, entries) => (_jsx(JsonNode, { data: value, keyName: key, level: level + 1, isLast: index === entries.length - 1, searchTerm: searchTerm }, key)))) })) })] }));
};
export const JsonViewer = ({ tool, onImport, className, readOnly = false, }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isRawMode, setIsRawMode] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [importError, setImportError] = useState(null);
    // Format the tool data for display
    const formattedJson = useMemo(() => {
        return JSON.stringify(tool, null, 2);
    }, [tool]);
    // Copy to clipboard
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(formattedJson);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
        catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    }, [formattedJson]);
    // Download JSON file
    const handleDownload = useCallback(() => {
        const blob = new Blob([formattedJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tool.name || 'tool'}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [formattedJson, tool.name]);
    // Import JSON from file
    const handleImport = useCallback((event) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result);
                onImport?.(data);
                setImportError(null);
                // Reset file input
                event.target.value = '';
            }
            catch (error) {
                setImportError('Invalid JSON file format');
                setTimeout(() => setImportError(null), 3000);
            }
        };
        reader.readAsText(file);
    }, [onImport]);
    // Get tool statistics
    const toolStats = useMemo(() => {
        const stats = {
            elements: tool.elements?.length || 0,
            size: new Blob([formattedJson]).size,
            modified: tool.updatedAt ? new Date(tool.updatedAt).toLocaleDateString() : 'Unknown'
        };
        return stats;
    }, [tool, formattedJson]);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("flex flex-col h-full", "bg-[var(--hive-background-secondary)]/30 backdrop-blur-sm", "border border-[var(--hive-border-primary)] rounded-lg", className), children: [_jsxs("div", { className: "p-4 border-b border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Braces, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }), _jsx("h3", { className: "font-semibold text-sm text-[var(--hive-text-primary)]", children: "JSON Viewer" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Input, { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search...", className: cn("pl-7 pr-3 py-1 h-8 w-32 text-xs", "bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "focus:w-48 transition-all duration-200") })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setIsRawMode(!isRawMode), className: cn("h-8 px-3 border-[var(--hive-border-primary)]", "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]"), children: [isRawMode ? _jsx(Eye, { className: "h-3 w-3 mr-1" }) : _jsx(EyeOff, { className: "h-3 w-3 mr-1" }), isRawMode ? 'Tree' : 'Raw'] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleCopy, className: cn("h-8 px-3 border-[var(--hive-border-primary)]", "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]", copySuccess && "border-[var(--hive-status-success)] text-[var(--hive-status-success)]"), children: [copySuccess ? (_jsx(CheckCircle, { className: "h-3 w-3 mr-1" })) : (_jsx(Copy, { className: "h-3 w-3 mr-1" })), copySuccess ? 'Copied!' : 'Copy'] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleDownload, className: cn("h-8 px-3 border-[var(--hive-border-primary)]", "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]"), children: [_jsx(Download, { className: "h-3 w-3 mr-1" }), "Export"] }), !readOnly && onImport && (_jsxs("div", { className: "relative", children: [_jsx("input", { type: "file", accept: ".json", onChange: handleImport, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }), _jsxs(Button, { variant: "outline", size: "sm", className: cn("h-8 px-3 border-[var(--hive-border-primary)]", "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]"), children: [_jsx(Upload, { className: "h-3 w-3 mr-1" }), "Import"] })] }))] })] }), _jsxs("div", { className: "flex items-center gap-4 text-xs text-[var(--hive-text-secondary)]", children: [_jsxs("span", { children: [toolStats.elements, " elements"] }), _jsxs("span", { children: [(toolStats.size / 1024).toFixed(1), "KB"] }), _jsxs("span", { children: ["Modified: ", toolStats.modified] })] }), _jsx(AnimatePresence, { children: importError && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "mt-2 p-2 rounded bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/30", children: _jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-status-error)]", children: [_jsx(AlertCircle, { className: "h-3 w-3" }), importError] }) })) })] }), _jsx(ScrollArea, { className: "flex-1", children: _jsx("div", { className: "p-4", children: isRawMode ? (_jsx(motion.pre, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: cn("text-xs font-mono whitespace-pre-wrap", "text-[var(--hive-text-primary)]", "bg-[var(--hive-background-primary)] p-4 rounded", "border border-[var(--hive-border-primary)]"), children: formattedJson })) : (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "space-y-1", children: _jsx(JsonNode, { data: tool, searchTerm: searchTerm, level: 0 }) })) }) })] }));
};
export default JsonViewer;
//# sourceMappingURL=json-viewer.js.map