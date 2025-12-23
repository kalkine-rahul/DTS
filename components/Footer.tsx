import Link from 'next/link'
import { FiTruck, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiTruck className="text-primary-red text-2xl" />
              <span className="text-xl font-bold font-display">
                Delhi Tyre <span className="text-primary-red">Shoppe</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for quality tyres and expert service. Serving genuine products and best prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-red transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-red transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-red transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary-red transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Wheel Alignment</li>
              <li>Wheel Balancing</li>
              <li>Puncture Repair</li>
              <li>Nitrogen Filling</li>
              <li>Tyre Rotation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <FiMapPin className="text-primary-red mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p className="font-semibold text-white mb-1">Sahu Chowk Branch:</p>
                  <p>Sahu Chowk, Dumra Rd, opposite Navjeevan Hospital, Chak Rajopatti, Sitamarhi, Bihar 843302</p>
                  <p className="font-semibold text-white mt-2 mb-1">Kata Chowk Branch:</p>
                  <p>Kata Chowk, NH-77, Bhoop Bhairo, Sitamarhi, Bihar 843302</p>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="text-primary-red flex-shrink-0" />
                <a href="tel:+9195764769777" className="text-gray-400 hover:text-primary-red transition-colors">
                  +91 95764769777
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp className="text-primary-red flex-shrink-0" />
                <a href="https://wa.me/9195764769777" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-red transition-colors">
                  +91 95764769777
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="text-primary-red flex-shrink-0" />
                <a href="mailto:info@delhityreshoppe.com" className="text-gray-400 hover:text-primary-red transition-colors">
                  info@delhityreshoppe.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Delhi Tyre Shoppe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

