export type ComboItinerary = {
  label: string;
  totalDays: number; // total trip days
  description: string; // markdown/plain text description
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
};

export default COMBO_ITINERARIES;
