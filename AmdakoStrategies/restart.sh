#!/bin/bash
# Restart script for cPanel Git Deployment

set -e

echo "🚀 Restarting application..."

# Install PM2
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# Start or restart backend
if pm2 list | grep -q "amdako-api"; then
    echo "♻️  Restarting PM2..."
    pm2 restart amdako-api
else
    echo "🟢 Starting PM2..."
    pm2 start backend/server.js --name "amdako-api"
fi

pm2 save
pm2 startup > /dev/null 2>&1 || true

# Force Apache to acknowledge configuration changes
CUSER=$(whoami)
LIVE_HTACCESS="/home/$CUSER/public_html/amdako/.htaccess"

if [ -f "$LIVE_HTACCESS" ]; then
    echo "📄 Refreshing Apache .htaccess settings..."
    touch "$LIVE_HTACCESS" 2>/dev/null || true
fi

echo "✅ Application restarted!"
echo "📍 Domain: https://amdakostrategies.com.ng"