/**
 * HIVE Icon Composition System - PRODUCTION READY
 * Campus iconography system with systematic sizing and usage patterns
 * 
 * Built for consistent visual communication across campus social platform
 * Leverages Lucide React for comprehensive icon library with HIVE-specific patterns
 * 
 * Status: ✅ PRODUCTION READY
 * Version: v1.0.0
 * Date: August 26, 2025
 */

import { 
  // Navigation & Core
  Home, Menu, Search, Bell, Settings, User, ChevronRight, ChevronLeft, ChevronUp, ChevronDown,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Plus, X, Check, AlertCircle, Info,
  
  // Campus & Academic
  BookOpen, GraduationCap, Calendar, Clock, MapPin, Building, Users, UserPlus,
  School, Library, Coffee, Wifi, Car, Bus, Bike,
  
  // Social & Communication
  MessageCircle, MessageSquare, Send, Heart, Share2, Bookmark, Flag, UserCheck, UserX,
  AtSign, Hash, Smile, Zap, Star, Award, Trophy, Target, ThumbsUp, Mail,
  
  // Tools & Productivity
  Wrench, Hammer, Code, Laptop, Smartphone, Tablet, Monitor, Keyboard, Mouse,
  Database, Server, Cloud, Download, Upload, FileText, Folder, Archive,
  
  // Campus Utilities
  Lightbulb, Calculator, Compass, Camera, Mic, Volume2, VolumeX,
  Lock, Unlock, Eye, EyeOff, Trash2, Edit3, Copy, ExternalLink,
  MoreVertical, Crown,
  
  // Status & Feedback
  CheckCircle, XCircle, AlertTriangle, HelpCircle, Loader2, RefreshCw,
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity
} from 'lucide-react';

// === ICON PHILOSOPHY ===
export const iconPrinciples = {
  philosophy: "Icons communicate campus context instantly and universally",
  rules: [
    "Lucide-first: Use comprehensive Lucide library for consistency",
    "Campus context: Icons reflect university social and academic life",
    "Systematic sizing: Mathematical scale aligned with typography",
    "Accessible design: Clear at all sizes, screen reader compatible"
  ]
} as const;

// === SYSTEMATIC ICON SIZES ===
export const iconSizes = {
  // Core size scale (aligned with typography and spacing)
  micro: {
    size: 12,
    className: 'w-3 h-3',
    use: 'Inline text indicators, micro badges, tight spaces',
    examples: 'Status dots, notification counts, inline arrows'
  },
  
  small: {
    size: 16, 
    className: 'w-4 h-4',
    use: 'Body text inline, small buttons, form inputs',
    examples: 'Search icons, input validation, small buttons'
  },
  
  base: {
    size: 20,
    className: 'w-5 h-5', 
    use: 'Standard UI elements, navigation, cards',
    examples: 'Navigation items, card actions, standard buttons'
  },
  
  large: {
    size: 24,
    className: 'w-6 h-6',
    use: 'Headers, prominent actions, feature icons',
    examples: 'Page headers, CTA buttons, feature highlights'
  },
  
  xl: {
    size: 32,
    className: 'w-8 h-8',
    use: 'Hero sections, empty states, major features',
    examples: 'Empty state graphics, hero icons, major CTAs'
  },
  
  hero: {
    size: 48,
    className: 'w-12 h-12',
    use: 'Landing pages, onboarding, major visual elements',
    examples: 'Onboarding steps, landing sections, major features'
  }
} as const;

