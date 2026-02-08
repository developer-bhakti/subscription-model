import React from "react";

const AboutPreview = () => {
  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-neutral-100 rounded-full text-xs uppercase tracking-widest text-neutral-600">
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
            Thoughtful Architecture.
            <br />
            <span className="font-medium">Timeless Design.</span>
          </h2>
          <div className="w-20 h-1 bg-neutral-900"></div>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Archform Studio is a contemporary architecture practice focused on
            creating meaningful spaces. Our work blends aesthetics,
            sustainability, and functionality to shape environments that last
            beyond trends.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Every project begins with listening—to our clients, to the site, and
            to the community. We believe that great architecture emerges from
            understanding context and purpose.
          </p>
          <button className="group mt-6 border-2 border-neutral-900 px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-900 hover:text-white transition-all">
            Learn More About Us
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] bg-neutral-200 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/api/placeholder/800/1000"
              alt="Architecture Studio"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-neutral-900 rounded-3xl -z-10"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-400 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
