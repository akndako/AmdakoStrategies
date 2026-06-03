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
<IfModule mod_headers.c>
    # Comprehensive CSP to allow 'eval' for jsPDF/html2canvas and blob/worker support
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; connect-src 'self' https://amdakostrategies.com.ng https://www.amdakostrategies.com.ng; font-src 'self' https://fonts.gstatic.com; worker-src 'self' blob:; frame-ancestors 'none';"
</IfModule>

# Ensure JavaScript files are served with the correct MIME type
AddType application/javascript .js
AddType application/javascript .mjs
AddType text/css .css

<IfModule mod_rewrite.c>
    RewriteEngine On

    # 1. Force HTTPS Redirection (Should always be first)
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    RewriteBase /

    # 2. Prevent SPA rewrite for static assets
    # This ensures that if a JS/CSS file is missing, it returns 404 instead of index.html
    RewriteRule ^assets/(.*) - [L]

    # 3. SPA Routing
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [L]
</IfModule>
HTACCESS

echo "🔧 Setting file permissions..."
chmod 644 "$FRONTEND_DIR/.htaccess"
find "$FRONTEND_DIR" -type d -exec chmod 755 {} \;
find "$FRONTEND_DIR" -type f -exec chmod 644 {} \;

echo "✅ Frontend deployed successfully!"
echo ""
echo "✅ Deployment complete:"
echo "   - Files copied to: $FRONTEND_DIR"
echo "   - .htaccess configured for SPA routing"
echo "   - Website: https://amdakostrategies.com.ng"
echo ""
echo "📁 Deployed files:"
ls -lh "$FRONTEND_DIR" | head -20
