# Folder Structure Reorganization Guide

## Current Issues
- ❌ Duplicate `AmdakoStrategies/` folder
- ❌ Root-level frontend files mixed with backend files
- ❌ Multiple copies of `server.js`
- ❌ Documentation scattered everywhere
- ❌ Configuration files not organized

---

## Perfect Deployment Structure

```
AmdakoStrategies/
│
├── frontend/                    ← React + Vite frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── theme.ts
│   │   ├── globalStyles.ts
│   │   └── types.ts
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── package.json
│   └── eslint.config.js
│
├── backend/                     ← Node.js + Express backend
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── package.json
│   └── .env.example
│
├── docs/                        ← Documentation
│   ├── SMATWEB_DEPLOYMENT.md
│   ├── SMATWEB_DEPLOYMENT_CHECKLIST.md
│   ├── SMATWEB_SETUP_SUMMARY.md
│   ├── PHASED_DEPLOYMENT_GUIDE.md
│   ├── CPANEL_DEPLOYMENT_SETUP.md
│   ├── PRODUCTION.md
│   ├── PRODUCTION_READY.md
│   ├── CHECKLIST.md
│   └── README_DEPLOYMENT.md
│
├── .cpanel.yml                  ← cPanel deployment config
├── build.sh                     ← Build script
├── restart.sh                   ← Restart script
├── .gitignore
├── .env.example                 ← Root env template
├── Dockerfile                   ← For Docker (optional)
├── docker-compose.yml           ← For Docker (optional)
├── package.json                 ← Root package.json (optional)
└── README.md                    ← Main README
```

---

## Step-by-Step Reorganization

### Step 1: Create Folders

```bash
cd c:\Users\akndako\Desktop\AmdakoStrategies

# Create the new folder structure
mkdir -p frontend/src
mkdir -p frontend/public
mkdir -p backend
mkdir -p docs
```

### Step 2: Move Frontend Files

Move all React/frontend code from `src/` to `frontend/src/`:

```bash
# Copy frontend source files
robocopy src frontend\src /E
robocopy public frontend\public /E

# Copy frontend config files
copy vite.config.ts frontend\
copy tsconfig.json frontend\
copy tsconfig.app.json frontend\
copy tsconfig.node.json frontend\
copy eslint.config.js frontend\
copy index.html frontend\
```

**Or manually:**
1. Create folder: `frontend/src`
2. Move `src/components/` → `frontend/src/components/`
3. Move `src/pages/` → `frontend/src/pages/`
4. Move `src/assets/` → `frontend/src/assets/`
5. Move `src/*.ts` and `src/*.tsx` files → `frontend/src/`
6. Move `public/` → `frontend/public/`

### Step 3: Move Backend Files

Backend files already in `backend/`, just verify:

```bash
# Should have:
backend/server.js
backend/config/db.js
backend/middleware/auth.js
backend/models/User.js
backend/routes/auth.js
```

### Step 4: Create Frontend package.json

Move `package.json` to `frontend/`:

```bash
# Copy root package.json to frontend/package.json
copy package.json frontend\package.json
```

Or create `frontend/package.json`:

```json
{
  "name": "amdako-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^6.20.0",
    "styled-components": "^6.3.12",
    "framer-motion": "^12.38.0",
    "recharts": "^3.8.1",
    "lucide-react": "^1.7.0",
    "html2canvas": "^1.4.1",
    "jspdf": "^4.2.1",
    "react-signature-canvas": "^1.1.0-alpha.2"
  },
  "devDependencies": {
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@types/styled-components": "^5.1.36",
    "@vitejs/plugin-react": "^6.0.1",
    "vite": "^8.0.1",
    "typescript": "~5.9.3",
    "tailwindcss": "^4.2.2",
    "autoprefixer": "^10.4.27",
    "postcss": "^8.5.8",
    "terser": "^5.46.2",
    "eslint": "^9.39.4",
    "@eslint/js": "^9.39.4",
    "eslint-plugin-react-hooks": "^0.5.2",
    "globals": "^17.4.0",
    "typescript-eslint": "^8.57.0"
  }
}
```

### Step 5: Create Backend package.json

Create `backend/package.json`:

```json
{
  "name": "amdako-backend",
  "version": "1.0.0",
  "type": "commonjs",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.22.1",
    "mongoose": "^9.4.1",
    "mongodb": "^7.1.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.3",
    "cors": "^2.8.6",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "express-validator": "^7.0.0",
    "express-rate-limit": "^7.1.5",
    "morgan": "^1.10.0",
    "dotenv": "^17.4.0"
  }
}
```

### Step 6: Move Documentation

Create `docs/` folder and move all markdown files:

