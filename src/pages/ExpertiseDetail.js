import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { FadeInView, TextReveal } from '../components/AnimationComponents';
import { expertiseData } from '../data/content';
import '../styles/expertise-detail.css';

export default function ExpertiseDetail() {
  const { slug } = useParams();
  const data = expertiseData.find(item => item.id === slug);

  if (!data) return <Navigate to="/expertise" replace />;

  return (
    <PageTransition>
      <div className="detail-page" style={{ '--detail-color': data.color }}>
        {/* Back link */}
        <Link to="/expertise" className="detail-back">
          ← Back to Expertise
        </Link>

        {/* Hero */}
        <div className="detail-hero">
          <motion.div
            className="detail-number"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 0.1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {data.number}
          </motion.div>

          <TextReveal className="detail-title" delay={0.2}>
            {data.title}
          </TextReveal>

          <FadeInView delay={0.3}>
            <div className="detail-tagline">{data.tagline}</div>
          </FadeInView>

          <FadeInView delay={0.4}>
            <p className="detail-description">{data.description}</p>
          </FadeInView>
        </div>

        <div className="detail-sections">
          {/* Skills */}
          <div className="detail-section">
            <FadeInView>
              <div className="detail-section-label">Skills & Services</div>
              <h3 className="detail-section-title">What I Can Do Here</h3>
            </FadeInView>
            <div className="skills-cloud">
              {data.skills.map((skill, i) => (
                <FadeInView key={skill} delay={i * 0.03}>
                  <motion.span
                    className="skill-tag"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {skill}
                  </motion.span>
                </FadeInView>
              ))}
            </div>
          </div>

          {/* Tools */}
          {data.tools && data.tools.length > 0 && (
            <div className="detail-section">
              <FadeInView>
                <div className="detail-section-label">Tools & Software</div>
                <h3 className="detail-section-title">What I Work With</h3>
              </FadeInView>
              <div className="tools-grid">
                {data.tools.map((tool, i) => (
                  <FadeInView key={tool} delay={i * 0.05}>
                    <div className="tool-item">
                      <div className="tool-name">{tool}</div>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          )}

          {/* Platforms */}
          {data.platforms && data.platforms.length > 0 && (
            <div className="detail-section">
              <FadeInView>
                <div className="detail-section-label">Platforms</div>
                <h3 className="detail-section-title">Where I Operate</h3>
              </FadeInView>
              <div className="platforms-row">
                {data.platforms.map((platform, i) => (
                  <FadeInView key={platform} delay={i * 0.05}>
                    <span className="platform-badge">{platform}</span>
                  </FadeInView>
                ))}
              </div>
            </div>
          )}

          {/* Events (for communication page) */}
          {data.events && data.events.length > 0 && (
            <div className="detail-section">
              <FadeInView>
                <div className="detail-section-label">Events Anchored</div>
                <h3 className="detail-section-title">Where I've Taken the Stage</h3>
              </FadeInView>
              <div className="events-grid">
                {data.events.map((event, i) => (
                  <FadeInView key={event} delay={i * 0.04}>
                    <span className="event-tag">{event}</span>
                  </FadeInView>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {data.highlights && data.highlights.length > 0 && (
            <div className="detail-section">
              <FadeInView>
                <div className="detail-section-label">Highlights</div>
                <h3 className="detail-section-title">What Sets This Apart</h3>
              </FadeInView>
              <div className="highlights-list">
                {data.highlights.map((highlight, i) => (
                  <FadeInView key={i} delay={i * 0.08}>
                    <div className="highlight-item">
                      <div className="highlight-icon" />
                      <p className="highlight-text">{highlight}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
