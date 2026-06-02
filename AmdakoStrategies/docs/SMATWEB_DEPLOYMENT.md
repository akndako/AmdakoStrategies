# Smatweb Deployment Guide - amdakostrategies.com.ng

Complete guide for deploying AmdakoStrategies to **Smatweb hosting** with domain **amdakostrategies.com.ng**

---

## 📋 Prerequisites Checklist

- ✅ Domain purchased: **amdakostrategies.com.ng**
- ✅ Hosting account with Smatweb (cPanel access)
- ✅ SSH terminal access enabled in cPanel
- ✅ Node.js available on Smatweb (confirmed)
- ✅ MongoDB Atlas account (for database)

---

## Step 1: Set Up MongoDB Atlas

Your database will be hosted on MongoDB Atlas (free tier available).

### 1.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a free cluster
4. Follow the setup wizard

### 1.2 Get Connection String

1. In MongoDB Atlas, go to **Connect**
2. Click **Connect your application**
3. Copy the connection string, it will look like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/amdako
   ```
4. **Replace `<password>` with your actual password**
5. Save this - you'll need it in Step 5

### 1.3 Add IP Whitelist

1. Go to **Network Access**
2. Click **Add IP Address**
3. Select **Allow access from anywhere** (or add Smatweb's IP)
4. Click **Confirm**

---

## Step 2: Point Domain to Smatweb

### 2.1 Update Nameservers (if needed)

1. Log in to your domain registrar (where you bought amdakostrategies.com.ng)
2. Go to **Nameservers** or **DNS Settings**
3. Update to Smatweb's nameservers:
   - Check Smatweb control panel for your nameservers
   - Usually something like: `ns1.smatweb.xxx` and `ns2.smatweb.xxx`
4. Save changes
5. **Wait 24-48 hours for DNS propagation**

### 2.2 Verify Domain Setup in cPanel

1. Log in to **Smatweb cPanel**
2. Go to **Addon Domains** or **Domain Manager**
3. Add domain: `amdakostrategies.com.ng`
4. Set public folder to: `public_html/amdako` (or preferred location)

---

## Step 3: Connect via SSH

### 3.1 SSH Into Smatweb

```bash
# Use cPanel credentials
ssh username@amdakostrategies.com.ng
# or use server IP
ssh username@147.124.214.12
```

### 3.2 Verify Node.js

```bash
node --version    # Should show v14+ or higher
npm --version     # Should show v6+
which node        # Shows node path
```

If Node.js is not available, contact Smatweb support to enable it.

---

## Step 4: Upload Your Code

### Option A: Using Git (Recommended)

```bash
# Navigate to the domain folder
cd ~/public_html/amdako

# Initialize git repo
git init

# Add your repository
git remote add origin https://github.com/yourusername/AmdakoStrategies.git

# Pull code
git pull origin main
```

### Option B: Using cPanel File Manager

1. Log in to **Smatweb cPanel**
2. Go to **File Manager**
3. Navigate to domain folder
4. Upload your files (or use **Import from URL** for a zip)

---

## Step 5: Create Environment File

```bash
# In your app directory on Smatweb
cd ~/public_html/amdako
nano .env
```

Paste this and update with your MongoDB URI:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Atlas Connection (from Step 1.2)
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/amdako

# JWT Secret (Generate: openssl rand -base64 32)
JWT_SECRET=your-generated-secret-key-here

# Domain Configuration (IMPORTANT: Your domain)
FRONTEND_URL=https://amdakostrategies.com.ng
VITE_API_URL=https://amdakostrategies.com.ng/api

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

LOG_LEVEL=info
```

**Save file:** Press `Ctrl+X`, then `Y`, then `Enter`

---

## Step 6: Install Dependencies & Build

```bash
# Install production dependencies only
npm ci --only=production

# Build frontend
npm run build

# Verify build succeeded
ls -la dist/  # Should list files
```

---

## Step 7: Setup Process Manager (PM2)

### 7.1 Install PM2 Globally

```bash
npm install -g pm2

# Verify PM2 is running
pm2 status
```

### 7.2 Start Your App with PM2

```bash
pm2 start server.js --name "amdako-api"

# Save configuration (auto-start on reboot)
pm2 save
pm2 startup

# Verify it's running
pm2 status
pm2 logs amdako-api
```

---

## Step 8: Configure Web Server

### 8.1 Using cPanel - Nginx Setup (Recommended)

1. Go to **cPanel Dashboard**
2. Find **EasyApache** or **Apache Configuration**
3. Ensure **Nginx** is enabled (if available)

Or ask Smatweb to enable Nginx for better performance.

### 8.2 Create Nginx Config (If Manually Configuring)

```bash
# Ask Smatweb for Nginx config location, usually:
sudo nano /etc/nginx/sites-available/amdakostrategies.com.ng
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name amdakostrategies.com.ng www.amdakostrategies.com.ng;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name amdakostrategies.com.ng www.amdakostrategies.com.ng;

    # SSL Certificates (Let's Encrypt - usually auto-generated in cPanel)
    ssl_certificate /home/username/ssl/amdakostrategies.com.ng/fullchain.pem;
    ssl_certificate_key /home/username/ssl/amdakostrategies.com.ng/privkey.pem;

    # Frontend - Static files from dist/
    location / {
        root /home/username/public_html/amdako/dist;
        try_files $uri /index.html;
    }

    # API - Proxy to Node.js backend
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:3000;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json;
}
```

