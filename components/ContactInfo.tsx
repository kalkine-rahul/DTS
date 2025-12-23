'use client'

import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const locations = [
  {
    name: 'Sahu Chowk Branch',
    address: 'Sahu Chowk, Dumra Rd, opposite Navjeevan Hospital, Chak Rajopatti, Sitamarhi, Bihar 843302',
  },
  {
    name: 'Kata Chowk Branch',
    address: 'Kata Chowk, NH-77, Bhoop Bhairo, Sitamarhi, Bihar 843302',
  },
]

const contactMethods = [
  {
    icon: FiPhone,
    title: 'Phone',
    info: '+91 9576476977',
    link: 'tel:+9195764769777',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    info: '+91 9576476977',
    link: 'https://wa.me/9195764769777',
    isExternal: true,
  },
  {
    icon: FiMail,
    title: 'Email',
    info: 'info@delhityreshoppe.com',
    link: 'mailto:info@delhityreshoppe.com',
  },
]

export default function ContactInfo() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.link}
              target={method.isExternal ? '_blank' : undefined}
              rel={method.isExternal ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-xl hover:bg-primary-red hover:text-white transition-all duration-300 border-2 border-gray-200 hover:border-primary-red group"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary-red/10 rounded-full mb-4 group-hover:bg-white/20">
                <method.icon className="text-primary-red text-2xl group-hover:text-white" />
              </div>
              <h3 className="font-semibold text-black group-hover:text-white mb-2">{method.title}</h3>
              <p className="text-gray-600 group-hover:text-white/90 text-sm">{method.info}</p>
            </motion.a>
          ))}
        </div>

        {/* Locations */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-black mb-6 text-center font-display">Our Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200 hover:border-primary-red transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-red/10 p-3 rounded-lg flex-shrink-0">
                    <FiMapPin className="text-primary-red text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2 text-lg">{location.name}</h4>
                    <p className="text-gray-600 text-sm">{location.address}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

