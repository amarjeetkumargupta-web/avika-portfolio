import React from 'react';
import PageTransition from '../components/PageTransition';
import MarqueeStrip from '../components/MarqueeStrip';
import { FadeInView, TextReveal } from '../components/AnimationComponents';
import { experiences, tools } from '../data/content';
import '../styles/about.css';

const traits = [
  'Creative', 'Strategic', 'Business-minded', 'Execution-focused',
  'Trend-aware', 'Team leader', 'Detail-oriented', 'Culture-driven'
];

const interests = [
  'Fashion', 'Marketing', 'Branding', 'Creative Strategy',
  'Books', 'Art', 'Culture', 'Psychology', 'Business', 'Film'
];

export default function About() {
  return (
    <PageTransition>
      <div className="about-page">
        {/* ═══ INTRO ═══ */}
        <section className="about-intro">
          <FadeInView direction="left">
            <div className="about-photo-wrapper" data-cursor="view" data-cursor-label="Hey!">
              <img
                src="/Red Gradient Profile Photo Instagram Post.png"
                alt="Avika Malik"
                className="about-photo"
              />
              <div className="about-photo-accent" />
            </div>
          </FadeInView>

          <div className="about-text">
            <FadeInView>
              <span className="label">About</span>
            </FadeInView>

            <TextReveal className="about-title" delay={0.1}>
              I don't just manage social media. I build the entire creative engine behind a brand.
            </TextReveal>

            <FadeInView delay={0.3}>
              <p className="about-description">
                I'm a Computer Science student, but my real work lives at the intersection of marketing, creativity, and strategy. For 3+ years, I've been deep in social media management, content strategy, event marketing, and creative execution.
              </p>
            </FadeInView>

            <FadeInView delay={0.4}>
              <p className="about-description">
                I understand trends but I don't blindly follow them. I can handle both the creative vision and the operational chaos of making it happen. From a brand concept to a content calendar to a live event — I've done all sides of it.
              </p>
            </FadeInView>

            <FadeInView delay={0.5}>
              <p className="about-description">
                Whether it's positioning a brand, planning a campaign, editing a reel, managing a team, or anchoring a festival — I bring the same thing: clarity, creativity, and execution.
              </p>
            </FadeInView>

            <FadeInView delay={0.6}>
              <div className="about-traits">
                {traits.map((trait, i) => (
                  <span key={trait} className="trait-tag">{trait}</span>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* ═══ EXPERIENCE TIMELINE ═══ */}
        <section className="experience-section">
          <FadeInView>
            <span className="label">Experience</span>
            <h2 className="about-title" style={{ fontSize: 'var(--text-3xl)', marginTop: 'var(--space-3)' }}>
              Where I've Been Building
            </h2>
          </FadeInView>

          <div className="timeline">
            {experiences.map((exp, i) => (
              <FadeInView
                key={i}
                delay={i * 0.1}
                direction={i % 2 === 0 ? 'left' : 'right'}
                className="timeline-item"
              >
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-period">{exp.period}</div>
                  <h3 className="timeline-title">{exp.title}</h3>
                  <div className="timeline-role">{exp.role}</div>
                  <p className="timeline-desc">{exp.description}</p>
                  <div className="timeline-events">
                    {exp.events.map(event => (
                      <span key={event} className="timeline-event-tag">{event}</span>
                    ))}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </section>

        {/* ═══ TOOLS ═══ */}
        <section className="tools-section">
          <FadeInView>
            <span className="label">Arsenal</span>
            <h2 className="about-title" style={{ fontSize: 'var(--text-3xl)', marginTop: 'var(--space-3)' }}>
              Tools & Software
            </h2>
          </FadeInView>

          <div className="tools-full-grid">
            {tools.map((tool, i) => (
              <FadeInView key={tool.name} delay={i * 0.04}>
                <div className="tool-card">
                  <div className="tool-card-name">{tool.name}</div>
                  <div className="tool-card-category">{tool.category}</div>
                </div>
              </FadeInView>
            ))}
          </div>
        </section>

        {/* ═══ INTERESTS ═══ */}
        <section className="interests-section">
          <div className="interests-label">Beyond Work</div>
          <MarqueeStrip items={interests} />
        </section>
      </div>
    </PageTransition>
  );
}
