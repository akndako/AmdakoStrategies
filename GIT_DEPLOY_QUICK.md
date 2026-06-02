# ✅ GIT FRONTEND DEPLOYMENT - QUICK START

**Much better than manual upload!**

---

## 🚀 DEPLOY IN 3 STEPS

### Step 1: Commit Changes Locally

```bash
cd c:\Users\akndako\Desktop\AmdakoStrategies

git add .cpanel.yml deploy-frontend.sh
git commit -m "Setup Git deployment for frontend"
git push origin main
```

### Step 2: Login to Smatweb cPanel

Go to your hosting control panel and login.

### Step 3: Deploy via Git

1. Click **Git Version Control** (or **Manage Repositories**)
2. Click **Create**
3. Enter:
   - **Repository URL:** `https://github.com/yourusername/AmdakoStrategies.git`
   - **Branch:** `main`
4. Click **Create Repository**
5. Once created, click **Deploy**
6. Click **Deploy Now** (wait 1-2 minutes)

---

## ✅ After Deployment

You should see in cPanel deployment logs:
```
✅ Building frontend...
✅ Frontend build complete
✅ Frontend deployed successfully
```

---

## 📝 Add .htaccess (Important!)

After first deployment, manually add `.htaccess` to make routing work:

1. In cPanel → **File Manager**
2. Navigate to `public_html/amdako/`
3. Create file: `.htaccess`
4. Paste:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>
```

---

## 🧪 Test

Visit: `https://amdakostrategies.com.ng`

You should see your React app! ✅

---

## 🔄 Update Anytime

```bash
# Make changes locally
npm run build

# Push to GitHub
git add .
git commit -m "Update frontend"
git push origin main

# In cPanel: Git Version Control → Deploy Now
```

---

## 📚 Full Guide

See: [GIT_FRONTEND_DEPLOYMENT.md](GIT_FRONTEND_DEPLOYMENT.md)

---

## Files Changed

- ✅ `.cpanel.yml` - Updated for frontend-only
- ✅ `deploy-frontend.sh` - Build script (NEW)
- ✅ Ready to commit and deploy!
