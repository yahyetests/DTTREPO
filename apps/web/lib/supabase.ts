import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
 console.warn(
 '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables. ' +
 'Auth and database features will not work until these are configured.'
 );
}

export const supabase = createClient(
 supabaseUrl || 'https://placeholder.supabase.co',
 supabaseAnonKey || 'placeholder-key'
);

// NOTE: Once your Supabase project is live, run:
// npx supabase gen types typescript --project-id <your-project-id> > lib/database.types.ts
// Then update this file to: createClient<Database>(...)
