import { createBrowserClient } from '@supabase/ssr'

/**
 * Client Supabase côté navigateur (Client Components). Utilise toujours la
 * clé publique anon — jamais SUPABASE_SERVICE_ROLE_KEY ici.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
