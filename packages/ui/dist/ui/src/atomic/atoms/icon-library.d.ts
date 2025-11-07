/**
 * Icon Library - Unified icon system for HIVE
 *
 * Centralized exports from lucide-react to ensure:
 * - Consistent icon usage across all components
 * - Easy import path: `import { HomeIcon, UsersIcon } from '@hive/ui'`
 * - Type safety with consistent naming
 * - Single source of truth for icons
 *
 * Usage:
 * ```tsx
 * import { HomeIcon, UsersIcon, HeartIcon } from '@hive/ui';
 *
 * <HomeIcon className="h-5 w-5 text-[var(--hive-text-primary)]" />
 * ```
 */
export { Home as HomeIcon, Compass as CompassIcon, Users as UsersIcon, User as UserIcon, Bell as BellIcon, MessageCircle as MessageCircleIcon, Search as SearchIcon, Menu as MenuIcon, Settings as SettingsIcon, Plus as PlusIcon, X as XIcon, Check as CheckIcon, ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, MoreVertical as MoreVerticalIcon, MoreHorizontal as MoreHorizontalIcon, Share as ShareIcon, Upload as UploadIcon, Download as DownloadIcon, Heart as HeartIcon, MessageSquare as MessageSquareIcon, UserPlus as UserPlusIcon, UserMinus as UserMinusIcon, Bookmark as BookmarkIcon, Flag as FlagIcon, Image as ImageIcon, Video as VideoIcon, Music as MusicIcon, File as FileIcon, FileText as FileTextIcon, Link as LinkIcon, Paperclip as PaperclipIcon, Calendar as CalendarIcon, CalendarDays as CalendarDaysIcon, Clock as ClockIcon, Timer as TimerIcon, MapPin as MapPinIcon, Map as MapIcon, Building as BuildingIcon, GraduationCap as GraduationCapIcon, BookOpen as BookOpenIcon, Loader2 as LoaderIcon, Sparkles as SparklesIcon, TrendingUp as TrendingUpIcon, Activity as ActivityIcon, Zap as ZapIcon, Crown as CrownIcon, Shield as ShieldIcon, BadgeCheck as BadgeCheckIcon, AlertCircle as AlertCircleIcon, AlertTriangle as AlertTriangleIcon, Info as InfoIcon, HelpCircle as HelpCircleIcon, CheckCircle as CheckCircleIcon, Wrench as WrenchIcon, PenTool as ToolIcon, Hammer as HammerIcon, Code as CodeIcon, Terminal as TerminalIcon, Megaphone as MegaphoneIcon, Play as PlayIcon, Pause as PauseIcon, Eye as EyeIcon, EyeOff as EyeOffIcon, Volume2 as VolumeIcon, VolumeX as MuteIcon, Hash as HashIcon, Pin as PinIcon, Filter as FilterIcon, SortAsc as SortAscIcon, SortDesc as SortDescIcon, Mail as MailIcon, Send as SendIcon, Inbox as InboxIcon, BellRing as BellRingIcon, Lock as LockIcon, Unlock as UnlockIcon, Shield as ShieldIcon2, Trash as TrashIcon, Edit as EditIcon, Copy as CopyIcon, ExternalLink as ExternalLinkIcon, RefreshCw as RefreshIcon, Camera as CameraIcon, Mic as MicIcon, } from 'lucide-react';
export declare const ICON_SIZES: {
    readonly xs: "h-3 w-3";
    readonly sm: "h-4 w-4";
    readonly md: "h-5 w-5";
    readonly lg: "h-6 w-6";
    readonly xl: "h-8 w-8";
    readonly '2xl': "h-10 w-10";
};
export declare const ICON_STYLES: {
    readonly primary: "text-[var(--hive-text-primary)]";
    readonly secondary: "text-[var(--hive-text-secondary)]";
    readonly tertiary: "text-[var(--hive-text-tertiary)]";
    readonly brand: "text-[var(--hive-brand-primary)]";
    readonly success: "text-[var(--hive-status-success)]";
    readonly error: "text-[var(--hive-status-error)]";
    readonly warning: "text-[var(--hive-status-warning)]";
};
/**
 * Helper to get icon class with size and color
 *
 * @example
 * ```tsx
 * <HomeIcon className={getIconClass('md', 'primary')} />
 * // Returns: "h-5 w-5 text-[var(--hive-text-primary)]"
 * ```
 */
export declare function getIconClass(size?: keyof typeof ICON_SIZES, style?: keyof typeof ICON_STYLES): string;
//# sourceMappingURL=icon-library.d.ts.map