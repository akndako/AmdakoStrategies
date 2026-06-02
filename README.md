# Amdako Strategies - Web3 Investment Platform

A modern, responsive Web3 investment platform built with React, TypeScript, and MongoDB. Features professional UI design, secure authentication, and comprehensive dashboard functionality.

## 🚀 Features

- **Modern UI/UX**: Professional design with responsive layouts
- **Secure Authentication**: JWT-based auth with MongoDB storage
- **Dashboard**: Investment tracking and performance metrics
- **Mobile-First**: Optimized for all device sizes
- **Production Ready**: Fully secured and optimized backend with comprehensive error handling
- **Security**: Helmet.js protection, rate limiting, input validation
- **Performance**: Code splitting, asset compression, database indexing

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Styled Components** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Vite** for optimized builds

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet.js** for security headers
- **Express Rate Limit** for DDoS protection
- **Morgan** for request logging

## 📁 Project Structure

```
amdakostrategies/
├── backend/                 # Production backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── models/
│   │   └── User.js         # User schema
│   ├── routes/
│   │   └── auth.js         # Auth endpoints
│   ├── middleware/
│   │   └── auth.js         # JWT middleware
│   └── server.js           # Main server
├── src/                    # Frontend source
│   ├── components/         # Reusable components
│   │   └── ErrorBoundary.tsx # Error handling
│   ├── pages/             # Page components
│   ├── assets/            # Static assets
│   └── ...
├── PRODUCTION.md
├── CHECKLIST.md
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── deploy.sh


## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (LTS recommended)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd amdakostrategies
npm install
```

2. **Set up environment:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start development servers:**
```bash
# Terminal 1: Backend (port 4000)
npm run server

# Terminal 2: Frontend (port 5173)
npm run dev
```

Visit `http://localhost:5173` for the frontend.

## 🚢 Production Deployment

### Quick Docker Deployment

```bash
# Build Docker image
docker build -t amdako:latest .

# Run with docker-compose (includes MongoDB)
docker-compose up -d

# Or run manually
docker run -d \
  -e NODE_ENV=production \
  -e MONGO_URI=mongodb://... \
  -e JWT_SECRET=... \
  -p 4000:4000 \
  amdako:latest
```

### VPS/Traditional Deployment

1. **Setup server:**
```bash
# SSH into your server
ssh user@your-server.com

# Clone repository
git clone <repository-url>
cd amdakostrategies

# Install PM2 globally
npm install -g pm2

# Install dependencies
npm ci --only=production

# Build frontend
npm run build
```

2. **Start application:**
```bash
# Start backend with PM2
pm2 start server.js --name amdako-api

# Save PM2 configuration
pm2 save
pm2 startup
```

3. **Configure web server:**
See [PRODUCTION.md](PRODUCTION.md) for Nginx/Apache configuration

### Smatweb Deployment (amdakostrategies.com.ng)

Your production deployment is configured for **Smatweb hosting** with domain **amdakostrategies.com.ng**.

Complete deployment guide: [SMATWEB_DEPLOYMENT.md](SMATWEB_DEPLOYMENT.md)

Quick start (5 steps): [QUICK_START_DEPLOYMENT.md](QUICK_START_DEPLOYMENT.md)

Pre-launch checklist: [SMATWEB_DEPLOYMENT_CHECKLIST.md](SMATWEB_DEPLOYMENT_CHECKLIST.md)

Key features:
- MongoDB Atlas for database (cloud)
- PM2 for process management
- Nginx/Apache for web server
- Let's Encrypt SSL (free, automatic)
- cPanel-based hosting management

## 📋 Pre-Deployment Checklist

Before going live, complete the [CHECKLIST.md](CHECKLIST.md):
- [ ] Environment variables configured
- [ ] Security headers enabled
- [ ] SSL/HTTPS configured
- [ ] Rate limiting tested
- [ ] Database backups configured
- [ ] Error monitoring setup
- [ ] Performance optimized

## 📡 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/profile` - Get current user (protected)

### Dashboard
- `GET /api/dashboard` - Dashboard data (protected)
- `GET /health` - Health check endpoint

### Response Format
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@email.com"
  }
}
```

## 🔧 Development Scripts

```bash
npm run dev      # Start frontend dev server (Vite)
npm run build    # Build frontend for production
npm run preview  # Preview production build locally
npm run server   # Start backend server
npm run lint     # Run ESLint checks
npm start        # Alias for npm run server
```

## 🔒 Security Features

✅ **Password Security**
- bcryptjs hashing (10 salt rounds)
- Password strength validation (8+ characters)

✅ **Authentication**
- JWT tokens (7-day expiration)
- Bearer token validation
- Secure token storage

✅ **API Security**
- Helmet.js headers protection
- CORS restricted to your domain
- Rate limiting (100 requests/15min)
- Input validation and sanitization
- Error messages don't leak info

✅ **Database**
- MongoDB authentication
- Connection encryption
- Automated backups

✅ **Environment**
- Secrets never in version control
- Separate dev/prod configurations

## 📊 Performance Optimizations

✅ **Frontend**
- Code splitting (vendor, charts, motion)
- Minification and compression
- Asset optimization
- No console logs in production

✅ **Backend**
- Gzip compression
- Request logging
- Database indexing
- Connection pooling

## 🐛 Troubleshooting

**"Cannot find module" errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**MongoDB connection failed**
- Verify MONGO_URI in .env
- Check database user credentials
- Ensure IP is whitelisted (if Atlas)

**CORS errors**
- Update FRONTEND_URL in .env
- Verify backend is running on same network
- Clear browser cache

**Port already in use**
```bash
# Find process using port 4000
lsof -i :4000
# Kill process
kill -9 <PID>
```

**See [PRODUCTION.md](PRODUCTION.md) Troubleshooting section for more**

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interactions
- Breakpoints: 480px, 600px, 768px, 1024px, 1200px
- Error boundary for graceful error handling

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📧 Support

For deployment help, see:
- [PRODUCTION.md](PRODUCTION.md) - Complete deployment guide
- [CHECKLIST.md](CHECKLIST.md) - Pre-launch checklist
- [Docker Documentation](https://docs.docker.com)
- [Express.js Documentation](https://expressjs.com)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.
