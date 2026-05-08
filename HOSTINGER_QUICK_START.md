# Hostinger Deployment Quick Start

## Pre-Deployment Checklist

Before deploying, complete these steps in order:

### 1. VERIFY BUILD ✅
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] `.next` folder created
- [ ] No TypeScript errors

### 2. CREATE PRODUCTION .ENV FILE ✅
Create `.env.production.local` in project root:
```
# PostgreSQL - from Hostinger Database panel
DATABASE_URL="postgresql://hodo_user:password@localhost:5432/hodophile_db"

# Next.js
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: WhatsApp Integration
# WHATSAPP_API_KEY=your_key
# WHATSAPP_PHONE_NUMBER=your_number

# Optional: Google Sheets
# GOOGLE_SHEETS_API_KEY=your_key
```

### 3. PUSH TO GIT ✅
```bash
git add .
git commit -m "Deploy: Production build ready for Hostinger"
git push origin main
```

### 4. HOSTINGER SETUP ✅
In Hostinger Control Panel:
- [ ] Enable Node.js (Advanced → Node.js)
- [ ] Create PostgreSQL database (Databases → PostgreSQL)
- [ ] Note: Host, Port, Database name, Username, Password
- [ ] Connect Git repository (Advanced → Git)

### 5. ENVIRONMENT VARIABLES IN HOSTINGER ✅
Go to Advanced → Environment Variables. Add:
```
DATABASE_URL = postgresql://hodo_user:password@localhost:5432/hodophile_db
NODE_ENV = production
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```

### 6. RUN MIGRATIONS VIA SSH ✅
SSH into Hostinger:
```bash
ssh username@your-hostinger-domain.com
cd public_html/your-project-name
npx prisma migrate deploy
npm run db:seed  # Optional: populate sample data
```

### 7. START APPLICATION ✅
In Hostinger Node.js panel:
- [ ] Set Startup File: `npm start`
- [ ] Set Port: `3000`
- [ ] Click Start
- [ ] Verify status shows "Running"

### 8. VERIFY DEPLOYMENT ✅
- [ ] Visit https://yourdomain.com
- [ ] Check home page loads
- [ ] Test contact form (creates database record)
- [ ] Check Hostinger logs for errors

---

## Deployment Steps Summary

| Step | Action | Time | Status |
|------|--------|------|--------|
| 1 | Run `npm run build` locally | 5 min | ⬜ |
| 2 | Verify build succeeds | 2 min | ⬜ |
| 3 | Create `.env.production.local` | 2 min | ⬜ |
| 4 | Push to Git | 1 min | ⬜ |
| 5 | Enable Node.js on Hostinger | 2 min | ⬜ |
| 6 | Create PostgreSQL database | 3 min | ⬜ |
| 7 | Connect Git repo to Hostinger | 3 min | ⬜ |
| 8 | Set environment variables | 3 min | ⬜ |
| 9 | SSH and run migrations | 5 min | ⬜ |
| 10 | Start Node.js app | 2 min | ⬜ |
| 11 | Test website | 5 min | ⬜ |
| **Total** | | **~30 min** | ✅ |

---

## Common Issues & Solutions

### Issue: "Cannot find module '@prisma/client'"
**Solution:**
```bash
npm install
npm run build
```

### Issue: Database connection error
**Solution:** Verify DATABASE_URL format:
```
postgresql://username:password@localhost:5432/databasename
```
Check credentials in Hostinger Databases panel.

### Issue: Application won't start
**Solution:** Check logs in Hostinger Node.js panel. Common causes:
- Missing environment variables
- Port 3000 already in use
- Database not accessible

### Issue: Build fails
**Solution:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

## Files You'll Need from Hostinger

When setting up, save these details:

**PostgreSQL Connection:**
- Host: _______________
- Port: _______________
- Database: _______________
- Username: _______________
- Password: _______________

**SSH Access:**
- Hostname: _______________
- Username: _______________
- Password: _______________

**Domain:**
- Domain Name: _______________
- Nameservers: _______________

---

## After Deployment

1. **Monitor**: Check Hostinger logs daily for first week
2. **Backup**: Enable automatic database backups
3. **SSL**: Verify HTTPS is active (green lock)
4. **Updates**: Keep dependencies updated
5. **Performance**: Monitor page load times

---

## Need Help?

Refer to the detailed guide: `HOSTINGER_DEPLOYMENT.md`
