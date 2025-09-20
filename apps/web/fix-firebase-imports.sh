#!/bin/bash

# Replace firebase-admin modular imports
find src -name "*.ts" -o -name "*.tsx" | xargs sed -i '' \
  -e "s|from 'firebase-admin/auth'|from 'firebase-admin'|g" \
  -e "s|from 'firebase-admin/firestore'|from 'firebase-admin'|g" \
  -e "s|import { getAuth }|import * as admin|g" \
  -e "s|import { FieldValue }|import * as admin|g" \
  -e "s|getAuth()|admin.auth()|g" \
  -e "s|FieldValue|admin.firestore.FieldValue|g"

echo "Fixed firebase-admin imports"
