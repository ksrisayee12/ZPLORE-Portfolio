'use client'
import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const lightRef = useRef(null)
  const btnRef = useRef(null)
  const [focusName, setFocusName] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const move = (e) => {
      if (!lightRef.current) return
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      lightRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,255,255,0.08), transparent 60%)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // magnetic submit
  useEffect(() => {
    const el = btnRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy)
      if (dist < 180) {
        const k = (180 - dist) / 180
        el.style.transform = `translate(${dx * 0.25 * k}px, ${dy * 0.25 * k}px)`
      } else {
        el.style.transform = 'translate(0,0)'
      }
    }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }
    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { window.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = Object.fromEntries(data.entries())
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } catch (err) { }
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} className="relative w-full bg-[#050505] py-20 md:py-28 overflow-hidden">
      <div ref={lightRef} className="absolute inset-0 pointer-events-none transition-[background] duration-300" />
      {/* depth field */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.05), transparent 50%)' }} />
      </div>
      <div className="relative mx-auto max-w-[1100px] px-6 md:px-10">
        <h2 className="font-clash-display-medium text-6xl md:text-8xl leading-[0.9] text-balance">Tell us what<br /><span className="serif italic text-white/80">you're building.</span></h2>
        <div className="font-clash-display text-2xl md:text-3xl text-white/90 mt-6 leading-snug">Build What Doesn't Exist Yet. The Next System Starts With You.</div>
        <p className="font-general-sans text-white/55 mt-4 max-w-md">We reply within one business day.</p>

        {/* Direct Email Contact Pill */}
        <div className="mt-6 flex flex-wrap items-center gap-3 font-general-sans text-sm">
          <span className="text-white/50">Direct email:</span>
          <a
            href="mailto:contact@zplore.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white font-medium transition-all group shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#C4FE76] animate-pulse" />
            <span>contact@zplore.com</span>
            <span className="text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs">↗</span>
          </a>
        </div>

        {submitted ? (
          <div className="mt-16 border border-white/10 p-10 bg-white/[0.02] rounded-2xl">
            <div className="display text-3xl md:text-4xl text-white">Transmission received.</div>
            <p className="font-general-sans text-white/60 mt-3">A senior engineer will be in touch within 24 hours.</p>
            <p className="font-general-sans text-white/40 mt-4 text-xs">
              Need immediate assistance? Email us directly at <a href="mailto:contact@zplore.com" className="text-white underline underline-offset-4">contact@zplore.com</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-10">
            <Field label="Name" name="name" focusName={focusName} setFocusName={setFocusName} required />
            <Field label="Email" name="email" type="email" focusName={focusName} setFocusName={setFocusName} required />
            <div className="md:col-span-2">
              <Field label="Company" name="company" focusName={focusName} setFocusName={setFocusName} />
            </div>
            <div className="md:col-span-2">
              <Field label="Tell us about the project" name="message" textarea focusName={focusName} setFocusName={setFocusName} required />
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <div className="text-xs text-white/50 font-general-sans">
                Prefer email? Write directly to{' '}
                <a href="mailto:contact@zplore.com" className="text-white hover:underline underline-offset-4 font-medium">
                  contact@zplore.com
                </a>
              </div>
              <button ref={btnRef} type="submit" className="magnetic group relative inline-flex items-center gap-3 border border-white/30 hover:border-white px-8 py-4 text-sm tracking-wider uppercase transition-colors">
                <span>Send transmission</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
                <span className="pointer-events-none absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', focusName, setFocusName, required, textarea, placeholder }) {
  const active = focusName === name
  const common = {
    name, required,
    placeholder,
    onFocus: () => setFocusName(name),
    onBlur: () => setFocusName(null),
    className: 'peer w-full bg-transparent border-0 py-3 text-lg text-white placeholder-white/30 caret-white',
    style: {
      outline: 'none',
      boxShadow: 'none',
      WebkitAppearance: 'none',
      WebkitTapHighlightColor: 'transparent',
    },
  }
  return (
    <label className="block relative">
      <span className="font-boska-bold text-lg md:text-xl text-white/90">{label}</span>
      <div className="relative mt-2">
        {textarea ? (
          <textarea rows={4} {...common} />
        ) : (
          <input type={type} {...common} />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-white transition-transform duration-300 origin-left"
          style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }}
        />
      </div>
    </label>
  )
}
