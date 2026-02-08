import React from 'react'

const Cta = () => {
  return (
   <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/api/placeholder/1920/800" 
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Let's Build Something<br />
            <span className="font-medium">Meaningful Together</span>
          </h2>
          <p className="text-lg text-neutral-200 mb-10 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you and discuss 
            how we can bring your vision to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="group bg-white text-neutral-900 px-10 py-4 rounded-full text-sm font-medium hover:bg-neutral-100 transition-all shadow-lg hover:scale-105">
              Start Your Project
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="border-2 border-white px-10 py-4 rounded-full text-sm font-medium hover:bg-white hover:text-neutral-900 transition-all">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
  )
}

export default Cta