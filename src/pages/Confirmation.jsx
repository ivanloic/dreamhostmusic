// pages/Confirmation.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Try to read the order from location.state then from localStorage
  const navOrder = location.state?.order;
  let storedOrder = null;
  try {
    storedOrder = JSON.parse(localStorage.getItem('lastOrder') || 'null');
  } catch (e) {
    storedOrder = null;
  }

  const [pendingOrder, setPendingOrder] = useState(null);
  useEffect(() => {
    try {
      const p = localStorage.getItem('pendingOrder');
      if (p) setPendingOrder(JSON.parse(p));
    } catch (e) {
      // ignore
    }
  }, []);

  const order = navOrder ?? storedOrder ?? pendingOrder ?? null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: order?.orderNumber ?? '',
    amountPaid: order?.total ? String(order.total) : '',
    message: ''
  });
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // If no order is provided, keep a simple fallback
  const orderDetails = order ?? {
    orderNumber: '—',
    date: new Date().toLocaleDateString(),
    total: '0.00',
    paymentMethod: order?.paymentMethod ?? '—',
    status: 'Awaiting payment',
    items: [],
    shippingAddress: {},
    billingAddress: {}
  };

  // If an order comes from navigation, clear 'lastOrder' from localStorage after display
  useEffect(() => {
    if (navOrder) {
      try { localStorage.removeItem('lastOrder'); } catch (e) { /* ignore */ }
    }
  }, [navOrder]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1500);
  };

  const downloadInvoice = () => {
    // Simulate invoice download
    console.log('Downloading invoice...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white ">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-[#6819ce] transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <Link to="/panier" className="hover:text-[#6819ce] transition-colors duration-200">
              Cart
            </Link>
            <span>/</span>
            <Link to="/checkout" className="hover:text-[#6819ce] transition-colors duration-200">
              Checkout
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Confirmation</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Confirmation header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Thank you for your order!
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your order has been received and is awaiting payment.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Apple Pay instructions */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">🍎</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Pay with Apple Pay</h2>
                    <p className="text-gray-600">Follow these steps to complete your payment</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Payment steps */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-[#6819ce] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Open Apple Pay on your device</h3>
                        <p className="text-gray-600 text-sm">
                          On iPhone, open the Wallet app. On Mac, click the Apple Pay icon.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-[#6819ce] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Send the full payment to:</h3>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900 text-center">312-414-4921</p>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">
                          Make sure you send exactly <strong>{orderDetails.total}€</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-[#6819ce] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Fill in the confirmation form</h3>
                        <p className="text-gray-600 text-sm">
                          Once the payment is sent, complete the form below to let us know.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Important info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Important</h4>
                        <p className="text-blue-700 text-sm">
                          Your order will only be processed after your payment and confirmation are received.
                          You will receive a confirmation email once the payment is verified.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Confirmation form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm your payment</h2>

                  {pendingOrder && pendingOrder.paymentMethod === 'paypal' && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="mb-2 text-gray-700">We detected a pending PayPal order. Please complete the payment using the PayPal link and click the button below once you've paid.</p>
                      <p className="font-mono text-sm bg-white p-2 rounded border mb-3 truncate">{pendingOrder.paypalLink}</p>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            try { localStorage.removeItem('pendingOrder'); } catch (e) {}
                            const paidOrder = { ...pendingOrder, status: 'Paid via PayPal' };
                            try { localStorage.setItem('lastOrder', JSON.stringify(paidOrder)); } catch (e) {}
                            setFormData({ ...formData, orderNumber: paidOrder.orderNumber, amountPaid: String(paidOrder.total) });
                            setIsSubmitted(true);
                            setPendingOrder(null);
                          }}
                          className="bg-green-600 text-white px-6 py-3 rounded-lg"
                        >
                          ✅ PayPal payment received - Confirm order
                        </button>
                        <button
                          onClick={() => {
                            window.open(pendingOrder.paypalLink, '_blank');
                          }}
                          className="bg-white border rounded-lg px-4 py-3"
                        >
                          Open PayPal link
                        </button>
                      </div>
                    </div>
                  )}
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Order number *
                        </label>
                        <input
                          type="text"
                          name="orderNumber"
                          required
                          value={formData.orderNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300 bg-gray-50"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount paid *
                        </label>
                        <input
                          type="text"
                          name="amountPaid"
                          required
                          value={formData.amountPaid}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                          placeholder="2599.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message (optional)
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        placeholder="Additional information..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment screenshot *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors duration-200">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="screenshot"
                          required
                        />
                        <label htmlFor="screenshot" className="cursor-pointer">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-gray-600 mb-2">
                            {screenshot ? screenshot.name : 'Click to upload a screenshot'}
                          </p>
                          <p className="text-gray-500 text-sm">
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </label>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#6819ce] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#13336d] transition-colors duration-200"
                    >
                      Confirm payment submission
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmation sent!</h3>
                    <p className="text-gray-600 mb-6">
                      We have received your payment confirmation.
                      Your order will be processed as soon as possible.
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="bg-[#6819ce] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#13336d] transition-colors duration-200"
                    >
                      Back to home
                    </button>
                  </motion.div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Order details */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">Order details</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* General information */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Order summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order number:</span>
                        <span className="font-semibold">#{orderDetails.orderNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-semibold">{orderDetails.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-semibold text-[#13336d]">{orderDetails.total}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment method:</span>
                        <span className="font-semibold">{orderDetails.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {orderDetails.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping address */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Shipping address</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>{orderDetails.shippingAddress.name}</p>
                      <p>{orderDetails.shippingAddress.address}</p>
                      <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.zipCode}</p>
                      <p>{orderDetails.shippingAddress.country}</p>
                    </div>
                  </div>

                  {/* Billing address */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Billing address</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>{orderDetails.billingAddress.name}</p>
                      <p>{orderDetails.billingAddress.address}</p>
                      <p>{orderDetails.billingAddress.city}, {orderDetails.billingAddress.zipCode}</p>
                      <p>{orderDetails.billingAddress.country}</p>
                    </div>
                  </div>
                </div>

                {/* Order items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Ordered items</h3>
                  <div className="space-y-4">
                    {orderDetails.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-[#6819ce] text-sm">{item.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{item.quantity} x {item.price}€</p>
                          <p className="text-lg font-bold text-gray-900">{(item.price * item.quantity).toFixed(2)}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Extra actions */}
          <AnimatedSection delay={0.4}>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={downloadInvoice}
                className="bg-white border border-gray-300 rounded-2xl p-6 text-center hover:border-[#6819ce] hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition-colors duration-200">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-[#13336d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Download invoice</h4>
                <p className="text-gray-600 text-sm">Detailed PDF of your order</p>
              </button>

              <Link
                to="/guitares"
                className="bg-white border border-gray-300 rounded-2xl p-6 text-center hover:border-[#6819ce] hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition-colors duration-200">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-[#13336d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Continue shopping</h4>
                <p className="text-gray-600 text-sm">Discover more instruments</p>
              </Link>

              <Link
                to="/contact"
                className="bg-white border border-gray-300 rounded-2xl p-6 text-center hover:border-[#6819ce] hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition-colors duration-200">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-[#13336d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Customer support</h4>
                <p className="text-gray-600 text-sm">Any questions about your order?</p>
              </Link>
            </div>
          </AnimatedSection>

          {/* Order timeline */}
          <AnimatedSection delay={0.5}>
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order tracking</h3>
              <div className="space-y-4">
                {[
                  { status: 'Order received', description: 'Your order has been recorded', date: 'Today, 14:30', active: true },
                  { status: 'Payment pending', description: 'Waiting for Apple Pay payment confirmation', date: 'Next', active: false },
                  { status: 'Processing', description: 'Your order is being prepared', date: '', active: false },
                  { status: 'Shipped', description: 'Your order has been shipped', date: '', active: false },
                  { status: 'Delivered', description: 'Your order has been delivered', date: '', active: false }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.active ? 'bg-[#6819ce]' : 'bg-gray-300'
                    }`}>
                      {step.active ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-white text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className={`flex-1 pb-4 ${index < 4 ? 'border-b border-gray-200' : ''}`}>
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${step.active ? 'text-[#13336d]' : 'text-gray-500'}`}>
                          {step.status}
                        </h4>
                        {step.date && (
                          <span className="text-sm text-gray-500">{step.date}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
