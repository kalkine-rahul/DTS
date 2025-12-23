'use client'

import { useState } from 'react'
import { FiMapPin } from 'react-icons/fi'

const locations = [
  {
    name: 'Sahu Chowk Branch',
    address: 'Sahu Chowk, Dumra Rd, opposite Navjeevan Hospital, Chak Rajopatti, Sitamarhi, Bihar 843302',
    mapUrl: 'https://www.google.com/maps/search/delhi+tyre+shoppe+sitamarhi/@26.5818304,85.5071185,7605m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    name: 'Kata Chowk Branch',
    address: 'Kata Chowk, NH-77, Bhoop Bhairo, Sitamarhi, Bihar 843302',
    mapUrl: 'https://www.google.com/maps/search/Kata+Chowk+NH-77+Bhoop+Bhairo+Sitamarhi+Bihar/@26.5818304,85.5071185,15z/data=!3m1!4b1?entry=ttu',
  },
]

export default function MapEmbed() {
  const [selectedLocation, setSelectedLocation] = useState(0)

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-black mb-6 font-display">Find Us</h2>
      
      {/* Location Selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {locations.map((location, index) => (
          <button
            key={index}
            onClick={() => setSelectedLocation(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedLocation === index
                ? 'bg-primary-red text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {location.name}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-gray-200 mb-4">
        <iframe
          src={locations[selectedLocation].mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={locations[selectedLocation].name}
        ></iframe>
      </div>

      {/* Address */}
      <div className="mt-6">
        <div className="flex items-start space-x-2 mb-2">
          <FiMapPin className="text-primary-red mt-1 flex-shrink-0" />
          <p className="text-gray-600 text-sm">{locations[selectedLocation].address}</p>
        </div>
        <p className="text-gray-600 text-sm mt-2">
          Visit us during business hours: Monday - Sunday, 9:00 AM - 8:00 PM
        </p>
      </div>
    </div>
  )
}

