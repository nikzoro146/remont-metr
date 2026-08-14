export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // В демо-проекте храним как есть, в проде нужен хеш
  role: 'user' | 'admin';
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getUsers: () => User[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  message?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'done';
}

export interface ServicePrice {
  id: string;
  type: 'cosmetic' | 'capital' | 'design';
  name: string;
  pricePerSqm: number;
  description: string;
}
