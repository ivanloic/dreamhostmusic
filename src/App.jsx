// App.jsx (version mise à jour)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Guitars from './pages/Guitars';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';
import Drums from './pages/Drums';
import AddGuitarForm from './components/AddGuitarForm';
import Amplifiers from './pages/Amplifier';
import Perdals from './pages/Perdals';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guitares" element={<Guitars />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/Drums" element={<Drums />} />
          <Route path="/AddGuitarForm" element={<AddGuitarForm />} />
          <Route path="/Amplifier" element={<Amplifiers />} />
          <Route path="/Perdals" element={<Perdals />} />
        </Routes>
        <Footer />

        {/* Floating Go to Top button */}
        <GoToTop />
      </div>
    </Router>
  );
}

function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      aria-label="Go to top"
      title="Go to top"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#008683] text-white flex items-center justify-center shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-[#008683]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default App;
