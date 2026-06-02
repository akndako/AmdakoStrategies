# Phased Deployment Guide - Frontend First, Backend Later

Deploy your frontend first, then add the backend when ready.

---

## Strategy Overview

```
Phase 1: Deploy Frontend Only
├── Static files (HTML, CSS, JS)
├── Point to temporary/mock API
└── Live at: https://amdakostrategies.com.ng

Phase 2: Deploy Backend (Later)
├── Deploy Node.js server
├── Update API URLs
└── Redeploy frontend with new URLs
```

---

## Phase 1: Deploy Frontend Only

### 1.1 Build Frontend

```bash
# On your local machine
npm run build

# Creates dist/ folder
ls dist/  # Should have index.html and other files
```

### 1.2 Upload Frontend to Smatweb

#### Option A: Using cPanel File Manager (Easiest for frontend-only)

1. Log in to **Smatweb cPanel**
2. Go to **File Manager**
3. Navigate to `public_html`
4. Create folder: `amdako`
5. Upload all files from your `dist/` folder

#### Option B: Using cPanel Upload Tool

1. In cPanel, create a zip of your `dist/` folder
2. Use **cPanel File Manager → Upload**
3. Upload the zip file
4. Extract it into `public_html/amdako`

#### Option C: Using SSH & Git (For future updates)

```bash
ssh username@amdakostrategies.com.ng
cd ~/public_html

# Clone just to get the frontend
git clone https://github.com/yourusername/AmdakoStrategies.git amdako
cd amdako

# Copy only the dist folder contents to public_html
cp -r dist/* ~/public_html/

# Or keep it in a subfolder
# Files will be at: ~/public_html/amdako/dist/
```

### 1.3 Configure cPanel for Frontend

1. Go to **cPanel → Addon Domains**
2. Add domain: `amdakostrategies.com.ng`
3. Set public folder to: `public_html/amdako` (or `public_html` if you copied files there)

### 1.4 Setup Web Server (Simple Static)

#### Option A: cPanel Auto-Configuration (Recommended)

1. cPanel automatically serves `public_html` as your website
2. Just upload your `dist/` files
3. Add `.htaccess` in `public_html/amdako`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [QSA,L]
</IfModule>
```

This makes React Router work properly (SPA routing).

#### Option B: Manual Nginx Config (If using Nginx)

Ask Smatweb to set up:

```nginx
server {
    listen 80;
    server_name amdakostrategies.com.ng www.amdakostrategies.com.ng;
    
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name amdakostrategies.com.ng www.amdakostrategies.com.ng;
    
    ssl_certificate /path/to/certificate;
    ssl_certificate_key /path/to/key;
    
    root /home/username/public_html/amdako;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
}
```

### 1.5 Setup SSL Certificate

1. Go to **cPanel → SSL/TLS**
2. Go to **AutoSSL**
3. Select your domain
4. Click **Check & Install**
5. Wait for Let's Encrypt certificate

### 1.6 Test Frontend

```bash
# Open in browser
https://amdakostrategies.com.ng

# Should load your homepage
# Check browser console (F12) for errors
```

---

## Phase 1B: Handle API Calls (2 Options)

Your frontend might try to call `/api` endpoints. You have options:

### Option 1: Show "Coming Soon" Message

In your React code, add a check:

```typescript
// src/pages/LoginPage.tsx
import { useState } from 'react';

export const LoginPage = () => {
  const [isBackendReady, setIsBackendReady] = useState(false);

  return (
    <div>
      {!isBackendReady ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>🚀 Backend Coming Soon</h2>
          <p>Frontend is live. Backend deployment in progress...</p>
        </div>
      ) : (
        // Your login form
      )}
    </div>
  );
};
```

### Option 2: Use Mock Data

Create a `src/utils/mockApi.ts`:

```typescript
// Mock API responses for frontend-only phase
export const mockLogin = async (email: string, password: string) => {
  // Return fake response
  return {
    token: 'mock-token-12345',
    user: {
      id: 'user-1',
      name: 'Demo User',
      email: email,
    }
  };
};

export const mockGetDashboard = async () => {
  return {
    investmentTotal: '$50,000',
    roi: '12.5%',
    holdings: []
  };
};
```

Then conditionally use it:

```typescript
const isBackendDeployed = process.env.NODE_ENV === 'production' && 
                          process.env.REACT_APP_API_URL !== 'mock';

