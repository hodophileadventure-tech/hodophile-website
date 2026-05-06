# PostgreSQL Database Implementation Guide

## ✅ What's Been Set Up

### 1. **Database Schema** (`prisma/schema.prisma`)
Complete relational database with 10 tables:
- **Destination** - Travel destinations in Pakistan
- **Hotel** - Hotel properties
- **HotelRoom** - Room types and pricing
- **SeasonalPrice** - Dynamic pricing by season
- **Vehicle** - Tour vehicles/jeeps
- **Tour** - Tour packages
- **Booking** - Customer bookings
- **Lead** - Inquiry leads
- **Review** - Customer reviews
- **Route** - Travel routes (legacy)

### 2. **Prisma Setup**
- ✅ `@prisma/client` installed
- ✅ `prisma` CLI installed
- ✅ `tsx` for TypeScript seed execution
- ✅ Singleton Prisma client instance (`src/lib/prisma.ts`)
- ✅ Database query utilities (`src/lib/db.ts`)

### 3. **Seed Data** (`prisma/seed.ts`)
Sample data includes:
- 3 destinations (Hunza, Skardu, Naran)
- 2 hotels with rooms
- 2 vehicles
- 2 tours
- 1 sample lead
- 1 sample review

### 4. **Example API Routes**
- `POST/GET /api/leads` - Manage inquiry leads
- `POST/GET /api/bookings` - Manage tour bookings
- `GET /api/data` - Query destinations, hotels, tours

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install PostgreSQL

**Windows:** 
- Download: https://www.postgresql.org/download/windows/
- Run installer, set password (remember it!)
- Default port: 5432

**Check installation:**
```powershell
psql --version
```

### Step 2: Create Database

Open PowerShell and run:
```powershell
psql -U postgres -c "CREATE DATABASE hodophile_db;"
```

Or manually:
```powershell
psql -U postgres
# Then in psql prompt:
CREATE DATABASE hodophile_db;
\q
```

### Step 3: Update Environment Variables

Edit `.env.local`:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hodophile_db"
```

Replace `YOUR_PASSWORD` with the PostgreSQL password you set during installation.

### Step 4: Initialize Database

```bash
npm run db:migrate
```

This:
- Generates Prisma client
- Creates all tables from schema
- Creates migration file in `prisma/migrations/`

### Step 5: Seed Sample Data (Optional)

```bash
npm run db:seed
```

Creates sample destinations, hotels, tours, and bookings.

### Step 6: Verify Setup

Open Prisma Studio:
```bash
npm run db:studio
```

Opens visual database editor at http://localhost:5555

---

## 📊 Database Queries

### In your components/APIs, use `src/lib/db.ts`:

```typescript
// Import utilities
import { getDestinations, getHotels, createLead, createBooking } from '@/lib/db';

// Get all destinations
const destinations = await getDestinations();

// Get hotels for a destination
const hotels = await getHotels(destinationId);

// Create a lead
const lead = await createLead({
  name: 'Ahmed Khan',
  phone: '+92-300-1234567',
  email: 'ahmed@example.com',
  route: 'Hunza Valley',
  adultsCount: 4,
  totalPrice: 150000,
});

// Create a booking
const booking = await createBooking({
  tourId: 'tour-id',
  roomId: 'room-id',
  clientName: 'Hassan Ali',
  clientPhone: '+92-300-9876543',
  numberOfRooms: 2,
  numberOfNights: 3,
  checkInDate: new Date('2026-06-01'),
  checkOutDate: new Date('2026-06-04'),
  adultsCount: 4,
  kidsCount: 0,
  totalPrice: 60000,
});
```

---

## 🔌 API Usage

### Create Lead
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Khan",
    "phone": "+92-300-1234567",
    "email": "ahmed@example.com",
    "route": "Hunza Valley",
    "adultsCount": 4,
    "totalPrice": 150000
  }'
```

### Get Leads by Phone
```bash
curl http://localhost:3000/api/leads?phone=%2B92-300-1234567
```

### Get Destinations/Hotels/Tours
```bash
# All destinations
curl "http://localhost:3000/api/data?type=destinations"

# Hotels for a destination
curl "http://localhost:3000/api/data?type=hotels&destinationId=destination-id"

# Tours
curl "http://localhost:3000/api/data?type=tours"
```

