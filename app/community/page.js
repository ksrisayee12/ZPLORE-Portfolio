'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Official WhatsApp Community Invitation link configuration
const WHATSAPP_COMMUNITY_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL ||
  'https://chat.whatsapp.com/invite/zplore-community'

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN SYSTEM PALETTES (Vibrant, Noticeable & Purposeful Application)
   • Palette A (Orange / Obsidian): #FE8040 (Primary CTA & highlights), #0F0F0F, #303030, #CCCCCC
   • Palette B (Electric Lime / Carbon): #C4FE76 (Telemetry, code clinics, live beacons), #272727, #FDFDFD
   • Palette C (Wine Ash): #32292F (Container surfaces & subtle stone accents)
   • Palette D (Turquoise): #99E9D9 (Research grants, compute pool, post-quantum crypto)
   • Palette E (Jet Black): #1D1D1D (Elevated surface cards)
   • Palette F (Orchid): #E5BDDF (Founder × engineer squads & creative salons)
   ───────────────────────────────────────────────────────────────────────────── */

const HERO_METRICS = [
  { val: '1,400+', label: 'Active Builders', sub: 'Verified engineers', color: '#FE8040' },
  { val: '93+', label: 'Production Repos', sub: 'Open-source codebases', color: '#C4FE76' },
  { val: '24h', label: 'Midnight Sprints', sub: 'Weekly build sessions', color: '#99E9D9' },
  { val: '0', label: 'Pitch Decks', sub: 'Code over slides', color: '#E5BDDF' }
]

const HORIZONTAL_STORY_CHAPTERS = [
  {
    chapter: '01',
    phase: 'The Knowledge Fracture',
    title: 'Theory ends where production begins.',
    quote: 'True compounding happens when you stress-test kernels at 2 AM rather than browsing surface-level AI demos.',
    image: '/images/community/workshop.jpg',
    metric: '92% of AI prototypes fail without low-level systems tuning.',
    accent: '#FE8040',
    tagBg: 'rgba(254, 128, 64, 0.15)',
    borderGlow: 'rgba(254, 128, 64, 0.3)'
  },
  {
    chapter: '02',
    phase: 'The Collective Testbed',
    title: 'Pooling compute, code, and threat models.',
    quote: 'We pool high-throughput GPU clusters, test adversarial vectors, and benchmark algorithms in air-gapped sandboxes.',
    image: '/images/community/tech-architecture.png',
    metric: 'Direct GPU compute grants allocated to verified open-source initiatives.',
    accent: '#99E9D9',
    tagBg: 'rgba(153, 233, 217, 0.15)',
    borderGlow: 'rgba(153, 233, 217, 0.3)'
  },
  {
    chapter: '03',
    phase: 'The Midnight Crucible',
    title: 'Hands on keyboards from sunset to dawn.',
    quote: 'Weekly Z/Build nights. No keynote presentations or ceremonial networking. Pick an engineering bottleneck and ship working software.',
    image: '/images/community/code-sprint.jpg',
    metric: 'Over 40 working artifacts deployed across our global hubs monthly.',
    accent: '#C4FE76',
    tagBg: 'rgba(196, 254, 118, 0.15)',
    borderGlow: 'rgba(196, 254, 118, 0.3)'
  },
  {
    chapter: '04',
    phase: 'The Compound Effect',
    title: 'From individual builder to venture scale.',
    quote: 'When senior systems architects pair with ML researchers and technical founders, resilient production platforms emerge.',
    image: '/images/community/collaboration.jpg',
    metric: '18 high-conviction teams formed directly through community squads.',
    accent: '#E5BDDF',
    tagBg: 'rgba(229, 189, 223, 0.15)',
    borderGlow: 'rgba(229, 189, 223, 0.3)'
  }
]

const GALLERY_ITEMS = [
  {
    title: 'Midnight Z/Build Sprint',
    category: 'Rapid Prototyping',
    image: '/images/community/code-sprint.jpg',
    tag: 'Weekly Rhythm',
    accent: '#FE8040',
    desc: 'Builders shipping working code from sunset to sunrise without pitch decks.'
  },
  {
    title: 'Architecture & System Clinics',
    category: 'Deep Tech Review',
    image: '/images/community/workshop.jpg',
    tag: 'Code Review',
    accent: '#C4FE76',
    desc: 'Staff engineers dissecting memory layouts, SIMD kernels, and GPU telemetry.'
  },
  {
    title: 'Founder × Engineer Pairings',
    category: 'Squad Formation',
    image: '/images/community/collaboration.jpg',
    tag: 'Co-Development',
    accent: '#E5BDDF',
    desc: 'Connecting systems architects with founders to ship pre-seed prototypes.'
  },
  {
    title: 'Z/Hack — 24h Engineering Sprints',
    category: 'Themed Hackathons',
    image: '/images/community/hackathon.jpg',
    tag: 'Competitive Build',
    accent: '#FE8040',
    desc: 'High-intensity sprints across post-quantum crypto and multi-agent meshes.'
  },
  {
    title: 'Hardware & Edge Inference Hub',
    category: 'Embedded Silicon',
    image: '/images/community/tech-architecture.png',
    tag: 'Hardware Lab',
    accent: '#99E9D9',
    desc: 'Benchmarking 4-bit quantized models on Jetson Orin and Apple Silicon.'
  },
  {
    title: 'Closed-Door Salons (Z/Convene)',
    category: 'Engineering Salon',
    image: '/images/community/meetup.jpg',
    tag: 'Chatham House',
    accent: '#E5BDDF',
    desc: 'Off-the-record architectural roundtables with leading deep-tech researchers.'
  }
]

const COVERFLOW_ITEMS = [
  {
    id: 'ai-mesh',
    title: 'Autonomous Agent Mesh',
    subtitle: 'Dynamic Context Synthesis',
    category: 'Artificial Intelligence',
    color: '#FE8040',
    metrics: 'Sub-12ms p99',
    deliverables: ['Topological Graph Pruning', 'Multi-Agent Consensus', 'Streaming Vector Indexing'],
    desc: 'Decentralized multi-agent arbitration networks and entropy-filtered knowledge graphs eliminating hallucination in production environments.',
    image: '/images/community/tech-architecture.png'
  },
  {
    id: 'systems',
    title: 'Zero-Allocation Compilers',
    subtitle: 'High-Throughput IPC',
    category: 'Distributed Systems',
    color: '#C4FE76',
    metrics: 'Microsecond Ring',
    deliverables: ['Zero-Copy Message Ring', 'SIMD / AVX-512 Kernels', 'Cache-Aware Arena Allocator'],
    desc: 'Microsecond-scale inter-process communication rings and custom arena memory allocators engineered for low-latency distributed telemetry.',
    image: '/images/community/workshop.jpg'
  },
  {
    id: 'crypto',
    title: 'Post-Quantum Verification',
    subtitle: 'FIPS 203 ML-KEM Mesh',
    category: 'Cryptographic Security',
    color: '#99E9D9',
    metrics: 'Quantum Resistant',
    deliverables: ['ML-KEM Key Encapsulation', 'Air-Gapped Sandboxes', 'Cryptographic Proof Logs'],
    desc: 'Implementing post-quantum key encapsulation algorithms, automated adversarial threat triage, and verifiable execution sandboxes.',
    image: '/images/community/code-sprint.jpg'
  },
  {
    id: 'edge',
    title: 'Edge Silicon Accelerators',
    subtitle: 'Speculative 4-Bit Inference',
    category: 'Embedded Hardware',
    color: '#FE8040',
    metrics: '15Hz+ On-Device',
    deliverables: ['Speculative Decoding Kernels', 'Asynchronous Neural VIO', 'Local Edge Runtimes'],
    desc: 'Deploying quantized neural networks onto embedded robotics, Apple Silicon neural engines, and Jetson Orin edge computing modules.',
    image: '/images/community/hackathon.jpg'
  },
  {
    id: 'knowledge-graph',
    title: 'Neural Knowledge Graphs',
    subtitle: 'Continuous Graph Reasoning',
    category: 'Knowledge Discovery',
    color: '#E5BDDF',
    metrics: '10M+ Entity Nodes',
    deliverables: ['Semantic Relation Extractors', 'Graph Attention Networks', 'Contextual Discovery Rings'],
    desc: 'Connecting unstructured concepts into navigable topological manifolds, enabling contextual discovery across vast scientific literature.',
    image: '/images/community/collaboration.jpg'
  }
]

