#!/bin/bash

echo "🔧 Fixing admin app errors - removing unused imports and prefixing unused variables"

# Fix feature-flag-dashboard.tsx
echo "Fixing feature-flag-dashboard.tsx..."
sed -i '' '/^[[:space:]]*const getStatusColor = /,/^[[:space:]]*};$/d' apps/admin/src/components/feature-flag-dashboard.tsx
sed -i '' '/^[[:space:]]*const getTypeIcon = /,/^[[:space:]]*};$/d' apps/admin/src/components/feature-flag-dashboard.tsx
sed -i '' 's/onUpdated/_onUpdated/g' apps/admin/src/components/feature-flag-dashboard.tsx

# Fix platform-config-manager.tsx
echo "Fixing platform-config-manager.tsx..."
# Remove unused imports
sed -i '' '/^[[:space:]]*Switch,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*DialogTrigger,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*Tabs,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*TabsContent,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*TabsList,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*TabsTrigger,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*Separator,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*RotateCcw,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*Users,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*MessageSquare,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*Image,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*Clock,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*Globe,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*Unlock,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*EyeOff,$/d' apps/admin/src/components/platform-config-manager.tsx
sed -i '' '/^[[:space:]]*AlertCircle,$/d' apps/admin/src/components/platform-config-manager.tsx

# Fix showCreateDialog variable
sed -i '' 's/const \[showCreateDialog,/const [_showCreateDialog,/' apps/admin/src/components/platform-config-manager.tsx

# Remove getConfigIcon function
sed -i '' '/^[[:space:]]*const getConfigIcon = /,/^[[:space:]]*};$/d' apps/admin/src/components/platform-config-manager.tsx

# Fix onEdit parameter
sed -i '' 's/onEdit/_onEdit/g' apps/admin/src/components/platform-config-manager.tsx

# Fix platform-health-monitor.tsx
echo "Fixing platform-health-monitor.tsx..."
# Remove unused imports
sed -i '' 's/, useCallback//g' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Activity,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Clock,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Database,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Server,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Zap,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Wifi,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*HardDrive,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Cpu,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*MemoryStick,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Globe,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Shield,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Eye,$/d' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' '/^[[:space:]]*Settings,$/d' apps/admin/src/components/platform-health-monitor.tsx

# Remove unused Firebase imports
sed -i '' 's/import { collection, onSnapshot, query, orderBy, limit, where } from "firebase\/firestore";/import {} from "firebase\/firestore";/g' apps/admin/src/components/platform-health-monitor.tsx
sed -i '' 's/import { db } from "@\/lib\/firebase";/\/\/ import { db } from "@\/lib\/firebase";/g' apps/admin/src/components/platform-health-monitor.tsx

# Fix tool-approval-system.tsx
echo "Fixing tool-approval-system.tsx..."
sed -i '' '/^[[:space:]]*Alert,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*AlertDescription,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Separator,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Plus,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Filter,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Globe,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*MessageSquare,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Star,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Users,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Pause,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Flag,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*ThumbsUp,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*ThumbsDown,$/d' apps/admin/src/components/tool-approval-system.tsx
sed -i '' '/^[[:space:]]*Send,$/d' apps/admin/src/components/tool-approval-system.tsx

echo "✅ Admin errors fixed!"