# Smatweb Deployment Checklist - amdakostrategies.com.ng

Complete checklist for deploying to Smatweb hosting.

---

## Pre-Deployment

### Domain & Hosting
- [ ] Domain purchased: **amdakostrategies.com.ng** ✅
- [ ] Smatweb hosting account active
- [ ] cPanel login credentials available
- [ ] SSH/Terminal access enabled in cPanel
- [ ] Node.js available on Smatweb

### MongoDB
- [ ] MongoDB Atlas account created
- [ ] Free cluster created
- [ ] Database user created with strong password
- [ ] IP whitelist configured (Allow access from anywhere)
- [ ] Connection string obtained: `mongodb+srv://...`

### Code Preparation
- [ ] Repository cloned/pushed to GitHub
- [ ] `.env.example` updated with domain
- [ ] All environment variables documented
- [ ] No sensitive data committed to git

---

## DNS Setup

- [ ] Domain registrar found and logged in
- [ ] Nameservers updated to Smatweb's nameservers
- [ ] DNS propagation verified: `nslookup amdakostrategies.com.ng`
- [ ] Addon domain added in cPanel
- [ ] Public folder set correctly (`public_html/amdako` or preferred)
- [ ] WWW subdomain configured

---

## Code Deployment

### Upload & Setup
- [ ] SSH connection established: `ssh username@amdakostrategies.com.ng`
- [ ] Node.js version confirmed: `node --version` (v14+)
- [ ] npm version confirmed: `npm --version` (v6+)
- [ ] Code uploaded via Git or cPanel File Manager
- [ ] Repository location: `~/public_html/amdako`

### Environment Configuration
- [ ] `.env` file created on Smatweb server (NOT via Git)
- [ ] All environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGO_URI` configured (from MongoDB Atlas)
  - [ ] `JWT_SECRET` generated: `openssl rand -base64 32`
  - [ ] `FRONTEND_URL=https://amdakostrategies.com.ng`
  - [ ] `VITE_API_URL=https://amdakostrategies.com.ng/api`
  - [ ] `PORT=3000`
- [ ] `.env` file has restricted permissions: `chmod 600 .env`
- [ ] `.env` is NOT accessible via web

### Dependencies & Build
- [ ] Dependencies installed: `npm ci --only=production`
- [ ] No development dependencies installed
- [ ] Frontend built: `npm run build`
- [ ] `dist/` folder exists and contains files
- [ ] Build succeeded with no errors

---

## Backend Deployment

### PM2 Setup
- [ ] PM2 installed globally: `npm install -g pm2`
- [ ] PM2 verified: `pm2 status`
- [ ] App started: `pm2 start server.js --name \"amdako-api\"`
- [ ] PM2 saved: `pm2 save`
- [ ] PM2 startup configured: `pm2 startup`
- [ ] PM2 configured for auto-reboot

### Verification
- [ ] PM2 status shows app running
- [ ] Logs show no errors: `pm2 logs amdako-api`
- [ ] Port 3000 is active: `lsof -i :3000`
- [ ] Backend responds locally: `curl http://localhost:3000/health`

---

## Frontend Deployment

### Web Server Configuration
- [ ] Web server is Nginx or Apache
- [ ] Static files path configured: `~/public_html/amdako/dist`
- [ ] SPA routing configured (fallback to `index.html`)
- [ ] API proxy configured to localhost:3000
- [ ] Gzip compression enabled

### File Server
- [ ] `dist/index.html` is served for `/`
- [ ] `/api` routes proxy to Node.js backend
- [ ] `/health` endpoint proxies to backend
- [ ] Static assets (CSS, JS, images) served correctly
- [ ] Cache headers configured for static files

---

## SSL/HTTPS Setup

### Certificate Installation
- [ ] Navigated to cPanel > SSL/TLS Status
- [ ] AutoSSL enabled for domain
- [ ] Certificate installed successfully
- [ ] Certificate shows as valid (green checkmark)
- [ ] Certificate is from Let's Encrypt (free)

### HTTPS Configuration
- [ ] HTTPS access works: `https://amdakostrategies.com.ng`
- [ ] HTTP redirects to HTTPS
- [ ] www variant configured: `https://www.amdakostrategies.com.ng`
- [ ] No SSL certificate errors
- [ ] Browser shows green lock 🔒

### Certificate Renewal
- [ ] AutoSSL renewal enabled in cPanel
- [ ] Certificate auto-renewal configured
- [ ] Renewal notifications will be sent by Smatweb

---

## DNS & Domain Testing

### DNS Resolution
- [ ] DNS propagation complete (24-48 hours)
- [ ] `nslookup amdakostrategies.com.ng` returns Smatweb IP
- [ ] `dig amdakostrategies.com.ng` shows correct nameservers
- [ ] A record points to Smatweb IP
- [ ] MX records configured (if email needed)

