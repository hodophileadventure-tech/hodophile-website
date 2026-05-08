# Hostinger Deployment - Command Reference

## Step 1: Local Preparation (On Your Computer)

### Build the application
```bash
npm run build
```
✅ Should see: "Compiled successfully" and "Finished TypeScript"

### Test production build locally
```bash
npm start
```
✅ Visit http://localhost:3000 and verify site works

### Create production environment file
Create `.env.production.local` in project root with:
```
DATABASE_URL="postgresql://hodo_user:YOUR_PASSWORD@localhost:5432/hodophile_db"
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Commit and push to Git
```bash
git add -A
git commit -m "Deploy: Ready for Hostinger production"
git push origin main
```

---

## Step 2: Hostinger Console Setup (In Browser)

### 2.1 Enable Node.js
1. Login: https://hpanel.hostinger.com
2. Select your domain
3. Go: **Advanced** → **Node.js**
4. Click: **Enable Node.js**
5. Select: Node.js v18 or higher
6. Application startup file: `npm start`
7. Application port: `3000`
8. Save changes

### 2.2 Create PostgreSQL Database
1. Go: **Databases** → **PostgreSQL**
2. Click: **+ New Database**
3. Set: 
   - Database name: `hodophile_db`
   - Database user: `hodo_user`
   - Password: (Generate secure password - SAVE THIS!)
4. Click: **Create**
5. Note the connection details shown

### 2.3 Connect Git Repository
1. Go: **Advanced** → **Git**
2. Click: **Connect Repository**
3. Select: GitHub (or your Git provider)
4. Choose: hodophile-website repository
5. Select branch: `main`
6. Deployment path: `/` (root)
7. Click: **Connect**

### 2.4 Set Environment Variables
1. Go: **Advanced** → **Environment Variables**
2. Add each variable:
   ```
   KEY: DATABASE_URL
   VALUE: postgresql://hodo_user:YOUR_PASSWORD@localhost:5432/hodophile_db
   ```
   ```
   KEY: NODE_ENV
   VALUE: production
   ```
   ```
   KEY: NEXT_PUBLIC_SITE_URL
   VALUE: https://yourdomain.com
   ```
3. Save each one

---

## Step 3: SSH Access (Advanced)

### 3.1 Open SSH Terminal
1. Go: **Advanced** → **SSH Access**
2. Copy SSH connection command
3. Open your terminal/PowerShell:

### 3.2 Connect via SSH
```bash
# On Windows PowerShell or Mac/Linux terminal
ssh username@your-hostinger-domain.com
# Enter password when prompted
```

### 3.3 Navigate to Project
```bash
cd public_html
ls  # List directories
```

### 3.4 Install Dependencies
```bash
npm install
```

### 3.5 Build Application
```bash
npm run build
```

### 3.6 Run Prisma Migrations
```bash
# Deploy existing migrations
npx prisma migrate deploy

# OR if you want to see migration status first
npx prisma migrate status
```

### 3.7 Seed Database (Optional)
```bash
npm run db:seed
```

### 3.8 Exit SSH
```bash
exit
```

---

## Step 4: Start Application (Back in Hostinger Console)

### 4.1 Start Node.js
1. Go: **Advanced** → **Node.js**
2. Status should show: **Running**
3. If not, click: **Start** or **Restart**
4. Wait 10-15 seconds for startup

### 4.2 Check Status
1. Go: **Advanced** → **Node.js**
2. Look for green indicator (Running)
3. If red, click **Logs** to see error messages

---

## Step 5: Verify Deployment

### Visit Your Site
1. Open: https://yourdomain.com
2. Should load with black background and yellow accents
3. Test navigation links
4. Submit contact form (should create database record)

### Check Logs
1. Go: **Advanced** → **Node.js**
2. Click: **Logs** tab
3. Should see clean startup messages, no errors

### Verify Database
SSH back in and run:
```bash
# List all tables
psql postgresql://hodo_user:PASSWORD@localhost:5432/hodophile_db -c "\\dt"

# Check records in a table
psql postgresql://hodo_user:PASSWORD@localhost:5432/hodophile_db -c "SELECT * FROM Destination LIMIT 5;"
```

---

## Troubleshooting Commands

### If Application Won't Start
```bash
# SSH in and check
pm2 logs

# Kill any existing processes
pm2 kill

# Rebuild
npm run build

# Start manually
npm start
```

### If Database Connection Fails
```bash
# Test connection
psql postgresql://hodo_user:PASSWORD@localhost:5432/hodophile_db

# Check migration status
npx prisma migrate status

# Check schema
npx prisma db push
```

### If Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill it (replace PID with actual process ID)
kill -9 PID
```

### Clear Cache & Rebuild
```bash
rm -rf .next
npm run build
npm start
```

---

## Regular Maintenance

### Weekly
- [ ] Check logs for errors: **Advanced** → **Node.js** → **Logs**
- [ ] Verify site loads: https://yourdomain.com

### Monthly
- [ ] Check for npm updates:
  ```bash
  npm outdated
  npm update
  npm audit
  ```
- [ ] Backup database via Hostinger console

### Quarterly
- [ ] Review security headers (already configured)
- [ ] Check SSL certificate status (should be auto-renewing)
- [ ] Monitor database size

---

## Deploy Updates

When you make changes locally:

### 1. Test Locally
```bash
npm run build
npm start
# Verify at http://localhost:3000
```

### 2. Commit and Push
```bash
git add -A
git commit -m "Fix: description of changes"
git push origin main
```

### 3. Hostinger Auto-Deploy (If Enabled)
- Automatically deploys to https://yourdomain.com
- Wait 2-3 minutes for deployment
- Refresh site to see changes

### 3. Or Manual Deploy
1. Go: **Advanced** → **Git**
2. Click: **Deploy** button
3. Wait for completion indicator
4. Refresh site

### 4. Run Migrations (If Schema Changed)
SSH in:
```bash
cd public_html
npx prisma migrate deploy
npm run build
# Restart via Hostinger Node.js panel
```

---

## Important Notes

- ⚠️ **Never** commit `.env.production.local` to Git
- ✅ Always test `npm run build` before pushing
- ✅ Keep database backups enabled in Hostinger
- ✅ Monitor logs for errors in first week after deployment
- ✅ SSL certificate auto-renews (no action needed)
- ✅ Let Hostinger handle Node.js startup via their panel

---

## Support Resources

- Hostinger Help: https://support.hostinger.com/en/articles/8667635
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs/
- PostgreSQL Docs: https://www.postgresql.org/docs/
