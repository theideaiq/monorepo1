import { createClient } from '@supabase/supabase-js';
import type { Database } from './types_db';

export function createServiceRoleClient(
  supabaseUrl: string,
  supabaseServiceRoleKey: string,
) {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}
