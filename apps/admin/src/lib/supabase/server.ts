import { createClient as createBaseClient } from '@repo/database/server';
import { adminEnv } from '@repo/env/admin';

export async function createClient() {
  return createBaseClient(
    adminEnv.NEXT_PUBLIC_SUPABASE_URL,
    adminEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
