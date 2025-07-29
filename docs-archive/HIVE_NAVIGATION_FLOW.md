# HIVE Platform - Complete Navigation Flow Map

## GLOBAL NAVIGATION
```
HIVE PLATFORM
├── GLOBAL HEADER
│   ├── HIVE Logo → Feed (Homepage)
│   ├── Profile → Personal Dashboard
│   ├── Feed → Campus Activity Stream
│   ├── Spaces → Space Discovery/Management
│   └── HiveLAB → Tool Creation & Customization
│
├── SECONDARY ACCESS
│   ├── Search (Global) → Universal Search Results
│   ├── Notifications → Notification Center
│   └── Settings → Account & Platform Settings
│
└── CROSS-PLATFORM RULES
    ├── Breadcrumb Pattern: Section > Subsection > Item
    ├── Back Button: Reverse navigation hierarchy
    └── URL Structure: /section/item/subitem
```

## 1. PROFILE SECTION
```
PROFILE DASHBOARD
├── Avatar Card
│   ├── [Photo] → Profile Photo Editor (Modal)
│   ├── [Name] → Edit Profile Info (Modal)
│   └── [Builder Badge] → Builder Analytics (Page)
│
├── Calendar Card  
│   ├── [Card Body] → Full Calendar View (Page)
│   ├── [Individual Event] → Event Details (Modal)
│   ├── [View All] → Full Calendar View (Page)
│   └── [Connect Calendar] → Integration Settings (Modal)
│
├── Your Tools Card
│   ├── [Card Body] → Personal Tools Library (Page)
│   ├── [Individual Tool] → Tool Interface (Modal/Page)
│   ├── [+ Add] → Tool Marketplace (Page)
│   └── [Settings] → Tool Management (Page)
│
├── Your Spaces Card
│   ├── [Card Body] → Space Discovery (Page)
│   ├── [Individual Space] → Space Dashboard (Page)
│   ├── [Join More] → Space Discovery (Page)
│   └── [Discovery] → Advanced Space Search (Page)
│
├── Activity Log Card
│   ├── [Card Body] → Full Activity Timeline (Page)
│   ├── [Individual Activity] → Activity Details (Modal)
│   └── [Make Public] → Privacy Settings (Modal)
│
├── HiveLAB Card
│   ├── [Card Body] → HiveLAB Dashboard (Page)
│   ├── [Your Creations] → Tool Analytics (Page)
│   └── [Open HiveLAB] → Tool Builder (Page)
│
└── Ghost Mode Card
    ├── [Toggle] → Immediate State Change
    └── [Card Body] → Privacy Settings (Page)
```

## 2. FEED SECTION
```
FEED DASHBOARD
├── Feed Filter Bar
│   ├── [All Spaces] → Filtered Feed View
│   ├── [Specific Space] → Space-Specific Feed
│   └── [Following] → Social Feed (v1)
│
├── Individual Feed Items
│   ├── [Post Content] → Post Detail View (Modal/Page)
│   ├── [Event Card] → Event Details → Calendar Integration
│   ├── [Poll Result] → Poll Detail → Tool Interaction
│   ├── [Space Name] → Space Dashboard
│   └── [User Avatar] → User Profile (v1)
│
├── Create Content
│   ├── [+ Post] → Post Composer (Modal)
│   ├── [+ Event] → Event Creator → Calendar
│   └── [+ Poll] → Tool Selector → Poll Tool
│
└── Feed Settings
    ├── [Notifications] → Notification Preferences
    ├── [Filter Preferences] → Feed Customization
    └── [Privacy] → Activity Visibility Settings
```

