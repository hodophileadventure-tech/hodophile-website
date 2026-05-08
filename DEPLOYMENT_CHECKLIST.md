# 🚀 Hodophile Website - Hostinger Deployment Master Checklist

## FINAL CHECKLIST BEFORE DEPLOYMENT

### ✅ Local Machine Preparation
- [ ] Run: `npm run build` (completes without errors)
- [ ] Run: `npm start` (site loads at localhost:3000)
- [ ] Stop dev server: `Ctrl+C`
- [ ] Review `.env.example` for all variables needed
- [ ] Create `.env.production.local` with Hostinger database credentials
- [ ] Git commit all changes: `git commit -m "Deploy: Production ready"`
- [ ] Git push: `git push origin main`

### ✅ Hostinger Account Setup
- [ ] Log in to: https://hpanel.hostinger.com
- [ ] Select your domain
- [ ] Upgrade/Verify Premium or Business plan has Node.js

### ✅ Hostinger Node.js Configuration
- [ ] **Advanced** → **Node.js** → Enable Node.js
- [ ] Select Node.js version: v18.x or higher
- [ ] Application startup file: `npm start`
- [ ] Application port: `3000`
- [ ] Application environment: `production`
- [ ] Click Save

### ✅ Database Setup on Hostinger
- [ ] **Databases** → **PostgreSQL** → Create New Database
- [ ] Database name: `hodophile_db`
- [ ] Create new user: `hodo_user`
- [ ] Generate secure password (save in notes!)
- [ ] Click Create
- [ ] Save connection details:
  - Host: _______________
  - Port: _______________
  - User: _______________
  - Password: _______________

### ✅ Git Integration
- [ ] **Advanced** → **Git** → Connect Repository
- [ ] Select GitHub account (authorize if needed)
- [ ] Select: hodophile-website repository
- [ ] Select branch: `main`
- [ ] Deployment path: `/` (root)
- [ ] Click Connect

### ✅ Environment Variables on Hostinger
- [ ] **Advanced** → **Environment Variables**
- [ ] Add: `DATABASE_URL = postgresql://hodo_user:PASSWORD@localhost:5432/hodophile_db`
- [ ] Add: `NODE_ENV = production`
- [ ] Add: `NEXT_PUBLIC_SITE_URL = https://yourdomain.com`
- [ ] Save each one

### ✅ Install Dependencies via SSH
- [ ] Open SSH client (PowerShell, Terminal, or Hostinger SSH panel)
- [ ] Connect: `ssh username@your-hostinger-domain.com`
- [ ] Navigate: `cd public_html`
- [ ] Run: `npm install`
- [ ] Wait for completion (may take 2-5 minutes)

### ✅ Run Migrations
- [ ] Still in SSH terminal
- [ ] Run: `npx prisma migrate deploy`
- [ ] Verify: No error messages
- [ ] Run: `npm run db:seed` (optional, populates sample data)
- [ ] Run: `npm run build` (builds on server)
- [ ] Exit SSH: `exit`

### ✅ Start Application
- [ ] Back in Hostinger console
- [ ] **Advanced** → **Node.js**
- [ ] Verify: Status shows "Running"
- [ ] If not running, click **Start** or **Restart**
- [ ] Wait 15-20 seconds for startup

### ✅ Verify Deployment
- [ ] Open browser: https://yourdomain.com
- [ ] Site loads completely (black background, yellow accents)
- [ ] All navigation links work
- [ ] Contact form loads
- [ ] Submit contact form (should save to database)
- [ ] Check Hostinger logs for any errors: **Advanced** → **Node.js** → **Logs**

### ✅ SSL Certificate
- [ ] **SSL/TLS** → **Certificates**
- [ ] Verify Let's Encrypt certificate issued
- [ ] Address bar shows 🔒 (green lock)
- [ ] Auto-renew enabled

### ✅ Domain Configuration
- [ ] Domain points to Hostinger servers
- [ ] DNS records configured correctly
- [ ] HTTPS works (green lock icon)

