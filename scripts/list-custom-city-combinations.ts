import { sortedCitiesWithHotels } from "../src/lib/data/cities";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const ALWAYS_ALLOWED_ROUTE_CITIES = new Set([
  "Hunza",
  "Skardu",
  "Naran",
  "Astore",
  "Fairy Meadows",
]);

const VALID_COMBINATIONS: string[][] = [
  ["Kashmir", "Shogran"],
  ["Swat", "Shogran"],
  ["Naran", "Shogran"],
  ["Murree", "Nathia Gali"],
];

function getAllNonEmptyCombinations(items: string[]): string[][] {
  const results: string[][] = [];
  const seen = new Set<string>();
  const n = items.length;

  for (let mask = 1; mask < 1 << n; mask += 1) {
    const combo: string[] = [];
    for (let i = 0; i < n; i += 1) {
      if (mask & (1 << i)) combo.push(items[i]);
    }
    // Canonicalize combination order so A+B is treated the same as B+A
    const canonical = [...combo].sort((a, b) => a.localeCompare(b));
    const key = canonical.join("|");
    if (!seen.has(key)) {
      seen.add(key);
      results.push(canonical);
    }
  }

  // Stable presentation: shorter combos first, then lexicographic
  results.sort((a, b) => a.length - b.length || a.join("|").localeCompare(b.join("|")));
  return results;
}

function isOnRouteCombination(combo: string[]): boolean {
  if (combo.length === 0) return false;
  if (combo.every((city) => ALWAYS_ALLOWED_ROUTE_CITIES.has(city))) {
    return true;
  }

  const comboKey = [...combo].sort((a, b) => a.localeCompare(b)).join("|");
  return VALID_COMBINATIONS.some(
    (validCombo) => [...validCombo].sort((a, b) => a.localeCompare(b)).join("|") === comboKey
  );
}

const combos = getAllNonEmptyCombinations(sortedCitiesWithHotels);
const onRouteCombos = combos.filter(isOnRouteCombination);
const lines = onRouteCombos.map((combo, idx) => `${idx + 1}. ${combo.join(" + ")}`);

const output = [
  `Cities (${sortedCitiesWithHotels.length}): ${sortedCitiesWithHotels.join(", ")}`,
  `Total on-route combinations: ${onRouteCombos.length}`,
  "",
  ...lines,
].join("\n");

const outPath = join(process.cwd(), "CUSTOM_CITY_COMBINATIONS_ON_ROUTE.txt");
writeFileSync(outPath, output, "utf8");

console.log(`Generated ${onRouteCombos.length} on-route combinations.`);
console.log(`Saved to: ${outPath}`);
