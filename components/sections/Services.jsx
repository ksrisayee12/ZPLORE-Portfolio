'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { n: '01', title: 'Discovery Sprint', body: 'Two-week sprint. Stakeholder interviews, technical audit, opportunity map, and a working proof-of-concept.' },
  { n: '02', title: 'System Architecture', body: 'System design, model selection, infra plan, threat model. Documented, decisioned, dated.' },
  { n: '03', title: 'Embedded Build', body: 'Senior engineers shipping in your repo, your cadence, your standards. Weekly demos, never decks.' },
  { n: '04', title: 'Production Ship', body: 'Hardening, instrumentation, rollout. We sit with on-call rotations through the first incident.' },
  { n: '05', title: 'Compound Evolution', body: 'Quarterly evolution. New capabilities, model refreshes, scale gates. The system gets sharper with age.' },
]

export default function Services() {
  const wrap = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const distance = () => track.current.scrollWidth - window.innerWidth + 80
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: () => '+=' + distance(),
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          refreshPriority: 15,
        },
      })

      // Cards pop in as they approach the center
      const nodes = gsap.utils.toArray('.svc-node')
      gsap.set(nodes, { y: 28, opacity: 0 })

      ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top',
        end: () => '+=' + distance(),
        scrub: true,
        onUpdate: (st) => {
          const p = st.progress
          nodes.forEach((n, i) => {
            const center = i / (nodes.length - 1)
            const dist = Math.abs(p - center)
            const appeared = p > center - 0.28
            const targetOpacity = appeared ? Math.max(0.2, 1 - dist * 2.0) : 0
            const targetY = appeared ? (dist < 0.1 ? 0 : 5) : 28
            const targetScale = dist < 0.1 ? 1 : 0.94
            n.style.opacity = targetOpacity.toFixed(2)
            n.style.transform = `scale(${targetScale}) translateY(${targetY}px)`
          })
        }
      })
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={wrap} className="relative w-full bg-[#050505] overflow-hidden h-screen">
      <div className="absolute top-10 left-0 right-0 z-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">How we work</div>
          <h2 className="font-clash-display-medium text-5xl md:text-7xl">Services.</h2>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center">
        <div ref={track} className="flex items-center gap-[8vw] pl-[10vw] pr-[10vw]" style={{ willChange: 'transform' }}>
          {/* Wavy connector line */}
          <svg className="absolute top-1/2 -translate-y-1/2 left-0 h-32 pointer-events-none" width="4400" height="128" viewBox="0 0 4400 128" preserveAspectRatio="none">
            <path d="M 0 64 Q 400 10 800 64 T 1600 64 T 2400 64 T 3200 64 T 4000 64 L 4400 64"
              stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="4 8" />
          </svg>

          {STEPS.map((s, i) => (
            <div key={s.n} className="svc-node relative shrink-0 w-[78vw] md:w-[36vw] transition-all duration-300 will-change-transform">
              <div className="border border-white/10 bg-[#0a0a0a] p-8 md:p-10 relative overflow-hidden">

                {/* White dot INSIDE the card, top-left corner */}
                <div className="absolute top-4 left-5 w-4 h-4 bg-white rounded-full shadow-[0_0_14px_rgba(255,255,255,0.5)] z-10" />

                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40 ml-8">Step</div>
                  <div className="display text-6xl text-white/15">{s.n}</div>
                </div>
                <h3 className="display text-4xl md:text-5xl mt-8">{s.title}</h3>
                <p className="mt-4 font-general-sans text-white/60 text-base leading-relaxed max-w-md">{s.body}</p>
                <div className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/35">
                  <span className="w-6 h-px bg-white/35" /> Phase {s.n}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}