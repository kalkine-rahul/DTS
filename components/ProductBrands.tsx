'use client'

import { motion } from 'framer-motion'

const brands = [
 
  {
    name: 'Apollo',
    description: 'Innovative tyres with advanced technology',
    specialties: ['Car Tyres', 'Commercial Tyres', 'SUV Tyres'],
    logo: 'Apollo',
  },
  {
    name: 'Bridgestone',
    description: 'Global leader in tyre technology and innovation',
    specialties: ['Car Tyres', 'SUV Tyres', 'Commercial Tyres'],
    logo: 'Bridgestone',
  },
  {
    name: 'Michelin',
    description: 'Premium French brand known for performance and safety',
    specialties: ['Car Tyres', 'SUV Tyres', 'Premium Range'],
    logo: 'Michelin',
  },
  {
    name: 'Ceat',
    description: 'Trusted Indian brand with durable and reliable tyres',
    specialties: ['Car Tyres', 'Bike Tyres', 'Commercial Tyres'],
    logo: 'CEAT',
  },
  {
    name: 'Goodyear',
    description: 'American brand with cutting-edge tyre technology',
    specialties: ['Car Tyres', 'SUV Tyres', 'Performance Tyres'],
    logo: 'Goodyear',
  },
]

export default function ProductBrands() {
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
            Top <span className="text-primary-red">Brands</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We stock genuine products from world-renowned manufacturers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-primary-red"
            >
              <div className="bg-primary-red/10 h-24 flex items-center justify-center rounded-lg mb-4">
                <h3 className="text-2xl font-bold text-primary-red font-display">{brand.logo}</h3>
              </div>
              <h4 className="text-xl font-bold text-black mb-2 font-display">{brand.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-black mb-2">Available for:</p>
                <div className="flex flex-wrap gap-2">
                  {brand.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

