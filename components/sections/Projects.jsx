'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Dynamic RAG points ── */
function useRagPoints() {
  const [pts, setPts] = useState([
    { x: 200, y: 120 }, { x: 350, y: 180 }, { x: 250, y: 250 }, { x: 420, y: 140 }
  ])
  useEffect(() => {
    const positions = [
      [{ x: 200, y: 120 }, { x: 350, y: 180 }, { x: 250, y: 250 }, { x: 420, y: 140 }],
      [{ x: 160, y: 200 }, { x: 320, y: 100 }, { x: 430, y: 260 }, { x: 280, y: 310 }],
      [{ x: 240, y: 80 },  { x: 400, y: 200 }, { x: 180, y: 300 }, { x: 460, y: 110 }],
      [{ x: 300, y: 150 }, { x: 160, y: 260 }, { x: 440, y: 180 }, { x: 240, y: 340 }],
    ]
    let idx = 0
    const interval = setInterval(() => {
      idx = (idx + 1) % positions.length
      setPts(positions[idx])
    }, 1800)
    return () => clearInterval(interval)
  }, [])
  return pts
}

/* ── Project data with fixed illustrations ── */
function useProjects() {
  const ragPts = useRagPoints()

  return [
    {
      id: '01', tag: 'Security · AI', title: 'DEVSEC',
      description: 'AI-augmented secure development platform. Real-time code intelligence, threat modeling and policy enforcement woven into the IDE.',
      span: 'col-span-12 lg:col-span-7 row-span-2 min-h-[420px] lg:min-h-[560px]',
      accentColor: 'rgba(120,200,255,0.1)',
      illustration: (
        <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }}>
          <defs>
            <radialGradient id="devsec-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(120,200,255,0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="600" height="400" fill="url(#devsec-glow)" />
          <g stroke="white" strokeWidth="1" fill="none" opacity="0.7">
            <circle cx="300" cy="200" r="140" />
            <circle cx="300" cy="200" r="100" />
            <circle cx="300" cy="200" r="60" />
            <circle cx="300" cy="200" r="25" />
            <path d="M160 200 H 440 M 300 60 V 340" opacity="0.5" />
            <circle cx="300" cy="200" r="170" strokeDasharray="3 10" opacity="0.3" />
          </g>
          <g fill="white">
            <circle cx="300" cy="200" r="4" />
            <circle cx="440" cy="200" r="2.5" /><circle cx="160" cy="200" r="2.5" />
            <circle cx="300" cy="60" r="2.5" /><circle cx="300" cy="340" r="2.5" />
          </g>
          <line x1="300" y1="200" x2="440" y2="200" stroke="rgba(120,200,255,0.5)" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="rotate" from="0 300 200" to="360 300 200" dur="5s" repeatCount="indefinite" />
          </line>
        </svg>
      ),
    },
    {
      id: '02', tag: 'Compression · R&D', title: 'ZIP',
      description: 'Next-gen neural compression pipeline. 40% smaller payloads, lossless, hardware-accelerated.',
      span: 'col-span-12 lg:col-span-5 min-h-[320px] lg:min-h-[380px]',
      accentColor: 'rgba(255,200,80,0.08)',
      illustration: (
        <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }}>
          <g fill="none">
            {Array.from({ length: 22 }, (_, i) => {
              const x = 30 + i * 25;
              const h = 70 + Math.sin((i / 21) * Math.PI) * 160;
              const hSmall = h * 0.52;
              const y = (400 - h) / 2;
              const ySmall = (400 - hSmall) / 2;
              return (
                <g key={i}>
                  <rect x={x} y={y} width="12" height={h} stroke="rgba(255,255,255,0.18)" />
                  <rect x={x + 1} y={ySmall} width="10" height={hSmall} fill="rgba(255,200,80,0.18)" />
                </g>
              );
            })}
          </g>
          <path d="M 272 175 L 308 200 L 272 225" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" />
          <path d="M 328 175 L 292 200 L 328 225" stroke="rgba(255,200,80,0.7)" strokeWidth="2" fill="none" />
        </svg>
      ),
    },
    {
      id: '03', tag: 'Agentic · OS', title: 'JARVIS',
      description: 'A personal computing layer that operates your tools. Memory, reasoning, and action — unified.',
      span: 'col-span-12 lg:col-span-6 min-h-[360px]',
      accentColor: 'rgba(160,120,255,0.08)',
      illustration: (
        <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }}>
          <defs>
            <radialGradient id="jarvis-grad" cx="15%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(160,120,255,0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="1000" height="400" fill="url(#jarvis-grad)" />
          {/* Circles emanating from LEFT side */}
          {[30, 70, 120, 180, 250, 330, 420].map((r, i) => (
            <circle key={i} cx="120" cy="200" r={r}
              stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none"
              strokeDasharray={i % 2 === 0 ? 'none' : '4 8'}
              opacity={0.9 - i * 0.08}
            />
          ))}
          {/* Horizontal guide */}
          <path d="M 120 200 H 900" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 8" />
          {/* Pulse from left */}
          <circle cx="120" cy="200" r="20" stroke="rgba(160,120,255,0.7)" strokeWidth="1.5" fill="none">
            <animate attributeName="r" from="20" to="420" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="200" r="20" stroke="rgba(160,120,255,0.5)" strokeWidth="1" fill="none">
            <animate attributeName="r" from="20" to="420" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.7" to="0" dur="3.5s" begin="1.75s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="200" r="7" fill="rgba(160,120,255,0.9)" />
          <circle cx="120" cy="200" r="3" fill="white" />
        </svg>
      ),
    },
    {
      id: '04', tag: 'Retrieval · Education', title: 'College RAG Intelligence',
      description: 'A retrieval system purpose-built for academia. Multi-modal indexing across lectures, papers and labs.',
      span: 'col-span-12 lg:col-span-6 min-h-[320px] lg:min-h-[380px]',
      accentColor: 'rgba(80,200,160,0.08)',
      illustration: (
        <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" style={{ opacity: 0.8, transition: 'all 0.4s ease' }}>
          <defs>
            <linearGradient id="rag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(80,200,160,0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <rect width="600" height="400" fill="url(#rag-grad)" />
          <g stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none">
            {[60, 120, 180, 240, 300].map(y => (
              <line key={y} x1="60" y1={y} x2="540" y2={y} />
            ))}
            {[100, 200, 300, 400, 500].map(x => (
              <line key={x} x1={x} y1="40" x2={x} y2="360" />
            ))}
          </g>
          {/* Dynamic connection lines */}
          {ragPts.map((pt, i) => {
            const next = ragPts[(i + 1) % ragPts.length]
            return (
              <line key={i} x1={pt.x} y1={pt.y} x2={next.x} y2={next.y}
                stroke="rgba(80,200,160,0.35)" strokeWidth="1"
                strokeDasharray="4 4"
                style={{ transition: 'all 1.6s cubic-bezier(0.4,0,0.2,1)' }}
              />
            )
          })}
          {/* Dynamic node points */}
          {ragPts.map((pt, i) => (
            <g key={i} style={{ transition: 'all 1.6s cubic-bezier(0.4,0,0.2,1)' }}>
              <circle cx={pt.x} cy={pt.y} r="10"
                fill="rgba(80,200,160,0.12)" stroke="rgba(80,200,160,0.55)" strokeWidth="1.5"
              />
              <circle cx={pt.x} cy={pt.y} r="3.5" fill="rgba(80,200,160,0.9)" />
            </g>
          ))}
        </svg>
      ),
    },
    {
      id: '05', tag: 'Crypto · Acoustic', title: 'Secure Audio Transfer',
      description: 'Encrypted, air-gapped data transfer via acoustic modulation. Verified at 28 kbps over ultrasonic carriers.',
      span: 'col-span-12 lg:col-span-5 min-h-[320px] lg:min-h-[380px]',
      accentColor: 'rgba(255,100,80,0.06)',
      illustration: (() => {
        // Single waveform path drawn left to right
        const wavePath = `M 0 200 ${Array.from({ length: 80 }, (_, i) => {
          const x = i * 7.5;
          const y = 200 + Math.sin(i * 0.45) * 55 + Math.sin(i * 1.1) * 25;
          return `L ${x} ${y}`;
        }).join(' ')}`;
        const waveLen = 600; // approximate
        return (
          <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full" style={{ opacity: 0.85 }}>
            <defs>
              <linearGradient id="wave-fade" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="10%" stopColor="white" stopOpacity="1" />
                <stop offset="90%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Frequency markers */}
            {[100, 200, 300, 400, 500].map(x => (
              <line key={x} x1={x} y1="155" x2={x} y2="245"
                stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            ))}
            {/* Single waveform drawn L→R */}
            <path
              d={wavePath}
              stroke="url(#wave-fade)"
              strokeWidth="2"
              fill="none"
              style={{
                strokeDasharray: waveLen,
                strokeDashoffset: waveLen,
                animation: 'wave-draw 2.8s ease-in-out infinite',
              }}
            />
            {/* Scan line */}
            <rect x="0" y="145" width="4" height="110" fill="rgba(255,100,80,0.5)" rx="2">
              <animateTransform attributeName="transform" type="translate"
                from="0 0" to="596 0" dur="2.8s" repeatCount="indefinite" />
            </rect>
            <style>{`
              @keyframes wave-draw {
                0% { stroke-dashoffset: ${waveLen}; }
                50% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -${waveLen}; }
              }
            `}</style>
          </svg>
        );
      })(),
    },
  ];
}

