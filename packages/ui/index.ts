// Layout Components
export { Box } from "./src/components/box";
export { Stack } from "./src/components/stack";
export { Grid } from "./src/components/grid";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./src/components/ui/card";

// Form Components
export { Button } from "./src/components/ui/button";
export { Input } from "./src/components/ui/input";
export { Textarea } from "./src/components/ui/textarea";
export { Label } from "./src/components/label";
export { WaitlistForm } from "./src/components/waitlist-form";
export { Switch } from "./src/components/ui/switch";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "./src/components/ui/avatar";

// UI Elements
export { Alert, AlertTitle, AlertDescription } from "./src/components/alert";
export { Badge } from "./src/components/ui/badge";
export { Progress } from "./src/components/progress";
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./src/components/ui/tabs";
export { ScrollArea } from "./src/components/ui/scroll-area";
export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./src/components/ui/resizable";

// Typography & UI Elements (exported from ui/typography via components/index.ts)

// Creator Components
export {
  ElementPicker,
  ElementCard,
} from "./src/components/creator/ElementPicker";
export type {
  ElementPickerProps,
  ElementCardProps,
} from "./src/components/creator/ElementPicker";
export {
  ToolBuilder,
  DesignCanvas,
  ElementLibrary,
} from "./src/components/creator/ToolBuilder";
export type {
  CanvasState,
  DragData,
  ElementInstance,
  ToolBuilderCanvasProps,
  ElementInstanceProps,
} from "./src/components/creator/ToolBuilder";
export {
  getAllElementConfigSchemas,
  getElementConfigSchema,
} from "./src/components/creator/ElementConfig";
export type {
  PropertyInputProps,
  PropertySchema,
  ElementConfigSchema,
} from "./src/components/creator/ElementConfig";

// Welcome Components
export {
  WelcomeMat,
  useWelcomeMat,
} from "./src/components/welcome/welcome-mat";

// Social Components
export { PostCard } from "./src/components/post-card";
export { SpaceCard } from "./src/components/space-card";

// Theme Provider
export { ThemeProvider } from "./src/components/theme-provider";

// Framer Motion Proxy
export {
  MotionDiv,
  AnimatePresence,
} from "./src/components/framer-motion-proxy";

// New exports
export { Slider } from "./src/components/ui/slider";
export { Separator } from "./src/components/ui/separator";