## 3. SPACES SECTION
```
SPACES MAIN PAGE
├── Space Discovery
│   ├── [Your Spaces] → Personal Spaces List
│   ├── [Browse All] → Complete Space Directory
│   ├── [Categories] → Academic/Residential/Social
│   └── [Search] → Space Search Results
│
├── Space Management (Builders)
│   ├── [Spaces You Lead] → Leadership Dashboard
│   ├── [Request Leadership] → Application Flow
│   └── [Create Space] → Space Creation (Future)
│
└── Space Preview Cards
    ├── [Preview Space] → Space Preview Mode
    ├── [Join Space] → Immediate join + redirect to Space
    └── [Request Leadership] → Leadership Application

INDIVIDUAL SPACE DASHBOARD: [Space Name]
├── Posts Tab (DEFAULT)
│   ├── [Individual Post] → Post Detail (Modal/Page)
│   ├── [Event Auto-Post] → Event Details → Calendar
│   ├── [Tool Result Post] → Tool Interaction
│   ├── [+ Create Post] → Post Composer (if enabled)
│   └── [Member Avatar] → Member Profile (v1)
│
├── Pinned Tab
│   ├── [Pinned Item] → Item Detail View
│   ├── [Resource Link] → External Link (new tab)
│   ├── [Tool Link] → Tool Interaction
│   └── [Edit Pins] → Pin Management (Leaders only)
│
├── Calendar Tab
│   ├── [Calendar View] → Full Calendar Interface
│   ├── [Individual Event] → Event Details (Modal)
│   ├── [+ Create Event] → Event Creator (if enabled)
│   └── [Export Calendar] → Calendar Integration
│
├── Members Tab
│   ├── [Member List] → Member Directory
│   ├── [Individual Member] → Member Profile (v1)
│   ├── [Search Members] → Filtered Member View
│   └── [Member Management] → Admin Controls (Leaders)
│
└── Tools Tab
    ├── [Active Tools] → Tool Grid View
    ├── [Individual Tool] → Tool Interface (Modal/Page)
    ├── [+ Plant Tool] → Tool Marketplace (Builders)
    ├── [Tool Settings] → Tool Configuration (Builders)
    └── [Remove Tool] → Confirmation (Builders)
```

## 4. HIVELAB SECTION
```
HIVELAB DASHBOARD
├── Tool Creation
│   ├── [+ Create New Tool] → Tool Builder Interface
│   ├── [Template Library] → Pre-built Tool Templates
│   ├── [Element Library] → Component Browser
│   └── [Import Tool] → Tool Import/Fork Flow
│
├── Your Tools
│   ├── [Personal Tools] → Personal Tool Management
│   ├── [Published Tools] → Marketplace Tool Analytics
│   ├── [Draft Tools] → Unfinished Tool Projects
│   └── [Tool Analytics] → Usage Metrics & Feedback
│
├── Element Workshop
│   ├── [Available Elements] → Element Library
│   ├── [Custom Elements] → Advanced Element Creation
│   ├── [Element Combinations] → Complex Tool Building
│   └── [Testing Sandbox] → Tool Testing Environment
│
└── Marketplace
    ├── [Browse Tools] → Tool Marketplace
    ├── [Featured Tools] → Curated Tool Showcase
    ├── [Your Submissions] → Published Tool Management
    └── [Revenue Dashboard] → Monetization Metrics (Future)

TOOL BUILDER INTERFACE
├── LEFT PANEL: Element Library
│   ├── Drag Elements → Canvas
│   ├── Element Settings → Configuration Panel
│   └── Element Connections → Logic Builder
│
├── CENTER CANVAS: Tool Design Area
│   ├── Drop Elements Here
│   ├── Visual Layout Editor
│   └── Real-time Preview
│
├── RIGHT PANEL: Tool Settings
│   ├── Tool Metadata (Name, Description, Icon)
│   ├── Privacy Settings (Personal/Space/Public)
│   ├── Permissions (Data Access, Notifications)
│   └── Publishing Options
│
└── TOP BAR: Actions
    ├── [Save Draft] → Save to Drafts
    ├── [Test Tool] → Testing Sandbox
    ├── [Preview] → Tool Preview Modal
    └── [Publish] → Publishing Flow
```

## 5. TOOL INTERACTION PATTERNS
```
TOOL USAGE FLOWS
├── SIMPLE TOOLS (Timer, Calculator, Counter)
│   ├── Context: Any page (Profile, Space, Feed)
│   ├── Trigger: Tool icon click
│   ├── Display: Modal overlay
│   ├── Interaction: Direct manipulation
│   └── Close: Return to original context
│
├── MEDIUM TOOLS (Poll, RSVP, Q&A)
│   ├── Context: Primarily in Spaces
│   ├── Trigger: Tool activation
│   ├── Display: Inline in Space or Modal
│   ├── Interaction: Form submission + results
│   └── Result: Updates Space content
│
└── COMPLEX TOOLS (Note Taker, Project Manager)
    ├── Context: Personal Tools or Space Tools
    ├── Trigger: Tool icon click
    ├── Display: Full page application
    ├── Interaction: Extended usage session
    └── Navigation: Dedicated tool interface with back button

TOOL CONFIGURATION (Builders)
├── Space Tool Management
│   ├── Space → Tools Tab → [+ Plant Tool]
│   ├── Tool Marketplace → Browse → Preview
│   ├── Configuration → Set parameters
│   ├── Permission Setup → Define access
│   └── Activation → Tool goes live
│
└── Personal Tool Management
    ├── Profile → Your Tools → [Settings]
    ├── Personal Preferences → Customize
    ├── Data Sources → Connect services
    └── Privacy → Data sharing controls
```

