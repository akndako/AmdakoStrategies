# ✅ FIX: Upload Frontend Files to Smatweb

You're seeing Node.js default page because the frontend files haven't been uploaded yet.

---

## 🔧 FIX IN 5 STEPS

### Step 1: Prepare Frontend Files on Your Computer

1. Open `frontend/dist/` folder
2. Select ALL files inside:
   - ✅ `index.html`
   - ✅ `favicon.svg`
   - ✅ `icons.svg`
   - ✅ `assets/` folder
3. **Right-click** → **Send to** → **Compressed (zipped) folder**
4. Name it: `amdako-frontend.zip`

### Step 2: Log in to Smatweb cPanel

1. Go to your Smatweb hosting control panel
2. Enter your username and password
3. Click Login

### Step 3: Open File Manager

1. In cPanel, scroll down and find **File Manager**
2. Click on it
3. It opens your hosting file directories

### Step 4: Navigate to public_html and Upload

**DO THIS:**

1. In File Manager, you should see: `public_html` folder
2. **Double-click** `public_html` to open it
3. Check if folder `amdako` exists:
   - ✅ **If YES:** Double-click to open `amdako` folder
   - ❌ **If NO:** Right-click empty space → **Create New Folder** → name it `amdako` → open it

4. Once inside `amdako/` (or `public_html/` if domain points there):
   - Click **Upload** button (top toolbar)
   - Select `amdako-frontend.zip` from your computer
   - Click **Upload** and wait for it to finish

### Step 5: Extract the ZIP

1. After upload completes, you'll see `amdako-frontend.zip` in the folder
2. **Right-click** the zip file
3. Select **Extract**
4. Wait for extraction
5. **Right-click** the zip file again → **Delete**

### Step 6: Verify Files Are There

After extraction, you should see:

```
public_html/amdako/
├── index.html          ✅
├── favicon.svg
├── icons.svg
└── assets/             ✅
    ├── vendor-*.js
    ├── index-*.js
    ├── charts-*.js
    ├── motion-*.js
    ├── *.css
    └── *.png
```

---

## 🔐 Create .htaccess File

**This makes React Router work properly!**

1. Still in **File Manager → `public_html/amdako/`**
2. Click **+ File** button (or right-click → Create New File)
3. Name: `.htaccess`
4. Click **Create**
5. Click on `.htaccess` to edit it
6. Paste this code:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    AddType application/javascript .js
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ [NC]
    RewriteRule ^ index.html [L]
</IfModule>
```

7. Click **Save**

---

## 🌐 Verify Domain Setup in cPanel

1. Go back to cPanel dashboard
2. Find **Addon Domains** or **Domains**
3. Look for `amdakostrategies.com.ng`
4. **Document Root** should be: `public_html/amdako`
   - ✅ If correct, proceed to next step
   - ❌ If wrong, edit it and correct it

---

## 🔒 Enable HTTPS/SSL

1. In cPanel, find **SSL/TLS Status**
2. Click it
3. Look for **AutoSSL** or **Manage SSL**
4. Select your domain: `amdakostrategies.com.ng`
5. Click **Check & Install** or **Install Certificate**
6. Wait a few minutes for Let's Encrypt to issue certificate

---

## 🧪 TEST YOUR WEBSITE

1. Open new browser tab
2. Go to: `https://amdakostrategies.com.ng`
3. **You should see your React app!** ✅

---

## ✅ Verification Checklist

- [ ] Created `amdako-frontend.zip` from `frontend/dist/`
- [ ] Uploaded zip to `public_html/amdako/`
- [ ] Extracted the zip
- [ ] Can see `index.html`, `assets/` in the folder
- [ ] Created `.htaccess` file
- [ ] `.htaccess` contains rewrite rules
- [ ] Domain points to `public_html/amdako/`
- [ ] SSL certificate installed
- [ ] Can access `https://amdakostrategies.com.ng`
- [ ] **See your React app (NOT Node.js page)** ✅

---

## 🆘 Still Seeing Node.js Page?

### Possible Issues:

**1. Files in wrong folder**
```
❌ WRONG: public_html/amdako-frontend.zip
✅ RIGHT: public_html/amdako/ (extracted inside)
```

**2. .htaccess not working**
- Make sure it's in `public_html/amdako/`
- Contact Smatweb support to enable `mod_rewrite`

**3. Domain points to wrong directory**
- Check cPanel → Addon Domains
- Verify Document Root is `public_html/amdako`

**4. Browser cache**
- Clear cache: `Ctrl+Shift+Delete` (or Cmd+Shift+Delete on Mac)
- Try incognito window

---

## 🎉 After Upload Success

Your app should be live at: **https://amdakostrategies.com.ng**

**Note:** 
- ⚠️ You'll see "Not secure" warning because SSL is installing (takes 5-10 min)
- Once installed, you'll see 🔒 green lock
- If pages don't have API data, that's normal (backend not deployed yet)

---

## Next Steps

When ready to add backend:
1. Create `.env` file on server
2. Deploy `backend/server.js`
3. Configure web server to proxy `/api` requests
4. See: [PHASED_DEPLOYMENT_GUIDE.md](docs/PHASED_DEPLOYMENT_GUIDE.md)
