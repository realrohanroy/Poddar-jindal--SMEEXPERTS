import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { goodness, qualityWorkflow } from '../data/content'
import { 
  Sparkle, 
  ShieldCheck, 
  CheckCircle, 
  Gear, 
  Flask, 
  Package, 
  Grains, 
  CookingPot,
  ArrowRight
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export default function Goodness() {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.goodness-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.goodness-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.goodness-grid', start: 'top 75%' }
        }
      )
      gsap.fromTo('.workflow-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.workflow-grid', start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="relative bg-[#133822] text-white overflow-hidden"
    >
      {/* ── 1. SIGNATURE "GOODNESS IN EVERY DROP" GREEN TRUST STRIP (FROM REFERENCE) ── */}
      <div className="border-b border-white/15 bg-[#0e2919] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#C59B27] animate-pulse" />
            <h3 className="font-display font-black text-xl sm:text-2xl tracking-wider text-white uppercase">
              GOODNESS IN EVERY DROP.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 w-full lg:w-auto">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] shrink-0 mt-0.5">
                <Grains size={20} weight="duotone" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Carefully Sourced</p>
                <p className="text-white/60 text-xs leading-relaxed">Mustard seeds selected from trusted agricultural sources.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] shrink-0 mt-0.5">
                <Gear size={20} weight="duotone" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Quality Focused</p>
                <p className="text-white/60 text-xs leading-relaxed">Carefully processed to preserve natural flavour and character.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-[#C59B27] shrink-0 mt-0.5">
                <CookingPot size={20} weight="duotone" />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">Made for Everyday Cooking</p>
                <p className="text-white/60 text-xs leading-relaxed">A familiar, reliable choice for wholesome Indian kitchens.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. MAIN QUALITY & PURITY SECTION ── */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
            <ShieldCheck size={16} weight="duotone" />
            <span>QUALITY: FROM SEED TO BOTTLE WITH CARE</span>
          </div>
          <h2 className="goodness-heading font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            <span className="block">Pure by Process.</span>
            <span className="block text-[#C59B27]">Trusted by People.</span>
          </h2>
          <p className="goodness-heading text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We maintain strict quality standards at every stage — from seed selection to processing and packaging — to ensure purity, safety, and authentic pungent taste.
          </p>
        </div>

        {/* 4-Step Quality Process Workflow (Seed Cleaning -> Controlled Processing -> Quality Testing -> Safe Packaging) */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#C59B27] font-semibold">
                PROCESS TRACEABILITY
              </p>
              <h3 className="font-display font-bold text-2xl text-white">
                The 4 Checkpoints of Quality
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs text-white/50 font-mono">
              ZERO SOLVENT EXTRACTION • 100% MECHANICAL PRESS
            </span>
          </div>

          <div className="workflow-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityWorkflow.map((item, i) => (
              <div
                key={item.step}
                className="workflow-card bg-white/[0.04] border border-white/10 rounded-xl p-6 relative group hover:bg-white/[0.08] hover:border-[#C59B27]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#C59B27] px-2.5 py-1 rounded bg-[#C59B27]/15 border border-[#C59B27]/25">
                      STEP {item.step}
                    </span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#F5B800] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-white/65 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#C59B27]">
                  <CheckCircle size={14} weight="fill" />
                  <span className="font-mono uppercase tracking-wider">Quality Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. THE 4 NATURAL GOODNESS PILLARS ── */}
        <div className="text-center mb-12">
          <h3 className="font-display font-black text-2xl md:text-3xl text-white">
            Naturally Rich. Traditionally Loved.
          </h3>
          <p className="text-white/60 text-sm mt-2">
            The intrinsic qualities that make authentic mustard oil a powerhouse of Indian nutrition.
          </p>
        </div>

        <div className="goodness-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goodness.map((item, i) => (
            <div
              key={item.title}
              className="goodness-card bg-white/[0.05] border border-white/10 p-7 rounded-xl group hover:bg-white/[0.09] hover:border-[#C59B27]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#C59B27]/20 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#C59B27]/30 transition-colors duration-300">
                {item.icon}
              </div>
              <p className="text-[#C59B27]/30 font-mono text-5xl font-black leading-none mb-3 select-none">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="text-white font-display font-bold text-lg mb-2 group-hover:text-[#F5B800] transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-white/60 text-xs leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── 4. FACTUAL QUALITY METRICS BAR (VERIFIABLE, NO FAKE CLAIMS) ── */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '100%', label: 'Pure Kachi Ghani Mustard Oil', sub: 'Cold expeller pressed' },
            { value: '0%', label: 'Chemical Solvents / Additives', sub: 'Unadulterated & unrefined' },
            { value: '250°C', label: 'High Thermal Smoke Point', sub: 'Safe for deep frying' },
            { value: '5 Sizes', label: 'Commercial & Home Packaging', sub: '500ml, 1L, 5L & 15L' },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-lg bg-white/[0.02]">
              <p className="font-display font-black text-3xl md:text-4xl text-[#C59B27] mb-1">{stat.value}</p>
              <p className="text-white font-semibold text-xs md:text-sm">{stat.label}</p>
              <p className="text-white/45 text-[11px] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

