import { createClient as createBaseClient } from '@repo/database/client';
import { adminEnv } from '@repo/env/admin';

export function createClient() {
  return createBaseClient(
    adminEnv.NEXT_PUBLIC_SUPABASE_URL,
    adminEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
