import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Rafraîchit la session à chaque requête. Appelé depuis middleware.ts à la
 * racine. Sans ce rafraîchissement, les Server Components peuvent voir une
 * session expirée avant le client.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Ne pas retirer : recharge l'utilisateur et pose le cookie rafraîchi.
  await supabase.auth.getUser()

  return response
}

/**
 * returnTo doit être un chemin interne relatif, jamais une URL externe.
 * Protection open-redirect : voir docs/ARCHITECTURE.md.
 */
export function safeReturnTo(value: string | null): string {
  if (!value) return '/'
  if (!value.startsWith('/') || value.startsWith('//')) return '/'
  return value
}
