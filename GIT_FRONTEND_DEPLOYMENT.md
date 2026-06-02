# ✅ DEPLOY FRONTEND USING GIT

Use cPanel Git deployment to automatically pull and deploy your frontend.

---

## 🎯 Setup (3 Steps)

### Step 1: Prepare Your Repository

Your code is already pushed to GitHub. Just verify:

```bash
git log --oneline
# Should show your recent commits
```

---

### Step 2: Create Frontend-Only Deploy Script

In Smatweb cPanel, create a deployment script that:
1. Pulls latest code from GitHub
2. Builds frontend (`npm run build`)
3. Copies `frontend/dist/` to web root

**Create file in root:** `deploy-frontend.sh`

```bash
#!/bin/bash

echo "🔨 Building frontend..."
cd frontend
npm install --production
npm run build
cd ..

echo "📁 Copying to web root..."
rm -rf /home/username/public_html/amdako/*
cp -r frontend/dist/* /home/username/public_html/amdako/

echo "✅ Frontend deployed!"
```

Replace `username` with your cPanel username.

---

### Step 3: Setup cPanel Git Deployment

**BEST OPTION:** Update your existing `.cpanel.yml` for frontend-only:

1. Edit `.cpanel.yml` in your repository root:

```yaml
---
deployment:
  targets:
    - deployment_target: "amdakostrategies.com.ng"
      repository_root: "/"
      working_directory: "/"
      build_command: "/bin/bash deploy-frontend.sh"
      test_command: "test -f /home/username/public_html/amdako/index.html"
      restart_reload_command: "echo 'Frontend deployed'"
```

2. Commit and push:

```bash
git add .cpanel.yml deploy-frontend.sh
git commit -m "Setup frontend-only Git deployment"
git push origin main
```

---

## 🚀 Deploy from cPanel

1. Log in to **Smatweb cPanel**
2. Go to **Git Version Control** (or **Manage Repositories**)
3. Click **Create**
4. Enter:
   - **Repository URL:** `https://github.com/yourusername/AmdakoStrategies.git`
   - **Branch:** `main`
   - **Click:** **Create Repository**

5. After created, click **Deploy**
6. Click **Deploy Now**

cPanel will:
- ✅ Pull latest code from GitHub
- ✅ Build frontend (npm run build)
- ✅ Copy `frontend/dist/` to `public_html/amdako/`
- ✅ Your site is updated!

---

## 📝 Important: Add .htaccess

After first deploy, **manually add** `.htaccess` to `public_html/amdako/`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>
```

Or add to your repository and copy it in deploy script:

```bash
cp .htaccess /home/username/public_html/amdako/
```

---

## 🔄 Future Updates

Now, every time you push to GitHub:

```bash
# Make changes locally
npm run build

# Commit and push
git add .
git commit -m "Update frontend"
git push origin main

# Then in cPanel Git → Deploy Now
# OR enable auto-deploy (if available)
```

---

## ✅ Complete Setup Checklist

- [ ] `.cpanel.yml` configured for frontend-only
- [ ] `deploy-frontend.sh` created
- [ ] Files committed and pushed to GitHub
- [ ] cPanel Git repository created
- [ ] Clicked "Deploy Now"
- [ ] Wait for deployment to complete
- [ ] Can access `https://amdakostrategies.com.ng`
- [ ] `.htaccess` is in place
- [ ] Frontend loads correctly

---

## 🎉 Result

Your frontend is deployed via Git! 

**Advantages:**
- ✅ No manual file uploads
- ✅ One-click redeploy
- ✅ Always matches GitHub code
- ✅ Easy to update later
- ✅ Automatic builds

---

## Troubleshooting

### Deploy fails with "command not found"

Check deployment log in cPanel:
- Go to **Git Version Control**
- Click your repo
- Look for **Deployment Logs**
- See what went wrong

### Common issues:

**"npm: command not found"**
- Smatweb may need to enable npm
- Contact support: "Please enable npm on my account"

**"Permission denied"**
- Check path in `deploy-frontend.sh`
- Use correct username (get from cPanel > Account Info)

**"frontend/dist/ not found"**
- Verify `npm run build` completed
- Check file permissions

---

## 🚀 Advanced: Auto-Deploy

Some cPanel versions support auto-deploy on push. Check:

1. In **Git Version Control**
2. Select your repo
3. Look for **Settings** or **Auto Deploy** option
4. If available, enable it

Then every push automatically deploys!

---

## Switch Back to Manual Upload?

If Git doesn't work, fall back to:
[FIX_FRONTEND_DEPLOYMENT.md](FIX_FRONTEND_DEPLOYMENT.md)
