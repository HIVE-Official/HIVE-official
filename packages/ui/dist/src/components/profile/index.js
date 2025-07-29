"use strict";
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
exports.PersonalToolsPreviewWidget = exports.PrivacyControlWidget = exports.PriorityCoordinationWidget = exports.adaptSmartCalendarProps = exports.ProfileStats = exports.HiveLabSection = exports.CampusConnections = exports.CalendarCard = exports.SmartCalendar = exports.MySpacesFeed = exports.ProfileHeader = exports.ProfileSystem = void 0;
// Profile System Components
var profile_system_1 = require("./profile-system");
Object.defineProperty(exports, "ProfileSystem", { enumerable: true, get: function () { return profile_system_1.ProfileSystem; } });
var profile_header_1 = require("./profile-header");
Object.defineProperty(exports, "ProfileHeader", { enumerable: true, get: function () { return profile_header_1.ProfileHeader; } });
var my_spaces_feed_1 = require("./my-spaces-feed");
Object.defineProperty(exports, "MySpacesFeed", { enumerable: true, get: function () { return my_spaces_feed_1.MySpacesFeed; } });
var smart_calendar_1 = require("./smart-calendar");
Object.defineProperty(exports, "SmartCalendar", { enumerable: true, get: function () { return smart_calendar_1.SmartCalendar; } });
var calendar_card_1 = require("./calendar-card");
Object.defineProperty(exports, "CalendarCard", { enumerable: true, get: function () { return calendar_card_1.CalendarCard; } });
var campus_connections_1 = require("./campus-connections");
Object.defineProperty(exports, "CampusConnections", { enumerable: true, get: function () { return campus_connections_1.CampusConnections; } });
var hive_lab_section_1 = require("./hive-lab-section");
Object.defineProperty(exports, "HiveLabSection", { enumerable: true, get: function () { return hive_lab_section_1.HiveLabSection; } });
var profile_stats_1 = require("./profile-stats");
Object.defineProperty(exports, "ProfileStats", { enumerable: true, get: function () { return profile_stats_1.ProfileStats; } });
var calendar_data_adapter_1 = require("./calendar-data-adapter");
Object.defineProperty(exports, "adaptSmartCalendarProps", { enumerable: true, get: function () { return calendar_data_adapter_1.adaptSmartCalendarProps; } });
// Enhanced Profile System (Bento Grid) - temporarily disabled due to import errors
// export { EnhancedProfileSystem } from './enhanced-profile-system.js';
// export type { EnhancedProfileUser, ProfileCompletionStatus } from './enhanced-profile-system.js';
// Universal Profile System (Mobile-First with Bottom Nav) - temporarily disabled due to import errors
// export { UniversalProfileSystem } from './universal-profile-system.js';
// export type { UniversalProfileUser } from './universal-profile-system.js';
// Bento Grid Components
__exportStar(require("./bento-grid"), exports);
// Profile Widgets
var priority_coordination_widget_1 = require("./widgets/priority-coordination-widget");
Object.defineProperty(exports, "PriorityCoordinationWidget", { enumerable: true, get: function () { return priority_coordination_widget_1.PriorityCoordinationWidget; } });
var privacy_control_widget_1 = require("./widgets/privacy-control-widget");
Object.defineProperty(exports, "PrivacyControlWidget", { enumerable: true, get: function () { return privacy_control_widget_1.PrivacyControlWidget; } });
var personal_tools_preview_widget_1 = require("./widgets/personal-tools-preview-widget");
Object.defineProperty(exports, "PersonalToolsPreviewWidget", { enumerable: true, get: function () { return personal_tools_preview_widget_1.PersonalToolsPreviewWidget; } });
