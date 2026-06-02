#!/bin/bash
# Frontend-only deployment script for cPanel Git

set -e

echo "🔨 Building frontend..."
cd frontend
npm install --production
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not created"
    exit 1
fi

echo "✅ Frontend build complete"
echo ""
echo "📁 Files built:"
ls -lh dist/
