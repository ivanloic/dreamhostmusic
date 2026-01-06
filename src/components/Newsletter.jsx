// components/Newsletter.jsx
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import bgImage from "../../public/Brands/bg2.png";

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900/95 to-dark-800/95"
        style={{
          backdropFilter: "blur(2px)",
        }}
      />
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stay Connected
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Be the first to hear about new arrivals, exclusive deals, and pro tips.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <p className="text-sm text-white mt-4">
              ✨ 10% off your first order
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
