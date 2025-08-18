#!/bin/bash

# 🔒 HIVE Security Testing Script
# Tests all security layers in development

echo "🔒 Testing HIVE Security Systems..."
echo "=================================="

BASE_URL="http://localhost:3003"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Testing Input Validation...${NC}"

# Test SQL Injection
echo -e "${YELLOW}Testing SQL Injection Protection:${NC}"
response=$(curl -s -X POST $BASE_URL/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu; DROP TABLE users;","schoolId":"test"}')
echo "Response: $response"

# Test XSS
echo -e "${YELLOW}Testing XSS Protection:${NC}"
response=$(curl -s -X POST $BASE_URL/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"<script>alert(1)</script>@university.edu","schoolId":"test"}')
echo "Response: $response"

echo ""
echo -e "${BLUE}2. Testing Development Bypass Protection...${NC}"

# Test development tokens
echo -e "${YELLOW}Testing DEV_MODE token (should be blocked):${NC}"
response=$(curl -s -X POST $BASE_URL/api/auth/verify-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu","schoolId":"test","token":"DEV_MODE"}')
echo "Response: $response"

echo -e "${YELLOW}Testing test-token (should be blocked):${NC}"
response=$(curl -s -X POST $BASE_URL/api/auth/verify-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"test@university.edu","schoolId":"test","token":"test-token"}')
echo "Response: $response"

echo ""
echo -e "${BLUE}3. Testing Rate Limiting...${NC}"

echo -e "${YELLOW}Sending multiple requests to trigger rate limiting:${NC}"
for i in {1..6}; do
  echo -n "Request $i: "
  response=$(curl -s -w "%{http_code}" -X POST $BASE_URL/api/auth/send-magic-link \
    -H "Content-Type: application/json" \
    -d '{"email":"test@university.edu","schoolId":"test"}')
  
  if [[ $response == *"429"* ]]; then
    echo -e "${RED}Rate Limited! ✅${NC}"
    break
  else
    echo -e "${GREEN}$response${NC}"
  fi
  sleep 0.5
done

echo ""
echo -e "${BLUE}4. Testing Normal Request (should show Firebase error)...${NC}"
echo -e "${YELLOW}Valid request format:${NC}"
response=$(curl -s -X POST $BASE_URL/api/auth/send-magic-link \
  -H "Content-Type: application/json" \
  -d '{"email":"student@university.edu","schoolId":"valid-school"}')
echo "Response: $response"

echo ""
echo -e "${GREEN}🎉 Security Testing Complete!${NC}"
echo ""
echo -e "${BLUE}Expected Results:${NC}"
echo "✅ Malicious inputs should be blocked"
echo "✅ Development tokens should be rejected" 
echo "✅ Rate limiting should activate after ~5 requests"
echo "✅ Valid requests should show 'Firebase not configured' (in dev)"
echo "✅ All security events should be logged"
echo ""
echo -e "${YELLOW}Check your server logs for security events!${NC}"