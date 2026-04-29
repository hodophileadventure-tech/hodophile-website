# Lead Capture Popup Setup Guide

A complete lead capture system that shows a popup after 120 seconds on your Hodophile website and stores leads in Google Sheets.

## ✨ Features

- ✅ Popup appears after 120 seconds (configurable)
- ✅ Shows only once per session using `sessionStorage`
- ✅ Smooth fade-in animation
- ✅ Mobile-responsive design
- ✅ Form validation (name, email, phone)
- ✅ Loading state during submission
- ✅ Success message with WhatsApp redirect
- ✅ Prevents duplicate submissions (5-minute window)
- ✅ Google Sheets integration
- ✅ Brand colors (black & #FCC000)

## 📁 Files Created

1. **`src/components/lead-capture-popup.tsx`** - React client component
2. **`src/app/api/leads/route.ts`** - Next.js API route
3. **`GOOGLE_APPS_SCRIPT.gs`** - Google Apps Script for Sheets integration
4. **`src/app/layout.tsx`** - Updated to include popup (already done)

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
npm install lucide-react
```

### Step 2: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "Hodophile Leads"
3. Create headers in the first row:
   - **A1:** Name
   - **B1:** Email
   - **C1:** WhatsApp
   - **D1:** Timestamp
   - **E1:** Source
4. Copy the spreadsheet ID from the URL (e.g., `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`)

### Step 3: Deploy Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"+ New Project"**
3. Copy the entire contents of `GOOGLE_APPS_SCRIPT.gs` into the editor
4. Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID from Step 2
5. Save the script (Ctrl+S)
6. Click **"Run"** to grant permissions (select your Google account)
7. Click **"Deploy"** → **"New Deployment"**
8. Select type: **"Web app"**
9. Execute as: Your account
10. Who has access: **"Anyone"**
11. Click **"Deploy"**
12. Copy the deployment URL (you'll need this in the next step)

### Step 4: Configure Environment Variables

Create or update `.env.local` in your project root:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercopy
```

Replace `YOUR_DEPLOYMENT_ID` with the ID from the deployment URL.

### Step 5: Test the System

1. Start your dev server:
   ```bash
   npm run dev
   ```
2. Open your website in a browser
3. Wait 120 seconds (or edit the timeout in `lead-capture-popup.tsx` for testing)
4. Fill out the form and submit
5. Check your Google Sheet for the new lead entry

## 🎨 Customization

### Change Popup Delay

Edit `src/components/lead-capture-popup.tsx`, line ~26:

```typescript
const timer = setTimeout(() => {
  setIsVisible(true);
  sessionStorage.setItem('leadCapturePopupShown', 'true');
}, 120000); // Change this value (in milliseconds)
```

### For testing, use 5 seconds:
```typescript
}, 5000); // 5 seconds for testing
```

### Customize Messages

Edit the text in the popup component:
- Line ~100: "Exclusive Travel Deals"
- Line ~101: "Join our community & get special offers"
- Line ~140: "Full Name"
- Line ~155: "Email Address"
- Line ~170: "WhatsApp Number"
- Line ~185: "Get Exclusive Deals"

### Customize Delay Before WhatsApp Redirect

Edit line ~83:

```typescript
setTimeout(() => {
  window.open(
    `https://wa.me/${whatsappNumber}?text=Hi%20Hodophile%20Tours!...`,
    '_blank'
  );
}, 3500); // Time in milliseconds
```

### Disable WhatsApp Redirect

Comment out or remove lines ~82-90 if you don't want automatic WhatsApp opening.

## 🔍 Testing Checklist

- [ ] Install lucide-react
- [ ] Create Google Sheet and copy ID
- [ ] Deploy Google Apps Script and copy URL
- [ ] Set `GOOGLE_APPS_SCRIPT_URL` in `.env.local`
- [ ] Run `npm run dev`
- [ ] Wait (or manually set shorter timeout for testing)
- [ ] Popup appears and can be closed
- [ ] Form validation works
- [ ] Form submission works
- [ ] Data appears in Google Sheet
- [ ] Test on mobile view

## 📊 Google Sheet Structure

The system will create columns automatically:

| Name | Email | WhatsApp | Timestamp | Source |
|------|-------|----------|-----------|--------|
| John Doe | john@example.com | +923001234567 | 2026-04-29T10:30:45.123Z | lead-capture-popup |

## 🐛 Troubleshooting

### Popup doesn't appear after 120 seconds
- Check browser console for errors
- Verify `sessionStorage` isn't blocking popups
- Check `GOOGLE_APPS_SCRIPT_URL` in `.env.local`

### Data not appearing in Google Sheet
- Verify the Apps Script deployment URL is correct
- Check the browser console Network tab for POST errors
- Ensure Google Sheet exists and has correct ID
- Test the Apps Script directly: [script.google.com](https://script.google.com) → Run `testAddLead()`

### Form validation not working
- Clear browser cache and reload
- Check that lucide-react is installed

### X button icon not showing
- Run `npm install lucide-react` if not already installed

## 🔐 Security Notes

- All form data is validated client-side and server-side
- Duplicate submissions are blocked for 5 minutes
- Only `POST` requests are accepted
- Environment variables are server-side only

## 📝 Usage

The popup is automatically integrated into your layout. It will:

1. Load on every page (via root layout)
2. Wait 120 seconds
3. Show once per session
4. Accept valid form data
5. Send to Google Sheets
6. Optionally redirect to WhatsApp

No additional setup required on individual pages!

## 🎯 Next Steps

1. ✅ Users can see the popup
2. ✅ Leads are captured in Google Sheets
3. Consider: Adding email notifications when new leads arrive
4. Consider: Building a dashboard to view leads

---

**Questions?** Check the Google Apps Script error logs in the Apps Script editor under "Execution log".