const apiService = isBackendDeployed ? realApi : mockApi;
```

### Option 3: Disable Authentication Features

Temporarily disable login pages and show landing page only:

```typescript
// src/App.tsx
<Routes>
  <Route path="/" element={<Hero />} />
  <Route path="/about" element={<AboutUsPage />} />
  {/* Disable login for now */}
  {/* <Route path="/login" element={<LoginPage />} /> */}
  {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
</Routes>
```

---

## Phase 2: Deploy Backend (Later)

When ready to deploy backend:

### 2.1 SSH and Setup Backend

```bash
ssh username@amdakostrategies.com.ng

# Navigate to your app directory
cd ~/public_html/amdako

# If you haven't already, pull full code
git pull origin main

# Create .env file
nano .env
```

### 2.2 Configure `.env`

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/amdako

# JWT Secret
JWT_SECRET=your-generated-secret-key

# Domain Configuration (IMPORTANT: Your domain)
FRONTEND_URL=https://amdakostrategies.com.ng
VITE_API_URL=https://amdakostrategies.com.ng/api

# Other
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### 2.3 Install Dependencies & Start Backend

```bash
# Install dependencies
npm ci --only=production

# Start with PM2
npm install -g pm2
pm2 start server.js --name "amdako-api"
pm2 save
pm2 startup

# Verify
pm2 status
pm2 logs amdako-api
```

### 2.4 Update Web Server Config to Proxy API

#### For Apache (cPanel):

Update `.htaccess` in `public_html/amdako`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # SPA routing for frontend
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !^/api
    RewriteRule ^ index.html [QSA,L]
</IfModule>

# Proxy API requests to Node.js backend
<IfModule mod_proxy.c>
    ProxyPreserveHost On
    ProxyPass /api http://localhost:3000/api
    ProxyPassReverse /api http://localhost:3000/api
</IfModule>
```

#### For Nginx:

Ask Smatweb to update config:

```nginx
location /api {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### 2.5 Update Frontend Code

Remove mock API and enable real API calls:

```typescript
// src/services/api.ts
const API_URL = process.env.VITE_API_URL || '/api';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
```

### 2.6 Rebuild & Deploy Frontend

```bash
# On your local machine
npm run build

# Upload new dist/ folder to Smatweb
# Or via Git:
git add .
git commit -m "Enable backend API"
git push origin main

# On Smatweb
cd ~/public_html/amdako
git pull origin main
npm run build

# Restart backend
pm2 restart amdako-api
```

### 2.7 Test Full Stack

```bash
# Test frontend
curl https://amdakostrategies.com.ng

# Test API through frontend URL
curl https://amdakostrategies.com.ng/api/auth/login

# Test direct backend (if accessible)
curl https://amdakostrategies.com.ng/health
```

---

## Timeline Example

| Phase | Timeline | Status |
|-------|----------|--------|
| **Phase 1a** | Week 1 | Deploy frontend only |
| **Phase 1b** | Week 1-2 | Marketing/Preview mode |
| **Phase 2a** | Week 2 | Deploy backend |
| **Phase 2b** | Week 2 | Enable authentication |
| **Phase 2c** | Week 2 | Enable dashboard |

---

## Comparison: Frontend-First vs Full Deployment

| Aspect | Frontend-First | Full Stack |
|--------|---|---|
| **Speed** | 🟢 Fast (hours) | 🟡 Slower (1-2 days) |
| **Risk** | 🟢 Low (no backend issues) | 🟡 Higher (more moving parts) |
| **Testing** | 🟡 Limited (no real data) | 🟢 Full testing |
| **Go-Live** | 🟢 Quick preview | 🔴 Takes longer |
| **Flexibility** | 🟢 Easy to rollback | 🔴 Harder to rollback |
| **Best For** | MVP launch, landing pages | Full feature apps |

---

## Pros & Cons

### Pros of Frontend-First
✅ Get website live quickly  
✅ Start marketing/getting feedback  
✅ Separate deployment concerns  
✅ Easier to debug issues independently  
✅ Can build backend in parallel  
✅ Lower risk of breaking things  

### Cons
❌ API features not available yet  
❌ Need to handle missing backend gracefully  
❌ Two deployment phases instead of one  
❌ Possible CORS issues when backend added  

---

## Quick Summary

**To deploy frontend-first:**

1. ✅ Run `npm run build`
2. ✅ Upload `dist/` to Smatweb `public_html/amdako`
3. ✅ Add `.htaccess` for SPA routing
4. ✅ Setup SSL in cPanel
5. ✅ Handle missing API gracefully in code

**Later, when ready for backend:**

1. ✅ Create `.env` file on server
2. ✅ Install deps and start with PM2
3. ✅ Configure web server for API proxy
4. ✅ Update frontend code
5. ✅ Rebuild frontend

This approach gives you maximum flexibility! 🚀
