/*
  Migration script: Postgres (via Prisma) -> MongoDB
  Usage:
    Set environment variables:
      - POSTGRES_URL (already used by Prisma client via schema)
      - MONGODB_URL
    Then run:
      node scripts/migrate-pg-to-mongo.js

  Notes:
    - This script uses your existing Prisma Client to read data from Postgres.
    - It inserts documents into MongoDB collections with the same model names (lowercased).
    - The original `id` field is preserved and also used as `_id` in MongoDB so relations remain consistent.
    - Backup your databases before running.
*/

const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');

const prisma = new PrismaClient();

async function connectMongo(uri) {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

function sanitize(doc) {
  // Convert Dates to native Date, remove undefined, try to parse JSON strings
  const out = {};
  for (const [k, v] of Object.entries(doc)) {
    if (v === undefined) continue;
    // Prisma may return BigInt as BigInt; convert to Number where safe
    if (typeof v === 'bigint') out[k] = Number(v);
    else if (typeof v === 'string') {
      // try parse JSON
      const s = v.trim();
      if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'))) {
        try { out[k] = JSON.parse(v); continue; } catch (e) { /* leave as string */ }
      }
      out[k] = v;
    } else out[k] = v;
  }
  return out;
}

async function migrateCollection(prismaFetchFn, mongoDb, collectionName, transform = (d) => d) {
  console.log(`Migrating ${collectionName}...`);
  const rows = await prismaFetchFn();
  if (!rows || rows.length === 0) {
    console.log(`  no rows found for ${collectionName}`);
    return 0;
  }

  const docs = rows.map((r) => {
    const clean = sanitize(r);
    // preserve original id as _id to keep relations stable
    if (clean.id !== undefined) clean._id = clean.id;
    return transform(clean);
  });

  try {
    await mongoDb.collection(collectionName).insertMany(docs, { ordered: false });
    console.log(`  inserted ${docs.length} documents into ${collectionName}`);
    return docs.length;
  } catch (err) {
    // ignore duplicate key errors but report others
    if (err.code === 11000) {
      console.log(`  some documents already existed in ${collectionName}, inserted others`);
      return docs.length;
    }
    console.error(`  error inserting into ${collectionName}:`, err.message || err);
    return 0;
  }
}

async function main() {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    console.error('Please set MONGODB_URL in the environment and try again.');
    process.exit(1);
  }

  const mongoClient = await connectMongo(mongoUrl);
  const mongoDb = mongoClient.db();

  try {
    // DESTINATIONS
    await migrateCollection(() => prisma.destination.findMany(), mongoDb, 'destinations');

    // VEHICLES
    await migrateCollection(() => prisma.vehicle.findMany(), mongoDb, 'vehicles');

    // PRICING CONFIG
    await migrateCollection(() => prisma.pricingConfig.findMany(), mongoDb, 'pricingConfigs');

    // HOTELS
    await migrateCollection(() => prisma.hotel.findMany(), mongoDb, 'hotels');

    // HOTEL ROOMS
    await migrateCollection(() => prisma.hotelRoom.findMany(), mongoDb, 'hotelRooms');

    // SEASONAL PRICES
    await migrateCollection(() => prisma.seasonalPrice.findMany(), mongoDb, 'seasonalPrices');

    // TOURS
    await migrateCollection(() => prisma.tour.findMany(), mongoDb, 'tours');

    // LEADS
    await migrateCollection(() => prisma.lead.findMany(), mongoDb, 'leads');

    // BOOKINGS
    await migrateCollection(() => prisma.booking.findMany(), mongoDb, 'bookings');

    // REVIEWS
    await migrateCollection(() => prisma.review.findMany(), mongoDb, 'reviews');

    // TRANSPORT PRICING
    await migrateCollection(() => prisma.transportPricing.findMany(), mongoDb, 'transportPricings');

    // ROUTES
    await migrateCollection(() => prisma.route.findMany(), mongoDb, 'routes');

    console.log('\nMigration complete.');
  } finally {
    await prisma.$disconnect();
    await mongoClient.close();
  }
}

main().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
