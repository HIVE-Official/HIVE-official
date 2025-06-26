// Export basic UI components
export { Avatar, AvatarFallback, AvatarImage } from "./components/avatar";
export { Badge } from "./components/badge";
export { Button } from "./components/button";
export { Input } from "./components/input";
export { Label } from "./components/label";
export { Progress } from "./components/progress";

// Export card components from the main components directory (not ui subdirectory)
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/card';

// Export layout components
export { AppHeader } from "./components/AppHeader";
export { BottomNavBar } from "./components/BottomNavBar";
export { HiveLogo } from "./components/HiveLogo";

// Export authentication components
export * from "./components/auth";

// Export onboarding components
export * from "./components/onboarding";

// Export utilities
export * from "./lib/utils";