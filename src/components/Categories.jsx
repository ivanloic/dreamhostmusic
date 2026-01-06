// components/Categories.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Electric Guitars & Acoustic Guitars',
      description: 'From Fender to Gibson, find your sound',
      image: '/Guitars/0/2005-fender-custom-shop-59-esquire-blonde-telecaster-guitar-ohsc-4-768x768.jpeg',
      count: '150+ models'
    },
    {
      id: 3,
      name: 'Amplifiers',
      description: 'Give your sound more power',
      image: '/amplifier/2/2003-mesa-boogie-triple-rectifier-solo-150-head-usa-amplifier.jpeg',
      count: '80+ models'
    },
    {
      id: 4,
      name: 'Effects Pedals',
      description: 'Shape your unique sound and unlock your talent',
      image: 'public/perdals/1/vintage-roland-jupiter-jp4-synthesizer-keyboard-one-owner-768x768.jpeg',
      count: '200+ products'
    }
    ,
    {
      id: 5,
      name: 'Drums',
      description: 'Acoustic and electronic kits to power your rhythm',
      image: 'public/Drum-kit/17/vintage-1963-ludwig-super-classic-black-oyster-pearl-drum-kit-768x510.jpg',
      count: '60+ kits'
    }
  ];

  const navigate = useNavigate();

  // Map category names (or ids) to app routes
  const categoryRouteMap = {
    'Electric Guitars & Acoustic Guitars': '/guitares',
    'Amplifiers': '/Amplifier',
    'Effects Pedals': '/Perdals',
    'Drums': '/Drums'
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our <span className="text-[#008683]">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our wide selection of quality instruments and gear
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <AnimatedSection key={category.id} delay={index * 0.1}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate(categoryRouteMap[category.name] || '/')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(categoryRouteMap[category.name] || '/'); }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#008683] font-semibold">{category.count}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(categoryRouteMap[category.name] || '/'); }}
                      className="text-gray-400 hover:text-[#008683] transition-colors duration-300"
                      aria-label={`View ${category.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
