#!/bin/bash
# Build script for cPanel Git Deployment

set -e

echo "🔨 Starting build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build frontend
echo "🎨 Building frontend..."
npm run build

# Verify build
if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not created"
    exit 1
fi

echo "✅ Build completed successfully!"
