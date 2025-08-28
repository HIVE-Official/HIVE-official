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
import { Home, Menu, Search, Bell, Settings, User, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Plus, X, Check, AlertCircle, Info, BookOpen, GraduationCap, Calendar, Clock, MapPin, Building, Users, UserPlus, School, Library, Coffee, Wifi, Car, Bus, Bike, MessageCircle, MessageSquare, Send, Heart, Share2, Bookmark, Flag, UserCheck, UserX, AtSign, Hash, Smile, Zap, Star, Award, Trophy, Target, ThumbsUp, Mail, Wrench, Hammer, Code, Laptop, Smartphone, Tablet, Monitor, Keyboard, Mouse, Database, Server, Cloud, Download, Upload, FileText, Folder, Archive, Lightbulb, Calculator, Compass, Camera, Mic, Volume2, VolumeX, Lock, Unlock, Eye, EyeOff, Trash2, Edit3, Copy, ExternalLink, MoreVertical, Crown, CheckCircle, XCircle, AlertTriangle, HelpCircle, Loader2, RefreshCw, TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react';
export declare const iconPrinciples: {
    readonly philosophy: "Icons communicate campus context instantly and universally";
    readonly rules: readonly ["Lucide-first: Use comprehensive Lucide library for consistency", "Campus context: Icons reflect university social and academic life", "Systematic sizing: Mathematical scale aligned with typography", "Accessible design: Clear at all sizes, screen reader compatible"];
};
export declare const iconSizes: {
    readonly micro: {
        readonly size: 12;
        readonly className: "w-3 h-3";
        readonly use: "Inline text indicators, micro badges, tight spaces";
        readonly examples: "Status dots, notification counts, inline arrows";
    };
    readonly small: {
        readonly size: 16;
        readonly className: "w-4 h-4";
        readonly use: "Body text inline, small buttons, form inputs";
        readonly examples: "Search icons, input validation, small buttons";
    };
    readonly base: {
        readonly size: 20;
        readonly className: "w-5 h-5";
        readonly use: "Standard UI elements, navigation, cards";
        readonly examples: "Navigation items, card actions, standard buttons";
    };
    readonly large: {
        readonly size: 24;
        readonly className: "w-6 h-6";
        readonly use: "Headers, prominent actions, feature icons";
        readonly examples: "Page headers, CTA buttons, feature highlights";
    };
    readonly xl: {
        readonly size: 32;
        readonly className: "w-8 h-8";
        readonly use: "Hero sections, empty states, major features";
        readonly examples: "Empty state graphics, hero icons, major CTAs";
    };
    readonly hero: {
        readonly size: 48;
        readonly className: "w-12 h-12";
        readonly use: "Landing pages, onboarding, major visual elements";
        readonly examples: "Onboarding steps, landing sections, major features";
    };
};
export declare const campusIconCategories: {
    readonly navigation: {
        readonly home: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Dashboard, main feed";
            readonly usage: "Primary navigation";
        };
        readonly menu: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Menu toggle, options";
            readonly usage: "Mobile navigation";
        };
        readonly search: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Find content, users, spaces";
            readonly usage: "Search interfaces";
        };
        readonly settings: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Preferences, configuration";
            readonly usage: "Settings pages";
        };
        readonly user: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Profile, account";
            readonly usage: "User-related actions";
        };
    };
    readonly academic: {
        readonly book: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Courses, reading, study";
            readonly usage: "Academic content";
        };
        readonly graduation: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Education, achievements";
            readonly usage: "Academic progress";
        };
        readonly school: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Institution, campus";
            readonly usage: "University context";
        };
        readonly library: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Resources, quiet study";
            readonly usage: "Study spaces";
        };
        readonly calculator: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Math, calculations, tools";
            readonly usage: "Academic tools";
        };
    };
    readonly campus: {
        readonly calendar: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Events, scheduling, planning";
            readonly usage: "Time-based content";
        };
        readonly clock: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Time, deadlines, duration";
            readonly usage: "Temporal information";
        };
        readonly mapPin: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Location, places, directions";
            readonly usage: "Location-based features";
        };
        readonly building: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Campus buildings, facilities";
            readonly usage: "Location references";
        };
        readonly coffee: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Social spaces, breaks, casual";
            readonly usage: "Social gathering";
        };
        readonly wifi: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Connectivity, internet, tech";
            readonly usage: "Technical features";
        };
    };
    readonly social: {
        readonly users: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Groups, community, membership";
            readonly usage: "Group/space indicators";
        };
        readonly userPlus: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Invite, add member, connect";
            readonly usage: "Social actions";
        };
        readonly messageCircle: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Chat, discussion, communication";
            readonly usage: "Communication features";
        };
        readonly heart: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Like, appreciation, positive";
            readonly usage: "Engagement actions";
        };
        readonly share: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Share content, spread, viral";
            readonly usage: "Content sharing";
        };
        readonly atSign: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Mentions, direct attention";
            readonly usage: "Social addressing";
        };
    };
    readonly tools: {
        readonly wrench: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Tools, building, creation";
            readonly usage: "Tool-building features";
        };
        readonly code: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Programming, development, tech";
            readonly usage: "Developer tools";
        };
        readonly laptop: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Computing, work, productivity";
            readonly usage: "Tech context";
        };
        readonly lightbulb: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Ideas, innovation, creativity";
            readonly usage: "Creative features";
        };
        readonly zap: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Quick, powerful, energy";
            readonly usage: "Fast actions";
        };
    };
    readonly status: {
        readonly check: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Success, completed, correct";
            readonly usage: "Success states";
        };
        readonly checkCircle: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Confirmed success, positive";
            readonly usage: "Success feedback";
        };
        readonly xCircle: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Error, failure, negative";
            readonly usage: "Error states";
        };
        readonly alertTriangle: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Warning, caution, attention";
            readonly usage: "Warning states";
        };
        readonly info: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Information, help, context";
            readonly usage: "Informational content";
        };
        readonly loader: {
            readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
            readonly meaning: "Loading, processing, wait";
            readonly usage: "Loading states";
        };
    };
};
export declare const iconUsagePatterns: {
    readonly buttons: {
        readonly leading: "mr-2 inline-flex items-center";
        readonly trailing: "ml-2 inline-flex items-center";
        readonly iconOnly: "p-2 flex items-center justify-center";
        readonly stacked: "flex flex-col items-center gap-1";
    };
    readonly cards: {
        readonly header: "mb-2 text-[var(--hive-gold-primary)]";
        readonly title: "mr-2 inline-flex items-center";
        readonly corner: "absolute top-4 right-4";
        readonly feature: "mx-auto mb-4 text-[var(--hive-gold-primary)]";
    };
    readonly navigation: {
        readonly tab: "mb-1 mx-auto";
        readonly sidebar: "mr-3 flex-shrink-0";
        readonly breadcrumb: "mx-2 text-[var(--hive-text-muted)]";
        readonly menuItem: "mr-3 text-[var(--hive-text-secondary)]";
    };
    readonly status: {
        readonly inline: "mr-1 inline-flex items-center";
        readonly badge: "absolute -top-1 -right-1";
        readonly alert: "mr-2 flex-shrink-0";
        readonly loading: "animate-spin";
    };
};
export declare const iconColorPatterns: {
    readonly semantic: {
        readonly default: "text-[var(--hive-text-secondary)]";
        readonly primary: "text-[var(--hive-text-primary)]";
        readonly brand: "text-[var(--hive-gold-primary)]";
        readonly success: "text-[var(--hive-success-primary)]";
        readonly warning: "text-[var(--hive-warning-primary)]";
        readonly error: "text-[var(--hive-error-primary)]";
        readonly info: "text-[var(--hive-info-primary)]";
        readonly muted: "text-[var(--hive-text-muted)]";
    };
    readonly interactive: {
        readonly idle: "text-[var(--hive-text-secondary)] transition-colors duration-200";
        readonly hover: "hover:text-[var(--hive-text-primary)] transition-colors duration-200";
        readonly active: "text-[var(--hive-gold-primary)]";
        readonly disabled: "text-[var(--hive-text-placeholder)] opacity-50";
    };
    readonly campus: {
        readonly academic: "text-[var(--hive-info-primary)]";
        readonly social: "text-[var(--hive-gold-primary)]";
        readonly tools: "text-[var(--hive-success-primary)]";
        readonly events: "text-[var(--hive-warning-primary)]";
        readonly location: "text-[var(--hive-text-secondary)]";
    };
};
export declare const iconAccessibility: {
    readonly ariaLabels: {
        readonly decorative: {
            readonly 'aria-hidden': "true";
        };
        readonly informative: {
            readonly 'aria-label': "Description of icon meaning";
        };
        readonly interactive: {
            readonly 'aria-label': "Action that will be performed";
        };
    };
    readonly screenReader: {
        readonly decorative: "aria-hidden=\"true\"";
        readonly informative: "Add descriptive aria-label";
        readonly interactive: "Use aria-label for button/link action";
    };
    readonly highContrast: {
        readonly ensure: "Icons maintain visibility in high contrast mode";
        readonly stroke: "Use stroke-based icons for better contrast";
        readonly size: "Minimum 16px for readability";
    };
};
export declare const campusIconCombinations: {
    readonly studyGroup: {
        readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
        readonly meaning: "Study groups, academic collaboration";
        readonly usage: "Group study features";
    };
    readonly campusEvent: {
        readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
        readonly meaning: "Campus events with location and attendees";
        readonly usage: "Event listings";
    };
    readonly toolSharing: {
        readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
        readonly meaning: "Shared tools within community";
        readonly usage: "Tool marketplace";
    };
    readonly classSchedule: {
        readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
        readonly meaning: "Class timing and location";
        readonly usage: "Academic scheduling";
    };
    readonly campusDirectory: {
        readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
        readonly meaning: "Finding locations on campus";
        readonly usage: "Campus navigation";
    };
};
export declare const iconPerformance: {
    readonly loading: {
        readonly preload: "Common navigation icons";
        readonly lazy: "Feature-specific icons";
        readonly bundle: "Tree-shake unused icons";
    };
    readonly rendering: {
        readonly svg: "Use SVG for scalability and performance";
        readonly caching: "Browser cache icon sprites";
        readonly compression: "Optimize SVG paths";
    };
    readonly memory: {
        readonly reuse: "Same icon instances across components";
        readonly cleanup: "Remove unused icon imports";
        readonly sizing: "CSS classes instead of inline styles";
    };
};
export declare const iconComposition: {
    readonly principles: {
        readonly philosophy: "Icons communicate campus context instantly and universally";
        readonly rules: readonly ["Lucide-first: Use comprehensive Lucide library for consistency", "Campus context: Icons reflect university social and academic life", "Systematic sizing: Mathematical scale aligned with typography", "Accessible design: Clear at all sizes, screen reader compatible"];
    };
    readonly sizes: {
        readonly micro: {
            readonly size: 12;
            readonly className: "w-3 h-3";
            readonly use: "Inline text indicators, micro badges, tight spaces";
            readonly examples: "Status dots, notification counts, inline arrows";
        };
        readonly small: {
            readonly size: 16;
            readonly className: "w-4 h-4";
            readonly use: "Body text inline, small buttons, form inputs";
            readonly examples: "Search icons, input validation, small buttons";
        };
        readonly base: {
            readonly size: 20;
            readonly className: "w-5 h-5";
            readonly use: "Standard UI elements, navigation, cards";
            readonly examples: "Navigation items, card actions, standard buttons";
        };
        readonly large: {
            readonly size: 24;
            readonly className: "w-6 h-6";
            readonly use: "Headers, prominent actions, feature icons";
            readonly examples: "Page headers, CTA buttons, feature highlights";
        };
        readonly xl: {
            readonly size: 32;
            readonly className: "w-8 h-8";
            readonly use: "Hero sections, empty states, major features";
            readonly examples: "Empty state graphics, hero icons, major CTAs";
        };
        readonly hero: {
            readonly size: 48;
            readonly className: "w-12 h-12";
            readonly use: "Landing pages, onboarding, major visual elements";
            readonly examples: "Onboarding steps, landing sections, major features";
        };
    };
    readonly categories: {
        readonly navigation: {
            readonly home: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Dashboard, main feed";
                readonly usage: "Primary navigation";
            };
            readonly menu: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Menu toggle, options";
                readonly usage: "Mobile navigation";
            };
            readonly search: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Find content, users, spaces";
                readonly usage: "Search interfaces";
            };
            readonly settings: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Preferences, configuration";
                readonly usage: "Settings pages";
            };
            readonly user: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Profile, account";
                readonly usage: "User-related actions";
            };
        };
        readonly academic: {
            readonly book: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Courses, reading, study";
                readonly usage: "Academic content";
            };
            readonly graduation: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Education, achievements";
                readonly usage: "Academic progress";
            };
            readonly school: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Institution, campus";
                readonly usage: "University context";
            };
            readonly library: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Resources, quiet study";
                readonly usage: "Study spaces";
            };
            readonly calculator: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Math, calculations, tools";
                readonly usage: "Academic tools";
            };
        };
        readonly campus: {
            readonly calendar: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Events, scheduling, planning";
                readonly usage: "Time-based content";
            };
            readonly clock: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Time, deadlines, duration";
                readonly usage: "Temporal information";
            };
            readonly mapPin: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Location, places, directions";
                readonly usage: "Location-based features";
            };
            readonly building: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Campus buildings, facilities";
                readonly usage: "Location references";
            };
            readonly coffee: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Social spaces, breaks, casual";
                readonly usage: "Social gathering";
            };
            readonly wifi: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Connectivity, internet, tech";
                readonly usage: "Technical features";
            };
        };
        readonly social: {
            readonly users: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Groups, community, membership";
                readonly usage: "Group/space indicators";
            };
            readonly userPlus: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Invite, add member, connect";
                readonly usage: "Social actions";
            };
            readonly messageCircle: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Chat, discussion, communication";
                readonly usage: "Communication features";
            };
            readonly heart: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Like, appreciation, positive";
                readonly usage: "Engagement actions";
            };
            readonly share: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Share content, spread, viral";
                readonly usage: "Content sharing";
            };
            readonly atSign: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Mentions, direct attention";
                readonly usage: "Social addressing";
            };
        };
        readonly tools: {
            readonly wrench: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Tools, building, creation";
                readonly usage: "Tool-building features";
            };
            readonly code: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Programming, development, tech";
                readonly usage: "Developer tools";
            };
            readonly laptop: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Computing, work, productivity";
                readonly usage: "Tech context";
            };
            readonly lightbulb: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Ideas, innovation, creativity";
                readonly usage: "Creative features";
            };
            readonly zap: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Quick, powerful, energy";
                readonly usage: "Fast actions";
            };
        };
        readonly status: {
            readonly check: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Success, completed, correct";
                readonly usage: "Success states";
            };
            readonly checkCircle: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Confirmed success, positive";
                readonly usage: "Success feedback";
            };
            readonly xCircle: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Error, failure, negative";
                readonly usage: "Error states";
            };
            readonly alertTriangle: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Warning, caution, attention";
                readonly usage: "Warning states";
            };
            readonly info: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Information, help, context";
                readonly usage: "Informational content";
            };
            readonly loader: {
                readonly icon: import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
                readonly meaning: "Loading, processing, wait";
                readonly usage: "Loading states";
            };
        };
    };
    readonly usage: {
        readonly buttons: {
            readonly leading: "mr-2 inline-flex items-center";
            readonly trailing: "ml-2 inline-flex items-center";
            readonly iconOnly: "p-2 flex items-center justify-center";
            readonly stacked: "flex flex-col items-center gap-1";
        };
        readonly cards: {
            readonly header: "mb-2 text-[var(--hive-gold-primary)]";
            readonly title: "mr-2 inline-flex items-center";
            readonly corner: "absolute top-4 right-4";
            readonly feature: "mx-auto mb-4 text-[var(--hive-gold-primary)]";
        };
        readonly navigation: {
            readonly tab: "mb-1 mx-auto";
            readonly sidebar: "mr-3 flex-shrink-0";
            readonly breadcrumb: "mx-2 text-[var(--hive-text-muted)]";
            readonly menuItem: "mr-3 text-[var(--hive-text-secondary)]";
        };
        readonly status: {
            readonly inline: "mr-1 inline-flex items-center";
            readonly badge: "absolute -top-1 -right-1";
            readonly alert: "mr-2 flex-shrink-0";
            readonly loading: "animate-spin";
        };
    };
    readonly colors: {
        readonly semantic: {
            readonly default: "text-[var(--hive-text-secondary)]";
            readonly primary: "text-[var(--hive-text-primary)]";
            readonly brand: "text-[var(--hive-gold-primary)]";
            readonly success: "text-[var(--hive-success-primary)]";
            readonly warning: "text-[var(--hive-warning-primary)]";
            readonly error: "text-[var(--hive-error-primary)]";
            readonly info: "text-[var(--hive-info-primary)]";
            readonly muted: "text-[var(--hive-text-muted)]";
        };
        readonly interactive: {
            readonly idle: "text-[var(--hive-text-secondary)] transition-colors duration-200";
            readonly hover: "hover:text-[var(--hive-text-primary)] transition-colors duration-200";
            readonly active: "text-[var(--hive-gold-primary)]";
            readonly disabled: "text-[var(--hive-text-placeholder)] opacity-50";
        };
        readonly campus: {
            readonly academic: "text-[var(--hive-info-primary)]";
            readonly social: "text-[var(--hive-gold-primary)]";
            readonly tools: "text-[var(--hive-success-primary)]";
            readonly events: "text-[var(--hive-warning-primary)]";
            readonly location: "text-[var(--hive-text-secondary)]";
        };
    };
    readonly accessibility: {
        readonly ariaLabels: {
            readonly decorative: {
                readonly 'aria-hidden': "true";
            };
            readonly informative: {
                readonly 'aria-label': "Description of icon meaning";
            };
            readonly interactive: {
                readonly 'aria-label': "Action that will be performed";
            };
        };
        readonly screenReader: {
            readonly decorative: "aria-hidden=\"true\"";
            readonly informative: "Add descriptive aria-label";
            readonly interactive: "Use aria-label for button/link action";
        };
        readonly highContrast: {
            readonly ensure: "Icons maintain visibility in high contrast mode";
            readonly stroke: "Use stroke-based icons for better contrast";
            readonly size: "Minimum 16px for readability";
        };
    };
    readonly combinations: {
        readonly studyGroup: {
            readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
            readonly meaning: "Study groups, academic collaboration";
            readonly usage: "Group study features";
        };
        readonly campusEvent: {
            readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
            readonly meaning: "Campus events with location and attendees";
            readonly usage: "Event listings";
        };
        readonly toolSharing: {
            readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
            readonly meaning: "Shared tools within community";
            readonly usage: "Tool marketplace";
        };
        readonly classSchedule: {
            readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
            readonly meaning: "Class timing and location";
            readonly usage: "Academic scheduling";
        };
        readonly campusDirectory: {
            readonly icons: readonly [import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>, import("react").ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>];
            readonly meaning: "Finding locations on campus";
            readonly usage: "Campus navigation";
        };
    };
    readonly performance: {
        readonly loading: {
            readonly preload: "Common navigation icons";
            readonly lazy: "Feature-specific icons";
            readonly bundle: "Tree-shake unused icons";
        };
        readonly rendering: {
            readonly svg: "Use SVG for scalability and performance";
            readonly caching: "Browser cache icon sprites";
            readonly compression: "Optimize SVG paths";
        };
        readonly memory: {
            readonly reuse: "Same icon instances across components";
            readonly cleanup: "Remove unused icon imports";
            readonly sizing: "CSS classes instead of inline styles";
        };
    };
};
export declare const createIconClass: (size: keyof typeof iconSizes, color?: keyof typeof iconColorPatterns.semantic) => string;
export declare const createInteractiveIconClass: (size: keyof typeof iconSizes) => string;
export declare const createCampusIconClass: (size: keyof typeof iconSizes, context: keyof typeof iconColorPatterns.campus) => string;
export type IconComposition = typeof iconComposition;
export type IconSizes = typeof iconSizes;
export type CampusIconCategories = typeof campusIconCategories;
export type IconUsagePatterns = typeof iconUsagePatterns;
export { Home, Menu, Search, Bell, Settings, User, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Plus, X, Check, AlertCircle, Info, BookOpen, GraduationCap, Calendar, Clock, MapPin, Building, Users, UserPlus, School, Library, Coffee, Wifi, Car, Bus, Bike, MessageCircle, MessageSquare, Send, Heart, Share2, Bookmark, Flag, UserCheck, UserX, AtSign, Hash, Smile, Zap, Star, Award, Trophy, Target, ThumbsUp, Mail, Wrench, Hammer, Code, Laptop, Smartphone, Tablet, Monitor, Keyboard, Mouse, Database, Server, Cloud, Download, Upload, FileText, Folder, Archive, Lightbulb, Calculator, Compass, Camera, Mic, Volume2, VolumeX, Lock, Unlock, Eye, EyeOff, Trash2, Edit3, Copy, ExternalLink, MoreVertical, Crown, CheckCircle, XCircle, AlertTriangle, HelpCircle, Loader2, RefreshCw, TrendingUp, TrendingDown, BarChart3, PieChart, Activity };
//# sourceMappingURL=icon-composition.d.ts.map