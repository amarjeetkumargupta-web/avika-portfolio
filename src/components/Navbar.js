import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Expertise', path: '/expertise' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('no-scroll');
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    document.body.classList.toggle('no-scroll');
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" aria-label="Home">
          AVIKA MALIK
        </Link>

        <div className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link to="/contact" className="nav-cta">
          Let's Talk ↗
        </Link>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="mobile-menu-link"
            onClick={() => { setMenuOpen(false); document.body.classList.remove('no-scroll'); }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="mobile-menu-link"
          onClick={() => { setMenuOpen(false); document.body.classList.remove('no-scroll'); }}
          style={{ color: 'var(--color-accent)' }}
        >
          Contact
        </Link>
      </div>
    </>
  );
}
