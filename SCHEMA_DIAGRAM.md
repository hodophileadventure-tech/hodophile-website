# Database Schema Overview

## Entity Relationship Diagram

```
┌─────────────────────┐
│   DESTINATION       │
├─────────────────────┤
│ id (PK)             │
│ name                │◄──────────────┐
│ slug (UNIQUE)       │               │
│ description         │               │
│ region              │               │
│ bestSeason          │               │
│ elevation           │               │
│ difficulty          │               │
└─────────────────────┘               │
        ▲                             │
        │ (1:N)                       │
        │                             │
        └─────┬──────────────────────┘
              │
              │
    ┌─────────┴────────────┐
    │                      │
    │                      │
┌───┴──────────────┐  ┌───┴──────────────┐
│     HOTEL        │  │      TOUR        │
├──────────────────┤  ├──────────────────┤
│ id (PK)          │  │ id (PK)          │
│ name             │  │ name             │
│ city             │  │ slug (UNIQUE)    │
│ address          │  │ description      │
│ rating           │  │ duration         │
│ amenities (JSON) │  │ basePricePerPerson
│ destinationId(FK)│  │ itinerary (JSON) │
└──────┬───────────┘  │ included (JSON)  │
       │ (1:N)        │ vehicleId (FK)   │
       │              │ destinationId(FK)│
       │              └──────┬───────────┘
       │                     │ (N:1)
       │              ┌──────┴──────────┐
       │              │   VEHICLE       │
       │              ├─────────────────┤
       │              │ id (PK)         │
       │              │ name            │
       │              │ type            │
       │              │ capacity        │
       │              │ pricePerKm      │
       │              └─────────────────┘
       │
       │ (1:N)
       │
    ┌──┴──────────────┐
    │   HOTELROOM     │
    ├─────────────────┤
    │ id (PK)         │
    │ roomType        │
    │ capacity        │
    │ basePricePerNight
    │ amenities (JSON)│
    │ hotelId (FK)    │◄─────────┐
    └──────┬──────────┘          │
           │ (1:N)               │
           │ (N:1)               │
           │          ┌──────────┴────────────┐
           │          │                       │
    ┌──────┴────────┐ │  ┌──────────────────┐ │
    │ SEASONALPRICE │ │  │     BOOKING      │ │
    ├───────────────┤ │  ├──────────────────┤ │
    │ id (PK)       │ │  │ id (PK)          │ │
    │ season        │ │  │ clientName       │ │
    │ startDate     │ │  │ clientPhone      │ │
    │ endDate       │ │  │ numberOfRooms    │ │
    │ pricePerNight │ │  │ numberOfNights   │ │
    │ roomId (FK)   │ │  │ checkInDate      │ │
    └───────────────┘ │  │ totalPrice       │ │
                      │  │ status           │ │
                      │  │ roomId (FK)      ├─┘
                      │  │ tourId (FK)      │
                      │  └──────────────────┘
                      │         ▲
                      │         │ (N:1)
                      │         │
                      └─────────┘

┌─────────────────────┐
│      LEAD           │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ phone               │
│ email               │
│ route               │
│ vehicle             │
│ hotel               │
│ adultsCount         │
│ kidsCount           │
│ totalPrice          │
│ status              │
│ createdAt           │
└─────────────────────┘

┌─────────────────────┐
│     REVIEW          │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ tourName            │
│ hotelName           │
│ rating              │
│ comment             │
│ approved            │
│ createdAt           │
└─────────────────────┘

┌─────────────────────┐
│      ROUTE          │
├─────────────────────┤
│ id (PK)             │
│ name                │
│ slug (UNIQUE)       │
│ duration            │
│ city                │
│ vehicles (JSON)     │
└─────────────────────┘
```

## Table Definitions

### DESTINATION
Store travel destinations in Pakistan
- **Primary Key:** `id` (CUID)
- **Unique:** `slug`
- **Indexes:** `region`, `slug`
- **Relationships:** Hotels (1:N), Tours (1:N)

