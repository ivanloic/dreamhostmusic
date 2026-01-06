// components/AboutHero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animated counter component
const Counter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration * 60); // 60 FPS
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [end, duration, inView]);

  return (
    <span ref={ref} className="font-bold">
      {count}{suffix}
    </span>
  );
};

const AboutHero = () => {
  const stats = [
    { number: 25, suffix: '+', label: 'Years of Experience', color: 'from-[#6819ce] to-[#6819ce]' },
    { number: 15000, suffix: '+', label: 'Satisfied Customers', color: 'from-blue-500 to-cyan-500' },
    { number: 500, suffix: '+', label: 'Products in Stock', color: 'from-green-500 to-emerald-500' },
    { number: 98, suffix: '%', label: 'Satisfaction Rate', color: 'from-purple-500 to-pink-500' }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#6819ce] rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Light effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6819ce] rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6819ce] rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-[#6819ce]/20 backdrop-blur-sm rounded-full border border-[#6819ce]/30 mb-8"
            >
              <div className="w-3 h-3 bg-[#6819ce] rounded-full mr-3 animate-pulse"></div>
              <span className="text-amber-200 font-semibold">Our Story</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              A Passion
              <motion.span
                initial={{ backgroundPosition: '0%' }}
                animate={inView ? { backgroundPosition: '100%' } : {}}
                transition={{ duration: 2, delay: 0.5 }}
                className="block bg-gradient-to-r from-[#6819ce] via-[#6819ce] to-[#6819ce] bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                That Resonates
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
            >
              For a quarter of a century, we have been turning musical dreams into reality. 
              Our commitment: to offer you the best instruments and personalised support 
              so that every note matters.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#6819ce] to-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#6819ce]/25 text-center"
              >
                Meet Our Team
              </motion.a>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#6819ce] text-[#6819ce] font-semibold py-4 px-8 rounded-lg hover:bg-[#6819ce] hover:text-white transition-all duration-300 text-center backdrop-blur-sm"
              >
                Discover Our Products
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Stats with counters */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Decorative image */}
              <div className="relative mb-8">
                <div className="w-full h-48 bg-gradient-to-r from-[#6819ce] to-[#6819ce] rounded-2xl flex items-center justify-center">
                  <div className="text-6xl">🎸</div>
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-2xl">⭐</span>
                  </motion.div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 hover:border-[#6819ce]/30 transition-all duration-300 cursor-pointer group"
                  >
                    <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      <Counter end={stat.number} suffix={stat.suffix} duration={3} />
                    </div>
                    <div className="text-gray-300 text-sm font-medium group-hover:text-amber-200 transition-colors duration-300">
                      {stat.label}
                    </div>
                    
                    {/* Animated progress bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: '100%' } : {}}
                      transition={{ duration: 2, delay: 1 + index * 0.2 }}
                      className="h-1 bg-gradient-to-r from-transparent via-[#6819ce] to-transparent mt-3 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-8 p-4 bg-[#6819ce]/10 rounded-2xl border border-[#6819ce]/20"
              >
                <p className="text-amber-200 text-center italic">
                  "Music is our universal language. Our mission is to place 
                  the best instruments in your hands."
                </p>
                <p className="text-amber-300 text-center font-semibold mt-2">
                  - Mark Johnson, Founder
                </p>
              </motion.div>
            </div>

            {/* Decorative floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -top-4 -left-4 w-8 h-8 bg-[#6819ce] rounded-full shadow-lg"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1,
              }}
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#6819ce] rounded-full shadow-lg"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-[#6819ce] text-center"
          >
            <div className="text-sm mb-2">Discover our story</div>
            <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default AboutHero;
