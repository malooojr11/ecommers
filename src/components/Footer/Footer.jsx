// Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook, faInstagram, faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-2xl font-bold text-emerald-400">Ecommerce</div>

        <ul className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <li><NavLink to="/" className="hover:text-emerald-400">Home</NavLink></li>
          <li><NavLink to="/about" className="hover:text-emerald-400">About</NavLink></li>
          <li><NavLink to="/contact" className="hover:text-emerald-400">Contact</NavLink></li>
        </ul>

        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" className="hover:text-blue-500"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://instagram.com" target="_blank" className="hover:text-pink-500"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://x.com" target="_blank" className="hover:text-gray-300"><FontAwesomeIcon icon={faXTwitter} /></a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
      </div>
    </footer>
  );
}
