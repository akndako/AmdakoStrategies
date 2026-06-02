# Custom Domain Deployment Guide

Deploy your AmdakoStrategies app to your own domain on shared hosting.

---

## Prerequisites

- ✅ Purchased domain
- ✅ Shared hosting with Node.js support
- ✅ SSH/Terminal access to your server
- ✅ MongoDB atlas account (or local MongoDB)
- ✅ SSL certificate (usually free with hosting)

---

## Step 1: Point Your Domain to Your Hosting

1. Log in to your domain registrar
2. Find **DNS Settings** or **Nameservers**
3. Update nameservers to match your hosting provider's:
   - Example: `ns1.hostingcompany.com`, `ns2.hostingcompany.com`
   - Or set A record to your hosting IP: `yourdomain.com → xxx.xxx.xxx.xxx`
4. Wait 24-48 hours for DNS propagation
5. Verify with: `nslookup yourdomain.com` or check online DNS checker

---

## Step 2: Connect to Your Server

### Via SSH

```bash
ssh username@yourdomain.com
# or
ssh username@your-server-ip
```

---

## Step 3: Prepare Your Server

### Check Node.js & npm

```bash
node --version   # Should be v20 or higher
npm --version

# If not installed, install Node.js:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Check for Process Manager (PM2)

```bash
npm list -g pm2

# If not installed:
sudo npm install -g pm2
pm2 startup
pm2 save
```

---

## Step 4: Upload Your Code

### Option A: Using Git (Recommended)

```bash
# On your server, navigate to home or public folder:
cd ~/public_html  # or appropriate folder

# Clone your repository
git clone https://github.com/yourusername/AmdakoStrategies.git
cd AmdakoStrategies

# Or if already cloned, pull latest:
git pull origin main
```

### Option B: Using SFTP/FTP

- Upload files using FileZilla, WinSCP, or hosting provider's file manager
- Ensure `.env` file is NOT uploaded via FTP (create it on server manually)

---

## Step 5: Setup Environment Variables

```bash
# On your server, in the app directory:
nano .env
```

Paste this and update with your values:

```env
# Server
PORT=3000
NODE_ENV=production

# MongoDB (Use MongoDB Atlas or local instance)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/amdako

# JWT (Generate with: openssl rand -base64 32)
JWT_SECRET=your-secret-key-here-generate-a-strong-one

# Frontend & API URLs (UPDATE WITH YOUR DOMAIN)
FRONTEND_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com
# Or if single domain:
# FRONTEND_URL=https://yourdomain.com
# VITE_API_URL=https://yourdomain.com/api

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

LOG_LEVEL=info
```

**Save file:**
- Press `Ctrl+X`, then `Y`, then `Enter`

---

## Step 6: Install Dependencies & Build

```bash
# Install production dependencies
npm ci --only=production

# Build frontend
npm run build

# Verify build succeeded
ls -la dist/  # Should have files
```

---

## Step 7: Setup Process Manager (PM2)

```bash
# Start the backend with PM2
pm2 start server.js --name "amdako-api"

# Verify it's running
pm2 status

# Make it auto-start on server reboot
pm2 startup
pm2 save
```

Check if running:

```bash
pm2 logs amdako-api
```

---

## Step 8: Configure Your Web Server (Nginx or Apache)

### For Nginx (Recommended)

```bash
# Create config file
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificate (from Let's Encrypt or hosting provider)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend - Static files from dist/
    location / {
        root /path/to/app/dist;
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

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000;
    }
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### For Apache

Enable mod_rewrite and mod_proxy:

```bash
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
```

Create `.htaccess` in your `dist/` folder:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>

# Proxy API requests to Node.js
ProxyPass /api http://localhost:3000/api
ProxyPassReverse /api http://localhost:3000/api
```

---

## Step 9: Setup SSL Certificate (HTTPS)

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx
# or for Apache:
# sudo apt-get install certbot python3-certbot-apache

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# For Apache:
# sudo certbot certonly --apache -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## Step 10: Test Your Deployment

### Test frontend:

```bash
curl -I https://yourdomain.com
# Should return 200
```

### Test backend API:

```bash
curl https://yourdomain.com/health
# Should return health status
```

### Test login endpoint:

```bash
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

---

## Step 11: Monitor & Maintain

### Check Logs

```bash
# PM2 logs
pm2 logs amdako-api

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u amdako-api -f
```

### Update Application

```bash
# In app directory:
git pull origin main
npm ci --only=production
npm run build
pm2 restart amdako-api
```

### Monitor Server Health

```bash
# Check disk usage
df -h

# Check memory
free -h

# Check CPU
top -b -n 1 | head -20

# Monitor with PM2
pm2 monit
```

---

## Troubleshooting

### Domain Not Resolving

```bash
# Check DNS propagation
nslookup yourdomain.com
dig yourdomain.com

# Wait 24-48 hours after pointing domain
```

### Backend Not Running

```bash
pm2 status
pm2 logs amdako-api
lsof -i :3000  # Check if port 3000 is in use
```

### HTTPS Not Working

```bash
# Check certificate
sudo certbot certificates

# Renew if needed
sudo certbot renew --force-renewal
```

### CORS Errors

Update `.env` FRONTEND_URL to match your domain:

```env
FRONTEND_URL=https://yourdomain.com
```

Then restart:

```bash
pm2 restart amdako-api
```

---

## Performance Tips

1. **Enable Gzip Compression**
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json;
   ```

2. **Set Cache Headers**
   ```nginx
   location ~* \.(js|css|png|jpg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. **Monitor Memory Usage**
   ```bash
   pm2 start server.js --max-memory-restart 500M
   ```

4. **Setup Backups**
   ```bash
   # Backup MongoDB daily
   0 2 * * * mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/amdako" --out=/backups/mongodb
   ```

---

## Rollback Steps

If something breaks:

```bash
# Stop the app
pm2 stop amdako-api

# Go back to previous version
git revert HEAD  # or specific commit
npm run build

# Restart
pm2 restart amdako-api
```

---

## Next Steps

- [ ] Point domain DNS to hosting
- [ ] Upload code via Git or SFTP
- [ ] Create `.env` file on server
- [ ] Install dependencies
- [ ] Build frontend
- [ ] Start backend with PM2
- [ ] Configure web server (Nginx/Apache)
- [ ] Setup SSL certificate
- [ ] Test all endpoints
- [ ] Setup monitoring and backups
