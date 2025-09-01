"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  Code,
  Link,
  Image,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  Save,
  Users,
  AtSign,
  Hash,
  Upload,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

// HIVE Rich Text Editor System - Campus-focused markdown editor
// Enables students to create rich content with campus integrations

const hiveRichTextEditorVariants = cva(
  "relative w-full bg-[var(--hive-background-secondary)] border border-[var(--hive-border-subtle)] rounded-2xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)]",
        premium: "border-[var(--hive-border-[var(--hive-brand-secondary)])] bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] to-transparent",
        elevated: "border-[var(--hive-border-primary)] bg-[var(--hive-background-tertiary)] shadow-lg",
        minimal: "border-[var(--hive-border-subtle)] bg-transparent",
      },
      
      size: {
        sm: "min-h-50",
        default: "min-h-100",
        lg: "min-h-150",
        xl: "min-h-[800px]",
      },
      
      mode: {
        edit: "",
        preview: "",
        split: "grid grid-cols-2 gap-0",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      mode: "edit",
    },
  }
);

const toolbarVariants = cva(
  "flex items-center gap-1 px-4 py-3 border-b border-[var(--hive-border-subtle)] bg-[var(--hive-background-tertiary)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-background-tertiary)]",
        premium: "bg-gradient-to-r from-[var(--hive-overlay-gold-subtle)] to-transparent",
        elevated: "bg-[var(--hive-background-secondary)]",
        minimal: "bg-transparent border-b-0",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toolbarButtonVariants = cva(
  "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default: "hover:bg-[var(--hive-overlay-glass)] text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]",
        active: "bg-[var(--hive-overlay-gold-subtle)] text-[var(--hive-brand-primary)] border border-[var(--hive-border-[var(--hive-brand-secondary)])]",
        disabled: "opacity-50 cursor-not-allowed",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CampusLink {
  type: 'space' | 'student' | 'course' | 'tool';
  id: string;
  name: string;
  url?: string;
}

export interface CollaborativeUser {
  id: string;
  name: string;
  avatar?: string;
  cursor?: { line: number; column: number };
  selection?: { start: { line: number; column: number }; end: { line: number; column: number } };
}

export interface HiveRichTextEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof hiveRichTextEditorVariants> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  showToolbar?: boolean;
  showPreview?: boolean;
  showWordCount?: boolean;
  showCollaborators?: boolean;
  maxLength?: number;
  autosave?: boolean;
  autosaveInterval?: number;
  campusLinks?: CampusLink[];
  collaborators?: CollaborativeUser[];
  onSave?: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  onCampusLinkSearch?: (query: string, type: CampusLink['type']) => Promise<CampusLink[]>;
  syntaxHighlight?: boolean;
  spellCheck?: boolean;
  autoFocus?: boolean;
  error?: string;
  disabled?: boolean;
}

