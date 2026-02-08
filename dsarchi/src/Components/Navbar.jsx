import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold tracking-tight">ARCHFORM</div>
        <div className="hidden md:flex gap-8 text-sm">
          <Link to="/" className="hover:text-neutral-600 transition">
            Home
          </Link>
          <Link to="/projects" className="hover:text-neutral-600 transition">
            Projects
          </Link>
          <Link to="/about" className="hover:text-neutral-600 transition">
            About
          </Link>
          <Link to="/services" className="hover:text-neutral-600 transition">
            Services
          </Link>
          <Link to="/contact" className="hover:text-neutral-600 transition">
            Contact
          </Link>
        </div>
        <button className="bg-neutral-900 text-white px-6 py-2 rounded-full text-sm hover:bg-neutral-700 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}
