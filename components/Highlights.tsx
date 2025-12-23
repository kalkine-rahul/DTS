'use client'

import { motion } from 'framer-motion'
import { FiCheckCircle, FiTool, FiAward, FiDollarSign } from 'react-icons/fi'

const highlights = [
  {
    icon: FiCheckCircle,
    title: 'Quality Tyres',
    description: 'Premium tyres from trusted brands ensuring safety and durability',
  },
  {
    icon: FiTool,
    title: 'Expert Service',
    description: 'Experienced technicians providing professional installation and maintenance',
  },
  {
    icon: FiAward,
    title: 'Genuine Brands',
    description: 'Authentic products from Apollo, Bridgestone, Michelin, and more',
  },
  {
    icon: FiDollarSign,
    title: 'Best Prices',
    description: 'Competitive pricing with warranty and service support',
  },
]

export default function Highlights() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-display">
            Why Choose <span className="text-primary-red">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We deliver excellence in every tyre and service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-red"
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <highlight.icon className="text-primary-red text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3 font-display">
                {highlight.title}
              </h3>
              <p className="text-gray-600">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

