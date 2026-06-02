# 🚀 Smatweb Deployment - Quick Start

**Domain:** amdakostrategies.com.ng

## ⚡ Quickest Path (5 Steps)

1. **Point domain to Smatweb** - Update nameservers at registrar (wait 24-48h)

2. **Connect via SSH** - `ssh username@amdakostrategies.com.ng`

3. **Clone and setup:**
```bash
cd ~/public_html/amdako
git clone https://github.com/yourusername/AmdakoStrategies.git .
nano .env  # Create .env with MONGO_URI (from MongoDB Atlas), JWT_SECRET
```

4. **Build and start:**
```bash
npm ci --only=production
npm run build
npm install -g pm2
pm2 start server.js --name "amdako-api"
pm2 save
```

5. **Setup SSL in cPanel** - Go to SSL/TLS Status → Enable AutoSSL

Done! 🎉 Visit: https://amdakostrategies.com.ng

---

## 📋 For Complete Instructions

**See [SMATWEB_DEPLOYMENT.md](SMATWEB_DEPLOYMENT.md)** for:
- ✅ MongoDB Atlas setup
- ✅ DNS configuration
- ✅ Code upload methods
- ✅ PM2 process management
- ✅ Nginx/Apache configuration
- ✅ SSL/HTTPS setup
- ✅ Monitoring & maintenance
- ✅ Troubleshooting

**Use [SMATWEB_DEPLOYMENT_CHECKLIST.md](SMATWEB_DEPLOYMENT_CHECKLIST.md)** to verify each step

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
