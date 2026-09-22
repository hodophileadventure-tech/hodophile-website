import type { TourPackage } from "./tour-packages";

type SeasonalPackageSource = {
  title: string;
  duration: string;
  withIslamabadStay: [number, number, number, number];
  withoutIslamabadStay: [number, number, number, number];
};

const sourcePackages: SeasonalPackageSource[] = [
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (29 May-05 June)", duration: "8 Days / 7 Nights", withIslamabadStay: [37500, 39500, 42500, 62500], withoutIslamabadStay: [33500, 34500, 36500, 48500] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (29 May-07 June)", duration: "10 Days / 9 Nights", withIslamabadStay: [50500, 53500, 57500, 85500], withoutIslamabadStay: [46500, 49500, 51500, 71500] },
  { title: "10 Days tour to Skardu, Manthoka & Basho (29 May-07 June)", duration: "10 Days / 9 Nights", withIslamabadStay: [53500, 56500, 60500, 88500], withoutIslamabadStay: [49500, 51500, 54500, 74500] },
  { title: "10 Days tour to Hunza and Naltar (29 May-07 June)", duration: "10 Days / 9 Nights", withIslamabadStay: [51500, 54500, 58500, 86500], withoutIslamabadStay: [47500, 49500, 52500, 72500] },
  { title: "12 Days tour to Hunza & Skardu (29 May-09 June)", duration: "12 Days / 11 Nights", withIslamabadStay: [66500, 69500, 75500, 111500], withoutIslamabadStay: [62500, 65500, 69500, 97500] },
  { title: "09 Days tour to Kashmir with Arang Kel and Taobat (29 May-07 June)", duration: "9 Days / 8 Nights", withIslamabadStay: [46500, 48500, 52500, 76500], withoutIslamabadStay: [42500, 44500, 46500, 62500] },
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (17-24 April)", duration: "8 Days / 7 Nights", withIslamabadStay: [37500, 39500, 42500, 62500], withoutIslamabadStay: [33500, 34500, 36500, 48500] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (10-19 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [50500, 53500, 57500, 85500], withoutIslamabadStay: [46500, 49500, 51500, 71500] },
  { title: "10 Days tour to Hunza & Naltar (10-19 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [51500, 54500, 58500, 86500], withoutIslamabadStay: [47500, 49500, 52500, 72500] },
  { title: "12 Days tour to Hunza & Skardu (17-28 April)", duration: "12 Days / 11 Nights", withIslamabadStay: [66500, 69500, 75500, 111500], withoutIslamabadStay: [62500, 65500, 69500, 97500] },
  { title: "09 Days tour to Kashmir with Arang Kel & Taobat", duration: "9 Days / 8 Nights", withIslamabadStay: [46500, 48500, 52500, 76500], withoutIslamabadStay: [42500, 44500, 46500, 62500] },
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (03-10 April)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Shogran & Malam Jabba (03-12 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "Blossom Special - 10 Days tour to Hunza & Naltar Valley (03-12 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "Blossom Special - 10 Days tour to Skardu, Manthoka & Basho (03-12 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [44000, 47000, 51000, 79000], withoutIslamabadStay: [40000, 42000, 45000, 65000] },
  { title: "Blossom Special - 12 Days tour to Hunza & Skardu (03-14 April)", duration: "12 Days / 11 Nights", withIslamabadStay: [54000, 57000, 63000, 99000], withoutIslamabadStay: [50000, 53000, 57000, 85000] },
  { title: "09 Days tour to Kashmir & Shogran (03-11 April)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (27-03 April)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (27-05 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "Blossom Special - 10 Days tour to Hunza & Naltar Valley (27 March-05 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "Blossom Special - 10 Days tour to Skardu, Manthokha & Basho (27-05 April)", duration: "10 Days / 9 Nights", withIslamabadStay: [44000, 47000, 51000, 79000], withoutIslamabadStay: [40000, 42000, 45000, 65000] },
  { title: "Blossom Special - 12 Days tour to Hunza & Skardu (27 March-07 April)", duration: "12 Days / 11 Nights", withIslamabadStay: [54000, 57000, 63000, 99000], withoutIslamabadStay: [50000, 53000, 57000, 85000] },
  { title: "09 Days tour to Kashmir & Shogran (27 March-04 April)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (22-29 March)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (22-31 March)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "12 Days tour to Hunza & Skardu (22 March-02 April)", duration: "12 Days / 11 Nights", withIslamabadStay: [54000, 57000, 63000, 99000], withoutIslamabadStay: [50000, 53000, 57000, 85000] },
  { title: "09 Days tour to Kashmir & Shogran (22-30 March)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam, Malam Jabba (06-13 February)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (06-15 February)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "10 Days tour to Hunza & Naltar Valley (06-15 February)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "09 Days tour to Naran & Shogran (06-14 February)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam, Malam Jabba (30 January-06 February)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (30 January-08 February)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "10 Days tour to Hunza & Naltar Valley (30 January-08 February)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "09 Days tour to Kashmir & Shogran (03 January-07 February)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (23-30 January)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (23 January-01 February)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "10 Days tour to Hunza & Naltar Valley (23 January-01 February)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "10 Days tour to Hunza & Naltar Valley (23 January-01 February) - Second departure", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "09 Days tour to Kashmir & Shogran (23-31 January)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (09-16 January)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "08 Days tour to Swat, Kalam & Malam Jabba (16-23 January)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (16-25 January)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "10 Days tour to Hunza & Naltar Valley (16-25 January)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "09 Days tour to Kashmir & Shogran (16-24 January)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam, Malam Jabba (09-16 January)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (09-18 January)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "10 Days tour to Hunza & Naltar Valley (09-18 January)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "09 Days tour to Kashmir & Shogran (09-17 January)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
  { title: "08 Days tour to Swat, Kalam, Malam Jabba (02-09 January)", duration: "8 Days / 7 Nights", withIslamabadStay: [31000, 33000, 36000, 56000], withoutIslamabadStay: [27000, 28000, 30000, 42000] },
  { title: "10 Days tour to Swat, Kalam, Malam Jabba & Shogran (02-11 January)", duration: "10 Days / 9 Nights", withIslamabadStay: [42000, 45000, 49000, 77000], withoutIslamabadStay: [38000, 40000, 43000, 63000] },
  { title: "09 Days tour to Kashmir & Shogran (02-10 January)", duration: "9 Days / 8 Nights", withIslamabadStay: [39000, 41000, 45000, 69000], withoutIslamabadStay: [35000, 37000, 39000, 55000] },
];

const additionalPackageSources: SeasonalPackageSource[] = [
  { title: "02 Days Ormara Beach Weekend Trip", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Moola Chotok", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Ranikot for Weekend Trip (14-15 February)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7000, 7000, 7000, 7000] },
  { title: "02 Days Ormara Beach Weekend Trip (14-15 February)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station (13-15 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Moola Chotok (!3-15 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Charo Machi (13-15 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Ranikot Fort for Weekend Trip (07-08 February)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7000, 7000, 7000, 7000] },
  { title: "02 Days Ormara Beach Weekend Trip (07-08 February)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station (06-08 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Moola Chotok (06-08 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Charo Machi (06-08 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Ranikot Fort Weekend Trip (31 January-01 February)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7000, 7000, 7000, 7000] },
  { title: "02 Days Ormara Beach Weekend Trip (31 January-01 February)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station (30 January-01 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Moola Chotok (30 January-01 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Moola Chotok (30 January-01 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Charo Machi (30 January-01 February)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Ranikot for Weekend Trip (24-25 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7000, 7000, 7000, 7000] },
  { title: "02 Days Ormara Beach Weekend Trip (24-25 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station (23-25 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Charo Machi (23-25 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Moola Chotok (23-25 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Ranikot Fort ft Ehsaan Baig Weekend Trip (17-18 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7000, 7000, 7000, 7000] },
  { title: "02 Days Ormara Beach Weekend Trip (17-18 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station (17-18 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Charo Machi (16-18 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Moola Chotok (16-18 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Ranikot Weekend Trip (10-11 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7000, 7000, 7000, 7000] },
  { title: "02 Days Ormara Beach Weekend Trip (10-11 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station (09-11 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Charo Machi (09-11 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Moola Chotok (09-11 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Moola Chotok (09-11 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Ranikot for Weekend Trip (03-04 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7000, 7000, 7000, 7000] },
  { title: "02 Days Ormara Beach for Weekend Trip (03-04 January)", duration: "2 Days / 1 Night", withIslamabadStay: [11500, 12500, 13500, 13500], withoutIslamabadStay: [7500, 7500, 7500, 7500] },
  { title: "02 Days Gorakh Hill Station (02-04 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16500, 17500, 18500, 18500], withoutIslamabadStay: [16500, 17500, 18500, 18500] },
  { title: "02 Days Charo Machi (02-04 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
  { title: "02 Days Moola Chotok (02-04 January)", duration: "2 Days / 1 Night", withIslamabadStay: [16000, 17000, 18000, 18000], withoutIslamabadStay: [16000, 17000, 18000, 18000] },
];

sourcePackages.push(...additionalPackageSources);

const imageNumbersByFamily: Record<string, number[]> = {
  swat: [1, 7, 11, 17, 23, 40, 49, 67, 78, 86, 89, 91],
  swatShogran: [2, 8, 12, 18, 24, 41, 51, 58, 60, 70, 80],
  skardu: [3, 14, 21],
  hunzaNaltar: [4, 13, 19, 20, 42, 52, 61, 62, 71, 81],
  hunzaSkardu: [5, 9, 15, 26, 92],
  kashmir: [6, 10, 16, 22, 29, 53, 63, 72, 82, 90],
  naran: [43],
  ormara: [25, 31, 36, 45, 55, 65, 74, 84],
  gorakh: [27, 32, 37, 46, 56, 66, 75, 85],
  moola: [28, 33, 38, 47, 48, 59, 69, 77, 79, 88],
  ranikot: [30, 35, 44, 54, 64, 73, 83],
  charo: [34, 39, 50, 57, 68, 76, 87],
};

const imageCursors: Record<string, number> = {};

function getPackageImage(title: string) {
  const family = /ormara/i.test(title)
    ? "ormara"
    : /gorakh/i.test(title)
      ? "gorakh"
      : /moola/i.test(title)
        ? "moola"
        : /ranikot/i.test(title)
          ? "ranikot"
          : /charo/i.test(title)
            ? "charo"
            : /naran/i.test(title)
              ? "naran"
              : /swat|kalam|malam jabba/i.test(title) && /shogran/i.test(title)
                ? "swatShogran"
                : /swat|kalam|malam jabba/i.test(title)
                  ? "swat"
                  : /hunza/i.test(title) && /skardu/i.test(title)
                    ? "hunzaSkardu"
                    : /hunza|naltar/i.test(title)
                      ? "hunzaNaltar"
                      : /skardu|basho|manthoka/i.test(title)
                        ? "skardu"
                        : "kashmir";
  const imageNumbers = imageNumbersByFamily[family];
  const cursor = imageCursors[family] ?? 0;
  const imageNumber = imageNumbers?.[cursor];
  imageCursors[family] = cursor + 1;
  return imageNumber ? `/images/tour-packages/${String(imageNumber).padStart(2, "0")}.webp` : undefined;
}

function getPackageDisplayTitle(title: string) {
  return title
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*-\s*Second departure$/i, "")
    .trim();
}

function getDepartureLabel(title: string) {
  const dateMatch = title.match(/\(([^)]+)\)/);
  return dateMatch ? `Departure dates: ${dateMatch[1]}` : "Departure dates available on request";
}

const getDestinationSlugs = (title: string) => {
  const slugs = [];
  if (/swat|kalam|malam jabba/i.test(title)) slugs.push("swat");
  if (/shogran/i.test(title)) slugs.push("shogran");
  if (/skardu|basho|manthoka/i.test(title)) slugs.push("skardu");
  if (/hunza|naltar/i.test(title)) slugs.push("hunza");
  if (/kashmir|arang kel|taobat/i.test(title)) slugs.push("kashmir");
  if (/naran/i.test(title)) slugs.push("naran");
  return slugs.length ? slugs : ["swat"];
};

export const seasonalTourPackages: TourPackage[] = sourcePackages.map((item, index) => ({
  id: `seasonal-${index + 1}`,
  title: getPackageDisplayTitle(item.title),
  destinationSlugs: getDestinationSlugs(item.title),
  region: /ormara|gorakh|moola|ranikot|charo/i.test(item.title) ? "southern" : "northern",
  image: getPackageImage(item.title),
  duration: item.duration,
  pricePerPerson: item.withIslamabadStay[0],
  priceWithoutIslamabadStay: item.withoutIslamabadStay[0],
  sharingPrices: {
    quad: item.withIslamabadStay[0],
    triple: item.withIslamabadStay[1],
    twin: item.withIslamabadStay[2],
    solo: item.withIslamabadStay[3],
  },
  departure: `${getDepartureLabel(item.title)}; Karachi transport tickets are optional add-ons.`,
  transport: ["Comfortable AC transport", "Tour manager / guide", "Prado for upper Kalam or local excursions"],
  includes: ["Hotel accommodation", "Breakfast and dinner", "Fuel, parking, toll taxes and driver expenses", "Basic phone photography", "Basic first aid"],
  excludes: ["Bus, train or air tickets", "Lunch and refreshments", "Entry fees and water sports", "Travel insurance", "Personal expenses"],
  notes: [
    `Quad sharing from PKR ${item.withIslamabadStay[0].toLocaleString()} with Islamabad stays, or PKR ${item.withoutIslamabadStay[0].toLocaleString()} without them.`,
    `Room rates: triple PKR ${item.withIslamabadStay[1].toLocaleString()}, twin PKR ${item.withIslamabadStay[2].toLocaleString()}, solo PKR ${item.withIslamabadStay[3].toLocaleString()}.`,
    "A minimum 50% advance is required to confirm booking; final payment is due before departure.",
  ],
}));