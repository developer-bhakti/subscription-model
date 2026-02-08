import React from "react";

const Testimonials = () => {
  return (
    <section className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 bg-neutral-200 rounded-full text-xs uppercase tracking-widest text-neutral-600 mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-neutral-900">
            What Our <span className="font-medium">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Priya Sharma",
              role: "Homeowner",
              text: "Archform transformed our vision into reality. The attention to detail and understanding of our needs was exceptional.",
            },
            {
              name: "Rajesh Kumar",
              role: "Developer",
              text: "Working with Archform was a game-changer. Their innovative approach helped us create spaces that truly stand out.",
            },
            {
              name: "Anita Desai",
              role: "Business Owner",
              text: "The team's professionalism and creative vision exceeded our expectations. Our new office is both beautiful and functional.",
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl text-neutral-300 mb-4">"</div>
              <p className="text-neutral-700 leading-relaxed mb-6 italic">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                <div>
                  <div className="font-medium text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
