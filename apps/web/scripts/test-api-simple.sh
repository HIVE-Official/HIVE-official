#!/bin/bash

# Test the search API with real RSS feed data
# Requires the dev server to be running (pnpm dev)

echo "🧪 Testing Search API with Real RSS Feed Data"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Function to test a search query
test_search() {
    local query="$1"
    echo "🔍 Searching for: \"$query\""
    echo "────────────────────────────────────────────────"
    
    # Use the mock endpoint for testing without auth
    curl -s -X POST http://localhost:3000/api/spaces/search-mock \
        -H "Content-Type: application/json" \
        -d "{\"query\": \"$query\", \"limit\": 5}" | \
        python3 -m json.tool 2>/dev/null | head -50
    
    echo ""
    echo ""
}

# Test various queries that should match real RSS feed data
test_search "academic"
test_search "tennis"
test_search "engineering"
test_search "dance"
test_search "pharmacy"

echo "✅ Test completed!"
echo "Note: This uses the mock endpoint for testing. The real endpoint requires authentication."