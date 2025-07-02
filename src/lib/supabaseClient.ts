import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPERBASEURL ??'sdasd'; // Replace with your URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPERBASE_ANON_KEY??'asdasd'; // Replace with your key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
