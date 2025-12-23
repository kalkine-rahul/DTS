import { cookies } from 'next/headers'
import { verifyToken } from './auth'
import { prisma } from './prisma'

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const payload = verifyToken(token)

    if (!payload) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    return user
  } catch {
    return null
  }
}

export function getRedirectPath(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/ims/admin/dashboard'
    case 'MANAGER':
      return '/ims/manager/dashboard'
    case 'STAFF':
      return '/ims/staff/dashboard'
    default:
      return '/ims/staff/dashboard'
  }
}

