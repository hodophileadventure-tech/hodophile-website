# Hodophile Website - Hostinger Deployment Guide

## Overview
Deploying a Next.js application with PostgreSQL on Hostinger Premium/Business Hosting.

---

## 1. LOCAL PREPARATION

### Step 1.1: Build the Application
```bash
npm run build
```
This creates an optimized production build in the `.next` folder.

### Step 1.2: Test Production Build Locally
```bash
npm run build
npm start
```
Visit `http://localhost:3000` to verify everything works.

### Step 1.3: Prepare Environment File
Create a `.env.production` file with all required variables:
```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hodophile_db"

# API Keys (if using external services)
WHATSAPP_API_KEY=your_key
WHATSAPP_PHONE_NUMBER=your_number
GOOGLE_SHEETS_API_KEY=your_key

# Next.js
NODE_ENV=production
```

---

## 2. HOSTINGER SETUP

### Step 2.1: Access Hostinger Control Panel
1. Log in to your Hostinger account
2. Navigate to **Hosting** → **Premium/Business Hosting**
3. Click **Manage** for your domain

### Step 2.2: Enable Node.js
1. Go to **Advanced** → **Node.js**
2. Click **Enable Node.js**
3. Select **Node.js version**: 18.x or higher
4. Set **Application startup file**: `server.js`

### Step 2.3: Create PostgreSQL Database
1. Go to **Databases** → **PostgreSQL**
2. Click **Create Database**
3. Set:
   - Database name: `hodophile_db`
   - Database user: `hodo_user` (or your preference)
   - Password: (generate secure password)
4. Note the connection details:
   ```
   Host: localhost (or provided host)
   Port: 5432
   Database: hodophile_db
   User: hodo_user
   Password: [your-password]
   ```

---

## 3. DEPLOYMENT VIA GIT (RECOMMENDED)

### Step 3.1: Connect Git Repository
1. In Hostinger control panel, go to **Advanced** → **Git**
2. Click **Connect Repository**
3. Choose your repository (GitHub/GitLab/Bitbucket)
4. Authorize and select the repository
5. Branch: `main` (or your production branch)
6. Deploy path: `/` (root)

### Step 3.2: Configure Auto-Deploy (Optional)
1. Enable **Auto Deploy on Push**
2. Now every push to your branch automatically deploys

### Step 3.3: Manual Deployment
If auto-deploy is disabled, after pushing changes:
1. Go to **Advanced** → **Git**
2. Click **Deploy**
3. Wait for deployment to complete

---

## 4. ENVIRONMENT VARIABLES

### Step 4.1: Set Environment Variables in Hostinger
1. Go to **Advanced** → **Environment Variables**
2. Add each variable from your `.env.production`:

**Essential variables:**
- `DATABASE_URL` = PostgreSQL connection string
- `NODE_ENV` = `production`
- `NEXT_PUBLIC_API_URL` = Your domain (e.g., `https://yourdomain.com`)

**Optional (if using external services):**
- `WHATSAPP_API_KEY` = Your WhatsApp API key
- `WHATSAPP_PHONE_NUMBER` = Your WhatsApp number
- `GOOGLE_SHEETS_API_KEY` = Your Google Sheets API key

### Step 4.2: Format DATABASE_URL Correctly
```
postgresql://hodo_user:password@localhost:5432/hodophile_db
```

---

## 5. RUN PRISMA MIGRATIONS

### Step 5.1: Via SSH Access
1. Open **Advanced** → **SSH Access**
2. Connect via SSH client:
   ```bash
   ssh username@your-hostinger-domain.com
   ```
3. Navigate to your project directory:
   ```bash
   cd public_html/your-project
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```
5. Seed database (optional):
   ```bash
   npm run db:seed
   ```

### Step 5.2: Verify Migrations
```bash
npx prisma studio
```
This opens a GUI to view your database at `localhost:5555`

---

## 6. DEPENDENCY INSTALLATION

### Step 6.1: Install via Hostinger Terminal or SSH
```bash
# Navigate to project
cd public_html/your-project

# Install dependencies
npm install

# Build application
npm run build
```

### Step 6.2: Verify Build Output
Check that the `.next` folder exists and contains the build files.

---

## 7. START THE APPLICATION

### Step 7.1: Configure Node.js Startup
In Hostinger control panel:
1. **Advanced** → **Node.js**
2. **Application startup file**: Set to `server.js`
3. **Application port**: `3000` or the port Hostinger provides
4. **Application environment**: `production`

### Step 7.2: Start/Restart Application
1. Go to **Advanced** → **Node.js**
2. Click **Start** or **Restart**
3. Check status - should show **Running**

