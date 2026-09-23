import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'srcaa_supabase_url';
const STORAGE_KEY_KEY = 'srcaa_supabase_anon_key';

let cachedClient: SupabaseClient | null = null;

export function getSavedSupabaseConfig(): { url: string; anonKey: string } {
  if (typeof window === 'undefined') return { url: '', anonKey: '' };
  const url = localStorage.getItem(STORAGE_KEY_URL) || '';
  const anonKey = localStorage.getItem(STORAGE_KEY_KEY) || '';
  return { url, anonKey };
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_URL, url.trim());
  localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
  cachedClient = null;
}

export function clearSupabaseConfig(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_URL);
  localStorage.removeItem(STORAGE_KEY_KEY);
  cachedClient = null;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  const { url, anonKey } = getSavedSupabaseConfig();
  if (!url || !anonKey) return null;

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!url.startsWith('https://')) {
      return { success: false, message: 'Supabase URL must start with https://' };
    }
    const client = createClient(url, anonKey);
    // Ping auth health or table check
    const { error } = await client.auth.getSession();
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Successfully connected to Supabase cluster!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Connection failed' };
  }
}
