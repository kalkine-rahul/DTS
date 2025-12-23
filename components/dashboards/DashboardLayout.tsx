'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiPackage, FiShoppingCart, FiFileText, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { UserRole } from '@/lib/types'

interface DashboardLayoutProps {
  children: React.ReactNode
  role: UserRole
  userName: string
}

export default function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { href: `/ims/${role.toLowerCase()}/dashboard`, label: 'Dashboard', icon: FiHome },
    { href: `/ims/${role.toLowerCase()}/products`, label: 'Products', icon: FiPackage },
    { href: `/ims/${role.toLowerCase()}/orders`, label: 'Orders', icon: FiShoppingCart },
    { href: `/ims/${role.toLowerCase()}/invoices`, label: 'Invoices', icon: FiFileText },
    { href: `/ims/${role.toLowerCase()}/settings`, label: 'Settings', icon: FiSettings },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navbar */}
      <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white p-2"
              >
                {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <h1 className="text-xl font-bold font-display">
                Delhi Tyre <span className="text-primary-red">IMS</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Welcome, {userName}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 text-gray-400 hover:text-primary-red transition-colors"
              >
                <FiLogOut />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-gray-900 border-r border-gray-800 w-64 fixed lg:static inset-y-0 top-16 z-30 transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-red text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

