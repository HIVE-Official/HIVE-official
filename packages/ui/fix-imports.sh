#!/bin/bash

# Fix import paths based on directory depth

echo "Fixing import paths based on directory depth..."

# Level 3 depth (stories/XX-Category/) - needs ../../
find src/stories -maxdepth 2 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/components/ui/|../../components/ui/|g' {} \;
find src/stories -maxdepth 2 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/hive-tokens.css|../../hive-tokens.css|g' {} \;

# Level 4 depth (stories/XX-Category/YY-Subcategory/) - needs ../../../
find src/stories -mindepth 3 -maxdepth 3 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/components/ui/|../../../components/ui/|g' {} \;
find src/stories -mindepth 3 -maxdepth 3 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/hive-tokens.css|../../../hive-tokens.css|g' {} \;

# Level 5 depth (stories/XX-Category/YY-Subcategory/ZZ-Component/) - needs ../../../../
find src/stories -mindepth 4 -maxdepth 4 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/components/ui/|../../../../components/ui/|g' {} \;
find src/stories -mindepth 4 -maxdepth 4 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/hive-tokens.css|../../../../hive-tokens.css|g' {} \;

# Level 6 depth (stories/XX-Category/YY-Subcategory/ZZ-Component/AA-Subcomponent/) - needs ../../../../../
find src/stories -mindepth 5 -maxdepth 5 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/components/ui/|../../../../../components/ui/|g' {} \;
find src/stories -mindepth 5 -maxdepth 5 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/hive-tokens.css|../../../../../hive-tokens.css|g' {} \;

# Level 7 depth (stories/XX-Category/YY-Subcategory/ZZ-Component/AA-Subcomponent/BB-Element/) - needs ../../../../../../
find src/stories -mindepth 6 -maxdepth 6 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/components/ui/|../../../../../../components/ui/|g' {} \;
find src/stories -mindepth 6 -maxdepth 6 -name "*.stories.tsx" -exec sed -i '' 's|[.][.]/[.][.]/[.][.]*/hive-tokens.css|../../../../../../hive-tokens.css|g' {} \;

echo "Import path fixing complete!"