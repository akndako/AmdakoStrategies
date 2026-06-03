#!/bin/bash
# Frontend deployment script for cPanel Git

set -e

CUSER=$(whoami)
PUBLIC_HTML="/home/$CUSER/public_html"
FRONTEND_DIR="$PUBLIC_HTML/amdako"

# Move to the script's directory to ensure relative paths work
cd "$(dirname "$0")"

echo "🔨 Building frontend..."
cd frontend

# We must install all dependencies (including devDeps) to run the build (Vite/TypeScript)
npm install --include=dev

# Ensure clean build and prevent "uncommitted changes" errors
# by removing the build directory if it exists within the repo
rm -rf dist
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
# Security and MIME Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    # Updated CSP to allow 'eval' for libraries like jsPDF/html2canvas
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; connect-src 'self' https://amdakostrategies.com.ng https://www.amdakostrategies.com.ng; font-src 'self' https://fonts.gstatic.com; worker-src 'self' blob:; frame-ancestors 'none';"
</IfModule>

# Standard MIME Types
AddType application/javascript .js
AddType application/javascript .mjs
AddType text/css .css

<IfModule mod_rewrite.c>
    RewriteEngine On

    # 1. Force HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    RewriteBase /

    # 2. Fix MIME issues: Do NOT rewrite requests for static assets that don't exist
    # This prevents the server from sending index.html (text/html) when a .js file is missing
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ - [L,R=404]

    # 3. SPA Routing catch-all
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

# 🛡️ PERMANENT FIX for "Uncommitted changes" error:
# Remove the node_modules and dist folder from the repo path 
# so the working tree stays clean for the next Git pull.
cd ..
rm -rf frontend/node_modules
rm -rf frontend/dist
