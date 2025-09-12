#!/bin/bash

echo "🔧 Final fixes for packages/ui build errors..."

cd /Users/laneyfraass/hive_ui/packages/ui

# Fix complete-hive-tools-system.tsx
echo "Fixing complete-hive-tools-system.tsx..."
sed -i '' 's/as unknown/as string/g' src/atomic/organisms/complete-hive-tools-system.tsx
sed -i '' 's/onChange={(e: React.ChangeEvent<HTMLSelectElement>)/onChange={(e: React.ChangeEvent<HTMLInputElement>)/g' src/atomic/organisms/complete-hive-tools-system.tsx

# Fix hive-posts-surface.tsx
echo "Fixing hive-posts-surface.tsx..."
sed -i '' 's/setFilterType(e.target.value as unknown)/setFilterType(e.target.value as "all" | "discussion" | "coordination")/g' src/atomic/organisms/hive-posts-surface.tsx

# Fix ritual-calendar.tsx
echo "Fixing ritual-calendar.tsx..."
sed -i '' 's/setViewMode(e.target.value as unknown)/setViewMode(e.target.value as "list" | "month" | "week" | "day")/g' src/atomic/organisms/ritual-calendar.tsx

# Fix ritual-discover-workflow.tsx
echo "Fixing ritual-discover-workflow.tsx..."
sed -i '' 's/onChange={(e: React.ChangeEvent<HTMLSelectElement>)/onChange={(e: React.ChangeEvent<HTMLInputElement>)/g' src/atomic/organisms/ritual-discover-workflow.tsx
sed -i '' 's/handleStepComplete = (data: unknown)/handleStepComplete = (data: Record<string, unknown>)/g' src/atomic/organisms/ritual-discover-workflow.tsx
sed -i '' 's/setJoinedSpaces(data.selectedSpaces)/setJoinedSpaces((data as { selectedSpaces: string[] }).selectedSpaces)/g' src/atomic/organisms/ritual-discover-workflow.tsx

# Fix ritual-participation-tracker.tsx
echo "Fixing ritual-participation-tracker.tsx..."
sed -i '' 's/setActiveTab(e.target.value as unknown)/setActiveTab(e.target.value as "progress" | "actions" | "achievements" | "milestones")/g' src/atomic/organisms/ritual-participation-tracker.tsx

# Fix study-group-matcher.tsx
echo "Fixing study-group-matcher.tsx..."
sed -i '' 's/setActiveTab(value as unknown)/setActiveTab(value as "create" | "discover" | "groups")/g' src/atomic/organisms/study-group-matcher.tsx

# Fix use-space-live-updates.ts
echo "Fixing use-space-live-updates.ts..."
sed -i '' 's/\(p\|e\|m\) as unknown/(p as SpacePost)/g' src/hooks/use-space-live-updates.ts
sed -i '' 's/\(p\|e\|m\) as unknown/(e as SpaceEvent)/g' src/hooks/use-space-live-updates.ts
sed -i '' 's/\(p\|e\|m\) as unknown/(m as SpaceMember)/g' src/hooks/use-space-live-updates.ts

# Fix api-client.ts
echo "Fixing api-client.ts..."
sed -i '' 's/space as unknown/space as Space/g' src/lib/api-client.ts
sed -i '' 's/error as unknown/error as Error/g' src/lib/api-client.ts

# Fix component-foundation.ts
echo "Fixing component-foundation.ts..."
sed -i '' 's/as unknown/as ClassValue/g' src/lib/component-foundation.ts

# Fix mobile files
echo "Fixing mobile utility files..."
sed -i '' 's/error as unknown/error as Error/g' src/utils/mobile-native-features.ts
sed -i '' 's/as unknown/as any/g' src/utils/mobile-native-features.ts
sed -i '' 's/as unknown/as any/g' src/utils/mobile-performance.ts
sed -i '' 's/as unknown/as any/g' src/utils/mobile-service-worker.ts
sed -i '' 's/as unknown/as any/g' src/utils/mobile-testing.ts

echo "✅ Applied final build fixes"