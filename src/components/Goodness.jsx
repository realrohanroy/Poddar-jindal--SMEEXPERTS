import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { qualityCheckpoints } from '../data/content'
import { 
  CheckCircle, 
  ArrowRight,
  Sparkle
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export default function Goodness() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const checkpointRefs = useRef([])

  // Synchronize active checkpoint with scroll position using IntersectionObserver
  useEffect(() => {
    const handleScrollSync = () => {
      // Find the checkpoint whose center is closest to viewport center or top third
      const targetY = window.innerHeight * 0.45
      let closestIdx = 0
      let minDistance = Infinity

      checkpointRefs.current.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        // Distance between element top/center and target zone
        const dist = Math.abs(rect.top + rect.height * 0.3 - targetY)
        if (dist < minDistance) {
          minDistance = dist
          closestIdx = index
        }
      })

      setActiveIndex(closestIdx)
    }

    window.addEventListener('scroll', handleScrollSync, { passive: true })
    handleScrollSync()

    return () => {
      window.removeEventListener('scroll', handleScrollSync)
    }
  }, [])

  // GSAP animation on section entry
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Editorial header reveal
      gsap.fromTo('.editorial-header-el',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.editorial-header-wrap',
            start: 'top 80%',
          }
        }
      )

      if (prefersReduced) return

      // Bottom reveal subtle entrance
      gsap.fromTo('.bottom-product-wrap',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bottom-product-wrap',
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smooth jump to checkpoint on tab/button click
  const scrollToCheckpoint = (index) => {
    setActiveIndex(index)
    const targetEl = checkpointRefs.current[index]
    if (targetEl) {
      const navOffset = 100
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const activeCheckpoint = qualityCheckpoints[activeIndex] || qualityCheckpoints[0]

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="relative bg-[#123D2B] text-white overflow-hidden"
    >
      {/* Background ambient texture and soft radiant glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#E9B51A]/20 blur-[130px]" />
        <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] rounded-full bg-[#174A35]/60 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-[#E9B51A]/15 blur-[120px]" />
      </div>

      {/* Subtle editorial watermark line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E9B51A]/35 to-transparent" />

      {/* ── 1. EDITORIAL HEADER SECTION ── */}
      <div className="editorial-header-wrap relative max-w-6xl mx-auto px-6 md:px-12 pt-24 pb-16 md:pt-32 md:pb-20 text-center">
        {/* Eyebrow */}
        <div className="editorial-header-el inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-[#E9B51A]/30 mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#E9B51A] animate-pulse" />
          <span className="text-[#E9B51A] font-mono text-xs md:text-sm tracking-[0.22em] uppercase font-semibold">
            FROM SEED TO BOTTLE
          </span>
        </div>

        {/* Oversized Editorial Serif Heading */}
        <h2 className="editorial-header-el font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal tracking-tight leading-[1.08] mb-6">
          <span className="block">Pure by process.</span>
          <span className="block italic text-[#E9B51A] font-light mt-1">Trusted by care.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="editorial-header-el text-[#F7F3E8]/80 text-base md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
          Every drop has a journey. Discover the care behind the mustard oil that reaches your kitchen.
        </p>

        {/* Fine gold separator */}
        <div className="editorial-header-el mt-8 flex items-center justify-center gap-3">
          <div className="w-12 h-px bg-[#E9B51A]/30" />
          <span className="text-[#E9B51A]/60 text-xs">✦</span>
          <div className="w-12 h-px bg-[#E9B51A]/30" />
        </div>
      </div>

      {/* ── 2. ASYMMETRIC TWO-COLUMN EDITORIAL CHECKPOINTS JOURNEY ── */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN (58%): STICKY CINEMATIC VISUAL PANEL (DESKTOP) ── */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28 self-start">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0B2419] border border-white/10 ring-1 ring-[#E9B51A]/20 aspect-[4/3] group">
              
              {/* Stacked Images with crossfade & subtle scale transition */}
              {qualityCheckpoints.map((cp, idx) => {
                const isActive = activeIndex === idx
                return (
                  <div
                    key={cp.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive 
                        ? 'opacity-100 scale-100 pointer-events-auto z-10' 
                        : 'opacity-0 scale-105 pointer-events-none z-0'
                    }`}
                  >
                    <img
                      src={cp.image}
                      alt={cp.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    {/* Editorial vignette gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                  </div>
                )
              })}

              {/* Top Bar on Visual Panel */}
              <div className="absolute top-5 inset-x-5 z-20 flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E9B51A]" />
                  <span>CHECKPOINT {activeCheckpoint.step} / 04</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[#E9B51A] text-xs font-mono font-medium">
                  {activeCheckpoint.eyebrow}
                </div>
              </div>

              {/* Bottom Caption Bar on Visual Panel */}
              <div className="absolute bottom-5 inset-x-5 z-20 p-4 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-white text-sm font-medium leading-snug">
                      {activeCheckpoint.caption}
                    </p>
                    <p className="text-[#E9B51A] text-xs font-mono mt-1 flex items-center gap-1.5">
                      <CheckCircle size={13} weight="fill" />
                      <span>{activeCheckpoint.highlight}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-white/40 text-[10px] font-mono uppercase block">Status</span>
                    <span className="text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">Verified</span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-white/10">
                  {qualityCheckpoints.map((cp, idx) => (
                    <button
                      key={cp.id}
                      onClick={() => scrollToCheckpoint(idx)}
                      className="group/track cursor-pointer text-left py-1"
                      aria-label={`Go to checkpoint ${cp.step}`}
                    >
                      <div className={`h-1 rounded-full transition-all duration-300 ${
                        activeIndex === idx 
                          ? 'bg-[#E9B51A]' 
                          : activeIndex > idx 
                            ? 'bg-white/50' 
                            : 'bg-white/20 group-hover/track:bg-white/35'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Fine gold corner borders for premium editorial feel */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#E9B51A]/40 pointer-events-none z-20" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#E9B51A]/40 pointer-events-none z-20" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#E9B51A]/40 pointer-events-none z-20" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#E9B51A]/40 pointer-events-none z-20" />
            </div>
          </div>

          {/* ── RIGHT COLUMN (42%): NARRATIVE CHECKPOINTS (DESKTOP & MOBILE) ── */}
          <div className="lg:col-span-5 space-y-16 lg:space-y-24">
            
            {/* Desktop Navigation Quick-Bar */}
            <div className="hidden lg:flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm">
              {qualityCheckpoints.map((cp, idx) => {
                const isActive = activeIndex === idx
                return (
                  <button
                    key={cp.id}
                    onClick={() => scrollToCheckpoint(idx)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all duration-200 cursor-pointer text-center ${
                      isActive
                        ? 'bg-[#E9B51A] text-[#123D2B] shadow-md font-bold'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {cp.step} {cp.eyebrow.split(' ')[0]}
                  </button>
                )
              })}
            </div>

            {/* Checkpoint Story Items */}
            {qualityCheckpoints.map((checkpoint, idx) => {
              const isActive = activeIndex === idx

              return (
                <div
                  key={checkpoint.id}
                  ref={(el) => (checkpointRefs.current[idx] = el)}
                  className={`relative scroll-mt-32 transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'lg:opacity-40'
                  }`}
                >
                  {/* Step Eyebrow with gold hairline */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm font-bold text-[#E9B51A] px-2.5 py-0.5 rounded-full bg-[#E9B51A]/15 border border-[#E9B51A]/30">
                      {checkpoint.step}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E9B51A] font-semibold">
                      {checkpoint.eyebrow}
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Large Editorial Serif Heading */}
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-3xl text-white font-normal leading-snug mb-4">
                    {checkpoint.title}
                  </h3>

                  {/* Mobile-only cinematic image (clean single-column fallback) */}
                  <div className="lg:hidden my-6 rounded-2xl overflow-hidden aspect-[16/10] bg-[#0B2419] border border-white/10 relative shadow-lg">
                    <img
                      src={checkpoint.image}
                      alt={checkpoint.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 inset-x-3 text-xs text-white/90 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                      <p>{checkpoint.caption}</p>
                    </div>
                  </div>

                  {/* Narrative Body Copy */}
                  <p className="text-[#F7F3E8]/85 text-base md:text-lg font-body leading-relaxed mb-6">
                    {checkpoint.body}
                  </p>

                  {/* Editorial Highlight Quote Box */}
                  <div className="border-l-2 border-[#E9B51A] pl-4 py-1 my-5 bg-white/[0.02] rounded-r-xl">
                    <p className="text-white/90 text-sm font-body italic leading-relaxed">
                      "{checkpoint.highlight}"
                    </p>
                  </div>

                  {/* Verified Fact Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {checkpoint.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.05] border border-white/10 text-white/75"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#E9B51A]" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Restrained single verification metric */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-white/50 uppercase tracking-wider">{checkpoint.statLabel}:</span>
                    <span className="text-[#E9B51A] font-bold tracking-wide">{checkpoint.statValue}</span>
                  </div>

                </div>
              )
            })}

          </div>

        </div>
      </div>

      {/* ── 3. BOTTOM COMPOSITION: WIDE PRODUCT REVEAL & NATURAL TRANSITION ── */}
      <div className="bottom-product-wrap relative border-t border-white/10 bg-gradient-to-b from-[#0F3324] via-[#0B2419] to-[#081C13] py-20 md:py-28">
        
        {/* Soft atmospheric golden glow behind bottles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E9B51A]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 text-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 text-[#E9B51A] text-xs font-mono tracking-[0.2em] uppercase mb-4 font-semibold">
            <Sparkle size={14} weight="fill" />
            <span>THE RESULT OF UNCOMPROMISING CARE</span>
          </div>

          {/* Heading */}
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight mb-4">
            From our mill in Nadbai to your kitchen flame.
          </h3>

          <p className="text-[#F7F3E8]/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Every bottle and pouch of Poddar-Jindal mustard oil carries the same golden clarity, sharp authentic pungency, and uncompromised purity verified through our four checkpoints.
          </p>

          {/* Wide Panoramic Bottle Showcase using verified asset */}
          <div className="relative rounded-3xl overflow-hidden bg-black/40 border border-white/15 shadow-2xl p-4 sm:p-8 md:p-10 mb-14 group">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/our-product-PC.png"
                alt="Poddar Jindal Mustard Oil bottle and pouch packaging range"
                className="w-full h-auto object-cover rounded-xl shadow-lg transition-transform duration-700 group-hover:scale-[1.01]"
                loading="lazy"
              />
            </div>
            
            {/* Fine editorial caption bar under product reveal */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              <div className="p-3 rounded-xl bg-white/[0.03]">
                <p className="text-[11px] font-mono text-[#E9B51A] uppercase tracking-wider">Method</p>
                <p className="text-white text-sm font-semibold mt-0.5">Mechanical Expeller</p>
                <p className="text-white/50 text-xs mt-0.5">Zero chemical solvents</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03]">
                <p className="text-[11px] font-mono text-[#E9B51A] uppercase tracking-wider">Flavour</p>
                <p className="text-white text-sm font-semibold mt-0.5">Natural Pungency</p>
                <p className="text-white/50 text-xs mt-0.5">Allyl isothiocyanate preserved</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03]">
                <p className="text-[11px] font-mono text-[#E9B51A] uppercase tracking-wider">Verification</p>
                <p className="text-white text-sm font-semibold mt-0.5">Batch Lab Tested</p>
                <p className="text-white/50 text-xs mt-0.5">Checked for clarity & FFA</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03]">
                <p className="text-[11px] font-mono text-[#E9B51A] uppercase tracking-wider">Packaging</p>
                <p className="text-white text-sm font-semibold mt-0.5">Hygienic Hermetic Fill</p>
                <p className="text-white/50 text-xs mt-0.5">Food-grade bottles & tins</p>
              </div>
            </div>
          </div>

          {/* Smooth editorial transition to next section (#recipes) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#recipes"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E9B51A] text-[#123D2B] font-semibold text-sm hover:bg-[#F5B800] transition-all duration-300 shadow-lg hover:shadow-[#E9B51A]/20 hover:-translate-y-0.5"
            >
              <span>Explore Authentic Recipes with Poddar-Jindal</span>
              <ArrowRight size={18} weight="bold" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.06] border border-white/15 text-white text-sm font-medium hover:bg-white/[0.12] transition-all duration-300"
            >
              <span>Bulk & Trade Enquiries</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  )
}


