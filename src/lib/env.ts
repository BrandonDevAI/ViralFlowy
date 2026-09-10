/**
 * Environment variables helper for ViralFlowy.
 * Supports Next.js (NEXT_PUBLIC_*) with backwards compatibility for Vite (VITE_*).
 */

export const env = {
  SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    '',
  SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    '',
  OPENAI_API_KEY:
    process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
    process.env.VITE_OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    '',
  PAYPAL_CLIENT_ID:
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    process.env.VITE_PAYPAL_CLIENT_ID ||
    'test',
};
