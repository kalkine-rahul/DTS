import { UserRole } from '@/lib/types'

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return '/ims/admin/dashboard'
    case UserRole.MANAGER:
      return '/ims/manager/dashboard'
    case UserRole.STAFF:
      return '/ims/staff/dashboard'
    default:
      return '/'
  }
}

