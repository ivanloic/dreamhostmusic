// components/Brands.jsx
import React from 'react';
import AnimatedSection from './AnimatedSection';

const Brands = () => {
  const brands = [
    { name: 'Fender', logo: '/Blogo/fender.png', count: '45 products' },
    { name: 'Gibson', logo: '/Blogo/Gibson_Guitar_logo.svg.png', count: '32 products' },
    { name: 'Marshall', logo: '/Blogo/Marshall.png', count: '28 products' },
    { name: 'Boss', logo: '/Blogo/boss.png', count: '67 products' },
    { name: 'Yamaha', logo: '/Blogo/yamaha.png', count: '53 products' },
    { name: 'Ibanez', logo: '/Blogo/tntxe4.png', count: '38 products' }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Partner <span className="text-amber-400">Brands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We work with the biggest brands to bring you the very best
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <AnimatedSection key={brand.name} delay={index * 0.1}>
              <div className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <img src={brand.logo} alt="" />
                </div>
                <h3 className="font-bold text-lg mb-2">{brand.name}</h3>
                <p className="text-amber-400 text-sm">{brand.count}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
