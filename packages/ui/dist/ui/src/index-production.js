// === PRODUCTION-OPTIMIZED HIVE UI EXPORTS ===
// Tree-shakeable exports for optimal bundle size in production
import React from 'react';
// === CORE ATOMIC COMPONENTS (Most Used) ===
export { ButtonEnhanced as Button, ButtonGroup, IconButton } from './atomic/atoms/button-enhanced.js';
export { InputEnhanced as Input } from './atomic/atoms/input-enhanced.js';
export { TextareaEnhanced as Textarea } from './atomic/atoms/textarea-enhanced.js';
export { Text } from './atomic/atoms/text.js';
export { Badge } from './atomic/atoms/badge.js';
export { Avatar, AvatarImage, AvatarFallback } from './atomic/atoms/avatar.js';
// === LAYOUT COMPONENTS ===
export { Container, PageContainer } from './atomic/atoms/container.js';
export { Grid } from './components/Grid.js';
export { Stack } from './components/Stack.js';
// === CARD SYSTEM ===
export { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './atomic/ui/card.js';
// === FORM SYSTEM ===
export { FormField } from './atomic/molecules/form-field.js';
export { Label } from './atomic/atoms/label.js';
// === NAVIGATION ===
export { Tabs, TabsContent, TabsList, TabsTrigger } from './atomic/ui/tabs.js';
export { AppHeader } from './components/AppHeader.js';
export { BottomNavBar } from './components/BottomNavBar.js';
// === UTILITIES & CONTEXTS (Essential) ===
export { cn } from './lib/utils.js';
export { logger } from './lib/logger.js';
export { FirebaseAuthProvider as AuthProvider, useFirebaseAuth as useAuth } from './contexts/unified-auth-context.js';
// === MOTION SYSTEM (Light) ===
export { hiveVariants } from './lib/motion.js';
// === MODAL SYSTEM ===
export { HiveModal as Modal } from './components/hive-modal.js';
// === LAZY LOADED COMPONENTS ===
// Use dynamic imports for these heavy components
export const LazyProfileDashboard = React.lazy(() => import('./atomic/organisms/profile-dashboard').then(mod => ({ default: mod.ProfileDashboard })));
export const LazyCampusIdentityHeader = React.lazy(() => import('./atomic/molecules/campus-identity-header').then(mod => ({ default: mod.CampusIdentityHeader })));
export const LazyCampusSpacesCard = React.lazy(() => import('./atomic/molecules/campus-spaces-card').then(mod => ({ default: mod.CampusSpacesCard })));
// CompleteHIVEToolsSystem - Available when needed
// export const LazyCompleteHIVEToolsSystem = React.lazy(() => 
//   import('./atomic/organisms/complete-hive-tools-system').then(mod => ({ default: mod.CompleteHIVEToolsSystem }))
// );
// === ACCESSIBILITY UTILITIES ===
export { getInteractiveA11yProps, getFormA11yProps, getLiveRegionProps, getModalA11yProps, focusStyles, screenReader } from './lib/accessibility-foundation.js';
// === MOBILE HOOKS ===
export { useHapticFeedback, useSwipeGestures, usePullToRefresh, useLongPress, useMobileViewport } from './hooks/use-mobile-interactions.js';
// === PERFORMANCE OPTIMIZED BUNDLE ===
// This file provides the minimal set of exports needed for most use cases
// Heavy components are lazy-loaded to improve initial bundle size
//# sourceMappingURL=index-production.js.map