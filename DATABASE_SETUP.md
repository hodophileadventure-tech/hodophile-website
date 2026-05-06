# PostgreSQL Database Setup Guide

## Quick Start

### Step 1: Install PostgreSQL

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Install with default settings (default user: `postgres`, port: `5432`)

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

### Step 2: Create Database

Open PostgreSQL CLI:
```bash
psql -U postgres
```

Then run:
```sql
CREATE DATABASE hodophile_db;
\c hodophile_db
```

Exit with: `\q`

---

### Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/hodophile_db"
   ```

---

### Step 4: Initialize Prisma

Run migrations to create tables:
```bash
npx prisma migrate dev --name init
```

This will:
- Generate Prisma client
- Create all database tables
- Create a migration file in `prisma/migrations/`

---

### Step 5: Seed Database (Optional)

Create `prisma/seed.ts` for sample data:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample destinations
  const hunza = await prisma.destination.create({
    data: {
      name: 'Hunza Valley',
      slug: 'hunza-valley',
      description: 'Beautiful mountain valley',
      region: 'Northern Areas',
      bestSeason: 'June-September',
      difficulty: 'moderate',
    },
  });

  // Create sample hotel
  const hotel = await prisma.hotel.create({
    data: {
      name: 'Mountain View Hotel',
      destinationId: hunza.id,
      city: 'Karimabad',
      address: '123 Main Street',
      phone: '+92-555-1234567',
      rating: 4.5,
    },
  });

  // Create sample room
  await prisma.hotelRoom.create({
    data: {
      hotelId: hotel.id,
      roomType: 'Double',
      capacity: 2,
      basePricePerNight: 5000,
    },
  });

  console.log('Seeding completed!');
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

Run seed:
```bash
npx prisma db seed
```

---

## Database Models

### Destinations
- **Fields:** name, slug, description, region, bestSeason, elevation, difficulty, image

### Hotels
- **Fields:** name, city, address, phone, email, description, rating, amenities, image
- **Linked to:** Destinations, HotelRooms

### HotelRooms
- **Fields:** roomType, capacity, description, basePricePerNight, amenities, image
- **Linked to:** Hotels, SeasonalPrices, Bookings

### SeasonalPrices
- **Fields:** season (peak/blossom/off), startDate, endDate, pricePerNight

### Vehicles
- **Fields:** name, type, capacity, pricePerKm, description, image

### Tours
- **Fields:** name, slug, description, duration, basePricePerPerson, maxGroupSize, itinerary, included, excluded
- **Linked to:** Destinations, Vehicles, Bookings

### Bookings
- **Fields:** clientName, clientPhone, numberOfRooms, numberOfNights, checkInDate, checkOutDate, totalPrice, status, specialRequests

### Leads
- **Fields:** name, phone, email, route, vehicle, hotel, rooms, adultsCount, kidsCount, totalPrice, status, message

### Reviews
- **Fields:** name, email, tourName, hotelName, rating, comment, approved, image

---

## Prisma Studio (Visual Database Browser)

View and manage data with a GUI:
```bash
npx prisma studio
```

Opens at http://localhost:5555

---

## Useful Prisma Commands

```bash
# Generate client
npx prisma generate

# Create new migration
npx prisma migrate dev --name add_new_feature

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View schema diff
npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datasource prisma/schema.prisma

# Format schema
npx prisma format

# Validate schema
npx prisma validate
```

---

## Production Deployment (Railway/Render)

### Railway:
1. Connect GitHub repo
2. Set `DATABASE_URL` environment variable
3. Set `NODE_ENV=production`
4. Deploy automatically on push

### Environment Variable:
```
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
```

---

## Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npm install @prisma/client
npx prisma generate
```

### Migration conflicts
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

### Connection refused
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Check PostgreSQL is listening on port 5432

### "role postgres does not exist"
```bash
createuser postgres
```

---

## Next Steps

1. Update API routes in `/src/app/api/` to use Prisma client
2. Create utility functions for common queries
3. Add validation and error handling
4. Set up automated backups for production

See `/src/lib/` for example Prisma queries.
