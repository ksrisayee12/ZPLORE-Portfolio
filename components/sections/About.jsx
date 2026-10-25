'use client'
import { useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// New content — stat is the heading (font -3), rest is body
const BEATS = [
  {
    stat: 'Frontier',
    lines: [
      'We build for problems that haven\'t been named yet.',
      'The best work often starts before the market asks for it.',
    ],
  },
  {
    stat: 'Where We Build',
    lines: [
      'One team, five disciplines. Artificial intelligence, enterprise RAG, cybersecurity, developer platforms, and automation — built not as separate offerings, but as one connected way of solving problems.',
    ],
  },
  {
    stat: 'Scale',
    lines: [
      'Built to hold weight it hasn\'t met yet.',
      'Every solution shaped around how your business actually works.',
    ],
  },
  {
    stat: 'Assembly',
    lines: [
      'A shared space where startups, researchers, and universities create together.',
      'Knowledge moves freely here, and everyone builds a little further because of it.',
    ],
  },
  {
    stat: 'Why Organizations Trust Us',
    sub: [
      { label: 'Confidentiality', body: "What's private stays private. That's not negotiable." },
      { label: 'Verification', body: "Nothing we build asks for blind trust. It shows its work." },
      { label: 'Endurance', body: "Enterprise-grade means built to outlast the trend cycle." },
    ],
  },
  {
    stat: 'Constant',
    lines: [
      'Threat models evolve. Ours evolves with them.',
      'Security and reliability, felt rather than announced.',
    ],
  },
]

export default function About() {
  const ref = useRef(null)
  const zRef = useRef(null)
  const textRefs = useRef([])
  const initialized = useRef(false)

  // ── Fix "2021 appears twice": set initial state synchronously before paint ──
  useLayoutEffect(() => {
    textRefs.current.forEach((t, i) => {
      if (!t) return
      t.style.opacity = i === 0 ? '1' : '0'
      t.style.transform = 'translateY(0px)'
      t.style.transition = 'none'
      t.style.visibility = i === 0 ? 'visible' : 'hidden'
    })
    initialized.current = true
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = BEATS.length

      const segs = zRef.current?.querySelectorAll('path.zseg') || []
      const faces = zRef.current?.querySelectorAll('polygon.zface') || []

      segs.forEach(p => {
        try {
          const len = p.getTotalLength ? p.getTotalLength() : 300
          p.dataset.length = len
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 })
        } catch(e) {
          gsap.set(p, { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 })
        }
      })
      gsap.set(faces, { opacity: 0 })


      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: '+=' + (total * 120) + '%',
        pin: true,
        refreshPriority: 10,
        scrub: 0.7,
        onUpdate: (s) => {
          const p = s.progress

          // Drive Z geometry build
          segs.forEach((el, i) => {
            const start = i / segs.length
            const local = gsap.utils.clamp(0, 1, (p - start) / (1 / segs.length))
            el.style.opacity = (local * 0.95).toFixed(3)
            const L = parseFloat(el.dataset.length || 300)
            el.setAttribute('stroke-dashoffset', (L * (1 - local)).toFixed(2))
          })
          faces.forEach((el, i) => {
            const start = i / faces.length
            const local = gsap.utils.clamp(0, 1, (p - start) / (1 / faces.length))
            el.style.opacity = (local * 0.08).toFixed(3)
          })

          // Rotate Z group
          const g = zRef.current?.querySelector('g.zgroup')
          if (g) g.setAttribute('transform', `translate(250 250) rotate(${p * 55 - 5}) translate(-250 -250)`)

          // Text beats — only show one at a time, no glitch
          textRefs.current.forEach((t, i) => {
            if (!t) return
            const beatStart = i / total
            const beatEnd = (i + 1) / total

            // Is this beat the current one?
            const isCurrent = p >= beatStart && (i === total - 1 || p < beatEnd)
            // Fade in quickly from beatStart, fade out near beatEnd
            const fadeIn = gsap.utils.clamp(0, 1, (p - beatStart) / (0.06 / total || 0.01))
            const fadeOut = i === total - 1 ? 1 : gsap.utils.clamp(0, 1, 1 - (p - (beatEnd - 0.04)) / 0.04)
            const opacity = fadeIn * fadeOut

            // Beat 0 at p=0 must always be visible
            const finalOpacity = (i === 0 && p < 0.01) ? 1 : opacity

            t.style.opacity = finalOpacity.toFixed(3)
            t.style.visibility = finalOpacity > 0.02 ? 'visible' : 'hidden'
            t.style.transform = `translateY(${(1 - Math.min(1, fadeIn * 2)) * 20}px)`
          })
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  // Build Z path data
  const segs = []
  const faces = []
  const lineLen = 320
  for (let z = 0; z < 6; z++) {
    const off = z * 6
    segs.push({ d: `M ${100 + off} ${100 + off} L ${420 + off} ${100 + off}`, len: lineLen })
    segs.push({ d: `M ${420 + off} ${100 + off} L ${100 + off} ${420 + off}`, len: 460 })
    segs.push({ d: `M ${100 + off} ${420 + off} L ${420 + off} ${420 + off}`, len: lineLen })
  }
  for (let z = 0; z < 5; z++) {
    const off = z * 6
    faces.push(`${100 + off},${100 + off} ${420 + off},${100 + off} ${426 + off},${106 + off} ${106 + off},${106 + off}`)
    faces.push(`${100 + off},${420 + off} ${420 + off},${420 + off} ${426 + off},${426 + off} ${106 + off},${426 + off}`)
  }

  return (
    <section id="about" ref={ref} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 grid md:grid-cols-2">
        {/* Left: animated Z */}
        <div className="relative flex items-center justify-center">
          <div className="absolute top-10 left-10 text-xs uppercase tracking-[0.3em] text-white/40">About</div>
          <svg ref={zRef} viewBox="0 0 500 500" className="w-[80%] aspect-square">
            <g className="zgroup" transform="translate(250 250) rotate(-5) translate(-250 -250)">
              {faces.map((pts, i) => (
                <polygon key={'f' + i} className="zface" points={pts}
                  fill="white" fillOpacity="0.04" stroke="white"
                  strokeOpacity="0.2" strokeWidth="0.5" style={{ opacity: 0 }} />
              ))}
              {segs.map((s, i) => (
                <path key={'s' + i} className="zseg"
                  d={s.d}
                  stroke="white"
                  strokeWidth={i % 3 === 0 ? 2 : 1}
                  fill="none"
                  data-length={s.len}
                  strokeDasharray={s.len}
                  strokeDashoffset={s.len}
                  style={{ opacity: 0 }}
                  strokeLinecap="square"
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Right: text beats */}
        <div className="relative flex items-center justify-center px-8 md:px-12">
          <div className="relative w-full max-w-md h-[70vh]">
            {BEATS.map((b, i) => (
              <div
                key={i}
                ref={el => (textRefs.current[i] = el)}
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  // All start hidden; useLayoutEffect makes beat 0 visible before paint
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(0px)',
                  transition: 'none',
                }}
              >
                {/* Stat heading — font size -3 from original (was 10vw/18vw, now 7vw/13vw) */}
                <div
                  className="leading-none font-clash-display-medium"
                  style={{ fontSize: 'clamp(28px, 7vw, 72px)', letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '0.5em' }}
                >
                  {b.stat}
                </div>

                {/* Body lines */}
                {b.lines && b.lines.map((line, j) => (
                  <p key={j} className="font-general-sans text-white/65 text-base md:text-lg leading-relaxed max-w-sm mb-3">
                    {line}
                  </p>
                ))}

                {/* Sub-items (for "Why Organizations Trust Us") */}
                {b.sub && (
                  <div className="space-y-4 mt-2">
                    {b.sub.map((item, j) => (
                      <div key={j}>
                        <div className="font-excon text-white/90 text-sm uppercase tracking-[0.15em] mb-1">{item.label}</div>
                        <p className="font-general-sans text-white/55 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}