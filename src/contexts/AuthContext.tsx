import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { User, Lead, ServicePrice } from '../types';

const USERS_KEY = 'metr_users';
const LEADS_KEY = 'metr_leads';
const PRICES_KEY = 'metr_prices';
const CURRENT_USER_KEY = 'metr_current_user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getUsers: () => User[];
  getLeads: () => Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  getServicePrices: () => ServicePrice[];
  updateServicePrice: (price: ServicePrice) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Демо-админ
const ADMIN_USER: User = {
  id: 'admin-1',
  name: 'Администратор МЕТР',
  email: 'admin@metr.ru',
  password: 'nik123',
  role: 'admin',
  createdAt: Date.now(),
};

const DEFAULT_PRICES: ServicePrice[] = [
  {
    id: 'cosmetic',
    type: 'cosmetic',
    name: 'Косметический',
    pricePerSqm: 5000,
    description: 'Обновление интерьера: покраска, обои, напольные покрытия',
  },
  {
    id: 'capital',
    type: 'capital',
    name: 'Капитальный',
    pricePerSqm: 12000,
    description: 'Полная замена коммуникаций, выравнивание стен, стяжка',
  },
  {
    id: 'design',
    type: 'design',
    name: 'Дизайнерский',
    pricePerSqm: 20000,
    description: 'Ремонт по дизайн-проекту с авторским надзором',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Инициализация при загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Добавляем админа в список пользователей если его нет
    const users = getUsers();
    const adminExists = users.find(u => u.email === ADMIN_USER.email);
    if (!adminExists) {
      saveUsers([...users, ADMIN_USER]);
    }
    // Инициализируем цены по умолчанию
    const prices = getServicePrices();
    if (prices.length === 0) {
      savePrices(DEFAULT_PRICES);
    }
    setIsInitialized(true);
  }, []);

  const getUsers = (): User[] => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const getLeads = (): Lead[] => {
    const stored = localStorage.getItem(LEADS_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveLeads = (leads: Lead[]) => {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const leads = getLeads();
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    saveLeads([...leads, newLead]);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    const leads = getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, status } : l);
    saveLeads(updated);
  };

  const getServicePrices = (): ServicePrice[] => {
    const stored = localStorage.getItem(PRICES_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PRICES;
  };

  const savePrices = (prices: ServicePrice[]) => {
    localStorage.setItem(PRICES_KEY, JSON.stringify(prices));
  };

  const updateServicePrice = (price: ServicePrice) => {
    const prices = getServicePrices();
    const updated = prices.map(p => p.id === price.id ? price : p);
    savePrices(updated);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Проверка демо-логина для админки
    if (email === 'LOn1n' && password === 'nik123') {
      const admin = { ...ADMIN_USER };
      delete admin.password;
      setUser(admin);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(admin));
      return { success: true };
    }

    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return { success: true };
    }

    return { success: false, error: 'Неверный email или пароль' };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Пользователь с таким email уже существует' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: 'user',
      createdAt: Date.now(),
    };

    saveUsers([...users, newUser]);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const isAdmin = user?.role === 'admin';

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isAdmin,
      login, 
      register, 
      logout, 
      getUsers,
      getLeads,
      addLead,
      updateLeadStatus,
      getServicePrices,
      updateServicePrice,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
