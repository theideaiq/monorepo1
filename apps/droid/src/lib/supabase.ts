import type { Database } from '@repo/database/types';
import { droidEnv as env } from '@repo/env/droid';
import { createClient } from '@supabase/supabase-js';

// We use the service role key to bypass RLS for the bot's operations
export const supabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
