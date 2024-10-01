import React from 'react';
import { Facebook, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Us Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-3xl font-bold">WanderBlog</h3>
          <p className="text-green-100">
            Discover the world through our curated travel experiences. Let us guide you to your next unforgettable adventure.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-green-300 transition duration-300">Home</a></li>
            <li><a href="/destinations" className="hover:text-green-300 transition duration-300">Destinations</a></li>
            <li><a href="/about" className="hover:text-green-300 transition duration-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-green-300 transition duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <address className="not-italic text-green-100">
            <p>123 Travel Lane</p>
            <p>Wanderlust City, EX 12345</p>
            <p className="mt-2">Phone: (123) 456-7890</p>
            <p>Email: <a href="mailto:info@wanderblog.com" className="hover:text-green-300 transition duration-300">info@wanderblog.com</a></p>
          </address>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold mb-2">Newsletter</h3>
          <p className="text-green-100">Stay updated with our latest travel tips and destinations!</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-3 rounded-l-md text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-r-md transition duration-300 flex items-center"
            >
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-12 flex justify-center space-x-8">
        <a href="#" className="text-green-200 hover:text-green-300 transition duration-300">
          <Facebook size={30} />
        </a>
        <a href="#" className="text-green-200 hover:text-green-300 transition duration-300">
          <Twitter size={30} />
        </a>
        <a href="#" className="text-green-200 hover:text-green-300 transition duration-300">
          <Instagram size={30} />
        </a>
        <a href="#" className="text-green-200 hover:text-green-300 transition duration-300">
          <Mail size={30} />
        </a>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-green-200">
        <p>&copy; 2024 WanderBlog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
