'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function onMag(e) {
  const r = e.currentTarget.getBoundingClientRect()
  const dx = e.clientX - (r.left + r.width / 2)
  const dy = e.clientY - (r.top + r.height / 2)
  e.currentTarget.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`
  e.currentTarget.style.transition = 'transform 0.05s linear'
}
function offMag(e) {
  e.currentTarget.style.transform = 'translate(0,0)'
  e.currentTarget.style.transition = 'transform 0.35s cubic-bezier(0.23,1,0.32,1)'
}

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ initiallyVisible = false }) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headingRef.current?.querySelectorAll('.char') || []
      const cta = ctaRef.current
      const l1 = line1Ref.current
      const l2 = line2Ref.current

      if (initiallyVisible) {
        gsap.set(chars, { y: '110%', opacity: 0 })
        gsap.set([l1, l2], { y: 16, opacity: 0, filter: 'blur(5px)' })
        gsap.set(cta, { y: 20, opacity: 0 })

        gsap.to(chars, {
          y: '0%', opacity: 1,
          stagger: 0.01, duration: 0.9, ease: 'expo.out', delay: 0.05,
        })
        gsap.to(l1, {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.75, delay: 0.5, ease: 'power3.out',
        })
        gsap.to(l2, {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.75, delay: 0.65, ease: 'power3.out',
        })
        gsap.to(cta, {
          y: 0, opacity: 1, duration: 0.7, delay: 0.9, ease: 'expo.out',
        })
      } else {
        gsap.set([chars, l1, l2, cta], { opacity: 1, y: 0, filter: 'blur(0px)' })
      }

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top', end: 'bottom top', scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0.15) document.body.classList.add('hero-scrolled')
          else document.body.classList.remove('hero-scrolled')
        },
      })
      return () => st.kill()
    }, sectionRef)
    return () => ctx.revert()
  }, [initiallyVisible])

  const headlineLines = [
    'Building the Layer Beneath Innovation,',
    'Engineering the Next Layer of Intelligence.',
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.9) 100%)',
      }} />

      <div className="relative z-10 w-full flex flex-col items-center text-center px-6 md:px-10">
        <h1
          ref={headingRef}
          className="font-clash-display leading-[1.15] tracking-tight text-white"
          style={{ fontSize: 'clamp(26px, 3.8vw, 68px)', maxWidth: '1200px', width: '100%', margin: '0 auto' }}
        >
          {headlineLines.map((line, i) => (
            <div key={i} className="overflow-hidden py-1 -my-1">
              {line.split('').map((c, j) => (
                <span
                  key={j}
                  className="char inline-block"
                  style={{ whiteSpace: c === ' ' ? 'pre' : 'normal' }}
                >{c}</span>
              ))}
            </div>
          ))}
        </h1>

        {/* Sub paragraph: inline flow, only "trend that inspired them." on new line */}
        <div
          className="mt-8 font-general-sans text-white/60 text-center"
          style={{ fontSize: 'clamp(15px, 1.25vw, 20px)', maxWidth: '660px', lineHeight: 1.8 }}
        >
          <span
            ref={line1Ref}
            className="block"
            style={{ opacity: initiallyVisible ? 1 : 0 }}
          >
            Software that thinks. Systems that scale. Products that outlast the
          </span>
          <span
            ref={line2Ref}
            className="block"
            style={{ opacity: initiallyVisible ? 1 : 0 }}
          >
            trend that inspired them.
          </span>
        </div>

        <div
          ref={ctaRef}
          className="mt-12 flex items-center gap-6"
          style={{ opacity: initiallyVisible ? 1 : 0 }}
        >
          <a
            href="#the-way-we-build"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('the-way-we-build')
              if (el) {
                if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60, duration: 1.4 })
                else window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
              }
            }}
            onMouseMove={onMag}
            onMouseLeave={offMag}
            className="group inline-flex items-center text-sm border border-white/20 hover:border-white/60 px-7 py-3 rounded-full text-white font-excon tracking-wide"
            style={{ transition: 'color 0.3s, border-color 0.3s' }}
          >
            <span>Explore</span>
            <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}