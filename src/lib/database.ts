
// A simple local storage based "database" service
// This is a frontend-only solution. For a real app, use Supabase or another backend service.

export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string; // In a real app, NEVER store plain text passwords
  isVerified: boolean;
  kycStatus: 'unverified' | 'pending' | 'verified';
  tetherBalance: number;
  rialBalance: number;
  createdAt: string;
}

export interface KycData {
  userId: string;
  fullName: string;
  nationalId: string;
  phoneNumber: string;
  address: string;
  idImageUrl: string | null;
  selfieImageUrl: string | null;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
}

const USERS_KEY = 'crypto_exchange_users';
const CURRENT_USER_KEY = 'crypto_exchange_current_user';
const KYC_DATA_KEY = 'crypto_exchange_kyc_data';

// User functions
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const createUser = (email: string, password: string, name: string | null = null): User => {
  const users = getUsers();
  
  // Check if user already exists
  if (users.some(user => user.email === email)) {
    throw new Error('کاربری با این ایمیل قبلاً ثبت نام کرده است');
  }
  
  const newUser: User = {
    id: `user_${Date.now()}`,
    name,
    email,
    password, // In a real app, this should be hashed
    isVerified: false,
    kycStatus: 'unverified',
    tetherBalance: 0,
    rialBalance: 0,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const loginUser = (email: string, password: string): User => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('ایمیل یا رمز عبور اشتباه است');
  }
  
  setCurrentUser(user);
  return user;
};

export const logoutUser = () => {
  setCurrentUser(null);
};

export const updateUser = (userData: Partial<User> & { id: string }): User => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userData.id);
  
  if (index === -1) {
    throw new Error('کاربر یافت نشد');
  }
  
  const updatedUser = { ...users[index], ...userData };
  users[index] = updatedUser;
  saveUsers(users);
  
  // If this is the current user, update the current user as well
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userData.id) {
    setCurrentUser(updatedUser);
  }
  
  return updatedUser;
};

// KYC data functions
export const getKycData = (userId: string): KycData | null => {
  const kycDataList = getKycDataList();
  return kycDataList.find(data => data.userId === userId) || null;
};

export const getKycDataList = (): KycData[] => {
  const kycDataJson = localStorage.getItem(KYC_DATA_KEY);
  return kycDataJson ? JSON.parse(kycDataJson) : [];
};

export const saveKycDataList = (kycDataList: KycData[]) => {
  localStorage.setItem(KYC_DATA_KEY, JSON.stringify(kycDataList));
};

export const submitKycData = (kycData: Omit<KycData, 'submittedAt' | 'status'>): KycData => {
  const kycDataList = getKycDataList();
  
  // Check if KYC data already exists for this user
  const existingIndex = kycDataList.findIndex(data => data.userId === kycData.userId);
  
  const newKycData: KycData = {
    ...kycData,
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  
  if (existingIndex >= 0) {
    // Update existing KYC data
    kycDataList[existingIndex] = newKycData;
  } else {
    // Add new KYC data
    kycDataList.push(newKycData);
  }
  
  saveKycDataList(kycDataList);
  
  // Also update the user's kycStatus
  const user = getCurrentUser();
  if (user) {
    updateUser({
      ...user,
      kycStatus: 'pending'
    });
  }
  
  return newKycData;
};
