#!/bin/bash
# Restart script for cPanel Git Deployment

set -e

echo "🚀 Restarting application..."

# Install PM2 globally if not exists
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# Start or restart the app
if pm2 list | grep -q "amdako-api"; then
    echo "♻️  Restarting existing PM2 process..."
    pm2 restart amdako-api
else
    echo "🟢 Starting new PM2 process..."
    pm2 start server.js --name "amdako-api"
fi

# Save PM2 configuration
pm2 save

# Setup auto-restart on reboot
pm2 startup > /dev/null 2>&1 || true

echo "✅ Application restarted successfully!"
