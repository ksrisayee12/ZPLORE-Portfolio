'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '@/components/sections/Hero'
import Studio from '@/components/sections/Studio'
import TheWayWeBuild from '@/components/sections/TheWayWeBuild'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Enterprise from '@/components/sections/Enterprise'
import TheFutureIsEngineered from '@/components/sections/TheFutureIsEngineered'
import About from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import FinalEnding from '@/components/sections/FinalEnding'

const LandingAnimationWrapper = dynamic(() => import('@/components/sections/LandingAnimation').then(m => m.LandingAnimationWrapper), {
  ssr: false,
  loading: () => <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 50 }} />,
})

gsap.registerPlugin(ScrollTrigger)

export default function Page() {
  const [animationComplete, setAnimationComplete] = useState(false)

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
    // Refresh ScrollTrigger and Lenis after animation completes and content is revealed
    setTimeout(() => {
      ScrollTrigger.refresh()
      if (window.__lenis) {
        window.__lenis.resize()
      }
    }, 300)
  }

  return (
    <main className="relative bg-[#050505] text-white overflow-hidden">
      <LandingAnimationWrapper onComplete={handleAnimationComplete}>
        <div
          className="relative z-10"
          style={{
            opacity: animationComplete ? 1 : 0,
            transition: 'opacity 1.5s ease-out',
            willChange: 'opacity',
          }}
        >
          <Hero initiallyVisible={animationComplete} />
          <Studio />
          <TheWayWeBuild />
          <Projects />
          <Services />
          <Enterprise />
          <TheFutureIsEngineered />
          <About />
          <FAQ />
          <Contact />
          <FinalEnding />
        </div>
      </LandingAnimationWrapper>
    </main>
  )
}
