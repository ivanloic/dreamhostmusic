// pages/Cart.jsx
import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    // If needed, a loading simulation can be added. For now, data comes from context (persisted in localStorage).
    setLoading(false);
  }, []);

  // updateQuantity and removeItem are provided by CartContext

  const applyCoupon = () => {
    setCouponError('');
    if (couponCode.toUpperCase() === 'MUSIC10') {
      setCouponApplied(true);
    } else {
      setCouponError('Invalid promo code');
    }
  };

  // clearCart provided by context

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = couponApplied ? subtotal * 0.1 : 0; // 10% discount
  const shipping = subtotal > 500 ? 0 : 29; // Free shipping over $500
  const tax = (subtotal - discount) * 0.03; // 3% VAT
  const total = subtotal - discount + shipping + tax;

  const savedAmount = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6819ce] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#6819ce] transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Cart</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your cart</h1>
              <span className="text-gray-600">
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''}
              </span>
            </div>
          </AnimatedSection>

          {cartItems.length === 0 ? (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Discover our selection of guitars and accessories to start shopping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/guitares')}
                    className="bg-[#6819ce] text-white font-semibold py-3 px-8 rounded-lg hover:bg-amber-600 transition-colors duration-200"
                  >
                    Browse guitars
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="border-2 border-[#6819ce] text-[#6819ce] font-semibold py-3 px-8 rounded-lg hover:bg-[#6819ce] hover:text-white transition-colors duration-200"
                  >
                    Back to home
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items list */}
              <div className="lg:col-span-2">
                <AnimatedSection>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Items</h3>
                        <button
                          onClick={clearCart}
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                        >
                          Empty cart
                        </button>
                      </div>
                    </div>

                    {/* Products list */}
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b border-gray-100 last:border-b-0"
                        >
                          <div className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                              {/* Image */}
                              <div className="flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                                />
                              </div>

                              {/* Product details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <Link
                                      to={`/produit/${item.productId}`}
                                      className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors duration-200 line-clamp-2"
                                    >
                                      {item.name}
                                    </Link>
                                    <p className="text-[#6819ce] font-medium text-sm mt-1">{item.brand}</p>
                                    <p className="text-green-600 text-sm mt-1">{item.delivery}</p>
                                    
                                    {!item.inStock && (
                                      <p className="text-red-500 text-sm mt-1">Out of stock</p>
                                    )}
                                  </div>

                                  {/* Price */}
                                  <div className="text-right">
                                    <div className="flex items-baseline gap-2">
                                      <span className="text-xl font-bold text-gray-900">
                                        {item.price}$
                                      </span>
                                      {item.originalPrice && (
                                        <span className="text-lg text-gray-500 line-through">
                                          {item.originalPrice}$
                                        </span>
                                      )}
                                    </div>
                                    {item.originalPrice && (
                                      <div className="text-green-600 text-sm font-medium mt-1">
                                        You save {(item.originalPrice - item.price)}$
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Quantity controls and actions */}
                                <div className="flex items-center justify-between mt-4">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-600">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                      <button
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="px-3 py-1 text-gray-600 hover:text-[#6819ce] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                      >
                                        -
                                      </button>
                                      <span className="px-3 py-1 text-gray-900 font-semibold min-w-12 text-center">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        disabled={item.quantity >= item.maxStock}
                                        className="px-3 py-1 text-gray-600 hover:text-[#6819ce] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                      >
                                        +
                                      </button>
                                    </div>
                                    {item.quantity >= item.maxStock && (
                                      <span className="text-xs text-red-500">Maximum stock reached</span>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => removeItem(item.productId)}
                                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2"
                                  >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>

                {/* Security banner */}
                <AnimatedSection delay={0.2}>
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-blue-900 mb-2">Secure payment</h4>
                        <p className="text-blue-700">
                          Your data is protected with 256-bit SSL encryption. 
                          We accept credit cards, PayPal and bank transfers.
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <AnimatedSection delay={0.3}>
                  <div className="bg-white rounded-2xl shadow-lg sticky top-24">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-900">Order summary</h3>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Savings */}
                      {savedAmount > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-green-800 font-medium">Total savings</span>
                            <span className="text-green-800 font-bold">-{savedAmount}$</span>
                          </div>
                        </div>
                      )}

                      {/* Promo code */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Promo code</label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter your code"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                            disabled={couponApplied}
                          />
                          <button
                            onClick={applyCoupon}
                            disabled={couponApplied || !couponCode}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-red-500 text-sm">{couponError}</p>
                        )}
                        {couponApplied && (
                          <p className="text-green-500 text-sm">Promo code applied!</p>
                        )}
                      </div>

                      {/* Price details */}
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <span>{subtotal.toFixed(2)}$</span>
                        </div>
                        
                        {couponApplied && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount (-10%)</span>
                            <span>-{discount.toFixed(2)}$</span>
                          </div>
                        )}

                        <div className="flex justify-between text-gray-600">
                          <span>Shipping fees</span>
                          <span>{shipping === 0 ? 'Free' : `${shipping}$`}</span>
                        </div>

                        <div className="flex justify-between text-gray-600">
                              <span>VAT (3%)</span>
                              <span>{tax.toFixed(2)}$</span>
                            </div>

                        {/* Free shipping info */}
                        {subtotal < 500 && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <p className="text-amber-800 text-sm text-center">
                              Add {(500 - subtotal).toFixed(2)}€ to get free shipping!
                            </p>
                          </div>
                        )}

                        {/* Total */}
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                          <span>Total</span>
                          <span>{total.toFixed(2)}€</span>
                        </div>

                        {/* Savings */}
                        {savedAmount > 0 && (
                          <div className="text-center text-green-600 text-sm">
                            You are saving {savedAmount}€ on this order
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="space-y-3 pt-4">
                        <button
                          onClick={() => navigate('/checkout', { state: {
                            cartItems,
                            subtotal,
                            discount,
                            shipping,
                            tax,
                            total,
                            couponApplied
                          } })}
                          className="w-full bg-[#6819ce] text-white font-semibold py-4 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                          Proceed to checkout
                        </button>
                        
                        <button
                          onClick={() => navigate('/guitares')}
                          className="w-full border-2 border-[#6819ce] text-[#6819ce] font-semibold py-3 px-6 rounded-lg hover:bg-[#6819ce] hover:text-white transition-colors duration-200"
                        >
                          Continue shopping
                        </button>
                      </div>

                      {/* Guarantees */}
                      <div className="pt-4 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          100% secure payment
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          Free shipping from 500€
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          30-day returns
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
