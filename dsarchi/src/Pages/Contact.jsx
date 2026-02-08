import React from 'react'

const Contact = () => {
  return (
      <section className="bg-white">
      {/* Header */}
      <div className="bg-neutral-900 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide">
          Get In Touch
        </h1>
        <p className="mt-4 text-neutral-300 max-w-xl mx-auto text-sm md:text-base">
          Let’s create thoughtful spaces together.  
          Share your idea and we’ll take it from there.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-medium text-neutral-900">
            Contact Information
          </h2>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Whether you’re planning a new build, renovation, or
            just exploring ideas — we’d love to hear from you.
          </p>

          <div className="mt-10 space-y-6 text-neutral-700 text-sm">
            <div>
              <p className="font-medium text-neutral-900">Studio Address</p>
              <p>Pune, Maharashtra, India</p>
            </div>

            <div>
              <p className="font-medium text-neutral-900">Phone</p>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <p className="font-medium text-neutral-900">Email</p>
              <p>hello@archform.com</p>
            </div>

            <div>
              <p className="font-medium text-neutral-900">Working Hours</p>
              <p>Mon – Fri, 10:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-neutral-50 p-10 rounded-lg shadow-sm">
          <h2 className="text-2xl font-medium text-neutral-900 mb-8">
            Send a Message
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-neutral-300 px-4 py-3 rounded-md focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-neutral-300 px-4 py-3 rounded-md focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Project Type
              </label>
              <select
                className="w-full border border-neutral-300 px-4 py-3 rounded-md focus:outline-none focus:border-neutral-900"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Interior Design</option>
                <option>Urban Planning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Tell us about your project..."
                className="w-full border border-neutral-300 px-4 py-3 rounded-md focus:outline-none focus:border-neutral-900"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white py-3 rounded-md hover:bg-neutral-800 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact