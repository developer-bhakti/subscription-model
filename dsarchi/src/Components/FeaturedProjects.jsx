import React from 'react'

const FeaturedProjects = () => {
  return (
     <section id="work" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-xs uppercase tracking-widest text-neutral-600 mb-4">
              Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-neutral-900 mb-6">
              Featured <span className="font-medium">Projects</span>
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of residential, commercial, 
              and public spaces that define our design philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Riverfront Residence", location: "Pune, India", category: "Residential" },
              { title: "Tech Campus Hub", location: "Bangalore, India", category: "Commercial" },
              { title: "Heritage Restoration", location: "Mumbai, India", category: "Cultural" },
            ].map((project, item) => (
              <div
                key={item}
                className="group cursor-pointer"
              >
                <div className="relative h-80 bg-neutral-200 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={`/api/placeholder/600/800`} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-medium mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-200 flex items-center gap-1">
                      <span>📍</span> {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="group border-2 border-neutral-900 px-10 py-4 rounded-full text-sm font-medium hover:bg-neutral-900 hover:text-white transition-all">
              View All Projects
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>
  )
}

export default FeaturedProjects