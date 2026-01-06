// components/Testimonials.jsx
import React from 'react';
import AnimatedSection from './AnimatedSection';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'Professional Musician',
      content: 'The quality of the guitars is exceptional. Customer service is responsive and professional. I highly recommend them!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Thomas Martin',
      role: 'Studio Guitarist',
      content: 'I found the Gibson of my dreams at an unbeatable price. Fast delivery and a perfectly set up instrument.',
      rating: 5
    },
    {
      id: 3,
      name: 'Sophie Lambert',
      role: 'Guitar Teacher',
      content: 'Perfect for equipping my music school. Wide selection and excellent value for money.',
      rating: 4,
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              They <span className="text-[#6819ce]">Trust Us</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what our happy customers have to say
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.2}>
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                {/* Rating */}
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-700 text-lg mb-6 italic">"{testimonial.content}"</p>
                
                {/* Author */}
                <div className="flex items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-[#6819ce] text-sm">{testimonial.role}</p>
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

export default Testimonials;
