// Import and export styles for side effects
import "./styles/index.css";

// Export basic UI components
export { Avatar, AvatarFallback, AvatarImage } from "./components/avatar";
export { Badge } from "./components/badge";
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "./components/button";
export { Dialog } from "./components/dialog";
export { Input } from "./components/input";
export { Label } from "./components/label";
export { Link, type LinkProps } from "./components/ui/link";
export { Progress } from "./components/progress";
export { Checkbox } from "./components/checkbox";
export { RadioGroup, RadioGroupItem } from "./components/radio-group";
export { Switch } from "./components/switch";
export { Textarea } from "./components/textarea";
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
} from "./components/select";
export { Skeleton } from "./components/skeleton";
export { Countdown } from "./components/countdown";

// Export loading components
export {
  LoadingSpinner,
  PageLoader,
  InlineLoader,
  CardLoader,
} from "./components/loading-spinner";

// Export typography components
export {
  Typography,
  Heading,
  Text,
  Caption,
  Code,
  type TypographyProps,
  type TypographyVariant,
  type TypographyAlign,
  type TypographyWeight,
} from "./components/typography";

// Export card components from the main components directory (not ui subdirectory)
export {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./components/card";

// Export layout components
export { AppHeader } from "./components/AppHeader";
export { BottomNavBar } from "./components/BottomNavBar";
export { HiveLogo } from "./components/HiveLogo";
export { WelcomeMat, useWelcomeMat } from "./components/welcome-mat";

// Export toast components
export { ToastProvider, useToast } from "./components/toast-provider";
export { Toast } from "./components/toast";

// Export authentication components
export * from "./components/auth";
export { DevModePanel } from "./components/auth/dev-mode-panel";

// Export onboarding components
// WelcomeStep removed - going directly to step 1
export { ProgressIndicator } from "./components/onboarding/progress-indicator";
export { OnboardingLayout } from "./components/onboarding/onboarding-layout";
export * from "./components/onboarding";

// Onboarding step components
export { RoleSelection } from "./components/onboarding/steps/role-selection";
export { SpaceClaiming } from "./components/onboarding/steps/space-claiming";
export { SuggestedSpaces } from "./components/onboarding/steps/suggested-spaces";

// Export spaces components
export { SpaceRequestForm } from "./components/spaces/space-request-form";

// Export landing page components - TEMPORARILY DISABLED - uses motion
// export * from "./components/landing";

// Export page transition components - TEMPORARILY DISABLED - uses motion
// export * from "./components/page-transition";

// Export utilities
export * from "./lib/utils";

// Export motion utilities
export { MotionProvider, MotionDiv, MotionSpan, MotionButton } from "./components/motion-wrapper";
export { hiveVariants, hiveTransitions } from "./lib/motion";

// Export Storybook-specific utilities
export { StorybookThemeProvider } from "./components/ui/storybook-theme-provider";

// Export profile components
export { BentoGrid, type BentoCard } from "./components/profile/bento-grid";
export { BentoProfileDashboard } from "./components/profile/bento-profile-dashboard";
export { ProfileHeaderCard } from "./components/profile/profile-header-card";
export { HiveLabCard } from "./components/profile/hivelab-card";
export { ToolsCard } from "./components/profile/tools-card";
export { CalendarCard } from "./components/profile/calendar-card";
export { GhostModeCard } from "./components/profile/ghost-mode-card";