### 8.3 Using cPanel's AutoSSL

1. Go to **cPanel > SSL/TLS**
2. Go to **Manage AutoSSL**
3. Select your domain
4. Click **Check & Install**
5. AutoSSL will install free Let's Encrypt certificate

---

## Step 9: Verify HTTPS/SSL

1. Go to cPanel > **SSL/TLS Status**
2. Verify `amdakostrategies.com.ng` shows **SSL installed** ✅
3. Visit `https://amdakostrategies.com.ng` in browser
4. Check for green lock icon 🔒

---

## Step 10: Test Your Deployment

### Test Frontend

```bash
curl -I https://amdakostrategies.com.ng
# Should return: HTTP/2 200
```

### Test Backend API

```bash
curl https://amdakostrategies.com.ng/health
# Should return health status
```

### Test in Browser

1. Visit: https://amdakostrategies.com.ng
2. Should load your homepage ✅
3. Open browser console (F12) - check for errors
4. Try logging in with test account
5. Check network requests - should see `/api/auth/login` calls

---

## Step 11: Setup Monitoring

### 11.1 PM2 Web Dashboard

```bash
# Start PM2 web dashboard (on port 9615)
pm2 web

# Access at: http://amdakostrategies.com.ng:9615
# Or use local tunnel
pm2 web --addr 127.0.0.1
```

### 11.2 Check Logs

```bash
# Real-time logs
pm2 logs amdako-api

# Specific lines
pm2 logs amdako-api --lines 50

# Save logs to file
pm2 logs amdako-api > /tmp/api-logs.txt
```

### 11.3 Monitor Resources

```bash
# Monitor CPU/Memory
pm2 monit

# Check process status
pm2 status
```

---

## Step 12: Update Application

When you update your code:

```bash
# Pull latest changes
git pull origin main

# Rebuild frontend
npm run build

# Restart backend
pm2 restart amdako-api

# Verify
curl https://amdakostrategies.com.ng/health
```

---

## Troubleshooting

### Domain Not Working?

```bash
# Check DNS propagation
nslookup amdakostrategies.com.ng
dig amdakostrategies.com.ng @8.8.8.8

# May take 24-48 hours
```

### Backend Not Running?

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs amdako-api

# Check if port 3000 is in use
netstat -tuln | grep 3000
lsof -i :3000

# Restart PM2
pm2 restart amdako-api
```

### CORS Errors?

```bash
# Verify .env FRONTEND_URL
cat .env | grep FRONTEND_URL
# Should be: FRONTEND_URL=https://amdakostrategies.com.ng

# Restart backend
pm2 restart amdako-api
```

### SSL Certificate Issues?

```bash
# Check certificate
sudo certbot certificates

# In cPanel:
# 1. Go to SSL/TLS Status
# 2. Check expiration date
# 3. AutoSSL should renew 30 days before expiry
```

### Build Failed?

```bash
# Check build log
npm run build 2>&1 | head -50

# Verify all dependencies
npm list

# Clean and rebuild
rm -rf dist node_modules
npm ci --only=production
npm run build
```

---

## Smatweb-Specific Tips

### Performance Optimization

1. **Enable cPanel's caching:**
   - Go to **cPanel > Performance**
   - Enable **PHP OPcache**
   - Enable **Memcached** (if available)

2. **Optimize Node.js:**
   ```bash
   # Use more PM2 instances for load balancing
   pm2 start server.js -i 4 --name "amdako-api"
   ```

3. **Enable Nginx:**
   - Ask Smatweb if Nginx is available
   - Faster than Apache for this use case

### Backup Strategy

```bash
# Backup MongoDB to local file
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/amdako" --out=~/backups

# Backup your code
tar -czf ~/backups/amdako-code-backup.tar.gz ~/public_html/amdako

# Schedule with cron
0 2 * * * tar -czf ~/backups/amdako-code-backup-$(date +\%Y\%m\%d).tar.gz ~/public_html/amdako
```

### Automatic SSL Renewal

Smatweb's AutoSSL (AutoCP) handles this automatically, but verify:

1. Go to **cPanel > SSL/TLS**
2. Go to **AutoSSL**
3. Enable for your domain
4. Check renewal logs periodically

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pm2 start server.js --name "amdako-api"` | Start app |
| `pm2 stop amdako-api` | Stop app |
| `pm2 restart amdako-api` | Restart app |
| `pm2 logs amdako-api` | View logs |
| `pm2 status` | Check status |
| `npm run build` | Build frontend |
| `curl https://amdakostrategies.com.ng/health` | Test backend |

---

## Support

**For Smatweb-specific issues:**
- Contact Smatweb support at https://www.smatweb.com
- They handle: DNS, SSL certificates, server management, Node.js configuration

**For app-specific issues:**
- Check logs: `pm2 logs amdako-api`
- Check environment: `cat .env`
- Restart: `pm2 restart amdako-api`

---

## Final Checklist

- [ ] Domain points to Smatweb (DNS updated)
- [ ] Code uploaded to Smatweb
- [ ] `.env` file created with MongoDB URI
- [ ] Dependencies installed
- [ ] Frontend built (`dist/` exists)
- [ ] PM2 started with `amdako-api`
- [ ] Nginx/Apache configured
- [ ] SSL certificate installed
- [ ] Can access `https://amdakostrategies.com.ng` ✅
- [ ] Backend responds to `/health` ✅
- [ ] Login functionality works ✅

**Your app is now live at: https://amdakostrategies.com.ng** 🚀
