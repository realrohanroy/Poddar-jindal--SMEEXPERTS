import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BOTTOM_ICONS = [
  { icon: '🌿', label: 'Rooted in nature' },
  { icon: '⚙️', label: 'Carefully processed' },
  { icon: '🍳', label: 'Made for everyday cooking' },
]

export default function Hero() {
  const heroRef    = useRef(null)
  const bgRef      = useRef(null)
  const eyebrowRef = useRef(null)
  const h1Ref      = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const iconsRef   = useRef(null)
  const scriptRef  = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Background subtle scale in
      tl.fromTo(bgRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' },
        0
      )
      .fromTo(eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.5
      )
      .fromTo('.hero-line',
        { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', stagger: 0.12, duration: 0.9, ease: 'power4.out' },
        0.75
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(iconsRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      .fromTo(scriptRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8 },
        1.2
      )

      // Parallax on bg image
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#FDFBF7] pt-16 md:pt-[89px] lg:pt-[131px]"
    >
      {/* ── FULL-BLEED BACKGROUND IMAGE ── */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 bottom-0 top-[35%] md:top-0 z-0 opacity-0 bg-[url('/images/hero-mob.png')] md:bg-[url('/images/harvest.png')] bg-cover bg-top md:bg-[center_40%]"
        style={{
          willChange: 'transform',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FDFBF7] to-transparent md:hidden" />
      </div>

      {/* Organic, random soft edge background overlay matching the inspiration layout */}
      <div 
        className="hidden md:block absolute inset-0 w-full h-full z-0 pointer-events-none" 
        style={{ filter: 'blur(55px)', transform: 'translate3d(0,0,0)' }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#FDFBF7] overflow-visible">
          <path d="M 5 0 L 52 0 C 58 35, 52 65, 55 100 L 10 100 C 15 65, -5 35, 5 0 Z" fill="currentColor" />
        </svg>
      </div>
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(249,243,232,0.6), transparent)' }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-16">

        {/* Main hero layout */}
        <div className="flex-1 flex items-start md:items-center pt-2 sm:pt-4 md:pt-10 pb-6">
          {/* Left text block - shifted slightly right to sit perfectly centered in the organic background blob */}
          <div className="w-full max-w-[520px] ml-[2%] md:ml-[5%] lg:ml-[8%]">

            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="flex items-center gap-3 mb-4 md:mb-8 opacity-0"
            >
              <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#1a4a2e] font-semibold">
                FROM FIELD TO FAMILY
              </span>
              <div className="h-px w-10 bg-[#9A7B3A]" />
            </div>

            {/* H1 — large serif, two lines */}
            <h1 className="font-display font-black leading-[1.05] mb-4 md:mb-6">
              <span className="hero-line block text-[3.6rem] md:text-[4.5rem] lg:text-[5rem] text-[#1a4a2e] opacity-0">
                A little seed.
              </span>
              <span className="hero-line block text-[3.6rem] md:text-[4.5rem] lg:text-[5rem] text-[#9A7B3A] opacity-0">
                A richer tradition.
              </span>
            </h1>

            {/* Sub */}
            <p
              ref={subRef}
              className="text-[#1a1a18]/65 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-[400px] opacity-0"
            >
              Discover the journey behind Poddar-Jindal mustard oil — from sunlit fields to the flavour at home.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap items-center gap-3 mb-6 md:mb-10 opacity-0">
              <a
                href="#product"
                className="inline-flex items-center gap-2.5 bg-[#C8102E] text-white font-semibold text-sm px-7 py-3.5 rounded-sm hover:bg-[#a80d26] hover:gap-3.5 transition-all duration-300 group"
              >
                Explore Our Oil
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#field"
                className="inline-flex items-center gap-2 border border-[#1a1a18]/30 text-[#1a1a18] font-medium text-sm px-6 py-3.5 rounded-sm hover:border-[#1a1a18] hover:bg-[#1a1a18]/5 transition-all duration-300"
              >
                Follow the Journey ↓
              </a>
            </div>

            {/* Bottom icon row */}
            <div ref={iconsRef} className="hidden md:flex flex-wrap gap-6 opacity-0">
              {BOTTOM_ICONS.map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-[12.5px] font-medium text-[#1a1a18]/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom progress timeline */}
        <div className="pb-6 flex items-center justify-between">
          <div className="flex items-center gap-0">
            {[
              { num: '01', label: 'FIELD' },
              { num: '02', label: 'SEED' },
              { num: '03', label: 'PRESS' },
              { num: '04', label: 'OIL' },
              { num: '05', label: 'BOTTLE' },
            ].map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full border-2 ${i === 0 ? 'bg-[#9A7B3A] border-[#9A7B3A]' : 'bg-transparent border-white/40 md:border-[#1a1a18]/30'}`} />
                  <div className="flex flex-col leading-none">
                    <span className={`text-[10px] font-mono ${i === 0 ? 'text-[#9A7B3A]' : 'text-white/60 md:text-[#1a1a18]/40'}`}>{step.num}</span>
                    <span className={`text-[10px] font-mono font-semibold tracking-wider ${i === 0 ? 'text-white md:text-[#1a4a2e]' : 'text-white/60 md:text-[#1a1a18]/40'}`}>{step.label}</span>
                  </div>
                </div>
                {i < 4 && (
                  <div className={`w-10 md:w-16 h-px mx-2 ${i === 0 ? 'bg-[#9A7B3A]' : 'bg-white/20 md:bg-[#1a1a18]/20'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Scroll to explore */}
          <div className="flex items-center gap-3 text-white/50 md:text-[#1a1a18]/40 mx-auto md:mx-0">
            <div className="hidden md:flex flex-col items-center justify-center w-6 h-9 border border-[#1a1a18]/30 rounded-full relative">
              <div className="w-1 h-2 bg-[#1a1a18]/40 rounded-full animate-bounce mt-1" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Scroll to Explore</span>
          </div>
        </div>
      </div>

      {/* Script overlay bottom-right */}
      <div
        ref={scriptRef}
        className="absolute bottom-16 right-8 text-right z-10 opacity-0 hidden lg:block"
      >
        <p className="font-script text-white/75 text-2xl leading-relaxed drop-shadow-lg"
           style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
          <span className="block">From the field,</span>
          <span className="block">with care.</span>
        </p>
      </div>
    </section>
  )
}
