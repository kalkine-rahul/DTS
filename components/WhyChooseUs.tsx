'use client'

import { motion } from 'framer-motion'
import { FiUsers, FiShield, FiAward } from 'react-icons/fi'

const reasons = [
  {
    icon: FiUsers,
    title: 'Experienced Technicians',
    description: 'Our team consists of skilled and certified technicians with years of experience in tyre installation, balancing, and alignment. They ensure every job is done right the first time.',
  },
  {
    icon: FiShield,
    title: 'Genuine Branded Products',
    description: 'We stock only authentic tyres from authorized dealers. Every product comes with manufacturer warranty and certification, giving you peace of mind.',
  },
  {
    icon: FiAward,
    title: 'Warranty & Service Support',
    description: 'All our products and services come with comprehensive warranty coverage. We provide ongoing support and maintenance to keep your tyres in perfect condition.',
  },
]

export default function WhyChooseUs() {
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
            Why Choose <span className="text-primary-red">Us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-primary-red"
            >
              <div className="bg-primary-red/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <reason.icon className="text-primary-red text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3 font-display">
                {reason.title}
              </h3>
              <p className="text-gray-600">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

