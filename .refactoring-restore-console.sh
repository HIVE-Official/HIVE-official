#!/bin/bash
# Restore script - run this if you need to undo console removal
git checkout -- apps/web/src apps/admin/src packages/ui/src packages/core/src
echo "✅ Files restored to previous state"
