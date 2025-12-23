'use client'

import { motion } from 'framer-motion'
import { FiTruck, FiPackage } from 'react-icons/fi'
import { TbCar, TbBike } from 'react-icons/tb'

const categories = [
  {
    icon: TbCar,
    title: 'Car Tyres',
    description: 'Premium tyres for sedans, hatchbacks, and luxury cars',
    priceRange: '₹3,000 - ₹15,000',
    features: ['All-season performance', 'Long-lasting tread', 'Fuel efficient', 'Quiet ride'],
    sizes: '13" - 18"',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  },
  {
    icon: TbBike,
    title: 'Bike Tyres',
    description: 'High-performance tyres for motorcycles and scooters',
    priceRange: '₹1,500 - ₹8,000',
    features: ['Excellent grip', 'Wet weather performance', 'Durable construction', 'Smooth handling'],
    sizes: '17" - 19"',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80',
  },
  {
    icon: FiTruck,
    title: 'SUV Tyres',
    description: 'Robust tyres designed for SUVs and off-road vehicles',
    priceRange: '₹5,000 - ₹25,000',
    features: ['Off-road capability', 'Heavy-duty construction', 'All-terrain grip', 'Enhanced safety'],
    sizes: '15" - 22"',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    icon: FiPackage,
    title: 'Commercial Tyres',
    description: 'Heavy-duty tyres for trucks, buses, and commercial vehicles',
    priceRange: '₹8,000 - ₹40,000',
    features: ['Maximum load capacity', 'Long mileage', 'Reinforced sidewalls', 'Commercial grade'],
    sizes: '16" - 24"',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
]

export default function ProductCategories() {
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
            Tyre <span className="text-primary-red">Categories</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-primary-red"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-primary-red/90 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <category.icon className="text-white text-2xl" />
                      <h3 className="text-2xl font-bold text-white font-display">{category.title}</h3>
                    </div>
                    <p className="text-white/90 text-sm">{category.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-primary-red font-bold text-lg mb-2">Price Range: {category.priceRange}</p>
                  <p className="text-gray-600 text-sm">Available Sizes: {category.sizes}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-black mb-2">Key Features:</p>
                  <ul className="space-y-1">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-primary-red mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