### Create Booking
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "tourId": "tour-id",
    "roomId": "room-id",
    "clientName": "Hassan Ali",
    "clientPhone": "+92-300-9876543",
    "numberOfRooms": 2,
    "numberOfNights": 3,
    "checkInDate": "2026-06-01",
    "checkOutDate": "2026-06-04",
    "adultsCount": 4,
    "kidsCount": 0,
    "totalPrice": 60000
  }'
```

---

## 📝 Useful Commands

```bash
# Database operations
npm run db:migrate        # Create/update database schema
npm run db:push          # Push schema without migrations (dev only)
npm run db:seed          # Populate sample data
npm run db:studio        # Open visual database editor

# Development
npm run dev              # Start Next.js dev server
npm run build            # Build for production

# Prisma CLI (advanced)
npx prisma format        # Format schema file
npx prisma validate      # Validate schema
npx prisma db reset      # ⚠️ Reset database (deletes all data)
npx prisma generate      # Regenerate client
```

---

## 🛠️ Next Steps

### 1. **Add More Hotels/Destinations**
Edit `prisma/seed.ts` or use Prisma Studio to add:
```typescript
await prisma.hotel.create({
  data: {
    name: 'Your Hotel',
    destinationId: destinationId,
    city: 'City Name',
    rooms: HotelRoom[]
  }
});
```

### 2. **Connect to Frontend**
Update components to fetch from database:
```typescript
// src/components/destination-list.tsx
import { getDestinations } from '@/lib/db';

export default async function DestinationList() {
  const destinations = await getDestinations();
  return (
    <div>
      {destinations.map(d => (
        <div key={d.id}>{d.name}</div>
      ))}
    </div>
  );
}
```

### 3. **Add Authentication** (for admin panel)
Install NextAuth.js:
```bash
npm install next-auth
```

Create admin routes to:
- Manage hotels and rooms
- Approve reviews
- View bookings

### 4. **Enable Auto-Incrementing IDs** (Optional)
Currently uses CUID (random IDs). To use auto-incrementing:
```prisma
model Lead {
  id    Int     @id @default(autoincrement())
  // ...
}
```

### 5. **Add Indexes for Performance**
Already included in schema for common queries:
- `destinationId`, `city`, `status`, `phone`, `createdAt`

---

## 🔒 Security Checklist

- [ ] Keep `DATABASE_URL` in `.env.local` (never commit to git)
- [ ] Add `.env.local` to `.gitignore` ✅ (should be there)
- [ ] Use environment variables in production
- [ ] Validate user input in API routes
- [ ] Add authentication for sensitive routes
- [ ] Use Prisma's built-in SQL injection prevention
- [ ] Enable HTTPS in production
- [ ] Regular database backups

---

## 📦 Deployment

### Railway (Recommended)
1. Connect GitHub repo to Railway
2. Add PostgreSQL addon
3. Railway auto-generates `DATABASE_URL`
4. Push code to deploy

### Render
1. Create PostgreSQL database
2. Add connection string as environment variable
3. Deploy Node.js app

### Vercel + Railway
1. Host Next.js on Vercel
2. Host PostgreSQL on Railway
3. Connect with `DATABASE_URL` env var

---

## 🐛 Troubleshooting

### "error: connect ECONNREFUSED"
**Solution:** PostgreSQL not running
```bash
# Windows
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start

# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### "database 'hodophile_db' does not exist"
```bash
psql -U postgres -c "CREATE DATABASE hodophile_db;"
```

### "role 'postgres' does not exist"
```bash
createuser -s postgres
```

### "Cannot find module '@prisma/client'"
```bash
npm install @prisma/client
npx prisma generate
```

### Migration conflicts after changing schema
```bash
# Reset database (WARNING: deletes all data)
npm run db:migrate:deploy
# or
npx prisma migrate reset
npm run db:migrate
npm run db:seed
```

---

## 📚 Learn More

- [Prisma Docs](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Next.js with Prisma](https://vercel.com/docs/frameworks/nextjs)
- [Railway Database](https://docs.railway.app/)

---

## 📞 Support

For issues or questions:
1. Check Prisma docs: https://www.prisma.io/docs/
2. Check PostgreSQL docs: https://www.postgresql.org/docs/
3. View database schema: `npx prisma studio`
4. Run migrations: `npm run db:migrate`
