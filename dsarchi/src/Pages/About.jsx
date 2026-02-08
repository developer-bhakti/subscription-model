import React from "react";

const About = () => {
  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-neutral-900 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide">
          About Our Studio
        </h1>
        <p className="mt-4 text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
          We design spaces that speak quietly, live beautifully, and stand the
          test of time.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <h2 className="text-2xl font-medium text-neutral-900">Who We Are</h2>
          <p className="mt-6 text-neutral-600 leading-relaxed">
            Archform Studio is a contemporary architecture practice focused on
            creating meaningful spaces through thoughtful design. Our approach
            blends functionality, sustainability, and aesthetics to deliver
            architecture that feels timeless.
          </p>

          <p className="mt-4 text-neutral-600 leading-relaxed">
            We believe architecture is more than structures — it’s about how
            people experience space. Every project begins with understanding
            context, lifestyle, and purpose.
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="h-96 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-500 text-sm">
          Studio / Project Image
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-medium text-neutral-900 text-center">
            Our Design Philosophy
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900">
                Minimal & Meaningful
              </h3>
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                We embrace simplicity and clarity, ensuring every element has
                purpose and intention.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900">
                Context Driven
              </h3>
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                Our designs respond to climate, culture, and surroundings,
                creating spaces that belong.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900">
                Sustainable Thinking
              </h3>
              <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                Sustainability is integral to our process — from material
                selection to energy efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-4xl font-light text-neutral-900">50+</h3>
            <p className="mt-2 text-sm text-neutral-600">Projects Completed</p>
          </div>

          <div>
            <h3 className="text-4xl font-light text-neutral-900">10+</h3>
            <p className="mt-2 text-sm text-neutral-600">Years of Experience</p>
          </div>

          <div>
            <h3 className="text-4xl font-light text-neutral-900">20+</h3>
            <p className="mt-2 text-sm text-neutral-600">Happy Clients</p>
          </div>

          <div>
            <h3 className="text-4xl font-light text-neutral-900">5</h3>
            <p className="mt-2 text-sm text-neutral-600">Design Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
