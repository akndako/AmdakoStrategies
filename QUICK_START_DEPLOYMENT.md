# 🚀 Custom Domain Deployment - Quick Start

## ⚡ Quickest Path (5 Steps)

1. **Point domain to hosting** - Update DNS with nameservers or A record (wait 24-48h)

2. **Connect via SSH** - `ssh username@yourdomain.com`

3. **Clone and setup:**
```bash
cd ~/public_html  # or appropriate folder
git clone https://github.com/yourusername/AmdakoStrategies.git
cd AmdakoStrategies
nano .env  # Create .env with MONGO_URI, JWT_SECRET, FRONTEND_URL
```

4. **Build and start:**
```bash
npm ci --only=production
npm run build
npm install -g pm2
pm2 start server.js --name "amdako-api"
```

5. **Configure web server** - See [CUSTOM_DOMAIN_DEPLOYMENT.md](CUSTOM_DOMAIN_DEPLOYMENT.md#step-8-configure-your-web-server-nginx-or-apache)

Done! 🎉

---

## 📋 For Complete Instructions

**See [CUSTOM_DOMAIN_DEPLOYMENT.md](CUSTOM_DOMAIN_DEPLOYMENT.md)** for:
- ✅ DNS setup
- ✅ Server preparation
- ✅ SSL/HTTPS setup
- ✅ Nginx/Apache configuration
- ✅ Monitoring & maintenance
- ✅ Troubleshooting

**Use [DEPLOYMENT_CHECKLIST_CUSTOM_DOMAIN.md](DEPLOYMENT_CHECKLIST_CUSTOM_DOMAIN.md)** to verify each step

## 🔑 Environment Variables

```bash
# Required
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/amdako
JWT_SECRET=<generate-with-openssl-rand-base64-32>
NODE_ENV=production

# Optional
FRONTEND_URL=https://your-domain.com
PORT=4000
```

**⚠️ NEVER commit `.env` to git**

---

## ✅ Production Checklist

- [ ] `.env` file created
- [ ] MONGO_URI configured
- [ ] JWT_SECRET generated
- [ ] Build successful: `npm run build`
- [ ] Health check responds: `GET /health`
- [ ] Rate limiting working
- [ ] CORS restricted to your domain
- [ ] SSL/HTTPS configured
- [ ] Database backups enabled

---

## 🧪 Test Before Deploy

```bash
# Build check
npm run build

# Environment check
node -e "console.log(process.env.MONGO_URI ? '✅' : '❌ MONGO_URI')"

# Backend start
npm run server

# In another terminal
curl http://localhost:4000/health
```

---

## 📈 Performance Features

✅ Code splitting (vendor, charts, motion)
✅ Minification & compression
✅ Gzip on backend
✅ Rate limiting (100 reqs/15min)
✅ Helmet.js security headers
✅ Database indexing ready
✅ Request logging with Morgan
✅ Console logs removed in prod

---

## 🔐 Security Features

✅ Password hashing (bcryptjs)
✅ JWT authentication (7d)
✅ Rate limiting
✅ CORS restricted
✅ Input validation
✅ Error boundary
✅ No secret exposure
✅ Helmet.js enabled

---

## 🚨 Troubleshooting

| Issue | Solution |
|:------|:----------|
| MONGO_URI not set | Check `.env` file, restart server |
| JWT fails | Verify `JWT_SECRET`, check token age |
| CORS error | Update `FRONTEND_URL` in `.env` |
| Port in use | `lsof -i :4000` then `kill -9 <PID>` |
| Build fails | `rm -rf node_modules && npm install` |

---

## 📞 Deployment Help

- Full guide: [PRODUCTION.md](PRODUCTION.md)
- Checklist: [CHECKLIST.md](CHECKLIST.md)
- Details: [PRODUCTION_READY.md](PRODUCTION_READY.md)
- Readme: [README.md](README.md)

---

## 🎯 One-Command Deployments

### Docker Compose
```bash
docker-compose up -d
```

### PM2 (VPS)
```bash
npm ci --only=production && pm2 start server.js && pm2 save
```

### Vercel (Frontend)
Connect GitHub repo → Auto-deploy on push

---

## 📊 API Endpoints

```bash
# Public
GET /health                 # Health check

# Auth (public)
POST /api/register         # Register user
POST /api/login            # Login user

# Protected (requires token)
GET /api/profile           # Get user profile
GET /api/dashboard         # Get dashboard data
```

---

## 🔄 Update Process

```bash
# Pull latest code
git pull origin main

# Update dependencies
npm install

# Rebuild
npm run build

# Restart with PM2
pm2 restart amdako-api

# Or with Docker
docker-compose down && docker-compose up -d
```

---

**🎉 Your app is production-ready!**

Start with Docker or follow [PRODUCTION.md](PRODUCTION.md) for detailed steps.