### Step 7.3: View Application Logs
1. **Advanced** → **Node.js** → **Logs**
2. Monitor for any errors

---

## 8. DOMAIN & SSL CONFIGURATION

### Step 8.1: Configure Domain
1. Go to **Domain** in Hostinger control panel
2. Ensure your domain is pointing to the correct server
3. Check **DNS records** are correct

### Step 8.2: Enable SSL Certificate
1. **SSL/TLS** → **Certificates**
2. Select **Let's Encrypt** (free, automatic)
3. Click **Issue SSL Certificate**
4. Enable **Auto-renew**

### Step 8.3: Force HTTPS
In your `next.config.ts`, ensure all external APIs use HTTPS:
```typescript
async redirects() {
  return [
    {
      source: '/:path*',
      destination: 'https://yourdomain.com/:path*',
      permanent: true,
      has: [{ type: 'header', key: 'x-forwarded-proto', value: '(?!https)' }]
    }
  ]
}
```

---

## 9. TROUBLESHOOTING

### Application Not Starting
1. Check **Node.js Logs** in Hostinger control panel
2. Verify `DATABASE_URL` environment variable is set correctly
3. Ensure all npm dependencies are installed:
   ```bash
   npm install
   ```
4. Verify build was successful:
   ```bash
   npm run build
   ```

### Database Connection Error
```
Error: Client has encountered a connection error and requires a hard reset
```
Solution:
- Verify PostgreSQL is running on Hostinger
- Check DATABASE_URL format: `postgresql://user:pass@host:5432/db`
- Test connection via SSH:
  ```bash
  psql postgresql://hodo_user:password@localhost:5432/hodophile_db
  ```

### Port Already in Use
- Ensure port 3000 is not blocked by firewall
- Check for other Node.js processes:
  ```bash
  pm2 list
  ```
- Kill existing process:
  ```bash
  pm2 kill
  ```

### Build Fails
- Clear cache:
  ```bash
  rm -rf .next node_modules package-lock.json
  npm install
  npm run build
  ```
- Check TypeScript errors:
  ```bash
  npm run type-check
  ```

### Migrations Not Applied
- Verify DATABASE_URL is correct
- Run with verbose output:
  ```bash
  npx prisma migrate deploy --skip-generate
  ```
- Check migration status:
  ```bash
  npx prisma migrate status
  ```

---

## 10. POST-DEPLOYMENT CHECKLIST

- [ ] Domain points to Hostinger server
- [ ] SSL certificate issued and active (green lock icon)
- [ ] Node.js application shows "Running" status
- [ ] Database connection working
- [ ] All environment variables set in Hostinger
- [ ] Prisma migrations applied
- [ ] Home page loads without errors
- [ ] Forms submit and create database records
- [ ] WhatsApp notifications sending (if applicable)
- [ ] Analytics/tracking working (if applicable)
- [ ] Email notifications working (if applicable)

---

## 11. MONITORING & MAINTENANCE

### Regular Tasks
1. **Monitor Logs**: Check Node.js logs for errors weekly
2. **Database Backups**: Enable automatic backups in Hostinger
3. **Security**: Keep dependencies updated
4. **Performance**: Monitor response times via Hostinger analytics

### Update Deployment
When you push new code to your git branch:
1. If auto-deploy enabled: automatically deploys
2. If manual: click **Deploy** in Hostinger Git panel
3. Restart Node.js application if needed
4. Run migrations if schema changed:
   ```bash
   npx prisma migrate deploy
   ```

### Useful Commands
```bash
# SSH into Hostinger
ssh username@your-domain.com

# Check application status
pm2 status

# View logs
pm2 logs

# Restart application
npm start

# Stop application
pm2 stop all

# Check database
psql postgresql://hodo_user:password@localhost:5432/hodophile_db
```

---

## 12. ADDITIONAL RESOURCES

- [Hostinger Node.js Documentation](https://support.hostinger.com/en/articles/8667635-how-to-deploy-a-nodejs-application)
- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/guides/database/postgresql)
- [Next.js Production Deployment](https://nextjs.org/docs/deployment/production-checklist)
- [PM2 Documentation](https://pm2.keymetrics.io/)

---

## Summary

1. ✅ Build locally: `npm run build`
2. ✅ Push to Git
3. ✅ Create PostgreSQL database on Hostinger
4. ✅ Set environment variables
5. ✅ Connect Git repository to Hostinger
6. ✅ Run Prisma migrations via SSH
7. ✅ Start Node.js application
8. ✅ Enable SSL certificate
9. ✅ Test all features
10. ✅ Monitor logs and performance

Your Hodophile website is now deployed on Hostinger!
