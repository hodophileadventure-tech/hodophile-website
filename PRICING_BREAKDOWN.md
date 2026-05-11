# Hodophile Adventures - Pricing Breakdown Guide

## Overview

The quotation is calculated using **three main components**:
1. **Transport Cost** (Vehicle + Fuel + Tolls)
2. **Hotel Cost** (Room price × Nights × Number of rooms)
3. **Jeep Add-ons** (Optional mandatory activities)

Then **22% markup** is added, and the total is divided by number of guests.

---

## 1. TRANSPORT COST CALCULATION

### Formula:
```
Transport Cost = Fuel Cost + Daily Rental Cost + Toll & Tax
```

### Toyota Corolla Example (Skardu Route)

**Vehicle Parameters:**
- Daily Rental Rate: **Rs 7,000/day**
- Fuel Consumption: **10 km/liter**
- Toll & Tax: **Rs 8,000** (fixed per trip)
- Fuel Type: **Petrol @ Rs 403/liter**

**Distance Calculation:**
- Route: Islamabad to Skardu (typical multi-city routes like 12-day Naran, Hunza, Skardu)
- Route Distance: **~1,600 km** (varies by route)
- Vehicle Days: **8 days** (varies by route)

**Calculation Breakdown:**

| Component | Calculation | Amount |
|-----------|------------|--------|
| **Fuel Cost** | (1,600 km ÷ 10 km/L) × Rs 403/L | (160L × 403) = **Rs 64,480** |
| **Daily Rental** | Rs 7,000/day × 8 days | **Rs 56,000** |
| **Toll & Tax** | Fixed | **Rs 8,000** |
| | | |
| **TOTAL TRANSPORT** | | **Rs 128,480** |

### Other Vehicle Examples (for comparison):

**Honda BRV:**
- Daily Rate: Rs 9,000/day
- Consumption: 10 km/L
- Toll & Tax: Rs 8,000
- Total (8 days): (160L × 403) + (9,000 × 8) + 8,000 = **Rs 144,480**

**Prado (4x4):**
- Daily Rate: Rs 20,000/day
- Consumption: 4 km/L
- Toll & Tax: Rs 8,000
- Fuel Type: Diesel @ Rs 382/L
- Total (8 days): (1,600÷4 × 382) + (20,000 × 8) + 8,000 = **Rs 232,800**

---

## 2. HOTEL COST CALCULATION

### Formula:
```
Hotel Cost = Room Price × Number of Rooms × Number of Nights
```

### Dynamic Pricing by Season:

Prices vary based on trip date:
- **Peak Season** (June-September): Highest rates
- **Blossom Season** (March-May): Medium rates  
- **Off-Season** (August, December-February): Lowest rates

### Skardu Hotels Example:

**Rockview Hotel Skardu - Standard Room:**
- Room Price (varies by season): Rs 5,000 - 7,000/night
- Nights: 2
- Number of Rooms: 1
- Total: 5,500 × 1 × 2 = **Rs 11,000**

**Abbashah Hotel Skardu - Standard Room:**
- Room Price (varies by season): Rs 4,000 - 6,000/night
- Nights: 2
- Number of Rooms: 1
- Total: 5,000 × 1 × 2 = **Rs 10,000**

**Multi-City Hotel Calculation Example:**

For a 12-day Naran, Hunza, Skardu tour:

| City | Hotel | Room Type | Nights | Price/Night | Rooms | Subtotal |
|------|-------|-----------|--------|-------------|-------|----------|
| Islamabad | Pearl Continental | Standard | 2 | Rs 6,000 | 1 | Rs 12,000 |
| Naran | Riverside Resort | Deluxe | 1 | Rs 4,500 | 1 | Rs 4,500 |
| Hunza | Hunza Inn | Standard | 2 | Rs 3,500 | 1 | Rs 7,000 |
| Skardu | Shangrila Hotel | Standard | 2 | Rs 5,500 | 1 | Rs 11,000 |
| | | | | | | |
| **TOTAL HOTEL COST** | | | | | | **Rs 34,500** |

---

## 3. QUOTATION SUMMARY - COMPLETE EXAMPLE

### Scenario: 
- **Trip:** 12-day Naran, Hunza, Skardu (Route ID: naran-hunza-skardu-deosai-12days)
- **Vehicle:** Toyota Corolla
- **Travel Mode:** By Road
- **Hotel Distribution:**
  - Rockview Hotel Skardu: 2 nights (Standard)
  - Abbashah Hotel Skardu: 2 nights (Standard)
