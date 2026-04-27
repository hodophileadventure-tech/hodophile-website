# Travel Quotation System - Setup Guide

## 📋 System Overview

This is a production-ready travel quotation engine with real-time pricing, dynamic hotel filtering, and WhatsApp CRM integration.

### Features
- ✅ Dynamic route, hotel, and room selection
- ✅ Real-time quotation calculation
- ✅ Season-based pricing (peak, blossom, off-season, fixed)
- ✅ Vehicle selection with route-specific pricing
- ✅ Instant quotation summary with per-person cost
- ✅ WhatsApp notification integration
- ✅ PostgreSQL lead storage
- ✅ Responsive SaaS-style UI

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @prisma/client
npm install -D prisma
npm install dotenv
```

### 2. Environment Setup

Create a `.env.local` file in the root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hodophile_db"

# WhatsApp Integration (Optional - for notifications)
WHATSAPP_API_TOKEN="your_twilio_api_token"
WHATSAPP_ADMIN_PHONE="+923001234567"
WHATSAPP_FROM_NUMBER="+1234567890"
```

### 3. Setup PostgreSQL Database

If using Railway (recommended):
1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL plugin
3. Copy the connection string to `DATABASE_URL`

Or locally with Docker:
```bash
docker run --name hodophile-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=hodophile_db \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Initialize Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Open Prisma Studio (optional - for testing)
npx prisma studio
```

### 5. Seed Initial Data (Optional)

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from "@prisma/client";
import { hotels } from "@/lib/data/hotels";
import { routes } from "@/lib/data/routes";

const prisma = new PrismaClient();

async function main() {
  // Hotels are already in memory - add them to DB if needed
  console.log("Seeding complete");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

---

## 🏗️ Architecture

### Data Files (`/src/lib/data/`)
- **hotels.ts** - Hotel database with room types and seasonal pricing
- **routes.ts** - Travel routes with vehicle pricing
- **jeeps.ts** - Jeep add-on packages
- **fuel.ts** - Fuel pricing reference

### Core Logic (`/src/lib/`)
- **pricingEngine.ts** - Quotation calculation logic
- **whatsapp.ts** - WhatsApp notification handler

### API (`/src/app/api/`)
- **POST /api/quote** - Calculate quotation and save lead

### Components (`/src/components/`)
- **make-my-trip-form.tsx** - Main quotation form
- **price-summary.tsx** - Real-time price breakdown

---

## 💰 Pricing Logic

The system calculates quotations as:

```
Total = Transport Cost + Hotel Cost + Jeep Add-ons

Where:
- Transport Cost = Vehicle price for selected route
- Hotel Cost = Room price × Number of rooms
- Jeep Add-ons = Selected activity costs
- Per-Person Cost = Total / (Adults + Kids)
```

### Season Determination
- **Peak:** June - September
- **Blossom:** March - May
- **Off-season:** August - February
- **Fixed:** No seasonal variation

---

## 📱 WhatsApp Integration

### Setup Twilio (Recommended)

1. Go to [twilio.com](https://www.twilio.com)
2. Create account and enable WhatsApp
3. Get your API credentials
4. Update `.env.local`:

```env
WHATSAPP_API_TOKEN="your_auth_token"
WHATSAPP_ADMIN_PHONE="+923001234567"
WHATSAPP_FROM_NUMBER="+1234567890"
```

### Fallback Logging

If WhatsApp is not configured, quotations are logged to console:
```
=== QUOTATION NOTIFICATION ===
🧳 *New Travel Quotation Request* 🧳
...
```

---

## 📊 Database Schema

### Leads Table
Stores all quotation requests:
- Customer name, phone
- Route, vehicle, hotel, rooms
- Total price
- Timestamp

### Query Examples

```typescript
// Get all leads from today
const todayLeads = await prisma.lead.findMany({
  where: {
    createdAt: {
      gte: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  },
});

// Get total revenue
const revenue = await prisma.lead.aggregate({
  _sum: { totalPrice: true },
});
```

---

## 🔧 Customization

### Adding a New Route

Edit `/src/lib/data/routes.ts`:
```typescript
{
  id: "new-route-id",
  name: "New Destination",
  slug: "new-destination",
  duration: 5,
  city: "Skardu",
  minimumDays: 5,
  vehicles: [
    { name: "Toyota Corolla", price: 100000 },
    // ... more vehicles
  ],
}
```

### Adding a Hotel

Edit `/src/lib/data/hotels.ts`:
```typescript
{
  id: "new-hotel",
  name: "New Hotel Name",
  city: "Skardu",
  seasons: { peak: "June-Sept", off: "Oct-May" },
  rooms: [
    { name: "Deluxe", peak: 5000, off: 3000 },
  ],
}
```

---

## 🚢 Deployment (Railway)

### 1. Push to GitHub

```bash
git add .
git commit -m "Add travel quotation system"
git push origin main
```

### 2. Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add PostgreSQL plugin
4. Deploy

### 3. Environment Variables

Set in Railway dashboard:
- `DATABASE_URL` (auto-filled if PostgreSQL added)
- `WHATSAPP_API_TOKEN`
- `WHATSAPP_ADMIN_PHONE`
- `WHATSAPP_FROM_NUMBER`

---

## 📈 Monitoring & Analytics

### Check Leads Dashboard

```typescript
// In a new route `/api/dashboard/leads`
const leads = await prisma.lead.findMany({
  take: 100,
  orderBy: { createdAt: "desc" },
});

const stats = await prisma.lead.aggregate({
  _count: true,
  _sum: { totalPrice: true },
  _avg: { totalPrice: true },
});
```

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db execute

# Reset database (development only)
npx prisma migrate reset
```

### WhatsApp Not Sending
- Check `.env.local` has correct tokens
- Verify admin phone number format: `+92...`
- Check Twilio dashboard for errors
- Quotations are logged to console as fallback

### Type Errors
```bash
# Regenerate Prisma types
npx prisma generate

# Rebuild TypeScript
npm run build
```

---

## 📝 Notes

- All prices are in PKR (Pakistani Rupees)
- Hotel room prices can have multiple variants (double/triple/quad occupancy)
- Season-based pricing automatically adjusts based on trip date
- WhatsApp is optional - system works without it (logs to console)
- Data is stored in files for easy management and version control
- Database is optional - leads can be stored in PostgreSQL later

---

## 🎯 Next Steps

1. ✅ Set up PostgreSQL database
2. ✅ Configure WhatsApp integration
3. ✅ Test quotation form locally
4. ✅ Deploy to Railway
5. ✅ Add admin dashboard for lead management
6. ✅ Create email notifications
7. ✅ Add payment integration

---

For questions or issues, refer to the API route in `/src/app/api/quote/route.ts` and pricing engine in `/src/lib/pricingEngine.ts`.
