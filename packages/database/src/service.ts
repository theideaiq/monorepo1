import { createClient } from '@supabase/supabase-js';
import type { Database } from './types_db';

/**
 * Creates a Supabase client with the Service Role key.
 *
 * ⚠️ **SECURITY WARNING:**
 * This client bypasses Row Level Security (RLS). It has full access to the database.
 * Use this ONLY in secure server-side environments (e.g., API routes, Edge Functions, scripts).
 * NEVER expose this client or the Service Role key to the browser.
 *
 * @param supabaseUrl - The Supabase project URL.
 * @param supabaseServiceRoleKey - The Supabase Service Role Key (starts with `ey...`).
 * @returns A typed Supabase client instance with admin privileges.
 */
export function createServiceRoleClient(
  supabaseUrl: string,
  supabaseServiceRoleKey: string,
) {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
