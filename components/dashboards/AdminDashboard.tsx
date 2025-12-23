'use client'

import { useSession } from 'next-auth/react'
import DashboardLayout from './DashboardLayout'
import { FiPackage, FiShoppingCart, FiFileText, FiAlertCircle, FiTrendingUp } from 'react-icons/fi'
import { UserRole } from '../../types/user,'


export interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: UserRole; // <-- Add this line
}

export default function AdminDashboard() {
  const { data: session } = useSession()

  const stats = [
    { label: 'Total Products', value: '1,234', icon: FiPackage, color: 'bg-blue-500' },
    { label: 'Low Stock Items', value: '23', icon: FiAlertCircle, color: 'bg-red-500' },
    { label: 'Pending Orders', value: '45', icon: FiShoppingCart, color: 'bg-yellow-500' },
    { label: 'Total Revenue', value: '₹12.5L', icon: FiTrendingUp, color: 'bg-green-500' },
  ]
  

  return (
   <DashboardLayout  userName="Admin"
  userRole={session?.user?.role ?? UserRole.ADMIN}
>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-display mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Welcome back, {session?.user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-primary-red transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-primary-red text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-left">
                Add New Product
              </button>
              <button className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-left">
                Create Purchase Order
              </button>
              <button className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-left">
                Generate Invoice
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">New order received</span>
                <span className="text-gray-500 text-xs">2 min ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Stock updated</span>
                <span className="text-gray-500 text-xs">15 min ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm">Invoice generated</span>
                <span className="text-gray-500 text-xs">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

