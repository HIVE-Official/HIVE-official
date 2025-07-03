#!/bin/bash

# Enable error handling
set -e

# Install pnpm
echo "Installing pnpm..."
npm install -g pnpm@9.1.1

# Install dependencies
echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

# Build core packages
echo "Building core packages..."
pnpm --filter @hive/core build
pnpm --filter @hive/validation build
pnpm --filter @hive/auth-logic build
pnpm --filter @hive/analytics build
pnpm --filter @hive/ui build

# Build web app
echo "Building web app..."
cd apps/web
pnpm next build 