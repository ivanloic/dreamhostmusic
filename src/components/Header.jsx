// Header.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import AuthModal from './AuthModal';

const Header = () => {
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const [isDropdownPinned, setIsDropdownPinned] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Desktop dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDesktopDropdownOpen(false);
        setIsDropdownPinned(false);
      }

      // Mobile dropdown
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        if (mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(event.target)) {
          setIsMobileDropdownOpen(false);
        }
      }
    };

    // Use pointerdown to cover mouse and touch events consistently
    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on navigation
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileDropdownOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="">
            <img src="/logo/logo3.png" alt="Logo" className="h-8 w-auto"/>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#008683] transition-colors duration-300 font-medium">Home</Link>
            <Link to="/about" className="hover:text-[#008683] transition-colors duration-300 font-medium">About</Link>

            {/* "Our products" dropdown (desktop) */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center hover:text-[#008683] transition-colors duration-300 font-medium"
                onMouseEnter={() => { if (!isDropdownPinned) setIsDesktopDropdownOpen(true); }}
                onMouseLeave={() => { if (!isDropdownPinned) setIsDesktopDropdownOpen(false); }}
                onClick={() => {
                  setIsDropdownPinned(prev => {
                    const next = !prev;
                    setIsDesktopDropdownOpen(next);
                    return next;
                  });
                }}
              >
                Our products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDesktopDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50"
                  onMouseEnter={() => { if (!isDropdownPinned) setIsDesktopDropdownOpen(true); }}
                  onMouseLeave={() => { if (!isDropdownPinned) setIsDesktopDropdownOpen(false); }}
                >
                  <Link to="/guitares" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">Guitars</Link>
                  <Link to="/Drums" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">Drums</Link>
                  <Link to="/Perdals" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">Pedals</Link>
                  <Link to="/Amplifier" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">Amplifiers</Link>
                </div>
              )}
            </div>
            
            <Link to="/contact" className="hover:text-[#008683] transition-colors duration-300 font-medium">Contact</Link>
          </nav>

          {/* User and cart icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300" onClick={() => setShowAuthModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            <button
              className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-300 relative"
              onClick={() => navigate('/panier')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            
            {/* Mobile menu button */}
            <button 
              ref={mobileMenuButtonRef}
              className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4" ref={mobileDropdownRef}>
            <Link to="/" className="block py-2 hover:text-[#008683] transition-colors duration-300" onClick={closeMobileMenu}>Home</Link>
            <Link to="/about" className="block py-2 hover:text-[#008683] transition-colors duration-300" onClick={closeMobileMenu}>About</Link>

            <div className="py-2">
              <button 
                className="flex items-center w-full justify-between hover:text-[#008683] transition-colors duration-300"
                onClick={() => setIsMobileDropdownOpen((prev) => !prev)}
                aria-expanded={isMobileDropdownOpen}
                aria-controls="mobile-dropdown"
              >
                Our products
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMobileDropdownOpen && (
                <div
                  id="mobile-dropdown"
                  className="pl-4 mt-2 space-y-2 bg-gray-800 rounded-md shadow-lg"
                  role="menu"
                >
                  <Link
                    to="/guitares"
                    className="block py-1 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    onClick={closeMobileMenu}
                    role="menuitem"
                  >
                    Guitars
                  </Link>
                  <Link
                    to="/Drums"
                    className="block py-1 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    onClick={closeMobileMenu}
                    role="menuitem"
                  >
                    Drums
                  </Link>
                  <Link
                    to="/Perdals"
                    className="block py-1 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    onClick={closeMobileMenu}
                    role="menuitem"
                  >
                    Pedals
                  </Link>
                  <Link
                    to="/Amplifier"
                    className="block py-1 px-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-300"
                    onClick={closeMobileMenu}
                    role="menuitem"
                  >
                    Amplifiers
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/contact" className="block py-2 hover:text-[#008683] transition-colors duration-300" onClick={closeMobileMenu}>Contact</Link>
          </div>
        )}
        
        {/* Auth modal */}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialTab="login" />
      </div>
    </header>
  );
};

export default Header;
