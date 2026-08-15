import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Client Supabase côté serveur (Server Components, Route Handlers, Server
 * Actions). Sessions en cookies via @supabase/ssr — jamais de token dans le
 * localStorage. Voir docs/ARCHITECTURE.md.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Appelé depuis un Server Component : le middleware rafraîchit
            // déjà la session, cet appel peut être ignoré sans risque.
          }
        },
      },
    }
  )
}
