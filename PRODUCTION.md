# Production Ready Guide

## Overview
This guide covers all essential steps to deploy and maintain the AmdakoStrategies app in production.

---

## 1. Environment Setup

### Required Environment Variables

Create a `.env` file with all variables from `.env.example`:

```bash
# Server Configuration
PORT=4000
NODE_ENV=production

# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/amdako

# Authentication (CRITICAL: Generate strong secret)
JWT_SECRET=<generate-with-crypto.randomUUID()>

# CORS Configuration
VITE_API_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
```

**Security Notes:**
- NEVER commit `.env` to version control
- Generate `JWT_SECRET` using: `openssl rand -base64 32`
- Rotate secrets quarterly
- Use strong, unique passwords for all services

---

## 2. Database Setup

### MongoDB Configuration

```bash
# 1. Create MongoDB cluster at https://www.mongodb.com/cloud/atlas
# 2. Configure IP whitelist
# 3. Create database user with strong password
# 4. Update MONGO_URI with credentials
```

### Index Creation

```javascript
// Run once to optimize queries:
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })
```

---

## 3. Build & Deployment

### Frontend Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Output: dist/ folder ready for deployment
```

### Backend Deployment Options

#### Option A: Docker (Recommended)

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 4000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t amdako-server:1.0.0 .
docker run -d --env-file .env -p 4000:4000 amdako-server:1.0.0
```

#### Option B: Traditional Deployment (VPS/Cloud)

```bash
# SSH into server
ssh user@server.com

# Clone repository
git clone https://github.com/akndako/AmdakoStrategies.git
cd AmdakoStrategies

# Install dependencies
npm ci --only=production

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name amdako-api
pm2 save
pm2 startup
```

#### Option C: Vercel (For Frontend)

1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

---

## 4. SSL/HTTPS Configuration

### Let's Encrypt with Nginx

```nginx
# /etc/nginx/sites-available/amdako

server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 5. Monitoring & Logging

### PM2 Monitoring

```bash
# View real-time logs
pm2 logs amdako-api

# Setup log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 10
```

### Application Monitoring

```bash
# Setup error tracking
npm install @sentry/node
```

Configure in your app:
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});

app.use(Sentry.Handlers.errorHandler());
```

---

## 6. Performance Optimization

### Frontend

- ✅ Code splitting enabled (Vite auto)
- ✅ Console logs removed in production
- ✅ CSS minification enabled
- ✅ Image optimization recommended

### Backend

- ✅ Gzip compression enabled
- ✅ Rate limiting configured
- ✅ Database indexing optimized
- ✅ Request logging with Morgan

---

## 7. Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] CORS is restricted to your domain
- [ ] Rate limiting is configured
- [ ] SSL/HTTPS is enabled
- [ ] Password hashing with bcrypt
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] Environment variables not in version control
- [ ] Database backups automated
- [ ] OWASP Top 10 security measures applied

---

## 8. Backup & Disaster Recovery

### Database Backups

```bash
# Automated MongoDB backup (daily)
mongodump --uri="$MONGO_URI" --out=/backups/$(date +%Y%m%d)

# Or use MongoDB Atlas automated backups
```

### Code Backups

```bash
# Git is your version control
git tag v1.0.0-prod
git push origin v1.0.0-prod
```

---

## 9. Scaling Considerations

### Load Balancing

```nginx
# Multiple backend instances
upstream backend {
    server 10.0.0.1:4000;
    server 10.0.0.2:4000;
    server 10.0.0.3:4000;
}

server {
    location /api {
        proxy_pass http://backend;
    }
}
```

### Database Scaling

- MongoDB replica sets for high availability
- Sharding for large datasets
- Connection pooling with mongoose

---

## 10. Troubleshooting

### Common Issues

**"MONGO_URI is not set"**
- Verify `.env` file exists
- Check variable is set in deployment platform
- Restart application

**"JWT verification failed"**
- Ensure same JWT_SECRET on all servers
- Check token expiration (7 days)
- Verify Authorization header format

**"CORS errors"**
- Update FRONTEND_URL in .env
- Verify backend listening on correct PORT
- Check proxy configuration

---

## 11. Maintenance Tasks

### Weekly
- Review error logs
- Monitor database size
- Check server resources

### Monthly
- Test disaster recovery
- Review security logs
- Update dependencies

### Quarterly
- Rotate secrets
- Full security audit
- Performance optimization review

---

## 12. Deployment Commands Reference

```bash
# Development
npm run dev        # Start dev server
npm run server    # Start backend server

# Production Build
npm run build     # Build frontend
npm run lint      # Check code quality

# Testing
npm test          # Run tests (configure as needed)

# Docker
docker build -t amdako:latest .
docker run -d -p 80:3000 -p 4000:4000 amdako:latest
```

---

## Support & Contact

For deployment issues or questions, refer to:
- Express.js docs: https://expressjs.com
- Vite docs: https://vitejs.dev
- MongoDB docs: https://docs.mongodb.com
- Vercel deployment: https://vercel.com/docs

---

**Last Updated:** April 2026
**Version:** 1.0.0
