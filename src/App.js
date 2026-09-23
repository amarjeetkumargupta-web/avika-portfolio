import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import ExpertiseDetail from './pages/ExpertiseDetail';
import About from './pages/About';
import Work from './pages/Work';
import Contact from './pages/Contact';

function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/expertise" element={<Expertise />} />
          <Route path="/expertise/:slug" element={<ExpertiseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>

      {/* Footer with contact form on every page */}
      <Footer />
    </>
  );
}

export default App;