'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BL = ({ children }) => (
  <span className="serif italic font-normal">{children}</span>
)

const STATEMENTS = [
  {
    num: '01', title: 'DISCOVERY',
    subtitle: <>The <BL>right question,</BL> before the right solution</>,
    body: 'Before anything gets designed, it gets questioned — by us, out loud, until nothing about it is assumed.',
  },
  {
    num: '02', title: 'ARCHITECTURE',
    subtitle: <>We build the parts <BL>that outlive the pitch.</BL></>,
    body: 'Demos are easy. What holds under real users, real load, real time — that takes discipline most skip.',
  },
  {
    num: '03', title: 'INTELLIGENCE',
    subtitle: <><BL>Innovation, engineered</BL> to hold.</>,
    body: 'Built to think, built to last. Intelligence that works long after the launch post is forgotten.',
  },
  {
    num: '04', title: 'ECOSYSTEM',
    subtitle: <><BL>Students. Researchers. Founders.</BL> One table.</>,
    body: "We're building the room where the next idea happens. The best ideas rarely come from a boardroom.",
  },
  {
    num: '05', title: 'START',
    subtitle: <>Bring us the problem. We'll <BL>build.</BL></>,
    body: "We'll bring the prototype. Two weeks, working software, no slideware in between.",
    buttonText: 'Start a project', buttonHref: '#contact',
  },
]

/* ── CSS 3D Z using ClashDisplay font ── */
function ThreeDZ() {
  return (
    <div
      style={{
        fontFamily: "'ClashDisplay', 'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 'clamp(80px, 14vmin, 180px)',
        letterSpacing: '-0.05em',
        lineHeight: 1,
        color: '#ffffff',
        userSelect: 'none',
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        // 3D depth via layered text-shadow
        textShadow: `
          1px 1px 0px rgba(255,255,255,0.45),
          2px 2px 0px rgba(255,255,255,0.35),
          3px 3px 0px rgba(255,255,255,0.25),
          4px 4px 0px rgba(255,255,255,0.18),
          5px 5px 0px rgba(255,255,255,0.12),
          6px 6px 0px rgba(255,255,255,0.08),
          7px 7px 0px rgba(255,255,255,0.05),
          8px 8px 0px rgba(255,255,255,0.03),
          0 0 40px rgba(255,255,255,0.12),
          0 0 80px rgba(255,255,255,0.06)
        `,
        pointerEvents: 'none',
      }}
    >
      Z
    </div>
  )
}

export default function Studio() {
  const ref = useRef(null)
  const visualRef = useRef(null)
  const stepsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = STATEMENTS.length
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=' + (total * 100) + '%',
          scrub: 0.6, pin: true, pinSpacing: true, refreshPriority: 20,
        },
      })

      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.set(step, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 60 })
      })

      STATEMENTS.forEach((_, i) => {
        if (i === 0) return
        tl.to(stepsRef.current[i - 1], { autoAlpha: 0, y: -60, duration: 0.5 }, i - 0.5)
          .fromTo(stepsRef.current[i], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.5 }, i - 0.5)
        tl.to(visualRef.current, { rotateY: i * 90, rotateX: i * 20, scale: 1 + i * 0.05, duration: 1 }, i - 1)
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="studio" ref={ref} className="relative min-h-screen w-full bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          {/* Left: text steps */}
          <div className="md:col-span-6 relative h-[65vh] md:h-[75vh] flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="font-clash-display-medium text-6xl md:text-8xl font-medium tracking-tight text-white">What we do</h2>
            </div>
            <div className="relative flex-1">
              {STATEMENTS.map((s, i) => (
                <div key={i} ref={el => (stepsRef.current[i] = el)} className="absolute inset-0 flex flex-col justify-start pt-2">
                  <h3 className="font-supreme text-4xl md:text-6xl font-bold uppercase tracking-wide text-white flex items-center gap-4">
                    <span className="text-white/40 text-2xl md:text-3xl font-normal">{s.num}</span>
                    <span>{s.title}</span>
                  </h3>
                  {s.subtitle && (
                    <div className="mt-8 md:mt-10 font-boska text-2xl md:text-4xl text-white leading-tight">{s.subtitle}</div>
                  )}
                  <p className="mt-6 md:mt-8 font-general-sans text-white/60 text-base md:text-lg max-w-lg leading-relaxed">{s.body}</p>
                  {s.buttonText && (
                    <div className="mt-8">
                      <a href={s.buttonHref || '#contact'} className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 px-6 py-3 rounded-full text-sm font-medium transition-all font-excon">
                        <span>{s.buttonText}</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D box with ClashDisplay Z */}
          <div className="md:col-span-6 flex items-center justify-center" style={{ perspective: '1400px' }}>
            <div
              ref={visualRef}
              className="relative w-[78vmin] h-[60vmin] md:w-[44vmin] md:h-[44vmin]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glass depth layers */}
              {[0, 1, 2, 3].map(i => (
                <div
                  key={i}
                  className="absolute inset-0 border border-white/15"
                  style={{
                    transform: `translateZ(${(i - 1.5) * 36}px)`,
                    background: `rgba(255,255,255,${0.012 + i * 0.008})`,
                    backdropFilter: i === 3 ? 'blur(1px)' : 'none',
                  }}
                />
              ))}

              {/* 3D Z — ClashDisplay font, CSS text-shadow depth */}
              <ThreeDZ />

              {/* Corner ticks */}
              {[
                ['top-0 left-0', 'border-t border-l'],
                ['top-0 right-0', 'border-t border-r'],
                ['bottom-0 left-0', 'border-b border-l'],
                ['bottom-0 right-0', 'border-b border-r'],
              ].map(([pos, borders], i) => (
                <div key={i} className={`absolute ${pos} w-4 h-4 ${borders} border-white/50`}
                  style={{ margin: '-1px' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}