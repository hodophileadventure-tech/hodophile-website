# ✅ Lead Capture Setup Checklist

Follow these steps in order. Check off each box as you complete it.

## Phase 1: Google Sheet Setup

- [ ] Created new Google Sheet "Hodophile Leads"
- [ ] Added headers in row 1:
  - [ ] A1: Name
  - [ ] B1: Email
  - [ ] C1: WhatsApp
  - [ ] D1: Timestamp
  - [ ] E1: Source
- [ ] **Copied Spreadsheet ID** (from URL between `/d/` and `/edit`)
  - ID: `_____________________________`

## Phase 2: Google Apps Script

- [ ] Went to script.google.com
- [ ] Created new project
- [ ] Deleted default code
- [ ] Copied `GOOGLE_APPS_SCRIPT.gs` into editor
- [ ] **Replaced `YOUR_SPREADSHEET_ID`** with actual ID from Phase 1
- [ ] Saved the script (Ctrl+S)
- [ ] Clicked **"Run"** and granted permissions
- [ ] Deployed as Web App:
  - [ ] Deploy → New Deployment
  - [ ] Type: Web app
  - [ ] Execute as: Your account
  - [ ] Access: Anyone
- [ ] **Copied deployment URL**
  - URL: `_____________________________`

## Phase 3: Environment Configuration

- [ ] Created `.env.local` file in project root (or opened existing)
- [ ] Added this line:
  ```env
  GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_ID/usercopy
  ```
- [ ] **Replaced** `YOUR_ID` with the deployment URL ID from Phase 2
- [ ] Saved `.env.local`

## Phase 4: Code Setup (Already Done ✅)

- [x] Created `src/components/lead-capture-popup.tsx`
- [x] Created `src/app/api/leads/route.ts`
- [x] Updated `src/app/layout.tsx` to include popup
- [x] Installed `lucide-react` dependency

## Phase 5: Local Testing

- [ ] Ran `npm run dev`
- [ ] Opened `http://localhost:3000` in browser
- [ ] **For Quick Test:** 
  - [ ] Edited `src/components/lead-capture-popup.tsx`
  - [ ] Changed line 26 from `120000` to `5000`
  - [ ] Saved file
  - [ ] Refreshed browser
- [ ] Waited for popup to appear (5 seconds or 120 seconds)
- [ ] **Popup appeared** ✓ (check this box)
- [ ] Filled out form:
  - [ ] Name: (any text)
  - [ ] Email: (valid email)
  - [ ] WhatsApp: (10+ digits)
- [ ] Clicked "Get Exclusive Deals"
- [ ] Saw success message ✓

## Phase 6: Data Verification

- [ ] Opened Google Sheet in new tab
- [ ] **New row appeared** with:
  - [ ] Name field filled
  - [ ] Email field filled
  - [ ] WhatsApp field filled
  - [ ] Timestamp filled
  - [ ] Source = "lead-capture-popup"

## Phase 7: Restore Original Settings

- [ ] **For Quick Test only:** 
  - [ ] Edited `src/components/lead-capture-popup.tsx`
  - [ ] Changed line 26 back to `120000` (120 seconds)
  - [ ] Saved file
  - [ ] Refreshed browser
- [ ] OR skipped if tested with full 120 seconds

## Phase 8: Production Build

- [ ] Ran `npm run build`
- [ ] No errors in build output
- [ ] Ready to deploy

## Phase 9: Deployment

- [ ] Deployed to production (Vercel, Railway, etc.)
- [ ] Set `GOOGLE_APPS_SCRIPT_URL` environment variable on hosting platform
- [ ] Tested on live website after 2 minutes
- [ ] Data appeared in Google Sheet

## Phase 10: Ongoing

- [ ] Monitor Google Sheet for new leads
- [ ] Optionally set up email notifications (Tools → Notifications)
- [ ] Optionally export leads to CRM
- [ ] Optionally follow up via WhatsApp

---

## 🆘 If Something Goes Wrong

### Popup won't show
1. [ ] Check browser console for errors (F12)
2. [ ] Clear cache and reload
3. [ ] Verify `.env.local` exists and has URL
4. [ ] Try private/incognito window
5. [ ] Check timeout is set to 5000 (or 120000)

### Data not in Google Sheet
1. [ ] Verify Apps Script deployment URL is correct
2. [ ] Check Google Apps Script execution log (Execution log button)
3. [ ] Verify Spreadsheet ID is correct in GOOGLE_APPS_SCRIPT.gs
4. [ ] Check network tab (F12 → Network) for /api/leads response
5. [ ] Look for error messages in response

### Form won't submit
1. [ ] Verify all fields have valid values
2. [ ] Check browser console for JavaScript errors
3. [ ] Verify `.env.local` has correct URL
4. [ ] Check network tab for POST errors

### No error messages but nothing works
1. [ ] Hard refresh page (Ctrl+Shift+R)
2. [ ] Delete browser cache
3. [ ] Try incognito window
4. [ ] Check `.env.local` is in project root
5. [ ] Restart dev server (Ctrl+C, then `npm run dev`)

---

## 📝 Save Your IDs

Keep these safe - you'll need them for maintenance:

**Google Spreadsheet ID:**
```
_________________________________
```

**Google Apps Script Deployment ID:**
```
_________________________________
```

**Apps Script Project URL:**
```
_________________________________
```

---

**✅ When all boxes are checked, your lead capture system is live!**

---

## 🎯 Quick Reference

| What | Where | Timeout |
|------|-------|---------|
| Popup component | `src/components/lead-capture-popup.tsx` | Line 26 |
| API endpoint | `src/app/api/leads/route.ts` | - |
| Config | `.env.local` | - |
| Apps Script | Google Apps Script (cloud) | - |
| Leads storage | Google Sheet | - |

**Popup appears after 120 seconds, shows once per session, stores leads in Google Sheet automatically.**
