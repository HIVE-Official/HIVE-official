#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
TARGET_DIR="$ROOT_DIR/packages/ui/src"

echo "Checking for non-token motion classes in $TARGET_DIR"

VIOLATIONS=0

# Disallow raw duration-<number> (prefer token durations like duration-swift)
if rg -n "duration-[0-9]" "$TARGET_DIR" --no-ignore -S >/tmp/motion_durations || true; then
  if [ -s /tmp/motion_durations ]; then
    echo "Found non-token durations:" >&2
    cat /tmp/motion_durations >&2
    VIOLATIONS=1
  fi
fi

# Disallow arbitrary ease-[...] except our tokens
if rg -n "ease-\\[" "$TARGET_DIR" --no-ignore -S >/tmp/motion_ease || true; then
  if [ -s /tmp/motion_ease ]; then
    echo "Found arbitrary easing usage:" >&2
    cat /tmp/motion_ease >&2
    VIOLATIONS=1
  fi
fi

if [ "$VIOLATIONS" -ne 0 ]; then
  echo "Motion token lint failed" >&2
  exit 1
fi

echo "Motion token lint passed"