## 6. SEARCH & DISCOVERY
```
GLOBAL SEARCH (Available on all pages)
├── Search Input → Real-time suggestions
├── Search Categories
│   ├── [Spaces] → Space search results
│   ├── [People] → Member search results (v1)
│   ├── [Tools] → Tool marketplace search
│   ├── [Events] → Calendar search results
│   └── [Posts] → Content search results (v1)
│
└── Search Results Page
    ├── Tabbed Results (by category)
    ├── Filtered Results (by criteria)
    ├── Quick Actions (Join, Add, Follow)
    └── Advanced Search → Detailed filter interface

DISCOVERY PATTERNS
├── Space Discovery
│   ├── Browse by Category → Academic/Residential/Social
│   ├── Recommended Spaces → Algorithm-based suggestions
│   ├── Popular Spaces → Most active/highest membership
│   └── Your Network → Spaces your friends joined (v1)
│
├── Tool Discovery
│   ├── Tool Marketplace → All available tools
│   ├── Featured Tools → Curated by HIVE team
│   ├── Category Browse → By function/use case
│   └── Recommended Tools → Based on usage patterns
│
└── People Discovery (v1)
    ├── Your Spaces → Members of same Spaces
    ├── Similar Interests → Algorithm matching
    └── Suggested Follows → Activity-based recommendations
```

## 7. SETTINGS & ACCOUNT
```
SETTINGS DASHBOARD
├── Account Settings
│   ├── [Profile Information] → Edit basic info
│   ├── [Email & Authentication] → Login settings
│   ├── [University Affiliation] → Change/verify school
│   └── [Account Deletion] → Account removal flow
│
├── Privacy & Security
│   ├── [Ghost Mode] → Visibility controls
│   ├── [Data Sharing] → What data to share/hide
│   ├── [Tool Permissions] → Tool access controls
│   └── [Activity Tracking] → Analytics opt-in/out
│
├── Notifications
│   ├── [Space Notifications] → Per-space settings
│   ├── [Tool Notifications] → Tool alert preferences
│   ├── [Event Reminders] → Calendar notification settings
│   └── [Platform Updates] → HIVE announcement preferences
│
├── Customization
│   ├── [Profile Layout] → Bento grid customization
│   ├── [Theme Settings] → Dark/light mode (future)
│   ├── [Feed Preferences] → Content algorithm tuning
│   └── [Quick Actions] → Customize shortcuts
│
└── Data & Export
    ├── [Export Data] → Download your HIVE data
    ├── [Import Data] → Bring data from other platforms
    ├── [Data Analytics] → Your usage insights
    └── [Data Retention] → Control data storage
```

## 8. MOBILE VS DESKTOP PATTERNS
```
MOBILE-SPECIFIC
├── Navigation
│   ├── Bottom Tab Bar → Primary navigation
│   ├── Hamburger Menu → Secondary options
│   ├── Swipe Gestures → Quick actions
│   └── Pull to Refresh → Content updates
│
├── Tool Interactions
│   ├── Simple Tools → Full screen overlays
│   ├── Complex Tools → App-like experience
│   └── Tool Configuration → Simplified interface
│
└── Space Navigation
    ├── Tab Swiping → Horizontal swipe between tabs
    ├── Vertical Scroll → Content within tabs
    └── Slide Actions → Swipe-to-reveal actions

DESKTOP-SPECIFIC
├── Enhanced Features
│   ├── Hover States → Rich previews
│   ├── Right-Click Menus → Contextual options
│   ├── Keyboard Shortcuts → Power user features
│   └── Multi-Window → Multiple tools/spaces
│
└── Tool Interactions
    ├── Modal Overlays → Preserve context
    ├── Multi-Tool Usage → Simultaneous tools
    └── Advanced Configuration → Full feature access
```

## 9. ERROR HANDLING & EDGE CASES
```
LOADING & ERROR STATES
├── Loading Patterns
│   ├── Initial Page Load → Skeleton UI placeholders
│   ├── Content Updates → Shimmer effects
│   ├── Tool Loading → Progress indicators
│   └── Failed Loads → Error states with retry
│
├── Error Recovery
│   ├── Network Errors → Retry with offline fallback
│   ├── Permission Errors → Clear explanation + resolution
│   ├── Tool Errors → Graceful degradation + alternatives
│   └── Search Errors → Fallback to cached/popular results
│
└── State Management
    ├── Session Persistence → Saved across sessions
    ├── Real-Time Updates → Live updates without refresh
    ├── Navigation State → Return to last location
    └── Draft Content → Auto-saved in browser
```

