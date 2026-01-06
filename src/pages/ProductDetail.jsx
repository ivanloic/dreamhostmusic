// pages/ProductDetail.jsx
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import comments from '../data/comment';
import { Guitar } from '../data/GuitarData';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addItem } = useContext(CartContext);

  // Get product from navigation state
  const productFromState = location.state?.product;

  useEffect(() => {
    if (productFromState) {
      // If product is passed via state, use it directly
      setProduct(productFromState);
      setLoading(false);
      loadRelatedProducts(productFromState);
    } else {
      // Otherwise, look for the product in local data (GuitarData)
      const found = Guitar.find(p => String(p.id) === String(id));
      if (found) {
        setProduct(found);
        loadRelatedProducts(found);
      } else {
        setProduct(null);
      }
      setLoading(false);
    }
  }, [id, productFromState]);

  const loadRelatedProducts = (currentProduct) => {
    if (!currentProduct) {
      setRelatedProducts([]);
      return;
    }

    const related = Guitar
      .filter(p => p.id !== currentProduct.id)
      .filter(p => p.brand === currentProduct.brand || p.type === currentProduct.type)
      .slice(0, 4);

    setRelatedProducts(related);
  };

  // Use the external comments data and pick a random sample to display
  const reviews = useMemo(() => {
    if (!comments || comments.length === 0) return [];
    // shuffle a copy and pick first 6 reviews
    const shuffled = [...comments].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6).map((c, idx) => ({ ...c, id: c.id || idx + 1 }));
  }, [product?.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setQuantity(1);
    console.log('Product added to cart', product.name, 'x', quantity);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const prevImage = () => {
    if (!product?.images?.length) return;
    setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  const nextImage = () => {
    if (!product?.images?.length) return;
    setSelectedImage(prev => (prev + 1) % product.images.length);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6819ce] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎸</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/guitares')}
            className="bg-[#6819ce] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#008683] transition-colors duration-200"
          >
            Back to guitars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#6819ce] transition-colors duration-200">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate('/guitares')} className="hover:text-[#6819ce] transition-colors duration-200">
              Guitars
            </button>
            <span>/</span>
            <span className="text-gray-900">{product.brand}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image gallery */}
            <div>
              <AnimatedSection>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
                  <div className="relative flex items-center justify-center bg-white">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={product.images?.[selectedImage] || product.image}
                        src={product.images?.[selectedImage] || product.image}
                        alt={product.name}
                        className="w-full h-auto max-h-[70vh] object-contain"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>

                    {/* Prev / Next buttons */}
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
                      aria-label="Previous image"
                    >
                      ‹
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md"
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Thumbnails */}
              <AnimatedSection delay={0.1}>
                <div className="grid grid-cols-4 gap-4">
                  {product.images?.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleImageClick(index)}
                      className={`bg-white rounded-lg shadow-md overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === index ? 'border-[#6819ce]' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1} of ${product.name}`}
                        className="w-full h-20 object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Product info */}
            <div className="space-y-6">
              <AnimatedSection>
                <div>
                  <span className="text-[#6819ce] font-semibold text-lg">{product.brand}</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                    {product.name}
                  </h1>

                  {/* Rating and reviews */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(Math.floor(product.rating))}
                      </div>
                      <span className="text-[#008683] font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-gray-600">{product.reviewCount} reviews</span>
                    <span className="text-gray-500 mx-2">•</span>
                    <span className="text-green-600 font-semibold">In stock</span>
                  </div>
                </div>
              </AnimatedSection>

              {/* Price */}
              <AnimatedSection delay={0.1}>
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-bold text-gray-900">{product.price}$</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through">{product.originalPrice}$</span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </AnimatedSection>

              {/* Short description */}
              <AnimatedSection delay={0.2}>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description.split('\n')[0]}
                </p>
              </AnimatedSection>

              {/* Main features */}
              <AnimatedSection delay={0.3}>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Key features:</h3>
                  <ul className="space-y-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-[#6819ce] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Quantity and add to cart */}
              <AnimatedSection delay={0.4}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-semibold">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="px-4 py-2 text-gray-600 hover:text-[#6819ce] transition-colors duration-200"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-gray-900 font-semibold min-w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="px-4 py-2 text-gray-600 hover:text-[#6819ce] transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#6819ce] text-white font-semibold py-4 px-8 rounded-lg hover:bg-[#008683] transition-colors duration-200 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to cart
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 border-2 border-[#6819ce] text-[#6819ce] font-semibold rounded-lg hover:bg-[#6819ce] hover:text-white transition-colors duration-200"
                    >
                      ♡
                    </motion.button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Extra info */}
              <AnimatedSection delay={0.5}>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Free shipping
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Warranty {product.warranty}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    30-day returns
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" />
                    </svg>
                    Expert support
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: details and reviews */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Tabs nav */}
          <AnimatedSection>
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-[#6819ce] text-[#008683]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'description' && 'Description'}
                    {tab === 'specifications' && 'Specifications'}
                    {tab === 'reviews' && `Reviews (${reviews.length})`}
                    {tab === 'shipping' && 'Shipping'}
                  </button>
                ))}
              </nav>
            </div>
          </AnimatedSection>

          {/* Tabs content */}
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'specifications' && (
              <motion.div
                key="specifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex border-b border-gray-100 py-3">
                      <span className="font-semibold text-gray-900 w-48 flex-shrink-0">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Rating summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-[#008683] mb-2">{product.rating}</div>
                        <div className="flex justify-center mb-2">
                          {renderStars(Math.floor(product.rating))}
                        </div>
                        <div className="text-gray-600">{product.reviewCount} reviews</div>
                      </div>
                      
                      {/* Rating distribution (static mock) */}
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 w-8">{stars}</span>
                            <svg className="w-4 h-4 text-amber-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#6819ce] h-2 rounded-full" 
                                style={{ width: `${(stars / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600 w-8 text-right">{(stars / 5 * 100).toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews list */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center mb-1">
                                <span className="font-semibold text-gray-900 mr-2">{review.user}</span>
                                {review.verified && (
                                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                    Verified purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <div className="flex mr-2">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>

                    {/* Review form (UI only) */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Leave a review</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your rating</label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                className="text-2xl text-gray-300 hover:text-amber-400 transition-colors duration-200"
                              >
                                ★
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Your comment</label>
                          <textarea
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                            placeholder="Share your experience with this product..."
                          ></textarea>
                        </div>
                        <button className="bg-[#6819ce] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#008683] transition-colors duration-200">
                          Publish my review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4 text-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900">Shipping information</h3>
                  <p>
                    Free standard shipping on all orders over a certain amount. Express delivery options are also available at checkout.
                  </p>
                  <p>
                    Orders are usually processed within 24–48 hours. Tracking information will be sent by email once your guitar has shipped.
                  </p>
                  <p>
                    For international shipping or special requests, please contact our support team for more details.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Related products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Similar products</h2>
              <p className="text-xl text-gray-600">Discover other guitars you might like</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <AnimatedSection key={relatedProduct.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => navigate(`/produit/${relatedProduct.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={relatedProduct.images?.[0] || relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#008683] transition-colors duration-200">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{relatedProduct.price}$</span>
                      <button className="bg-[#6819ce] text-white p-2 rounded-lg hover:bg-[#008683] transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
