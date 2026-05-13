# Hodophile Website - Railways Deployment Guide

## Overview
Deploying a Next.js application with PostgreSQL on Railway.

---

## 1. LOCAL PREPARATION

### Step 1.1: Build the Application
```bash
npm run build
```

### Step 1.2: Test Production Build Locally
```bash
npm run build
npm start
```
Visit `http://localhost:3000` to verify everything works.

---

## 2. RAILWAY SETUP

### Step 2.1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (recommended for auto-deploy)
3. Create a new project

### Step 2.2: Add PostgreSQL Database
1. In Railway dashboard, click **+ New** → **Database** → **PostgreSQL**
2. Railway creates a PostgreSQL instance automatically
3. Note the connection variables (visible in the service details)

---

## 3. DEPLOYMENT VIA GITHUB

### Step 3.1: Connect GitHub Repository
1. In Railway project, click **+ New** → **GitHub Repo**
2. Authorize Railway to access your GitHub account
3. Select your `hodophile-website` repository
4. Select branch: `main` (or your production branch)
5. Railway automatically detects Next.js and configures deployment

### Step 3.2: Automatic Deployments
- Every push to your production branch triggers an automatic deployment
- Check deployment logs in the Railway dashboard

### Step 3.3: Manual Deployment
If needed, redeploy manually:
1. Go to your service in Railway dashboard
2. Click **Redeploy** button

---

## 4. ENVIRONMENT VARIABLES

### Step 4.1: Set Variables in Railway Dashboard
1. Go to your **Next.js service** → **Variables**
2. Add the following:

**Database (auto-linked from PostgreSQL service):**
- `DATABASE_URL` = Auto-populated from PostgreSQL service

**Application:**
- `NODE_ENV` = `production`
- `NEXT_PUBLIC_SITE_URL` = Your domain (e.g., `https://yourdomain.com`)

**Optional (if using external services):**
- `WHATSAPP_API_KEY` = Your WhatsApp API key
- `WHATSAPP_PHONE_NUMBER` = Your WhatsApp phone number
- `GOOGLE_SHEET_WEBHOOK_URL` = Your Google Apps Script URL
- `GOOGLE_QUOTATION_SCRIPT_URL` = Your quotation script URL

### Step 4.2: Link PostgreSQL Service
1. In Railway, go to your **Next.js service**
2. Click **Add a Service Link**
3. Select the **PostgreSQL service**
4. Railway automatically sets `DATABASE_URL` environment variable

---

## 5. PRISMA MIGRATIONS

### Step 5.1: Run Migrations via Railway Shell
1. In Railway dashboard, go to your **Next.js service**
2. Click **Shell** tab
3. Run:
   ```bash
   npx prisma migrate deploy
   ```

### Step 5.2: Seed Database (Optional)
```bash
npm run db:seed
```

### Step 5.3: Verify Migrations
```bash
npx prisma studio
```

---

## 6. DOMAIN & SSL

### Step 6.1: Add Custom Domain
1. Go to your **Next.js service** → **Settings**
2. Scroll to **Domains**
3. Click **Add a domain**
4. Enter your domain (e.g., `hodophile.com`)
5. Railway provides instructions for DNS setup

### Step 6.2: Configure DNS
1. In your domain registrar (e.g., GoDaddy, Namecheap), update DNS records:
   - Add CNAME record pointing to Railway's provided target
   - Or update A/AAAA records as instructed

### Step 6.3: SSL Certificate
- Railway automatically provisions SSL via Let's Encrypt
- HTTPS is enabled by default (no additional setup required)

---

## 7. MONITORING & LOGS

### Step 7.1: View Logs
1. In Railway dashboard, click your **Next.js service**
2. Go to **Logs** tab to view real-time application logs
3. Check for any deployment or runtime errors

### Step 7.2: Metrics
- **CPU**: Monitor CPU usage in **Metrics** tab
- **Memory**: Check memory consumption
- **Network**: View bandwidth usage

### Step 7.3: Alerts (Optional)
Configure alerts for:
- High CPU usage
- Memory threshold
- Deployment failures

---

## 8. TROUBLESHOOTING