### HOTEL
Store hotel/accommodation information
- **Primary Key:** `id` (CUID)
- **Indexes:** `city`, `destinationId`
- **Foreign Key:** `destinationId` → DESTINATION
- **Relationships:** HotelRooms (1:N)

### HOTELROOM
Specific room types with pricing
- **Primary Key:** `id` (CUID)
- **Indexes:** `hotelId`, `roomType`
- **Foreign Key:** `hotelId` → HOTEL
- **Relationships:** SeasonalPrices (1:N), Bookings (1:N)

### SEASONALPRICE
Dynamic pricing by season
- **Primary Key:** `id` (CUID)
- **Indexes:** `roomId`, `season`
- **Foreign Key:** `roomId` → HOTELROOM
- **Seasons:** peak, blossom, off

### VEHICLE
Tour vehicles/jeeps
- **Primary Key:** `id` (CUID)
- **Indexes:** `type`
- **Relationships:** Tours (1:N)

### TOUR
Tour packages
- **Primary Key:** `id` (CUID)
- **Unique:** `slug`
- **Indexes:** `destinationId`, `slug`
- **Foreign Keys:** `destinationId` → DESTINATION, `vehicleId` → VEHICLE
- **JSON Fields:** itinerary, included, excluded
- **Relationships:** Bookings (1:N)

### BOOKING
Customer tour bookings
- **Primary Key:** `id` (CUID)
- **Indexes:** `tourId`, `roomId`, `clientPhone`, `status`
- **Foreign Keys:** `tourId` → TOUR, `roomId` → HOTELROOM
- **Status:** pending, confirmed, cancelled, completed

### LEAD
Inquiry leads (form submissions)
- **Primary Key:** `id` (CUID)
- **Indexes:** `phone`, `createdAt`, `status`
- **Status:** new, contacted, quoted, booked, rejected

### REVIEW
Customer testimonials
- **Primary Key:** `id` (CUID)
- **Indexes:** `approved`, `createdAt`
- **Moderation:** `approved` flag for admin review

### ROUTE
Travel routes (legacy - consider deprecating)
- **Primary Key:** `id` (CUID)
- **Unique:** `slug`
- **JSON:** vehicles array

---

## Sample Queries

### Find all hotels in Hunza Valley
```sql
SELECT h.* FROM "Hotel" h
JOIN "Destination" d ON h."destinationId" = d.id
WHERE d.slug = 'hunza-valley'
```

### Get rooms available for booking on specific dates
```sql
SELECT hr.*, h.name, sp."pricePerNight"
FROM "HotelRoom" hr
JOIN "Hotel" h ON hr."hotelId" = h.id
LEFT JOIN "SeasonalPrice" sp ON hr.id = sp."roomId"
WHERE h."destinationId" = $1
AND sp."startDate" <= $2 AND sp."endDate" >= $2
```

### Get booking statistics
```sql
SELECT 
  b.status,
  COUNT(*) as count,
  SUM(b."totalPrice") as total_revenue
FROM "Booking" b
WHERE b."createdAt" >= $1
GROUP BY b.status
```

### Find popular destinations (by bookings)
```sql
SELECT d.name, COUNT(b.id) as booking_count
FROM "Destination" d
JOIN "Tour" t ON d.id = t."destinationId"
JOIN "Booking" b ON t.id = b."tourId"
GROUP BY d.id
ORDER BY booking_count DESC
LIMIT 10
```

---

## Performance Considerations

- **Indexes:** Already included on foreign keys and search fields
- **JSON Fields:** Use for flexible data (amenities, itinerary)
- **Pagination:** Add LIMIT/OFFSET for large result sets
- **Caching:** Consider caching destinations/tours (updated infrequently)
- **Archiving:** Archive old bookings to separate table after 1 year

---

## Future Enhancements

- [ ] Add payment status tracking table
- [ ] Add customer account/authentication table
- [ ] Add inventory tracking for rooms
- [ ] Add staff/guide management table
- [ ] Add image gallery table (one-to-many for room/hotel images)
- [ ] Add activity log table for audit trail
- [ ] Add FAQ/guides table
- [ ] Add promo/discount codes table
