// This file will export our UI components
export { Avatar, AvatarFallback, AvatarImage } from "./components/avatar";
export { Badge } from "./components/badge";
export { Button } from "./components/button";
export { Input } from "./components/input";
export { Label } from "./components/label";
export { Progress } from "./components/progress";

// Export complex/multi-file components from their own barrels
export * from "./components/auth";
export * from "./components/onboarding";
export * from "./components/onboarding/onboarding-complete-step";
export * from "./lib/utils";
export * from "./components/AppHeader";
export * from "./components/BottomNavBar";
export * from "./components/HiveLogo";

// Card Components
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'

// Button Component is already exported above 