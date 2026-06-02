#!/bin/bash
# Build script for cPanel Git Deployment

set -e

echo "🔨 Starting build..."

# Verify Server Identity and IP Configuration
EXPECTED_IP="147.124.214.12"
ACTUAL_IP=$(curl -s http://checkip.amazonaws.com || echo "unknown")
echo "🔍 Verifying Server IP: $ACTUAL_IP (Expected: $EXPECTED_IP)"
if [ "$ACTUAL_IP" != "$EXPECTED_IP" ] && [ "$ACTUAL_IP" != "unknown" ]; then
    echo "⚠️ Warning: IP mismatch detected. Verify DNS A-records and Apache VirtualHost settings."
fi

# Build frontend
echo "🎨 Building frontend..."
cd frontend
npm install --production
npm run build
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Verify builds (the .cpanel.yml test_command will handle this)

echo "✅ Build completed successfully!"