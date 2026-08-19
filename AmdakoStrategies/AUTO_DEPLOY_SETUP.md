# 🚀 Automatic Deployment to SmartWeb cPanel

**Setup:** One-time configuration (10 minutes)
**Result:** Every push to `main` automatically updates `https://amdakostrategies.com.ng`

---

## How It Works

```
You push to main on GitHub
        ↓
GitHub Actions runs (automatically)
        ↓
Builds your frontend (npm run build)
        ↓
SSHes into SmartWeb server
        ↓
Copies frontend/dist/* → /home/USERNAME/public_html/amdako/
        ↓
Sets permissions & creates .htaccess
        ↓
Your website is LIVE ✅
```

---

## Step 1: Enable SSH Access in SmartWeb cPanel

1. Log in to your **SmartWeb cPanel** (https://amdakostrategies.com.ng:2083)
2. Search for **"SSH Access"** (or **"Terminal"**)
3. Click **Manage SSH Keys** (or **Generate a New Key**)
4. Select **Generate a New Key**
   - Key name: `github-deploy`
   - Key type: `RSA` (or Ed25519)
   - Key size: `4096` (or 256 for Ed25519)
5. Click **Generate Key**
6. **Authorize** the public key:
   - Click **Manage** next to the generated key
   - Click **Authorize** to allow login

---

## Step 2: Get Your SSH Details Needed for GitHub

### A. SSH Host
Use your server IP: **`147.124.214.12`**
(Or use `amdakostrategies.com.ng` if it resolves to that IP)

### B. SSH Username
This is your cPanel username (e.g., `akndako`)
- Find it in cPanel: top-right corner shows your username
- Or go to **Account Information** to see it

### C. SSH Private Key
1. In cPanel → **SSH Access** → **Manage SSH Keys**
2. Find your key (e.g., `github-deploy`)
3. Click **View/Download** next to the **Private Key**
4. Copy the ENTIRE private key content (starts with `-----BEGIN RSA PRIVATE KEY-----` or `-----BEGIN OPENSSH PRIVATE KEY-----`)
5. Keep this safe - it's like a password!

---

## Step 3: Add Secrets to GitHub Repository

1. Go to **https://github.com/akndako/AmdakoStrategies**
2. Click **Settings** tab
3. In left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** and add each one:

### Secret 1: SSH_HOST
```
Name:  SSH_HOST
Value: 147.124.214.12
```

### Secret 2: SSH_USERNAME
```
Name:  SSH_USERNAME
Value: your-cpanel-username   (e.g., akndako)
```

### Secret 3: SSH_PRIVATE_KEY
```
Name:  SSH_PRIVATE_KEY
Value: (paste the ENTIRE private key from Step 2C)
```

### Secret 4: SSH_PORT (optional)
```
Name:  SSH_PORT
Value: 22
```
(Only add if your SSH port isn't 22)

### Secret 5 & 6: Supabase Variables (REQUIRED for building)
```
Name:  VITE_SUPABASE_URL
Value: https://dsepwmthxtgkwgemaglv.supabase.co

Name:  VITE_SUPABASE_ANON_KEY
Value: your-supabase-anon-key
```
> ⚠️ **IMPORTANT:** Without these, the build will fail because `vite.config.ts` references them through `process.env.VITE_SUPABASE_URL` and `process.env.VITE_SUPABASE_ANON_KEY`. Find them in your Supabase dashboard → Project Settings → API.

---

## Step 4: Push This Configuration to GitHub

```bash
cd c:\Users\akndako\Desktop\AmdakoStrategies\AmdakoStrategies

# Add the new workflow file
git add .github/workflows/deploy.yml AUTO_DEPLOY_SETUP.md

# Commit
git commit -m "Add GitHub Actions auto-deploy to SmartWeb cPanel"

# Push to main (this will trigger the first deployment!)
git push origin main
```

---

## Step 5: Watch It Deploy Automatically

1. Go to **https://github.com/akndako/AmdakoStrategies**
2. Click **Actions** tab (top nav)
3. You'll see your workflow running: **"Auto Deploy to SmartWeb cPanel"**
4. Click on it to see live logs
5. When all steps show ✅, your site is deployed!

---

## Step 6: Verify Your Website

1. Visit: **https://amdakostrategies.com.ng**
2. Hard refresh: `Ctrl+Shift+R`
3. Your latest changes should be live ✅

---

## From Now On...

### Every time you want to update your site:

```bash
git add .
git commit -m "Your change description"
git push origin main
```

**That's it!** GitHub Actions automatically:
- ✅ Builds the frontend
- ✅ Deploys to SmartWeb
- ✅ Sets correct permissions
- ✅ Creates/updates .htaccess
- ✅ Website is updated within ~2-3 minutes

---

## Testing the Workflow Manually

You can also trigger deployment without pushing:

1. Go to **GitHub → Actions** tab
2. Select **"Auto Deploy to SmartWeb cPanel"** on the left
3. Click **"Run workflow"** button (top right)
4. Select branch: `main`
5. Click **"Run workflow"**
6. Watch it deploy!

---

## Troubleshooting

### "Workflow not showing up"
- Make sure you pushed `.github/workflows/deploy.yml` to the `main` branch
- Check the Actions tab - it should appear after the push

### "SSH connection failed" / "Permission denied"
- Verify `SSH_HOST` is `147.124.214.12` (or your correct server IP)
- Verify `SSH_USERNAME` is your exact cPanel username
- Make sure you **authorized** the SSH key in cPanel (Step 1, last bullet)
- Re-check the private key is pasted exactly (including BEGIN/END lines)

### "Build failed" / "VITE_SUPABASE_URL is not defined"
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` secrets in GitHub
- They must match what's in your Supabase project

### "npm ci failed"
- Make sure `frontend/package-lock.json` is committed to the repo
- Check the Actions log for the exact error

### "Files not appearing on website"
- Check the Actions run - did all steps pass?
- Verify the SSH target path: `/home/YOUR_USERNAME/public_html/amdako`
- Check cPanel File Manager → `public_html/amdako/` - files should be there

### "Old page still showing"
- Hard refresh browser: `Ctrl+Shift+R`
- Wait 2-3 minutes after the workflow completes
- Check GitHub Actions logs for "✅ Deployment complete"

### "Permission denied" on server
- The workflow uses SSH key auth (not password)
- Make sure the key is authorized in cPanel
- Contact SmartWeb support if SSH keys aren't available

---

## Security Notes

🔒 **Never share your SSH private key**
🔒 **Never commit secrets to the repository**
🔒 **Secrets are encrypted by GitHub** - only visible in Actions settings
🔒 **If the key is compromised:** Delete it in cPanel → generate a new one → update the `SSH_PRIVATE_KEY` secret

---

## Quick Reference

| Item | Value |
|------|-------|
| **GitHub Repo** | https://github.com/akndako/AmdakoStrategies |
| **Workflow File** | `.github/workflows/deploy.yml` |
| **Server IP** | `147.124.214.12` |
| **Deploy Path** | `/home/YOUR_USERNAME/public_html/amdako/` |
| **Domain** | https://amdakostrategies.com.ng |
| **Trigger** | Push to `main` branch |

---

**Your site will now auto-deploy on every push to main! 🚀**