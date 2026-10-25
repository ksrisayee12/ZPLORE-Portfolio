'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sentences = [
  'Ideas start here.',
  'Code gives them form.',
  'Intelligence gives them purpose.',
  'Zplore gives them scale.',
]

export default function FinalEnding() {
  const sectionRef = useRef(null)
  const linesRef = useRef([])
  const logoRef = useRef(null)
  const zSvgRef = useRef(null)
  const bigZRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Sentence wipe-in (left → right clip-path) ─────────────────────
      linesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { clipPath: 'inset(0 100% 0 0)', y: 10, opacity: 0 })
        gsap.to(el, {
          clipPath: 'inset(0 0% 0 0)',
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.09,
        })
      })

      // ── 2. Big Z → shrink → small logo with stroke draw ──────────────────
      if (!bigZRef.current || !logoRef.current || !zSvgRef.current) return

      // Pre-set: big Z hidden, small logo hidden
      gsap.set(bigZRef.current, { opacity: 0, scale: 0 })
      gsap.set(logoRef.current, { opacity: 0, scale: 0.7 })

      // Pre-set stroke dash on small logo
      const smallCircle = zSvgRef.current.querySelector('.z-circle')
      const smallStrokes = zSvgRef.current.querySelectorAll('.z-bar')
      if (smallCircle) {
        const len = smallCircle.getTotalLength()
        gsap.set(smallCircle, { strokeDasharray: len, strokeDashoffset: len })
      }
      smallStrokes.forEach(s => {
        const len = s.getTotalLength()
        gsap.set(s, { strokeDasharray: len, strokeDashoffset: len })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: logoRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Step 1 — Big Z bursts into existence (0 → full 50vmin)
      tl.to(bigZRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.2)',
      }, 0)

      // Step 2 — Hold with slow rotation
      tl.to(bigZRef.current, {
        rotation: 8,
        duration: 0.4,
        ease: 'sine.inOut',
      }, 0.6)
      tl.to(bigZRef.current, {
        rotation: -4,
        duration: 0.4,
        ease: 'sine.inOut',
      }, 1.0)

      // Step 3 — Collapse to small logo position (scale → 0, opacity → 0)
      tl.to(bigZRef.current, {
        scale: 0.04,
        opacity: 0,
        rotation: 0,
        duration: 0.7,
        ease: 'expo.in',
      }, 1.2)

      // Step 4 — Small logo scales in right as big Z collapses
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'expo.out',
      }, 1.55)

      // Step 5 — Circle draws around the Z (clockwise)
      if (smallCircle) {
        tl.to(smallCircle, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        }, 1.75)
      }

      // Step 6 — Z bars draw in left-to-right, sequentially
      smallStrokes.forEach((s, i) => {
        tl.to(s, {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: 'power2.out',
        }, 2.0 + i * 0.18)
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="final-ending"
      className="relative w-full bg-[#000000] text-white overflow-hidden select-none"
      style={{ paddingTop: '10vh', paddingBottom: '14vh' }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0.015 }}>
        <svg className="w-full h-full">
          <defs>
            <pattern id="fe-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fe-grid)" />
        </svg>
      </div>

      {/* ── BIG Z — fixed centre, 50vmin ── */}
      <div
        ref={bigZRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '50vmin',
          height: '50vmin',
          marginTop: '-25vmin',
          marginLeft: '-25vmin',
          zIndex: 200,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          opacity: 0,
          transformOrigin: 'center center',
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="bigz-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b1" />
              <feGaussianBlur stdDeviation="12" result="b2" in="SourceGraphic" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Outer halo */}
          <circle cx="100" cy="100" r="96" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" filter="url(#bigz-glow)" />
          {/* Main ring */}
          <circle cx="100" cy="100" r="92" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
          {/* Inner ring */}
          <circle cx="100" cy="100" r="82" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
          {/* Z */}
          <path d="M 52 55 L 148 55" stroke="white" strokeWidth="7" strokeLinecap="round" filter="url(#bigz-glow)" />
          <path d="M 148 55 L 52 145" stroke="white" strokeWidth="7" strokeLinecap="round" filter="url(#bigz-glow)" />
          <path d="M 52 145 L 148 145" stroke="white" strokeWidth="7" strokeLinecap="round" filter="url(#bigz-glow)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full"
        style={{ maxWidth: '1100px', padding: '0 clamp(24px, 5vw, 80px)' }}>

        {/* Sentences */}
        <div className="mb-24 md:mb-32">
          {sentences.map((text, i) => (
            <div
              key={i}
              ref={el => { linesRef.current[i] = el }}
              style={{
                fontFamily: "'ClashDisplay', 'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(22px, 3.8vw, 64px)',
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: i === sentences.length - 1 ? '#ffffff' : 'rgba(255,255,255,0.5)',
                marginBottom: i < sentences.length - 1 ? 'clamp(8px, 1.5vw, 18px)' : 0,
                willChange: 'clip-path, transform',
                opacity: 0,
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* Small Z logo */}
        <div
          ref={logoRef}
          className="flex flex-col items-start"
          style={{ opacity: 0, transformOrigin: 'left center' }}
        >
          <svg
            ref={zSvgRef}
            viewBox="0 0 200 200"
            fill="none"
            style={{ width: 'clamp(86px, 10vw, 136px)', height: 'clamp(86px, 10vw, 136px)' }}
          >
            <circle
              className="z-circle"
              cx="100" cy="100" r="92"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
              fill="none"
            />
            <path className="z-bar" d="M 55 60 L 145 60" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <path className="z-bar" d="M 145 60 L 55 140" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <path className="z-bar" d="M 55 140 L 145 140" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <p className="font-general-sans uppercase tracking-[0.35em] text-white/25 mt-4"
            style={{ fontSize: 'clamp(9px, 0.75vw, 12px)' }}>
            Deep-Tech Studio
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}