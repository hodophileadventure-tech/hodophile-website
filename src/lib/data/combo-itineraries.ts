export type ComboItinerary = {
  label: string;
  totalDays: number; // total trip days
  description: string; // markdown/plain text description
  distance?: number; // retained for display metadata only, not used for pricing calculations
  reduceIfStartsIslamabad?: number; // days to reduce if starting from Islamabad
};

export const COMBO_ITINERARIES: Record<string, ComboItinerary> = {
  "Hunza + Naran": {
    label: "06DAYS HUNZA & NARAN",
    totalDays: 6,
    reduceIfStartsIslamabad: 2,
    description: `TOUR ATTRACTIONS: -Balakot -Naran Kaghan -Saif-ul-Muluk lake -Lulusar lake -Babusar top -Kiwai Waterfall -Gilgit -Hunza -Attabad Lake & Attabad tunnel -old silk route view point -Passu cones -Passu Glacier -Altit and Baltit Fort -Hunza Karimabad traditional bazaar -junction point of 3 mountain ranges (Karakoram, Himalaya, Hindukush) -Nanga Parbat view point -Rakaposhi view point -Sost China market -Khunjerab national park -Khunjerab pass (Pak China border)

DETAILED ITINERARY:
Day 01: Departure (travel to Islamabad/Karachi depending on package)
Day 02: Arrival Islamabad (rest for Karachi members)
Day 03: Depart Islamabad → Naran (Kewai waterfall, arrive Naran)
Day 04: Naran → Hunza (Lulusar, Babusar Top, Nanga Parbat viewpoint)
Day 05: Upper Hunza sightseeing (Attabad, Passu, Khunjerab sightseeing)
Day 06: Karimabad (Altit & Baltit Fort, bazaar) — end of core 6-day tour.

Note: If the tour starts from Islamabad, reduce total days by 2 (travel days).`,
  },
  "Kashmir + Shogran + Swat": {
    label: "10DAYS KASHMIR, SHOGRAN & SWAT",
    totalDays: 10,
    reduceIfStartsIslamabad: 2,
    description: `Day 01 (Friday)\nDeparture from Karachi via Bus/Train. Meals in bus/train are not included in our package.\n\nDay 02 (Saturday)\nArrival in Islamabad/Rawalpindi - Travel to Hotel via own conveyance (Uber/Careem). Dinner & Overnight stay in Islamabad/Rawalpindi.\n**Dinner on first night will be served in rooms only from 08:30 - 09:00 PM.\n\nDay 03 (Sunday)\nDeparture for Kashmir via Murree Expressway - Visit Kohala Bridge - Visit Dhani Waterfall - Visit Kashmir Abshaar - Visit LOC Area - Dinner & Night Stay in Keran.\n\nDay 04 (Monday)\nNeelum Valley exploration - Early Morning Breakfast - Departure for Neelum Valley - Visit Kutton Waterfall - Departure for Balakot - Dinner & Night Stay at Balakot.\n\nDay 05 (Tuesday)\nKiwai exploration - Early Morning Breakfast - Travel to Kiwai - Visit Kiwai Waterfall - Take 4x4 jeep for Shogran - Visit Shogran Valley - Explore Siri and Paye Meadows - Travel back to Balakot - Dinner and nightstay at Balakot.\n\nDay 06 (Wednesday)\nEarly Morning Breakfast - Visit Khanpur Dam - Departure for Kalam Valley - Visit Bahrain Bazaar - Dinner and nightstay at Kalam.\n\nDay 07 (Thursday)\nKalam & Upper Kalam exploration - Breakfast call - Take 4x4 Jeep for Upper Kalam - Visit Ushu Forest - Visit Palogha Valley - Visit Upper Kalam (upto accessible) - Travel to Malam Jabba - Dinner and nightstay at Malam Jabba.\n\nDay 08 (Friday)\nMalamjabba exploration - Breakfast at 8 AM - Excursions (Zipline, Chairlift) - Return to Fizzaghat - Dinner & Night Stay at Swat Fizzaghat.\n\nDay 09 (Saturday)\nTravel back to Islamabad/Rawalpindi - Early Morning Breakfast - Drop at Bus Terminal/Station. Airline option available.\n\nDay 10 (Sunday)\nArrival in Karachi.\n\nNote: If tour starts from Islamabad, 2 days will be reduced (travel days).`,
  },
  "Kashmir + Shogran + Murree": {
    label: "KASHMIR, SHOGRAN & MURREE",
    totalDays: 0,
    distance: 1400,
    description: "Exact distance defined for the Kashmir + Shogran + Murree custom route.",
  },
  "Kalam + Malam Jabba + Swat": {
    label: "SWAT, KALAM & MALAM JABBA",
    totalDays: 0,
    distance: 900,
    description: "Exact distance defined for the Swat + Kalam + Malam Jabba custom route.",
  },
  "Balakot + Kashmir + Kalam + Malam Jabba + Swat": {
    label: "CUSTOM ROUTE: KASHMIR, BALAKOT, KALAM, MALAM JABBA & SWAT",
    totalDays: 0,
    distance: 1500,
    description: "Exact distance defined for the Swat, Kalam, Malam Jabba, Balakot, and Kashmir custom route.",
  },
  "Murree + Nathia Gali": {
    label: "03DAYS MURREE & NATHIA GALI",
    totalDays: 3,
    distance: 250,
    description: `Day 1: Travel to Murree
Travel towards Murree via Expressway.
You will then be transferred to a hotel in Murree for some rest.
Breakfast from Hotel & refreshments.
Once you get checked in, take some rest after the tiresome journey.
Spend good time at Murree Mall Road with good photography for your social media.
Move back to Hotel.
Overnight stay at the hotel in Murree.

Day 2: Travel toward Nathia Gali & Explore
Breakfast in Hotel 8:30 am & Departure for Nathia Gali.
Travel towards Nathia Gali.
Short stay on the way for refreshments.
Move towards Nathia Gali.
Reach Nathia Gali and Transfer to Hotel.
Visit Ayubia National Park (Chair Lift).
Visit Bazar & sightseeing of alluring Valley.
Overnight stay in Nathia Gali.

Day 3: Move back to Home after Memorable Journey
Breakfast at 8:00 am.
Travel to Patriata Chair Lift.
Ride Patriata Chair Lift and Cable Car.
Explore Patriata and Photography.
Travel back to Home.
End of Services with unforgettable memories.`,
  },
  "Fairy Meadows + Hunza + Naran": {
    label: "08DAYS NARAN, FAIRY MEADOWS & HUNZA",
    totalDays: 8,
    distance: 2000,
    description: `Day 1: We shall move towards Chilas via Babusar Top and reach there in 11-12 hours, short stay at Naran Bazaar.

Day 2: We shall move towards Raikot Bridge, ride on a jeep to reach Tatoo Village, and then arrive after 4 hours of trekking at Fairy Meadows.

Day 3: We shall explore Fairy Meadows; with a local guide, we shall visit Beyal Camp to see Nanga Parbat from a close view and back to Fairy Meadows.

Day 4: We would reach Rajkot Bridge in 5 hours, then reach Hunza Valley in 4-5 hours, and check in at the hotel.

Day 5: We would move towards Attabad Lake, Hussain Bridge (the world’s most dangerous bridge), Sost Dry Port, and famous Pak China Border Khunjerab Pass.

Day 6: We shall explore the beauty of Hunza Valley and visit Baltit Fort, after visiting Baltit, we will visit Altit Fort, then reach Minapin for a night stay.

Day 7: We would head towards Naran and reach Naran in 6-7 hours via Babusar Top and check in to a hotel in Naran Valley.

Day 8: It is our last day in Naran, and we shall arrive in Islamabad by the end of the day.`,
  },
  "Fairy Meadows + Naran": {
    label: "CUSTOM ROUTE: FAIRY MEADOWS & NARAN",
    totalDays: 0,
    distance: 1000,
    description: "Exact distance defined for the Fairy Meadows + Naran custom route.",
  },
  "Astore + Fairy Meadows + Naran": {
    label: "CUSTOM ROUTE: ASTORE, FAIRY MEADOWS & NARAN",
    totalDays: 0,
    distance: 1500,
    description: "Exact distance defined for the Astore + Fairy Meadows + Naran custom route.",
  },
  "Murree + Kashmir": {
    label: "MURREE & KASHMIR",
    totalDays: 0,
    distance: 450,
    description: "Exact distance defined for the Murree + Kashmir custom route.",
  },
  "Nathia Gali + Kashmir": {
    label: "NATHIA GALI & KASHMIR",
    totalDays: 0,
    distance: 500,
    description: "Exact distance defined for the Nathia Gali + Kashmir custom route.",
  },
  "Murree + Shogran": {
    label: "MURREE & SHOGRAN",
    totalDays: 0,
    distance: 525,
    description: "Exact distance defined for the Murree + Shogran custom route.",
  },
  "Shogran + Kashmir": {
    label: "SHOGRAN & KASHMIR",
    totalDays: 0,
    distance: 550,
    description: "Exact distance defined for the Shogran + Kashmir custom route.",
  },
  "Murree + Shogran + Kashmir": {
    label: "CUSTOM ROUTE: MURREE, SHOGRAN & KASHMIR",
    totalDays: 0,
    distance: 750,
    description: "Exact distance defined for the Murree + Shogran + Kashmir custom route.",
  },
  "Murree + Shogran + Swat": {
    label: "CUSTOM ROUTE: MURREE, SHOGRAN & SWAT",
    totalDays: 0,
    distance: 700,
    description: "Exact distance defined for the Murree + Shogran + Swat custom route.",
  },
  "Shogran + Swat + Kashmir": {
    label: "CUSTOM ROUTE: SHOGRAN, SWAT & KASHMIR",
    totalDays: 0,
    distance: 1000,
    description: "Exact distance defined for the Shogran + Swat + Kashmir custom route.",
  },
  "Astore + Fairy Meadows": {
    label: "ASTORE & FAIRY MEADOWS",
    totalDays: 0,
    distance: 800,
    description: "Exact distance defined for the Astore + Fairy Meadows custom route.",
  },
  "Astore + Hunza": {
    label: "ASTORE & HUNZA",
    totalDays: 0,
    distance: 1000,
    description: "Exact distance defined for the Astore + Hunza custom route.",
  },
  "Astore + Skardu": {
    label: "ASTORE & SKARDU",
    totalDays: 0,
    distance: 900,
    description: "Exact distance defined for the Astore + Skardu custom route.",
  },
  "Fairy Meadows + Hunza": {
    label: "FAIRY MEADOWS & HUNZA",
    totalDays: 0,
    distance: 1200,
    description: "Exact distance defined for the Fairy Meadows + Hunza custom route.",
  },
  "Naran + Skardu": {
    label: "NARAN & SKARDU",
    totalDays: 0,
    distance: 1050,
    description: "Exact distance defined for the Naran + Skardu custom route.",
  },
  "Astore + Fairy Meadows + Hunza + Skardu": {
    label: "CUSTOM ROUTE: ASTORE, FAIRY MEADOWS, HUNZA & SKARDU",
    totalDays: 0,
    distance: 2000,
    description: "Exact distance defined for the Astore + Fairy Meadows + Hunza + Skardu custom route.",
  },
  "Fairy Meadows + Hunza + Naran + Skardu": {
    label: "CUSTOM ROUTE: FAIRY MEADOWS, HUNZA, NARAN & SKARDU",
    totalDays: 0,
    distance: 2150,
    description: "Exact distance defined for the Fairy Meadows + Hunza + Naran + Skardu custom route.",
  },
  "Hunza + Naran + Skardu": {
    label: "CUSTOM ROUTE: HUNZA, NARAN & SKARDU",
    totalDays: 0,
    distance: 1800,
    description: "Exact distance defined for the Hunza + Naran + Skardu custom route.",
  },
  "Fairy Meadows + Skardu": {
    label: "Fairy Meadows + Skardu",
    totalDays: 0,
    distance: 2400,
    description: "Exact distance defined for the Fairy Meadows + Skardu custom route.",
  },
  "Fairy Meadows + Shogran + Skardu": {
    label: "CUSTOM ROUTE: FAIRY MEADOWS, SHOGRAN & SKARDU",
    totalDays: 0,
    distance: 2000,
    description: "Exact distance defined for the Fairy Meadows + Shogran + Skardu custom route.",
  },
  "Naran + Shogran": {
    label: "Naran + Shogran",
    totalDays: 0,
    distance: 800,
    description: "Exact distance defined for the Naran + Shogran custom route.",
  },
};

export default COMBO_ITINERARIES;
