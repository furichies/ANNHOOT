import { User } from '@/types';
import { getUsers, saveUsers, getCurrentUser, saveCurrentUser } from './storage';
import { v4 as uuidv4 } from 'uuid';

// Get allowed email domains from localStorage
export function getAllowedDomains(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('anahoot_allowed_domains');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Check if email domain is allowed (returns true if no restrictions set)
export function isEmailDomainAllowed(email: string): boolean {
  const domains = getAllowedDomains();
  if (domains.length === 0) return true; // no restriction
  const lower = email.toLowerCase();
  return domains.some(domain => lower.endsWith(domain.toLowerCase()));
}

// Register a new user
export function registerUser(
  username: string,
  email: string,
  password: string,
  avatar: string
): { success: boolean; user?: User; error?: string } {
  const users = getUsers<User>();

  // Check email domain restriction
  if (!isEmailDomainAllowed(email)) {
    const domains = getAllowedDomains();
    return { success: false, error: `Solo pueden registrarse usuarios con correo de los dominios permitidos: ${domains.join(', ')}` };
  }

  // Check if username already exists
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, error: 'El nombre de usuario ya existe' };
  }
  
  // Check if email already exists
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'El correo electrónico ya está registrado' };
  }
  
  // Create new user
  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    password, // In production, this should be hashed
    avatar,
    createdAt: new Date().toISOString(),
    bestScore: 0,
    gamesPlayed: 0,
  };
  
  users.push(newUser);
  saveUsers(users);
  saveCurrentUser(newUser);
  
  return { success: true, user: newUser };
}

// Login user
export function loginUser(
  usernameOrEmail: string,
  password: string
): { success: boolean; user?: User; error?: string } {
  const users = getUsers<User>();
  
  const user = users.find(
    u => (u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
          u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
         u.password === password
  );
  
  if (!user) {
    return { success: false, error: 'Credenciales incorrectas' };
  }
  
  saveCurrentUser(user);
  return { success: true, user };
}

// Logout user
export function logoutUser(): void {
  saveCurrentUser(null);
}

// Get current logged in user
export function getLoggedInUser(): User | null {
  return getCurrentUser<User>();
}

// Update user profile
export function updateUserProfile(
  userId: string,
  updates: Partial<Pick<User, 'username' | 'avatar'>>
): { success: boolean; user?: User; error?: string } {
  const users = getUsers<User>();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, error: 'Usuario no encontrado' };
  }
  
  // Check if new username is taken by another user
  if (updates.username && updates.username !== users[userIndex].username) {
    if (users.some(u => u.username.toLowerCase() === updates.username!.toLowerCase() && u.id !== userId)) {
      return { success: false, error: 'El nombre de usuario ya existe' };
    }
  }
  
  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  saveUsers(users);
  saveCurrentUser(updatedUser);
  
  return { success: true, user: updatedUser };
}

// Update user stats after game
export function updateUserStats(
  userId: string,
  score: number
): void {
  const users = getUsers<User>();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    users[userIndex].gamesPlayed += 1;
    if (score > users[userIndex].bestScore) {
      users[userIndex].bestScore = score;
    }
    saveUsers(users);
    saveCurrentUser(users[userIndex]);
  }
}
