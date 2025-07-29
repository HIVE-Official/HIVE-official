// MINIMAL WORKING BUILD - ESSENTIAL COMPONENTS ONLY
// This is a temporary minimal build to get the package working

// === UTILITIES & TYPES ===
export { cn } from "./src/lib/utils";

// === FOUNDATION SYSTEMS ===
export * from "./src/lib/responsive-foundation";
export * from "./src/lib/accessibility-foundation";
export * from "./src/lib/component-foundation";

// === ESSENTIAL COMPONENTS ===
export { PageContainer } from "./src/components/shell/page-container";
export { CalendarCard, adaptSmartCalendarProps } from "./src/components/profile";
export { WelcomeMat, useWelcomeMat } from "./src/components/welcome/welcome-mat";

// === BASIC HIVE COMPONENTS ===
export { HiveButton, HiveButton as Button } from "./src/components/hive-button";
export { HiveInput, HiveInput as Input } from "./src/components/hive-input";
export { HiveCard, HiveCard as Card } from "./src/components/hive-card";
export { HiveBadge, HiveBadge as Badge } from "./src/components/hive-badge";

// === BASIC ATOMS ===
export { 
  Button as AtomicButton, 
  buttonVariants,
} from "./src/atomic/atoms/button-enhanced";

export {
  Input as AtomicInput,
  inputVariants,
} from "./src/atomic/atoms/input-enhanced";

export {
  Switch,
  switchVariants,
} from "./src/atomic/atoms/switch-enhanced";

// === TOOL COMPONENTS (TEMPORARY STUBS) ===
export { 
  ToolMarketplace,
  LiveToolRuntime
} from "./src/components/tools-marketplace-stub";