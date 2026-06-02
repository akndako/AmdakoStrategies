#!/bin/bash
# Frontend deployment script for cPanel Git

set -e

CUSER=$(whoami)
PUBLIC_HTML="/home/$CUSER/public_html"
FRONTEND_DIR="$PUBLIC_HTML/amdako"

echo "🔨 Building frontend..."
cd frontend
npm install --production
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not created"
    exit 1
fi

echo "✅ Frontend build complete"

echo "📁 Creating deployment directory..."
mkdir -p "$FRONTEND_DIR"

echo "📦 Copying files to $FRONTEND_DIR..."
cp -r dist/* "$FRONTEND_DIR/"

echo "🔧 Setting up .htaccess for SPA routing..."
cat > "$FRONTEND_DIR/.htaccess" << 'HTACCESS'
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>
HTACCESS

chmod 644 "$FRONTEND_DIR/.htaccess"

echo "✅ Frontend deployed successfully!"
echo ""
echo "✅ Deployment complete:"
echo "   - Files copied to: $FRONTEND_DIR"
echo "   - .htaccess configured for SPA routing"
echo "   - Website: https://amdakostrategies.com.ng"
echo ""
echo "📁 Deployed files:"
ls -lh "$FRONTEND_DIR" | head -20
