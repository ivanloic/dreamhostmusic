// pages/Checkout.jsx
import React, { useState, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CountriesAndRegions from '../data/CountriesAndRegions';

const Checkout = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('contact');
  const [isGuest, setIsGuest] = useState(true);
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // Form states
  const [contactInfo, setContactInfo] = useState({
    email: '',
    newsletter: true
  });

  const [billingAddress, setBillingAddress] = useState({
    country: 'France',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const [shippingAddress, setShippingAddress] = useState({
    country: 'France',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  // Default to PayPal while card and Apple Pay are unavailable
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const location = useLocation();
  const { cartItems: contextCartItems, clearCart } = useContext(CartContext);

  // If nav state includes cart summary (from Cart page), prefer it. Otherwise compute from context.
  const navState = location.state || {};

  const cartItems = navState.cartItems ?? contextCartItems ?? [];

  // Calculations (prefer totals passed in state when available)
  const subtotal = navState.subtotal ?? cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = navState.discount ?? 0;
  const shipping = navState.shipping ?? (subtotal > 500 ? 0 : 29);
  // VAT set to 3%
  const tax = navState.tax ?? ((subtotal - (discount || 0)) * 0.03);
  const total = navState.total ?? (subtotal - (discount || 0) + shipping + tax);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setActiveSection('shipping');
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setActiveSection('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Build order object (même logique existante)
    const orderNumber = `ORD-${Date.now()}`;
    const order = {
      orderNumber,
      date: new Date().toLocaleString(),
      total: Number(total.toFixed(2)),
      paymentMethod,
      status: 'Redirected to PayPal',
      items: cartItems.map(i => ({ 
        productId: i.productId, 
        name: i.name, 
        price: i.price, 
        quantity: i.quantity, 
        image: i.image, 
        brand: i.brand 
      })),
      shippingAddress: {
        name: `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim(),
        ...shippingAddress
      },
      billingAddress: {
        name: `${billingAddress.firstName || ''} ${billingAddress.lastName || ''}`.trim(),
        ...billingAddress
      },
      contact: contactInfo,
      paypalLink: `https://www.paypal.me/Fxstudio712/${total.toFixed(2)}`
    };

    // Sauvegarde locale
    try {
      localStorage.setItem('pendingOrder', JSON.stringify(order));
    } catch (err) {
      console.warn('Unable to save order locally', err);
    }

    // Redirection PayPal IMMÉDIATE si PayPal sélectionné
    if (paymentMethod === 'paypal') {
      const paypalUrl = `https://www.paypal.me/Fxstudio712/${total.toFixed(2)}`;
      window.open(paypalUrl, '_blank', 'width=600,height=700');
      
      // Message de confirmation + instructions
      alert(`Redirection vers PayPal...\n\nPlease send ${total.toFixed(2)}$ to:\n${paypalUrl}\n\nAfter payment, come back here to confirm!`);
      
      // Ne pas naviguer vers confirmation tant que paiement non confirmé
      return;
    }

    // Pour les autres méthodes (simulation)
    setTimeout(() => {
      navigate('/confirmation', { state: { order } });
      clearCart && clearCart();
    }, 1200);
  };

  const copyBillingToShipping = () => {
    setShippingAddress({ ...billingAddress });
  };

  // Mark availability per method - only PayPal is available for now
  const paymentOptions = [
    { id: 'card', label: 'Credit card', icon: '/pay/card.png', available: false },
    { id: 'paypal', label: 'PayPal', icon: '/pay/paypal.png', available: true },
    { id: 'apple', label: 'Apple Pay', icon: '/pay/apple-pay.png', available: false },
  ];

  const selectedMethod = paymentOptions.find((m) => m.id === paymentMethod);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => navigate('/')} className="hover:text-[#6819ce] transition-colors duration-200">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigate('/panier')} className="hover:text-[#6819ce] transition-colors duration-200">
              Cart
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-2 md:space-y-0">
            {[
              { id: 'contact', label: 'Contact', number: 1 },
              { id: 'shipping', label: 'Shipping', number: 2 },
              { id: 'payment', label: 'Payment', number: 3 }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center md:flex-row flex-col text-center md:text-left">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm mb-1 md:mb-0 ${
                  activeSection === step.id 
                    ? 'bg-[#6819ce] border-[#6819ce] text-white' 
                    : activeSection > step.id || (index === 0 && activeSection === 'contact')
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {activeSection > step.id || (index === 0 && activeSection === 'contact') ? '✓' : step.number}
                </div>
                <span className={`md:ml-2 font-medium ${
                  activeSection === step.id ? 'text-[#13336d]' : 'text-gray-600'
                }`}>
                  {step.label}
                </span>
                {index < 2 && (
                  <div className={`hidden md:block w-16 h-0.5 mx-4 ${
                    activeSection > step.id ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main form */}
          <div>
            {/* Contact section */}
            {activeSection === 'contact' && (
              <AnimatedSection>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Contact information</h2>
                    {activeSection === 'contact' && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-[#6819ce] rounded-full mr-2"></div>
                        In progress
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleContactSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          We will use this email to send you your order details and updates.
                        </p>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isGuest}
                          onChange={(e) => setIsGuest(e.target.checked)}
                          className="w-4 h-4 text-[#6819ce] border-gray-300 rounded focus:ring-[#6819ce]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          You are placing an order as a guest
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={contactInfo.newsletter}
                          onChange={(e) => setContactInfo({ ...contactInfo, newsletter: e.target.checked })}
                          className="w-4 h-4 text-[#6819ce] border-gray-300 rounded focus:ring-[#6819ce]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Subscribe to the newsletter to receive exclusive offers
                        </label>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full bg-[#6819ce] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#13336d] transition-colors duration-200"
                        >
                          Continue to shipping
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            )}

            {/* Billing address section */}
            {activeSection === 'shipping' && (
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Billing address</h2>
                    {activeSection === 'shipping' && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-[#6819ce] rounded-full mr-2"></div>
                        In progress
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">
                    Enter the billing address that matches your payment method.
                  </p>

                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country/Region *
                        </label>
                        <select
                          required
                          value={billingAddress.country}
                          onChange={(e) => {
                            const selectedCountry = e.target.value;
                            setBillingAddress({ ...billingAddress, country: selectedCountry, state: '' });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select a country</option>
                          {CountriesAndRegions.map((item) => (
                            <option key={item.country} value={item.country}>
                              {item.country}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First name *
                          </label>
                          <input
                            type="text"
                            required
                            value={billingAddress.firstName}
                            onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last name *
                          </label>
                          <input
                            type="text"
                            required
                            value={billingAddress.lastName}
                            onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={billingAddress.address}
                          onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                          placeholder="Street name and number"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <button type="button" className="text-[#6819ce] hover:text-[#13336d]">
                            + Add apartment, suite, etc.
                          </button>
                        </label>
                        <input
                          type="text"
                          value={billingAddress.apartment}
                          onChange={(e) => setBillingAddress({ ...billingAddress, apartment: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={billingAddress.city}
                          onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State/Region *
                        </label>
                        <select
                          required
                          value={billingAddress.state}
                          onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        >
                          <option value="">Select a region</option>
                          {CountriesAndRegions.find((item) => item.country === billingAddress.country)?.regions.map((region) => (
                            <option key={region} value={region}>
                              {region}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal code *
                        </label>
                        <input
                          type="text"
                          required
                          value={billingAddress.zipCode}
                          onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          value={billingAddress.phone}
                          onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Different shipping address */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          checked={sameAsBilling}
                          onChange={(e) => {
                            setSameAsBilling(e.target.checked);
                            if (e.target.checked) {
                              copyBillingToShipping();
                            }
                          }}
                          className="w-4 h-4 text-[#6819ce] border-gray-300 rounded focus:ring-[#6819ce]"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Shipping address is the same as billing address
                        </label>
                      </div>

                      {!sameAsBilling && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4">Shipping address</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Shipping address *
                              </label>
                              <input
                                type="text"
                                required
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                              />
                            </div>
                            {/* Add other shipping address fields here */}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        className="w-full bg-[#6819ce] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#13336d] transition-colors duration-200"
                      >
                        Continue to payment
                      </button>
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            )}

            {/* Payment section */}
            {activeSection === 'payment' && (
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Payment method</h2>
                    {activeSection === 'payment' && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-[#6819ce] rounded-full mr-2"></div>
                        In progress
                      </div>
                    )}
                  </div>

                  <form onSubmit={handlePaymentSubmit}>
                    {/* Payment options */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      {paymentOptions.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => method.available && setPaymentMethod(method.id)}
                          disabled={!method.available}
                          aria-disabled={!method.available}
                          title={!method.available ? 'Currently unavailable' : undefined}
                          className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                            paymentMethod === method.id
                              ? 'border-[#6819ce] bg-amber-50'
                              : 'border-gray-200 hover:border-amber-300'
                          } ${!method.available ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                        >
                          <div className="flex flex-col items-center">
                            <img src={method.icon} alt={method.label} className="h-10 mb-2" />
                            <div className="font-medium text-gray-900">{method.label}{!method.available && ' (Unavailable)'}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Card form */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card number *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name on card *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                            placeholder="JOHN DOE"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry date *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                              placeholder="MM/YY"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-[#6819ce] border-gray-300 rounded focus:ring-[#6819ce]"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            Save this card for future purchases
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Other payment methods */}
                    {paymentMethod !== 'card' && (
                      <div className="text-center py-8">
                        <div className="mb-4">
                          {selectedMethod && (
                            <img src={selectedMethod.icon} alt={selectedMethod.label} className="h-16 mb-2 mx-auto" />
                          )}
                        </div>
                        <p className="text-gray-600">
                          You will be redirected to <span className="inline-flex items-center">{selectedMethod?.label}</span> to complete your payment.
                        </p>
                      </div>
                    )}

                    {/* PayPal extra UI */}
                    {paymentMethod === 'paypal' && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200 mb-6">
                        <div className="text-center mb-6">
                          <img src="/pay/paypal.png" alt="PayPal" className="h-16 mx-auto mb-4" />
                          <h3 className="text-xl font-bold text-gray-900 mb-2">PayPal - Instant</h3>
                          <p className="text-blue-700">Secure payment, accepted worldwide</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-semibold">Amount to pay</span>
                            <span className="text-2xl font-bold text-[#6819ce]">{total.toFixed(2)}$</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            You will be redirected to PayPal to pay this exact amount.
                          </p>
                          
                          {/* Link preview */}
                          <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <p className="text-xs text-gray-500 mb-1">PayPal link :</p>
                            <div className="font-mono text-sm bg-white p-2 rounded border truncate">
                              paypal.me/Fxstudio712/{total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security */}
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-green-800 font-medium">100% secure payment</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        Your data is encrypted and protected. Your card details are never stored.
                      </p>
                    </div>

                    <div className="pt-6">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
                      >
                        Pay {total.toFixed(2)}$
                      </motion.button>
                      
                      <p className="text-center text-sm text-gray-500 mt-3">
                        By clicking "Pay", you agree to our{' '}
                        <button type="button" className="text-[#6819ce] hover:text-[#13336d]">
                          terms and conditions
                        </button>{' '}
                        and our{' '}
                        <button type="button" className="text-[#6819ce] hover:text-[#13336d]">
                          privacy policy
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Order summary */}
          <div>
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-2xl shadow-lg sticky top-24">
                <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Order summary</h3>
                </div>

                <div className="p-6">
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-[#6819ce] text-xs">{item.brand}</p>
                          <p className="text-gray-500 text-xs">{item.quantity} x {item.price}$</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {(item.price * item.quantity).toFixed(2)}$
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price details */}
                  <div className="space-y-3 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{subtotal.toFixed(2)}$</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `${shipping}$`}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>VAT (3%)</span>
                      <span>{tax.toFixed(2)}$</span>
                    </div>

                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                      <span>Total</span>
                      <span>{total.toFixed(2)}$</span>
                    </div>
                  </div>

                  {/* Guarantees */}
                  <div className="mt-6 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      30-day money-back guarantee
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Free shipping from $500 purchase
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-[#6819ce] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Customer support 7 days a week
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
