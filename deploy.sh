#!/bin/bash
# Production deployment script

set -e

echo "🔍 Starting production deployment checks..."

# Check environment
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create it from .env.example"
    exit 1
fi

if [ -z "$NODE_ENV" ]; then
    export NODE_ENV=production
fi

echo "📦 Installing dependencies..."
npm ci --only=production

echo "🔨 Building frontend..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo "🔒 Checking environment variables..."
required_vars=("MONGO_URI" "JWT_SECRET" "NODE_ENV")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Missing required environment variable: $var"
        exit 1
    fi
done

echo "✅ All checks passed!"
echo "🚀 Ready for deployment"
echo ""
echo "Next steps:"
echo "1. Backend: npm run server (or use PM2: pm2 start server.js)"
echo "2. Frontend: Deploy 'dist' folder to hosting"
echo "3. Verify: Check health endpoint: http://localhost:4000/health"
