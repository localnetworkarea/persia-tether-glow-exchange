import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = 'https://noqfvtvbnvpasrlaqcon.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcWZ2dHZibnZwYXNybGFxY29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNzAyMTksImV4cCI6MjA2Mjc0NjIxOX0.Z21n4wdbdNq1Qdxqo7fvd2BKQVb6viorGqbHZPQ79pU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database tables
export interface User {
  id: string;
  name: string | null;
  email: string;
  password: string;
  is_verified: boolean;
  kyc_status: 'unverified' | 'pending' | 'verified' | 'rejected';
  tether_balance: number;
  rial_balance: number;
  created_at: string;
  updated_at: string;
}

export interface KycData {
  id: string;
  user_id: string;
  full_name: string;
  national_id: string;
  phone_number: string;
  address: string;
  id_image_url: string | null;
  selfie_image_url: string | null;
  status: 'pending' | 'verified' | 'rejected';
  submitted_at: string;
  verified_at: string | null;
  reject_reason: string | null;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'exchange';
  currency: 'tether' | 'rial';
  amount: number;
  fee: number;
  tx_hash: string | null;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface ExchangeRate {
  id: string;
  buy_price: number;
  sell_price: number;
  created_at: string;
  updated_at: string;
}

// Authentication functions
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user || null;
};

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
};

export const registerUser = async (email: string, password: string, fullName: string | null = null) => {
  const { data, error } = await supabase.auth.signUp({
    email, 
    password,
    options: {
      data: { fullName }
    }
  });
  
  if (error) throw error;

  // Create the user in our users table with default values
  if (data.user) {
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: email,
        password: 'hashed', // Note: Auth handles real password, this is just a placeholder
        name: fullName,
        is_verified: false,
        kyc_status: 'unverified',
        tether_balance: 0,
        rial_balance: 0
      });
    
    if (insertError) throw insertError;
  }

  return data.user;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data as User;
};

export const updateUserProfile = async (userId: string, userData: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data as User;
};

// KYC functions
export const getKycData = async (userId: string) => {
  const { data, error } = await supabase
    .from('kyc_data')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  
  if (error) throw error;
  return data as KycData | null;
};

export const submitKycData = async (kycData: Omit<KycData, 'id' | 'status' | 'submitted_at' | 'verified_at' | 'reject_reason'>) => {
  // First check if KYC data already exists for this user
  const { data: existingData, error: checkError } = await supabase
    .from('kyc_data')
    .select('*')
    .eq('user_id', kycData.user_id)
    .maybeSingle();
  
  if (checkError) throw checkError;
  
  if (existingData) {
    // Update existing KYC data
    const { data, error } = await supabase
      .from('kyc_data')
      .update({
        full_name: kycData.full_name,
        national_id: kycData.national_id,
        phone_number: kycData.phone_number,
        address: kycData.address,
        id_image_url: kycData.id_image_url,
        selfie_image_url: kycData.selfie_image_url,
        status: 'pending',
        submitted_at: new Date().toISOString()
      })
      .eq('user_id', kycData.user_id)
      .select()
      .single();
    
    if (error) throw error;
    return data as KycData;
  } else {
    // Insert new KYC data
    const { data, error } = await supabase
      .from('kyc_data')
      .insert({
        ...kycData,
        status: 'pending',
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Also update the user's kycStatus
    await supabase
      .from('users')
      .update({ kyc_status: 'pending' })
      .eq('id', kycData.user_id);
    
    return data as KycData;
  }
};

// Transaction functions
export const getUserTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Transaction[];
};

// Exchange rate functions
export const getCurrentExchangeRate = async () => {
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error) throw error;
  return data as ExchangeRate;
};
