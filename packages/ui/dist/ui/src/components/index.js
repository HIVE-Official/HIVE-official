// === ATOMIC DESIGN SYSTEM (PRIMARY) ===
// Complete HIVE UI/UX foundation - atoms, molecules, organisms, templates
// These are the primary exports following HIVE design system
export * from '../atomic/index.js';
// === BRANDED HIVE COMPONENTS (STREAMLINED) ===
// Premium HIVE components - use atomic design system as primary foundation
export { HiveButton } from "./hive-button.js";
export { HivePremiumButton, HivePremiumButtonGroup, hivePremiumButtonVariants } from "./hive-button-premium.js";
export { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardFooter, hiveCardVariants } from "./hive-card.js";
export { HivePremiumCard, hivePremiumCardVariants, HivePostCard, HiveAnnouncementCard, HiveFeaturedCard, HiveGlassCard } from "./hive-card-premium.js";
export { HiveInput } from "./hive-input.js";
export { HiveTextarea } from "./hive-textarea.js";
export { HiveBadge } from "./hive-badge.js";
export { HiveTooltip, HiveTooltipContent, HiveTooltipProvider, HiveTooltipTrigger, HiveMotionTooltip, HiveHelpTooltip, HiveErrorTooltip, HiveSuccessTooltip, HiveGoldTooltip, HiveMinimalTooltip, hiveTooltipVariants } from "./hive-tooltip.js";
export { HiveSwitch } from "./hive-switch.js";
export { HiveSlider } from "./hive-slider.js";
// === BASE UI COMPONENTS (SHADCN/UI) ===
// Available with explicit naming to avoid atomic system conflicts
// NOTE: Button, Switch, Select moved to atomic enhanced system
// export { 
//   Button as ShadcnButton, 
//   buttonVariants as shadcnButtonVariants 
// } from "./ui/button.js";
export { Card as ShadcnCard, CardContent as ShadcnCardContent, CardDescription as ShadcnCardDescription, CardFooter as ShadcnCardFooter, CardHeader as ShadcnCardHeader, CardTitle as ShadcnCardTitle, cardVariants as shadcnCardVariants, 
// Also export without prefix for convenience
Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card.js";
// export { 
//   Input as ShadcnInput 
// } from "./ui/input.js";
export { Badge as ShadcnBadge, Badge } from "./ui/badge.js";
// export { 
//   Textarea as ShadcnTextarea 
// } from "./ui/textarea";
export * from "./ui/tabs.js";
export { Avatar as ShadcnAvatar, AvatarFallback as ShadcnAvatarFallback, AvatarImage as ShadcnAvatarImage } from "./ui/avatar.js";
export * from "./ui/dropdown-menu.js";
export * from "./ui/alert-dialog.js";
// export { 
//   Switch as ShadcnSwitch 
// } from "./ui/switch";
export * from "./ui/resizable.js";
export * from "./ui/scroll-area.js";
export { Alert as ShadcnAlert, AlertDescription as ShadcnAlertDescription, AlertTitle as ShadcnAlertTitle } from "./ui/alert.js";
// HIVE Logo System
export * from "./hive-logo.js";
export * from "./hive-logo-variants.js";
export * from "./hive-logo-patterns.js";
export * from "./hive-logo-responsive.js";
export * from "./hive-logo-production.js";
// HIVE Motion System
export * from "./hive-motion-wrapper.js";
export { HiveMagneticHover as MagneticHover, HiveLiquidRipple, HiveMagneticSnap, HiveMagneticTarget, HiveLiquidTransform } from "./hive-magnetic-interactions.js";
// Individual logo components for specific use cases (others exported from hive-logo-production)
export * from "./hive-logo-performance.js";
// Layout Components - using atomic design system versions to avoid conflicts
// export * from "./Grid.js"; // Using atomic version
// export * from "./Stack.js"; // Using atomic version
// export * from "./Box.js"; // Using atomic version
// Typography Components - using atomic design system versions to avoid conflicts
// export * from "./Typography.js"; // Using atomic version
// export { Heading, Text } from "./Typography.js"; // Using atomic version
// Animation Components
export * from "./framer-motion-proxy.js";
export * from "./hive-motion-wrapper.js";
// HIVE Space Components - using atomic design system as primary
// export * from "./hive-space-card"; // Conflicts with atomic/organisms/hive-space-card - using atomic version
// export * from "./hive-space-directory";
// export * from "./hive-space-layout.js";
// HIVE Spaces Organisms - production ready
export { CategoryGridOrganism, SPACE_CATEGORIES } from "./spaces/category-grid-organism.js";
export { HeroSearchOrganism } from "./spaces/hero-search-organism.js";
export { PersonalizationFeedOrganism } from "./spaces/personalization-feed-organism.js";
// HIVE UI Components
export * from "./hive-charts.js";
export * from "./hive-command-palette.js";
export * from "./hive-breadcrumbs.js";
export * from "./hive-menu.js";
export * from "./hive-modal.js";
export * from "./hive-coming-soon-modal.js";
export * from "./hive-sidebar.js";
export { HiveSelect, hiveSelectVariants } from "./hive-select.js";
export { HiveMultiSelect, hiveMultiSelectVariants } from "./hive-multi-select.js";
export * from "./hive-rich-text-editor.js";
export * from "./hive-course-card.js";
// HIVE Unified Card System
export * from "./card-system/index.js";
export * from "./hive-file-upload.js";
export * from "./hive-form.js";
export * from "./hive-table.js";
// Progress components - using atomic design system
export { Progress as HiveProgress, Progress, CircularProgress, LoadingProgress, SuccessProgress, ErrorProgress, CircularSpinner } from "../atomic/atoms/progress.js";
export * from "./hive-modular-card.js";
// export * from "./hive-icons.js"; // Commented out to avoid HiveLogo conflict with hive-logo
// Additional UI Components (shadcn/ui) - explicitly namespaced to avoid atomic conflicts
// export { 
//   Checkbox as ShadcnCheckbox 
// } from "./ui/checkbox.js";  // File does not exist
export { Label as ShadcnLabel } from "./ui/label.js";
export * from "./ui/popover.js";
// export * from "./ui/radio-group.js";  // File does not exist
// export { 
//   Separator as ShadcnSeparator 
// } from "./ui/separator";  // File does not exist
export { Skeleton as ShadcnSkeleton } from "./ui/skeleton.js";
export { Slider as BaseSlider } from "./ui/slider.js";
export * from "./ui/toast.js";
export { Tooltip as ShadcnTooltip, TooltipContent as ShadcnTooltipContent, TooltipProvider as ShadcnTooltipProvider, TooltipTrigger as ShadcnTooltipTrigger } from "./ui/tooltip.js";
// Surface Components - explicit exports to avoid conflicts
export { HivePinnedSurface, HivePostsSurface, HiveEventsSurface, HiveToolsSurface, HiveChatSurface, HiveMembersSurface, pinnedContentTypes, postTypes, eventTypes, rsvpStatuses, toolCategories, toolStatuses, messageTypes, messageStatuses, memberRoles, memberStatuses } from "./surfaces/index.js";
// Shell Components - essential ones exported
export { AppShell, EnhancedAppShell, NavigationHeader, NavigationSidebar, UserMenu, BreadcrumbNavigation, CommandPalette, NotificationCenter, ShellPageContainer, ShellProvider, useShell, NotificationProvider, useNotifications } from "./shell/index.js";
// Navigation System - New YC-Quality Navigation
export * from "../navigation/index.js";
// Notification System - temporarily disabled due to import errors
// export * from "./notifications/notification-system.js";
// State Management System - Social-First with Tool Permissions
export * from "./state/index.js";
// Responsive System - Mobile-First Breakpoint Strategy
export * from "./responsive/index.js";
// Authentication Components
export { HiveAuthFlow, AuthProvider } from "./auth/index.js";
// Onboarding Components
export { HiveOnboardingWizard, OnboardingProvider } from "./onboarding/index.js";
// Error Handling Components
export * from "./error-boundary.js";
// Core System Components
export * from "./theme-provider.js";
export * from "./waitlist-form.js";
// Legacy Components (now consolidated)
// Creator Components - HIVE Tool Builder System - temporarily disabled due to TypeScript errors
// export {
//   VisualToolBuilder,
//   TemplateToolBuilder,
//   WizardToolBuilder,
//   ElementPicker,
//   ElementConfig,
//   ToolPreview,
//   createEmptyTool,
//   createElementInstance,
//   createDeploymentOptions,
//   validateTool,
//   getBuilderComponent,
//   HiveCreators,
//   ELEMENT_CATEGORIES,
//   HIVE_CREATORS_VERSION,
//   SUPPORTED_BUILDER_MODES,
//   CREATOR_FEATURES
// } from "./creators";
// Creator Types - temporarily disabled due to TypeScript errors
// export type {
//   Element as CreatorElement,
//   ElementInstance as CreatorElementInstance,
//   Tool as CreatorTool,
//   ToolTemplate,
//   BuilderMode,
//   DeploymentOptions,
//   VisualBuilderProps,
//   TemplateBuilderProps,
//   WizardBuilderProps,
//   ElementPickerProps,
//   ElementConfigProps,
//   ToolPreviewProps,
//   ElementCategory,
//   ToolCategory,
//   ToolConfig,
//   ToolMetadata,
//   HiveElement,
//   HiveElementInstance,
//   HiveTool,
//   HiveToolTemplate,
//   HiveBuilderMode,
//   HiveDeploymentOptions
// } from "./creators";
// Tool Builder Components - Complete runtime system
export { LiveToolRuntime } from "./live-tool-runtime.js";
// Element Renderers - Core tool execution components
export { TextInputRenderer } from "./elements/text-input-renderer.js";
export { ButtonRenderer } from "./elements/button-renderer.js";
export { TextBlockRenderer } from "./elements/text-block-renderer.js";
export { ImageBlockRenderer } from "./elements/image-block-renderer.js";
export { DividerRenderer } from "./elements/divider-renderer.js";
export { StackRenderer } from "./elements/stack-renderer.js";
export { ChoiceSelectRenderer } from "./elements/choice-select-renderer.js";
export { RatingStarsRenderer } from "./elements/rating-stars-renderer.js";
export { CountdownTimerRenderer } from "./elements/countdown-timer-renderer.js";
export { ProgressBarRenderer } from "./elements/progress-bar-renderer.js";
// HiveLab - Visual Tool Builder System
export { VisualToolBuilder } from "./hivelab/visual-tool-builder.js";
export { ElementConfigPanel } from "./hivelab/element-config-panel.js";
// Community Tools System - Community integration and permissions
export { SpaceToolDeployment } from "./community/space-tool-deployment.js";
export { CommunityToolBrowser } from "./community/community-tool-browser.js";
export { ToolPermissionsManager } from "./community/tool-permissions-manager.js";
export { ToolUsageTracker } from "./community/tool-usage-tracker.js";
// Legacy components (temporarily disabled for atomic deployment)
// export { ElementRuntimeRenderer } from "./creator/ToolBuilder/element-runtime-renderer"; // Temporarily disabled for atomic deployment
// export { ElementStateManager, useElementState, useElementInstanceState, useConditionalLogic } from "./creator/ToolBuilder/element-state-manager"; // Temporarily disabled for atomic deployment
// export { SimpleToolDemo } from "./creator/ToolBuilder/simple-tool-demo"; // Temporarily disabled for atomic deployment
// export { ElementPropertiesPanel } from "./creator/ToolBuilder/element-properties-panel"; // Disabled - has missing dependencies
// Welcome Components  
export * from "./welcome/index.js";
// Individual welcome components for specific use cases
export { SchoolSearchInput } from "./welcome/school-search-input.js";
export { WelcomeCard } from "./welcome/welcome-card.js";
// Feed Components - temporarily disabled due to import errors
// export * from "./feed";
// Analytics Components - temporarily disabled due to import errors  
// export * from "./analytics-dashboard/index.js";
// Dashboard Components - temporarily disabled due to import errors
// export * from "./dashboard/index.js";
// Profile Components - some temporarily disabled due to import errors
export { ProfileSystem, 
// EnhancedProfileSystem, // temporarily disabled
// UniversalProfileSystem, // temporarily disabled
ProfileHeader, MySpacesFeed, SmartCalendar, CampusConnections, HiveLabSection, ProfileStats, CalendarCard, adaptSmartCalendarProps } from "./profile/index.js";
// Complete HIVE Profile System - Production Integration
export { CompleteHIVEProfileSystem } from "./profile/complete-hive-profile-system.js";
// Enhanced Profile Tools Card
// export { EnhancedProfileToolsCard } from "./profile/enhanced-profile-tools-card"; // Temporarily disabled for atomic deployment
// export type { ProfileToolInstallation, ProfileToolsData } from "./profile/enhanced-profile-tools-card"; // Temporarily disabled for atomic deployment
// HIVE Tools System - Complete vBETA Production System
export { ToolRuntimeEngine, createSampleTool } from "./tools/tool-runtime-engine.js";
// HIVE Tools & Widgets - Professional tools wrapped in social interfaces
export { MemberDirectoryTool } from "./tools/member-directory-tool.js";
export { MemberDirectoryWidget } from "./widgets/member-directory-widget.js";
export { EventManagerTool } from "./tools/event-manager-tool.js";
export { EventManagerWidget } from "./widgets/event-manager-widget.js";
export { ToolMarketplace } from "./tools/tool-marketplace.js";
export { SpaceToolsTab } from "./tools/space-tools-tab.js";
export { MobileToolWrapper } from "./tools/mobile-tool-wrapper.js";
export { PerformanceMonitor, VirtualScroll, LazyComponent, DebouncedInput, OptimizedImage, usePerformanceMonitor, useToolCache, memoize, ToolCache } from "./tools/performance-optimizer.js";
export { HiveLabIntegration } from "./tools/hive-lab-integration.js";
// Tools Dual Interface System - Interface (utility) vs Surface (informational)
export { ToolDualInterfaceSystem, PollDualInterface } from "./tools/index.js";
// Spaces with Library Integration
export { SpaceToolGridWithLibrary } from "./spaces/space-tool-grid-with-library.js";
// Complete HIVE Spaces System - Production Integration
export { CompleteHIVESpacesSystem } from "./spaces/complete-hive-spaces-system.js";
// Complete HIVE Tools System - Production Integration
export { CompleteHIVEToolsSystem } from "./tools/complete-hive-tools-system.js";
// Event System - Complete 24-Element Library
export { EventSystemDashboard } from "./events/event-system-dashboard.js";
export { TextInputElement, DatePickerElement, LocationElement, SelectElement, NumberInputElement, CheckboxElement, RadioElement, EventCardElement, CounterElement, QRCodeElement, RSVPElement, ConditionalElement, FilterElement, AttendeeListElement, CalendarViewElement, NotificationElement, AnalyticsChartElement, FeedbackFormElement, ShareElement, RecurrenceElement, TagsElement, StatusElement } from "./events/event-elements.js";
// HIVE Event Management Tools - Production ready
export { RSVPManagerTool } from "./events/rsvp-manager-tool.js";
export { EventCheckinTool } from "./events/event-checkin-tool.js";
export { EventFeedbackTool } from "./events/event-feedback-tool.js";
// HiveLAB Components - Element Discovery & Interactive Playground
export { ElementBrowser, InteractivePlayground } from "./hivelab/index.js";
// Library System - Contextual Tool Discovery
// Temporarily commented out due to missing dependencies
// export { 
//   LibraryContextualAccess,
//   PlantNewToolButton
// } from "./library/index.js";
//# sourceMappingURL=index.js.map