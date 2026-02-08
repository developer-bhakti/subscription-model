import React from 'react'

const Hero = () => {
  return (
      <section className="relative h-screen">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <div className="max-w-4xl space-y-6 animate-fadeIn">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs uppercase tracking-widest mb-4">
                Award-Winning Architecture
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight">
                Designing Spaces<br />
                <span className="font-medium">That Feel Like Home</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-200 max-w-2xl leading-relaxed">
                We create timeless architecture rooted in simplicity, functionality, 
                and human experience that transforms the way you live.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <button className="group bg-white text-neutral-900 px-10 py-4 rounded-full text-sm font-medium hover:bg-neutral-100 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  View Projects
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="border-2 border-white px-10 py-4 rounded-full text-sm font-medium hover:bg-white hover:text-neutral-900 transition-all">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>
  )
}

export default Hero