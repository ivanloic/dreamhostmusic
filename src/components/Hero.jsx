// components/Hero.jsx (updated version)
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Background with texture effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNzE3MTciIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Main text */}
          <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Where{' '}
              <span className="bg-[#6819ce] bg-clip-text text-transparent">
                Passion
              </span>
              <br />
              Becomes Sound
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            >
              Rediscover the magic of vintage with our exceptional guitars, amps and drums.
              Instruments that tell a story and make yours resonate.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <button className="bg-[#6819ce] hover:bg-[#008683] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Explore the Collection
              </button>
              
              <button className="border-2 border-[#6819ce] text-[#008683] hover:bg-[#6819ce] hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                View Deals
              </button>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center md:justify-start gap-6"
            >
              {[
                { number: '500+', text: 'Guitars in Stock' },
                { number: '15K+', text: 'Happy Customers' },
                { number: '25', text: 'Years of Experience' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#008683]">{stat.number}</div>
                  <div className="text-gray-400">{stat.text}</div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Hero image with guitar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="md:w-1/2 relative"
          >
            <div className="relative max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/10 rounded-2xl p-8 backdrop-blur-sm border border-[#6819ce]/20">
                <img 
                  src="Brands/Fichier 2.png" 
                  alt="Premium electric guitar" 
                  className="w-full h-auto rounded-lg transform rotate-2 shadow-2xl"
                />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-4 -left-4 bg-[#6819ce] text-white p-3 rounded-lg shadow-lg transform -rotate-12"
              >
                <div className="text-sm font-bold">New</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-4 -right-4 bg-[#6819ce] text-white p-4 rounded-full shadow-lg"
              >
                <div className="text-xs font-bold">-20%</div>
              </motion.div>
            </div>
            
            {/* Mini product cards */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex justify-center mt-8 space-x-4"
            >
              {[
                'Brands/vintage-1950s-kay-k161-old-kraftsman-jimmy-reed-electric-guitar-2-768x768.jpeg',
                'Brands/vintage-1960s-hagstorm-futurama-ii-red-bass-guitar-ohsc-768x768.jpeg',
                'Brands/vintage-1961-grazioso-jolana-selmer-futurama-iii-sunburst-guitar-ohsc-768x768.jpeg'
              ].map((src, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-[#6819ce]/30 transform hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    src={src} 
                    alt="Product" 
                    className="w-16 h-16 rounded object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 text-gray-900 fill-current"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
