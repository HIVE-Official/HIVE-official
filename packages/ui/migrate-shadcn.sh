#!/bin/bash
set -e

echo "🚀 Migrating shadcn components to atomic/atoms structure..."

SRC_DIR="src/components/ui"
DEST_DIR="src/atomic/atoms"

# Components that are pure shadcn (safe to overwrite)
SHADCN_COMPONENTS=(
  "alert.tsx"
  "avatar.tsx"
  "badge.tsx"
  "button.tsx"
  "card.tsx"
  "checkbox.tsx"
  "command.tsx"
  "dialog.tsx"
  "dropdown-menu.tsx"
  "form.tsx"
  "input.tsx"
  "label.tsx"
  "popover.tsx"
  "progress.tsx"
  "select.tsx"
  "separator.tsx"
  "sheet.tsx"
  "skeleton.tsx"
  "slider.tsx"
  "sonner.tsx"
  "switch.tsx"
  "tabs.tsx"
  "textarea.tsx"
  "tooltip.tsx"
)

# New components that don't exist yet
NEW_COMPONENTS=(
  "accordion.tsx"
  "alert-dialog.tsx"
  "aspect-ratio.tsx"
  "breadcrumb.tsx"
  "calendar.tsx"
  "carousel.tsx"
  "chart.tsx"
  "collapsible.tsx"
  "context-menu.tsx"
  "drawer.tsx"
  "hover-card.tsx"
  "input-otp.tsx"
  "menubar.tsx"
  "navigation-menu.tsx"
  "pagination.tsx"
  "radio-group.tsx"
  "resizable.tsx"
  "scroll-area.tsx"
  "sidebar.tsx"
  "table.tsx"
  "toggle.tsx"
  "toggle-group.tsx"
)

# HIVE custom components (DO NOT OVERWRITE)
CUSTOM_COMPONENTS=(
  "grid.tsx"
  "hive-logo.tsx"
  "hive-logo-dynamic.tsx"
  "navigation-preferences.tsx"
  "notification-bell.tsx"
  "notification-item.tsx"
  "presence-indicator.tsx"
  "skip-nav.tsx"
  "space-badge.tsx"
  "top-bar-nav.tsx"
)

echo "📦 Moving pure shadcn components (with overwrite)..."
for component in "${SHADCN_COMPONENTS[@]}"; do
  if [ -f "$SRC_DIR/$component" ]; then
    echo "  ✓ $component (overwriting with fresh shadcn)"
    cp "$SRC_DIR/$component" "$DEST_DIR/$component"
  fi
done

echo "📦 Moving new shadcn components..."
for component in "${NEW_COMPONENTS[@]}"; do
  if [ -f "$SRC_DIR/$component" ]; then
    echo "  ✓ $component (new)"
    cp "$SRC_DIR/$component" "$DEST_DIR/$component"
  fi
done

echo "🔒 Keeping HIVE custom components (not overwriting)..."
for component in "${CUSTOM_COMPONENTS[@]}"; do
  if [ -f "$DEST_DIR/$component" ]; then
    echo "  ✓ $component (preserved)"
  fi
done

echo "🗑️  Removing temporary src/components directory..."
rm -rf src/components

echo "✅ Migration complete!"
echo ""
echo "📊 Summary:"
echo "  - Pure shadcn components: ${#SHADCN_COMPONENTS[@]} (overwritten)"
echo "  - New shadcn components: ${#NEW_COMPONENTS[@]} (added)"
echo "  - HIVE custom components: ${#CUSTOM_COMPONENTS[@]} (preserved)"
echo ""
echo "Total shadcn atoms: $((${#SHADCN_COMPONENTS[@]} + ${#NEW_COMPONENTS[@]}))"
