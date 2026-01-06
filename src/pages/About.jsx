// pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import AboutHero from '../components/AboutHero';
import bgImage from "../../public/Brands/bg3.png";

const About = () => {
  const timeline = [
    {
      year: '1999',
      title: 'Creation of GuitarShop',
      description: 'Opening of our first store in Paris with a shared passion for music.',
      icon: '🎸'
    },
    {
      year: '2005',
      title: 'National Expansion',
      description: 'Opening of 3 new showrooms in Lyon, Marseille and Bordeaux.',
      icon: '🚀'
    },
    {
      year: '2012',
      title: 'E-commerce Launch',
      description: 'Development of our online platform to serve all of France.',
      icon: '💻'
    },
    {
      year: '2018',
      title: 'Training Center',
      description: 'Creation of our music school and training workshops.',
      icon: '🎓'
    },
    {
      year: '2023',
      title: 'Technological Innovation',
      description: 'Launch of our mobile app and augmented reality.',
      icon: '📱'
    }
  ];

  const team = [
    {
      name: 'Mark johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: '25 years of experience in the music world. Former professional guitarist.',
      specialties: ['Electric Guitars', 'Strategy']
    },
    {
      name: 'Sophie Lambert',
      role: 'Artistic Director',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Graduate of the Paris Conservatory. Passionate about musical innovation.',
      specialties: ['Product Selection', 'Artist Relations']
    },
    {
      name: 'Thomas Dubois',
      role: 'Technical Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Expert in setup and maintenance. Certified trainer for major brands.',
      specialties: ['Setup', 'Maintenance', 'Training']
    },
    {
      name: 'Marie Curie',
      role: 'Customer Relations Manager',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Attentive to your needs to offer you the best solutions.',
      specialties: ['Customer Support', 'Personalized Advice']
    }
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Music is our reason for being. We share this passion with every customer.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'We stay at the cutting edge of new technologies and musical trends.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Transparent and long-lasting relationships with our customers and partners.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🎯',
      title: 'Excellence',
      description: 'We aim for perfection in every aspect of our service.',
      color: 'from-[#6819ce] to-orange-500'
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to an eco-responsible and community-minded approach.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🎵',
      title: 'Sharing',
      description: 'We believe in the unifying power of music.',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const achievements = [
    { number: '25+', label: 'Years of Experience' },
    { number: '15K+', label: 'Satisfied Customers' },
    { number: '500+', label: 'Partner Brands' },
    { number: '6', label: 'Showrooms in France' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <AboutHero/>
      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our <span className="text-[#6819ce]">Story</span>
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    It all began with a passion for authentic sound and the instruments that have marked generations. Founded by passionate musicians and collectors, Great Host Music was born from the desire to bring musical legends back to life through carefully selected vintage guitars, amps and drums.
                  </p>
                  <p>
                    Since the beginning, our mission has been simple: to offer artists, collectors and lovers of beautiful tones exceptional instruments, full of history and character.
                  </p>
                  <p>
                    Every piece that enters Great Host Music is inspected, restored and tested with care by our experts to guarantee a unique experience, faithful to the spirit of the era.
                    At our place, it is not just about buying an instrument, but about joining a community of enthusiasts who celebrate the beauty of vintage sound.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
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
                <div className="rounded-2xl p-8 text-white relative z-20">
                  <div className="text-6xl mb-4">🎵</div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-white leading-relaxed">
                    "Making music accessible to everyone by offering quality instruments 
                    and personalized support so every enthusiast can express 
                    their talent and fully live their passion."
                  </p>
                  <div className="mt-6 text-right">
                    <p className="font-semibold">Mark johnson</p>
                    <p className="text-amber-200 text-sm">Founder & CEO</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#6819ce] rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-[#6819ce]">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Vintage spirit and love for true sound guide everything we do
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎸",
                title: "Authenticity",
                color: "from-purple-500 to-indigo-500",
                description:
                  "Every instrument tells a story. We choose our pieces for their soul, character and unique sound, true to the spirit of the era."
              },
              {
                icon: "🛠️",
                title: "Craftsmanship",
                color: "from-amber-500 to-orange-500",
                description:
                  "Our instruments are restored and maintained with care by enthusiasts. No mass production, only precise and respectful work."
              },
              {
                icon: "💬",
                title: "Closeness with musicians",
                color: "from-green-500 to-emerald-500",
                description:
                  "We believe in a direct and honest relationship with our community. Every piece of advice, every exchange helps create a real musical connection."
              },
              {
                icon: "🌍",
                title: "Sustainability",
                color: "from-blue-500 to-cyan-500",
                description:
                  "Bringing old instruments back to life is also a gesture for the planet. Less waste, more durable and responsible music."
              },
              {
                icon: "🔥",
                title: "Passion for vintage",
                color: "from-rose-500 to-pink-500",
                description:
                  "Our love for vintage goes beyond aesthetics: it is a tribute to a time when every instrument was built to last and inspire."
              },
              {
                icon: "🎶",
                title: "Sharing and inspiration",
                color: "from-teal-500 to-sky-500",
                description:
                  "We want to inspire a new generation of musicians to rediscover the charm, warmth and power of analog sound."
              }
            ].map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Social / Community Commitment */}
      <section className="py-20 text-white relative">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Dark vintage overlay */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900/95 to-[#1a0f2e]/95"
          style={{
            backdropFilter: "blur(2px)",
          }}
        />

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-[#a47cff]">Commitment</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                At <span className="font-semibold text-white">Great Host Music</span>, 
                we believe vintage music is not just about old instruments, 
                but a philosophy: preserve, pass on and inspire.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: "♻️",
                  title: "Preserving musical heritage",
                  description:
                    "Every restored guitar and drum is a way to revive an era and protect a unique sonic legacy."
                },
                {
                  icon: "🛠️",
                  title: "Responsible restoration",
                  description:
                    "We favor artisanal repairs, durable parts and environmentally respectful materials."
                },
                {
                  icon: "🎶",
                  title: "Sharing and community",
                  description:
                    "We support young musicians and independent studios by offering them vintage instruments at accessible prices."
                }
              ].map((engagement, index) => (
                <AnimatedSection key={index} delay={0.3 + index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <div className="text-4xl mb-4">{engagement.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {engagement.title}
                    </h3>
                    <p className="text-gray-300">{engagement.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Join the Adventure?
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-xl text-gray-600 mb-8">
                Whether you are a beginner or a professional, we have the instrument 
                and the advice you need.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#6819ce] to-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300"
                >
                  Meet Us
                </motion.a>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#6819ce] text-[#6819ce] font-semibold py-4 px-8 rounded-lg hover:bg-[#6819ce] hover:text-white transition-all duration-300"
                >
                  Discover our Products
                </motion.a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
