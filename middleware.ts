import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Role-based access control
    if (path.startsWith('/ims/admin/') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path.startsWith('/ims/manager/') && token?.role !== 'MANAGER' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (path.startsWith('/ims/staff/') && !['ADMIN', 'MANAGER', 'STAFF'].includes(token?.role as string)) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all /ims routes
        if (req.nextUrl.pathname.startsWith('/ims')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/ims/:path*'],
}