const HiveRichTextEditor = React.forwardRef<HTMLDivElement, HiveRichTextEditorProps>(
  ({ 
    className,
    variant,
    size,
    mode: initialMode = "edit",
    value,
    defaultValue = "",
    onChange,
    placeholder = "Start writing...",
    readOnly = false,
    showToolbar = true,
    showPreview = false,
    showWordCount = true,
    showCollaborators = false,
    maxLength,
    autosave = false,
    autosaveInterval = 5000,
    campusLinks = [],
    collaborators = [],
    onSave,
    onImageUpload,
    onCampusLinkSearch,
    syntaxHighlight = true,
    spellCheck = true,
    autoFocus = false,
    error,
    disabled = false,
    ...props 
  }, ref) => {
    
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [mode, setMode] = useState(initialMode);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showLinkDialog, setShowLinkDialog] = useState(false);
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 });
    const [selectionRange, setSelectionRange] = useState<{ start: number; end: number } | null>(null);
    const [campusLinkSuggestions, setCampusLinkSuggestions] = useState<CampusLink[]>([]);
    const [showCampusLinkSuggestions, setShowCampusLinkSuggestions] = useState(false);
    
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const autosaveTimerRef = useRef<NodeJS.Timeout>();
    
    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue;
    
    // Word count calculation
    const wordCount = useMemo(() => {
      if (!currentValue) return 0;
      return currentValue.trim().split(/\s+/).filter(word => word.length > 0).length;
    }, [currentValue]);
    
    // Character count
    const charCount = currentValue.length;
    
    // Autosave functionality
    useEffect(() => {
      if (autosave && onSave && !readOnly) {
        autosaveTimerRef.current = setInterval(() => {
          if (currentValue) {
            onSave(currentValue);
          }
        }, autosaveInterval);
        
        return () => {
          if (autosaveTimerRef.current) {
            clearInterval(autosaveTimerRef.current);
          }
        };
      }
    }, [autosave, onSave, currentValue, autosaveInterval, readOnly]);
    
    // Auto-focus
    useEffect(() => {
      if (autoFocus && editorRef.current) {
        editorRef.current.focus();
      }
    }, [autoFocus]);
    
    // Handle value changes
    const handleValueChange = useCallback((newValue: string) => {
      if (maxLength && newValue.length > maxLength) {
        return;
      }
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }, [value, onChange, maxLength]);
    
    // Toolbar actions
    const insertText = useCallback((before: string, after: string = '', placeholder: string = '') => {
      if (!editorRef.current) return;
      
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = currentValue.substring(start, end);
      const textToInsert = selectedText || placeholder;
      
      const newValue = 
        currentValue.substring(0, start) + 
        before + textToInsert + after + 
        currentValue.substring(end);
      
      handleValueChange(newValue);
      
      // Update cursor position
      setTimeout(() => {
        if (selectedText) {
          textarea.setSelectionRange(start + before.length, start + before.length + textToInsert.length);
        } else {
          textarea.setSelectionRange(start + before.length, start + before.length + textToInsert.length);
        }
        textarea.focus();
      }, 0);
    }, [currentValue, handleValueChange]);
    
    const insertAtCursor = useCallback((text: string) => {
      if (!editorRef.current) return;
      
      const textarea = editorRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = 
        currentValue.substring(0, start) + 
        text + 
        currentValue.substring(end);
      
      handleValueChange(newValue);
      
      // Update cursor position
      setTimeout(() => {
        textarea.setSelectionRange(start + text.length, start + text.length);
        textarea.focus();
      }, 0);
    }, [currentValue, handleValueChange]);
    
    // Toolbar button handlers
    const handleBold = () => insertText('**', '**', 'bold text');
    const handleItalic = () => insertText('*', '*', 'italic text');
    const handleUnderline = () => insertText('<u>', '</u>', 'underlined text');
    const handleStrikethrough = () => insertText('~~', '~~', 'strikethrough text');
    const handleCode = () => insertText('`', '`', 'code');
    const handleQuote = () => insertText('\n> ', '', 'quote');
    const handleHeading1 = () => insertText('\n# ', '', 'Heading 1');
    const handleHeading2 = () => insertText('\n## ', '', 'Heading 2');
    const handleHeading3 = () => insertText('\n### ', '', 'Heading 3');
    const handleUnorderedList = () => insertText('\n- ', '', 'List item');
    const handleOrderedList = () => insertText('\n1. ', '', 'List item');
    
    const handleLink = () => {
      if (editorRef.current) {
        const textarea = editorRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = currentValue.substring(start, end);
        
        setLinkText(selectedText);
        setLinkUrl('');
        setShowLinkDialog(true);
      }
    };
    
    const handleImage = () => {
      setShowImageDialog(true);
    };
    
    const insertLink = () => {
      if (linkUrl && linkText) {
        insertAtCursor(`[${linkText}](${linkUrl})`);
      }
      setShowLinkDialog(false);
      setLinkUrl('');
      setLinkText('');
    };
    
    const handleImageUpload = async (file: File) => {
      if (!onImageUpload) return;
      
      setIsUploading(true);
      setUploadProgress(0);
      
      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 100);
        
        const imageUrl = await onImageUpload(file);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Insert image markdown
        insertAtCursor(`![${file.name}](${imageUrl})`);
        
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          setShowImageDialog(false);
        }, 500);
      } catch (error) {
        console.error('Image upload failed:', error);
        setIsUploading(false);
        setUploadProgress(0);
      }
    };
    
    // Campus link search
    const handleCampusLinkSearch = async (query: string, type: CampusLink['type']) => {
      if (!onCampusLinkSearch) return;
      
      try {
        const results = await onCampusLinkSearch(query, type);
        setCampusLinkSuggestions(results);
        setShowCampusLinkSuggestions(true);
      } catch (error) {
        console.error('Campus link search failed:', error);
      }
    };
    
    // Insert campus link
    const insertCampusLink = (link: CampusLink) => {
      const linkMarkdown = link.type === 'space' 
        ? `[#${link.name}](${link.url || '#'})` 
        : `[@${link.name}](${link.url || '#'})`;
      insertAtCursor(linkMarkdown);
      setShowCampusLinkSuggestions(false);
    };
    
    // Enhanced markdown to HTML conversion with syntax highlighting
    const markdownToHtml = (markdown: string) => {
      let html = markdown
        // Headers
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">$1</h3>')
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">$1</h2>')
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">$1</h1>')
        
        // Text formatting
        .replace(/\*\*(.*)\*\*/gm, '<strong class="font-semibold text-[var(--hive-text-primary)]">$1</strong>')
        .replace(/\*(.*)\*/gm, '<em class="italic text-[var(--hive-text-primary)]">$1</em>')
        .replace(/~~(.*)~~/gm, '<del class="line-through text-[var(--hive-text-muted)]">$1</del>')
        .replace(/<u>(.*)<\/u>/gm, '<u class="underline text-[var(--hive-text-primary)]">$1</u>')
        
        // Code
        .replace(/`([^`]+)`/gm, '<code class="bg-[var(--hive-background-tertiary)] text-[var(--hive-brand-primary)] px-2 py-1 rounded text-sm font-mono">$1</code>')
        .replace(/```([\s\S]*?)```/gm, '<pre class="bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg p-4 overflow-x-auto my-4"><code class="text-[var(--hive-text-primary)] text-sm font-mono">$1</code></pre>')
        
        // Quotes
        .replace(/^\> (.*)$/gm, '<blockquote class="border-l-4 border-[var(--hive-border-[var(--hive-brand-secondary)])] pl-4 italic text-[var(--hive-text-secondary)] my-4">$1</blockquote>')
        
        // Lists
        .replace(/^\- (.*)$/gm, '<li class="text-[var(--hive-text-primary)] ml-4 list-disc">$1</li>')
        .replace(/^\d+\. (.*)$/gm, '<li class="text-[var(--hive-text-primary)] ml-4 list-decimal">$1</li>')
        
        // Campus links with special styling
        .replace(/\[#([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" class="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-secondary)] font-medium">#$1</a>')
        .replace(/\[@([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" class="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-secondary)] font-medium">@$1</a>')
        
        // Regular links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" class="text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-secondary)] underline">$1</a>')
        
        // Images
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/gm, '<img alt="$1" src="$2" class="max-w-full h-auto rounded-lg border border-[var(--hive-border-subtle)] my-4" />')
        
        // Line breaks
        .replace(/\n/gm, '<br />');
      
      return html;
    };
    
    const toolbarButtons = [
      { icon: Bold, action: handleBold, tooltip: 'Bold (Ctrl+B)' },
      { icon: Italic, action: handleItalic, tooltip: 'Italic (Ctrl+I)' },
      { icon: Underline, action: handleUnderline, tooltip: 'Underline (Ctrl+U)' },
      { icon: Strikethrough, action: handleStrikethrough, tooltip: 'Strikethrough' },
      { icon: Code, action: handleCode, tooltip: 'Inline Code' },
      { icon: Quote, action: handleQuote, tooltip: 'Quote' },
      { icon: Heading1, action: handleHeading1, tooltip: 'Heading 1' },
      { icon: Heading2, action: handleHeading2, tooltip: 'Heading 2' },
      { icon: Heading3, action: handleHeading3, tooltip: 'Heading 3' },
      { icon: List, action: handleUnorderedList, tooltip: 'Bullet List' },
      { icon: ListOrdered, action: handleOrderedList, tooltip: 'Numbered List' },
      { icon: Link, action: handleLink, tooltip: 'Insert Link' },
      { icon: Image, action: handleImage, tooltip: 'Insert Image' },
    ];
    
    return (
      <div
        ref={ref}
        className={cn(
          hiveRichTextEditorVariants({ variant, size, mode }),
          isFullscreen && "fixed inset-0 z-50 rounded-none",
          className
        )}
        {...props}
      >
        {/* Toolbar */}
        {showToolbar && (
          <div className={cn(toolbarVariants({ variant }))}>
            {/* Formatting Tools */}
            <div className="flex items-center gap-1 mr-4">
              {toolbarButtons.map((button, index) => (
                <motion.button
                  key={index}
                  className={cn(toolbarButtonVariants({ variant: disabled ? 'disabled' : 'default' }))}
                  onClick={button.action}
                  disabled={disabled || readOnly}
                  title={button.tooltip}
                  whileHover={!disabled ? { scale: 1.05 } : {}}
                  whileTap={!disabled ? { scale: 0.95 } : {}}
                >
                  <button.icon size={16} />
                </motion.button>
              ))}
            </div>
            
            {/* Mode Toggle */}
            <div className="flex items-center gap-1 mr-4">
              <motion.button
                className={cn(toolbarButtonVariants({ variant: mode === 'edit' ? 'active' : 'default' }))}
                onClick={() => setMode('edit')}
                title="Edit Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code size={16} />
              </motion.button>
              
              <motion.button
                className={cn(toolbarButtonVariants({ variant: mode === 'preview' ? 'active' : 'default' }))}
                onClick={() => setMode('preview')}
                title="Preview Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={16} />
              </motion.button>
              
              <motion.button
                className={cn(toolbarButtonVariants({ variant: mode === 'split' ? 'active' : 'default' }))}
                onClick={() => setMode('split')}
                title="Split Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Maximize size={16} />
              </motion.button>
            </div>
            
            {/* Campus Tools */}
            {campusLinks.length > 0 && (
              <div className="flex items-center gap-1 mr-4">
                <motion.button
                  className={cn(toolbarButtonVariants({ variant: 'default' }))}
                  onClick={() => handleCampusLinkSearch('', 'space')}
                  title="Link to Space"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Hash size={16} />
                </motion.button>
                
                <motion.button
                  className={cn(toolbarButtonVariants({ variant: 'default' }))}
                  onClick={() => handleCampusLinkSearch('', 'student')}
                  title="Mention Student"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AtSign size={16} />
                </motion.button>
              </div>
            )}
            
            {/* Collaborators */}
            {showCollaborators && collaborators.length > 0 && (
              <div className="flex items-center gap-1 mr-4">
                <Users size={16} className="text-[var(--hive-text-muted)]" />
                <div className="flex -space-x-2">
                  {collaborators.slice(0, 3).map((collaborator, index) => (
                    <div
                      key={collaborator.id}
                      className="w-6 h-6 rounded-full bg-[var(--hive-overlay-gold-subtle)] border border-[var(--hive-border-[var(--hive-brand-secondary)])] flex items-center justify-center text-xs font-medium text-[var(--hive-brand-primary)]"
                      title={collaborator.name}
                    >
                      {collaborator.name.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {collaborators.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-[var(--hive-overlay-glass)] border border-[var(--hive-border-subtle)] flex items-center justify-center text-xs font-medium text-[var(--hive-text-muted)]">
                      +{collaborators.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto">
              {onSave && (
                <motion.button
                  className={cn(toolbarButtonVariants({ variant: 'default' }))}
                  onClick={() => onSave(currentValue)}
                  title="Save"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Save size={16} />
                </motion.button>
              )}
              
              <motion.button
                className={cn(toolbarButtonVariants({ variant: 'default' }))}
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </motion.button>
            </div>
          </div>
        )}
        
        {/* Editor Content */}
        <div className="flex-1 flex">
          {/* Edit Mode */}
          {(mode === 'edit' || mode === 'split') && (
            <div className={cn("flex-1 flex flex-col", mode === 'split' && "border-r border-[var(--hive-border-subtle)]")}>
              <textarea
                ref={editorRef}
                className="flex-1 w-full resize-none bg-transparent text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] p-6 focus:outline-none font-mono text-sm leading-relaxed"
                placeholder={placeholder}
                value={currentValue}
                onChange={(e) => handleValueChange(e.target.value)}
                disabled={disabled || readOnly}
                spellCheck={spellCheck}
                style={{ minHeight: size === 'sm' ? '150px' : size === 'lg' ? '550px' : size === 'xl' ? '750px' : '350px' }}
              />
            </div>
          )}
          
          {/* Preview Mode */}
          {(mode === 'preview' || mode === 'split') && (
            <div className="flex-1 flex flex-col">
              <div
                ref={previewRef}
                className="flex-1 w-full p-6 overflow-y-auto prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(currentValue) }}
              />
            </div>
          )}
        </div>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--hive-background-tertiary)] border-t border-[var(--hive-border-subtle)] text-xs text-[var(--hive-text-muted)]">
          <div className="flex items-center gap-4">
            {showWordCount && (
              <span>
                {wordCount} words • {charCount} characters
                {maxLength && ` • ${maxLength - charCount} remaining`}
              </span>
            )}
            
            {error && (
              <span className="flex items-center gap-1 text-[var(--hive-status-error)]">
                <AlertCircle size={12} />
                {error}
              </span>
            )}
            
            {autosave && (
              <span className="text-[var(--hive-status-success)]">
                <Check size={12} className="inline mr-1" />
                Autosaved
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span>Markdown supported</span>
            {syntaxHighlight && <span>• Syntax highlighting</span>}
          </div>
        </div>
        
        {/* Link Dialog */}
        <AnimatePresence>
          {showLinkDialog && (
            <motion.div
              className="absolute inset-0 bg-[var(--hive-background-primary)]/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-2xl p-6 w-96"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Insert Link</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-secondary)] mb-1">
                      Link Text
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-border-[var(--hive-brand-secondary)])]"
                      placeholder="Enter link text"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--hive-text-secondary)] mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      className="w-full bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg px-3 py-2 text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-border-[var(--hive-brand-secondary)])]"
                      placeholder="https://example.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <motion.button
                    className="px-4 py-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors"
                    onClick={() => setShowLinkDialog(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    className="px-4 py-2 bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] rounded-lg hover:bg-[var(--hive-brand-secondary)] transition-colors"
                    onClick={insertLink}
                    disabled={!linkUrl || !linkText}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Insert Link
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Image Upload Dialog */}
        <AnimatePresence>
          {showImageDialog && (
            <motion.div
              className="absolute inset-0 bg-[var(--hive-background-primary)]/50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-2xl p-6 w-96"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Upload Image</h3>
                
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-[var(--hive-border-subtle)] rounded-lg p-8 text-center hover:border-[var(--hive-border-[var(--hive-brand-secondary)])] transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith('image/')) {
                        handleImageUpload(file);
                      }
                    }}
                  >
                    {isUploading ? (
                      <div className="space-y-3">
                        <div className="animate-spin w-8 h-8 border-2 border-[var(--hive-border-subtle)] border-t-[var(--hive-brand-primary)] rounded-full mx-auto" />
                        <div className="text-[var(--hive-text-secondary)]">Uploading...</div>
                        <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-2">
                          <div
                            className="bg-[var(--hive-brand-primary)] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-8 h-8 text-[var(--hive-text-muted)] mx-auto" />
                        <div className="text-[var(--hive-text-primary)] font-medium">Drop image here</div>
                        <div className="text-[var(--hive-text-secondary)] text-sm">or click to browse</div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file);
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  
                  <label
                    htmlFor="image-upload"
                    className="block w-full px-4 py-2 bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-lg text-center text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] transition-colors cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
                
                <div className="flex justify-end gap-2 mt-6">
                  <motion.button
                    className="px-4 py-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors"
                    onClick={() => setShowImageDialog(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Campus Link Suggestions */}
        <AnimatePresence>
          {showCampusLinkSuggestions && campusLinkSuggestions.length > 0 && (
            <motion.div
              className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-2xl shadow-2xl overflow-hidden z-40"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="p-3 border-b border-[var(--hive-border-subtle)]">
                <div className="text-sm font-medium text-[var(--hive-text-primary)]">Campus Links</div>
              </div>
              
              <div className="max-h-40 overflow-y-auto">
                {campusLinkSuggestions.map((link, index) => (
                  <motion.button
                    key={link.id}
                    className="w-full px-4 py-3 text-left hover:bg-[var(--hive-overlay-glass)] transition-colors flex items-center space-x-3"
                    onClick={() => insertCampusLink(link)}
                    whileHover={{ x: 4 }}
                  >
                    <div className="text-[var(--hive-brand-primary)]">
                      {link.type === 'space' ? <Hash size={16} /> : <AtSign size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[var(--hive-text-primary)]">{link.name}</div>
                      <div className="text-xs text-[var(--hive-text-secondary)] capitalize">{link.type}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HiveRichTextEditor.displayName = "HiveRichTextEditor";

export { HiveRichTextEditor, hiveRichTextEditorVariants };