// === CAMPUS ICON CATEGORIES ===
export const campusIconCategories = {
  // Core Navigation
  navigation: {
    home: { icon: Home, meaning: 'Dashboard, main feed', usage: 'Primary navigation' },
    menu: { icon: Menu, meaning: 'Menu toggle, options', usage: 'Mobile navigation' },
    search: { icon: Search, meaning: 'Find content, users, spaces', usage: 'Search interfaces' },
    settings: { icon: Settings, meaning: 'Preferences, configuration', usage: 'Settings pages' },
    user: { icon: User, meaning: 'Profile, account', usage: 'User-related actions' }
  },
  
  // Academic Context
  academic: {
    book: { icon: BookOpen, meaning: 'Courses, reading, study', usage: 'Academic content' },
    graduation: { icon: GraduationCap, meaning: 'Education, achievements', usage: 'Academic progress' },
    school: { icon: School, meaning: 'Institution, campus', usage: 'University context' },
    library: { icon: Library, meaning: 'Resources, quiet study', usage: 'Study spaces' },
    calculator: { icon: Calculator, meaning: 'Math, calculations, tools', usage: 'Academic tools' }
  },
  
  // Campus Life
  campus: {
    calendar: { icon: Calendar, meaning: 'Events, scheduling, planning', usage: 'Time-based content' },
    clock: { icon: Clock, meaning: 'Time, deadlines, duration', usage: 'Temporal information' },
    mapPin: { icon: MapPin, meaning: 'Location, places, directions', usage: 'Location-based features' },
    building: { icon: Building, meaning: 'Campus buildings, facilities', usage: 'Location references' },
    coffee: { icon: Coffee, meaning: 'Social spaces, breaks, casual', usage: 'Social gathering' },
    wifi: { icon: Wifi, meaning: 'Connectivity, internet, tech', usage: 'Technical features' }
  },
  
  // Social Features
  social: {
    users: { icon: Users, meaning: 'Groups, community, membership', usage: 'Group/space indicators' },
    userPlus: { icon: UserPlus, meaning: 'Invite, add member, connect', usage: 'Social actions' },
    messageCircle: { icon: MessageCircle, meaning: 'Chat, discussion, communication', usage: 'Communication features' },
    heart: { icon: Heart, meaning: 'Like, appreciation, positive', usage: 'Engagement actions' },
    share: { icon: Share2, meaning: 'Share content, spread, viral', usage: 'Content sharing' },
    atSign: { icon: AtSign, meaning: 'Mentions, direct attention', usage: 'Social addressing' }
  },
  
  // Tools & Building
  tools: {
    wrench: { icon: Wrench, meaning: 'Tools, building, creation', usage: 'Tool-building features' },
    code: { icon: Code, meaning: 'Programming, development, tech', usage: 'Developer tools' },
    laptop: { icon: Laptop, meaning: 'Computing, work, productivity', usage: 'Tech context' },
    lightbulb: { icon: Lightbulb, meaning: 'Ideas, innovation, creativity', usage: 'Creative features' },
    zap: { icon: Zap, meaning: 'Quick, powerful, energy', usage: 'Fast actions' }
  },
  
  // Status & Feedback
  status: {
    check: { icon: Check, meaning: 'Success, completed, correct', usage: 'Success states' },
    checkCircle: { icon: CheckCircle, meaning: 'Confirmed success, positive', usage: 'Success feedback' },
    xCircle: { icon: XCircle, meaning: 'Error, failure, negative', usage: 'Error states' },
    alertTriangle: { icon: AlertTriangle, meaning: 'Warning, caution, attention', usage: 'Warning states' },
    info: { icon: Info, meaning: 'Information, help, context', usage: 'Informational content' },
    loader: { icon: Loader2, meaning: 'Loading, processing, wait', usage: 'Loading states' }
  }
} as const;

// === ICON USAGE PATTERNS ===
export const iconUsagePatterns = {
  // Button icon patterns
  buttons: {
    // Leading icon (icon + text)
    leading: 'mr-2 inline-flex items-center',
    
    // Trailing icon (text + icon) 
    trailing: 'ml-2 inline-flex items-center',
    
    // Icon only button
    iconOnly: 'p-2 flex items-center justify-center',
    
    // Icon with text below (mobile)
    stacked: 'flex flex-col items-center gap-1'
  },
  
  // Card icon patterns
  cards: {
    // Header icon
    header: 'mb-2 text-[var(--hive-gold-primary)]',
    
    // Inline with title
    title: 'mr-2 inline-flex items-center',
    
    // Corner indicator
    corner: 'absolute top-4 right-4',
    
    // Center feature
    feature: 'mx-auto mb-4 text-[var(--hive-gold-primary)]'
  },
  
  // Navigation icon patterns
  navigation: {
    // Tab icons
    tab: 'mb-1 mx-auto',
    
    // Sidebar icons
    sidebar: 'mr-3 flex-shrink-0',
    
    // Breadcrumb icons
    breadcrumb: 'mx-2 text-[var(--hive-text-muted)]',
    
    // Menu item icons
    menuItem: 'mr-3 text-[var(--hive-text-secondary)]'
  },
  
  // Status icon patterns
  status: {
    // Inline status
    inline: 'mr-1 inline-flex items-center',
    
    // Badge overlay
    badge: 'absolute -top-1 -right-1',
    
    // Alert icons
    alert: 'mr-2 flex-shrink-0',
    
    // Loading replacement
    loading: 'animate-spin'
  }
} as const;

// === ICON COLOR PATTERNS ===
export const iconColorPatterns = {
  // Semantic color applications
  semantic: {
    default: 'text-[var(--hive-text-secondary)]',
    primary: 'text-[var(--hive-text-primary)]',
    brand: 'text-[var(--hive-gold-primary)]',
    success: 'text-[var(--hive-success-primary)]',
    warning: 'text-[var(--hive-warning-primary)]',
    error: 'text-[var(--hive-error-primary)]',
    info: 'text-[var(--hive-info-primary)]',
    muted: 'text-[var(--hive-text-muted)]'
  },
  
  // Interactive state colors
  interactive: {
    idle: 'text-[var(--hive-text-secondary)] transition-colors duration-200',
    hover: 'hover:text-[var(--hive-text-primary)] transition-colors duration-200',
    active: 'text-[var(--hive-gold-primary)]',
    disabled: 'text-[var(--hive-text-placeholder)] opacity-50'
  },
  
  // Campus context colors
  campus: {
    academic: 'text-[var(--hive-info-primary)]',      // Blue for academic
    social: 'text-[var(--hive-gold-primary)]',        // Gold for social
    tools: 'text-[var(--hive-success-primary)]',      // Green for tools/building
    events: 'text-[var(--hive-warning-primary)]',     // Amber for events/time
    location: 'text-[var(--hive-text-secondary)]'     // Neutral for location
  }
} as const;