### ✅ Post-Deployment Monitoring
- [ ] Monitor logs daily for first week
- [ ] Test all pages load correctly
- [ ] Verify forms submit and create records
- [ ] Check database size in Hostinger
- [ ] Enable automatic backups

---

## FILE REFERENCES

Create/Review these files in your project root:

| File | Purpose | Status |
|------|---------|--------|
| `HOSTINGER_DEPLOYMENT.md` | Detailed deployment guide | ✅ Created |
| `HOSTINGER_QUICK_START.md` | Quick reference checklist | ✅ Created |
| `HOSTINGER_COMMANDS.md` | All commands needed | ✅ Created |
| `.env.example` | Environment variables template | ✅ Created |
| `.env.production.local` | Your actual production env vars | 🔄 You need to create |
| `next.config.ts` | Production-optimized config | ✅ Updated |

---

## QUICK REFERENCE

### Deployment Process (Summary)
1. Build locally: `npm run build` ✅
2. Push to Git: `git push origin main` ✅
3. Create Hostinger database ✅
4. Connect Git to Hostinger ✅
5. SSH and run: `npm install` ✅
6. SSH and run: `npx prisma migrate deploy` ✅
7. Start Node.js application ✅
8. Visit https://yourdomain.com ✅

### Time Required
- Local prep: ~5 minutes
- Hostinger setup: ~15 minutes
- Database setup: ~5 minutes
- SSH commands: ~10 minutes
- Testing: ~5 minutes
- **Total: ~40 minutes**

---

## TROUBLESHOOTING QUICK LINKS

- [Hostinger Node.js Docs](https://support.hostinger.com/en/articles/8667635)
- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/guides/database/postgresql)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PostgreSQL CLI Basics](https://www.postgresql.org/docs/current/app-psql.html)

---

## WHAT IF SOMETHING GOES WRONG?

### Site shows "Cannot GET /"
- Check Node.js status in Hostinger (should be Running)
- Check logs: **Advanced** → **Node.js** → **Logs**
- Restart: **Advanced** → **Node.js** → **Restart**

### Database connection error
- Verify DATABASE_URL environment variable
- SSH in and test: `psql $DATABASE_URL -c "SELECT 1;"`
- Check PostgreSQL is running

### Build failed
```bash
# SSH in
rm -rf .next node_modules
npm install
npm run build
```

### Application crashed
- Check logs in Hostinger Node.js panel
- SSH in: `pm2 logs`
- Review error messages
- Contact Hostinger support if persistent

---

## AFTER DEPLOYMENT

### Weekly Tasks
- [ ] Monitor logs for errors
- [ ] Test site functionality
- [ ] Verify forms submit correctly

### Monthly Tasks
- [ ] Check npm updates: `npm outdated`
- [ ] Run security audit: `npm audit`
- [ ] Backup database

### Update Deployment
1. Make changes locally
2. Run: `npm run build` and test
3. Push: `git push origin main`
4. Auto-deploys or manual deploy in Hostinger
5. If schema changed, SSH and run: `npx prisma migrate deploy`

---

## SUCCESS INDICATORS ✅

You've successfully deployed when:
- ✅ https://yourdomain.com loads without errors
- ✅ Home page displays correctly (black background, yellow accents)
- ✅ All navigation links work
- ✅ Contact form submits without errors
- ✅ Database records are created
- ✅ No errors in Hostinger logs
- ✅ HTTPS is active (green lock icon)
- ✅ Performance is acceptable (< 3 seconds load time)

---

## CONGRATULATIONS! 🎉

Your Hodophile website is now live on Hostinger!

### Next Steps
1. Add your domain to Google Search Console
2. Set up analytics tracking
3. Monitor performance metrics
4. Plan future features
5. Keep dependencies updated

---

**Questions?** Refer to:
- `HOSTINGER_DEPLOYMENT.md` for detailed steps
- `HOSTINGER_COMMANDS.md` for all commands
- Hostinger support: https://support.hostinger.com
