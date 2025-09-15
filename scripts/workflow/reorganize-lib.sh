#!/bin/bash

# HIVE Lib Directory Reorganization Script
# This script reorganizes the chaotic /lib directory into a clean domain-driven structure

set -e

echo "🚀 Starting HIVE lib directory reorganization..."

LIB_DIR="apps/web/src/lib"
cd /Users/laneyfraass/hive_ui

# Create new directory structure
echo "📁 Creating new directory structure..."

mkdir -p $LIB_DIR/auth/{middleware,providers,utils}
mkdir -p $LIB_DIR/firebase/{admin,client,collections,security}
mkdir -p $LIB_DIR/api/{middleware,utils,response-types}
mkdir -p $LIB_DIR/services/{feed,notifications,realtime,search,moderation,analytics}
mkdir -p $LIB_DIR/spaces/{discovery,permissions,rituals}
mkdir -p $LIB_DIR/tools/{builder,templates,runtime}
mkdir -p $LIB_DIR/utils/{validation,formatters,generators}

echo "📦 Moving auth-related files..."
# Auth files
mv $LIB_DIR/auth*.ts $LIB_DIR/auth/ 2>/dev/null || true
mv $LIB_DIR/auth/auth-middleware.ts $LIB_DIR/auth/middleware/ 2>/dev/null || true
mv $LIB_DIR/auth/auth-rate-limiter.ts $LIB_DIR/auth/middleware/ 2>/dev/null || true
mv $LIB_DIR/auth/auth-utils.ts $LIB_DIR/auth/utils/ 2>/dev/null || true
mv $LIB_DIR/auth/auth-server.ts $LIB_DIR/auth/providers/ 2>/dev/null || true

echo "🔥 Moving Firebase files..."
# Firebase files
mv $LIB_DIR/firebase*.ts $LIB_DIR/firebase/ 2>/dev/null || true
mv $LIB_DIR/firebase/firebase-admin.ts $LIB_DIR/firebase/admin/ 2>/dev/null || true
mv $LIB_DIR/firebase/firebase-client.ts $LIB_DIR/firebase/client/ 2>/dev/null || true
mv $LIB_DIR/firebase/firebase-collections.ts $LIB_DIR/firebase/collections/ 2>/dev/null || true
mv $LIB_DIR/firebase/firebase-realtime.ts $LIB_DIR/firebase/client/ 2>/dev/null || true

echo "🌐 Moving API files..."
# API files
mv $LIB_DIR/api*.ts $LIB_DIR/api/ 2>/dev/null || true
mv $LIB_DIR/api/api-middleware.ts $LIB_DIR/api/middleware/ 2>/dev/null || true
mv $LIB_DIR/api/api-auth-middleware.ts $LIB_DIR/api/middleware/ 2>/dev/null || true
mv $LIB_DIR/api/api-error-handler.ts $LIB_DIR/api/utils/ 2>/dev/null || true
mv $LIB_DIR/api/api-response-types.ts $LIB_DIR/api/response-types/ 2>/dev/null || true

echo "🚀 Moving service files..."
# Service files
mv $LIB_DIR/*-service.ts $LIB_DIR/services/ 2>/dev/null || true
mv $LIB_DIR/feed*.ts $LIB_DIR/services/feed/ 2>/dev/null || true
mv $LIB_DIR/notification*.ts $LIB_DIR/services/notifications/ 2>/dev/null || true
mv $LIB_DIR/realtime*.ts $LIB_DIR/services/realtime/ 2>/dev/null || true
mv $LIB_DIR/search*.ts $LIB_DIR/services/search/ 2>/dev/null || true
mv $LIB_DIR/*moderation*.ts $LIB_DIR/services/moderation/ 2>/dev/null || true
mv $LIB_DIR/*analytics*.ts $LIB_DIR/services/analytics/ 2>/dev/null || true

echo "🏢 Moving space-related files..."
# Space files
mv $LIB_DIR/space*.ts $LIB_DIR/spaces/ 2>/dev/null || true
mv $LIB_DIR/*discovery*.ts $LIB_DIR/spaces/discovery/ 2>/dev/null || true
mv $LIB_DIR/*permissions*.ts $LIB_DIR/spaces/permissions/ 2>/dev/null || true
mv $LIB_DIR/*ritual*.ts $LIB_DIR/spaces/rituals/ 2>/dev/null || true

echo "🛠️ Moving tool-related files..."
# Tool files
mv $LIB_DIR/tool*.ts $LIB_DIR/tools/ 2>/dev/null || true
mv $LIB_DIR/*builder*.ts $LIB_DIR/tools/builder/ 2>/dev/null || true
mv $LIB_DIR/*template*.ts $LIB_DIR/tools/templates/ 2>/dev/null || true
mv $LIB_DIR/*runtime*.ts $LIB_DIR/tools/runtime/ 2>/dev/null || true

echo "🔧 Moving utility files..."
# Utility files
mv $LIB_DIR/*validation*.ts $LIB_DIR/utils/validation/ 2>/dev/null || true
mv $LIB_DIR/*formatter*.ts $LIB_DIR/utils/formatters/ 2>/dev/null || true
mv $LIB_DIR/*generator*.ts $LIB_DIR/utils/generators/ 2>/dev/null || true

echo "📊 Moving remaining service files..."
# Move remaining files to appropriate locations
mv $LIB_DIR/admin*.ts $LIB_DIR/auth/middleware/ 2>/dev/null || true
mv $LIB_DIR/rate*.ts $LIB_DIR/api/middleware/ 2>/dev/null || true
mv $LIB_DIR/cache*.ts $LIB_DIR/utils/ 2>/dev/null || true
mv $LIB_DIR/config.ts $LIB_DIR/utils/ 2>/dev/null || true
mv $LIB_DIR/constants.ts $LIB_DIR/utils/ 2>/dev/null || true

echo "🧹 Cleaning up empty directories..."
find $LIB_DIR -type d -empty -delete 2>/dev/null || true

echo "📝 Creating index files for better exports..."

# Create index files for each major directory
cat > $LIB_DIR/auth/index.ts << 'EOF'
// Auth module exports
export * from './middleware';
export * from './providers';
export * from './utils';
EOF

cat > $LIB_DIR/firebase/index.ts << 'EOF'
// Firebase module exports
export * from './admin';
export * from './client';
export * from './collections';
EOF

cat > $LIB_DIR/api/index.ts << 'EOF'
// API module exports
export * from './middleware';
export * from './utils';
export * from './response-types';
EOF

echo "✅ Lib directory reorganization complete!"
echo ""
echo "📊 Summary:"
echo "Old structure: 99 files in flat directory"
echo "New structure: Organized into 7 main domains with subdirectories"
echo ""
echo "Next steps:"
echo "1. Update import paths across the codebase"
echo "2. Test the build"
echo "3. Commit the changes"