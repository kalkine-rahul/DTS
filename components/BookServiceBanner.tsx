'use client'

import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function BookServiceBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-red to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Book a service today and experience the best tyre care in Delhi
        </p>
        <Link
          href="/contact?service=book"
          className="inline-flex items-center space-x-2 bg-white text-primary-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span>Book a Service Now</span>
          <FiArrowRight />
        </Link>
      </div>
    </section>
  )
}

