// components/FeaturedProducts.jsx
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { useNavigate, useLocation } from 'react-router-dom';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productIdParam = params.get('id');
  const isSingleMode = Boolean(productIdParam);
  const navigate = useNavigate();

  const products = {
    featured: [
      {
        id: 2,
        name: 'Gibson Les Paul Custom Black Beauty (2000) - 3 Pickup',
        price: 2499,
        originalPrice: 2899,
        type: 'electric',
        brand: 'Gibson',
        image: '/Guitars/2/2000-gibson-les-paul-custom-3-pickup-black-beauty-guitar-1.jpeg',
        rating: 4.9,
        reviews: 142,
        features: ['Mahogany body', '3 humbucker pickups', 'Black finish'],
        inStock: true,
        badge: 'Limited',
        maxStock: 2,
        delivery: 'Free shipping',
        specifications: { Body: 'Mahogany', Neck: 'Mahogany', Pickups: 'Humbucker x3' },
        description: 'Les Paul Custom in excellent condition, warm tone and legendary sustain.',
        warranty: '2-year warranty',
        reviewCount: 142,
        sku: 'GTR-002',
        images: [
          '/Guitars/2/2000-gibson-les-paul-custom-3-pickup-black-beauty-guitar-1.jpeg',
          '/Guitars/2/2000-gibson-les-paul-custom-3-pickup-black-beauty-guitar-2.jpeg',
          '/Guitars/2/2000-gibson-les-paul-custom-3-pickup-black-beauty-guitar-3.jpeg',
          '/Guitars/2/2000-gibson-les-paul-custom-3-pickup-black-beauty-guitar-4.jpeg',
          '/Guitars/2/2000-gibson-les-paul-custom-3-pickup-black-beauty-guitar-5.jpeg',
          '/Guitars/2/2000-gibson-les-paul-custom-3-pickup-black-beauty-guitar-768x768.jpeg'
        ],
      },
      {
        id: 3,
        name: 'Gibson Les Paul Custom Black Beauty (2000) - Classic',
        price: 2299,
        originalPrice: 2599,
        type: 'electric',
        brand: 'Gibson',
        image: '/Guitars/3/2000-gibson-les-paul-custom-black-beauty-guitar-1-768x768.jpeg',
        rating: 4.8,
        reviews: 98,
        features: ['Mahogany body', 'High-end finish', '24.75" scale'],
        inStock: true,
        badge: 'Classic',
        maxStock: 4,
        delivery: 'Paid shipping',
        specifications: { Body: 'Mahogany', Neck: 'Mahogany', Fretboard: 'Ebony' },
        description: 'Classic Black Beauty version, perfect for blues and rock.',
        warranty: '1-year warranty',
        reviewCount: 98,
        sku: 'GTR-003',
        images: [
          '/Guitars/3/2000-gibson-les-paul-custom-black-beauty-guitar-1-768x768.jpeg',
          '/Guitars/3/2000-gibson-les-paul-custom-black-beauty-guitar-2-768x768.jpeg',
          '/Guitars/3/2000-gibson-les-paul-custom-black-beauty-guitar-3-768x768.jpeg',
          '/Guitars/3/2000-gibson-les-paul-custom-black-beauty-guitar-4-768x768.jpeg',
          '/Guitars/3/2000-gibson-les-paul-custom-black-beauty-guitar-5-768x768.jpeg',
          '/Guitars/3/2000-gibson-les-paul-custom-black-beauty-guitar-768x768.jpeg'
        ],
      },
      {
        id: 4,
        name: 'Gibson Thunderbird Bass USA Sunburst (2002)',
        price: 1199,
        originalPrice: 1399,
        type: 'bass',
        brand: 'Gibson',
        image: '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-1-768x768.jpeg',
        rating: 4.5,
        reviews: 54,
        features: ['4 strings', 'Mahogany body', 'Sunburst finish'],
        inStock: true,
        badge: 'Bass',
        maxStock: 5,
        delivery: 'Free shipping',
        specifications: { Strings: 4, Body: 'Mahogany', Pickups: 'Humbucker' },
        description: 'Gibson Thunderbird bass, deep and punchy tone, perfect for rock.',
        warranty: '1-year warranty',
        reviewCount: 54,
        sku: 'GTR-004',
        images: [
          '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-1-768x768.jpeg',
          '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-2-768x768.jpeg',
          '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-3-768x768.jpeg',
          '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-4-768x768 (1).jpeg',
          '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-4-768x768.jpeg',
          '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-5-768x768.jpeg',
          '/Guitars/4/2002-gibson-thunderbird-usa-sunburst-4-bass-guitar-ohsc-768x768.jpeg'
        ],
      },
      {
        id: 5,
        name: 'Höfner 62 Reissue Violin Bass (2002)',
        price: 899,
        originalPrice: 999,
        type: 'bass',
        brand: 'Höfner',
        image: '/Guitars/5/2002-hofner-62-reissue-ri-violin-mccartney-left-handed-bass-guitar-1-768x1024.jpeg',
        rating: 4.7,
        reviews: 88,
        features: ['Violin design', 'Left-handed', 'Vintage finish'],
        inStock: true,
        badge: 'Vintage',
        maxStock: 2,
        delivery: 'Paid shipping',
        specifications: { Body: 'Composite wood', Neck: 'Maple', Orientation: 'Left-handed' },
        description: 'Reissue of the McCartney model, highly sought after for its look and tone.',
        warranty: '1-year warranty',
        reviewCount: 88,
        sku: 'GTR-005',
        images: [
          '/Guitars/5/2002-hofner-62-reissue-ri-violin-mccartney-left-handed-bass-guitar-1-768x1024.jpeg',
          '/Guitars/5/2002-hofner-62-reissue-ri-violin-mccartney-left-handed-bass-guitar-2-768x1024.jpeg',
          '/Guitars/5/2002-hofner-62-reissue-ri-violin-mccartney-left-handed-bass-guitar-3-768x1024.jpeg',
          '/Guitars/5/2002-hofner-62-reissue-ri-violin-mccartney-left-handed-bass-guitar-4-768x1024.jpeg',
          '/Guitars/5/2002-hofner-62-reissue-ri-violin-mccartney-left-handed-bass-guitar-768x768.jpeg'
        ],
      }
    ],
    new: [
      {
        id: 27,
        name: 'Gibson SG / Les Paul Standard Original (1960-61)',
        price: 1899,
        originalPrice: 2199,
        type: 'electric',
        brand: 'Gibson',
        image: '/Guitars/26/vintage-1960-1961-gibson-sg-les-paul-standard-original-guitar-1-768x576.jpeg',
        rating: 4.8,
        reviews: 34,
        features: ['SG/Les Paul era', 'Vintage'],
        inStock: false,
        badge: 'Collector',
        maxStock: 1,
        delivery: 'Contact seller',
        specifications: { Era: '1960-1961' },
        description: 'Historic piece for collectors or demanding players.',
        warranty: 'N/A',
        reviewCount: 34,
        sku: 'GTR-027',
        images: [
          '/Guitars/26/vintage-1960-1961-gibson-sg-les-paul-standard-original-guitar-1-768x576.jpeg',
          '/Guitars/26/vintage-1960-1961-gibson-sg-les-paul-standard-original-guitar-2-768x576.jpeg'
        ],
      },
      {
        id: 28,
        name: 'Höfner Club 50 Natural (1960)',
        price: 749,
        originalPrice: 849,
        type: 'electric',
        brand: 'Höfner',
        image: '/Guitars/27/vintage-1960-hofner-club-50-natural-electric-acoustic-guitar-1960s-3-768x768.jpeg',
        rating: 4.1,
        reviews: 5,
        features: ['Club 50', 'Vintage'],
        inStock: true,
        badge: '',
        maxStock: 2,
        delivery: 'Paid shipping',
        specifications: { Era: '1960' },
        description: 'Compact 60s model with a retro look and sound.',
        warranty: '6-month warranty',
        reviewCount: 5,
        sku: 'GTR-028',
        images: [
          '/Guitars/27/vintage-1960-hofner-club-50-natural-electric-acoustic-guitar-1960s-1-768x768.jpeg',
          '/Guitars/27/vintage-1960-hofner-club-50-natural-electric-acoustic-guitar-1960s-3-768x768.jpeg'
        ],
      },
      {
        id: 29,
        name: 'Höfner Committee Blonde (1960)',
        price: 1099,
        originalPrice: 1299,
        type: 'electric',
        brand: 'Höfner',
        image: '/Guitars/28/vintage-1960-hofner-committee-natural-blonde-archtop-guitar-1-768x768.jpeg',
        rating: 4.3,
        reviews: 7,
        features: ['Committee', 'Blonde finish'],
        inStock: false,
        badge: 'Vintage',
        maxStock: 1,
        delivery: 'Contact seller',
        specifications: { Era: '1960' },
        description: 'Blonde-finish Hofner archtop with clear tone.',
        warranty: 'N/A',
        reviewCount: 7,
        sku: 'GTR-029',
        images: [
          '/Guitars/28/vintage-1960-hofner-committee-natural-blonde-archtop-guitar-1-768x768.jpeg',
          '/Guitars/28/vintage-1960-hofner-committee-natural-blonde-archtop-guitar-2-768x768.jpeg'
        ],
      },
      {
        id: 30,
        name: 'Höfner Committee Thinline Sunburst (1960)',
        price: 1199,
        originalPrice: 1399,
        type: 'electric',
        brand: 'Höfner',
        image: '/Guitars/29/vintage-1960-hofner-committee-thin-thinline-sunburst-guitar-1-768x1024.jpeg',
        rating: 4.4,
        reviews: 12,
        features: ['Thinline', 'Sunburst'],
        inStock: false,
        badge: 'Vintage',
        maxStock: 1,
        delivery: 'Contact seller',
        specifications: { Era: '1960' },
        description: 'Thinline model with strong attack and short sustain.',
        warranty: 'N/A',
        reviewCount: 12,
        sku: 'GTR-030',
        images: [
          '/Guitars/29/vintage-1960-hofner-committee-thin-thinline-sunburst-guitar-1-768x1024.jpeg',
          '/Guitars/29/vintage-1960-hofner-committee-thin-thinline-sunburst-guitar-2-768x576.jpeg'
        ],
      },
    ],
    sale: [
      {
        id: 16,
        name: 'Vintage Gibson Lap Steel (1939)',
        price: 2099,
        originalPrice: 2399,
        type: 'electric',
        brand: 'Gibson',
        image: '/Guitars/15/vintage-1939-gibson-eh150-pre-war-lap-steel-electric-guitar-1-768x576.jpeg',
        rating: 4.6,
        reviews: 9,
        features: ['Lap steel', 'Pre-war'],
        inStock: false,
        badge: 'Collector',
        maxStock: 1,
        delivery: 'Contact seller',
        specifications: { Type: 'Lap steel', Era: '1939' },
        description: 'Rare instrument, ideal for collections and vintage performances.',
        warranty: 'N/A',
        reviewCount: 9,
        sku: 'GTR-016',
        images: [
          '/Guitars/15/vintage-1939-gibson-eh150-pre-war-lap-steel-electric-guitar-1-768x576.jpeg',
          '/Guitars/15/vintage-1939-gibson-eh150-pre-war-lap-steel-electric-guitar-2-768x576.jpeg',
          '/Guitars/15/vintage-1939-gibson-eh150-pre-war-lap-steel-electric-guitar-4-768x576.jpeg'
        ],
      },
      {
        id: 17,
        name: 'Gallotone Champion John Lennon Original (1950s)',
        price: 1299,
        originalPrice: 1499,
        type: 'acoustic',
        brand: 'Gallotone',
        image: '/Guitars/16/vintage-1950s-gallotone-champion-john-lennon-original-acoustic-guitar-1-768x1024.jpeg',
        rating: 4.4,
        reviews: 18,
        features: ['Vintage', 'Historic'],
        inStock: false,
        badge: 'Vintage',
        maxStock: 1,
        delivery: 'Contact seller',
        specifications: { Era: '1950s', Type: 'Acoustic' },
        description: 'Acoustic guitar with historic provenance and unique character.',
        warranty: 'N/A',
        reviewCount: 18,
        sku: 'GTR-017',
        images: [
          '/Guitars/16/vintage-1950s-gallotone-champion-john-lennon-original-acoustic-guitar-1-768x1024.jpeg',
          '/Guitars/16/vintage-1950s-gallotone-champion-john-lennon-original-acoustic-guitar-2-768x1024.jpeg',
          '/Guitars/16/vintage-1950s-gallotone-champion-john-lennon-original-acoustic-guitar-3-768x576.jpeg',
          '/Guitars/16/vintage-1950s-gallotone-champion-john-lennon-original-acoustic-guitar-4-768x576.jpeg'
        ],
      },
      {
        id: 18,
        name: 'Kay K22 Jumbo Pink Acoustic (1950s)',
        price: 799,
        originalPrice: 899,
        type: 'acoustic',
        brand: 'Kay',
        image: '/Guitars/17/vintage-1950s-kay-k22-jumbo-pink-acoustic-guitar-ronnie-lane-studio-1-768x768.jpeg',
        rating: 4.2,
        reviews: 14,
        features: ['Jumbo', 'Beautiful pink color'],
        inStock: true,
        badge: '',
        maxStock: 2,
        delivery: 'Paid shipping',
        specifications: { Size: 'Jumbo', Era: '1950s' },
        description: 'Vintage jumbo with a unique look and strong projection.',
        warranty: '6-month warranty',
        reviewCount: 14,
        sku: 'GTR-018',
        images: [
          '/Guitars/17/vintage-1950s-kay-k22-jumbo-pink-acoustic-guitar-ronnie-lane-studio-1-768x768.jpeg',
          '/Guitars/17/vintage-1950s-kay-k22-jumbo-pink-acoustic-guitar-ronnie-lane-studio-2-768x1024.jpeg'
        ],
      },
      {
        id: 19,
        name: 'Kay K161 Old Kraftsman (1950s)',
        price: 699,
        originalPrice: 799,
        type: 'electric',
        brand: 'Kay',
        image: '/Guitars/18/vintage-1950s-kay-k161-old-kraftsman-jimmy-reed-electric-guitar-1-768x576.jpeg',
        rating: 4.1,
        reviews: 7,
        features: ['Vintage tone', 'Small body'],
        inStock: true,
        badge: '',
        maxStock: 2,
        delivery: 'Paid shipping',
        specifications: { Era: '1950s', Type: 'Electric' },
        description: 'Small vintage electric model with lots of sonic charm.',
        warranty: '6-month warranty',
        reviewCount: 7,
        sku: 'GTR-019',
        images: [
          '/Guitars/18/vintage-1950s-kay-k161-old-kraftsman-jimmy-reed-electric-guitar-1-768x576.jpeg',
          '/Guitars/18/vintage-1950s-kay-k161-old-kraftsman-jimmy-reed-electric-guitar-2-768x768.jpeg'
        ],
      },
    ]
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured <span className="text-[#6819ce]">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover our most popular instruments, carefully selected for you
            </p>
            
            {/* Tabs */}
            <div className="flex justify-center space-x-4 mb-12">
              {['featured', 'new', 'sale'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#008683] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'featured' && 'Featured'}
                  {tab === 'new' && 'New Arrivals'}
                  {tab === 'sale' && 'On Sale'}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products[activeTab].map((product, index) => (
            <AnimatedSection key={product.id} delay={index * 0.1} >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#008683] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.badge}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <button className="bg-white p-2 rounded-full shadow-lg hover:bg-[#008683] hover:text-white transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-[#008683] hover:text-white transition-colors duration-300"
                      onClick={() => navigate(`/produit/${product.id}`, { state: { product } })}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-2">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="bg-[#008683] hover:bg-amber-600 text-white p-3 rounded-full transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection delay={0.4}>
          <div className="text-center mt-12">
            <button
              className="bg-transparent border-2 border-[#6819ce] text-[#6819ce] hover:bg-[#6819ce] hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/guitares')} 
            >
              View All Products
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedProducts;
