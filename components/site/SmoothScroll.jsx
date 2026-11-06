'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Disable GSAP's native ticker-based lag smoothing to keep perfectly synchronized with Lenis
    gsap.ticker.lagSmoothing(0)

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false,
    })

    document.documentElement.classList.add('lenis')
    window.__lenis = lenis
    window.lenis = lenis

    // Keep GSAP ScrollTrigger synchronized with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Tick Lenis on GSAP's RAF
    const tickerFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)

    // Handle global anchor link clicks for buttery-smooth internal navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (href && href.length > 1 && href.startsWith('#')) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          lenis.scrollTo(target, {
            offset: -30,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Refresh ScrollTrigger after initial render
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)

    return () => {
      clearTimeout(t)
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
      document.documentElement.classList.remove('lenis')
      delete window.__lenis
      delete window.lenis
    }
  }, [])

  return children
}
