#!/bin/bash

echo "🔧 Fixing final 31 ESLint errors..."

# Fix jsx property in page.tsx
echo "Fixing JSX property error..."
sed -i '' 's/jsx=/as=/g' apps/web/src/app/page.tsx

# Fix interval const in use-active-users.ts
echo "Fixing interval const..."
sed -i '' 's/let interval =/const interval =/g' apps/web/src/hooks/use-active-users.ts

# Fix case declarations in ToolLibrary.tsx
echo "Fixing case declarations..."
sed -i '' '/case "search":/,/break;/{ s/const searchResults/{ const searchResults/; s/break;/break; }/; }' apps/web/src/components/hivelab/ToolLibrary.tsx

# Add triple-slash references for global types
echo "Adding global type references..."

# Fix api-client.ts
if ! grep -q "/// <reference path" apps/web/src/lib/api-client.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/lib/api-client.ts
fi

# Fix cache-strategy.ts
if ! grep -q "/// <reference path" apps/web/src/lib/cache-strategy.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/lib/cache-strategy.ts
fi

# Fix error-recovery.ts
if ! grep -q "/// <reference path" apps/web/src/lib/error-recovery.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/lib/error-recovery.ts
fi

# Fix use-notifications.ts
if ! grep -q "/// <reference path" apps/web/src/hooks/use-notifications.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/hooks/use-notifications.ts
fi

# Fix fcm-service.ts
if ! grep -q "/// <reference path" apps/web/src/lib/notifications/fcm-service.ts; then
  sed -i '' '1i\
/// <reference path="../../types/global.d.ts" />\
' apps/web/src/lib/notifications/fcm-service.ts
fi

# Fix performance.ts
if ! grep -q "/// <reference path" apps/web/src/lib/performance.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/lib/performance.ts
fi

# Fix production-optimizations.ts
if ! grep -q "/// <reference path" apps/web/src/lib/production-optimizations.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/lib/production-optimizations.ts
fi

# Fix push-notifications.ts
if ! grep -q "/// <reference path" apps/web/src/lib/push-notifications.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/lib/push-notifications.ts
fi

# Fix websocket-client.ts
if ! grep -q "/// <reference path" apps/web/src/lib/websocket-client.ts; then
  sed -i '' '1i\
/// <reference path="../types/global.d.ts" />\
' apps/web/src/lib/websocket-client.ts
fi

# Fix undefined variables in API routes
echo "Fixing undefined variables in API routes..."

# Fix realtime/channels/route.ts
sed -i '' 's/data\./channelData\./g' apps/web/src/app/api/realtime/channels/route.ts

# Fix feed/real-time-feed-manager.tsx
sed -i '' 's/startDate\./eventData.startDate\./g' apps/web/src/components/feed/real-time-feed-manager.tsx

# Fix comment-thread.tsx
sed -i '' 's/createdAt\./commentData.createdAt\./g' apps/web/src/components/posts/comment-thread.tsx

# Fix ritual-participation.ts
sed -i '' 's/nextOccurrence\./ritualData.nextOccurrence\./g' apps/web/src/lib/rituals/ritual-participation.ts

# Fix constant binary expressions
echo "Fixing constant binary expressions..."
sed -i '' 's/("development" || "test")/("development")/g' apps/web/src/lib/api-validation.ts
sed -i '' 's/("development" || "test")/("development")/g' apps/web/src/lib/api-wrapper.ts
sed -i '' 's/("test" || "development")/("test")/g' apps/web/src/lib/push-notifications.ts

# Add missing imports
echo "Adding missing imports..."

# Fix missing Lock import in profile/activity-timeline.tsx
if ! grep -q "import.*Lock" apps/web/src/components/profile/activity-timeline.tsx; then
  sed -i '' '/import.*lucide-react/s/}/& Lock,/' apps/web/src/components/profile/activity-timeline.tsx 2>/dev/null || \
  sed -i '' '1a\
import { Lock } from "lucide-react";
' apps/web/src/components/profile/activity-timeline.tsx
fi

# Fix missing X import in tools/marketplace.tsx
if ! grep -q "import.*X[^a-zA-Z]" apps/web/src/components/tools/marketplace.tsx; then
  sed -i '' '/import.*lucide-react/s/}/& X,/' apps/web/src/components/tools/marketplace.tsx 2>/dev/null || \
  sed -i '' '1a\
import { X } from "lucide-react";
' apps/web/src/components/tools/marketplace.tsx
fi

echo "✅ Fix script complete!"
echo "Running final error check..."

# Count remaining errors
ERROR_COUNT=$(NODE_OPTIONS='--max-old-space-size=8192' pnpm --filter web lint --quiet 2>&1 | grep -c "error" || echo "0")
echo "Remaining errors: $ERROR_COUNT"