import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Track screen size and scroll position
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when screen size changes to desktop
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setExpandedCategory(null);
      }
    };
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial checks
    handleResize();
    handleScroll();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when changing routes
    setMobileMenuOpen(false);
    setExpandedCategory(null);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  // Define navigation categories with nested links
  const navCategories = [
    { 
      label: 'Home', 
      path: '/', 
      type: 'link' 
    },
    { 
      label: 'Products', 
      path: '/products', 
      type: 'dropdown',
      children: [
        { path: '/products?category=Industrial Valve', label: 'Industrial Valves' },
        { path: `/products?category=${encodeURIComponent("Crushing & Mining")}`, label: 'Crusher & Mining' },
      ]
    },
    { 
      label: 'Contact Us', 
      path: '/contact', 
      type: 'link' 
    }
  ];

  const toggleCategory = (categoryLabel) => {
    setExpandedCategory(expandedCategory === categoryLabel ? null : categoryLabel);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path.split('?')[0]);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container') && !event.target.closest('button[aria-label="Open Menu"]')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Determine which logo to show
  const logoSrc = isScrolled || isMobile ? 'Metavel_logo_white.png' : 'Metavel_logo.png';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--color-primary-dark)] shadow-lg' : 'bg-[rgba(0,0,0,0.5)] md:bg-[rgba(255,255,255,0.95)] md:backdrop-blur-sm'}`}>
      {/* Main Navigation */}
      <div className={`${isScrolled ? 'py-3' : 'py-4 md:py-5'} transition-all duration-300`}>
        <div className="container-width flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={`${process.env.PUBLIC_URL}/${logoSrc}`} 
              alt="Metavel Industries" 
              className="h-14 md:h-18 lg:h-24 object-contain transition-all duration-300"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none rounded-md hover:bg-[rgba(255,255,255,0.1)] active:bg-[rgba(255,255,255,0.2)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navCategories.map((category) => (
              category.type === 'link' ? (
                <Link
                  key={category.path}
                  to={category.path}
                  className={`
                    font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:scale-105 transform
                    ${isActive(category.path) 
                      ? 'text-[var(--color-secondary-main)] font-semibold' 
                      : `${isScrolled ? 'text-white hover:text-[var(--color-secondary-light)]' : 'text-[var(--color-primary-darker)] hover:text-[var(--color-primary-main)]'}`
                    }
                  `}
                >
                  {category.label}
                </Link>
              ) : (
                <div key={category.label} className="relative group">
                  <Link
                    to={category.path}
                    className={`
                      font-medium transition-colors duration-300 py-2 px-3 rounded-md flex items-center group-hover:scale-105 transform
                      ${isActive(category.path) 
                        ? 'text-[var(--color-secondary-main)] font-semibold' 
                        : `${isScrolled ? 'text-white hover:text-[var(--color-secondary-light)]' : 'text-[var(--color-primary-darker)] hover:text-[var(--color-primary-main)]'}`
                      }
                    `}
                  >
                    {category.label}
                    <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-300" />
                  </Link>
                  
                  {/* Desktop Dropdown */}
                  <div className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg overflow-hidden transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-left z-10 pointer-events-none group-hover:pointer-events-auto">
                    {category.children.map((subcategory) => (
                      <Link
                        key={subcategory.path}
                        to={subcategory.path}
                        className="block w-full text-[var(--color-primary-darker)] hover:bg-[var(--color-primary-light)] hover:text-white py-3 px-4 transition-colors duration-200"
                      >
                        {subcategory.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu - Slide Down */}
      <div 
        className={`
          md:hidden bg-[var(--color-primary-dark)] overflow-hidden transition-all duration-300 mobile-menu-container
          ${mobileMenuOpen ? 'max-h-[500px] opacity-100 shadow-lg' : 'max-h-0 opacity-0'}
        `}
      >
        <nav className="container-width flex flex-col py-2">
          {navCategories.map((category) => (
            <div key={category.label} className="border-b border-[rgba(255,255,255,0.1)]">
              {category.type === 'link' ? (
                <Link
                  to={category.path}
                  className={`
                    py-3 px-4 font-medium text-base flex items-center
                    ${isActive(category.path) 
                      ? 'text-[var(--color-secondary-main)] font-semibold' 
                      : 'text-white hover:text-[var(--color-secondary-light)]'
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.label}
                </Link>
              ) : (
                <>
                  <button 
                    className={`
                      w-full text-left py-3 px-4 font-medium text-base
                      flex justify-between items-center
                      ${isActive(category.path) 
                        ? 'text-[var(--color-secondary-main)] font-semibold' 
                        : 'text-white'
                      }
                    `}
                    onClick={() => toggleCategory(category.label)}
                    aria-expanded={expandedCategory === category.label}
                  >
                    <span>{category.label}</span>
                    {expandedCategory === category.label ? 
                      <ChevronUp size={18} className="transition-transform duration-200" /> : 
                      <ChevronDown size={18} className="transition-transform duration-200" />
                    }
                  </button>
                  
                  {/* Mobile dropdown content */}
                  <div className={`
                    overflow-hidden transition-all duration-300 bg-[rgba(0,0,0,0.2)]
                    ${expandedCategory === category.label ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    {category.children.map((subcategory) => (
                      <Link
                        key={subcategory.path}
                        to={subcategory.path}
                        className="block pl-8 pr-4 py-3 text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subcategory.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header; 