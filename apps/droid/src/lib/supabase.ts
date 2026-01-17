import { createClient } from '@supabase/supabase-js';
import { droidEnv as env } from '@repo/env/droid';

// We use the service role key to bypass RLS for the bot's operations
export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);
