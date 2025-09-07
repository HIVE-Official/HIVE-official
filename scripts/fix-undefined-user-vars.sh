#!/bin/bash

# Fix undefined 'user' variable references after userData assignment
echo "Fixing undefined 'user' variable references in API routes..."

API_DIR="/Users/laneyfraass/hive_ui/apps/web/src/app/api"

# List of files that need fixing based on the warnings
FILES=(
  "$API_DIR/tools/[toolId]/analytics/route.ts"
  "$API_DIR/tools/[toolId]/reviews/route.ts"
  "$API_DIR/tools/recommendations/route.ts"
  "$API_DIR/tools/review/route.ts"
  "$API_DIR/privacy/route.ts"
  "$API_DIR/feature-flags/route.ts"
  "$API_DIR/spaces/[spaceId]/posts/[postId]/comments/route.ts"
  "$API_DIR/spaces/[spaceId]/members/route.ts"
  "$API_DIR/spaces/[spaceId]/membership/route.ts"
  "$API_DIR/spaces/recommendations/route.ts"
  "$API_DIR/spaces/social-proof/route.ts"
  "$API_DIR/admin/users/route.ts"
  "$API_DIR/admin/moderation/workflows/route.ts"
  "$API_DIR/admin/moderation/route.ts"
  "$API_DIR/realtime/metrics/route.ts"
  "$API_DIR/profile/spaces/recommendations/route.ts"
  "$API_DIR/profile/spaces/actions/route.ts"
  "$API_DIR/profile/completion/route.ts"
  "$API_DIR/profile/dashboard/route.ts"
  "$API_DIR/profile/public/[handle]/route.ts"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Checking $file"
    
    # Replace patterns where userData is assigned but user is referenced
    # Pattern 1: const userData = userDoc.data() followed by user?.
    sed -i.bak 's/const userData = userDoc\.data()/const userData = userDoc.data()/g; s/\buser\?\./userData?./g' "$file"
    
    # Pattern 2: const _userData = userDoc.data() - rename to userData
    sed -i.bak 's/const _userData = userDoc\.data()/const userData = userDoc.data()/g' "$file"
    
    # Pattern 3: Fix references after the assignment
    # This is more complex and needs careful replacement
    if grep -q "const userData = userDoc\.data()" "$file"; then
      # Check if there are user?. references after userData assignment
      if grep -q "user?\." "$file"; then
        echo "  -> Fixing user references to userData in $file"
        # Only replace user?. with userData?. in lines after userData assignment
        awk '
          /const userData = userDoc\.data\(\)/ {found=1}
          found && /user\?\./ {gsub(/\buser\?\./, "userData?.")}
          {print}
        ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
      fi
    fi
    
    # Clean up backup files
    rm -f "${file}.bak"
  fi
done

echo "Completed fixing undefined 'user' variable references"