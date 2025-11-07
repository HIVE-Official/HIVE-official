'use client';

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

// Re-export all commonly used lucide-react icons
// Icon naming convention: {Name}Icon to avoid conflicts
export {
  // Navigation
  Home as HomeIcon,
  Compass as CompassIcon,
  Users as UsersIcon,
  User as UserIcon,
  Bell as BellIcon,
  MessageCircle as MessageCircleIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,

  // Actions
  Plus as PlusIcon,
  X as XIcon,
  Check as LucideCheck,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreVertical as MoreVerticalIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Share as ShareIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,

  // Social & Engagement
  Heart as HeartIcon,
  MessageSquare as MessageSquareIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  Bookmark as BookmarkIcon,
  Flag as FlagIcon,

  // Content Types
  Image as ImageIcon,
  Video as VideoIcon,
  Music as MusicIcon,
  File as FileIcon,
  FileText as FileTextIcon,
  Link as LinkIcon,
  Paperclip as PaperclipIcon,

  // Time & Calendar
  Calendar as CalendarIcon,
  CalendarDays as CalendarDaysIcon,
  Clock as ClockIcon,
  Timer as TimerIcon,

  // Location & Campus
  MapPin as MapPinIcon,
  Map as MapIcon,
  Building as BuildingIcon,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,

  // Status & Indicators
  Loader2 as LoaderIcon,
  Sparkles as SparklesIcon,
  TrendingUp as TrendingUpIcon,
  Activity as ActivityIcon,
  Zap as ZapIcon,
  Crown as CrownIcon,
  Shield as ShieldIcon,
  BadgeCheck as BadgeCheckIcon,
  AlertCircle as AlertCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  CheckCircle as CheckCircleIcon,

  // Tools & Utilities
  Wrench as WrenchIcon,
  PenTool as ToolIcon,
  Hammer as HammerIcon,
  Code as CodeIcon,
  Terminal as TerminalIcon,
  Megaphone as MegaphoneIcon,

  // Media Controls
  Play as PlayIcon,
  Pause as PauseIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Volume2 as VolumeIcon,
  VolumeX as MuteIcon,

  // Organization
  Hash as HashIcon,
  Pin as PinIcon,
  Filter as FilterIcon,
  SortAsc as SortAscIcon,
  SortDesc as SortDescIcon,

  // Communication
  Mail as MailIcon,
  Send as SendIcon,
  Inbox as InboxIcon,
  BellRing as BellRingIcon,

  // Security & Privacy
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Shield as ShieldIcon2,

  // Misc
  Trash as TrashIcon,
  Edit as EditIcon,
  Copy as CopyIcon,
  ExternalLink as ExternalLinkIcon,
  RefreshCw as RefreshIcon,
  Camera as CameraIcon,
  Mic as MicIcon,
} from 'lucide-react';

// Export icon size constants
export const ICON_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
} as const;

// Export common icon class patterns
export const ICON_STYLES = {
  primary: 'text-[var(--hive-text-primary)]',
  secondary: 'text-[var(--hive-text-secondary)]',
  tertiary: 'text-[var(--hive-text-tertiary)]',
  brand: 'text-[var(--hive-brand-primary)]',
  success: 'text-[var(--hive-status-success)]',
  error: 'text-[var(--hive-status-error)]',
  warning: 'text-[var(--hive-status-warning)]',
} as const;

/**
 * Helper to get icon class with size and color
 *
 * @example
 * ```tsx
 * <HomeIcon className={getIconClass('md', 'primary')} />
 * // Returns: "h-5 w-5 text-[var(--hive-text-primary)]"
 * ```
 */
export function getIconClass(
  size: keyof typeof ICON_SIZES = 'md',
  style: keyof typeof ICON_STYLES = 'primary'
): string {
  return `${ICON_SIZES[size]} ${ICON_STYLES[style]}`;
}
