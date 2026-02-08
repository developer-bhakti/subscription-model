import React from 'react'

const StatsBar = () => {
  return (
     <section className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "200+", label: "Projects Completed" },
              { number: "15", label: "Years Experience" },
              { number: "50+", label: "Awards Won" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-5xl font-light">{stat.number}</div>
                <div className="text-sm text-neutral-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default StatsBar