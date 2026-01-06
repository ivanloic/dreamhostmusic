// pages/Perdals.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Perdals as PerdalsData } from '../data/perdalsData';
import bgImage from "../../public/Brands/bg1.png";
// Brands to highlight on the Perdals (pedals) page
const HIGHLIGHT_BRANDS = new Set(['Boss', 'Electro-Harmonix', 'MXR', 'TC Electronic', 'Strymon', 'Keeley', 'Wampler', 'EarthQuaker', 'Catalinbread', 'Walrus']);
const Perdals = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productIdParam = params.get('id');
  const isSingleMode = Boolean(productIdParam);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWindowStart, setPageWindowStart] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Product data (to be replaced by a real API)
  const PedalTypes = [
    { id: 'overdrive', name: 'Overdrive', count: 0 },
    { id: 'distortion', name: 'Distortion', count: 0 },
    { id: 'fuzz', name: 'Fuzz', count: 0 },
    { id: 'modulation', name: 'Modulation', count: 0 },
    { id: 'delay', name: 'Delay', count: 0 },
    { id: 'reverb', name: 'Reverb', count: 0 }
  ];

  const brands = [
    'Boss', 'Electro-Harmonix', 'MXR', 'TC Electronic', 'Strymon', 'Keeley', 'Wampler', 'EarthQuaker', 'Catalinbread', 'Walrus'
  ];

  useEffect(() => {
    // Simulate data loading
    setLoading(true);
    setTimeout(() => {
      setProducts(PerdalsData);
      // if an id is present in query param, only display that product
      if (productIdParam) {
        const found = PerdalsData.find(p => String(p.id) === String(productIdParam));
        setFilteredProducts(found ? [found] : []);
      } else {
        setFilteredProducts(PerdalsData);
      }
      setLoading(false);
    }, 500);
  }, []);

  // If products are loaded and an id is present in the URL,
  // ensure the displayed product matches the parameter.
  useEffect(() => {
    if (productIdParam && products.length) {
      const found = products.find(p => String(p.id) === String(productIdParam));
      setFilteredProducts(found ? [found] : []);
      setCurrentPage(1);
    }
  }, [productIdParam, products]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedTypes, priceRange, sortBy, products, selectedBrands]);

  const filterProducts = () => {
    let filtered = products.filter(product => {
      const name = (product && product.name) ? String(product.name).toLowerCase() : '';
      const brand = (product && product.brand) ? String(product.brand).toLowerCase() : '';
      const search = String(searchTerm || '').toLowerCase();

      const matchesSearch = name.includes(search) || brand.includes(search);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      return matchesSearch && matchesType && matchesPrice && matchesBrand;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const FiltersContent = () => (
    <>
      {/* Filter by type */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Pedal type</h3>
        <div className="space-y-2">
          {PedalTypes.map(type => (
            <label key={type.id} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type.id)}
                  onChange={() => handleTypeChange(type.id)}
                  className="w-4 h-4 text-[#6819ce] border-gray-300 rounded focus:ring-[#008683]"
                />
                <span className="ml-3 text-gray-700 group-hover:text-amber-600 transition-colors duration-200">
                  {type.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {type.count}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter by price */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Price range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{priceRange[0]}$</span>
            <span>{priceRange[1]}$</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Filter by brand */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(brand => (
            <label key={brand} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 text-[#008683] border-gray-300 rounded focus:ring-[#008683]"
              />
              <span className="ml-3 text-gray-700 group-hover:text-amber-600 transition-colors duration-200">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset filters button */}
      <div className="mt-6">
        <button
          onClick={() => {
            setSelectedTypes([]);
            setPriceRange([0, 5000]);
            setSearchTerm('');
            setSelectedBrands([]);
          }}
          className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Reset filters
        </button>
      </div>
    </>
  );

  const handleAddToCart = () => {
    if (!products) return;
    addItem(products, quantity);
    setQuantity(1);
  };

  const handleQuickView = (product) => {
    // Quick view simulation
    console.log('Quick view:', product);
    // Here you can open a modal with the details
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const VISIBLE_PAGES = 4; // Number of page buttons to show

  const paginate = (pageNumber) => {
    const p = Math.max(1, Math.min(totalPages, pageNumber));
    // shift window if needed so current page is always within [pageWindowStart, pageWindowStart+VISIBLE_PAGES-1]
    if (p < pageWindowStart) {
      setPageWindowStart(p);
    } else if (p > pageWindowStart + VISIBLE_PAGES - 1) {
      setPageWindowStart(Math.max(1, p - VISIBLE_PAGES + 1));
    }
    setCurrentPage(p);
  };

  // Keep window and current page valid when totalPages changes (e.g., after filtering)
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      setPageWindowStart(1);
      return;
    }
    // clamp currentPage
    if (currentPage > totalPages) setCurrentPage(totalPages);
    // clamp window start so there are up to VISIBLE_PAGES available
    const maxWindowStart = Math.max(1, totalPages - VISIBLE_PAGES + 1);
    if (pageWindowStart > maxWindowStart) setPageWindowStart(maxWindowStart);
  }, [totalPages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#6819ce] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Pedals...</p>
          </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative z-10 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
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
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Our <span className="text-[#6819ce]">Pedals</span>
              </h1>
              <p className="text-xl text-white mb-8">
                Discover our exceptional selection of guitar pedals for every style and level
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search bar */}
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a pedal, model or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008683] focus:border-transparent transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile filter button (only when not viewing a single product) */}
            {!isSingleMode && (
              <div className="lg:hidden mt-3 w-full">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="w-full px-4 py-3 bg-[#008683] text-white rounded-lg font-semibold"
                >
                  Filter
                </button>
              </div>
            )}

            {/* Sorting */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008683] focus:border-transparent transition-all duration-300"
              >
                <option value="name">Sort by name</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Best rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar (hidden when displaying a single product via ?id=) */}
            {!isSingleMode && (
              <>
                {/* Desktop sidebar */}
                <div className="hidden lg:block lg:w-1/4">
                  <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                    <FiltersContent />
                  </div>
                </div>

                {/* Mobile filters modal */}
                {showMobileFilters && (
                  <div className="fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowMobileFilters(false)} />
                    <div
                      className="ml-auto w-full max-w-md bg-white rounded-l-2xl p-6 overflow-auto h-full sm:h-auto z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Filters</h3>
                        <button onClick={() => setShowMobileFilters(false)} className="text-gray-500">Close</button>
                      </div>
                      <FiltersContent />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Products list */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                {currentItems.length > 0 ? (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {currentItems.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        onAddToCart={handleAddToCart}
                        onQuickView={handleQuickView}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">🎛️</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No pedals found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                    <button
                      onClick={() => {
                        setSelectedTypes([]);
                        setPriceRange([0, 5000]);
                        setSearchTerm('');
                        setSelectedBrands([]);
                      }}
                      className="bg-[#008683] text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-200"
                    >
                      Reset filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(VISIBLE_PAGES, Math.max(0, totalPages - pageWindowStart + 1)) }).map((_, i) => {
                      const pageNumber = pageWindowStart + i;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                            currentPage === pageNumber
                              ? 'bg-[#008683] text-white border-[#008683]'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Product Card component
const ProductCard = ({ product, index, onAddToCart, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
        onClick={() => navigate(`/produit/${product.id}`, { state: { product } })}
      >
        {/* Product image */}
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="bg-[#008683] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {product.badge}
              </span>
            </div>
          )}

          {/* Stock */}
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          {/* Hover actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={!product.inStock}
              className="bg-[#008683] text-white p-3 rounded-full shadow-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Brand with highlight badge for known pedal brands */}
          <div className="flex items-center mb-2 gap-2">
            <div className="text-[#008683] font-semibold text-xs sm:text-sm">{product.brand || 'Various'}</div>
            {HIGHLIGHT_BRANDS.has(product.brand) && (
              <span className="bg-[#6819ce] text-white px-2 py-0.5 rounded-full text-xs font-semibold" aria-label="Featured brand">Featured</span>
            )}
          </div>
          
          {/* Name */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{product.price}$</span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-gray-500 line-through ml-2">{product.originalPrice}$</span>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="bg-[#008683] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base"
            >
              {product.inStock ? 'Add' : 'Out of stock'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

export default Perdals;
