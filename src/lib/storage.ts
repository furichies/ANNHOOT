// LocalStorage keys
const KEYS = {
  USERS: 'annahoot_users',
  CURRENT_USER: 'annahoot_current_user',
  GAME_RESULTS: 'annahoot_game_results',
  SOUND_ENABLED: 'annahoot_sound_enabled',
};

// Helper to safely parse JSON from localStorage
function safeJsonParse<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper to safely stringify and save to localStorage
function safeJsonStringify<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
}

// Users management
export function getUsers<T>(): T[] {
  return safeJsonParse<T[]>(KEYS.USERS, []);
}

export function saveUsers<T>(users: T[]): void {
  safeJsonStringify(KEYS.USERS, users);
}

// Current user management
export function getCurrentUser<T>(): T | null {
  return safeJsonParse<T | null>(KEYS.CURRENT_USER, null);
}

export function saveCurrentUser<T>(user: T | null): void {
  safeJsonStringify(KEYS.CURRENT_USER, user);
}

// Game results management
export function getGameResults<T>(): T[] {
  return safeJsonParse<T[]>(KEYS.GAME_RESULTS, []);
}

export function saveGameResults<T>(results: T[]): void {
  safeJsonStringify(KEYS.GAME_RESULTS, results);
}

export function addGameResult<T extends { id: string }>(result: T): void {
  const results = getGameResults<T>();
  results.push(result);
  saveGameResults(results);
}

// Sound settings
export function getSoundEnabled(): boolean {
  return safeJsonParse<boolean>(KEYS.SOUND_ENABLED, true);
}

export function saveSoundEnabled(enabled: boolean): void {
  safeJsonStringify(KEYS.SOUND_ENABLED, enabled);
}

// Clear all data (for testing/reset)
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}