// === ICON ACCESSIBILITY PATTERNS ===
export const iconAccessibility = {
  // ARIA label patterns
  ariaLabels: {
    decorative: { 'aria-hidden': 'true' },
    informative: { 'aria-label': 'Description of icon meaning' },
    interactive: { 'aria-label': 'Action that will be performed' }
  },
  
  // Screen reader patterns
  screenReader: {
    // Hide decorative icons
    decorative: 'aria-hidden="true"',
    
    // Provide text alternative
    informative: 'Add descriptive aria-label',
    
    // Describe action
    interactive: 'Use aria-label for button/link action'
  },
  
  // High contrast support
  highContrast: {
    ensure: 'Icons maintain visibility in high contrast mode',
    stroke: 'Use stroke-based icons for better contrast',
    size: 'Minimum 16px for readability'
  }
} as const;

// === CAMPUS-SPECIFIC ICON COMBINATIONS ===
export const campusIconCombinations = {
  // Common campus scenarios
  studyGroup: {
    icons: [Users, BookOpen],
    meaning: 'Study groups, academic collaboration',
    usage: 'Group study features'
  },
  
  campusEvent: {
    icons: [Calendar, MapPin, Users],
    meaning: 'Campus events with location and attendees',
    usage: 'Event listings'
  },
  
  toolSharing: {
    icons: [Wrench, Users, Share2],
    meaning: 'Shared tools within community',
    usage: 'Tool marketplace'
  },
  
  classSchedule: {
    icons: [Clock, BookOpen, Building],
    meaning: 'Class timing and location',
    usage: 'Academic scheduling'
  },
  
  campusDirectory: {
    icons: [MapPin, Building, Search],
    meaning: 'Finding locations on campus',
    usage: 'Campus navigation'
  }
} as const;

// === PERFORMANCE OPTIMIZATION ===
export const iconPerformance = {
  // Loading strategy
  loading: {
    preload: 'Common navigation icons',
    lazy: 'Feature-specific icons',
    bundle: 'Tree-shake unused icons'
  },
  
  // Rendering optimization
  rendering: {
    svg: 'Use SVG for scalability and performance',
    caching: 'Browser cache icon sprites',
    compression: 'Optimize SVG paths'
  },
  
  // Memory management
  memory: {
    reuse: 'Same icon instances across components',
    cleanup: 'Remove unused icon imports',
    sizing: 'CSS classes instead of inline styles'
  }
} as const;

// === COMPREHENSIVE EXPORT ===
export const iconComposition = {
  principles: iconPrinciples,
  sizes: iconSizes,
  categories: campusIconCategories,
  usage: iconUsagePatterns,
  colors: iconColorPatterns,
  accessibility: iconAccessibility,
  combinations: campusIconCombinations,
  performance: iconPerformance
} as const;

// === ICON COMPONENT UTILITIES ===
export const createIconClass = (size: keyof typeof iconSizes, color: keyof typeof iconColorPatterns.semantic = 'default') => {
  return `${iconSizes[size].className} ${iconColorPatterns.semantic[color]}`;
};

export const createInteractiveIconClass = (size: keyof typeof iconSizes) => {
  return `${iconSizes[size].className} ${iconColorPatterns.interactive.idle}`;
};

export const createCampusIconClass = (size: keyof typeof iconSizes, context: keyof typeof iconColorPatterns.campus) => {
  return `${iconSizes[size].className} ${iconColorPatterns.campus[context]}`;
};

// === TYPE EXPORTS ===
export type IconComposition = typeof iconComposition;
export type IconSizes = typeof iconSizes;
export type CampusIconCategories = typeof campusIconCategories;
export type IconUsagePatterns = typeof iconUsagePatterns;

// === LUCIDE ICON EXPORTS ===
export {
  // Navigation & Core
  Home, Menu, Search, Bell, Settings, User, ChevronRight, ChevronLeft, ChevronUp, ChevronDown,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Plus, X, Check, AlertCircle, Info,
  
  // Campus & Academic  
  BookOpen, GraduationCap, Calendar, Clock, MapPin, Building, Users, UserPlus,
  School, Library, Coffee, Wifi, Car, Bus, Bike,
  
  // Social & Communication
  MessageCircle, MessageSquare, Send, Heart, Share2, Bookmark, Flag, UserCheck, UserX,
  AtSign, Hash, Smile, Zap, Star, Award, Trophy, Target, ThumbsUp, Mail,
  
  // Tools & Productivity
  Wrench, Hammer, Code, Laptop, Smartphone, Tablet, Monitor, Keyboard, Mouse,
  Database, Server, Cloud, Download, Upload, FileText, Folder, Archive,
  
  // Campus Utilities
  Lightbulb, Calculator, Compass, Camera, Mic, Volume2, VolumeX,
  Lock, Unlock, Eye, EyeOff, Trash2, Edit3, Copy, ExternalLink,
  MoreVertical, Crown,
  
  // Status & Feedback
  CheckCircle, XCircle, AlertTriangle, HelpCircle, Loader2, RefreshCw,
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity
};