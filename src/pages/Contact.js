import React from 'react';
import PageTransition from '../components/PageTransition';
import { ContactForm } from '../components/Footer';
import { FadeInView, TextReveal } from '../components/AnimationComponents';
import '../styles/contact.css';

export default function Contact() {
  return (
    <PageTransition>
      <div className="contact-page">
        <div className="contact-inner">
          {/* Left — Info */}
          <div className="contact-info">
            <FadeInView>
              <span className="label">Get in Touch</span>
            </FadeInView>

            <TextReveal className="contact-info-title" delay={0.1}>
              Have a brand, project or idea? Let's build it.
            </TextReveal>

            <FadeInView delay={0.3}>
              <p className="contact-info-text">
                Whether you need a social media strategy, a full campaign, video production, event marketing, or just someone who gets branding — I'm one message away.
              </p>
            </FadeInView>

            <FadeInView delay={0.4}>
              <div className="contact-direct">
                <div className="contact-direct-item">
                  <span className="contact-direct-label">Email</span>
                  <a href="mailto:avikamalik@email.com" className="contact-direct-value">
                    avikamalik@email.com
                  </a>
                </div>
                <div className="contact-direct-item">
                  <span className="contact-direct-label">LinkedIn</span>
                  <a href="https://linkedin.com/in/avikamalik" className="contact-direct-value" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/avikamalik
                  </a>
                </div>
                <div className="contact-direct-item">
                  <span className="contact-direct-label">Instagram</span>
                  <a href="https://instagram.com/avikamalik" className="contact-direct-value" target="_blank" rel="noopener noreferrer">
                    @avikamalik
                  </a>
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.5}>
              <div className="contact-socials">
                <a href="mailto:avikamalik@email.com" className="contact-social-link">Email</a>
                <a href="https://linkedin.com/in/avikamalik" className="contact-social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://instagram.com/avikamalik" className="contact-social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </FadeInView>
          </div>

          {/* Right — Form */}
          <div className="contact-form-wrapper">
            <FadeInView delay={0.2} direction="right">
              <h2 className="contact-form-title">Drop your details</h2>
              <ContactForm />
            </FadeInView>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
