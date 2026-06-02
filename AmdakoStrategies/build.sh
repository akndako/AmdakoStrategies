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

# Verify builds
if [ ! -d "frontend/dist" ]; then
    echo "❌ Frontend build failed - dist folder not created"
    exit 1
fi

if [ ! -f "backend/server.js" ]; then
    echo "❌ Backend server.js not found"
    exit 1
fi

echo "✅ Build completed successfully!"