### Domain Access
- [ ] `https://amdakostrategies.com.ng` loads page
- [ ] `https://www.amdakostrategies.com.ng` redirects correctly
- [ ] No domain resolution errors
- [ ] Can access from different networks/devices

---

## Functionality Testing

### Frontend Testing
- [ ] Homepage loads: `https://amdakostrategies.com.ng`
- [ ] All pages accessible
- [ ] Navigation works correctly
- [ ] Images and assets load
- [ ] No 404 errors
- [ ] No broken links
- [ ] Mobile responsiveness verified
- [ ] Browser console has no JavaScript errors

### Backend Testing
- [ ] Health endpoint works: `/health`
- [ ] Login page loads and displays
- [ ] Can submit login form
- [ ] API endpoints return proper responses
- [ ] Error handling works (try invalid login)
- [ ] No 500 errors in backend logs

### API Testing
```bash
# Test health endpoint
curl https://amdakostrategies.com.ng/health

# Test login (should fail with invalid credentials)
curl -X POST https://amdakostrategies.com.ng/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{\"email\":\"test@test.com\",\"password\":\"wrong\"}'
```

- [ ] Health endpoint responds with 200
- [ ] API endpoints are accessible
- [ ] CORS headers present
- [ ] Responses are in JSON format

---

## Security Verification

### Access Control
- [ ] `.env` file NOT accessible via web
- [ ] `node_modules` NOT accessible via web
- [ ] `.git` folder NOT accessible via web
- [ ] Only `dist/` and API routes are public

### API Security
- [ ] Rate limiting working: `RATE_LIMIT_MAX_REQUESTS=100`
- [ ] Security headers present (check with cURL -i)
- [ ] CORS properly configured for domain
- [ ] Helmet.js headers enabled
- [ ] Input validation working on API

### Authentication Security
- [ ] JWT tokens work correctly
- [ ] Passwords are hashed (bcryptjs)
- [ ] No sensitive data in logs
- [ ] No console.log statements in production code
- [ ] Error messages don't expose system info

---

## Performance Verification

### Load Times
- [ ] Homepage loads in < 3 seconds
- [ ] No JavaScript errors in console
- [ ] Fonts/images load quickly
- [ ] No 404 errors for resources

### Backend Performance
- [ ] API responses < 500ms
- [ ] No memory leaks: `pm2 monit`
- [ ] CPU usage reasonable
- [ ] Database queries optimized

### Optimization
- [ ] Gzip compression enabled (check headers)
- [ ] Minified CSS and JavaScript
- [ ] Source maps removed from production
- [ ] No unnecessary console logs

---

## Monitoring & Maintenance

### PM2 Monitoring
- [ ] PM2 logs checked for errors: `pm2 logs amdako-api`
- [ ] PM2 status monitored: `pm2 status`
- [ ] PM2 dashboard accessible: `pm2 web`
- [ ] Daily log reviews scheduled

### Server Monitoring
- [ ] Disk space available
- [ ] Memory usage monitored
- [ ] CPU usage monitored
- [ ] No disk quota warnings

### Backups
- [ ] MongoDB backups scheduled
- [ ] Code backups scheduled
- [ ] First backup verified
- [ ] Backup storage location documented

---

## Post-Launch Tasks

### First 24 Hours
- [ ] Monitor PM2 logs for errors
- [ ] Check error rates
- [ ] Test all critical flows
- [ ] Monitor certificate installation
- [ ] Test from multiple devices/browsers

### First Week
- [ ] Daily log reviews
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Bug fix deployment process tested
- [ ] Incident response procedure ready

### Documentation
- [ ] Deployment documented
- [ ] Emergency procedures documented
- [ ] Rollback procedure tested
- [ ] Team informed of deployment
- [ ] Monitoring alerts configured

---

## Team Sign-Off

- **Deployed By:** ___________________  **Date:** __________
- **Verified By:** ___________________ **Date:** __________
- **Approved By:** ___________________ **Date:** __________

## Important Notes

```
Domain: amdakostrategies.com.ng
Backend: https://amdakostrategies.com.ng/api
Frontend: https://amdakostrategies.com.ng
Health: https://amdakostrategies.com.ng/health
PM2 App Name: amdako-api
Port: 3000 (local, proxied by Nginx/Apache)
```

## Emergency Contacts

- **Smatweb Support:** https://www.smatweb.com/contact
- **MongoDB Atlas Support:** https://www.mongodb.com/support
- **Acme Certificates (SSL):** https://letsencrypt.org/

---

**Deployment Date:** ________________
**Status:** ✅ LIVE AT https://amdakostrategies.com.ng
