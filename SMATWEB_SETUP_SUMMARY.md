# 🎯 Smatweb Setup Summary - amdakostrategies.com.ng

**Setup Date:** June 2, 2026  
**Status:** ✅ Ready for Deployment  
**Domain:** amdakostrategies.com.ng  
**Hosting:** Smatweb (cPanel)  
**Database:** MongoDB Atlas (Cloud)  

---

## Your Configuration

```
Frontend URL:  https://amdakostrategies.com.ng
API URL:       https://amdakostrategies.com.ng/api
Health Check:  https://amdakostrategies.com.ng/health
Backend Port:  3000 (local, proxied by Nginx/Apache)
Process Mgr:   PM2
Web Server:    Nginx or Apache
SSL:           Let's Encrypt (AutoSSL via cPanel)
Database:      MongoDB Atlas (Cloud)
```

---

## Documentation Files

### 1. **[SMATWEB_DEPLOYMENT.md](SMATWEB_DEPLOYMENT.md)** 📖
Complete 12-step deployment guide:
- Step 1: MongoDB Atlas setup
- Step 2: Point domain to Smatweb
- Step 3: SSH connection
- Step 4: Upload code
- Step 5: Create `.env` file
- Step 6: Install dependencies & build
- Step 7: Setup PM2
- Step 8: Configure web server
- Step 9: Setup SSL certificate
- Step 10: Test deployment
- Step 11: Setup monitoring
- Step 12: Update application

### 2. **[SMATWEB_DEPLOYMENT_CHECKLIST.md](SMATWEB_DEPLOYMENT_CHECKLIST.md)** ✅
Pre-deployment verification checklist:
- Pre-deployment setup
- DNS configuration
- Code deployment
- Backend deployment
- Frontend deployment
- SSL/HTTPS setup
- Testing procedures
- Security verification
- Performance verification
- Monitoring setup

### 3. **[QUICK_START_DEPLOYMENT.md](QUICK_START_DEPLOYMENT.md)** ⚡
5-step quick reference:
- Perfect for experienced developers
- Fast deployment path
- Common commands reference

### 4. **[.env.example](.env.example)** 📋
Environment variables template with comments for:
- Server configuration
- MongoDB URI (from MongoDB Atlas)
- JWT secret
- Domain URLs
- Rate limiting

---

## Quick Start (5 Minutes)

### Step 1: Update DNS (24-48 hours)
1. Log in to domain registrar (where you bought amdakostrategies.com.ng)
2. Go to **Nameservers** or **DNS Settings**
3. Update to Smatweb's nameservers:
   - Check Smatweb control panel for your nameservers
4. Save and wait for propagation

### Step 2: Connect via SSH
```bash
ssh username@amdakostrategies.com.ng
```

### Step 3: Setup Code
```bash
cd ~/public_html/amdako
git clone https://github.com/yourusername/AmdakoStrategies.git .
nano .env
```

### Step 4: Configure `.env`
```env
# From MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/amdako

# Generate: openssl rand -base64 32
JWT_SECRET=your-secret-here

# Your domain
FRONTEND_URL=https://amdakostrategies.com.ng
VITE_API_URL=https://amdakostrategies.com.ng/api

# Other settings
NODE_ENV=production
PORT=3000
```

### Step 5: Build & Deploy
```bash
npm ci --only=production
npm run build
npm install -g pm2
pm2 start server.js --name "amdako-api"
pm2 save
pm2 startup
```

### Step 6: SSL in cPanel
1. Go to **cPanel → SSL/TLS Status**
2. Click **Manage AutoSSL**
3. Select your domain
4. Click **Check & Install**

**Done!** Your app is now live at: **https://amdakostrategies.com.ng** 🚀

---

## Important Files on Your Server

| File | Location | Purpose |
|------|----------|---------|
| `.env` | `~/public_html/amdako/.env` | Configuration (NOT in Git) |
| `server.js` | `~/public_html/amdako/server.js` | Backend API |
| `dist/` | `~/public_html/amdako/dist/` | Frontend (built) |
| `node_modules/` | `~/public_html/amdako/node_modules/` | Dependencies |

---

## Key Commands for Smatweb

```bash
# SSH Access
ssh username@amdakostrategies.com.ng

# Navigate to app
cd ~/public_html/amdako

# Check app status
pm2 status

# View real-time logs
pm2 logs amdako-api

# View last 50 lines
pm2 logs amdako-api --lines 50

# Restart app
pm2 restart amdako-api

# Stop app (if needed)
pm2 stop amdako-api

# Start app (if stopped)
pm2 start server.js --name "amdako-api"

# Monitor resources
pm2 monit

# Build frontend
npm run build

# Test backend
curl https://amdakostrategies.com.ng/health
```

