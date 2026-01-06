// pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import Brands from '../components/Brands';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <WhyChooseUs />
      <FeaturedProducts />
      <Brands />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;