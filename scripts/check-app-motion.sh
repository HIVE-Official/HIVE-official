#!/usr/bin/env bash
set -euo pipefail

# App-level motion lint for Next.js apps (web + e2e)
# Ensures motion uses design-system tokens/hooks and avoids ad-hoc easing/durations.

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)

TARGETS=(
  "$ROOT_DIR/apps/web/src"
  "$ROOT_DIR/apps/e2e/src"
)

echo "Checking app motion usage in: ${TARGETS[*]}"

VIOLATIONS=0

check_rg() {
  local pattern="$1"; shift
  local label="$1"; shift
  local extra_rg_opts=("$@")
  if rg -n "$pattern" "${TARGETS[@]}" --glob "*.{ts,tsx}" --hidden -S "${extra_rg_opts[@]}" >/tmp/app_motion_check || true; then
    if [ -s /tmp/app_motion_check ]; then
      echo "[motion] ${label}:" >&2
      cat /tmp/app_motion_check >&2
      echo >&2
      VIOLATIONS=1
    fi
  fi
}

# 1) Disallow direct useReducedMotion from framer-motion in apps (use @hive/ui hook)
check_rg "useReducedMotion\s*\}\s*from\s*['\"]framer-motion['\"]" \
  "Use useReducedMotion from @hive/ui instead of framer-motion"

# 2) Flag ad-hoc numeric durations in transition objects (encourage DUR tokens)
#    Allow if the same line references DUR./SPRING./EASE.
if rg -n "duration:\s*[0-9]" "${TARGETS[@]}" --glob "*.{ts,tsx}" --hidden -S >/tmp/app_motion_durations || true; then
  awk '!
    /DUR\./ && !/SPRING\./ && !/EASE\./ && !/setTimeout/ && !/transitionDuration/ && !/animationDuration/
  ' /tmp/app_motion_durations > /tmp/app_motion_durations_filtered || true
  if [ -s /tmp/app_motion_durations_filtered ]; then
    echo "[motion] Numeric transition durations found (use DUR tokens):" >&2
    cat /tmp/app_motion_durations_filtered >&2
    echo >&2
    VIOLATIONS=1
  fi
fi

# 3) Flag bracket array easings (use EASE tokens or SPRING presets)
check_rg "ease:\s*\[" "Array easing detected (use EASE tokens or SPRING presets)"

if [ "$VIOLATIONS" -ne 0 ]; then
  echo "App motion lint failed" >&2
  exit 1
fi

echo "App motion lint passed"

