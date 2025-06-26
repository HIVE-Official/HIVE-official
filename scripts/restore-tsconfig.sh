#!/bin/bash

# HIVE TypeScript Configuration Restoration Script
# This script restores the correct TypeScript configuration if Next.js corrupts it

echo "🔧 Restoring HIVE TypeScript Configuration..."

# Restore root tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "files": [],
  "references": [
    {
      "path": "./apps/web/tsconfig.json"
    },
    {
      "path": "./apps/admin/tsconfig.json"
    },
    {
      "path": "./packages/ui/tsconfig.json"
    },
    {
      "path": "./packages/core/tsconfig.json"
    },
    {
      "path": "./packages/auth-logic/tsconfig.json"
    },
    {
      "path": "./packages/hooks/tsconfig.json"
    },
    {
      "path": "./packages/validation/tsconfig.json"
    },
    {
      "path": "./packages/utilities/tsconfig.json"
    },
    {
      "path": "./packages/api-client/tsconfig.json"
    },
    {
      "path": "./packages/tokens/tsconfig.json"
    },
    {
      "path": "./packages/analytics/tsconfig.json"
    },
    {
      "path": "./packages/i18n/tsconfig.json"
    }
  ]
}
EOF

# Restore web app tsconfig.json
cat > apps/web/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": false,
    "incremental": true,
    "module": "esnext",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "composite": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ],
      "@hive/*": [
        "../../packages/*/src"
      ]
    },
    "types": [
      "vitest/globals",
      "node"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "next-env.d.ts",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ],
  "references": [
    { "path": "../../packages/ui" },
    { "path": "../../packages/core" },
    { "path": "../../packages/auth-logic" },
    { "path": "../../packages/hooks" },
    { "path": "../../packages/validation" },
    { "path": "../../packages/utilities" },
    { "path": "../../packages/api-client" },
    { "path": "../../packages/analytics" }
  ]
}
EOF

# Make files read-only again
chmod 444 tsconfig.json apps/web/tsconfig.json

echo "✅ TypeScript configuration restored and protected!"
echo "🔒 Files are now read-only to prevent Next.js corruption"
echo ""
echo "To temporarily allow edits, run:"
echo "  chmod 644 tsconfig.json apps/web/tsconfig.json"
echo ""
echo "To restore protection after editing, run:"
echo "  chmod 444 tsconfig.json apps/web/tsconfig.json" 