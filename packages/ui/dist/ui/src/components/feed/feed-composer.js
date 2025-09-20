"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Image, BarChart3, Calendar, Wrench, } from "lucide-react";
const POST_TYPE_CONFIG = {
    text: { icon: null, label: "Text", color: "default" },
    image: { icon: Image, label: "Image", color: "blue" },
    poll: { icon: BarChart3, label: "Poll", color: "green" },
    event: { icon: Calendar, label: "Event", color: "purple" },
    toolshare: { icon: Wrench, label: "Tool", color: "orange" },
};
export const FeedComposer = ({ spaceId, currentUser, onPostCreated, className, }) => {
    const [content, setContent] = useState("");
    const [postType, setPostType] = useState("text");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState("");
    const [mentionSuggestions, setMentionSuggestions] = useState([]);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);
    const composerRef = useRef(null);
    const CHAR_LIMIT = 500;
    const remainingChars = CHAR_LIMIT - content.length;
    // Auto-save draft to localStorage
    useEffect(() => {
        const draftKey = `hive-draft-${spaceId}`;
        if (content.trim()) {
            localStorage.setItem(draftKey, JSON.stringify({
                content,
                postType,
                timestamp: Date.now(),
            }));
        }
        else {
            localStorage.removeItem(draftKey);
        }
    }, [content, postType, spaceId]);
    // Load draft on mount
    useEffect(() => {
        const draftKey = `hive-draft-${spaceId}`;
        const savedDraft = localStorage.getItem(draftKey);
        if (savedDraft) {
            try {
                const draft = JSON.parse(savedDraft);
                // Only load if draft is less than 24 hours old
                if (Date.now() - draft.timestamp < 24 * 60 * 60 * 1000) {
                    setContent(draft.content || "");
                    setPostType(draft.postType || "text");
                }
            }
            catch (error) {
                console.error("Error loading draft:", error);
            }
        }
    }, [spaceId]);
    // Handle @mention detection
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea)
            return;
        const handleInput = () => {
            const cursorPos = textarea.selectionStart;
            const textBeforeCursor = content.slice(0, cursorPos);
            const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
            if (mentionMatch) {
                setMentionQuery(mentionMatch[1]);
                setShowMentions(true);
                setCursorPosition(cursorPos);
                // In a real app, fetch mention suggestions here
                // For now, we'll use mock data
                setMentionSuggestions([
                    { id: "1", handle: "alice", fullName: "Alice Johnson" },
                    { id: "2", handle: "bob", fullName: "Bob Smith" },
                    { id: "3", handle: "charlie", fullName: "Charlie Brown" },
                ].filter((user) => user.handle.toLowerCase().includes(mentionQuery.toLowerCase()) ||
                    user.fullName.toLowerCase().includes(mentionQuery.toLowerCase())));
            }
            else {
                setShowMentions(false);
                setMentionQuery("");
            }
        };
        textarea.addEventListener("input", handleInput);
        textarea.addEventListener("selectionchange", handleInput);
        return () => {
            textarea.removeEventListener("input", handleInput);
            textarea.removeEventListener("selectionchange", handleInput);
        };
    }, [content, mentionQuery]);
    const handleMentionSelect = (user) => {
        const textarea = textareaRef.current;
        if (!textarea)
            return;
        const beforeMention = content.slice(0, cursorPosition - mentionQuery.length - 1);
        const afterMention = content.slice(cursorPosition);
        const newContent = `${beforeMention}@${user.handle} ${afterMention}`;
        setContent(newContent);
        setShowMentions(false);
        setMentionQuery("");
        // Focus back to textarea
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = beforeMention.length + user.handle.length + 2;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Fire and forget the async operation with proper error handling
        void submitPost().catch((error) => {
            console.error("Error submitting post:", error);
            const errorMessage = error instanceof Error
                ? error.message
                : error?.error || "Failed to submit post";
            setError(errorMessage);
        });
    };
    const submitPost = async () => {
        if (!content.trim() || isSubmitting)
            return;
        setIsSubmitting(true);
        setError(null);
        try {
            const postData = {
                type: postType,
                content: content.trim(),
            };
            const response = await fetch(`/api/spaces/${spaceId}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
        }
        finally { }
        ;
        if (!response.ok) {
            const errorData = (await response.json());
            throw new Error(errorData.error || "Failed to create post");
        }
        const responseData = (await response.json());
        const { post } = responseData;
        // Clear form and draft
        setContent("");
        setPostType("text");
        localStorage.removeItem(`hive-draft-${spaceId}`);
        // Notify parent
        onPostCreated(post);
    };
    try { }
    catch (error) {
        console.error("Error creating post:", error);
        setError(error instanceof Error ? error.message : "Failed to create post");
    }
    finally {
        setIsSubmitting(false);
    }
};
const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit(e);
    }
    if (showMentions) {
        if (e.key === "Escape") {
            setShowMentions(false);
        }
        // Handle arrow keys and enter for mention selection
        // Implementation would go here for full keyboard navigation
    }
};
const canSubmit = content.trim().length > 0 && remainingChars >= 0 && !isSubmitting;
return (_jsxs(Card, { className: cn("sticky top-4 z-10 bg-background/95 backdrop-blur", className), ref: composerRef, children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "What's on your mind?" }) }), _jsx(CardContent, { className: "p-4", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "flex gap-3", children: [_jsxs(Avatar, { className: "h-10 w-10 flex-shrink-0", children: [_jsx(AvatarImage, { src: currentUser.photoURL, alt: currentUser.fullName }), _jsx(AvatarFallback, { children: currentUser.fullName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase() })] }), _jsxs("div", { className: "flex-1 space-y-3", children: [_jsx("div", { className: "flex gap-2 flex-wrap", children: Object.entries(POST_TYPE_CONFIG).map(([type, config]) => {
                                            const Icon = config.icon;
                                            const isSelected = postType === type;
                                            return (_jsxs(Button, { variant: isSelected ? "primary" : "outline", size: "sm", onClick: (e) => {
                                                    e.preventDefault();
                                                    setPostType(type);
                                                }, className: "h-7 text-xs", children: [Icon && _jsx(Icon, { className: "h-3 w-3 mr-1" }), config.label] }, type));
                                        }) }), _jsxs("div", { className: "relative", children: [_jsx(Textarea, { ref: textareaRef, value: content, onChange: (e) => setContent(e.target.value), onKeyDown: handleKeyDown, placeholder: `What's happening in this space?`, className: "min-h-20 resize-none border-0 p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0", maxLength: CHAR_LIMIT }), showMentions && mentionSuggestions.length > 0 && (_jsx(Card, { className: "absolute top-full left-0 right-0 mt-1 z-50 max-h-48 overflow-y-auto", children: _jsx(CardContent, { className: "p-2", children: mentionSuggestions.map((user) => (_jsxs("button", { onClick: (e) => {
                                                            e.preventDefault();
                                                            handleMentionSelect(user);
                                                        }, className: "w-full flex items-center gap-2 p-2 rounded hover:bg-muted text-left", children: [_jsxs(Avatar, { className: "h-6 w-6", children: [_jsx(AvatarImage, { src: user.photoURL, alt: user.fullName }), _jsx(AvatarFallback, { className: "text-xs", children: user.fullName
                                                                            .split(" ")
                                                                            .map((n) => n[0])
                                                                            .join("")
                                                                            .toUpperCase() })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-sm", children: user.fullName }), _jsxs("div", { className: "text-xs text-muted-foreground", children: ["@", user.handle] })] })] }, user.id))) }) }))] }), error && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), error] }))] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: cn("text-sm", remainingChars < 50
                                            ? "text-orange-500"
                                            : "text-muted-foreground", remainingChars < 0 ? "text-destructive" : ""), children: remainingChars }), content.trim() && (_jsx(Badge, { variant: "outline", className: "text-xs", children: "Draft saved" }))] }), _jsx(Button, { type: "submit", disabled: !canSubmit, size: "sm", className: "min-w-20", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Posting..."] })) : (_jsxs(_Fragment, { children: [_jsx(SendIcon, { className: "w-4 h-4 mr-2" }), "Post"] })) })] })] }) })] }));
;
//# sourceMappingURL=feed-composer.js.map