const HELIX_STEPS = [
  {
    step: '01',
    phase: 'Discover',
    title: 'Uncover Latent Frontiers',
    tag: 'Phase 01',
    accent: '#FE8040',
    desc: 'Identify unsolved systems frictions, emerging AI paradigms, and cryptographic bottlenecks that standard tooling fails to resolve.'
  },
  {
    step: '02',
    phase: 'Learn',
    title: 'Deconstruct Live Codebases',
    tag: 'Phase 02',
    accent: '#C4FE76',
    desc: 'Step through production post-mortems, kernel profiles, and architecture clinics led by senior engineers and research fellows.'
  },
  {
    step: '03',
    phase: 'Explore',
    title: 'Stress-Test Hypotheses',
    tag: 'Phase 03',
    accent: '#99E9D9',
    desc: 'Spin up experimentation pods, benchmark multi-agent consensus protocols, and test post-quantum encapsulation limits.'
  },
  {
    step: '04',
    phase: 'Build',
    title: 'Ship Verified Artifacts',
    tag: 'Phase 04',
    accent: '#FE8040',
    desc: 'Join midnight Z/Build sessions and 24-hour sprints to turn abstract specifications into deployable, benchmarked software.'
  },
  {
    step: '05',
    phase: 'Collaborate',
    title: 'Assemble High-Conviction Squads',
    tag: 'Phase 05',
    accent: '#E5BDDF',
    desc: 'Pair technical founders with systems engineers and ML researchers to form cohesive pre-seed teams around breakthrough ideas.'
  },
  {
    step: '06',
    phase: 'Innovate',
    title: 'Access GPU Grants & Lab Credits',
    tag: 'Phase 06',
    accent: '#99E9D9',
    desc: 'Claim dedicated high-throughput compute clusters and receive peer-review publication support for frontier open-source research.'
  },
  {
    step: '07',
    phase: 'Grow',
    title: 'Compound Technical Influence',
    tag: 'Phase 07',
    accent: '#C4FE76',
    desc: 'Scale from individual contributor to ecosystem lead, mentor new builders, and launch resilient deep-tech ventures worldwide.'
  }
]

// Pillars of Membership for Wix-inspired Smooth Hover Expansion
const OFFERINGS = [
  {
    num: '01',
    category: 'Applied Knowledge',
    title: 'Technical Learning & Code Clinics',
    short: 'Code Clinics',
    headline: 'Knowledge sharing rooted in live production code, not abstract theory.',
    body: 'We dissect distributed architectures, applied LLM reasoning, post-quantum crypto protocols, and GPU kernel optimizations through hands-on code walkthroughs and architectural stress-testing.',
    points: [
      'Bi-weekly architectural review clinics',
      'Production post-mortems & scaling studies',
      'Shared internal benchmark scripts',
      'Direct code reviews with staff engineers'
    ],
    accent: '#FE8040', // Orange
    image: '/images/community/workshop.jpg',
    tag: 'Hands-on Code'
  },
  {
    num: '02',
    category: 'Collaborative Build',
    title: 'Project Collaboration & Squad Formation',
    short: 'Squad Formation',
    headline: 'Form high-conviction engineering teams around ambitious ideas.',
    body: 'Building complex technology alone is slow. We connect technical founders, systems engineers, and ML researchers into agile build squads to validate prototypes, test threat vectors, and ship working software.',
    points: [
      'Founder × Systems Engineer pairings',
      'Cross-stack experimentation squads',
      'Prototype feedback rings before launch',
      'Pre-seed technical advisory & reviews'
    ],
    accent: '#E5BDDF', // Orchid
    image: '/images/community/collaboration.jpg',
    tag: 'Co-Development'
  },
  {
    num: '03',
    category: 'Rapid Prototyping',
    title: 'Z/Hack Sprints & Midnight Build Nights',
    short: 'Midnight Sprints',
    headline: 'High-intensity build sessions designed to turn ideas into verifiable artifacts.',
    body: 'Weekly midnight build sessions and 24-hour themed hackathons. Pick a tangible friction in autonomous agents, security triage, or edge inference—and demo a working deployment by morning.',
    points: [
      'Weekly midnight Z/Build sessions',
      'Themed 24h engineering hackathons (Z/Hack)',
      'Live benchmarking testbeds',
      'Fast-track technical introductions'
    ],
    accent: '#C4FE76', // Electric Lime
    image: '/images/community/hackathon.jpg',
    tag: 'Midnight Sprints'
  },
  {
    num: '04',
    category: 'Frontier Grants',
    title: 'Open Research Grants & Compute Pool',
    short: 'Compute Pool',
    headline: 'Direct compute allocation and publication support for independent labs.',
    body: 'We fund curiosity. Independent researchers and student labs exploring novel context-retrieval topologies, graph reasoning, or hardware acceleration receive direct GPU compute credits and publication mentorship.',
    points: [
      'GPU compute clusters & experimentation credits',
      'Research publication and peer-review backing',
      'Benchmarking infrastructure on edge accelerators',
      'Direct collaboration with Zplore research staff'
    ],
    accent: '#99E9D9', // Turquoise
    image: '/images/community/tech-architecture.png',
    tag: 'Research Pool'
  }
]

const PRINCIPLES = [
  {
    num: '01',
    title: 'Code Over Slides',
    text: 'We value working implementations, benchmark scripts, and verifiable telemetry over hypothetical pitch decks and promotional promises.',
    accent: '#FE8040'
  },
  {
    num: '02',
    title: 'Open Technical Exchange',
    text: 'Knowledge multiplies when shared with clarity. We encourage transparent code audits, honest failure post-mortems, and collaborative clinics.',
    accent: '#C4FE76'
  },
  {
    num: '03',
    title: 'Constructive Technical Rigor',
    text: 'Feedback should be specific, empirical, and aimed at elevating system resilience, security posture, and engineering standards.',
    accent: '#99E9D9'
  },
  {
    num: '04',
    title: 'Zero Commercial Spam',
    text: 'No unsolicited business development, speculative crypto pitches, or sales funnels. Every conversation is anchored in technology and craft.',
    accent: '#E5BDDF'
  }
]

const FAQS = [
  {
    q: 'What is Zplore Community?',
    a: 'Zplore Community is the public technology ecosystem surrounding Zplore. It is a shared environment where engineers, researchers, and technical founders connect to learn, collaborate on deep-tech prototypes, access compute grants, and attend in-person and virtual build sessions.',
    accent: '#FE8040'
  },
  {
    q: 'Who is eligible to join?',
    a: 'Anyone passionate about technology and serious about building. Whether you are an undergraduate exploring your first systems project, a senior engineer curious about GPU kernels, or an independent researcher exploring AI context retrieval, you are welcome.',
    accent: '#C4FE76'
  },
  {
    q: 'Are there any membership fees or equity demands?',
    a: 'No. Zplore Community is 100% free and open. There are no dues, subscription tiers, or equity concessions. The community exists purely to cultivate compounding technical talent and high-signal collaborations.',
    accent: '#99E9D9'
  },
  {
    q: 'Why is the primary community hosted on WhatsApp?',
    a: 'WhatsApp provides immediate, low-latency, friction-free communication for announcements, build night RSVPs, spontaneous technical questions, and hub coordination. Code repositories, documentation, and papers are hosted on GitHub.',
    accent: '#FE8040'
  },
  {
    q: 'What kinds of activities happen on a regular basis?',
    a: 'We host weekly midnight Z/Build sessions, monthly technical masterclasses, 24-hour themed hackathons (Z/Hack), and quarterly closed-door salons (Z/Convene), alongside rolling compute grant allocations.',
    accent: '#E5BDDF'
  },
  {
    q: 'Can I find co-founders or collaborate on startups?',
    a: 'Yes. Collaborative co-building is one of our strongest pillars. We facilitate Founder × Systems Engineer pairings and provide early architectural clinics to help pre-seed prototypes reach production readiness.',
    accent: '#C4FE76'
  }
]

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT IMPLEMENTATION
   ───────────────────────────────────────────────────────────────────────────── */

