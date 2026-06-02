# Frontend-Only Deployment to Smatweb

Deploy only the frontend (React app) to amdakostrategies.com.ng

---

## ✅ Build Complete

Your frontend is built and ready at: `frontend/dist/`

Files generated:
```
frontend/dist/
├── index.html                    (Main entry point)
├── assets/
│   ├── vendor-*.js              (React, libraries)
│   ├── index-*.js               (Your app code)
│   ├── charts-*.js              (Recharts)
│   ├── motion-*.js              (Framer Motion)
│   └── *.png                    (Images: BTC, ETH)
```

---

## Option 1: Upload via cPanel File Manager (EASIEST)

### Step 1: Log in to Smatweb cPanel

1. Go to your Smatweb hosting control panel
2. Log in with your credentials

### Step 2: Access File Manager

1. In cPanel, find **File Manager**
2. Navigate to `public_html` folder
3. Create a new folder: `amdako`

### Step 3: Upload Frontend Files

**Method A: ZIP Upload (Faster)**

1. On your computer, zip the contents of `frontend/dist/` (NOT the folder itself)
2. In cPanel File Manager, go to `public_html/amdako/`
3. Click **Upload** button
4. Select the zip file
5. After upload, right-click → **Extract**
6. Delete the zip file

**Method B: Direct File Upload**

1. In `public_html/amdako/`, upload each file/folder:
   - `index.html`
   - `assets/` folder

### Step 4: Create .htaccess for SPA Routing

In cPanel File Manager:

1. Navigate to `public_html/amdako/`
2. Right-click → **Create New File** → name it `.htaccess`
3. Edit the file and paste:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>
```

4. Save the file

### Step 5: Setup Domain in cPanel

1. Go to **Addon Domains** (or **Domains**)
2. Add new domain: `amdakostrategies.com.ng`
3. Set Document Root to: `public_html/amdako`
4. Click **Add Domain**

### Step 6: Setup SSL (HTTPS)

1. Go to **SSL/TLS Status**
2. Go to **AutoSSL** or **Manage SSL**
3. Select your domain: `amdakostrategies.com.ng`
4. Click **Check & Install** or **Install Certificate**
5. Wait for Let's Encrypt certificate

### Step 7: Test Your Frontend

1. Visit: `https://amdakostrategies.com.ng`
2. Your frontend should load! ✅
3. Check browser console (F12) for errors

---

## Option 2: Upload via SFTP/FTP (Traditional)

If you have SFTP/FTP enabled:

### Step 1: Connect via SFTP

```bash
# Using a client like FileZilla, WinSCP, or Cyberduck
Server: ftp.amdakostrategies.com.ng  (or your server IP)
Username: your-cpanel-username
Password: your-cpanel-password
Port: 21 (FTP) or 22 (SFTP)
```

### Step 2: Upload Files

1. Navigate to: `/public_html/amdako/`
2. Upload all files from `frontend/dist/`
3. Include the `.htaccess` file

### Step 3: Continue with Step 5-7 above

---

## Option 3: Git Deployment (For Frontend Only)

If you want to auto-update later:

### Step 1: Create Frontend-Only Repository (Optional)

```bash
# Create a separate frontend-only repo if you want
# Or just push everything and deploy from main branch
```

### Step 2: Deploy via cPanel Git

1. In cPanel, go to **Git Version Control**
2. Click **Create**
3. URL: `https://github.com/yourusername/AmdakoStrategies.git`
4. Branch: `main`
5. Click **Deploy**

After deployment, manually copy `frontend/dist/*` to `public_html/amdako/`

---

## What to Do About API Calls

Your frontend code tries to call `/api` endpoints (which don't exist yet since backend isn't deployed).

### Option A: Show "Coming Soon" Message

Edit frontend code to detect backend:

```typescript
// src/pages/LoginPage.tsx
const [isBackendReady, setIsBackendReady] = useState(false);

if (!isBackendReady) {
  return <h2>🚀 Backend Coming Soon - Check Back Later!</h2>;
}
```

Rebuild: `npm run build`

### Option B: Use Mock Data

For demo/preview purposes, create mock responses.

### Option C: Disable Auth Features

Only show landing page, hide login/dashboard until backend is ready.

---

## File Structure Deployed

```
public_html/amdako/
├── index.html
├── .htaccess
└── assets/
    ├── vendor-*.js
    ├── index-*.js
    ├── charts-*.js
    ├── motion-*.js
    ├── *.css
    └── *.png
```

---

## Testing Your Frontend

### 1. Basic Test
```
Visit: https://amdakostrategies.com.ng
Should see: Your homepage ✅
```

### 2. Routing Test
```
Click around the app
Try different pages
Should work smoothly
```

### 3. Console Test
```
Press F12 (Developer Tools)
Check Console tab
Should have NO red errors about /api
```

### 4. Mobile Test
```
Check on phone/tablet
Should be responsive
```

---

## Troubleshooting

### "Cannot find domain" error

**Solution:**
- DNS might not be propagated yet (24-48 hours)
- Use: `nslookup amdakostrategies.com.ng`
- Should return your Smatweb IP

### "404 errors when refreshing"

**Solution:**
- `.htaccess` file not working
- Verify it's in `public_html/amdako/`
- Make sure `<IfModule mod_rewrite.c>` section is there
- Contact Smatweb to enable mod_rewrite

### "HTTPS not working"

**Solution:**
- SSL might not be installed yet
- Go to cPanel → SSL/TLS → Auto SSL
- Wait a few minutes
- Or manually install Let's Encrypt certificate

### "Assets not loading (404 on CSS/JS)"

**Solution:**
- Check if `assets/` folder is uploaded
- Verify file names match in `index.html`
- Check file permissions (should be 644)

---

## Updating Frontend

When you update your frontend code:

### Step 1: Rebuild Locally
```bash
cd frontend
npm run build
```

### Step 2: Upload New Files
- Replace `public_html/amdako/assets/` with new files
- Update `index.html`

### Or use Git:
```bash
git add .
git commit -m "Update frontend"
git push origin main

# Then re-deploy from cPanel Git
```

---

## Performance Tips

### Gzip Compression
Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>
```

### Cache Headers
Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
</IfModule>
```

---

## Next: Adding Backend (Later)

When you're ready to add the backend:

1. Create `.env` on server
2. Deploy `backend/server.js` with PM2
3. Update web server config to proxy `/api` to backend
4. Rebuild frontend with API endpoints enabled
5. Deploy updated frontend

See: [docs/PHASED_DEPLOYMENT_GUIDE.md](docs/PHASED_DEPLOYMENT_GUIDE.md)

---

## Quick Checklist

- [ ] Frontend built: `frontend/dist/`
- [ ] Files uploaded to `public_html/amdako/`
- [ ] `.htaccess` created and in place
- [ ] Domain added in cPanel
- [ ] SSL certificate installed
- [ ] Can access `https://amdakostrategies.com.ng`
- [ ] No errors in browser console
- [ ] Pages route correctly
- [ ] Images/assets load
- [ ] Mobile responsive

---

## You're Live! 🎉

Your frontend is now live at: **https://amdakostrategies.com.ng**

Next step (when ready): Deploy backend to the same server.
