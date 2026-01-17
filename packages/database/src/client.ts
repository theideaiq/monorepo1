import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types_db';

export function createClient(supabaseUrl: string, supabaseKey: string) {
  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
