"use strict";
// ==========================================================================
// HIVE DESIGN SYSTEM - BRANDED COMPONENTS (Primary Exports)
// ==========================================================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleVariants = exports.ModularCard = exports.HiveLineChart = exports.HiveDonutChart = exports.HiveBarChart = exports.HiveIcons = exports.HiveForm = exports.HiveTable = exports.HiveSidebar = exports.HiveMenu = exports.HiveBreadcrumbs = exports.builderCategories = exports.useHiveCommandPalette = exports.HiveCommandPalette = exports.HiveStepProgress = exports.HiveCircularProgress = exports.HiveProgressBar = exports.HiveFileUpload = exports.HiveSelect = exports.HiveModal = exports.HiveBadge = exports.hiveInputVariants = exports.HivePasswordInput = exports.HiveSearchInput = exports.HiveSpaceNameInput = exports.HiveToolNameInput = exports.InputAdvanced = exports.Input = exports.HiveInput = exports.CardFooter = exports.HiveCardFooter = exports.CardContent = exports.HiveCardContent = exports.CardDescription = exports.HiveCardDescription = exports.CardTitle = exports.HiveCardTitle = exports.CardHeader = exports.HiveCardHeader = exports.cardVariants = exports.hiveCardVariants = exports.Card = exports.HiveCard = exports.buttonVariants = exports.hiveButtonVariants = exports.Button = exports.HiveButton = exports.Grid = exports.Stack = exports.Box = void 0;
exports.useWelcomeMat = exports.WelcomeMat = exports.HiveSpaceDirectory = exports.HiveSpaceCard = exports.getElementConfigSchema = exports.getAllElementConfigSchemas = exports.ElementLibrary = exports.DesignCanvas = exports.ToolBuilder = exports.ElementCard = exports.ElementPicker = exports.WaitlistForm = exports.Text = exports.Muted = exports.Heading = exports.useHiveLogoConfig = exports.HiveLogoProvider = exports.HiveLogoEnterprise = exports.HiveLogoAccessibilityTest = exports.HiveLogoAccessible = exports.HiveLogoHighPerformance = exports.HiveLogoApp = exports.HiveLogoUserStatus = exports.HiveLogoLoading = exports.HiveLogoThemeAdaptive = exports.HiveLogofavicon = exports.HiveLogoNavigation = exports.HiveLogoResponsive = exports.HiveLogoContextual = exports.HiveLogoProgress = exports.HiveLogoParticles = exports.HiveLogoHolographic = exports.HiveLogoNeon = exports.HiveLogoGlass = exports.HiveMonogram = exports.HiveLogoOutlined = exports.HiveGlyphSimple = exports.HiveLogoAssembly = exports.HiveLogoPulse = exports.HiveLogoSpinner = exports.HiveLogoAnimated = exports.HiveLogoInteractive = exports.HiveLogo = exports.ModularGrid = exports.ModularStack = exports.ActionModule = exports.AccentModule = exports.FooterModule = exports.ContentModule = exports.HeaderModule = void 0;
exports.ResizablePanelGroup = exports.ResizablePanel = exports.ResizableHandle = exports.ScrollArea = exports.TabsContent = exports.TabsTrigger = exports.TabsList = exports.Tabs = exports.AvatarFallback = exports.AvatarImage = exports.Avatar = exports.Switch = exports.Textarea = exports.Label = exports.AlertDescription = exports.AlertTitle = exports.Alert = exports.Badge = exports.ThemeProvider = void 0;
// Layout Components
var Box_1 = require("./src/components/Box");
Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return Box_1.Box; } });
var Stack_1 = require("./src/components/Stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return Stack_1.Stack; } });
var Grid_1 = require("./src/components/Grid");
Object.defineProperty(exports, "Grid", { enumerable: true, get: function () { return Grid_1.Grid; } });
// HIVE Core Components  
var hive_button_1 = require("./src/components/hive-button");
Object.defineProperty(exports, "HiveButton", { enumerable: true, get: function () { return hive_button_1.HiveButton; } });
Object.defineProperty(exports, "Button", { enumerable: true, get: function () { return hive_button_1.Button; } });
Object.defineProperty(exports, "hiveButtonVariants", { enumerable: true, get: function () { return hive_button_1.hiveButtonVariants; } });
Object.defineProperty(exports, "buttonVariants", { enumerable: true, get: function () { return hive_button_1.buttonVariants; } });
var hive_card_1 = require("./src/components/hive-card");
Object.defineProperty(exports, "HiveCard", { enumerable: true, get: function () { return hive_card_1.HiveCard; } });
Object.defineProperty(exports, "Card", { enumerable: true, get: function () { return hive_card_1.Card; } });
Object.defineProperty(exports, "hiveCardVariants", { enumerable: true, get: function () { return hive_card_1.hiveCardVariants; } });
Object.defineProperty(exports, "cardVariants", { enumerable: true, get: function () { return hive_card_1.cardVariants; } });
Object.defineProperty(exports, "HiveCardHeader", { enumerable: true, get: function () { return hive_card_1.HiveCardHeader; } });
Object.defineProperty(exports, "CardHeader", { enumerable: true, get: function () { return hive_card_1.CardHeader; } });
Object.defineProperty(exports, "HiveCardTitle", { enumerable: true, get: function () { return hive_card_1.HiveCardTitle; } });
Object.defineProperty(exports, "CardTitle", { enumerable: true, get: function () { return hive_card_1.CardTitle; } });
Object.defineProperty(exports, "HiveCardDescription", { enumerable: true, get: function () { return hive_card_1.HiveCardDescription; } });
Object.defineProperty(exports, "CardDescription", { enumerable: true, get: function () { return hive_card_1.CardDescription; } });
Object.defineProperty(exports, "HiveCardContent", { enumerable: true, get: function () { return hive_card_1.HiveCardContent; } });
Object.defineProperty(exports, "CardContent", { enumerable: true, get: function () { return hive_card_1.CardContent; } });
Object.defineProperty(exports, "HiveCardFooter", { enumerable: true, get: function () { return hive_card_1.HiveCardFooter; } });
Object.defineProperty(exports, "CardFooter", { enumerable: true, get: function () { return hive_card_1.CardFooter; } });
var hive_input_1 = require("./src/components/hive-input");
Object.defineProperty(exports, "HiveInput", { enumerable: true, get: function () { return hive_input_1.HiveInput; } });
Object.defineProperty(exports, "Input", { enumerable: true, get: function () { return hive_input_1.Input; } });
Object.defineProperty(exports, "InputAdvanced", { enumerable: true, get: function () { return hive_input_1.InputAdvanced; } });
Object.defineProperty(exports, "HiveToolNameInput", { enumerable: true, get: function () { return hive_input_1.HiveToolNameInput; } });
Object.defineProperty(exports, "HiveSpaceNameInput", { enumerable: true, get: function () { return hive_input_1.HiveSpaceNameInput; } });
Object.defineProperty(exports, "HiveSearchInput", { enumerable: true, get: function () { return hive_input_1.HiveSearchInput; } });
Object.defineProperty(exports, "HivePasswordInput", { enumerable: true, get: function () { return hive_input_1.HivePasswordInput; } });
Object.defineProperty(exports, "hiveInputVariants", { enumerable: true, get: function () { return hive_input_1.hiveInputVariants; } });
var hive_badge_1 = require("./src/components/hive-badge");
Object.defineProperty(exports, "HiveBadge", { enumerable: true, get: function () { return hive_badge_1.HiveBadge; } });
var hive_modal_1 = require("./src/components/hive-modal");
Object.defineProperty(exports, "HiveModal", { enumerable: true, get: function () { return hive_modal_1.HiveModal; } });
var hive_select_1 = require("./src/components/hive-select");
Object.defineProperty(exports, "HiveSelect", { enumerable: true, get: function () { return hive_select_1.HiveSelect; } });
var hive_file_upload_1 = require("./src/components/hive-file-upload");
Object.defineProperty(exports, "HiveFileUpload", { enumerable: true, get: function () { return hive_file_upload_1.HiveFileUpload; } });
var hive_progress_1 = require("./src/components/hive-progress");
Object.defineProperty(exports, "HiveProgressBar", { enumerable: true, get: function () { return hive_progress_1.HiveProgressBar; } });
Object.defineProperty(exports, "HiveCircularProgress", { enumerable: true, get: function () { return hive_progress_1.HiveCircularProgress; } });
Object.defineProperty(exports, "HiveStepProgress", { enumerable: true, get: function () { return hive_progress_1.HiveStepProgress; } });
var hive_command_palette_1 = require("./src/components/hive-command-palette");
Object.defineProperty(exports, "HiveCommandPalette", { enumerable: true, get: function () { return hive_command_palette_1.HiveCommandPalette; } });
Object.defineProperty(exports, "useHiveCommandPalette", { enumerable: true, get: function () { return hive_command_palette_1.useHiveCommandPalette; } });
Object.defineProperty(exports, "builderCategories", { enumerable: true, get: function () { return hive_command_palette_1.builderCategories; } });
var hive_breadcrumbs_1 = require("./src/components/hive-breadcrumbs");
Object.defineProperty(exports, "HiveBreadcrumbs", { enumerable: true, get: function () { return hive_breadcrumbs_1.HiveBreadcrumbs; } });
var hive_menu_1 = require("./src/components/hive-menu");
Object.defineProperty(exports, "HiveMenu", { enumerable: true, get: function () { return hive_menu_1.HiveMenu; } });
var hive_sidebar_1 = require("./src/components/hive-sidebar");
Object.defineProperty(exports, "HiveSidebar", { enumerable: true, get: function () { return hive_sidebar_1.HiveSidebar; } });
var hive_table_1 = require("./src/components/hive-table");
Object.defineProperty(exports, "HiveTable", { enumerable: true, get: function () { return hive_table_1.HiveTable; } });
var hive_form_1 = require("./src/components/hive-form");
Object.defineProperty(exports, "HiveForm", { enumerable: true, get: function () { return hive_form_1.HiveForm; } });
var hive_icons_1 = require("./src/components/hive-icons");
Object.defineProperty(exports, "HiveIcons", { enumerable: true, get: function () { return hive_icons_1.HiveIcons; } });
var hive_charts_1 = require("./src/components/hive-charts");
Object.defineProperty(exports, "HiveBarChart", { enumerable: true, get: function () { return hive_charts_1.HiveBarChart; } });
Object.defineProperty(exports, "HiveDonutChart", { enumerable: true, get: function () { return hive_charts_1.HiveDonutChart; } });
Object.defineProperty(exports, "HiveLineChart", { enumerable: true, get: function () { return hive_charts_1.HiveLineChart; } });
// HIVE Modular Components
var hive_modular_card_1 = require("./src/components/hive-modular-card");
Object.defineProperty(exports, "ModularCard", { enumerable: true, get: function () { return hive_modular_card_1.ModularCard; } });
Object.defineProperty(exports, "moduleVariants", { enumerable: true, get: function () { return hive_modular_card_1.moduleVariants; } });
Object.defineProperty(exports, "HeaderModule", { enumerable: true, get: function () { return hive_modular_card_1.HeaderModule; } });
Object.defineProperty(exports, "ContentModule", { enumerable: true, get: function () { return hive_modular_card_1.ContentModule; } });
Object.defineProperty(exports, "FooterModule", { enumerable: true, get: function () { return hive_modular_card_1.FooterModule; } });
Object.defineProperty(exports, "AccentModule", { enumerable: true, get: function () { return hive_modular_card_1.AccentModule; } });
Object.defineProperty(exports, "ActionModule", { enumerable: true, get: function () { return hive_modular_card_1.ActionModule; } });
Object.defineProperty(exports, "ModularStack", { enumerable: true, get: function () { return hive_modular_card_1.ModularStack; } });
Object.defineProperty(exports, "ModularGrid", { enumerable: true, get: function () { return hive_modular_card_1.ModularGrid; } });
// HIVE Logo System
var hive_logo_1 = require("./src/components/hive-logo");
Object.defineProperty(exports, "HiveLogo", { enumerable: true, get: function () { return hive_logo_1.HiveLogo; } });
Object.defineProperty(exports, "HiveLogoInteractive", { enumerable: true, get: function () { return hive_logo_1.HiveLogoInteractive; } });
var hive_logo_variants_1 = require("./src/components/hive-logo-variants");
Object.defineProperty(exports, "HiveLogoAnimated", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoAnimated; } });
Object.defineProperty(exports, "HiveLogoSpinner", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoSpinner; } });
Object.defineProperty(exports, "HiveLogoPulse", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoPulse; } });
Object.defineProperty(exports, "HiveLogoAssembly", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoAssembly; } });
Object.defineProperty(exports, "HiveGlyphSimple", { enumerable: true, get: function () { return hive_logo_variants_1.HiveGlyphSimple; } });
Object.defineProperty(exports, "HiveLogoOutlined", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoOutlined; } });
Object.defineProperty(exports, "HiveMonogram", { enumerable: true, get: function () { return hive_logo_variants_1.HiveMonogram; } });
Object.defineProperty(exports, "HiveLogoGlass", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoGlass; } });
Object.defineProperty(exports, "HiveLogoNeon", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoNeon; } });
Object.defineProperty(exports, "HiveLogoHolographic", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoHolographic; } });
Object.defineProperty(exports, "HiveLogoParticles", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoParticles; } });
Object.defineProperty(exports, "HiveLogoProgress", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoProgress; } });
Object.defineProperty(exports, "HiveLogoContextual", { enumerable: true, get: function () { return hive_logo_variants_1.HiveLogoContextual; } });
var hive_logo_responsive_1 = require("./src/components/hive-logo-responsive");
Object.defineProperty(exports, "HiveLogoResponsive", { enumerable: true, get: function () { return hive_logo_responsive_1.HiveLogoResponsive; } });
Object.defineProperty(exports, "HiveLogoNavigation", { enumerable: true, get: function () { return hive_logo_responsive_1.HiveLogoNavigation; } });
Object.defineProperty(exports, "HiveLogofavicon", { enumerable: true, get: function () { return hive_logo_responsive_1.HiveLogofavicon; } });
Object.defineProperty(exports, "HiveLogoThemeAdaptive", { enumerable: true, get: function () { return hive_logo_responsive_1.HiveLogoThemeAdaptive; } });
Object.defineProperty(exports, "HiveLogoLoading", { enumerable: true, get: function () { return hive_logo_responsive_1.HiveLogoLoading; } });
Object.defineProperty(exports, "HiveLogoUserStatus", { enumerable: true, get: function () { return hive_logo_responsive_1.HiveLogoUserStatus; } });
Object.defineProperty(exports, "HiveLogoApp", { enumerable: true, get: function () { return hive_logo_responsive_1.HiveLogoApp; } });
var hive_logo_performance_1 = require("./src/components/hive-logo-performance");
Object.defineProperty(exports, "HiveLogoHighPerformance", { enumerable: true, get: function () { return hive_logo_performance_1.HiveLogoHighPerformance; } });
var hive_logo_accessibility_1 = require("./src/components/hive-logo-accessibility");
Object.defineProperty(exports, "HiveLogoAccessible", { enumerable: true, get: function () { return hive_logo_accessibility_1.HiveLogoAccessible; } });
Object.defineProperty(exports, "HiveLogoAccessibilityTest", { enumerable: true, get: function () { return hive_logo_accessibility_1.HiveLogoAccessibilityTest; } });
var hive_logo_enterprise_1 = require("./src/components/hive-logo-enterprise");
Object.defineProperty(exports, "HiveLogoEnterprise", { enumerable: true, get: function () { return hive_logo_enterprise_1.HiveLogoEnterprise; } });
Object.defineProperty(exports, "HiveLogoProvider", { enumerable: true, get: function () { return hive_logo_enterprise_1.HiveLogoProvider; } });
Object.defineProperty(exports, "useHiveLogoConfig", { enumerable: true, get: function () { return hive_logo_enterprise_1.useHiveLogoConfig; } });
// Typography Components
var Typography_1 = require("./src/components/Typography");
Object.defineProperty(exports, "Heading", { enumerable: true, get: function () { return Typography_1.Heading; } });
Object.defineProperty(exports, "Muted", { enumerable: true, get: function () { return Typography_1.Muted; } });
Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return Typography_1.Text; } });
// Form Components
var waitlist_form_1 = require("./src/components/waitlist-form");
Object.defineProperty(exports, "WaitlistForm", { enumerable: true, get: function () { return waitlist_form_1.WaitlistForm; } });
// ==========================================================================
// SHELL SYSTEM - APPLICATION LAYOUT
// ==========================================================================
__exportStar(require("./src/components/shell"), exports);
// ==========================================================================
// SURFACE SYSTEM - SPACE COMPONENTS
// ==========================================================================
__exportStar(require("./src/components/surfaces"), exports);
// ==========================================================================
// BUILDER SYSTEM - TOOL CREATION
// ==========================================================================
__exportStar(require("./src/components/builders"), exports);
// ==========================================================================
// CREATOR SYSTEM - LEGACY (Backwards Compatibility)
// ==========================================================================
var ElementPicker_1 = require("./src/components/creator/ElementPicker");
Object.defineProperty(exports, "ElementPicker", { enumerable: true, get: function () { return ElementPicker_1.ElementPicker; } });
Object.defineProperty(exports, "ElementCard", { enumerable: true, get: function () { return ElementPicker_1.ElementCard; } });
var ToolBuilder_1 = require("./src/components/creator/ToolBuilder");
Object.defineProperty(exports, "ToolBuilder", { enumerable: true, get: function () { return ToolBuilder_1.ToolBuilder; } });
Object.defineProperty(exports, "DesignCanvas", { enumerable: true, get: function () { return ToolBuilder_1.DesignCanvas; } });
Object.defineProperty(exports, "ElementLibrary", { enumerable: true, get: function () { return ToolBuilder_1.ElementLibrary; } });
var ElementConfig_1 = require("./src/components/creator/ElementConfig");
Object.defineProperty(exports, "getAllElementConfigSchemas", { enumerable: true, get: function () { return ElementConfig_1.getAllElementConfigSchemas; } });
Object.defineProperty(exports, "getElementConfigSchema", { enumerable: true, get: function () { return ElementConfig_1.getElementConfigSchema; } });
// ==========================================================================
// SOCIAL COMPONENTS
// ==========================================================================
var hive_space_card_1 = require("./src/components/hive-space-card");
Object.defineProperty(exports, "HiveSpaceCard", { enumerable: true, get: function () { return hive_space_card_1.HiveSpaceCard; } });
var hive_space_directory_1 = require("./src/components/hive-space-directory");
Object.defineProperty(exports, "HiveSpaceDirectory", { enumerable: true, get: function () { return hive_space_directory_1.HiveSpaceDirectory; } });
// ==========================================================================
// WELCOME & ONBOARDING
// ==========================================================================
var welcome_mat_1 = require("./src/components/welcome/welcome-mat");
Object.defineProperty(exports, "WelcomeMat", { enumerable: true, get: function () { return welcome_mat_1.WelcomeMat; } });
Object.defineProperty(exports, "useWelcomeMat", { enumerable: true, get: function () { return welcome_mat_1.useWelcomeMat; } });
// ==========================================================================
// THEME & MOTION SYSTEM
// ==========================================================================
var theme_provider_1 = require("./src/components/theme-provider");
Object.defineProperty(exports, "ThemeProvider", { enumerable: true, get: function () { return theme_provider_1.ThemeProvider; } });
// Unified HIVE Motion System
__exportStar(require("./src/motion"), exports);
// Legacy motion exports (deprecated)
// export { motion, AnimatePresence } from "framer-motion"; // Use HIVE motion system instead
// ==========================================================================
// BASE UI COMPONENTS (Legacy Support - Use HIVE components instead)
// ==========================================================================
// Note: These are provided for backwards compatibility only.
// New code should use HIVE-prefixed components above.
// export {
//   Card,
//   CardHeader,
//   CardFooter,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "./src/components/ui/card"; // DEPRECATED: Use HiveCard instead
// export { Button } from "./src/components/ui/button"; // DEPRECATED: Use HiveButton instead
// export { Input } from "./src/components/ui/input"; // DEPRECATED: Use HiveInput instead
var badge_1 = require("./src/components/ui/badge");
Object.defineProperty(exports, "Badge", { enumerable: true, get: function () { return badge_1.Badge; } });
var alert_1 = require("./src/components/ui/alert");
Object.defineProperty(exports, "Alert", { enumerable: true, get: function () { return alert_1.Alert; } });
Object.defineProperty(exports, "AlertTitle", { enumerable: true, get: function () { return alert_1.AlertTitle; } });
Object.defineProperty(exports, "AlertDescription", { enumerable: true, get: function () { return alert_1.AlertDescription; } });
var label_1 = require("./src/components/ui/label");
Object.defineProperty(exports, "Label", { enumerable: true, get: function () { return label_1.Label; } });
var textarea_1 = require("./src/components/ui/textarea");
Object.defineProperty(exports, "Textarea", { enumerable: true, get: function () { return textarea_1.Textarea; } });
var switch_1 = require("./src/components/ui/switch");
Object.defineProperty(exports, "Switch", { enumerable: true, get: function () { return switch_1.Switch; } });
var avatar_1 = require("./src/components/ui/avatar");
Object.defineProperty(exports, "Avatar", { enumerable: true, get: function () { return avatar_1.Avatar; } });
Object.defineProperty(exports, "AvatarImage", { enumerable: true, get: function () { return avatar_1.AvatarImage; } });
Object.defineProperty(exports, "AvatarFallback", { enumerable: true, get: function () { return avatar_1.AvatarFallback; } });
var tabs_1 = require("./src/components/ui/tabs");
Object.defineProperty(exports, "Tabs", { enumerable: true, get: function () { return tabs_1.Tabs; } });
Object.defineProperty(exports, "TabsList", { enumerable: true, get: function () { return tabs_1.TabsList; } });
Object.defineProperty(exports, "TabsTrigger", { enumerable: true, get: function () { return tabs_1.TabsTrigger; } });
Object.defineProperty(exports, "TabsContent", { enumerable: true, get: function () { return tabs_1.TabsContent; } });
var scroll_area_1 = require("./src/components/ui/scroll-area");
Object.defineProperty(exports, "ScrollArea", { enumerable: true, get: function () { return scroll_area_1.ScrollArea; } });
var resizable_1 = require("./src/components/ui/resizable");
Object.defineProperty(exports, "ResizableHandle", { enumerable: true, get: function () { return resizable_1.ResizableHandle; } });
Object.defineProperty(exports, "ResizablePanel", { enumerable: true, get: function () { return resizable_1.ResizablePanel; } });
Object.defineProperty(exports, "ResizablePanelGroup", { enumerable: true, get: function () { return resizable_1.ResizablePanelGroup; } });
