import React from 'react';
import '../styles/marquee.css';

const defaultItems = [
  'Strategy', 'Content', 'Social Media', 'Campaigns', 'Video',
  'Branding', 'Events', 'Marketing', 'Creative Direction', 'Storytelling',
  'Growth', 'Engagement', 'Production', 'Anchoring'
];

export default function MarqueeStrip({ items = defaultItems }) {
  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
