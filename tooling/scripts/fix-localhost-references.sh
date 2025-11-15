#!/bin/bash

# Script to replace all localhost references with environment variables
# Critical for production deployment

echo "🌐 Fixing localhost references for production..."
echo "================================================"

# Counter for fixed references
TOTAL_FIXED=0

# Function to fix localhost references in a file
fix_file() {
    local file="$1"
    local count_before=$(grep -c "localhost\|127\.0\.0\.1" "$file" 2>/dev/null || echo 0)

    if [ "$count_before" -gt 0 ]; then
        # Create backup
        cp "$file" "${file}.backup.localhost"

        # Replace localhost references with environment variable
        sed -i '' \
            -e "s|http://localhost:3000|process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'|g" \
            -e "s|https://localhost:3000|process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'|g" \
            -e "s|http://localhost:3001|process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001'|g" \
            -e "s|http://127.0.0.1:3000|process.env.NEXT_PUBLIC_APP_URL || 'http://127.0.0.1:3000'|g" \
            -e "s|ws://localhost|process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost'|g" \
            -e "s|'localhost'|process.env.NEXT_PUBLIC_HOST || 'localhost'|g" \
            "$file"

        # For API routes, use different environment variable
        sed -i '' \
            -e "s|fetch('http://localhost|fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost|g" \
            -e "s|fetch('https://localhost|fetch(process.env.NEXT_PUBLIC_API_URL || 'https://localhost|g" \
            -e "s|fetch('/api|fetch(\`\${process.env.NEXT_PUBLIC_APP_URL}/api|g" \
            "$file"

        local count_after=$(grep -c "localhost\|127\.0\.0\.1" "$file" 2>/dev/null || echo 0)
        local fixed=$((count_before - count_after))

        if [ "$fixed" -gt 0 ]; then
            echo "✓ Fixed $fixed localhost references in: $file"
            TOTAL_FIXED=$((TOTAL_FIXED + fixed))
        fi
    fi
}

echo "Scanning for localhost references..."

# Find all TypeScript and JavaScript files
for file in $(find apps/web/src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) 2>/dev/null); do
    fix_file "$file"
done

# Also check configuration files
for file in $(find apps/web -maxdepth 2 -type f \( -name "*.config.js" -o -name "*.config.ts" -o -name "*.config.mjs" \) 2>/dev/null); do
    fix_file "$file"
done

echo ""
echo "================================================"
echo "✅ Localhost Fix Complete!"
echo "📊 Total localhost references fixed: $TOTAL_FIXED"
echo ""
echo "⚠️  Required Environment Variables:"
echo "   - NEXT_PUBLIC_APP_URL (e.g., https://www.hive.college)"
echo "   - NEXT_PUBLIC_ADMIN_URL (e.g., https://admin.hive.college)"
echo "   - NEXT_PUBLIC_API_URL (e.g., https://api.hive.college)"
echo "   - NEXT_PUBLIC_WS_URL (e.g., wss://ws.hive.college)"
echo ""
echo "Note: Backup files created with .backup.localhost extension"
echo "To remove backups after review: find . -name '*.backup.localhost' -delete"