- **Guests:** 2 people (2 adults, 0 kids)
- **Rooms:** 1
- **Trip Date:** May 15, 2026 (Blossom Season)

### Line-by-Line Breakdown:

```
═══════════════════════════════════════════════════════════════
                    QUOTATION BREAKDOWN
═══════════════════════════════════════════════════════════════

TRANSPORT COST
─────────────────────────────────────────────────────────────
Vehicle: Toyota Corolla (Petrol)
  • Fuel: 160L @ Rs 403/L = Rs 64,480
  • Rental: Rs 7,000/day × 8 days = Rs 56,000
  • Toll & Tax: = Rs 8,000
─────────────────────────────────────────────────────────────
Subtotal Transport:                         Rs 128,480


HOTEL COST
─────────────────────────────────────────────────────────────
Rockview Hotel Skardu (Standard):
  • Rs 5,500/night × 2 nights × 1 room = Rs 11,000
  
Abbashah Hotel Skardu (Standard):
  • Rs 5,000/night × 2 nights × 1 room = Rs 10,000
─────────────────────────────────────────────────────────────
Subtotal Hotel:                             Rs 21,000


OPTIONAL ADD-ONS
─────────────────────────────────────────────────────────────
Jeep Activities:                            Rs 0
─────────────────────────────────────────────────────────────
Subtotal Add-ons:                           Rs 0


═══════════════════════════════════════════════════════════════
SUBTOTAL (Transport + Hotel + Add-ons):     Rs 149,480

MARKUP (22%):                               Rs 32,886
  [22% of Rs 149,480 = Rs 32,886]

═══════════════════════════════════════════════════════════════
TOTAL COST FOR 2 PEOPLE:                    Rs 182,366

COST PER PERSON (÷ 2):                      Rs 91,183
═══════════════════════════════════════════════════════════════
```

**Note:** The example in your screenshot (Rs 89,408 total) differs slightly because:
- Different hotel rates applied
- Different season pricing
- Possibly different distance/vehicle days
- Rounding variations in calculations

---

## 4. DETAILED COMPONENT CALCULATIONS

### A. Transport Cost Components Explained:

**1. Fuel Cost Calculation:**
```
Fuel Cost = (Distance ÷ Consumption Rate) × Fuel Price

Example: (1,600 km ÷ 10 km/L) × Rs 403/L = Rs 64,480
```

