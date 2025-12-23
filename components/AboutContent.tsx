'use client'

import { motion } from 'framer-motion'

export default function AboutContent() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="text-3xl font-bold text-black mb-6 font-display">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Delhi Tyre Shoppe has been serving the Sitamarhi community for years, establishing itself as a trusted name in the tyre retail industry. We started with a simple mission: to provide quality tyres and reliable service to every customer who walks through our doors.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Over the years, we have built strong relationships with leading tyre manufacturers and suppliers, ensuring that we always have access to genuine, high-quality products. Our commitment to excellence has made us the go-to destination for tyre needs in Sitamarhi. We now operate from two convenient locations to better serve our customers.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl mt-6 border-l-4 border-primary-red">
            <h3 className="font-bold text-black mb-3">Our Locations:</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Sahu Chowk Branch:</strong> Sahu Chowk, Dumra Rd, opposite Navjeevan Hospital, Chak Rajopatti, Sitamarhi, Bihar 843302</li>
              <li>• <strong>Kata Chowk Branch:</strong> Kata Chowk, NH-77, Bhoop Bhairo, Sitamarhi, Bihar 843302</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-black mb-6 mt-12 font-display">Our Mission</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <strong className="text-primary-red">Delivering Quality Tyres & Reliable Service</strong>
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We are committed to providing our customers with the best tyres from trusted brands, combined with expert installation and maintenance services. Our goal is to ensure your safety on the road while offering competitive prices and exceptional customer service.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

