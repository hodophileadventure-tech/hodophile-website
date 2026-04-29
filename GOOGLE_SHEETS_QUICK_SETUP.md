# Quick Google Sheets Integration Setup

## 🎯 What Gets Stored

When someone fills out the lead capture popup, this data is saved to your Google Sheet:

```
Name: John Doe
Email: john@example.com  
WhatsApp: +923001234567
Timestamp: 2026-04-29T14:32:15.000Z
Source: lead-capture-popup
```

## 🔗 How It Works

```
User fills popup → Posts to /api/leads → Sent to Google Apps Script → Stored in Google Sheet
```

## ⚡ Quick Setup (5 minutes)

### 1. Google Sheet

Create a new Google Sheet with these columns:
- A: Name
- B: Email
- C: WhatsApp
- D: Timestamp
- E: Source

Copy the ID from: `https://docs.google.com/spreadsheets/d/{ID}/edit`

### 2. Apps Script

1. Go to script.google.com
2. Create new project
3. Paste the code from `GOOGLE_APPS_SCRIPT.gs`
4. Replace `YOUR_SPREADSHEET_ID` with your Sheet ID
5. Deploy as Web App (anyone can access)
6. Copy the deployment URL

### 3. Environment Variable

In `.env.local`:
```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/d/YOUR_ID/usercopy
```

### 4. Done! ✅

Test: Wait 2 minutes on your site → Fill form → Check Google Sheet

## 📌 Deployment URL Format

After deploying, you'll get a URL like:
```
https://script.google.com/macros/d/1234567890abcdefghijk/usercopy
```

The part after `/d/` is what you need.

## 🧪 Test the Script

In Google Apps Script editor:
1. Select function `testAddLead`
2. Click Run
3. Check your Sheet for test entry

## 🔍 Debug

If data isn't appearing:
1. Check `.env.local` has correct URL
2. In Apps Script, check "Execution log" 
3. In browser DevTools → Network tab → POST to /api/leads
4. Look for 200 status and response

## 📊 View Leads via API

Optional: Get all leads programmatically by accessing:
```
{GOOGLE_APPS_SCRIPT_URL}?action=getLeads
```

This returns JSON with all leads captured.
