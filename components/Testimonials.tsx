'use client'

import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    vehicle: 'Honda City',
    rating: 5,
    comment: 'Excellent service! Got my car tyres replaced quickly. The staff was professional and prices were competitive.',
  },
  {
    name: 'Priya Sharma',
    vehicle: 'Maruti Swift',
    rating: 5,
    comment: 'Best tyre shop in Delhi. Genuine products and expert installation. Highly recommended!',
  },
  {
    name: 'Amit Singh',
    vehicle: 'Toyota Fortuner',
    rating: 5,
    comment: 'Great experience! They have all major brands and the service quality is top-notch.',
  },
  {
    name: 'Sneha Patel',
    vehicle: 'Bajaj Pulsar',
    rating: 5,
    comment: 'Affordable prices and quick service. My bike tyres are working perfectly. Thank you!',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            What Our <span className="text-primary-red">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trusted by thousands of satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl border-2 border-gray-800 hover:border-primary-red transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-primary-red fill-primary-red" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "{testimonial.comment}"
              </p>
              <div className="border-t border-gray-800 pt-4">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.vehicle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

