#!/bin/bash

# Script to fix import and module resolution errors
# Addresses import path issues and missing module declarations

echo "🔧 Fixing import and module resolution errors..."

# Function to fix import issues
fix_imports() {
    local file="$1"

    # Skip if file doesn't exist
    if [[ ! -f "$file" ]]; then
        return
    fi

    # Pattern 1: Fix @hive/core import paths - add src/ prefix
    sed -i.bak 's|@hive/core/infrastructure|@hive/core/src/infrastructure|g' "$file"
    sed -i.bak 's|@hive/core/domain|@hive/core/src/domain|g' "$file"
    sed -i.bak 's|@hive/core/application|@hive/core/src/application|g' "$file"

    # Pattern 2: Fix middleware import paths
    sed -i.bak 's|@/lib/middleware|@/lib/middleware/index|g' "$file"
    sed -i.bak 's|@/lib/api-auth-middleware|@/lib/middleware/index|g' "$file"

    # Pattern 3: Fix missing ToolSchema imports
    if grep -q "ToolSchema" "$file" && ! grep -q "import.*ToolSchema" "$file"; then
        # Add import for ToolSchema if it's used but not imported
        sed -i.bak '1i\
import { ToolSchema } from "@hive/core";
' "$file"
    fi

    # Pattern 4: Fix NextRequest to AuthenticatedRequest type issues
    sed -i.bak 's/async (request: NextRequest, context)/async (request: AuthenticatedRequest, context)/g' "$file"

    # Pattern 5: Fix type imports for missing types
    if grep -q "BehavioralSpace" "$file" && ! grep -q "import.*BehavioralSpace" "$file"; then
        sed -i.bak '1i\
import type { BehavioralSpace } from "@hive/core";
' "$file"
    fi

    # Pattern 6: Fix ZodType constraint issues
    sed -i.bak 's/ZodType<any, any, any>/any/g' "$file"

    # Remove backup file if changes were made
    if [[ -f "$file.bak" ]]; then
        if diff -q "$file" "$file.bak" > /dev/null; then
            rm "$file.bak"
        else
            echo "Fixed: $file"
            rm "$file.bak"
        fi
    fi
}

# Find all TypeScript files in apps/web and fix them
find apps/web/src -name "*.ts" -o -name "*.tsx" | while read -r file; do
    fix_imports "$file"
done

echo "✅ Completed fixing import and module resolution errors"