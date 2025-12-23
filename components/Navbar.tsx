'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { FiMenu, FiX, FiTruck, FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi'
import { useModalStore } from '@/store/modalStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { openLogin, openSignup } = useModalStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black shadow-lg' : 'bg-black/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <FiTruck className="text-primary-red text-3xl group-hover:scale-110 transition-transform" />
            <span className="text-white text-xl font-bold font-display">
              Delhi Tyre <span className="text-primary-red">Shoppe</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary-red'
                    : 'text-white hover:text-primary-red'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact?service=book"
              className="bg-primary-red text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Book Service
            </Link>
            
            {/* Auth Buttons */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-primary-red transition-colors"
                >
                  <FiUser />
                  <span className="text-sm">{session.user?.name || 'User'}</span>
                  <FiChevronDown className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link
                      href={session.user?.role === 'ADMIN' ? '/ims/admin/dashboard' : 
                            session.user?.role === 'MANAGER' ? '/ims/manager/dashboard' : 
                            '/ims/staff/dashboard'}
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <FiUser />
                      <span>My Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: '/' })
                        setUserMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={openLogin}
                  className="text-white hover:text-primary-red transition-colors text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={openSignup}
                  className="bg-primary-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-base font-medium ${
                  pathname === link.href
                    ? 'text-primary-red bg-gray-900'
                    : 'text-white hover:bg-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact?service=book"
              onClick={() => setIsOpen(false)}
              className="block bg-primary-red text-white px-4 py-2 rounded-lg font-semibold text-center mt-4"
            >
              Book Service
            </Link>
            {session ? (
              <>
                <Link
                  href={session.user?.role === 'ADMIN' ? '/ims/admin/dashboard' : 
                        session.user?.role === 'MANAGER' ? '/ims/manager/dashboard' : 
                        '/ims/staff/dashboard'}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg text-base font-medium text-white hover:bg-gray-900 mt-2"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' })
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-base font-medium text-white hover:bg-gray-900 mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    openLogin()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-base font-medium text-white hover:bg-gray-900 mt-2"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    openSignup()
                    setIsOpen(false)
                  }}
                  className="block bg-primary-red text-white px-4 py-2 rounded-lg font-semibold text-center mt-2"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

