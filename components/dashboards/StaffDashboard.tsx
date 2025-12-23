'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from './DashboardLayout'
import { FiPackage, FiShoppingCart } from 'react-icons/fi'

export default function StaffDashboard() {
  const { data: session } = useSession()

  return (
    <DashboardLayout role="STAFF" userName={session?.user?.name || 'Staff'}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-display mb-2">
            Staff Dashboard
          </h1>
          <p className="text-gray-400">Welcome back, {session?.user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-primary-red p-3 rounded-lg">
                <FiPackage className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Total Products</h3>
                <p className="text-2xl font-bold text-white">1,234</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-primary-red p-3 rounded-lg">
                <FiShoppingCart className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm">Pending Orders</h3>
                <p className="text-2xl font-bold text-white">45</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Your Tasks</h2>
          <p className="text-gray-400">View and manage your assigned tasks.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

