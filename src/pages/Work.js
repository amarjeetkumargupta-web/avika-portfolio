import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { FadeInView, TextReveal } from '../components/AnimationComponents';
import { projects } from '../data/content';
import '../styles/work.css';

const filters = [
  { key: 'all', label: 'All Work' },
  { key: 'events', label: 'Events' },
  { key: 'social-media', label: 'Social Media' },
  { key: 'creative', label: 'Creative' },
  { key: 'video', label: 'Video' },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="work-page">
        {/* Header */}
        <div className="work-header">
          <FadeInView>
            <span className="label">Portfolio</span>
          </FadeInView>
          <TextReveal className="work-title" delay={0.1}>
            Selected Work
          </TextReveal>
          <FadeInView delay={0.3}>
            <p className="work-subtitle">
              A curated selection of projects, campaigns, and creative work. Each one backed by strategy, not just aesthetics.
            </p>
          </FadeInView>
        </div>

        {/* Filters */}
        <FadeInView delay={0.3}>
          <div className="work-filters">
            {filters.map(filter => (
              <button
                key={filter.key}
                className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </FadeInView>

        {/* Projects grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div
                  className="project-card"
                  data-cursor="view"
                  data-cursor-label="View"
                >
                  <div className="project-image-wrapper">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-image"
                      />
                    ) : (
                      <div className="project-placeholder">
                        <span className="project-placeholder-icon">📁</span>
                        <span className="project-placeholder-text">Case study coming soon</span>
                      </div>
                    )}
                    <div className="project-overlay">
                      <span className="project-overlay-text">View Case Study</span>
                    </div>
                  </div>

                  <div className="project-content">
                    <span className="project-category-tag">{project.category.replace('-', ' ')}</span>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-brief">{project.brief}</p>
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case study note */}
        <FadeInView>
          <div className="work-case-study-note">
            <h3 className="case-study-note-title">Full Case Studies Coming Soon</h3>
            <p className="case-study-note-text">
              Each project will include the full breakdown: Brand → Problem → Strategy → Execution → Results. Real work, real numbers, real impact.
            </p>
          </div>
        </FadeInView>
      </div>
    </PageTransition>
  );
}
