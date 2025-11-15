#!/bin/bash

# Fix @/ imports in UI package to use relative paths
# This is needed because Next.js transpilePackages doesn't respect package tsconfig paths

cd /Users/laneyfraass/hive_ui/packages/ui

# Function to calculate relative path from one directory to another
get_relative_path() {
    local from_dir="$1"
    local to_dir="$2"

    # Count directory depth
    local depth=$(echo "$from_dir" | tr -cd '/' | wc -c)

    # Build ../ sequence
    local ups=""
    for ((i=0; i<depth; i++)); do
        ups="../$ups"
    done

    echo "${ups}${to_dir}"
}

# Fix imports in atomic/00-Global files
for file in src/atomic/00-Global/**/*.tsx src/atomic/00-Global/**/*.ts; do
    if [ -f "$file" ] && [[ ! "$file" =~ \.stories\.tsx$ ]]; then
        # Replace @/lib/utils with ../../../lib/utils
        sed -i '' 's|from "@/lib/utils"|from "../../../lib/utils"|g' "$file"
        sed -i '' "s|from '@/lib/utils'|from '../../../lib/utils'|g" "$file"

        # Replace @/atomic/... with relative paths based on file location
        if [[ "$file" =~ atoms/ ]]; then
            sed -i '' 's|from "@/atomic/00-Global/atoms/\([^"]*\)"|from "./\1"|g' "$file"
            sed -i '' 's|from "@/atomic/00-Global/molecules/\([^"]*\)"|from "../molecules/\1"|g' "$file"
        elif [[ "$file" =~ molecules/ ]]; then
            sed -i '' 's|from "@/atomic/00-Global/atoms/\([^"]*\)"|from "../atoms/\1"|g' "$file"
            sed -i '' 's|from "@/atomic/00-Global/molecules/\([^"]*\)"|from "./\1"|g' "$file"
        elif [[ "$file" =~ organisms/ ]]; then
            sed -i '' 's|from "@/atomic/00-Global/atoms/\([^"]*\)"|from "../atoms/\1"|g' "$file"
            sed -i '' 's|from "@/atomic/00-Global/molecules/\([^"]*\)"|from "../molecules/\1"|g' "$file"
        fi

        # Fix other common patterns
        sed -i '' 's|from "@/shells/motion-safe"|from "../../../shells/motion-safe"|g' "$file"
        sed -i '' 's|from "@/hooks/\([^"]*\)"|from "../../../hooks/\1"|g' "$file"
        sed -i '' 's|from "@/identity/\([^"]*\)"|from "../../../identity/\1"|g' "$file"
    fi
done

# Fix imports in atomic/02-Feed, 03-Spaces, 04-Profile, 05-HiveLab, 06-Rituals, 07-Admin
for slice in 02-Feed 03-Spaces 04-Profile 05-HiveLab 06-Rituals 07-Admin; do
    for file in src/atomic/${slice}/**/*.tsx src/atomic/${slice}/**/*.ts; do
        if [ -f "$file" ] && [[ ! "$file" =~ \.stories\.tsx$ ]]; then
            # Replace @/lib/utils with ../../../lib/utils
            sed -i '' 's|from "@/lib/utils"|from "../../../lib/utils"|g' "$file"
            sed -i '' "s|from '@/lib/utils'|from '../../../lib/utils'|g" "$file"

            # Replace @/atomic/00-Global/atoms/... with ../../00-Global/atoms/...
            sed -i '' 's|from "@/atomic/00-Global/atoms/\([^"]*\)"|from "../../00-Global/atoms/\1"|g' "$file"
            sed -i '' 's|from "@/atomic/00-Global/molecules/\([^"]*\)"|from "../../00-Global/molecules/\1"|g' "$file"

            # Fix same-slice imports based on location
            if [[ "$file" =~ atoms/ ]]; then
                sed -i '' "s|from \"@/atomic/${slice}/atoms/\([^\"]*\)\"|from \"./\1\"|g" "$file"
                sed -i '' "s|from \"@/atomic/${slice}/molecules/\([^\"]*\)\"|from \"../molecules/\1\"|g" "$file"
            elif [[ "$file" =~ molecules/ ]]; then
                sed -i '' "s|from \"@/atomic/${slice}/atoms/\([^\"]*\)\"|from \"../atoms/\1\"|g" "$file"
                sed -i '' "s|from \"@/atomic/${slice}/molecules/\([^\"]*\)\"|from \"./\1\"|g" "$file"
            elif [[ "$file" =~ organisms/ ]]; then
                sed -i '' "s|from \"@/atomic/${slice}/atoms/\([^\"]*\)\"|from \"../atoms/\1\"|g" "$file"
                sed -i '' "s|from \"@/atomic/${slice}/molecules/\([^\"]*\)\"|from \"../molecules/\1\"|g" "$file"
            elif [[ "$file" =~ templates/ ]]; then
                sed -i '' "s|from \"@/atomic/${slice}/atoms/\([^\"]*\)\"|from \"../atoms/\1\"|g" "$file"
                sed -i '' "s|from \"@/atomic/${slice}/molecules/\([^\"]*\)\"|from \"../molecules/\1\"|g" "$file"
                sed -i '' "s|from \"@/atomic/${slice}/organisms/\([^\"]*\)\"|from \"../organisms/\1\"|g" "$file"
            fi

            # Fix other common patterns
            sed -i '' 's|from "@/shells/motion-safe"|from "../../../shells/motion-safe"|g' "$file"
            sed -i '' 's|from "@/hooks/\([^"]*\)"|from "../../../hooks/\1"|g' "$file"
            sed -i '' 's|from "@/identity/\([^"]*\)"|from "../../../identity/\1"|g' "$file"
        fi
    done
done

echo "Fixed @/ imports in UI package"