```bash
mkdir docs

# Move documentation files
move SMATWEB_DEPLOYMENT.md docs\
move SMATWEB_DEPLOYMENT_CHECKLIST.md docs\
move SMATWEB_SETUP_SUMMARY.md docs\
move PHASED_DEPLOYMENT_GUIDE.md docs\
move CPANEL_DEPLOYMENT_SETUP.md docs\
move PRODUCTION.md docs\
move PRODUCTION_READY.md docs\
move CHECKLIST.md docs\
move CUSTOM_DOMAIN_DEPLOYMENT.md docs\
move DEPLOYMENT_CHECKLIST_CUSTOM_DOMAIN.md docs\
move MIGRATION_VERCEL_TO_CUSTOM_DOMAIN.md docs\
move QUICK_START_DEPLOYMENT.md docs\
```

### Step 7: Cleanup Root

Remove/cleanup:

```bash
# Remove old folders
rmdir /s /q AmdakoStrategies
rmdir /s /q data
rmdir /s /q dist

# Remove old files
del index.html
del vercel.json
del GETTING_STARTED.txt
del deploy.sh
```

### Step 8: Update Root .cpanel.yml

Update `.cpanel.yml` at root:

```yaml
---
deployment:
  targets:
    - deployment_target: "amdakostrategies.com.ng"
      repository_root: "/"
      working_directory: "/"
      build_command: "/bin/bash build.sh"
      test_command: "test -f frontend/dist/index.html && test -f backend/server.js"
      restart_reload_command: "/bin/bash restart.sh"
      environment_variables:
        - NODE_ENV=production
hooks:
  build:
    - export PATH=$PATH:/usr/local/bin
    - cd frontend && npm install --production && npm run build && cd ..
    - cd backend && npm install --production && cd ..
  post_deployment:
    - npm install -g pm2
    - pm2 start backend/server.js --name "amdako-api" || pm2 restart amdako-api
    - pm2 save
```

### Step 9: Update build.sh

```bash
#!/bin/bash
# Build script for cPanel Git Deployment

set -e

echo "🔨 Starting build..."

# Build frontend
echo "🎨 Building frontend..."
cd frontend
npm install --production
npm run build
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# Verify builds
if [ ! -d "frontend/dist" ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

if [ ! -f "backend/server.js" ]; then
    echo "❌ Backend files missing"
    exit 1
fi

echo "✅ Build completed successfully!"
```

### Step 10: Update restart.sh

```bash
#!/bin/bash
# Restart script for cPanel Git Deployment

set -e

echo "🚀 Restarting application..."

# Install PM2
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# Start or restart backend
if pm2 list | grep -q "amdako-api"; then
    echo "♻️  Restarting PM2..."
    pm2 restart amdako-api
else
    echo "🟢 Starting PM2..."
    pm2 start backend/server.js --name "amdako-api"
fi

pm2 save
pm2 startup > /dev/null 2>&1 || true

echo "✅ Application restarted!"
```

### Step 11: Update Root package.json

Create root `package.json` for shared commands:

```json
{
  "name": "amdakostrategies",
  "version": "1.0.0",
  "description": "Amdako Strategies - Investment Platform",
  "scripts": {
    "install-all": "cd frontend && npm install && cd ../backend && npm install && cd ..",
    "build": "cd frontend && npm run build && cd ..",
    "dev": "concurrently \"cd frontend && npm run dev\" \"cd backend && npm start\"",
    "start": "pm2 start backend/server.js --name amdako-api"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

---

## After Reorganization

Your structure will be:

```
AmdakoStrategies/
├── frontend/           → React/Vite (build → dist/)
├── backend/            → Node.js/Express (server.js)
├── docs/               → All documentation
├── .cpanel.yml         → Deployment config
├── build.sh            → Build script
├── restart.sh          → Restart script
├── package.json        → Root scripts
└── README.md           → Main docs
```

---

## Deployment Flow

1. **Push to GitHub** → All code organized
2. **cPanel Git Deploy** → Reads `.cpanel.yml`
3. **Run build.sh** → Builds frontend, installs backend
4. **Run restart.sh** → Starts PM2 with backend/server.js
5. **Nginx/Apache** → Serves frontend/dist/, proxies /api to backend

---

## Commands After Reorganization

```bash
# Install all dependencies
npm run install-all

# Build frontend
npm run build

# Start development (local)
npm run dev

# Deploy (production)
npm run start
```

---

## Git Steps

```bash
# After reorganization:
git add .
git commit -m "Reorganize folder structure for deployment"
git push origin main

# Then deploy from cPanel
```

---

This structure is:
✅ Clean and organized
✅ Easy to deploy
✅ Scalable for future features
✅ Professional deployment-ready
✅ Clear separation of concerns
