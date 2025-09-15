
export const GAMES = [
  { 
    key: "ipl",
    name: "IPL",
    time: "12:55 PM",
    order: 1
  },
  { 
    key: "sikanderpur",
    name: "SIKANDERPUR",
    time: "01:55 PM",
    order: 2
  },
  { 
    key: "delhi_bazar",
    name: "DELHI BAZAR",
    time: "03:00 PM",
    order: 3
  },
  { 
    key: "shri_ganesh",
    name: "SHRI GANESH",
    time: "04:30 PM",
    order: 4
  },
  { 
    key: "faridabad",
    name: "FARIDABAD",
    time: "05:45 PM",
    order: 5
  },
  { 
    key: "surya",
    name: "SURYA",
    time: "07:25 PM",
    order: 6
  },
  { 
    key: "ghaziabad",
    name: "GHAZIABAD",
    time: "08:55 PM",
    order: 7
  },
  { 
    key: "varanasi",
    name: "VARANASI",
    time: "09:55 PM",
    order: 8
  },
  { 
    key: "gali",
    name: "GALI",
    time: "11:20 PM",
    order: 9
  },
  { 
    key: "disawar",
    name: "DISAWAR",
    time: "04:30 AM",
    order: 10
  }
];

// Get game by key
export const getGameByKey = (key) => {
  return GAMES.find(game => game.key === key);
};

// Get game by name
export const getGameByName = (name) => {
  return GAMES.find(game => game.name === name);
};

// Get all game keys for queries
export const GAME_KEYS = GAMES.map(game => game.key);

// Get all game names for display
export const GAME_NAMES = GAMES.map(game => game.name);

// Create options for Sanity schema
export const GAME_OPTIONS = GAMES.map(game => ({
  title: game.name,
  value: game.key
}));

// Game mapping for backward compatibility
export const GAME_MAPPING = GAMES.reduce((acc, game) => {
  acc[game.key] = {
    displayName: game.name,
    time: game.time
  };
  return acc;
}, {});