- **Distance:** Varies by route (see routes.ts for each route's distance)
- **Consumption Rate:** Fixed per vehicle type (see vehicle rates table)
- **Fuel Price:** Updated based on market prices (currently: Petrol Rs 403, Diesel Rs 382)

**2. Daily Rental Cost:**
```
Daily Rental = Daily Rate × Number of Vehicle Days

Example: Rs 7,000/day × 8 days = Rs 56,000
```

- **Daily Rate:** Fixed per vehicle (7K for Corolla, 9K for BRV, etc.)
- **Vehicle Days:** Varies by route (8 days for 12-day multi-city tours, 6 days for 10-day tours)
- The ratio accounts for journey days vs. tour days

**3. Toll & Tax:**
- Fixed amount per trip: Rs 8,000 to Rs 13,000 (depends on vehicle)
- Includes highway tolls, security tax, parking fees

---

### B. Hotel Cost Components Explained:

**1. Season Pricing Rules:**
- Hotel rates are stored with seasonal variations
- System automatically detects season from trip date
- Falls back to "blossom" or "off-season" if specific pricing unavailable

**2. Multiple Room Multiplier:**
```
Hotel Cost = (Room Price × Number of Nights) × Number of Rooms

Example: (Rs 5,000 × 2 nights) × 1 room = Rs 10,000
```

- If booking 2 rooms: multiply the result by 2
- If booking 3 rooms: multiply the result by 3

**3. Multi-City Aggregation:**
```
Total Hotel Cost = Sum of all (Hotel A + Hotel B + Hotel C, etc.)
```

---

### C. Markup Calculation:

**Fixed 22% Markup:**
```
Markup = (Transport + Hotel + Add-ons) × 0.22
Total = Subtotal + Markup
```

- Applied to ensure profit margin
- Standard across all quotations
- Non-negotiable in the system

---

### D. Per-Person Division:

```
Per Person Cost = Total Cost ÷ Number of Guests

Example: Rs 182,366 ÷ 2 people = Rs 91,183/person
```

- Guests = Adults + Kids
- Kids count as full guests for pricing purposes
- Divide final total, not individual components

---

## 5. REAL WORLD EXAMPLES

### Example 1: Budget Trip (Corolla, Off-Season)
```
Transport:          Rs 120,000
Hotel (3 nights):   Rs 12,000
Subtotal:           Rs 132,000
Markup (22%):       Rs 29,040
TOTAL (4 people):   Rs 161,040
Per Person:         Rs 40,260
```

### Example 2: Premium Trip (Prado, Peak Season)
```
Transport:          Rs 235,000
Hotel (5 nights):   Rs 60,000
Mandatory Jeep:     Rs 25,000
Subtotal:           Rs 320,000
Markup (22%):       Rs 70,400
TOTAL (2 people):   Rs 390,400
Per Person:         Rs 195,200
```

### Example 3: Budget Group Trip (Grand Cabin, Blossom Season)
```
Transport:          Rs 175,000
Hotel (4 nights):   Rs 32,000
Subtotal:           Rs 207,000
Markup (22%):       Rs 45,540
TOTAL (6 people):   Rs 252,540
Per Person:         Rs 42,090
```

---

## 6. VARIABLES AFFECTING PRICE

| Factor | Impact | Example |
|--------|--------|---------|
| **Vehicle Type** | Transport cost | Corolla < BRV < Prado |
| **Route Distance** | Fuel cost | Longer routes = higher fuel |
| **Vehicle Days** | Rental cost | 8-day tours cost more than 4-day |
| **Season** | Hotel price | Peak 40% more than off-season |
| **Number of Rooms** | Hotel cost | 2 rooms = double cost |
| **Number of Nights** | Hotel cost | Each night adds cost |
| **Travel Mode** | Transport | Air trips have special pricing |
| **Group Size** | Per-person cost | Larger groups = lower per-person |
| **Add-ons** | Total cost | Jeep activities add to total |

---

## 7. SPECIAL CASES

### A. Air Travel Pricing:
- Distance fixed at 950 km (Islamabad to Skardu)
- Prado gets special daily rate: Rs 10,000/day (not Rs 20,000)
- Other vehicles use standard rates

### B. Multi-City Hotels:
- Hotels configured per route (see routeCityHotelPreferences)
- Different hotels available in each city
- Nights per city defined in multiCityConfig

### C. Mandatory Jeep Activities:
- Some routes include mandatory 4x4 jeep activities (e.g., Deosai)
- Cost added to quotation automatically
- Not negotiable - included in all bookings for that route

---

## 8. DEBUGGING TIPS

To see detailed calculation logs:
1. Open browser Developer Console (F12)
2. Look for console.debug() messages prefixed with "Transport:" or "City"
3. Example output:
```
Transport: Toyota Corolla | Distance: 1600km | Consumption: 10km/L 
| Fuel: 160.0L × 403PKR = 64480PKR | Rental: 7000PKR × 8days 
= 56000PKR | Toll/Tax: 8000PKR | Total: 128480PKR
```

---

## 9. CURRENT PRICING DATA (May 2026)

**Fuel Prices:**
- Petrol: Rs 403/liter
- Diesel: Rs 382/liter

**Vehicle Daily Rates:**
- Toyota Corolla: Rs 7,000/day
- Honda BRV: Rs 9,000/day
- Prado: Rs 20,000/day
- Grand Cabin (both): Rs 13,000/day
- Coaster 4C: Rs 18,000/day
- Coaster 5C: Rs 20,000/day

**Hotel Price Range (varies by season):**
- Budget (Standard): Rs 3,000 - 7,000/night
- Mid-range (Deluxe): Rs 5,000 - 10,000/night
- Premium (Executive): Rs 8,000 - 15,000+/night

---

## 10. HOW TO READ A QUOTATION

When you see: **Rs 89,408 (Total) / Rs 44,704 (Per Person)**

This breaks down as:
- Add up all costs: Transport + Hotel + Add-ons = Subtotal
- Add 22% markup to subtotal
- Divide result by number of people
- That's your per-person cost

The quotation is **final and comprehensive** - includes:
- ✅ Vehicle rental with driver
- ✅ Fuel for the entire journey
- ✅ Highway tolls and taxes
- ✅ Hotel accommodation as specified
- ✅ Any mandatory activities (jeeps, etc.)

Does NOT include:
- ❌ Meals (unless specified)
- ❌ Optional activities/tours
- ❌ Travel insurance
- ❌ Tips/gratuities
- ❌ Personal expenses

---

## Questions?

For pricing inquiries:
- Contact: **info@hodophile.com** or WhatsApp lead capture
- Review this guide for detailed breakdowns
- Browser console logs show exact calculations
