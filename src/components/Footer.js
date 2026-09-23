import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { processContactForm } from '../utils/contactService';
import { FadeInView } from './AnimationComponents';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <FadeInView>
          <div className="footer-header">
            <h2 className="footer-headline">
              Have a brand, project or idea?{' '}
              <span className="gradient-text">Let's build it.</span>
            </h2>
            <p className="footer-subline">
              Drop your details below and I'll get back to you within 24 hours.
            </p>
          </div>
        </FadeInView>

        <FadeInView delay={0.15}>
          <ContactForm />
        </FadeInView>

        <div className="footer-socials">
          <a href="mailto:avikamalik@email.com" className="social-link" target="_blank" rel="noopener noreferrer">Email</a>
          <a href="https://linkedin.com/in/avikamalik" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://instagram.com/avikamalik" className="social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        <div className="footer-copyright">
          Avika Malik © {new Date().getFullYear()} — Creative Strategist & Brand Architect
        </div>
      </div>
    </footer>
  );
}

// ── ContactForm Component (reusable) ──
export function ContactForm({ compact = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.message.trim()) errs.message = 'Tell me about your project';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    try {
      const result = await processContactForm(formData);
      // Consider success if either DB or email succeeded (or was skipped)
      if (result.db.success || result.email.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(null), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            data-cursor="text"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            data-cursor="text"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="tel"
            name="phone"
            className="form-input"
            placeholder="Phone / WhatsApp"
            value={formData.phone}
            onChange={handleChange}
            data-cursor="text"
          />
        </div>

        {!compact && (
          <div className="form-group">
            <select
              name="projectType"
              className="form-select"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="">Project Type</option>
              <option value="social-media">Social Media Management</option>
              <option value="content-strategy">Content Strategy</option>
              <option value="video-production">Video Production</option>
              <option value="brand-strategy">Brand Strategy</option>
              <option value="event-marketing">Event Marketing</option>
              <option value="campaign">Campaign</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        <div className="form-group full-width">
          <textarea
            name="message"
            className="form-input form-textarea"
            placeholder="Tell me about your project... *"
            value={formData.message}
            onChange={handleChange}
            data-cursor="text"
          />
          {errors.message && <span className="form-error">{errors.message}</span>}
        </div>

        <motion.button
          type="submit"
          className="form-submit"
          disabled={status === 'loading'}
          whileTap={{ scale: 0.97 }}
        >
          <span>
            {status === 'loading' ? 'Sending...' : 'Send Inquiry ↗'}
          </span>
        </motion.button>

        {status === 'success' && (
          <div className="form-status success">
            ✓ Got it! I'll get back to you soon.
          </div>
        )}

        {status === 'error' && (
          <div className="form-status error">
            Something went wrong. Try emailing me directly.
          </div>
        )}
      </div>
    </form>
  );
}
