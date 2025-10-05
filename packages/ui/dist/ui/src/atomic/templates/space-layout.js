"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { MotionDiv, AnimatePresence } from "../../shells/motion-safe.js";
import { transitions } from "../../lib/animations/index.js";
import { X, Users, Calendar as CalendarIcon, FileText, Info, Wrench } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "../atoms/button.js";
import { Badge } from "../atoms/badge.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../atoms/dialog.js";
import { SpacePostFeed } from "../organisms/space-post-feed.js";
import { SpaceAboutSection } from "../organisms/space-about-section.js";
import { SpaceResourcesPanel } from "../organisms/space-resources-panel.js";
import { SpaceMembersPanel } from "../organisms/space-members-panel.js";
import { EventsCalendar } from "../organisms/events-calendar.js";
import { InlineToolsWidget } from "../molecules/index.js";
const SpaceLayout = React.forwardRef(({ className, space, posts = [], hotThreads = [], events = [], resources = [], members = [], contextPanel, onContextPanelChange, isLoadingPosts = false, isLoadingEvents = false, isLoadingResources = false, isLoadingMembers = false, hasMorePosts = false, layoutMode = "sidebar", onAction, 
// Legacy handlers
onCreatePost, onPostClick, onLikePost, onCommentPost, onSharePost, onLoadMore, onEditDescription, onEditRules, onCreateEvent, onEventClick, onRSVP, onAddResource, onResourceClick, onInviteMembers, onViewAllMembers, onMemberClick, ...props }, ref) => {
    // Destructure space data with safe defaults
    const userContext = space.userContext ?? { isJoined: false, isLeader: false, unreadCount: 0 };
    const stats = space.stats ?? { memberCount: 0, postCount: 0, eventCount: 0, activeToday: 0 };
    const { isJoined, isLeader } = userContext;
    const [openModal, setOpenModal] = React.useState(null);
    // Inline tool form state
    const [activeToolForm, setActiveToolForm] = React.useState(null);
    // Internal state (fallback if not controlled)
    const [internalContextOpen, setInternalContextOpen] = React.useState(false);
    const [internalSelectedPostId, setInternalSelectedPostId] = React.useState(null);
    // Use controlled state if provided, otherwise use internal state
    const contextOpen = contextPanel?.isOpen ?? internalContextOpen;
    const selectedPostId = contextPanel?.postId ?? internalSelectedPostId;
    const selectedPost = posts.find(p => p.id === selectedPostId);
    // Context panel controls
    const openContext = React.useCallback((postId) => {
        if (onContextPanelChange) {
            onContextPanelChange({ isOpen: true, postId });
        }
        else {
            setInternalContextOpen(true);
            setInternalSelectedPostId(postId);
        }
    }, [onContextPanelChange]);
    const closeContext = React.useCallback(() => {
        if (onContextPanelChange) {
            onContextPanelChange({ isOpen: false });
        }
        else {
            setInternalContextOpen(false);
            setTimeout(() => setInternalSelectedPostId(null), 300);
        }
    }, [onContextPanelChange]);
    // Central action router - forwards all actions to parent and organisms
    const handleAction = React.useCallback((action) => {
        // Handle inline tool actions
        if (action.type === "tool.event.create") {
            setActiveToolForm("event");
            return;
        }
        if (action.type === "tool.poll.create") {
            setActiveToolForm("poll");
            return;
        }
        if (action.type === "tool.task.create") {
            setActiveToolForm("task");
            return;
        }
        if (action.type === "tool.resource.upload") {
            setActiveToolForm("resource");
            return;
        }
        // Route to legacy handlers first (backward compatibility)
        switch (action.type) {
            case "post.create":
                onCreatePost?.(action.content);
                break;
            case "post.click":
                const post = posts.find(p => p.id === action.postId);
                if (post) {
                    openContext(action.postId);
                    onPostClick?.(post);
                }
                break;
            case "post.like":
                onLikePost?.(action.postId);
                break;
            case "post.unlike":
                onLikePost?.(action.postId); // Legacy doesn't distinguish
                break;
            case "post.comment":
                onCommentPost?.(action.postId);
                break;
            case "post.share":
                onSharePost?.(action.postId);
                break;
            case "feed.loadMore":
                onLoadMore?.();
                break;
            case "description.edit":
                onEditDescription?.();
                break;
            case "rules.edit":
                onEditRules?.();
                break;
            case "event.create":
                onCreateEvent?.();
                break;
            case "event.click":
                const event = events.find(e => e.id === action.eventId);
                if (event)
                    onEventClick?.(event);
                break;
            case "event.rsvp":
                onRSVP?.(action.eventId, action.attending);
                break;
            case "resource.add":
                onAddResource?.();
                break;
            case "resource.click":
                const resource = resources.find(r => r.id === action.resourceId);
                if (resource)
                    onResourceClick?.(resource);
                break;
            case "member.invite":
                onInviteMembers?.();
                break;
            case "member.viewAll":
                onViewAllMembers?.();
                break;
            case "member.click":
                const member = members.find(m => m.userId === action.memberId);
                if (member)
                    onMemberClick?.(member);
                break;
        }
        // Forward to parent's action handler
        onAction?.(action);
    }, [
        posts, events, resources, members,
        openContext, onAction,
        onCreatePost, onPostClick, onLikePost, onCommentPost, onSharePost, onLoadMore,
        onEditDescription, onEditRules, onCreateEvent, onEventClick, onRSVP,
        onAddResource, onResourceClick, onInviteMembers, onViewAllMembers, onMemberClick
    ]);
    // Sidebar content (40% width) - Widget previews that open modals for full view
    const sidebarContent = (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20", children: [_jsx("div", { className: "p-4 border-b border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4 text-white/70" }), _jsx("h3", { className: "text-sm font-semibold text-white", children: "Members" })] }), _jsx(Badge, { variant: "sophomore", className: "text-xs", children: stats.memberCount })] }) }), _jsxs("div", { className: "p-4", children: [members.slice(0, 3).length > 0 ? (_jsx("div", { className: "space-y-2 mb-3", children: members.slice(0, 3).map((member) => (_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] font-semibold text-[10px]", children: member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() }), _jsx("span", { className: "text-white/80 truncate flex-1", children: member.name }), member.isOnline && (_jsx("div", { className: "h-2 w-2 rounded-full bg-green-500" }))] }, member.userId))) })) : (_jsx("p", { className: "text-xs text-white/50 mb-3", children: "No members yet" })), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setOpenModal("members"), className: "w-full text-xs", children: "View All" })] })] }), _jsxs("div", { className: "rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20", children: [_jsx("div", { className: "p-4 border-b border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CalendarIcon, { className: "h-4 w-4 text-white/70" }), _jsx("h3", { className: "text-sm font-semibold text-white", children: "Events" })] }), events.length > 0 && (_jsx(Badge, { variant: "freshman", className: "text-xs bg-[#FFD700] text-black", children: events.length }))] }) }), _jsxs("div", { className: "p-4", children: [events.slice(0, 3).length > 0 ? (_jsx("div", { className: "space-y-3 mb-3", children: events.slice(0, 3).map((event) => (_jsxs("div", { className: "text-xs", children: [_jsx("p", { className: "font-medium text-white line-clamp-1", children: event.title }), _jsx("p", { className: "text-white/50 text-[10px] mt-0.5", children: event.timeDisplay || "Time TBD" })] }, event.id))) })) : (_jsx("p", { className: "text-xs text-white/50 mb-3", children: "No upcoming events" })), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setOpenModal("events"), className: "w-full text-xs", children: "View Calendar" })] })] }), _jsxs("div", { className: "rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20", children: [_jsx("div", { className: "p-4 border-b border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Wrench, { className: "h-4 w-4 text-white/70" }), _jsx("h3", { className: "text-sm font-semibold text-white", children: "Quick Tools" })] }), _jsx(Badge, { variant: "freshman", className: "text-xs bg-[#FFD700] text-black", children: "4" })] }) }), _jsx("div", { className: "p-4", children: _jsx(InlineToolsWidget, { isLeader: isLeader, isNewMember: false, onCreateEvent: () => handleAction({ type: "tool.event.create" }), onCreatePoll: () => handleAction({ type: "tool.poll.create" }), onCreateTask: () => handleAction({ type: "tool.task.create" }), onUploadResource: () => handleAction({ type: "tool.resource.upload" }) }) })] }), (resources.length > 0 || isLeader) && (_jsxs("div", { className: "rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20", children: [_jsx("div", { className: "p-4 border-b border-white/8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-4 w-4 text-white/70" }), _jsx("h3", { className: "text-sm font-semibold text-white", children: "Resources" })] }), _jsx(Badge, { variant: "sophomore", className: "text-xs", children: resources.length })] }) }), _jsxs("div", { className: "p-4", children: [resources.slice(0, 3).length > 0 ? (_jsx("div", { className: "space-y-2 mb-3", children: resources.slice(0, 3).map((resource) => (_jsx("div", { className: "text-xs", children: _jsx("p", { className: "font-medium text-white line-clamp-1", children: resource.title }) }, resource.id))) })) : (_jsx("p", { className: "text-xs text-white/50 mb-3", children: "No resources yet" })), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setOpenModal("resources"), className: "w-full text-xs", children: "View All" })] })] })), _jsxs("div", { className: "rounded-lg border border-white/8 bg-[#0c0c0c] overflow-hidden transition-all duration-[400ms] hover:border-white/20", children: [_jsx("div", { className: "p-4 border-b border-white/8", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Info, { className: "h-4 w-4 text-white/70" }), _jsx("h3", { className: "text-sm font-semibold text-white", children: "About" })] }) }), _jsxs("div", { className: "p-4", children: [_jsx("p", { className: "text-xs text-white/70 line-clamp-2 mb-3", children: space.description }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setOpenModal("about"), className: "w-full text-xs", children: "View Details" })] })] })] }));
    // Context panel content (Thread/Post detail view)
    const contextContent = selectedPost && (_jsxs("div", { className: "h-full flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-white/8", children: [_jsx("h3", { className: "text-lg font-semibold tracking-tight leading-tight", children: "Thread" }), _jsx(Button, { variant: "ghost", size: "icon", onClick: closeContext, className: "h-8 w-8", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [_jsx("div", { className: "mb-6 pb-6 border-b border-white/8", children: _jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10", children: selectedPost.author.avatar ? (_jsx("img", { src: selectedPost.author.avatar, alt: selectedPost.author.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold", children: selectedPost.author.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)
                                            .toUpperCase() })) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-baseline gap-2 mb-1", children: [_jsx("span", { className: "text-sm font-semibold text-white", children: selectedPost.author.name }), _jsx("span", { className: "text-xs text-white/70", children: new Intl.DateTimeFormat("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                    }).format(selectedPost.createdAt) })] }), _jsx("div", { className: "text-sm text-white leading-normal whitespace-pre-wrap", children: selectedPost.content })] })] }) }), _jsx("div", { className: "text-center py-8 text-sm text-white/70", children: "Comments coming soon..." })] })] }));
    if (layoutMode === "fullwidth") {
        // Full-width mode with sliding context panel (Discord-style)
        return (_jsxs("div", { ref: ref, className: cn("relative w-full h-full flex", className), ...props, children: [_jsx(MotionDiv, { className: "flex-1 min-w-0", animate: {
                        marginRight: contextOpen ? 400 : 0,
                    }, transition: transitions.slow, children: hotThreads && hotThreads.length > 0 ? (_jsxs(Tabs, { defaultValue: "feed", className: "w-full", children: [_jsxs(TabsList, { className: "mb-4 w-full justify-start overflow-x-auto border-b border-white/8 bg-transparent", children: [_jsx(TabsTrigger, { value: "feed", className: "data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]", children: "Feed" }), hotThreads.slice(0, 5).map((thread) => (_jsxs(TabsTrigger, { value: thread.id, className: "data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]", children: [_jsx("span", { className: "truncate max-w-[120px]", children: thread.title }), _jsx(Badge, { variant: "sophomore", className: "ml-2 text-xs", children: thread.replyCount })] }, thread.id)))] }), _jsx(TabsContent, { value: "feed", className: "mt-0", children: _jsx(SpacePostFeed, { posts: posts, canPost: isJoined, showComposer: isJoined, hasMore: hasMorePosts, isLoading: isLoadingPosts, onAction: handleAction }) }), hotThreads.map((thread) => (_jsx(TabsContent, { value: thread.id, className: "mt-0", children: _jsx(SpacePostFeed, { posts: thread.posts, canPost: isJoined, showComposer: false, hasMore: false, isLoading: false, onAction: handleAction }) }, thread.id)))] })) : (_jsx(SpacePostFeed, { posts: posts, canPost: isJoined, showComposer: isJoined, hasMore: hasMorePosts, isLoading: isLoadingPosts, onAction: handleAction })) }), _jsx(AnimatePresence, { children: contextOpen && (_jsx(MotionDiv, { initial: { x: 400, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: 400, opacity: 0 }, transition: transitions.slow, className: "absolute right-0 top-0 h-full w-[400px] border-l border-white/8 bg-[#0c0c0c] shadow-lg", children: contextContent })) })] }));
    }
    // Sidebar mode - Traditional 60/40 split with sticky sidebar
    return (_jsxs("div", { ref: ref, className: cn("flex gap-6 w-full max-w-7xl mx-auto p-6", "flex-col lg:flex-row", className), ...props, children: [_jsx("div", { className: "flex-[6] min-w-0", children: hotThreads && hotThreads.length > 0 ? (_jsxs(Tabs, { defaultValue: "feed", className: "w-full", children: [_jsxs(TabsList, { className: "mb-4 w-full justify-start overflow-x-auto border-b border-white/8 bg-transparent", children: [_jsx(TabsTrigger, { value: "feed", className: "data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]", children: "Feed" }), hotThreads.slice(0, 5).map((thread) => (_jsxs(TabsTrigger, { value: thread.id, className: "data-[state=active]:border-b-2 data-[state=active]:border-[#FFD700]", children: [_jsx("span", { className: "truncate max-w-[120px]", children: thread.title }), _jsx(Badge, { variant: "sophomore", className: "ml-2 text-xs", children: thread.replyCount })] }, thread.id)))] }), _jsx(TabsContent, { value: "feed", className: "mt-0", children: _jsx(SpacePostFeed, { posts: posts, canPost: isJoined, showComposer: isJoined, hasMore: hasMorePosts, isLoading: isLoadingPosts, onAction: handleAction }) }), hotThreads.map((thread) => (_jsx(TabsContent, { value: thread.id, className: "mt-0", children: _jsx(SpacePostFeed, { posts: thread.posts, canPost: isJoined, showComposer: false, hasMore: false, isLoading: false, onAction: handleAction }) }, thread.id)))] })) : (_jsx(SpacePostFeed, { posts: posts, canPost: isJoined, showComposer: isJoined, hasMore: hasMorePosts, isLoading: isLoadingPosts, onAction: handleAction })) }), _jsx("div", { className: "flex-[4] space-y-4 min-w-0 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto", children: sidebarContent }), _jsx(AnimatePresence, { children: contextOpen && (_jsxs(_Fragment, { children: [_jsx(MotionDiv, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: closeContext, className: "fixed inset-0 bg-[#0c0c0c]/80 backdrop-blur-sm z-40 lg:hidden" }), _jsx(MotionDiv, { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" }, transition: transitions.slow, className: "fixed right-0 top-0 h-full w-full max-w-md border-l border-white/8 bg-[#0c0c0c] shadow-2xl z-50 lg:hidden", children: contextContent })] })) }), _jsx(Dialog, { open: openModal === "events", onOpenChange: (open) => !open && setOpenModal(null), children: _jsxs(DialogContent, { className: "max-w-6xl h-[90vh] p-6", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-2xl font-bold", children: "Events Calendar" }) }), _jsx("div", { className: "h-full overflow-y-auto", children: _jsx(EventsCalendar, { events: events.map(event => ({
                                    id: event.id,
                                    title: event.title,
                                    dateTime: {
                                        start: event.startDate,
                                        end: event.endDate,
                                        display: event.timeDisplay || "Time TBD"
                                    },
                                    location: {
                                        name: event.location || "Location TBD",
                                        type: event.locationType || "on-campus"
                                    },
                                    space: {
                                        name: space.name,
                                        id: space.id
                                    },
                                    attendees: {
                                        count: event.attendeeCount || 0
                                    },
                                    rsvp: {
                                        status: event.userRSVP
                                            ? (event.userRSVP === 'attending' ? 'going' :
                                                event.userRSVP === 'maybe' ? 'interested' : 'not-going')
                                            : null
                                    },
                                    category: (event.category || 'social'),
                                    campusContext: event.campusContext
                                })), onEventClick: (eventId) => {
                                    handleAction({ type: "event.click", eventId });
                                }, onRsvp: (eventId, status) => {
                                    handleAction({ type: "event.rsvp", eventId, attending: status === "going" });
                                } }) })] }) }), _jsx(Dialog, { open: openModal === "members", onOpenChange: (open) => !open && setOpenModal(null), children: _jsxs(DialogContent, { className: "max-w-4xl h-[80vh] p-6", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-2xl font-bold", children: "Members" }) }), _jsx("div", { className: "h-full overflow-y-auto", children: _jsx(SpaceMembersPanel, { members: members, totalMemberCount: stats.memberCount, canInvite: isLeader, previewLimit: 50, isLoading: isLoadingMembers, onAction: handleAction }) })] }) }), _jsx(Dialog, { open: openModal === "resources", onOpenChange: (open) => !open && setOpenModal(null), children: _jsxs(DialogContent, { className: "max-w-4xl h-[80vh] p-6", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-2xl font-bold", children: "Resources" }) }), _jsx("div", { className: "h-full overflow-y-auto", children: _jsx(SpaceResourcesPanel, { resources: resources, canAddResources: isLeader, alwaysShowAddButton: isLeader, isLoading: isLoadingResources }) })] }) }), _jsx(Dialog, { open: openModal === "about", onOpenChange: (open) => !open && setOpenModal(null), children: _jsxs(DialogContent, { className: "max-w-3xl h-[80vh] p-6", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "text-2xl font-bold", children: ["About ", space.name] }) }), _jsx("div", { className: "h-full overflow-y-auto", children: _jsx(SpaceAboutSection, { description: space.description, tags: space.tags, category: space.category, type: space.spaceType, memberCount: stats.memberCount, postCount: stats.postCount, eventCount: stats.eventCount, createdAt: space.createdAt, createdBy: space.creator, rules: space.rules, isLeader: isLeader }) })] }) }), _jsx(Dialog, { open: openModal === "tools", onOpenChange: (open) => !open && setOpenModal(null), children: _jsxs(DialogContent, { className: "max-w-4xl h-[80vh] p-6", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-2xl font-bold", children: "Space Tools" }) }), _jsx("div", { className: "h-full flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx(Wrench, { className: "h-16 w-16 mx-auto text-white/30" }), _jsx("h3", { className: "text-xl font-semibold text-white", children: "HiveLab Tools Coming Soon" }), _jsx("p", { className: "text-sm text-white/70 max-w-md", children: "Space leaders will be able to create custom tools for their communities using HiveLab's no-code builder." })] }) })] }) })] }));
});
SpaceLayout.displayName = "SpaceLayout";
export { SpaceLayout };
//# sourceMappingURL=space-layout.js.map