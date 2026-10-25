'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TheFutureIsEngineered() {
  const sectionRef = useRef(null)
  const posterRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const poster = posterRef.current
      if (!poster) return

      gsap.set(poster, { opacity: 0, y: 40 })

      gsap.to(poster, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-future-is-engineered"
      className="relative w-full bg-[#000000] h-[100svh] flex flex-col justify-center overflow-hidden p-4 md:p-8"
    >
      <div className="w-full h-full max-w-[1400px] mx-auto flex flex-col">

        {/* ── Editorial Poster ─────────────────────────────────────── */}
        <div
          ref={posterRef}
          className="flex-1 flex flex-col h-full"
          style={{
            opacity: 0,
            background: '#000000',
            border: '4px solid #ffffff',
            // Slightly reduced height via max-height + margin
            padding: 'clamp(14px, 2.5vh, 28px)',
            fontFamily: 'inherit',
            overflow: 'hidden',
            maxHeight: '92%',
            margin: 'auto 0',
          }}
        >

          {/* TOP STRIP: ZPLORE · 2026 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'clamp(10px, 1.8vh, 20px)',
          }}>
            <span style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(11px, 1vw, 14px)',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase',
            }}>ZPLORE</span>

            <span style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(11px, 1vw, 14px)',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)',
            }}>2026</span>
          </div>

          {/* MAIN CONTENT: left poster area + right panel */}
          <div style={{ flex: 1, display: 'flex', gap: 'clamp(14px, 2vw, 28px)', alignItems: 'stretch' }}>

            {/* LEFT — oversized headline + italic + bottom labels */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

              {/* Oversized headline block */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                
                {/* "WE DON'T FOLLOW THE FUTURE" */}
                <div style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontWeight: 500,
                  // +3 from original clamp(16px, 3vh, 32px)
                  fontSize: 'clamp(19px, 3vh, 35px)',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.8)',
                  textTransform: 'uppercase',
                  marginBottom: '1.5vh',
                }}>
                  WE DON'T FOLLOW THE FUTURE.
                </div>

                {/* Main ultra-condensed headline */}
                <div style={{
                  fontFamily: "'ClashDisplay', 'Bricolage Grotesque', 'Inter', sans-serif",
                  fontWeight: 700,
                  // +3 from original clamp(32px, 10vh, 100px)
                  fontSize: 'clamp(35px, 10vh, 103px)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  marginBottom: '0.05em',
                }}>
                  WE ENGINEER IT
                </div>

                <div style={{
                  fontFamily: "'ClashDisplay', 'Bricolage Grotesque', 'Inter', sans-serif",
                  fontWeight: 700,
                  // +3 from original
                  fontSize: 'clamp(35px, 10vh, 103px)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                }}>
                  PRODUCT BY PRODUCT
                </div>

                {/* Large italic serif word */}
                <div style={{
                  fontFamily: "'Boska', 'Georgia', 'Times New Roman', serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  // +3 from original clamp(24px, 7vh, 80px)
                  fontSize: 'clamp(27px, 7vh, 83px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  marginTop: 'clamp(6px, 1.5vh, 18px)',
                }}>
                  System by System.
                </div>
              </div>

              {/* Bottom left labels — line shifted slightly above */}
              <div style={{
                marginTop: 'clamp(6px, 1.2vh, 16px)',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                paddingTop: 'clamp(6px, 1vh, 12px)',
                display: 'flex',
                gap: 'clamp(16px, 3vw, 40px)',
                alignItems: 'flex-start',
              }}>
                <div>
                  {/* +3 on bottom label font sizes: clamp(9px→12px, 1.1vh, 12px→15px) */}
                  <div style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(12px, 1.1vh, 15px)',
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    marginBottom: '0.2em',
                  }}>WE DON'T WAIT</div>
                  <div style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(12px, 1.1vh, 15px)',
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                  }}>FOR THE FUTURE. WE ASSEMBLE IT.</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '2px' }}>
                  {/* Star ornament */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L12 22M2 12L22 12M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
                  </svg>
                </div>

                <div>
                  <div style={{
                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                    fontWeight: 500,
                    fontSize: 'clamp(12px, 1.1vh, 15px)',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    lineHeight: 1.6,
                  }}>
                    ONE SYSTEM.<br />
                    ONE PRODUCT. ONE IDEA AT A TIME.
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — taller editorial description panel, increased breadth */}
            <div style={{
              // Increased breadth: clamp(160px→220px, 20vw→26vw, 240px→320px)
              width: 'clamp(220px, 26vw, 320px)',
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.2)',
              padding: 'clamp(14px, 2vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'clamp(12px, 2vh, 20px)',
              overflowY: 'auto',
            }}>
              {/* Description text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontWeight: 400,
                  // +3 from clamp(9px, 1.1vh, 12px)
                  fontSize: 'clamp(12px, 1.1vh, 15px)',
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                  color: 'rgba(255,255,255,0.65)',
                  textTransform: 'uppercase',
                }}>
                  ZPLORE DESIGNS AND BUILDS THE INTELLIGENT SYSTEMS MODERN ORGANIZATIONS RUN ON — FROM AI PRODUCTS TO ENTERPRISE SECURITY — WHILE GROWING A COMMUNITY OF THE PEOPLE WHO BUILD THEM.
                </p>
                <p style={{
                  fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                  fontWeight: 400,
                  // +3 from clamp(9px, 1.1vh, 12px)
                  fontSize: 'clamp(12px, 1.1vh, 15px)',
                  lineHeight: 1.6,
                  letterSpacing: '0.01em',
                  color: 'rgba(255,255,255,0.65)',
                  textTransform: 'uppercase',
                }}>
                  ZPLORE EXISTS AT THE INTERSECTION OF ENGINEERING AND IMAGINATION — BUILDING PRODUCTS THAT SOLVE REAL PROBLEMS AND A COMMUNITY THAT KEEPS SOLVING THEM.
                </p>
              </div>
            </div>

          </div>{/* end main content */}
        </div>{/* end poster */}

      </div>
    </section>
  )
}