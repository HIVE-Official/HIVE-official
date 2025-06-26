#!/bin/bash

# Gemini API Test Script
# Usage: ./test_gemini_api.sh YOUR_API_KEY

if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide your Gemini API key"
    echo "Usage: ./test_gemini_api.sh YOUR_API_KEY"
    echo ""
    echo "To get an API key:"
    echo "1. Go to https://aistudio.google.com/app/apikey"
    echo "2. Create a new API key"
    echo "3. Copy the key (starts with 'AIza...')"
    echo "4. Run: ./test_gemini_api.sh YOUR_API_KEY"
    exit 1
fi

API_KEY="$1"

echo "🧪 Testing Gemini API..."
echo "API Key: ${API_KEY:0:10}..." # Show first 10 chars for verification

curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }' \
  -s | jq '.' 2>/dev/null || curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }' \
  -s

echo ""
echo "✅ API call completed!" 