### Application Crashes on Deployment
1. Check **Logs** tab for error messages
2. Verify `DATABASE_URL` is set correctly
3. Verify all required environment variables are present:
   ```bash
   echo $DATABASE_URL
   echo $NODE_ENV
   echo $NEXT_PUBLIC_SITE_URL
   ```
4. Check that Prisma migrations completed successfully

### Database Connection Error
```
Error: Client has encountered a connection error
```
Solution:
- Verify PostgreSQL service is running in Railway
- Check `DATABASE_URL` format: `postgresql://user:password@host:port/dbname`
- Use Railway shell to test connection:
  ```bash
  psql $DATABASE_URL
  ```

### Build Failures
1. Check build logs in Railway dashboard
2. Common causes:
   - Missing `node_modules` cache
   - TypeScript errors
   - Missing environment variables at build time
3. Solution: Click **Redeploy** to trigger a full rebuild

### 503 Errors on Routes
1. Verify app is running: Check **Logs** tab
2. Verify database connectivity: Test via Railway shell
3. Check environment variables are set
4. Restart service: Click **Restart** in service settings

---

## 9. OPTIMIZATION & BEST PRACTICES

### Step 9.1: Enable Railway's Cache
- Railway caches `node_modules` and build artifacts
- Subsequent deploys are faster
- No configuration needed

### Step 9.2: Monitor Costs
- Railway charges based on resource usage
- Free tier includes generous limits for most projects
- Check **Spend** section in Railway dashboard

### Step 9.3: Auto-Scaling (Premium)
- For scaling, upgrade to Railway plan
- Or manually increase replica count in settings

### Step 9.4: Regular Backups
- Railway automatically backs up PostgreSQL
- Access backups in **PostgreSQL service** → **Data** tab

---

## 10. POST-DEPLOYMENT CHECKLIST

- [ ] Application is running (check logs for errors)
- [ ] Domain resolves and HTTPS works
- [ ] Database migrations completed successfully
- [ ] Environment variables are set
- [ ] Home page loads at your domain
- [ ] API routes respond (test `/api/quote` or similar)
- [ ] Forms submit successfully (leads saved to database)
- [ ] WhatsApp notifications work (if configured)
- [ ] Google Sheets integration active (if configured)

---

## 11. UPDATING YOUR APPLICATION

### Push Updates to GitHub
1. Make code changes locally
2. Commit and push to your production branch:
   ```bash
   git add .
   git commit -m "Feature: Update description"
   git push origin main
   ```
3. Railway automatically redeploys

### Force Redeploy
If needed, manually redeploy:
1. Go to your **Next.js service** in Railway
2. Click **Redeploy** button

---

## 12. SCALING & PERFORMANCE

### Option 1: Increase Replica Count
In **Next.js service** → **Settings** → **Deploy**, increase `numReplicas` for load balancing.

### Option 2: Upgrade PostgreSQL
In **PostgreSQL service** → **Settings**, upgrade plan for better performance.

### Option 3: Monitor Performance
Use Railway **Metrics** tab to track response times and identify bottlenecks.

---

## QUICK REFERENCE

| Step | Command/Action | Time |
|------|---|---|
| 1 | Sign up at railway.app | 2 min |
| 2 | Connect GitHub repo | 3 min |
| 3 | Add PostgreSQL database | 1 min |
| 4 | Set environment variables | 2 min |
| 5 | Run Prisma migrations | 1 min |
| 6 | Configure domain DNS | 5 min |
| 7 | Verify deployment | 2 min |
| **Total** | | **~16 min** |

---

## HELPFUL LINKS

- [Railway Documentation](https://docs.railway.app)
- [Next.js on Railway](https://docs.railway.app/guides/nextjs)
- [PostgreSQL on Railway](https://docs.railway.app/databases/postgresql)
- [Environment Variables in Railway](https://docs.railway.app/guides/variables)
- [Railway Support](https://railway.app/support)

---

## EXAMPLE DEPLOYMENT FLOW

```bash
# 1. Local development
npm run dev

# 2. Build locally to test
npm run build
npm start

# 3. Push to GitHub
git add .
git commit -m "Ready for Railways deployment"
git push origin main

# 4. Railway auto-deploys (watch logs in dashboard)

# 5. Set up domain DNS (use Railway's CNAME target)

# 6. Verify at your domain
curl https://yourdomain.com
```

Your Hodophile website is now deployed on Railway! 🚀
