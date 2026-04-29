# 🎯 Lead Capture Popup - Complete Implementation

## Overview

Your website now has a **lead capture popup** that:
- Appears after 120 seconds on every page
- Shows only once per visitor session
- Captures name, email, and WhatsApp number
- Automatically stores leads in your Google Sheet
- Optionally opens WhatsApp chat with the user

## 📊 Data Flow

```
Visitor browses website
           ↓
    120 seconds pass
           ↓
   Popup appears (once per session)
           ↓
  User fills form & submits
           ↓
    /api/leads endpoint
           ↓
  Google Apps Script receives data
           ↓
  Data stored in Google Sheet
           ↓
  Optional: WhatsApp opens automatically
```

## 🚀 Complete Setup (Step-by-Step)

### Phase 1: Backend Setup (5 minutes)

#### Step 1.1: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ New"** to create a new spreadsheet
3. Name it "Hodophile Leads" (or similar)
4. In the first row, create these headers:
   - **Column A:** Name
   - **Column B:** Email
   - **Column C:** WhatsApp
   - **Column D:** Timestamp
   - **Column E:** Source

5. **Save the Spreadsheet ID:**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/XXXXXXXXXXX/edit`
   - Copy everything between `/d/` and the next `/`
   - Example ID: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o`

#### Step 1.2: Deploy Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"+ New Project"** (top left)
3. Name it "Hodophile Lead Capture" (optional)
4. **Delete** the default `myFunction` code
5. **Copy ALL of this code** from the repo file `GOOGLE_APPS_SCRIPT.gs`
6. **Paste it** into the Apps Script editor
7. **Find this line** (around line 14):
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
   ```
8. **Replace** `YOUR_SPREADSHEET_ID` with your actual ID from Step 1.1
9. **Save** (Ctrl+S or Cmd+S)
10. **Grant Permissions:**
    - Click the **"Run"** button (top)
    - Select your Google account
    - Click **"Allow"** when prompted
11. **Deploy the Web App:**
    - Click **"Deploy"** (top right) → **"New Deployment"**
    - Click the gear icon → **"Web app"**
    - **Execute as:** Your Google account (dropdown)
    - **Who has access:** "Anyone" (dropdown)
    - Click **"Deploy"**
12. **Copy the Deployment URL:**
    - A dialog will appear with your deployment URL
    - It looks like: `https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o/usercopy`
    - **Keep this URL safe** - you'll need it next

#### Step 1.3: Configure Your Website

1. In the project root directory, create a file called `.env.local` (if it doesn't exist)
2. Add this line:
   ```env
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercopy
   ```
3. **Replace** `YOUR_DEPLOYMENT_ID` with the ID from your deployment URL
   - Example: `GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o/usercopy`
4. **Save the file**

### Phase 2: Testing (5 minutes)

#### Step 2.1: Start Development Server

```bash
npm run dev
```

#### Step 2.2: Test the Popup

1. Open `http://localhost:3000` in your browser
2. **Option A (Quick Test):** Edit `src/components/lead-capture-popup.tsx`:
   - Find line ~26: `}, 120000);`
   - Change to: `}, 5000);` (5 seconds for testing)
   - Save file
   - Refresh browser
3. **Option B (Patient Test):** Wait 120 seconds

#### Step 2.3: Submit Test Form

1. When popup appears, fill out:
   - Name: `Test User`
   - Email: `test@example.com`
   - WhatsApp: `923001234567` (10+ digits)
2. Click **"Get Exclusive Deals"**
3. You should see a success message
4. (Optionally) WhatsApp will open

#### Step 2.4: Verify Data in Google Sheet

1. Go back to your Google Sheet
2. You should see a new row with your test data:
   - Name: Test User
   - Email: test@example.com
   - WhatsApp: 923001234567
   - Timestamp: (current date/time)
   - Source: lead-capture-popup

✅ **If you see the data → Setup is working!**

#### Step 2.5: Restore Original Timing

If you changed the timeout to 5 seconds:
1. Edit `src/components/lead-capture-popup.tsx`
2. Change line ~26 back to: `}, 120000);` (120 seconds)
3. Save file
4. Test one more time (or in production)

### Phase 3: Production (1 minute)

1. **Run full build:**
   ```bash
   npm run build
   ```
2. **Verify no errors**
3. **Deploy** to your hosting (Railway, Vercel, etc.)
4. **Test on live site** after 2 minutes

## 🎨 Customization

### Change the Delay

Edit **`src/components/lead-capture-popup.tsx`**, line 26:

```typescript
}, 120000); // milliseconds: 1000 = 1 second, 120000 = 120 seconds
```

Common values:
- 5 seconds testing: `5000`
- 10 seconds: `10000`
- 30 seconds: `30000`
- 120 seconds (2 min): `120000` ← default
- 300 seconds (5 min): `300000`

### Change Popup Messages

Edit **`src/components/lead-capture-popup.tsx`**:

- **Line 100:** `<h2 className="text-white text-xl font-bold">Exclusive Travel Deals</h2>`
- **Line 101:** `<p className="text-white/90 text-sm mt-1">Join our community & get special offers</p>`
- **Line 140-141:** Form labels
- **Line 185:** Button text

### Disable WhatsApp Auto-Open

Edit **`src/components/lead-capture-popup.tsx`**, lines 82-90:

**Delete or comment out:**
```typescript
// Optionally open WhatsApp
// const whatsappNumber = formData.whatsapp.replace(/\D/g, '');
// if (whatsappNumber) {
//   setTimeout(() => {
//     window.open(...);
//   }, 3500);
// }
```

### Change Brand Colors

The popup uses:
- **Primary:** Black (`from-black`)
- **Secondary:** #FCC000 (`to-[#FCC000]`)

To change, edit **`src/components/lead-capture-popup.tsx`**:

**Line 94:** Background gradient
```typescript
className="bg-gradient-to-r from-black to-[#FCC000] p-6 relative"
//                                ↑ change color here
```

**Line 158:** Focus ring color
```typescript
className={`...focus:ring-[#FCC000]...`}
//                     ↑ change color here
```

## 🔧 Troubleshooting

### Popup doesn't appear

**Problem:** Popup isn't showing after the delay
**Solutions:**
1. Check browser console for errors (F12 → Console)
2. Verify `.env.local` has `GOOGLE_APPS_SCRIPT_URL`
3. Try changing timeout to 5000 for quicker testing
4. Clear browser cache and reload
5. Check in private/incognito window (fresh session)

### Data not appearing in Google Sheet

**Problem:** Form submits but data doesn't show in Sheet
**Solutions:**
1. Check the deployment URL is correct in `.env.local`
2. In Google Apps Script, click **"Execution log"** to see errors
3. Verify the Spreadsheet ID is correct in GOOGLE_APPS_SCRIPT.gs
4. In browser (F12 → Network), look for POST to `/api/leads`
   - Should return 201 status
   - Check "Response" tab for errors
5. Make sure Sheet has the correct headers

### Form validation errors

**Problem:** Red error messages appear
**Solutions:**
1. Check you're entering valid:
   - Email: must have `@` and domain
   - Phone: must have 10+ digits (leading + optional)
2. All fields are required

### X button doesn't show

**Problem:** Close button has no icon
**Solutions:**
```bash
npm install lucide-react
npm run dev
```

### "Already submitted" error

**Problem:** Can't submit same email/phone twice
**Solutions:**
- This is by design (prevents spam for 5 minutes)
- Try with different email or phone
- Wait 5 minutes and retry with same data

## 📊 Monitor Your Leads

### In Google Sheet

1. Go to your "Hodophile Leads" sheet
2. Leads appear as new rows
3. Sort by Timestamp (newest first) to see recent submissions

### Add Notifications (Optional)

To get notified of new leads:
1. In Google Sheet, select column A (Name)
2. Tools → Notifications → **"On any change"**
3. **"Email me immediately"**

## 🔐 Important Notes

- ✅ All data is validated before sending
- ✅ Duplicate submissions blocked (5-minute window per email/phone)
- ✅ Only POST requests accepted on `/api/leads`
- ✅ Form data is sent as JSON
- ✅ Popup only shows once per session (uses `sessionStorage`)

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `src/components/lead-capture-popup.tsx` | Main React component |
| `src/app/api/leads/route.ts` | Server endpoint |
| `GOOGLE_APPS_SCRIPT.gs` | Google Sheets integration |
| `src/app/layout.tsx` | Popup integration (already done) |
| `.env.local` | Configuration |

## 📈 Next Steps

1. ✅ **Setup Google Sheet** (5 min)
2. ✅ **Deploy Apps Script** (5 min)
3. ✅ **Configure `.env.local`** (2 min)
4. ✅ **Test locally** (5 min)
5. ✅ **Build and deploy** (varies)
6. → Monitor leads in Google Sheet
7. → Optional: Add email notifications
8. → Optional: Build dashboard

## 💡 Tips

- **Test often:** Use 5-second timeout while developing
- **Check logs:** Google Apps Script → Execution log
- **Mobile test:** Use DevTools device emulation (F12)
- **Timing:** 120 seconds is good balance (avoids early interruption but catches attention)
- **Lead follow-up:** Export from Sheet to CRM, add to WhatsApp bulk messages, etc.

## 📞 Getting Help

If something isn't working:

1. **Check the basics:**
   - Is `.env.local` file created with correct URL?
   - Did you save the file after editing?
   - Did you restart the dev server?

2. **Check the logs:**
   - Browser console (F12 → Console)
   - Google Apps Script execution log
   - Network tab in browser DevTools

3. **Test individual parts:**
   - Test Google Sheet is accessible
   - Test Apps Script deployment URL in browser
   - Test form locally with 5-second timeout

---

**🎉 Congratulations!** Your lead capture system is now live. Every visitor will see the popup and leads will automatically flow into your Google Sheet!
