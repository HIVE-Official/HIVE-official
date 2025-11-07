#!/bin/bash

# Rituals V2.0 Integration Smoke Test Script
# Usage: bash rituals-smoke.sh <command> [args]

set -e

# Configuration
BASE_URL="${BASE_URL:-http://localhost:3000}"
COOKIE="${COOKIE:-}"
CSRF_TOKEN="${CSRF_TOKEN:-}"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Helper function to make authenticated requests
api_call() {
  local method="$1"
  local path="$2"
  local data="$3"
  local headers=(-H "Cookie: $COOKIE" -H "Content-Type: application/json" -H "Accept: application/json")

  if [ -n "$CSRF_TOKEN" ]; then
    headers+=(-H "X-CSRF-Token: $CSRF_TOKEN")
  fi

  if [ "$method" = "GET" ]; then
    curl -s -X GET "${BASE_URL}${path}" "${headers[@]}"
  else
    curl -s -X "$method" "${BASE_URL}${path}" "${headers[@]}" -d "$data"
  fi
}

# Test functions
test_list_rituals() {
  echo -e "${YELLOW}Testing: List Rituals${NC}"
  response=$(api_call GET "/api/rituals?activeOnly=true&format=raw")
  echo "$response" | jq '.'
  if echo "$response" | jq -e '.success == true' > /dev/null; then
    echo -e "${GREEN}✓ List rituals succeeded${NC}"
    return 0
  else
    echo -e "${RED}✗ List rituals failed${NC}"
    return 1
  fi
}

# Main command dispatcher
case "${1:-help}" in
  list)
    test_list_rituals
    ;;
  full-test)
    echo -e "${YELLOW}=== Running Full Ritual Integration Test ===${NC}\n"
    test_list_rituals || exit 1
    echo -e "\n${GREEN}=== Integration Test Complete ===${NC}"
    ;;
  help|*)
    echo "Rituals V2.0 Smoke Test Script"
    echo "Usage: bash rituals-smoke.sh <command>"
    echo "Commands: list, full-test"
    ;;
esac
