// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Delhi Tyre Shoppe | Quality Tyres & Expert Service',
  description: 'Learn about Delhi Tyre Shoppe - your trusted tyre retailer in Delhi. We deliver quality tyres and reliable service with experienced technicians and genuine branded products.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            About <span className="text-primary-red">Us</span>
          </h1>
        </div>
      </div>
    
    </div>
  )
}

