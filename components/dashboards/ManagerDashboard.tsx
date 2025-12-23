'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from './DashboardLayout'
import { FiPackage, FiShoppingCart, FiFileText, FiAlertCircle } from 'react-icons/fi'

export default function ManagerDashboard() {
  const { data: session } = useSession()

  const stats = [
    { label: 'Total Products', value: '1,234', icon: FiPackage },
    { label: 'Low Stock Items', value: '23', icon: FiAlertCircle },
    { label: 'Pending Orders', value: '45', icon: FiShoppingCart },
    { label: 'Invoices', value: '156', icon: FiFileText },
  ]

  return (
    <DashboardLayout role="MANAGER" userName={session?.user?.name || 'Manager'}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-display mb-2">
            Manager Dashboard
          </h1>
          <p className="text-gray-400">Welcome back, {session?.user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-red p-3 rounded-lg">
                  <stat.icon className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Inventory Overview</h2>
          <p className="text-gray-400">Manage your inventory and track stock levels.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

