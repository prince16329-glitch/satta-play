import { client } from "@/lib/sanityClient";
import { GAMES } from "@/utils/gameConfig";

// ==================== SETTINGS ====================
export async function getSettings() {
  const query = `*[_type == "settings"][0]{
    site1_name,
    site1_contactName,
    site1_whatsappNumber,
    site1_paymentNumber,
    site1_rate,
    contactName,
    whatsappNumber
  }`;

  try {
    const settings = await client.fetch(query);
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

function getISTDate(daysOffset = 0) {
  const date = new Date();
  // Add IST offset (5.5 hours)
  date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000));
  // Add/subtract days if needed
  if (daysOffset !== 0) {
    date.setDate(date.getDate() + daysOffset);
  }
  // Format as YYYY-MM-DD
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function updateSettings(settings) {
  try {
    const existingSettings = await client.fetch(`*[_type == "settings"][0]`);

    if (existingSettings) {
      return await client
        .patch(existingSettings._id)
        .set(settings)
        .commit();
    } else {
      return await client.create({
        _type: 'settings',
        ...settings
      });
    }
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

// ==================== RESULTS QUERIES ====================
export async function getTodayResult() {
  const today = getISTDate(); // Use IST date
  console.log('Fetching results for:', today); // Debug log
  
  const query = `*[_type == "result" && date == $today]{
    game,
    date,
    resultNumber
  }`;
  
  try {
    return await client.fetch(query, { today }, { cache: 'no-store' });
  } catch (error) {
    console.error("Error fetching today's results:", error);
    return [];
  }
}

export async function getYesterdayResults() {
  const yDate = getISTDate(-1); // Yesterday in IST
  console.log('Fetching yesterday results for:', yDate);
  
  const query = `*[_type == "result" && date == $yDate]{
    game,
    date,
    resultNumber
  }`;
  
  try {
    return await client.fetch(query, { yDate }, { cache: 'no-store' });
  } catch (error) {
    console.error("Error fetching yesterday's results:", error);
    return [];
  }
}

export async function getLastResult() {
  const query = `*[_type == "result"] 
    | order(_createdAt desc)[0] {
      game,
      date,
      waitingGame,
      resultNumber
    }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching last result:", error);
    return null;
  }
}


export async function getDisawarData() {
  const today = getISTDate();
  const yDate = getISTDate(-1);
  
  console.log('Fetching Disawar data for:', { today, yDate }); // Debug
  
  const query = `{
    "today": *[_type == "result" && game == "disawar" && date == $today][0].resultNumber,
    "yesterday": *[_type == "result" && game == "disawar" && date == $yDate][0].resultNumber
  }`;

  try {
    const result = await client.fetch(query, { today, yDate }, { cache: 'no-store' });
    console.log('Disawar result:', result); // Debug
    return result;
  } catch (error) {
    console.error("Error fetching Disawar data:", error);
    return { today: null, yesterday: null };
  }
}

export async function getMonthlyResults(month, year) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-31`;

  const query = `*[_type == "result" && date >= $start && date <= $end]{
    game,
    resultNumber,
    date
  } | order(date asc)`;

  try {
    return await client.fetch(query, { start, end }, { cache: 'no-store' });
  } catch (error) {
    console.error("Error fetching monthly results:", error);
    return [];
  }
}

export async function getYearlyResults(gameKey, year) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const query = `*[_type == "result" && game == $game && date >= $startDate && date <= $endDate]{
    game,
    resultNumber,
    date
  } | order(date asc)`;

  try {
    const results = await client.fetch(query, {
      game: gameKey,
      startDate,
      endDate
    });
    return results;
  } catch (error) {
    console.error("Error fetching yearly results:", error);
    return [];
  }
}

// ==================== ADMIN FUNCTIONS ====================
export async function getAllResultsWithMeta() {
  const query = `*[_type == "result"] 
    | order(_createdAt desc) {
      _id,
      game,
      date,
      waitingGame,
      resultNumber,
      _createdAt,
      _updatedAt
    }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching all results with metadata:", error);
    return [];
  }
}

export async function createResult(data) {
  try {
    const normalizedData = {
      ...data,
      game: data.game.toLowerCase().trim(),
      waitingGame: data.waitingGame.toLowerCase().trim()
    };

    return await client.create({
      _type: 'result',
      ...normalizedData,
    });
  } catch (error) {
    console.error('Error creating result:', error);
    throw error;
  }
}

export async function updateResult(id, data) {
  try {
    return await client
      .patch(id)
      .set(data)
      .commit();
  } catch (error) {
    console.error('Error updating result:', error);
    throw error;
  }
}

export async function deleteResult(id) {
  try {
    return await client.delete(id);
  } catch (error) {
    console.error('Error deleting result:', error);
    throw error;
  }
}

export function validateResultData(data) {
  const errors = [];

  if (!data.game) {
    errors.push('Game is required');
  }

  if (!data.resultNumber) {
    errors.push('Result number is required');
  }

  if (!data.waitingGame) {
    errors.push('Waiting game is required');
  }

  if (data.game === data.waitingGame) {
    errors.push('Waiting game must be different from the selected game');
  }

  if (!data.date) {
    errors.push('Date is required');
  }

  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push('Date must be in YYYY-MM-DD format');
  }

  if (data.resultNumber && !/^\d+$/.test(data.resultNumber)) {
    errors.push('Result number should contain only numbers');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ==================== CHART MAPPINGS ====================
// Dynamic game slug mapping using GAMES config
export const gameSlugMapping = {};
GAMES.forEach(game => {
  // 2024 versions
  gameSlugMapping[`${game.key.replace('_', '-')}-yearly-chart-2024`] = game.key;
  // 2025 versions
  gameSlugMapping[`${game.key.replace('_', '-')}-yearly-chart-2025`] = game.key;
});

// Dynamic parse slug data function
export function parseSlugData(slug) {
  const gameDisplayNames = {};

  GAMES.forEach(game => {
    // 2024 versions
    gameDisplayNames[`${game.key.replace('_', '-')}-yearly-chart-2024`] = {
      name: game.name,
      year: "2024"
    };
    // 2025 versions
    gameDisplayNames[`${game.key.replace('_', '-')}-yearly-chart-2025`] = {
      name: game.name,
      year: "2025"
    };
  });

  return gameDisplayNames[slug] || null;
}

// ==================== TRANSFORM FUNCTIONS ====================
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