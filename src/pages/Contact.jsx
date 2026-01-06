// pages/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import bgImage from "../../public/Brands/bg1.png";
import { Clock10, Facebook, Instagram, Linkedin, MailCheck, MapPlus, PhoneCall, X } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Sending simulation
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <PhoneCall className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />,
      title: 'Phone',
      details: '+33 1 23 45 67 89',
      subtitle: 'Mon-Fri: 9am–7pm • Sat: 10am–6pm',
      color: 'from-[#008683] to-[#008683]'
    },
    {
      icon: <MailCheck className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />,
      title: 'Email',
      details: 'contact@guitarshop.com',
      subtitle: 'Reply within 24h',
      color: 'from-[#008683] to-[#008683]'
    },
    {
      icon: <MapPlus className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />,
      title: 'Address',
      details: '123 Music Street',
      subtitle: '75001 Paris, France',
      color: 'from-[#008683] to-[#008683]'
    },
    {
      icon: <Clock10 className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />,
      title: 'Opening hours',
      details: 'Mon–Sat: 10am–7pm',
      subtitle: 'Sunday: Closed',
      color: 'from-[#008683] to-[#008683]'
    }
  ];

  const faqs = [
    {
      question: "Do you offer instrument trials?",
      answer: "Yes, our 6 showrooms are equipped so you can try all our instruments in optimal conditions."
    },
    {
      question: "What are your delivery times?",
      answer: "Free delivery within 48h in mainland France. Express 24h delivery available for an additional €9.90."
    },
    {
      question: "Do you offer financing?",
      answer: "Yes, payment in 3 installments with no fees from €300, and up to 10 installments with our financial partners."
    },
    {
      question: "Do you provide instrument maintenance?",
      answer: "We offer free setup and maintenance service for 1 year for all new instruments."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Contact */}
      <section className="relative py-20 overflow-hidden">
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
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 bg-amber-100 text-black rounded-full text-sm font-semibold mb-6"
              >
                <span className="w-2 h-2 bg-[#6819ce] rounded-full mr-2"></span>
                We’re here for you
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Contact <span className="text-[#6819ce]">Us</span>
              </h1>
              <p className="text-xl text-white mb-8">
                Have a question about our products? Need advice?  
                Our team of experts is ready to help.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we’ll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="information">Information request</option>
                      <option value="technical">Technical support</option>
                      <option value="quote">Quote</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6819ce] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Describe your request in detail..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#6819ce] to-[#6819ce] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send the message'
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </AnimatedSection>

            {/* Info and Map */}
            <div className="space-y-8">
              {/* Quick FAQ */}
              <AnimatedSection delay={0.3}>
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-start">
                          <span className="text-[#6819ce] mr-2">•</span>
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 text-sm pl-4">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Social Networks */}
              <AnimatedSection delay={0.4}>
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 text-white text-center">
                  <h3 className="text-xl font-bold mb-4">Follow us</h3>
                  <p className="text-gray-300 mb-4">
                    Stay connected and don’t miss our latest news
                  </p>
                  <div className="flex justify-center space-x-4">
                    {[
                      { name: 'Facebook', icon: <Facebook className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />, color: 'bg-blue-500' },
                      { name: 'Instagram', icon: <Instagram className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />, color: 'bg-pink-500' },
                      { name: 'YouTube', icon: <X className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />, color: 'bg-red-500' },
                      { name: 'Twitter', icon: <Linkedin className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />, color: 'bg-blue-400' }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
