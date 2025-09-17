#!/bin/bash

# HIVE Development Subdomain Setup Script
# Sets up local subdomain development for different environments

echo "🚀 Setting up HIVE development subdomains..."

# Check if running on macOS or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    HOSTS_FILE="/etc/hosts"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    HOSTS_FILE="/etc/hosts"
else
    echo "❌ Unsupported operating system"
    exit 1
fi

# Function to add host entry if it doesn't exist
add_host_entry() {
    local domain=$1
    local ip=$2
    
    if ! grep -q "$domain" "$HOSTS_FILE"; then
        echo "➕ Adding $domain to hosts file..."
        echo "$ip $domain" | sudo tee -a "$HOSTS_FILE" > /dev/null
        echo "✅ Added $domain -> $ip"
    else
        echo "✅ $domain already exists in hosts file"
    fi
}

# Add development domains
echo "📝 Configuring development domains..."
add_host_entry "dev.hive.local" "127.0.0.1"
add_host_entry "staging.hive.local" "127.0.0.1"
add_host_entry "admin.hive.local" "127.0.0.1"

echo ""
echo "🎉 Setup complete! You can now use:"
echo "   🔧 Development: http://dev.hive.local:3000"
echo "   🧪 Staging:     http://staging.hive.local:3000"
echo "   👤 Admin:       http://admin.hive.local:3001"
echo ""
echo "💡 To start development with subdomain support:"
echo "   cd apps/web && npm run dev -- --hostname dev.hive.local"
echo ""
echo "🧹 To remove these entries later, edit $HOSTS_FILE manually" 