import React from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';
import bgImage from "../../public/Brands/bg2.png";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: '🎸',
      title: 'Sélection Authentique',
      description:
        'Chaque guitare, ampli ou batterie est choisi pour son caractère, son histoire et son authenticité. Pas de copies, uniquement du vrai vintage.',
      stats: '100% authentique',
    },
    {
      id: 2,
      icon: '🛠️',
      title: 'Restauration Artisanale',
      description:
        'Nos instruments sont inspectés, restaurés et réglés à la main par des passionnés. Chaque détail compte pour retrouver le son d’origine.',
      stats: 'Fait main',
    },
    {
      id: 3,
      icon: '🚚',
      title: 'Livraison Sûre & Soignée',
      description:
        'Nous expédions chaque instrument dans un emballage renforcé, testé et protégé, avec suivi complet et assurance.',
      stats: 'Protection totale',
    },
    {
      id: 4,
      icon: '💬',
      title: 'Conseils de Passionnés',
      description:
        'Nous ne sommes pas de simples vendeurs : nous jouons, testons et partageons nos coups de cœur avec vous, en toute transparence.',
      stats: 'Support humain',
    },
    {
      id: 5,
      icon: '💳',
      title: 'Paiement Sécurisé',
      description:
        'Toutes vos transactions sont protégées par un cryptage SSL et peuvent être échelonnées sans frais.',
      stats: 'Paiement 3x',
    },
    {
      id: 6,
      icon: '⭐',
      title: 'Satisfaction Garantie',
      description:
        'Vous avez 14 jours pour tester votre instrument. Si le son ou le feeling ne vous convainc pas, on le reprend sans discussion.',
      stats: '14 jours test',
    },
  ];

  const stats = [
    { number: '500+', label: 'Instruments Vintage' },
    { number: '98%', label: 'Clients Satisfaits' },
    { number: '7/7', label: 'Support Passionné' },
    { number: '100%', label: 'Authenticité Garantie' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs vintage */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4"
            >
              <span className="w-2 h-2 bg-[#6819ce] rounded-full mr-2"></span>
              Une Passion Avant Tout
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi <span className="text-[#6819ce]">Great Host Music</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parce que chaque instrument vintage mérite une seconde vie — et chaque musicien mérite une expérience unique.
            </p>
          </div>
        </AnimatedSection>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <AnimatedSection>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Le Son du Passé, Pour la Musique d’Aujourd’hui
              </h3>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-lg text-gray-600 mb-8">
                Chez <span className="font-semibold">Great Host Music</span>, 
                nous ne faisons pas de volume, nous faisons de la passion. 
                Nous croyons qu’un instrument vintage doit raconter une histoire, 
                vibrer d’authenticité et inspirer à chaque accord.
              </p>
            </AnimatedSection>

            <div className="space-y-4">
              {[
                'Instruments 100% originaux et vérifiés',
                'Restauration soignée dans nos ateliers partenaires',
                'Conseils personnalisés avant et après achat',
                'Livraison sécurisée et suivie partout',
                'Garantie de satisfaction ou remboursement',
              ].map((advantage, index) => (
                <AnimatedSection key={index} delay={0.2 + index * 0.1}>
                  <motion.div
                    whileHover={{ x: 10 }}
                    className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-[#6819ce] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{advantage}</span>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Carte statistiques */}
          <AnimatedSection delay={0.3}>
            <div className=" rounded-2xl p-8 text-white shadow-xl relative">
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
              <h4 className="text-2xl font-bold mb-6 text-center relative z-20">Notre Impact</h4>
              <div className="grid grid-cols-2 gap-6 relative z-20">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm"
                  >
                    <div className="text-2xl md:text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-black ">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Barre de progression confiance */}
              <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm relative z-20">
                <div className="flex justify-between text-sm mb-2">
                  <span>Niveau de Confiance Client</span>
                  <span>98%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '98%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="bg-[#008683] h-2 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Grille des fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer"
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-[#008683] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-[#6819ce] text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {feature.stats}
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
