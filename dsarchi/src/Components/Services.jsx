import React from 'react'

const Services = () => {
  return (
     <section id="services" className="bg-gradient-to-b from-neutral-50 to-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-xs uppercase tracking-widest text-neutral-600 mb-4">
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-neutral-900">
              Our <span className="font-medium">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Architectural Design", 
                icon: "🏛️",
                desc: "Creating innovative structures that blend form, function, and beauty in perfect harmony."
              },
              { 
                title: "Interior Design", 
                icon: "🪑",
                desc: "Crafting interiors that reflect your personality while maximizing comfort and utility."
              },
              { 
                title: "Urban Planning", 
                icon: "🌆",
                desc: "Designing sustainable communities that enhance quality of life for generations."
              },
              { 
                title: "Landscape Design", 
                icon: "🌿",
                desc: "Integrating nature with architecture to create harmonious outdoor spaces."
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-neutral-100"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-medium text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-6 text-neutral-900 font-medium text-sm group-hover:translate-x-2 transition-transform inline-block">
                  Learn More →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Services