/* ── Premium 3D tilt — PER CARD ONLY ── */
function useTiltEffect(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -7;
      const ry = ((x / rect.width) - 0.5) * 9;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    };
    const handleLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref]);
}

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  useTiltEffect(cardRef);

  return (
    /* isolation:isolate prevents the 3D/glow from bleeding to neighbors */
    <div
      className={`group relative ${project.span} overflow-hidden cursor-pointer project-card`}
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0a0a0a',
        isolation: 'isolate',           // ← key fix: contains all effects inside this card
        contain: 'layout paint',        // ← further containment
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Illustration — tilt applied here */}
      <div
        ref={cardRef}
        className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {project.illustration}
      </div>

      {/* Accent glow — ONLY this card, clipped inside */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-600"
        style={{
          background: `radial-gradient(70% 70% at 50% 50%, ${project.accentColor}, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-transparent" />

      {/* Shimmer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.04) 50%, transparent 80%)',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.9s ease',
          }}
        />
      </div>

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div className="font-boska text-lg text-white/75 transition-colors duration-400 group-hover:text-white">{project.tag}</div>
          <div className="text-xs tracking-[0.2em] text-white/35 font-medium">{project.id}</div>
        </div>
        <div>
          <h3 className="font-supreme font-bold uppercase tracking-wide text-4xl md:text-6xl leading-[0.95] text-white transition-all duration-500 group-hover:tracking-wider">
            {project.title}
          </h3>
          <p className="mt-4 font-general-sans text-base text-white/50 max-w-xl leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            {project.description}
          </p>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-7 h-7 border-t border-l border-white/20 transition-all duration-500 group-hover:w-11 group-hover:h-11 group-hover:border-white/50" />
        <div className="absolute top-0 right-0 w-7 h-7 border-t border-r border-white/20 transition-all duration-500 group-hover:w-11 group-hover:h-11 group-hover:border-white/50" />
        <div className="absolute bottom-0 left-0 w-7 h-7 border-b border-l border-white/20 transition-all duration-500 group-hover:w-11 group-hover:h-11 group-hover:border-white/50" />
        <div className="absolute bottom-0 right-0 w-7 h-7 border-b border-r border-white/20 transition-all duration-500 group-hover:w-11 group-hover:h-11 group-hover:border-white/50" />
      </div>

      {/* Bottom edge glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-700"
        style={{
          background: isHovered
            ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        }}
      />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const projects = useProjects();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.set('.project-card', { opacity: 0, y: 55, scale: 0.97 });
      gsap.to('.project-card', {
        opacity: 1, y: 0, scale: 1,
        duration: 1.1,
        stagger: { each: 0.07, ease: 'power1.inOut' },
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section, start: 'top 75%', toggleActions: 'play none none none',
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <div className="mb-20">
          <h2 className="font-clash-display-medium text-5xl md:text-7xl leading-[0.9] tracking-tight">Products.</h2>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-min grid-flow-dense">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}