# Amdako Strategies - Web3 Investment Platform

A modern, responsive Web3 investment platform built with React, TypeScript, and MongoDB. Features professional UI design, secure authentication, and comprehensive dashboard functionality.

## 🚀 Features

- **Modern UI/UX**: Professional design with responsive layouts
- **Secure Authentication**: JWT-based auth with MongoDB storage
- **Dashboard**: Investment tracking and performance metrics
- **Mobile-First**: Optimized for all device sizes
- **Production Ready**: Scalable backend architecture

## 🛠 Tech Stack

### Frontend
- **React 19** with TypeScript
- **Styled Components** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

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
│   ├── server.js           # Main server
│   └── .env                # Environment config
├── src/                    # Frontend source
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── assets/            # Static assets
│   └── ...
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd amdakostrategies
npm install
```

2. **Set up MongoDB:**
   - **Local:** Install MongoDB and start service
   - **Atlas:** Create cluster and get connection string

3. **Configure environment:**
```bash
# Copy and edit backend/.env
cp backend/.env.example backend/.env
# Edit MONGO_URI and JWT_SECRET
```

4. **Start development servers:**
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run dev
```

Visit `http://localhost:5173` for the frontend and `http://localhost:4000` for the API.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Dashboard
- `GET /api/dashboard` - Dashboard data (protected)

## 🔧 Development Scripts

```bash
npm run dev      # Start frontend dev server
npm run build    # Build for production
npm run server   # Start backend server
npm run lint     # Run ESLint
```

## 🚢 Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment
2. Use production MongoDB URI
3. Deploy to Heroku, Railway, or VPS

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy `dist/` folder to Netlify, Vercel, or CDN

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Environment-based configuration

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 600px, 768px, 1024px, 1200px
- Touch-friendly interactions
- Optimized performance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.
