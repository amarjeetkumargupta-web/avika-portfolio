import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { FadeInView, TextReveal } from '../components/AnimationComponents';
import { expertiseData } from '../data/content';
import '../styles/expertise.css';

export default function Expertise() {
  return (
    <PageTransition>
      <div className="expertise-page">
        {/* Hero */}
        <div className="expertise-hero">
          <FadeInView>
            <span className="label">Core Competencies</span>
          </FadeInView>
          <TextReveal className="expertise-hero-title" delay={0.1}>
            What Expertise Are You Looking For?
          </TextReveal>
          <FadeInView delay={0.3}>
            <p className="expertise-hero-sub">
              I work across the full spectrum of brand building — from strategy and content to video production and event execution. Pick a domain to explore.
            </p>
          </FadeInView>
        </div>

        {/* Categories grid */}
        <div className="expertise-categories">
          {expertiseData.map((item, i) => (
            <FadeInView key={item.id} delay={i * 0.08}>
              <Link
                to={`/expertise/${item.id}`}
                className="category-card"
                style={{ '--card-color': item.color }}
                data-cursor="view"
                data-cursor-label="Explore"
              >
                <div>
                  <div className="category-number">{item.number}</div>
                  <h2 className="category-title">{item.title}</h2>
                  <span className="category-tagline">{item.tagline}</span>
                  <p className="category-brief">{item.brief}</p>
                </div>
                <div className="category-footer">
                  <span className="category-skill-count">
                    {item.skills.length} skills
                  </span>
                  <span className="category-arrow">↗</span>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>

        {/* Cross-platform note */}
        <FadeInView>
          <div className="cross-platform-note">
            <div className="cross-platform-icon">⚡</div>
            <h3 className="cross-platform-title">Cross-Platform Thinking</h3>
            <p className="cross-platform-text">
              I don't just repost the same content everywhere. I understand platform-specific behavior and adapt content for each channel — so your Instagram strategy isn't a copy-paste of your LinkedIn.
            </p>
          </div>
        </FadeInView>
      </div>
    </PageTransition>
  );
}
