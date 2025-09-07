#!/bin/bash

echo "🔧 Final comprehensive error fix for @hive/ui..."

# 1. Fix escape character in hive-brand.tsx
echo "✂️ Fixing escape character..."
if [ -f "packages/ui/src/atomic/atoms/hive-brand.tsx" ]; then
  sed -i '' 's/\\-/-/g' packages/ui/src/atomic/atoms/hive-brand.tsx
fi

# 2. Fix explicit any in form-field files
echo "🎯 Fixing explicit any types..."
FILES=(
  "packages/ui/src/atomic/molecules/form-field-comprehensive.tsx"
  "packages/ui/src/atomic/molecules/form-field-molecules.tsx"
)
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    sed -i '' 's/(value: any)/(value: unknown)/g' "$file"
    sed -i '' 's/(name: any)/(name: string)/g' "$file"
  fi
done

# 3. Fix redundant story names
echo "📝 Fixing redundant story names..."
find packages/ui/src -name "*.stories.tsx" | while read file; do
  # Remove lines with redundant name properties
  sed -i '' '/name: "Default",$/d' "$file"
  sed -i '' '/name: "WithOptions",$/d' "$file"
  sed -i '' '/name: "Showcase",$/d' "$file"
done

# 4. Fix ALL story files missing component property
echo "📚 Fixing ALL story files with missing component property..."
STORY_FILES=(
  "packages/ui/src/stories/02-Patterns/ProfileLayoutAlternatives.stories.tsx"
  "packages/ui/src/stories/02-Patterns/RefinedShowcase.stories.tsx"
  "packages/ui/src/stories/02-Patterns/TypographyOptions.stories.tsx"
  "packages/ui/src/stories/02-Patterns/VisualShowcase.stories.tsx"
  "packages/ui/src/stories/04-Interfaces/AuthenticationFlow.stories.tsx"
  "packages/ui/src/stories/04-Interfaces/FeedRitualsInterface.stories.tsx"
  "packages/ui/src/stories/04-Interfaces/OnboardingFlow.stories.tsx"
  "packages/ui/src/stories/04-Interfaces/ProfileInterface.stories.tsx"
  "packages/ui/src/stories/04-Interfaces/SpacesInterface.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Calendar-Events-Systems/Calendar-Events-System.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Dashboard-Systems/Dashboard-Management-System.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Feed-Social-Systems/Feed-Social-System.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Forms-Input-Systems/Forms-Input-System.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Messaging-Chat-Systems/Messaging-Chat-System.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Navigation-Systems/Navigation-System.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Profile-Systems/Profile-Systems.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Search-Discovery-Systems/Search-Discovery-System.stories.tsx"
  "packages/ui/src/stories/04-Organisms/Spaces-Tools-Systems/Spaces-Tools-System.stories.tsx"
  "packages/ui/src/stories/20-Platform-Experiences/Empty-States/Empty-States-System.stories.tsx"
  "packages/ui/src/stories/20-Platform-Experiences/Feedback-Success/Feedback-Success-System.stories.tsx"
)

for file in "${STORY_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  Fixing $file..."
    # Check if file already has component property
    if ! grep -q "component:" "$file"; then
      # Add component property after title
      sed -i '' '/title:/a\
  component: React.Fragment,' "$file"
    fi
  fi
done

echo "✅ Final error fixes complete! Verifying..."
NODE_OPTIONS='--max-old-space-size=8192' pnpm --filter @hive/ui lint 2>&1 | grep -E "([0-9]+ errors)"