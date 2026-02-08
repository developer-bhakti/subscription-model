import React from 'react'

const Philosophy = () => {
  return (
   <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs uppercase tracking-widest mb-8">
            Our Philosophy
          </div>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            "Good design is <span className="font-medium italic">quiet yet powerful.</span><br />
            It respects context, enhances daily life,<br />
            and evolves naturally over time."
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            We believe architecture should serve people, not trends. Each project 
            is an opportunity to create something enduring—spaces that age gracefully 
            and continue to inspire long after completion.
          </p>
        </div>
      </section>
  )
}

export default Philosophy