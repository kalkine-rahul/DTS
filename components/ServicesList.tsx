'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiSettings, FiRotateCw, FiTool, FiWind, FiGrid, FiArrowRight } from 'react-icons/fi'

const services = [
  {
    icon: FiSettings,
    title: 'Wheel Alignment',
    description: 'Precise wheel alignment ensures optimal handling, improved fuel efficiency, and extended tyre life. Our advanced equipment provides accurate adjustments.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
  },
  {
    icon: FiRotateCw,
    title: 'Wheel Balancing',
    description: 'Proper wheel balancing eliminates vibrations and ensures smooth driving. We balance all four wheels for maximum comfort and safety.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    icon: FiTool,
    title: 'Puncture Repair',
    description: 'Quick and reliable puncture repair service. We use high-quality patches and plugs to restore your tyre to full functionality.',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80',
  },
  {
    icon: FiWind,
    title: 'Nitrogen Filling',
    description: 'Nitrogen filling reduces tyre pressure loss, improves fuel economy, and extends tyre life. Better than regular air for optimal performance.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  },
  {
    icon: FiGrid,
    title: 'Tyre Rotation',
    description: 'Regular tyre rotation ensures even wear across all tyres, extending their lifespan and maintaining optimal vehicle performance.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
]

export default function ServicesList() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-primary-red group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-primary-red p-3 rounded-full">
                    <service.icon className="text-white text-2xl" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white font-display">{service.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href="/contact?service=book"
                  className="inline-flex items-center text-primary-red font-semibold hover:text-red-700 transition-colors group/link"
                >
                  <span>Book Now</span>
                  <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

