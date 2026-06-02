# ✅ FRONTEND DEPLOYMENT - QUICK STEPS

**Domain:** amdakostrategies.com.ng  
**Build Status:** ✅ Ready  
**Files Location:** `frontend/dist/`

---

## 📦 What's Built

```
frontend/dist/
├── index.html           (Main page)
├── favicon.svg
├── icons.svg
└── assets/              (CSS, JS, images)
    ├── vendor-*.js
    ├── index-*.js
    ├── charts-*.js
    ├── motion-*.js
    ├── *.css
    └── *.png (BTC, ETH)
```

---

## 🚀 FASTEST DEPLOYMENT (5 minutes)

### Step 1: Log in to Smatweb cPanel

Go to your hosting control panel

### Step 2: Create Upload.zip

**On your computer:**

1. Open `frontend/dist/` folder
2. Select ALL files inside (Ctrl+A):
   - `index.html`
   - `favicon.svg`
   - `icons.svg`
   - `assets/` folder
3. Zip them → `upload.zip`

### Step 3: Upload to cPanel

1. In cPanel, go to **File Manager**
2. Navigate to `public_html`
3. Create folder: `amdako`
4. Open `amdako` folder
5. Click **Upload**
6. Select `upload.zip`
7. Wait for upload
8. Right-click zip → **Extract**
9. Delete the zip

### Step 4: Create .htaccess

1. In `public_html/amdako/`, right-click
2. **Create New File** → name: `.htaccess`
3. Edit and paste:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>
```

4. Save

### Step 5: Add Domain

1. Go to **Addon Domains**
2. Add: `amdakostrategies.com.ng`
3. Document Root: `public_html/amdako`
4. Click **Add Domain**

### Step 6: Enable SSL

1. Go to **SSL/TLS**
2. Go to **AutoSSL** → **Manage**
3. Select your domain
4. Click **Check & Install**

### Step 7: Test

Visit: **https://amdakostrategies.com.ng** ✅

---

## 📋 Checklist

- [ ] Files zipped from `frontend/dist/`
- [ ] Uploaded to `public_html/amdako/`
- [ ] `.htaccess` created
- [ ] Domain added in cPanel
- [ ] SSL certificate installing
- [ ] Can access `https://amdakostrategies.com.ng`
- [ ] Frontend loads correctly
- [ ] No errors in browser console (F12)

---

## 🎉 DONE!

Your frontend is live at: **https://amdakostrategies.com.ng**

---

## What About the Backend?

Right now:
- ✅ Frontend is deployed
- ❌ Backend is NOT deployed yet
- ❌ API calls won't work

### When ready to add backend:
See: [PHASED_DEPLOYMENT_GUIDE.md](docs/PHASED_DEPLOYMENT_GUIDE.md)

For now, your frontend shows a landing page and is ready for users to see!

---

## Need Help?

- **Stuck on upload?** Use FileZilla (SFTP client)
- **SSL not working?** Wait 30 minutes for Auto SSL
- **404 on refresh?** Make sure `.htaccess` is in the right place
- **API errors?** That's normal - backend not deployed yet

See full guide: [FRONTEND_DEPLOYMENT_SMATWEB.md](FRONTEND_DEPLOYMENT_SMATWEB.md)