---

## MongoDB Setup (Atlas)

### Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create free cluster

### Get Connection String
1. Go to **Clusters**
2. Click **Connect**
3. Click **Connect Your Application**
4. Copy connection string
5. Replace `<password>` with your actual password
6. Add to `.env` as `MONGO_URI`

### Whitelist IPs
1. Go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow access from anywhere**
4. Click **Confirm**

---

## Troubleshooting

### Domain not working?
```bash
# Check DNS propagation
nslookup amdakostrategies.com.ng
# Should return Smatweb's IP
# May take 24-48 hours
```

### Backend not running?
```bash
# Check PM2 status
pm2 status

# View logs for errors
pm2 logs amdako-api

# Check if port 3000 is in use
lsof -i :3000

# Restart
pm2 restart amdako-api
```

### CORS errors?
```bash
# Verify .env has correct domain
cat .env | grep FRONTEND_URL

# Should show: https://amdakostrategies.com.ng

# Restart app
pm2 restart amdako-api
```

### SSL certificate issues?
1. Go to **cPanel → SSL/TLS Status**
2. Check if certificate is installed (green checkmark)
3. Go to **AutoSSL** and click **Check & Install** if missing
4. Let's Encrypt certificate should renew automatically

### Build failed?
```bash
# Check what went wrong
npm run build

# Clear and rebuild
rm -rf dist node_modules
npm ci --only=production
npm run build
```

---

## Monitoring & Maintenance

### Daily Tasks
- [ ] Check PM2 logs: `pm2 logs amdako-api`
- [ ] Monitor memory usage: `pm2 monit`

### Weekly Tasks
- [ ] Test health endpoint
- [ ] Verify SSL certificate status
- [ ] Check server disk space

### Monthly Tasks
- [ ] Backup database (MongoDB Atlas auto-backups)
- [ ] Backup code (git clone)
- [ ] Review error logs

### Quarterly Tasks
- [ ] Rotate JWT_SECRET (update `.env`)
- [ ] Security audit
- [ ] Performance review

---

## Update Your Application

When you have new code to deploy:

```bash
# SSH into server
ssh username@amdakostrategies.com.ng

# Navigate to app
cd ~/public_html/amdako

# Pull latest code
git pull origin main

# Rebuild frontend
npm run build

# Restart backend
pm2 restart amdako-api

# Verify
curl https://amdakostrategies.com.ng/health
```

---

## Rollback (If Something Goes Wrong)

```bash
# Stop the app
pm2 stop amdako-api

# Go back to previous code version
git revert HEAD
# or
git checkout previous-commit-hash

# Rebuild
npm run build

# Restart
pm2 restart amdako-api

# Verify
pm2 logs amdako-api
```

---

## Support Contacts

| Issue | Contact |
|-------|---------|
| **Smatweb Hosting Issues** | https://www.smatweb.com/contact |
| **Domain/DNS Issues** | Your domain registrar support |
| **MongoDB Issues** | https://www.mongodb.com/support |
| **SSL Certificate Issues** | Smatweb support (Let's Encrypt via cPanel) |
| **Node.js Issues** | Smatweb support for hosting questions |

---

## Final Checklist

Before going live, verify:

- [ ] Domain points to Smatweb (DNS propagated)
- [ ] Code uploaded to `~/public_html/amdako`
- [ ] `.env` file created with all variables
- [ ] `npm ci --only=production` completed
- [ ] `npm run build` completed
- [ ] `dist/` folder has files
- [ ] `pm2 start server.js` running
- [ ] SSL certificate installed in cPanel
- [ ] Can access `https://amdakostrategies.com.ng`
- [ ] `/health` endpoint responds
- [ ] No errors in `pm2 logs`

---

## Your Domain is Live! 🎉

**Visit:** https://amdakostrategies.com.ng

**API Endpoint:** https://amdakostrategies.com.ng/api

**Health Check:** https://amdakostrategies.com.ng/health

For detailed instructions, see [SMATWEB_DEPLOYMENT.md](SMATWEB_DEPLOYMENT.md)

For detailed questions, refer to the [SMATWEB_DEPLOYMENT_CHECKLIST.md](SMATWEB_DEPLOYMENT_CHECKLIST.md)