export default function CommunityPage() {
  const containerRef = useRef(null)
  const heroMediaRef = useRef(null)
  const horizontalStoryRef = useRef(null)
  const horizontalTrackRef = useRef(null)
  const helixSectionRef = useRef(null)
  const galleryTrackRef = useRef(null)
  const videoSectionRef = useRef(null)

  // State Management
  const [navScrolled, setNavScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeCoverflow, setActiveCoverflow] = useState(2)
  const [isPlayingMedia, setIsPlayingMedia] = useState(false)
  const [hasAutoplayTriggered, setHasAutoplayTriggered] = useState(false)
  const [activeHelixIndex, setActiveHelixIndex] = useState(0)
  const [activeStoryChapter, setActiveStoryChapter] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const [hoveredFaq, setHoveredFaq] = useState(null)
  const [activeExpandedPillar, setActiveExpandedPillar] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dragging state for Horizontal Gallery
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  // FAQ Toggle
  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  // Coverflow Navigation
  const prevCoverflow = () => {
    setActiveCoverflow((prev) => (prev > 0 ? prev - 1 : COVERFLOW_ITEMS.length - 1))
  }
  const nextCoverflow = () => {
    setActiveCoverflow((prev) => (prev < COVERFLOW_ITEMS.length - 1 ? prev + 1 : 0))
  }

  // Keyboard navigation for 3D Coverflow
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevCoverflow()
      if (e.key === 'ArrowRight') nextCoverflow()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Navbar Scroll & Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      setNavScrolled(totalScroll > 40)
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Continuous Seamless Autoplay for Horizontal Gallery (NO pause on hover)
  useEffect(() => {
    const track = galleryTrackRef.current
    if (!track) return

    let animId
    const step = () => {
      if (!isDraggingRef.current) {
        track.scrollLeft += 1.15
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0
        }
      }
      animId = requestAnimationFrame(step)
    }
    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Global mouseup listener to release drag
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
      }
    }
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  // Builders in Production: Viewport Autoplay Detection via IntersectionObserver
  useEffect(() => {
    const sec = videoSectionRef.current
    if (!sec) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoplayTriggered) {
          setIsPlayingMedia(true)
          setHasAutoplayTriggered(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(sec)
    return () => observer.disconnect()
  }, [hasAutoplayTriggered])

  // GSAP Orchestration: Reveals, Parallax, Pinned Horizontal Scroll, Rebuilt 3D Helix
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Masked Line Reveals
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTl
        .fromTo('.hero-kicker', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo('.hero-line-inner', { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 1.1 }, '-=0.5')
        .fromTo('.hero-body', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .fromTo('.hero-cta-group', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo('.hero-stat-box', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 }, '-=0.5')
        .fromTo(
          '.hero-image-reveal',
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'expo.out' },
          '-=1.2'
        )

      // 2. Hero Parallax on Photographic Panel
      if (heroMediaRef.current) {
        gsap.to(heroMediaRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-image-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      }

      // 3. Typographic Manifesto Mask Reveal
      gsap.fromTo(
        '.manifesto-line',
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#manifesto',
            start: 'top 80%'
          }
        }
      )

      // 4. Section Header Reveals
      gsap.utils.toArray('.section-header-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' }
          }
        )
      })

      // 5. Generic Card Reveals
      gsap.utils.toArray('.reveal-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }
          }
        )
      })

      // 6. PINNED HORIZONTAL SCROLL STORYTELLING (Fixed Alignment & Header Clearance)
      const storySec = horizontalStoryRef.current
      const storyTrack = horizontalTrackRef.current
      if (storySec && storyTrack) {
        const totalSlides = HORIZONTAL_STORY_CHAPTERS.length
        
        ScrollTrigger.create({
          trigger: storySec,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${storyTrack.scrollWidth - window.innerWidth + 300}`,
          onUpdate: (self) => {
            const maxScroll = storyTrack.scrollWidth - window.innerWidth + 120
            gsap.set(storyTrack, { x: -self.progress * maxScroll })
            const currentChapter = Math.min(
              totalSlides - 1,
              Math.max(0, Math.floor(self.progress * totalSlides))
            )
            setActiveStoryChapter(currentChapter)
          }
        })
      }

      // 7. MATHEMATICALLY CONSISTENT 3D HELIX PROGRESSION
      // Orbiting around a central vertical axis at (X=0, Z=-140px).
      // Continuous 3D helical spiral trajectory:
      // u = i - progress * (totalSteps - 1)
      // angle = u * angleStep
      // X = sin(angle) * Rx
      // Z = cos(angle) * Rz - Rz
      // Y = -u * verticalStep
      // rotateY = -sin(angle) * 18deg (controlled tangent convergence, NEVER reversed or mirrored)
      const helixSec = helixSectionRef.current
      if (helixSec) {
        const cards = gsap.utils.toArray('.helix-node-card')
        const totalSteps = HELIX_STEPS.length

        const updateHelix = (p) => {
          const clampedP = Math.max(0, Math.min(1, p))
          const currentFocus = clampedP * (totalSteps - 1)
          const activeIdx = Math.min(totalSteps - 1, Math.max(0, Math.round(currentFocus)))
          setActiveHelixIndex(activeIdx)

          const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
          const rx = winWidth < 1024 ? 220 : 380
          const rz = winWidth < 1024 ? 160 : 250
          const verticalStep = winWidth < 1024 ? 46 : 65
          const angleStep = 64 * (Math.PI / 180) // 64 degrees in radians

          cards.forEach((card, i) => {
            const u = i - currentFocus
            const angle = u * angleStep
            const dist = Math.abs(u)

            // Helical coordinates along cylinder
            const x = Math.sin(angle) * rx
            const z = (Math.cos(angle) - 1) * rz // 0 at front, negative in depth
            const y = -u * verticalStep

            // Controlled orientation: cards face viewer with gentle tangent convergence
            // Completely eliminates inverted, flipped, or backwards text!
            const rotateY = -Math.sin(angle) * 18
            const rotateX = 0
            const rotateZ = 0

            // 3-Level Depth Hierarchy: Active, Adjacent, Distant
            let opacity = 0
            let scale = 0.72
            let pointerEvents = 'none'

            if (dist <= 0.4) {
              // Active card: foreground, prominent, fully readable
              opacity = 1.0
              scale = 1.04
              pointerEvents = 'auto'
            } else if (dist < 1.3) {
              // Adjacent cards: clearly distinguishable in 3D orbit, separated
              opacity = 0.80 - (dist - 0.4) * 0.35 // 0.80 down to 0.48
              scale = 0.88 - (dist - 0.4) * 0.12 // 0.88 down to 0.77
              pointerEvents = 'auto'
            } else if (dist < 2.0) {
              // Distant cards: subtle presence, fading smoothly into depth
              opacity = Math.max(0, ((2.0 - dist) / 0.7) * 0.35)
              scale = 0.72
              pointerEvents = 'none'
            } else {
              // Beyond visible spiral envelope: zero opacity prevents collisions & heading overlap
              opacity = 0
              scale = 0.70
              pointerEvents = 'none'
            }

            gsap.set(card, {
              x,
              y,
              z,
              rotateY,
              rotateX,
              rotateZ,
              scale,
              opacity,
              zIndex: Math.round(z + 1000), // Front cards ALWAYS render on top
              pointerEvents
            })
          })
        }

        // Initialize immediately at start so Card 0 is positioned on load
        updateHelix(0)

        ScrollTrigger.create({
          id: 'helix-trigger',
          trigger: helixSec,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            updateHelix(self.progress)
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Manual scroll for horizontal gallery
  const scrollGallery = (direction) => {
    if (!galleryTrackRef.current) return
    const offset = direction === 'left' ? -360 : 360
    galleryTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  // Pointer drag event handlers for Gallery Track
  const handleMouseDown = (e) => {
    isDraggingRef.current = true
    dragStartXRef.current = e.pageX - galleryTrackRef.current.offsetLeft
    scrollLeftRef.current = galleryTrackRef.current.scrollLeft
  }
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !galleryTrackRef.current) return
    e.preventDefault()
    const x = e.pageX - galleryTrackRef.current.offsetLeft
    const walk = (x - dragStartXRef.current) * 1.5
    galleryTrackRef.current.scrollLeft = scrollLeftRef.current - walk
  }
  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  // Smooth scroll navigation to a specific Helix Stage
  const scrollToHelixStep = (stepIdx) => {
    const st = ScrollTrigger.getById('helix-trigger')
    if (st) {
      const totalSteps = HELIX_STEPS.length
      const targetProgress = stepIdx / (totalSteps - 1)
      const targetScroll = st.start + targetProgress * (st.end - st.start)
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    } else {
      setActiveHelixIndex(stepIdx)
    }
  }

  const activeCoverflowItem = COVERFLOW_ITEMS[activeCoverflow]

  return (
    <main
      ref={containerRef}
      className="relative bg-[#0F0F0F] text-[#CCCCCC] min-h-screen selection:bg-[#FE8040] selection:text-white font-general-sans antialiased overflow-x-hidden"
    >
      {/* ── TOP SCROLL PROGRESS INDICATOR ── */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#FE8040] via-[#C4FE76] to-[#99E9D9] z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 01: COMMUNITY NAVBAR (Matches original Nav animations & styling)
      ═══════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 transition-all duration-500">
          <div
            className={`flex items-center justify-between rounded-full transition-all duration-500 ${
              navScrolled
                ? 'backdrop-blur-xl bg-black/60 border border-white/10 px-6 py-3 shadow-2xl'
                : 'px-0 py-0'
            }`}
          >
            {/* Brand Logo & Live Community Badge */}
            <Link href="/" className="group flex items-center gap-2.5">
              <ZMark />
              <span className="text-[15px] tracking-[-0.02em] font-medium text-white">Zplore</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FE76] animate-pulse" />
              <span className="text-[11px] uppercase tracking-wider font-jetbrains-mono text-[#FE8040] hidden sm:inline">
                Community
              </span>
            </Link>

            {/* Desktop Navigation Links — HOME is first, pointing to / */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              <Link
                href="/"
                className="text-[13px] xl:text-[14px] text-white/90 hover:text-white transition-colors underline-draw font-excon flex items-center gap-1 font-medium"
              >
                <span>←</span>
                <span>Home</span>
              </Link>
              <a href="#manifesto" className="text-[13px] xl:text-[14px] text-white/80 hover:text-white transition-colors underline-draw font-excon">
                Manifesto
              </a>
              <a href="#story" className="text-[13px] xl:text-[14px] text-white/80 hover:text-white transition-colors underline-draw font-excon">
                Story
              </a>
              <a href="#offerings" className="text-[13px] xl:text-[14px] text-white/80 hover:text-white transition-colors underline-draw font-excon">
                Pillars
              </a>
              <a href="#coverflow" className="text-[13px] xl:text-[14px] text-white/80 hover:text-white transition-colors underline-draw font-excon">
                Disciplines
              </a>
              <a href="#gallery" className="text-[13px] xl:text-[14px] text-white/80 hover:text-white transition-colors underline-draw font-excon">
                Moments
              </a>
              <a href="#helix" className="text-[13px] xl:text-[14px] text-white/80 hover:text-white transition-colors underline-draw font-excon">
                Journey
              </a>
              <a href="#faq" className="text-[13px] xl:text-[14px] text-white/80 hover:text-white transition-colors underline-draw font-excon">
                FAQ
              </a>
            </nav>

            {/* Action Button: WhatsApp Pill */}
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 bg-[#FE8040] hover:bg-[#e66c2e] text-white px-4 xl:px-5 py-2 rounded-full text-[13px] font-semibold transition-all font-excon shadow-lg group"
            >
              <span>Join WhatsApp</span>
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>

            {/* Mobile / Tablet Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-px bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
              <div className={`w-6 h-px bg-white mt-1.5 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[68px] bg-black/95 backdrop-blur-2xl z-40 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-5 text-2xl font-excon">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FE8040] font-semibold flex items-center gap-2 pb-3 border-b border-[#272727]"
              >
                <span>←</span>
                <span>Home</span>
              </Link>
              <a href="#manifesto" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                Manifesto
              </a>
              <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                Story
              </a>
              <a href="#offerings" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                Community Pillars
              </a>
              <a href="#coverflow" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                Disciplines
              </a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                Moments
              </a>
              <a href="#helix" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                Journey
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-white/80 hover:text-white">
                FAQ
              </a>
            </div>
            <div className="pt-6">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FE8040] text-white py-3.5 rounded-full text-base font-semibold font-excon shadow-lg"
              >
                <span>Join WhatsApp Community</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 02: HERO — ASYMMETRIC EDITORIAL MASTER COMPOSITION
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 border-b border-[#272727] overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Editorial Headline & Conversion */}
            <div className="lg:col-span-7">
              <div className="hero-kicker inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#1D1D1D] border border-[#303030] text-xs font-jetbrains-mono uppercase tracking-widest text-[#CCCCCC] mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#C4FE76] animate-ping" />
                <span className="text-[#FDFDFD]">The Zplore Practitioner Collective</span>
                <span className="text-[#FE8040]">●</span>
              </div>

              <h1 className="font-clash-display text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#FDFDFD] leading-[1.04]">
                <span className="block overflow-hidden">
                  <span className="hero-line-inner block">Where engineers &</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-line-inner block">
                    researchers build{' '}
                    <span className="italic font-serif text-[#FE8040] font-medium">verifiable</span>
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="hero-line-inner block text-[#CCCCCC]">
                    software together.
                  </span>
                </span>
              </h1>

              <p className="hero-body mt-8 text-base sm:text-lg font-general-sans text-[#CCCCCC] leading-relaxed max-w-xl">
                We reject pitch-deck theater and generic SaaS fluff. Zplore Community is a home for systems architects, applied AI researchers, and technical founders collaborating on distributed runtimes, post-quantum crypto, and multi-agent topologies.
              </p>

              <div className="hero-cta-group mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FE8040] hover:bg-[#e66c2e] text-white font-excon text-sm font-semibold transition-all shadow-xl group"
                >
                  <span>Join Our WhatsApp Community</span>
                  <span className="text-base leading-none transition-transform group-hover:translate-x-1">↗</span>
                </a>
                <a
                  href="#manifesto"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#303030] bg-[#1D1D1D]/70 text-[#CCCCCC] hover:text-[#FDFDFD] hover:border-white/40 font-excon text-sm transition-all shadow-sm"
                >
                  <span>Read The Manifesto</span>
                  <span>↓</span>
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-[#272727] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {HERO_METRICS.map((metric, i) => (
                  <div
                    key={i}
                    className="hero-stat-box p-3.5 rounded-2xl bg-[#1D1D1D] border border-[#272727] hover:border-[#383838] transition-all"
                  >
                    <div className="font-clash-display text-2xl font-semibold text-[#FDFDFD]">
                      {metric.val}
                    </div>
                    <div
                      className="text-[11px] font-jetbrains-mono uppercase tracking-wider mt-0.5 font-medium"
                      style={{ color: metric.color }}
                    >
                      {metric.label}
                    </div>
                    <div className="text-[10px] font-general-sans text-[#CCCCCC]/60 mt-0.5">
                      {metric.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Layered Editorial Photographic Composition */}
            <div className="lg:col-span-5">
              <div className="hero-image-container relative rounded-3xl overflow-hidden border border-[#272727] bg-[#1D1D1D] aspect-[4/3] sm:aspect-[16/12] shadow-2xl">
                <div
                  ref={heroMediaRef}
                  className="hero-image-reveal relative w-full h-[115%] -top-[7%]"
                >
                  <Image
                    src="/images/community/hero-editorial.jpg"
                    alt="Zplore community technical hub collaboration"
                    fill
                    priority
                    className="object-cover filter brightness-95 contrast-105"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-jetbrains-mono text-[#99E9D9] bg-[#99E9D9]/15 border border-[#99E9D9]/30 px-2.5 py-0.5 rounded-full">
                      Live Physical & Virtual Staging
                    </span>
                    <div className="font-clash-display text-xl font-medium text-[#FDFDFD] mt-2">
                      Bengaluru Hub & Global Staging Nodes
                    </div>
                  </div>
                  <div className="text-right font-jetbrains-mono text-xs text-[#C4FE76] font-semibold">
                    Weekly 24h Sprints
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 03: TYPOGRAPHIC MANIFESTO STATEMENT (MASK REVEAL)
      ═══════════════════════════════════════════════════════════ */}
      <section id="manifesto" className="relative py-24 md:py-32 border-b border-[#272727] bg-[#000000]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-6 inline-block font-semibold">
              THE ZPLORE ENGINEERING COMPACT
            </span>
            <div className="overflow-hidden">
              <h2 className="manifesto-line font-clash-display text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.18] text-[#FDFDFD] tracking-tight">
                Technology compounds through code, benchmarks, and honest post-mortems —{' '}
                <span className="italic font-serif text-[#C4FE76]">never speculative pitch decks.</span>
              </h2>
            </div>
            <p className="mt-8 text-base sm:text-lg font-general-sans text-[#CCCCCC] leading-relaxed max-w-2xl mx-auto">
              We provide the missing link between theoretical paper publications and resilient production architectures. Everything we build is tested under real-world load, verified in sandboxes, and shared openly.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04: PINNED HORIZONTAL SCROLL STORYTELLING
          (Balanced Card Dimensions, Reduced Padding, Fully Visible in Viewport)
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={horizontalStoryRef}
        id="story"
        className="relative py-16 md:py-20 border-b border-[#272727] bg-[#0F0F0F] overflow-hidden flex flex-col justify-between"
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 w-full mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] block mb-2 font-semibold">
              02 // PINNED STORYTELLING SEQUENCE
            </span>
            <h2 className="font-clash-display text-2xl sm:text-4xl md:text-5xl font-normal text-[#FDFDFD]">
              How Builders Compound Through Zplore.
            </h2>
          </div>
          <div className="text-xs font-jetbrains-mono text-[#CCCCCC] bg-[#1D1D1D] px-3.5 py-1.5 rounded-full border border-[#272727]">
            Active Chapter: <span className="text-[#FE8040] font-semibold">0{activeStoryChapter + 1}</span> of 0{HORIZONTAL_STORY_CHAPTERS.length}
          </div>
        </div>

        {/* Horizontal Track with Balanced Card Width (~380-420px) and Image Height (~160px) */}
        <div
          ref={horizontalTrackRef}
          className="flex gap-6 sm:gap-7 pl-6 md:pl-10 will-change-transform py-2"
        >
          {HORIZONTAL_STORY_CHAPTERS.map((ch) => (
            <div
              key={ch.chapter}
              className="w-[340px] sm:w-[380px] md:w-[420px] flex-shrink-0 rounded-3xl bg-[#1D1D1D] border border-[#272727] p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all"
              style={{ borderColor: ch.borderGlow }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#272727] mb-5">
                  <span
                    className="text-[11px] font-jetbrains-mono uppercase px-3 py-0.5 rounded-full font-semibold border"
                    style={{ backgroundColor: ch.tagBg, color: ch.accent, borderColor: `${ch.accent}40` }}
                  >
                    Chapter {ch.chapter}
                  </span>
                  <span className="text-xs font-jetbrains-mono text-[#CCCCCC]/70 uppercase">
                    {ch.phase}
                  </span>
                </div>

                <h3 className="font-clash-display text-xl sm:text-2xl font-medium text-[#FDFDFD] mb-3 leading-snug">
                  {ch.title}
                </h3>

                <blockquote className="text-xs sm:text-sm font-general-sans text-[#CCCCCC] leading-relaxed mb-5 italic">
                  "{ch.quote}"
                </blockquote>

                <div
                  className="p-3.5 rounded-xl border text-[11px] font-jetbrains-mono font-medium"
                  style={{ backgroundColor: '#141416', borderColor: `${ch.accent}30`, color: '#FDFDFD' }}
                >
                  <span style={{ color: ch.accent }}>⚡</span> {ch.metric}
                </div>
              </div>

              {/* Controlled image height ~160px with consistent object-cover */}
              <div className="mt-6 relative h-[150px] sm:h-[165px] w-full rounded-2xl overflow-hidden border border-[#272727]">
                <Image
                  src={ch.image}
                  alt={ch.title}
                  fill
                  className="object-cover filter contrast-105"
                  sizes="420px"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-[1360px] mx-auto px-6 md:px-10 w-full mt-6 flex items-center justify-between text-xs font-jetbrains-mono text-[#CCCCCC]/60">
          <span>Scroll down to advance chapters</span>
          <span className="text-[#C4FE76]">● Active Sequence</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 04: WIX-INSPIRED HOVER EXPANSION (SMOOTH & POLISHED)
          (Coordinated transitions: heading, description, checklist items)
      ═══════════════════════════════════════════════════════════ */}
      <section id="offerings" className="relative py-20 md:py-28 border-b border-[#272727] bg-[#000000]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="section-header-reveal text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-3 font-semibold">
                03 // CORE MEMBERSHIP PILLARS
              </div>
              <h2 className="section-header-reveal font-clash-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#FDFDFD] tracking-tight">
                Interactive Pillars of Craft.
              </h2>
            </div>
            <p className="section-header-reveal text-sm font-general-sans text-[#CCCCCC] max-w-sm">
              Hover over any pillar to explore its architectural scope and inspection points.
            </p>
          </div>

          {/* Desktop Wix-Inspired Smooth Expanding Accordion Row */}
          <div className="hidden lg:flex gap-5 items-stretch h-[480px]">
            {OFFERINGS.map((pillar, idx) => {
              const isExpanded = activeExpandedPillar === idx
              return (
                <div
                  key={pillar.num}
                  onMouseEnter={() => setActiveExpandedPillar(idx)}
                  className="relative rounded-3xl overflow-hidden border cursor-pointer transition-[flex-grow,flex-basis,background-color,border-color,box-shadow] duration-500 ease-out flex flex-col justify-between"
                  style={{
                    flexGrow: isExpanded ? 2.8 : 0.9,
                    flexBasis: isExpanded ? '440px' : '160px',
                    backgroundColor: isExpanded ? '#1D1D1D' : '#141416',
                    borderColor: isExpanded ? pillar.accent : '#272727',
                    boxShadow: isExpanded ? `0 20px 40px -15px ${pillar.accent}30` : 'none'
                  }}
                >
                  {/* Background Image with Controlled Dimming */}
                  <div className="absolute inset-0 -z-10 overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className={`object-cover transition-transform duration-700 ease-out filter contrast-105 ${
                        isExpanded ? 'scale-105 brightness-[0.35]' : 'scale-100 brightness-[0.20]'
                      }`}
                      sizes="550px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>

                  {/* Top Bar: Number & Tag (Always Stable) */}
                  <div className="p-7 flex items-center justify-between">
                    <span className="font-jetbrains-mono text-sm text-[#CCCCCC]">
                      #{pillar.num}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-wider font-jetbrains-mono px-3 py-1 rounded-full border transition-colors"
                      style={{
                        backgroundColor: `${pillar.accent}20`,
                        color: pillar.accent,
                        borderColor: `${pillar.accent}50`
                      }}
                    >
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Body Content with Smooth Opacity & Slide-Up (No sudden text jumps) */}
                  <div className="p-7">
                    <span className="text-xs uppercase font-jetbrains-mono block mb-1.5 transition-colors" style={{ color: pillar.accent }}>
                      {pillar.category}
                    </span>
                    
                    <h3 className="font-clash-display font-medium text-[#FDFDFD] mb-2 leading-snug transition-all duration-300 text-xl sm:text-2xl">
                      {isExpanded ? pillar.title : pillar.short}
                    </h3>

                    {/* Expandable Text Container: Smooth transition with zero layout jitter */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isExpanded
                          ? 'max-h-[260px] opacity-100 translate-y-0 mt-3'
                          : 'max-h-0 opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-general-sans text-[#FDFDFD]/90 font-medium mb-2.5">
                        {pillar.headline}
                      </p>
                      <p className="text-xs font-general-sans text-[#CCCCCC] leading-relaxed mb-4 max-w-md">
                        {pillar.body}
                      </p>

                      {/* Checklist Points */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#303030] mb-4">
                        {pillar.points.map((pt, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] font-general-sans text-[#CCCCCC]">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: pillar.accent }} />
                            <span className="truncate">{pt}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href={WHATSAPP_COMMUNITY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-excon uppercase tracking-wider text-white hover:underline transition-all"
                        style={{ color: pillar.accent }}
                      >
                        <span>Access via WhatsApp Community</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile & Tablet Interactive Accordion Fallback */}
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {OFFERINGS.map((pillar, idx) => {
              const isExpanded = activeExpandedPillar === idx
              return (
                <div
                  key={pillar.num}
                  onClick={() => setActiveExpandedPillar(isExpanded ? null : idx)}
                  className="rounded-2xl bg-[#1D1D1D] border p-6 transition-all"
                  style={{ borderColor: isExpanded ? pillar.accent : '#272727' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-jetbrains-mono block" style={{ color: pillar.accent }}>
                        #{pillar.num} // {pillar.category}
                      </span>
                      <h3 className="font-clash-display text-xl font-medium text-[#FDFDFD] mt-1">
                        {pillar.title}
                      </h3>
                    </div>
                    <span className="text-xl font-light" style={{ color: pillar.accent }}>
                      {isExpanded ? '−' : '+'}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#272727]">
                      <p className="text-xs font-general-sans text-[#CCCCCC] leading-relaxed mb-4">
                        {pillar.body}
                      </p>
                      <div className="space-y-1.5 mb-4">
                        {pillar.points.map((pt, i) => (
                          <div key={i} className="text-xs text-[#CCCCCC] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pillar.accent }} />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={WHATSAPP_COMMUNITY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-excon uppercase font-semibold"
                        style={{ color: pillar.accent }}
                      >
                        Join via WhatsApp →
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 05: MOTION.DEV-INSPIRED 3D COVERFLOW GALLERY
          (Compact Height, Fits Comfortably in Viewport)
      ═══════════════════════════════════════════════════════════ */}
      <section id="coverflow" className="relative py-16 md:py-20 border-b border-[#272727] bg-[#0F0F0F] overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="section-header-reveal text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-2 font-semibold">
              04 // 3D COVERFLOW EXPLORER
            </div>
            <h2 className="section-header-reveal font-clash-display text-2xl sm:text-4xl font-normal text-[#FDFDFD] tracking-tight">
              Frontier Technical Disciplines.
            </h2>
            <p className="section-header-reveal mt-2 text-xs sm:text-sm font-general-sans text-[#CCCCCC]">
              Explore active engineering tracks with true 3D spatial perspective.
            </p>
          </div>

          {/* 3D Perspective Stage — Compact Height ~320px */}
          <div
            className="relative h-[310px] sm:h-[340px] flex items-center justify-center my-6"
            style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
          >
            {COVERFLOW_ITEMS.map((item, idx) => {
              const offset = idx - activeCoverflow
              const isCenter = offset === 0
              const absOffset = Math.abs(offset)

              const translateX = offset * 210
              const translateZ = -absOffset * 150
              const rotateY = offset * -25
              const scale = isCenter ? 1 : Math.max(0.74, 1 - absOffset * 0.14)
              const opacity = isCenter ? 1 : Math.max(0.42, 0.90 - absOffset * 0.20)
              const zIndex = 50 - absOffset

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCoverflow(idx)}
                  className="absolute w-[240px] sm:w-[270px] md:w-[290px] aspect-[4/5] rounded-3xl bg-[#1D1D1D] border overflow-hidden cursor-pointer transition-transform duration-500 ease-out shadow-xl flex flex-col justify-between"
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    borderColor: isCenter ? item.color : '#272727',
                    boxShadow: isCenter ? `0 20px 40px -10px ${item.color}40` : 'none'
                  }}
                >
                  <div className="relative h-[135px] sm:h-[150px] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover filter brightness-90 contrast-105"
                      sizes="290px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[9px] font-jetbrains-mono uppercase px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border"
                        style={{ color: item.color, borderColor: `${item.color}40` }}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="text-[10px] font-jetbrains-mono uppercase tracking-wider mb-1 font-semibold" style={{ color: item.color }}>
                      SLO: {item.metrics}
                    </div>
                    <h3 className="font-clash-display text-base sm:text-lg font-medium text-[#FDFDFD] mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-general-sans text-[#CCCCCC] line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={prevCoverflow}
              aria-label="Previous 3D item"
              className="w-10 h-10 rounded-full border border-[#303030] bg-[#1D1D1D] hover:bg-[#272727] text-[#FDFDFD] flex items-center justify-center text-base transition-all cursor-pointer"
            >
              ←
            </button>
            <div className="flex items-center gap-1.5">
              {COVERFLOW_ITEMS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCoverflow(i)}
                  aria-label={`Jump to item ${i + 1}`}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: activeCoverflow === i ? '24px' : '6px',
                    backgroundColor: activeCoverflow === i ? item.color : '#303030'
                  }}
                />
              ))}
            </div>
            <button
              onClick={nextCoverflow}
              aria-label="Next 3D item"
              className="w-10 h-10 rounded-full border border-[#303030] bg-[#1D1D1D] hover:bg-[#272727] text-[#FDFDFD] flex items-center justify-center text-base transition-all cursor-pointer"
            >
              →
            </button>
          </div>

          {/* Compact Active Item Deep-Dive Panel */}
          <div
            className="mt-8 max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl bg-[#1D1D1D] border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
            style={{ borderColor: `${activeCoverflowItem.color}50` }}
          >
            <div>
              <span className="text-[10px] uppercase font-jetbrains-mono font-semibold" style={{ color: activeCoverflowItem.color }}>
                Vector 0{activeCoverflow + 1} // {activeCoverflowItem.subtitle}
              </span>
              <h3 className="font-clash-display text-lg sm:text-xl font-medium text-[#FDFDFD] mt-0.5 mb-2">
                {activeCoverflowItem.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeCoverflowItem.deliverables.map((deliv, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-general-sans px-2.5 py-0.5 rounded-md bg-[#0F0F0F] border border-[#303030] text-[#CCCCCC]"
                  >
                    ✓ {deliv}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-black font-excon text-xs font-bold transition-all text-center flex-shrink-0 shadow-md hover:opacity-95"
              style={{ backgroundColor: activeCoverflowItem.color }}
            >
              Join Working Group ↗
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 06: WIX-INSPIRED HORIZONTAL VISUAL GALLERY
          (Compact Height, Images Completely Visible, Smooth RAF)
      ═══════════════════════════════════════════════════════════ */}
      <section id="gallery" className="relative py-16 md:py-20 border-b border-[#272727] bg-[#000000] overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="section-header-reveal text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-2 font-semibold">
              05 // COMMUNITY BUILD STREAMS
            </div>
            <h2 className="section-header-reveal font-clash-display text-2xl sm:text-4xl font-normal text-[#FDFDFD] tracking-tight">
              Real Sprints & Moments.
            </h2>
            <p className="text-xs font-jetbrains-mono text-[#CCCCCC]/60 mt-1">
              Continuously moving. Click & hold to drag horizontally.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="section-header-reveal flex items-center gap-2">
            <button
              onClick={() => scrollGallery('left')}
              aria-label="Previous gallery slides"
              className="w-10 h-10 rounded-full border border-[#303030] bg-[#1D1D1D] hover:bg-[#272727] text-[#FDFDFD] flex items-center justify-center transition-all cursor-pointer text-sm"
            >
              ←
            </button>
            <button
              onClick={() => scrollGallery('right')}
              aria-label="Next gallery slides"
              className="w-10 h-10 rounded-full border border-[#303030] bg-[#1D1D1D] hover:bg-[#272727] text-[#FDFDFD] flex items-center justify-center transition-all cursor-pointer text-sm"
            >
              →
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Gallery Track (Compact Cards ~300px total height) */}
        <div
          ref={galleryTrackRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="flex gap-5 overflow-x-auto no-scrollbar px-6 md:px-10 cursor-grab active:cursor-grabbing select-none py-1"
        >
          {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[270px] sm:w-[300px] md:w-[320px] group bg-[#1D1D1D] border border-[#272727] hover:border-[#383838] rounded-3xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-[160px] sm:h-[175px] w-full overflow-hidden pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-105"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1D] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[9px] uppercase tracking-wider font-jetbrains-mono px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border font-semibold"
                    style={{ color: item.accent, borderColor: `${item.accent}40` }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>

              <div className="p-5 pointer-events-none">
                <span className="text-[11px] font-jetbrains-mono uppercase tracking-wider font-semibold" style={{ color: item.accent }}>
                  {item.category}
                </span>
                <h3 className="font-clash-display text-lg font-medium text-[#FDFDFD] mt-0.5 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs font-general-sans text-[#CCCCCC] leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 07: RECONSTRUCTED 3D HELIX SCROLL STORYTELLING
          (Continuous 3D Helical Spiral, Visible Central Axis, #28282B Background,
           #1D1D1F Cards, #3A3A3D Borders, Clear Header Separation & Depth Hierarchy)
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={helixSectionRef}
        id="helix"
        className="relative min-h-screen pt-16 pb-10 md:py-12 bg-[#28282B] border-b border-[#3A3A3D] scroll-mt-20 flex flex-col justify-between overflow-hidden"
      >
        {/* Header Region — Dedicated z-30 Layer, Guaranteed Clearance from Spiral Stage */}
        <div className="relative z-30 max-w-[1360px] mx-auto px-6 md:px-10 w-full mb-2">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#1D1D1F] border border-[#3A3A3D] text-[11px] uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-2 font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FE8040] animate-pulse" />
              <span>06 // 3D HELIX PROGRESSION</span>
            </div>
            <h2 className="font-clash-display text-2xl sm:text-4xl md:text-5xl font-normal text-[#FDFDFD] tracking-tight leading-tight">
              The 7 Stages of Compound Growth.
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm font-general-sans text-[#C4C4C7] max-w-lg mx-auto leading-relaxed">
              Scroll to traverse the continuous 3D helical trajectory of an active Zplore builder.
            </p>
          </div>
        </div>

        {/* 3D Helix Perspective Stage Container */}
        <div
          className="relative h-[410px] sm:h-[440px] w-full flex items-center justify-center hidden md:flex my-auto z-10 select-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Central Vertical Axis & Spiral Guide Structure */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
            style={{ transform: 'translateZ(-140px)', transformStyle: 'preserve-3d' }}
          >
            {/* Vertical Spine */}
            <div className="w-[2px] h-[380px] bg-gradient-to-b from-transparent via-[#FE8040]/40 to-transparent relative flex flex-col items-center justify-center">
              {/* Central Core Glowing Beacon (Reflects Active Stage Accent) */}
              <div
                className="w-4 h-4 rounded-full border-2 transition-all duration-500 shadow-lg"
                style={{
                  borderColor: HELIX_STEPS[activeHelixIndex].accent,
                  backgroundColor: `${HELIX_STEPS[activeHelixIndex].accent}40`,
                  boxShadow: `0 0 20px ${HELIX_STEPS[activeHelixIndex].accent}`
                }}
              />
              {/* Subtle Horizontal Guide Orbit Rungs along Spine */}
              <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-28 h-px bg-[#3A3A3D]/60" />
              <div className="absolute top-[34%] left-1/2 -translate-x-1/2 w-36 h-px bg-[#3A3A3D]/60" />
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-44 h-px bg-[#3A3A3D]/80" />
              <div className="absolute top-[66%] left-1/2 -translate-x-1/2 w-36 h-px bg-[#3A3A3D]/60" />
              <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-28 h-px bg-[#3A3A3D]/60" />
            </div>
          </div>

          {/* 7 Helix Chapter Cards (Positioned in 3D Space by updateHelix) */}
          {HELIX_STEPS.map((step, idx) => {
            const isActive = idx === activeHelixIndex
            return (
              <div
                key={step.step}
                onClick={() => scrollToHelixStep(idx)}
                className="helix-node-card absolute w-[320px] sm:w-[380px] lg:w-[440px] min-h-[250px] rounded-[26px] p-6 sm:p-7 bg-[#1D1D1F] border shadow-2xl transition-[border-color,box-shadow] duration-500 cursor-pointer flex flex-col justify-between"
                style={{
                  transformStyle: 'preserve-3d',
                  borderColor: isActive ? step.accent : '#3A3A3D',
                  boxShadow: isActive
                    ? `0 25px 50px -12px rgba(0,0,0,0.7), 0 0 35px -5px ${step.accent}35`
                    : '0 15px 35px -10px rgba(0,0,0,0.5)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span
                      className="text-[11px] font-jetbrains-mono uppercase px-3 py-0.5 rounded-full font-semibold border transition-colors duration-300"
                      style={{
                        backgroundColor: `${step.accent}15`,
                        color: step.accent,
                        borderColor: `${step.accent}40`
                      }}
                    >
                      {step.tag}
                    </span>
                    <span className="font-jetbrains-mono text-xl font-light text-[#C4C4C7]">
                      {step.step}
                    </span>
                  </div>

                  <div
                    className="text-[10px] font-jetbrains-mono uppercase tracking-widest font-semibold mb-1 transition-colors duration-300"
                    style={{ color: isActive ? step.accent : '#C4C4C7' }}
                  >
                    Stage // {step.phase}
                  </div>

                  <h3 className="font-clash-display text-lg sm:text-xl font-medium text-[#FDFDFD] mb-2 leading-snug tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs font-general-sans text-[#C4C4C7] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#3A3A3D]/60 flex items-center justify-between text-[11px] font-jetbrains-mono">
                  <span style={{ color: step.accent }} className="font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.accent }} />
                    {isActive ? 'Current Trajectory' : 'Compound Phase'}
                  </span>
                  <span className="text-[#C4C4C7]/60 group-hover:text-white transition-colors">
                    Click to inspect ↗
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile & Tablet Fallback: Vertical Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden px-6 my-auto">
          {HELIX_STEPS.map((step, idx) => {
            const isActive = idx === activeHelixIndex
            return (
              <div
                key={step.step}
                onClick={() => setActiveHelixIndex(idx)}
                className="p-6 rounded-2xl bg-[#1D1D1F] border transition-all duration-300 cursor-pointer"
                style={{
                  borderColor: isActive ? step.accent : '#3A3A3D',
                  boxShadow: isActive ? `0 10px 25px -5px ${step.accent}25` : 'none'
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    className="text-[10px] font-jetbrains-mono uppercase px-2.5 py-0.5 rounded-full font-semibold border"
                    style={{
                      backgroundColor: `${step.accent}15`,
                      color: step.accent,
                      borderColor: `${step.accent}40`
                    }}
                  >
                    {step.tag}
                  </span>
                  <span className="font-jetbrains-mono text-base font-light text-[#C4C4C7]">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-clash-display text-base font-medium text-[#FDFDFD] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs font-general-sans text-[#C4C4C7] leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom 7-Stage Navigator & Status Indicator (z-30) */}
        <div className="relative z-30 mt-4 max-w-[1360px] mx-auto px-6 md:px-10 w-full flex flex-col items-center gap-3">
          {/* Interactive Stage Progress Bar */}
          <div className="flex items-center justify-center gap-2 flex-wrap bg-[#1D1D1F]/90 backdrop-blur-md p-1.5 rounded-full border border-[#3A3A3D] shadow-lg">
            {HELIX_STEPS.map((step, idx) => {
              const isCurrent = idx === activeHelixIndex
              return (
                <button
                  key={step.step}
                  onClick={() => scrollToHelixStep(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-jetbrains-mono transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#28282B] text-white font-semibold border shadow-sm'
                      : 'text-[#C4C4C7] hover:text-white'
                  }`}
                  style={{
                    borderColor: isCurrent ? step.accent : 'transparent',
                    color: isCurrent ? step.accent : undefined
                  }}
                >
                  <span>{step.step}</span>
                  <span className="hidden sm:inline">{step.phase}</span>
                </button>
              )
            })}
          </div>

          {/* Active Stage Callout Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1D1D1F] border border-[#3A3A3D] text-xs font-jetbrains-mono text-[#C4C4C7] shadow-md">
            <span className="text-[#C4C4C7]">Stage</span>
            <span className="font-semibold" style={{ color: HELIX_STEPS[activeHelixIndex].accent }}>
              {HELIX_STEPS[activeHelixIndex].step} // {HELIX_STEPS[activeHelixIndex].phase}
            </span>
            <span className="hidden sm:inline text-[#C4C4C7]/60">—</span>
            <span className="hidden sm:inline text-[#FDFDFD]">{HELIX_STEPS[activeHelixIndex].title}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 08: BUILDERS IN PRODUCTION — AUTOPLAY ON VIEWPORT ENTRY
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={videoSectionRef}
        className="relative py-20 md:py-28 border-b border-[#272727] bg-[#000000]"
      >
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-10">
            <div className="section-header-reveal text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-2 font-semibold">
              07 // SPRINT TELEMETRY BROADCAST
            </div>
            <h2 className="section-header-reveal font-clash-display text-2xl sm:text-4xl font-normal text-[#FDFDFD] tracking-tight">
              Builders In Production Flow.
            </h2>
            <p className="section-header-reveal mt-2 text-xs sm:text-sm font-general-sans text-[#CCCCCC]">
              Live telemetry broadcasted directly from our active weekend code sprints.
            </p>
          </div>

          {/* Layered Media Stage with Click-to-Toggle Playback */}
          <div
            onClick={() => setIsPlayingMedia(!isPlayingMedia)}
            className="relative rounded-3xl overflow-hidden border border-[#272727] bg-[#1D1D1D] shadow-2xl cursor-pointer group"
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
              <Image
                src="/images/community/code-sprint.jpg"
                alt="Zplore midnight sprint telemetry stream"
                fill
                priority
                className={`object-cover filter contrast-105 transition-all duration-1000 ${
                  isPlayingMedia ? 'scale-100 brightness-95' : 'scale-105 brightness-50 blur-[1px]'
                }`}
                sizes="(max-width: 1360px) 100vw, 1360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

              {/* Live Status HUD Header */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-jetbrains-mono text-[#FDFDFD]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPlayingMedia ? 'bg-[#C4FE76] animate-ping' : 'bg-white/40'
                    }`}
                  />
                  <span className={isPlayingMedia ? 'text-[#C4FE76] font-semibold' : 'text-white/60'}>
                    {isPlayingMedia ? 'BROADCASTING LIVE' : 'PLAYBACK PAUSED'}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs font-jetbrains-mono text-[#CCCCCC] bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10">
                  <span className="text-[#C4FE76]">FPS: 60</span>
                  <span className="text-[#99E9D9]">BITRATE: 18 Mbps</span>
                  <span className="text-[#E5BDDF]">CODEC: AV1</span>
                </div>
              </div>

              {/* Central Play/Pause Control (Clickable) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPlayingMedia(!isPlayingMedia)
                  }}
                  aria-label={isPlayingMedia ? 'Pause media stream' : 'Resume media stream'}
                  className="group-hover:scale-110 relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FE8040] hover:bg-[#e66c2e] text-white flex items-center justify-center transition-all shadow-2xl cursor-pointer"
                >
                  <span className="text-xl sm:text-2xl font-bold">
                    {isPlayingMedia ? '❚❚' : '▶'}
                  </span>
                  {isPlayingMedia && (
                    <span className="absolute inset-0 rounded-full border-2 border-[#FE8040] animate-ping pointer-events-none" />
                  )}
                </button>
              </div>

              {/* Bottom Equalizer and Metadata */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
                <div>
                  <span className="text-[11px] uppercase tracking-widest font-jetbrains-mono text-[#FE8040] font-semibold">
                    SESSION #42 // BENGALURU STAGING HUB
                  </span>
                  <div className="font-clash-display text-lg sm:text-xl font-medium text-[#FDFDFD] mt-0.5">
                    Stress-Testing Zero-Allocation SIMD Memory Rings
                  </div>
                </div>

                <div className="flex items-end gap-1.5 h-5">
                  {[40, 75, 55, 90, 60, 100, 45, 80, 65, 95].map((height, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#FE8040] rounded-full transition-all duration-300"
                      style={{
                        height: isPlayingMedia ? `${height}%` : '20%',
                        opacity: isPlayingMedia ? 0.9 : 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 09: THE 3-CARD ELEVATED ARCHITECTURE
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 border-b border-[#272727] bg-[#0F0F0F]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="section-header-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D1D1D] border border-[#303030] text-xs font-jetbrains-mono text-[#CCCCCC] mb-8">
            <span className="font-bold text-[#FE8040]">08</span>
            <span>Core Architecture Pillars</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Constant Profiling */}
            <div className="reveal-card bg-[#1D1D1D] text-[#FDFDFD] border border-[#272727] rounded-3xl p-7 flex flex-col justify-between shadow-xl min-h-[350px]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl text-[#C4FE76]">✱</span>
                  <span className="text-[11px] font-jetbrains-mono uppercase tracking-wider text-[#C4FE76] font-semibold">
                    Live Telemetry
                  </span>
                </div>

                <div className="my-6 p-4 rounded-2xl bg-[#0F0F0F] border border-[#272727] flex items-center justify-between shadow-sm">
                  <div className="px-3 py-1 rounded-full bg-[#FE8040] text-white text-xs font-semibold">
                    Domain
                  </div>
                  <div className="h-px flex-1 bg-white/20 mx-2 relative">
                    <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-[#C4FE76]" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#99E9D9] text-black text-xs font-semibold">
                    Runtime
                  </div>
                </div>

                <h3 className="font-clash-display text-xl font-medium tracking-tight text-[#FDFDFD] mb-2">
                  Constant Profiling
                </h3>
                <p className="text-xs sm:text-sm font-general-sans text-[#CCCCCC] leading-relaxed">
                  Real-time profiling of latency budgets, GPU allocation, memory arena contention, and distributed cluster nodes.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#272727] text-xs font-jetbrains-mono text-[#C4FE76] font-semibold">
                P99 Latency: Sub-12ms
              </div>
            </div>

            {/* Card 2: SHARE & CO-BUILD */}
            <div className="reveal-card bg-[#1D1D1D] text-[#FDFDFD] border border-[#272727] rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl min-h-[350px]">
              <div className="bg-[#FE8040] p-4 flex items-center justify-between text-white">
                <span className="font-clash-display text-xs font-semibold tracking-wider uppercase">
                  SHARE & CO-BUILD
                </span>
                <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center text-xs font-bold">
                  ↗
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="my-3 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#0F0F0F] border border-[#303030] flex flex-col items-center justify-center shadow-md">
                      <span className="text-xl text-[#E5BDDF]">✦</span>
                      <span className="text-[9px] font-jetbrains-mono text-[#CCCCCC]/60 mt-0.5">Mesh V3</span>
                    </div>
                    <span className="inline-block mt-2.5 px-3 py-0.5 rounded-full bg-[#E5BDDF]/15 border border-[#E5BDDF]/30 text-[#E5BDDF] text-[11px] font-jetbrains-mono font-medium">
                      Prototype Live
                    </span>
                  </div>

                  <h3 className="font-clash-display text-xl font-medium tracking-tight text-[#FDFDFD] mb-1.5">
                    Autonomous Consensus
                  </h3>
                  <p className="text-xs sm:text-sm font-general-sans text-[#CCCCCC] leading-relaxed">
                    Out-of-the-box consensus protocols and semantic drift detection for multi-agent reasoning graphs.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#272727] text-xs font-jetbrains-mono text-[#E5BDDF] font-semibold">
                  Active Sprint Squad: 12 Builders
                </div>
              </div>
            </div>

            {/* Card 3: Automated Threat Triage */}
            <div className="reveal-card bg-[#1D1D1D] text-[#FDFDFD] border border-[#272727] rounded-3xl p-7 flex flex-col justify-between shadow-xl min-h-[350px]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl text-[#99E9D9]">✱</span>
                  <span className="text-[11px] font-jetbrains-mono uppercase tracking-wider text-[#99E9D9] font-semibold">
                    FIPS 203 Mesh
                  </span>
                </div>

                <div className="my-6 p-3.5 rounded-2xl bg-[#0F0F0F] border border-[#272727] flex flex-wrap gap-2 justify-center shadow-sm">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-jetbrains-mono text-[#CCCCCC]">
                    Vector 01
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#99E9D9]/15 border border-[#99E9D9]/30 text-[11px] font-jetbrains-mono text-[#99E9D9]">
                    ML-KEM
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C4FE76]/15 border border-[#C4FE76]/30 text-[11px] font-jetbrains-mono text-[#C4FE76]">
                    Air-Gap Safe
                  </span>
                </div>

                <h3 className="font-clash-display text-xl font-medium tracking-tight text-[#FDFDFD] mb-1.5">
                  Automatic Triage
                </h3>
                <p className="text-xs sm:text-sm font-general-sans text-[#CCCCCC] leading-relaxed">
                  Neutralize security vectors and verify cryptographic sandboxes without human intervention.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#272727] text-xs font-jetbrains-mono text-[#99E9D9] font-semibold">
                Post-Quantum Encapsulation Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10: SHARED PRINCIPLES & INTERACTIVE FAQS (HOVER EXPANSION)
      ═══════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative py-20 md:py-28 border-b border-[#272727] bg-[#0F0F0F]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Engineering Principles */}
            <div className="lg:col-span-5">
              <div className="section-header-reveal text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-2 font-semibold">
                09 // CULTURE & RIGOR
              </div>
              <h2 className="section-header-reveal font-clash-display text-2xl sm:text-4xl font-normal text-[#FDFDFD] tracking-tight mb-6">
                Our Engineering Principles.
              </h2>

              <div className="space-y-3.5">
                {PRINCIPLES.map((p) => (
                  <div
                    key={p.num}
                    className="p-5 rounded-2xl bg-[#1D1D1D] border transition-all duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: '#272727' }}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-xs font-jetbrains-mono font-semibold" style={{ color: p.accent }}>#{p.num}</span>
                      <h3 className="font-clash-display text-base font-medium text-[#FDFDFD]">{p.title}</h3>
                    </div>
                    <p className="text-xs font-general-sans text-[#CCCCCC] leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Smooth Hover-Expanding FAQ Accordions */}
            <div className="lg:col-span-7">
              <div className="section-header-reveal text-xs uppercase tracking-[0.25em] font-jetbrains-mono text-[#FE8040] mb-2 font-semibold">
                10 // KNOWLEDGE BASE
              </div>
              <h2 className="section-header-reveal font-clash-display text-2xl sm:text-4xl font-normal text-[#FDFDFD] tracking-tight mb-6">
                Frequently Asked Questions.
              </h2>

              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx
                  const isHovered = hoveredFaq === idx
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredFaq(idx)}
                      onMouseLeave={() => setHoveredFaq(null)}
                      className="rounded-2xl border transition-all duration-300 overflow-hidden"
                      style={{
                        backgroundColor: isOpen || isHovered ? '#1D1D1D' : '#141416',
                        borderColor: isOpen || isHovered ? faq.accent : '#272727',
                        transform: isHovered && !isOpen ? 'translateX(4px)' : 'none'
                      }}
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-5 sm:p-6 flex items-center justify-between text-left group cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="font-clash-display text-base sm:text-lg font-medium text-[#FDFDFD] transition-colors pr-6">
                          {faq.q}
                        </span>
                        <span
                          className="w-7 h-7 rounded-full border flex items-center justify-center text-base font-light transition-transform duration-300 flex-shrink-0"
                          style={{
                            borderColor: `${faq.accent}40`,
                            color: faq.accent,
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                        >
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>

                      <div
                        className="grid transition-all duration-300 ease-out"
                        style={{
                          gridTemplateRows: isOpen ? '1fr' : '0fr'
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 sm:px-6 pb-5 text-xs sm:text-sm font-general-sans text-[#CCCCCC] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 11: FINAL CONVERSION CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-[#000000] overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="bg-[#1D1D1D] border border-[#272727] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FE8040]/15 border border-[#FE8040]/30 text-xs font-jetbrains-mono uppercase tracking-widest text-[#FE8040] mb-6 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4FE76] animate-pulse" />
              <span>Community Enrollment Live</span>
            </div>

            <h2 className="font-clash-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#FDFDFD] tracking-tight leading-[1.08] mb-5">
              Your next breakthrough deserves a community.
            </h2>

            <p className="text-sm sm:text-base font-general-sans text-[#CCCCCC] leading-relaxed max-w-xl mx-auto mb-8">
              Join 1,400+ engineers, researchers, and technical founders turning ambitious architectures into verifiable software.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#FE8040] hover:bg-[#e66c2e] text-white font-excon text-sm font-semibold transition-all text-center shadow-xl group"
              >
                <span>Join Our WhatsApp Community</span>
                <span className="text-base leading-none transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#303030] bg-[#0F0F0F] text-[#CCCCCC] hover:text-[#FDFDFD] hover:border-white/40 font-excon text-sm transition-all text-center"
              >
                <span>Explore Zplore Studio</span>
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-jetbrains-mono text-[#CCCCCC]/80">
              <span>Direct inquiries & partnerships:</span>
              <a href="mailto:contact@zplore.com" className="text-[#FE8040] hover:underline underline-offset-4 font-semibold flex items-center gap-1">
                contact@zplore.com ↗
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-[#272727] flex flex-wrap justify-center gap-6 text-xs font-jetbrains-mono uppercase tracking-wider">
              <span className="text-[#FE8040]">● Free Membership</span>
              <span className="text-[#C4FE76]">● Active Builder Network</span>
              <span className="text-[#99E9D9]">● Direct Access</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ZMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
      <path d="M6 6 L26 6 L6 26 L26 26" stroke="white" strokeWidth="1.5" />
    </svg>
  )
}
