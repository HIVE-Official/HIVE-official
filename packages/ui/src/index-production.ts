// === PRODUCTION-OPTIMIZED HIVE UI EXPORTS ===
// Tree-shakeable exports for optimal bundle size in production

import React from 'react';

// === CORE ATOMIC COMPONENTS (Most Used) ===
export { ButtonEnhanced as Button, type ButtonProps, ButtonGroup, IconButton } from './atomic/atoms/button-enhanced';
export { InputEnhanced as Input, type InputProps } from './atomic/atoms/input-enhanced';
export { TextareaEnhanced as Textarea, type TextareaProps } from './atomic/atoms/textarea-enhanced';
export { Text, type TextProps } from './atomic/atoms/text';
export { Badge } from './atomic/atoms/badge';
export { Avatar, AvatarImage, AvatarFallback } from './atomic/atoms/avatar';

// === LAYOUT COMPONENTS ===
export { Container, PageContainer } from './atomic/atoms/container';
export { Grid } from './components/Grid';
export { Stack } from './components/Stack';

// === CARD SYSTEM ===
export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './atomic/ui/card';

// === FORM SYSTEM ===
export { FormField } from './atomic/molecules/form-field';
export { Label } from './atomic/atoms/label';

// === NAVIGATION ===
export { Tabs, TabsContent, TabsList, TabsTrigger } from './atomic/ui/tabs';
export { AppHeader } from './components/AppHeader';
export { BottomNavBar } from './components/BottomNavBar';

// === UTILITIES & CONTEXTS (Essential) ===
export { cn } from './lib/utils';
export { logger } from './lib/logger';
export { FirebaseAuthProvider as AuthProvider, useFirebaseAuth as useAuth } from './contexts/unified-auth-context';

// === MOTION SYSTEM (Light) ===
export { hiveVariants } from './lib/motion';

// === MODAL SYSTEM ===
export { HiveModal as Modal } from './components/hive-modal';

// === PROGRESSIVE LOADING EXPORTS ===
// These are loaded on-demand to reduce initial bundle size
export type { ProfileDashboardProps } from './atomic/organisms/profile-dashboard';
export type { CampusIdentityHeaderProps } from './atomic/molecules/campus-identity-header';
export type { CampusSpacesCardProps } from './atomic/molecules/campus-spaces-card';

// === LAZY LOADED COMPONENTS ===
// Use dynamic imports for these heavy components
export const LazyProfileDashboard = React.lazy(() => 
  import('./atomic/organisms/profile-dashboard').then(mod => ({ default: mod.ProfileDashboard }))
);

export const LazyCampusIdentityHeader = React.lazy(() => 
  import('./atomic/molecules/campus-identity-header').then(mod => ({ default: mod.CampusIdentityHeader }))
);

export const LazyCampusSpacesCard = React.lazy(() => 
  import('./atomic/molecules/campus-spaces-card').then(mod => ({ default: mod.CampusSpacesCard }))
);

// CompleteHIVEToolsSystem - Available when needed
// export const LazyCompleteHIVEToolsSystem = React.lazy(() => 
//   import('./atomic/organisms/complete-hive-tools-system').then(mod => ({ default: mod.CompleteHIVEToolsSystem }))
// );

// === ACCESSIBILITY UTILITIES ===
export { 
  getInteractiveA11yProps,
  getFormA11yProps, 
  getLiveRegionProps,
  getModalA11yProps,
  focusStyles,
  screenReader
} from './lib/accessibility-foundation';

// === MOBILE HOOKS ===
export { 
  useHapticFeedback,
  useSwipeGestures,
  usePullToRefresh,
  useLongPress,
  useMobileViewport
} from './hooks/use-mobile-interactions';

// === PERFORMANCE OPTIMIZED BUNDLE ===
// This file provides the minimal set of exports needed for most use cases
// Heavy components are lazy-loaded to improve initial bundle size