import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/') && pathname !== '/admin/') {
    const token = request.cookies.get('admin_session')?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
