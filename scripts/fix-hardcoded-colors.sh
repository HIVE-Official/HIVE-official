#!/bin/bash

# Fix all hardcoded colors in the HIVE codebase
# Replace with CSS variables from the design token system

echo "🔧 Fixing hardcoded colors in HIVE codebase..."

# Function to fix files
fix_colors() {
  local file="$1"
  echo "  Fixing: $file"
  
  # Replace hardcoded gold colors with CSS variables
  sed -i '' "s/#FFD700/var(--hive-gold)/g" "$file"
  sed -i '' "s/#ffd700/var(--hive-gold)/g" "$file"
  sed -i '' "s/rgb(255, 215, 0)/var(--hive-gold)/g" "$file"
  sed -i '' "s/rgba(255, 215, 0,/rgba(var(--hive-gold-rgb),/g" "$file"
  
  # Replace bg-[#FFD700] with proper token
  sed -i '' "s/bg-\[#FFD700\]/bg-[var(--hive-gold)]/g" "$file"
  sed -i '' "s/bg-\[#ffd700\]/bg-[var(--hive-gold)]/g" "$file"
  
  # Replace text color
  sed -i '' "s/text-\[#FFD700\]/text-[var(--hive-gold)]/g" "$file"
  sed -i '' "s/text-\[#ffd700\]/text-[var(--hive-gold)]/g" "$file"
  
  # Replace border color
  sed -i '' "s/border-\[#FFD700\]/border-[var(--hive-gold)]/g" "$file"
  sed -i '' "s/border-\[#ffd700\]/border-[var(--hive-gold)]/g" "$file"
  
  # Replace shadow color
  sed -i '' "s/shadow-\[#FFD700\]/shadow-[var(--hive-shadow-gold)]/g" "$file"
  
  # Replace hardcoded black colors
  sed -i '' "s/#000000/var(--hive-black)/g" "$file"
  sed -i '' "s/#0A0A0A/var(--hive-background-primary)/g" "$file"
  sed -i '' "s/#0A0A0B/var(--hive-background-primary)/g" "$file"
  sed -i '' "s/#111111/var(--hive-background-secondary)/g" "$file"
  sed -i '' "s/#111113/var(--hive-background-secondary)/g" "$file"
  sed -i '' "s/#1A1A1B/var(--hive-background-tertiary)/g" "$file"
  sed -i '' "s/#1A1A1C/var(--hive-background-tertiary)/g" "$file"
  sed -i '' "s/#2A2A2B/var(--hive-gray-700)/g" "$file"
  sed -i '' "s/#2A2A2A/var(--hive-gray-700)/g" "$file"
  sed -i '' "s/#2A2A2D/var(--hive-gray-700)/g" "$file"
  
  # Fix bg-black to use token
  sed -i '' "s/bg-black/bg-[var(--hive-black)]/g" "$file"
  sed -i '' "s/text-black/text-[var(--hive-black)]/g" "$file"
  sed -i '' "s/border-black/border-[var(--hive-black)]/g" "$file"
  
  # Fix bg-white to use token
  sed -i '' "s/bg-white/bg-[var(--hive-white)]/g" "$file"
  sed -i '' "s/text-white/text-[var(--hive-text-primary)]/g" "$file"
  sed -i '' "s/border-white/border-[var(--hive-white)]/g" "$file"
  
  # Replace hardcoded opacity variations
  sed -i '' "s/text-white\/80/text-[var(--hive-text-secondary)]/g" "$file"
  sed -i '' "s/text-white\/60/text-[var(--hive-text-tertiary)]/g" "$file"
  sed -i '' "s/text-white\/40/text-[var(--hive-text-muted)]/g" "$file"
  
  # Replace orange and purple with gold
  sed -i '' "s/orange-500/[var(--hive-gold)]/g" "$file"
  sed -i '' "s/orange-400/[var(--hive-gold)]/g" "$file"
  sed -i '' "s/orange-600/[var(--hive-gold-dark)]/g" "$file"
  sed -i '' "s/purple-500/[var(--hive-gold)]/g" "$file"
  sed -i '' "s/purple-400/[var(--hive-gold)]/g" "$file"
  sed -i '' "s/purple-600/[var(--hive-gold-dark)]/g" "$file"
  
  # Fix amber references (should be gold)
  sed -i '' "s/amber-400/[var(--hive-gold)]/g" "$file"
  sed -i '' "s/amber-500/[var(--hive-gold)]/g" "$file"
  sed -i '' "s/yellow-400/[var(--hive-gold)]/g" "$file"
  sed -i '' "s/yellow-500/[var(--hive-gold)]/g" "$file"
}

# Find all TypeScript/React files in the web app
echo "Finding files with hardcoded colors..."
files=$(find /Users/laneyfraass/hive_ui/apps/web/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "#FFD700\|#ffd700\|#000000\|#111111\|#1A1A1B\|#2A2A2B\|orange-500\|purple-500\|amber-400" {} \;)

# Count files
count=$(echo "$files" | wc -l | tr -d ' ')
echo "Found $count files with hardcoded colors"

# Fix each file
for file in $files; do
  fix_colors "$file"
done

# Also fix UI package components
echo ""
echo "Fixing UI package components..."
ui_files=$(find /Users/laneyfraass/hive_ui/packages/ui/src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec grep -l "#FFD700\|#ffd700\|#000000\|#111111\|orange-500\|purple-500" {} \;)

ui_count=$(echo "$ui_files" | wc -l | tr -d ' ')
echo "Found $ui_count UI package files with hardcoded colors"

for file in $ui_files; do
  fix_colors "$file"
done

echo ""
echo "✅ Fixed hardcoded colors in $((count + ui_count)) files!"
echo ""
echo "Note: Components now use CSS variables from the design token system."
echo "Make sure to import the token CSS in your app for these to work."