#!/bin/bash
# Restore script - run this if type fixes cause issues
git checkout -- apps/web/src apps/admin/src packages/ui/src
echo "✅ Files restored to previous state"
