'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NODES = [
  { id: 'edge', label: 'Edge', x: 100, y: 130 },
  { id: 'gw', label: 'Gateway', x: 310, y: 85 },
  { id: 'auth', label: 'AuthZ / mTLS', x: 310, y: 210 },
  { id: 'orch', label: 'Orchestrator', x: 560, y: 148 },
  { id: 'agent', label: 'Agent Mesh', x: 800, y: 65 },
  { id: 'ml', label: 'Model Plane', x: 800, y: 235 },
  { id: 'vec', label: 'Vector Store', x: 1020, y: 148 },
  { id: 'obs', label: 'Telemetry', x: 560, y: 330 },
  { id: 'kms', label: 'KMS / Secrets', x: 1200, y: 85 },
  { id: 'audit', label: 'Audit Ledger', x: 1200, y: 235 },
]
const EDGES = [
  ['edge', 'gw'], ['edge', 'auth'], ['gw', 'orch'], ['auth', 'orch'],
  ['orch', 'agent'], ['orch', 'ml'], ['agent', 'vec'], ['ml', 'vec'],
  ['orch', 'obs'], ['vec', 'kms'], ['vec', 'audit'], ['ml', 'kms']
]

export default function Enterprise() {
  const ref = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current.querySelectorAll('path.edge')
      const nodes = svgRef.current.querySelectorAll('g.node')
      const pulses = svgRef.current.querySelectorAll('circle.pulse')

      // Set all paths with dasharray for draw animation
      paths.forEach(p => {
        const len = p.getTotalLength()
        gsap.set(p, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1, // Make sure opacity is 1 so lines are visible when drawn
        })
      })
      gsap.set(nodes, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' })
      gsap.set(pulses, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 65%',
          end: 'bottom 20%',   // Extend the end so lines complete before leaving
          scrub: 1.2,           // Slightly more scrub time so they fully draw
        }
      })

      // Draw ALL lines fully — use duration: 2 so they complete well before end
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.06,
        ease: 'power2.inOut',
      }, 0)
        .to(nodes, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'expo.out' }, 0.2)
        .to(pulses, { opacity: 1, duration: 0.25 }, 0.8)

      // continuous light pulse animation across edges (independent of scroll)
      pulses.forEach((p, i) => {
        const edge = paths[i % paths.length]
        const len = edge.getTotalLength()
        gsap.to({}, {
          duration: 2.4 + (i % 3) * 0.6,
          repeat: -1,
          ease: 'none',
          onUpdate: function () {
            const pt = edge.getPointAtLength(this.progress() * len)
            p.setAttribute('cx', pt.x)
            p.setAttribute('cy', pt.y)
          }
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  const nodeById = (id) => NODES.find(n => n.id === id)

  return (
    <section id="enterprise" ref={ref} className="relative w-full bg-[#050505] py-32 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">Enterprise</div>
            <h2 className="font-clash-display-medium text-5xl md:text-7xl mb-8">Built for scale, designed for trust.</h2>
            <p className="font-general-sans text-white/60 leading-relaxed max-w-md">A reference architecture for production AI systems. Identity at the edge. Models behind policy. Every event signed, sealed, replayable.</p>
            <ul className="mt-8 space-y-3 text-sm text-white/70 font-general-sans">
              {['SOC2-ready by default', 'BYOK / customer-managed encryption', 'Self-hosted, hybrid or fully managed', 'Sub-100ms agent orchestration'].map(s => (
                <li key={s} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-white rounded-full" />{s}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-8">
            <div className="border border-white/10 bg-[#0a0a0a] aspect-[1300/440] w-full overflow-hidden">
              <svg ref={svgRef} viewBox="0 0 1300 440" className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" /></pattern>
                  {/* Glow filter for nodes */}
                  <filter id="node-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <rect width="1300" height="440" fill="url(#grid)" />
                {/* Draw all edges with high enough opacity to be visible */}
                {EDGES.map(([a, b], i) => {
                  const A = nodeById(a), B = nodeById(b)
                  const mx = (A.x + B.x) / 2
                  const my = (A.y + B.y) / 2 - 30
                  return (
                    <path
                      key={i}
                      className="edge"
                      d={`M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`}
                      stroke="white"
                      strokeOpacity="0.6"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  )
                })}
                {EDGES.map((_, i) => (<circle key={'p' + i} className="pulse" r="3.5" fill="white" opacity="0.9" />))}
                {NODES.map(n => (
                  <g key={n.id} className="node" transform={`translate(${n.x} ${n.y})`}>
                    <circle r="24" fill="#050505" stroke="white" strokeOpacity="0.9" strokeWidth="1.5" filter="url(#node-glow)" />
                    <circle r="3.5" fill="white" />
                    <text y="46" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="1">{n.label.toUpperCase()}</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="grid grid-cols-3 mt-8 border border-white/10">
              {[['99.99%', 'Availability SLO'], ['28ms', 'p50 orchestrator latency'], ['ISO 27001', 'Roadmap Q3']].map(([k, v]) => (
                <div key={k} className="p-6 border-r last:border-r-0 border-white/10">
                  <div className="display text-3xl">{k}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}