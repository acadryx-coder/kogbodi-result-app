import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req: any) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
