'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const leftLines = [
  'We build in layers',
  'intelligence first,',
  'interface second,',
  'trust throughout.',
]

// Right side lines — each appears from right, one by one
const rightLines = [
  { text: 'Every System', italic: false, weight: 'normal' },
  { text: 'WE BUILD', italic: false, weight: 'bold' },
  { text: 'carries the same intent', italic: false, weight: 'normal' },
  { text: 'makes intelligence useful,', italic: true, weight: 'normal' },
  { text: 'make software matter.', italic: false, weight: 'normal' },
]

export default function TheWayWeBuild() {
  const sectionRef = useRef(null)
  const leftContainerRef = useRef(null)
  const rightLinesRef = useRef([])
  const topLineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lineElems = leftContainerRef.current?.querySelectorAll('.layer-line') || []
      const rLines = rightLinesRef.current.filter(Boolean)
      const topLine = topLineRef.current

      // Initial states
      if (topLine) gsap.set(topLine, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(lineElems, { opacity: 0, y: 30, filter: 'blur(8px)' })
      gsap.set(rLines, { opacity: 0, x: 90 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          pin: true,
          pinSpacing: true,
          refreshPriority: 18,
          scrub: 0.9,
          anticipatePin: 1,
        },
      })

      // Top decorative line extends first
      if (topLine) {
        tl.to(topLine, { scaleX: 1, duration: 0.2, ease: 'power2.inOut' }, 0)
      }

      // Left lines reveal one by one (blur + y)
      lineElems.forEach((elem, idx) => {
        tl.to(elem, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.28, ease: 'power2.out',
        }, 0.08 + idx * 0.2)
      })

      // Right lines slide in from right, one by one, AFTER left is done
      rLines.forEach((el, idx) => {
        tl.to(el, {
          opacity: 1, x: 0,
          duration: 0.3, ease: 'expo.out',
        }, 0.72 + idx * 0.14)
      })

      // Slight depth shift of left side near end
      tl.to(leftContainerRef.current, {
        y: -12, opacity: 0.88, duration: 0.3, ease: 'none',
      }, 1.55)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-way-we-build"
      className="relative w-full h-screen bg-[#000000] text-white overflow-hidden select-none flex items-center"
    >
      {/* Engineering grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="eng-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="60" cy="0" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eng-grid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1450px] w-full px-6 md:px-12 py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left Side */}
          <div
            ref={leftContainerRef}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Decorative line at TOP — extends on scroll */}
            <div className="mb-5 overflow-hidden">
              <div
                ref={topLineRef}
                style={{
                  height: '1px',
                  width: '100%',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 70%, transparent 100%)',
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)',
                }}
              />
            </div>

            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6 font-excon">
              THE WAY WE BUILD
            </div>

            {leftLines.map((line, i) => (
              <h2
                key={i}
                className="layer-line font-quilon-medium text-4xl md:text-6xl lg:text-[4.6vw] leading-[1.08] tracking-tight text-white block will-change-transform mb-1"
              >
                {line}
              </h2>
            ))}
          </div>

          {/* Right Side — lines from right */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:border-l lg:border-white/[0.08] lg:pl-12 pt-8 lg:pt-0 space-y-2">
            {rightLines.map((line, i) => (
              <div
                key={i}
                ref={el => (rightLinesRef.current[i] = el)}
                style={{
                  fontFamily: line.weight === 'bold'
                    ? "'ClashDisplay', 'Inter', sans-serif"
                    : "'QuilonRegular', 'Georgia', serif",
                  fontStyle: line.italic ? 'italic' : 'normal',
                  fontWeight: line.weight === 'bold' ? 600 : 400,
                  fontSize: line.weight === 'bold'
                    ? 'clamp(28px, 3.2vw, 52px)'
                    : 'clamp(24px, 2.6vw, 42px)',
                  letterSpacing: line.weight === 'bold' ? '-0.02em' : '-0.01em',
                  lineHeight: 1.2,
                  color: line.italic ? 'rgba(255,255,255,0.85)' : '#ffffff',
                  opacity: 0,
                  willChange: 'transform, opacity',
                }}
              >
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
