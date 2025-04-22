import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <footer className="bg-gradient-dark text-white">
      {/* Main Footer Content */}
      <div className="container-width section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="mb-6">
              <img 
                src={`${process.env.PUBLIC_URL}/Metavel_logo_white.png`} 
                alt="Metavel Logo" 
                className="h-16 md:h-20 object-contain mx-auto md:mx-0"
              />
            </div>
            <p className="text-sm text-[var(--color-neutral-300)] mb-4">
              A trusted name in the Industrial Valves and Crushing & Mining industries, 
              providing high-quality solutions for various industrial applications worldwide.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--color-primary-main)] p-2 rounded-full hover:bg-[var(--color-primary-light)] transition-colors touch-target"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--color-primary-main)] p-2 rounded-full hover:bg-[var(--color-primary-light)] transition-colors touch-target"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--color-primary-main)] p-2 rounded-full hover:bg-[var(--color-primary-light)] transition-colors touch-target"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--color-primary-main)] p-2 rounded-full hover:bg-[var(--color-primary-light)] transition-colors touch-target"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links - Mobile Collapsible / Desktop Expanded */}
          <div className="mt-6 md:mt-0">
            <div 
              className="flex justify-between items-center md:block border-b border-[var(--color-primary-light)] pb-2 mb-4"
              onClick={() => toggleSection('links')}
            >
              <h4 className="text-lg font-semibold text-[var(--color-secondary-main)]">Quick Links</h4>
              <button className="md:hidden">
                {expandedSection === 'links' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            <nav className={`flex flex-col space-y-3 overflow-hidden transition-all duration-300 ${expandedSection === 'links' || window.innerWidth >= 768 ? 'max-h-96' : 'max-h-0 md:max-h-96'}`}>
              <Link to="/" className="text-white hover:text-[var(--color-secondary-light)] transition-colors py-1">
                Home
              </Link>
              <Link to="/products" className="text-white hover:text-[var(--color-secondary-light)] transition-colors py-1">
                All Products
              </Link>
              <Link to="/products?category=Industrial Valve" className="text-white hover:text-[var(--color-secondary-light)] transition-colors py-1">
                Industrial Valves
              </Link>
              <Link to={`/products?category=${encodeURIComponent("Crushing & Mining")}`} className="text-white hover:text-[var(--color-secondary-light)] transition-colors py-1">
                Crusher & Mining
              </Link>
            </nav>
          </div>

          {/* Products - Mobile Collapsible / Desktop Expanded */}
          <div className="mt-2 md:mt-0">
            <div 
              className="flex justify-between items-center md:block border-b border-[var(--color-primary-light)] pb-2 mb-4"
              onClick={() => toggleSection('products')}
            >
              <h4 className="text-lg font-semibold text-[var(--color-secondary-main)]">Our Products</h4>
              <button className="md:hidden">
                {expandedSection === 'products' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${expandedSection === 'products' || window.innerWidth >= 768 ? 'max-h-96' : 'max-h-0 md:max-h-96'}`}>
              <li className="text-white py-1">
                Ball Valves
              </li>
              <li className="text-white py-1">
                Butterfly Valves
              </li>
              <li className="text-white py-1">
                Gate Valves
              </li>
              <li className="text-white py-1">
                Check Valves
              </li>
              <li className="text-white py-1">
                Crusher Equipment
              </li>
            </ul>
          </div>

          {/* Contact Information - Mobile Collapsible / Desktop Expanded */}
          <div className="mt-2 md:mt-0">
            <div 
              className="flex justify-between items-center md:block border-b border-[var(--color-primary-light)] pb-2 mb-4"
              onClick={() => toggleSection('contact')}
            >
              <h4 className="text-lg font-semibold text-[var(--color-secondary-main)]">Contact Us</h4>
              <button className="md:hidden">
                {expandedSection === 'contact' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            <div className={`space-y-4 overflow-hidden transition-all duration-300 ${expandedSection === 'contact' || window.innerWidth >= 768 ? 'max-h-96' : 'max-h-0 md:max-h-96'}`}>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-[var(--color-secondary-main)]" />
                <p className="text-sm text-white">
                  C / 204, BALAJI RESIDENCY, NR KALYAN FARM, NIKOL, Ahmedabad, GUJARAT, 382350
                </p>
              </div>
              <a 
                href="tel:+916356973719" 
                className="flex items-center space-x-3 text-sm text-white hover:text-[var(--color-secondary-light)] transition-colors py-1"
              >
                <Phone size={20} className="flex-shrink-0 text-[var(--color-secondary-main)]" />
                <span>+91 6356973719</span>
              </a>
              <a 
                href="mailto:Metavelinfo@gmail.com" 
                className="flex items-center space-x-3 text-sm text-white hover:text-[var(--color-secondary-light)] transition-colors py-1"
              >
                <Mail size={20} className="flex-shrink-0 text-[var(--color-secondary-main)]" />
                <span>Metavelinfo@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[var(--color-primary-dark)] py-4 text-center text-sm text-[var(--color-neutral-400)]">
        <div className="container-width">
          <p>&copy; {currentYear} Metavel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 