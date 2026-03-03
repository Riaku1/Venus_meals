// File Name: lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-client';

/**
 * Standard Supabase client initialization.
 * Environment variables must be defined in your .env.local file.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Ensure .env.local is configured.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
