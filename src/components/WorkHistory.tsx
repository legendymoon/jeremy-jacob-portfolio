'use client';
import React, { useEffect, useState } from 'react';

const workHistoryContent = [
  {
    company: 'Upwork',
    duration: '2022 – Present',
    role: 'Top Rated Plus Freelancer',
    description: `In 2022, I embraced the freedom of independent work and launched my freelance practice on Upwork. 
    As a Top Rated Plus freelancer, I’ve delivered 25+ AI and automation projects—from LLM-powered chatbots to computer vision pipelines—for startups and enterprises around the globe. 
    Each project sharpened my ability to move fast, architect at scale, and push the boundaries of what intelligent systems can do in the real world.`,
  },
  {
    company: 'PayPal',
    duration: '2020 – 2022',
    role: 'Software Engineer',
    description: `In 2020, I joined PayPal, where I helped shape the future of digital finance. 
    I worked across cloud-native systems and real-time payment orchestration—reengineering the mobile app experience and building resilient microservices for QR and Zettle-based payments.
    My time at PayPal deepened my expertise in fintech infrastructure, security, and product-driven engineering at global scale.`,
  },
  {
    company: 'Boston Dynamics',
    duration: '2018 – 2020',
    role: 'Software Engineer',
    description: `Right out of Boston University, I began my career at Boston Dynamics—a place where science fiction meets reality. 
    I developed real-time computer vision pipelines and backend systems for robotic platforms like Spot, interfacing with sensors and streaming architectures that powered autonomous behavior.
    It was here that I first saw the thrill and challenge of building intelligent systems at the edge, and it sparked a lifelong passion for applied AI.`,
  },
];


const WorkHistory: React.FC = () => {
  const [circleY, setCircleY] = useState(0);
  const [fillScale, setFillScale] = useState(1);

  const topOffset = 2050;
  const moonSize = 60;
  const maxLineHeight = 1150;
  const speedFactor = 1.6;
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < topOffset) {
        setFillScale(1);
        setCircleY(0);
        return;
      }

      const adjusted = scrollTop - topOffset;
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight - topOffset;

      const pct = Math.min(Math.max((adjusted * speedFactor) / scrollRange, 0), 1);
      setFillScale(1 - pct);
      setCircleY(maxLineHeight * pct);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shadowOffset = moonSize / 2 + moonSize * fillScale;
  const visualScale = Math.max(0, fillScale - (moonSize - 5) / maxLineHeight);

  return (
    <div className="position-relative w-full overflow-hidden px-4 py-16 lg:px-24">
      {/* Vertical Line & Gradient */}
      <div
        className="position-absolute top-0 transform -translate-x-1/2 z-0 pointer-events-none"
        style={{ left: '25%' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            transformOrigin: 'bottom',
            transform: `scaleY(${visualScale})`,
            borderRadius: '9999px',
            backgroundImage: 'linear-gradient(to bottom, #60E4FC, transparent)',
          }}
        />
        <svg
          width="8"
          height={maxLineHeight}
          viewBox={`0 0 8 ${maxLineHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="4"
            y1="0"
            x2="4"
            y2={maxLineHeight}
            stroke="#D6DADE"
            strokeOpacity="0.24"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Moon with mask & glow */}
      <svg
        width={moonSize}
        height={moonSize}
        style={{
          position: 'absolute',
          top: `${circleY}px`,
          left: `calc(25% - ${moonSize / 2}px)`,
          zIndex: 10,
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <defs>
          <mask
            id="moon-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={moonSize}
            height={moonSize}
          >
            <rect width={moonSize} height={moonSize} fill="white" />
            <circle
              cx={shadowOffset}
              cy={moonSize - shadowOffset}
              r={moonSize / 2 + 3}
              fill="black"
            />
          </mask>

          <filter
            id="moon-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#moon-glow)" className="moon-glow">
          <image
            href="/images/illustrator/moon.png"
            x="0"
            y="0"
            width={moonSize}
            height={moonSize}
            mask="url(#moon-mask)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>

      <style jsx>{`
        .moon-glow {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(96, 228, 252, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(96, 228, 252, 0.8));
          }
        }
      `}</style>

      {/* Work History Entries */}
      {workHistoryContent.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '3rem 0',
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          <div style={{ flex: 1, textAlign: 'left', paddingRight: '2rem' }}>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                paddingBottom: '0.2rem',
                color: 'var(--text-primary)',
              }}
            >
              {item.company}
            </h3>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
              }}
            >
              {item.duration}
            </p>
          </div>
          <div style={{ flex: 2, paddingLeft: '2rem' }}>
            <h4
              style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                paddingBottom: '0.7rem',
                color: 'var(--text-primary)',
              }}
            >
              {item.role}
            </h4>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
              }}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkHistory;
