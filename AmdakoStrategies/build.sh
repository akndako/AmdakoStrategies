#!/bin/bash
# Build script for cPanel Git Deployment

set -e

echo "🔨 Starting build..."

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