## 10. PLATFORM INTEGRATION POINTS
```
CROSS-SECTION DATA FLOW
├── PROFILE ↔ SPACES
│   ├── Profile Space List ← Space Memberships
│   ├── Profile Tools ← Space Tool Usage
│   ├── Profile Activity ← Space Participation
│   └── Profile Calendar ← Space Events
│
├── FEED ↔ ALL SECTIONS
│   ├── Feed Content ← Space Posts
│   ├── Feed Events ← Calendar Integration
│   ├── Feed Tools ← Tool Results
│   └── Feed Activity ← User Actions
│
└── HIVELAB ↔ PLATFORM
    ├── Personal Tools → Profile Dashboard
    ├── Space Tools → Space Tool Tabs
    ├── Tool Analytics ← Usage Data
    └── Tool Updates → Platform-wide distribution
```

## INTERACTION RULES
```
MODAL vs PAGE DECISIONS
├── Use MODAL for:
│   ├── Quick Actions (settings, photo upload)
│   ├── Simple Tool Interactions (calculator, timer)
│   ├── Event Details (calendar info, RSVP)
│   └── Context Preservation (stay on current page)
│
└── Use PAGE for:
    ├── Complex Interfaces (full calendar, tool builder)
    ├── Navigation Destinations (marketplace, space discovery)
    ├── Extended Sessions (complex tools, browsing)
    └── Deep Hierarchies (space > posts > individual post)

BREADCRUMB PATTERNS
├── Profile > Calendar > Event Details
├── Spaces > CS Majors > Posts > Individual Post
├── HiveLAB > Tool Builder > Element Library
└── Feed > Space Filter > Individual Post

BACK BUTTON BEHAVIOR
├── Modal Close → Return to parent page
├── Page Navigation → Previous page in hierarchy
├── Tab Switching → Last active tab
└── Browser Back → Standard browser history
```

## URL STRUCTURE PATTERNS
```
MAIN SECTIONS
├── /profile → Profile Dashboard
├── /feed → Campus Feed
├── /spaces → Space Discovery
├── /spaces/[spaceId] → Individual Space
├── /hivelab → HiveLAB Dashboard
├── /tools → Tool Marketplace
└── /settings → Account Settings

SUBSECTION PATTERNS
├── /spaces/[spaceId]/posts → Space Posts Tab
├── /spaces/[spaceId]/calendar → Space Calendar Tab
├── /spaces/[spaceId]/members → Space Members Tab
├── /spaces/[spaceId]/tools → Space Tools Tab
├── /profile/calendar → Full Calendar View
├── /profile/tools → Personal Tools
├── /hivelab/builder → Tool Builder
└── /hivelab/analytics → Tool Analytics

MODAL OVERLAYS (No URL change)
├── Tool Interactions (Simple)
├── Event Details
├── Profile Photo Editor
├── Post Composer
└── Settings Modals
```

## NAVIGATION STATE MANAGEMENT
```
PERSISTENT STATE
├── Current Tab in Spaces (Posts/Calendar/Members/Tools)
├── Feed Filter Selection (All/Specific Spaces)
├── Tool Configuration Settings
├── Search History & Preferences
└── Ghost Mode Status

SESSION STATE
├── Scroll Position in Feeds
├── Form Data (Drafts)
├── Modal Context (what opened it)
├── Navigation History
└── Real-time Updates Queue

CROSS-SESSION STATE
├── User Preferences
├── Space Memberships
├── Tool Installations
├── Privacy Settings
└── Notification Preferences
```

## PLACEHOLDER CONTENT GUIDELINES
```
LOADING STATES
├── Profile Cards → Skeleton with shimmer
├── Space Lists → Card grid with placeholders
├── Feed Items → Content block skeletons
├── Tools → Icon grid with loading states
└── Calendar → Month grid with placeholder events

ERROR STATES
├── Network Issues → Retry button with explanation
├── Permission Denied → Clear action steps
├── Content Not Found → Helpful suggestions
├── Tool Errors → Alternative tool recommendations
└── Search No Results → Suggested searches

EMPTY STATES
├── No Spaces Joined → Discovery suggestions
├── No Tools Installed → Marketplace highlights
├── Empty Calendar → Create event prompts
├── No Activity → Usage tips
└── No Search Results → Alternative search terms
```