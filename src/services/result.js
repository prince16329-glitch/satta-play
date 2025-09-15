import { client } from "@/lib/sanityClient";

// ✅ Today's result
export async function getTodayResult() {
  const today = new Date().toISOString().split("T")[0];
  const query = `*[_type == "result" && date == $today]{
    city,
    date,
    resultNumber
  }`;
  try {
    return await client.fetch(query, { today });
  } catch (error) {
    console.error("Error fetching today's results:", error);
    return [];
  }
}

// ✅ Yesterday's results
export async function getYesterdayResults() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yDate = yesterday.toISOString().split("T")[0];

  const query = `*[_type == "result" && date == $yDate]{
    city,
    date,
    resultNumber
  }`;
  try {
    return await client.fetch(query, { yDate });
  } catch (error) {
    console.error("Error fetching yesterday's results:", error);
    return [];
  }
}

// ✅ Get Disawar specific data for yesterday and today
export async function getDisawarData() {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yDate = yesterday.toISOString().split("T")[0];

  const query = `{
    "today": *[_type == "result" && city == "disawar" && date == $today][0].resultNumber,
    "yesterday": *[_type == "result" && city == "disawar" && date == $yDate][0].resultNumber
  }`;
  
  try {
    return await client.fetch(query, { today, yDate });
  } catch (error) {
    console.error("Error fetching Disawar data:", error);
    return { today: null, yesterday: null };
  }
}

// ✅ Monthly results for chart
export async function getMonthlyResults(month, year) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-31`;

  const query = `*[_type == "result" && date >= $start && date <= $end]{
    city,
    resultNumber,
    date
  } | order(date asc)`;
  
  try {
    return await client.fetch(query, { start, end });
  } catch (error) {
    console.error("Error fetching monthly results:", error);
    return [];
  }
}

// ✅ Last added result (latest entry regardless of date)
export async function getLastResult() {
  const query = `*[_type == "result"] 
    | order(_createdAt desc)[0] {
      city,
      date,
      waitingCity,
      resultNumber
    }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching last result:", error);
    return null;
  }
}

// ✅ All results (can be used for table/history)
export async function getAllResults() {
  const query = `*[_type == "result"] 
    | order(_createdAt desc) {
      city,
      date,
      waitingCity,
      resultNumber
    }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching all results:", error);
    return [];
  }
}

// ✅ Settings
export async function getSettings() {
  const query = `*[_type == "settings"][0]{
    whatsappNumber, 
    contactName
  }`;
  
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

// Get yearly results for a specific city
export async function getYearlyResults(cityKey, year) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const query = `*[_type == "result" && city == $city && date >= $startDate && date <= $endDate]{
    city,
    resultNumber,
    date
  } | order(date asc)`;

  try {
    const results = await client.fetch(query, {
      city: cityKey,
      startDate,
      endDate
    });
    return results;
  } catch (error) {
    console.error("Error fetching yearly results:", error);
    return [];
  }
}

// Transform results into monthly structure for YearlyTable
export function transformYearlyData(results) {
  const months = {
    JAN: {}, FEB: {}, MAR: {}, APR: {}, MAY: {}, JUN: {},
    JUL: {}, AUG: {}, SEP: {}, OCT: {}, NOV: {}, DEC: {}
  };

  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  results.forEach(result => {
    const date = new Date(result.date);
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    if (months[month]) {
      months[month][day] = result.resultNumber;
    }
  });
  return months;
}

// ✅ City mapping - English URLs to Sanity city keys
export const citySlugMapping = {
  // 2024 versions
  "sadar-bazaar-yearly-chart-2024": "sadar_bazaar",
  "gwalior-yearly-chart-2024": "gwalior",
  "delhi-matka-yearly-chart-2024": "delhi_matka",
  "shri-ganesh-yearly-chart-2024": "shri_ganesh",
  "agra-yearly-chart-2024": "agra",
  "faridabad-yearly-chart-2024": "faridabad",
  "alwar-yearly-chart-2024": "alwar",
  "ghaziabad-yearly-chart-2024": "ghaziabad",
  "dwarka-yearly-chart-2024": "dwarka",
  "gali-yearly-chart-2024": "gali",
  "disawar-yearly-chart-2024": "disawar",

  // 2025 versions
  "sadar-bazaar-yearly-chart-2025": "sadar_bazaar",
  "gwalior-yearly-chart-2025": "gwalior",
  "delhi-matka-yearly-chart-2025": "delhi_matka",
  "shri-ganesh-yearly-chart-2025": "shri_ganesh",
  "agra-yearly-chart-2025": "agra",
  "faridabad-yearly-chart-2025": "faridabad",
  "alwar-yearly-chart-2025": "alwar",
  "ghaziabad-yearly-chart-2025": "ghaziabad",
  "dwarka-yearly-chart-2025": "dwarka",
  "gali-yearly-chart-2025": "gali",
  "disawar-yearly-chart-2025": "disawar"
};

// ✅ Get city display name and year from slug
export function parseSlugData(slug) {
  const cityDisplayNames = {
    // 2024 versions
    "sadar-bazaar-yearly-chart-2024": { name: "SADAR BAZAAR", year: "2024" },
    "gwalior-yearly-chart-2024": { name: "GWALIOR", year: "2024" },
    "delhi-matka-yearly-chart-2024": { name: "DELHI MATKA", year: "2024" },
    "shri-ganesh-yearly-chart-2024": { name: "SHRI GANESH", year: "2024" },
    "agra-yearly-chart-2024": { name: "AGRA", year: "2024" },
    "faridabad-yearly-chart-2024": { name: "FARIDABAD", year: "2024" },
    "alwar-yearly-chart-2024": { name: "ALWAR", year: "2024" },
    "ghaziabad-yearly-chart-2024": { name: "GHAZIABAD", year: "2024" },
    "dwarka-yearly-chart-2024": { name: "DWARKA", year: "2024" },
    "gali-yearly-chart-2024": { name: "GALI", year: "2024" },
    "disawar-yearly-chart-2024": { name: "DISAWAR", year: "2024" },

    // 2025 versions
    "sadar-bazaar-yearly-chart-2025": { name: "SADAR BAZAAR", year: "2025" },
    "gwalior-yearly-chart-2025": { name: "GWALIOR", year: "2025" },
    "delhi-matka-yearly-chart-2025": { name: "DELHI MATKA", year: "2025" },
    "shri-ganesh-yearly-chart-2025": { name: "SHRI GANESH", year: "2025" },
    "agra-yearly-chart-2025": { name: "AGRA", year: "2025" },
    "faridabad-yearly-chart-2025": { name: "FARIDABAD", year: "2025" },
    "alwar-yearly-chart-2025": { name: "ALWAR", year: "2025" },
    "ghaziabad-yearly-chart-2025": { name: "GHAZIABAD", year: "2025" },
    "dwarka-yearly-chart-2025": { name: "DWARKA", year: "2025" },
    "gali-yearly-chart-2025": { name: "GALI", year: "2025" },
    "disawar-yearly-chart-2025": { name: "DISAWAR", year: "2025" }
  };

  return cityDisplayNames[slug] || null;
}