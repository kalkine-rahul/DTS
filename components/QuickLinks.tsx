'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiPackage, FiSettings, FiArrowRight } from 'react-icons/fi'

const quickLinks = [
  {
    icon: FiPackage,
    title: 'Products',
    description: 'Browse our wide range of tyres for all vehicle types',
    href: '/products',
    color: 'bg-primary-red',
  },
  {
    icon: FiSettings,
    title: 'Services',
    description: 'Professional tyre services and maintenance',
    href: '/services',
    color: 'bg-black',
  },
]

export default function QuickLinks() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-display">
            Quick <span className="text-primary-red">Links</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={link.href}
                className="block bg-white p-8 rounded-xl hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-primary-red"
              >
                <div className={`${link.color} w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <link.icon className="text-white text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3 font-display group-hover:text-primary-red transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {link.description}
                </p>
                <div className="flex items-center text-primary-red font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Explore</span>
                  <FiArrowRight className="ml-2" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

