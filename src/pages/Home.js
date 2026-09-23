import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import MarqueeStrip from '../components/MarqueeStrip';
import { SplitText, AnimatedCounter, FadeInView, MagneticButton } from '../components/AnimationComponents';
import { expertiseData, stats } from '../data/content';
import '../styles/home.css';

export default function Home() {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <video
          autoPlay muted loop playsInline
          className="hero-video-bg"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-grain" />

        <div className="hero-content">
          <div className="hero-text">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="hero-label">Creative Strategist & Brand Architect</span>
            </motion.div>

            <h1 className="hero-name">
              <SplitText delay={0.4} stagger={0.04} hover>
                AVIKA
              </SplitText>
              <br />
              <span className="hero-name-accent">
                <SplitText delay={0.6} stagger={0.04} hover>
                  MALIK
                </SplitText>
              </span>
            </h1>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Turning ideas into brands. From strategy to screen — I handle the complete creative, content & marketing execution.
            </motion.p>
          </div>

          {/* Hero image */}
          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            data-cursor="view"
            data-cursor-label="Hello"
          >
            <img
              src="/Red Gradient Profile Photo Instagram Post.png"
              alt="Avika Malik"
              className="hero-image"
            />
            <div className="hero-image-border" />
            <div className="hero-image-tag">EST. 2022</div>
          </motion.div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-indicator-line" />
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <MarqueeStrip />

      {/* ═══ STATS ═══ */}
      <section className="stats-bar">
        {stats.map((stat, i) => (
          <FadeInView key={i} delay={i * 0.1} className="stat-item">
            <div className="stat-number">
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </FadeInView>
        ))}
      </section>

      {/* ═══ EXPERTISE PREVIEW ═══ */}
      <section className="expertise-preview">
        <FadeInView>
          <div className="expertise-preview-header">
            <span className="label">What I Bring</span>
            <h2 className="expertise-preview-title">Areas of Expertise</h2>
          </div>
        </FadeInView>

        <div className="expertise-preview-grid">
          {expertiseData.map((item, i) => (
            <FadeInView key={item.id} delay={i * 0.08}>
              <Link
                to={`/expertise/${item.id}`}
                className="expertise-card"
                style={{ '--card-accent': item.color }}
                data-cursor="view"
                data-cursor-label="Explore"
              >
                <div className="expertise-card-number">{item.number}</div>
                <h3 className="expertise-card-title">{item.title}</h3>
                <p className="expertise-card-brief">{item.brief}</p>
                <span className="expertise-card-cta">Explore →</span>
              </Link>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="home-cta">
        <FadeInView>
          <h2 className="home-cta-title">
            Got something in mind?{' '}
            <span className="gradient-text">Let's make it happen.</span>
          </h2>
          <MagneticButton as="a" href="/contact" className="home-cta-btn">
            <span>Start a Project ↗</span>
          </MagneticButton>
        </FadeInView>
      </section>
    </PageTransition>
  );
}
