// components/Footer.jsx
import React from 'react';
import AnimatedSection from './AnimatedSection';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <AnimatedSection>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="">
                  <img src="/logo/logo3.png" alt="" srcSet="" className="h-8 w-auto" />
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner, driven by a passion for musical instruments.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                      {social.charAt(0).toUpperCase()}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Quick links */}
          <AnimatedSection delay={0.1}>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Products', 'Contact', 'Blog'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Categories */}
          <AnimatedSection delay={0.2}>
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {[
                  'Electric Guitars',
                  'Acoustic Guitars',
                  'Amplifiers',
                  'Effect Pedals',
                  'Accessories',
                ].map((category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Copyright */}
        <AnimatedSection delay={0.4}>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 GuitarShop. All rights reserved. |
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-300 ml-2"
              >
                Legal notice
              </a>{' '}
              |
              <a
                href="#"
                className="hover:text-amber-400 transition-colors duration-300 ml-2"
              >
                Privacy policy
              </a>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};

export default Footer;
