import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Grains, 
  Factory, 
  Package, 
  Handshake, 
  ArrowsClockwise, 
  Drop, 
  ShieldCheck,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const wholesalePillars = [
  {
    icon: Grains,
    tag: 'SUPPLY CHAIN INTEGRITY',
    title: 'Direct Farm & Mandi Sourcing',
    body: 'We source high-oil native black mustard seeds directly from vetted grower clusters and APMC mandis across Rajasthan and Haryana. Vetted procurement ensures batch-to-batch pungency, purity, and round-the-year bulk volume stability.',
    specs: [
      'Direct grower contracts & mandi partnerships',
      'Tested for moisture, seed maturity & purity',
      'Zero synthetic additives or adulterants',
    ],
  },
  {
    icon: Factory,
    tag: 'MILLING STANDARDS',
    title: 'Hygienic Cold-Press Extraction',
    body: 'Traditional Kolhu crushing combined with modern stainless-steel filtration preserves natural Allyl Isothiocyanate for authentic pungent aroma. Multi-stage cold settling retains natural antioxidants and vitamins without destructive chemical heating.',
    specs: [
      'Strict low-temperature expeller extraction',
      'Zero chemical refining, bleaching, or solvents',
      'High smoke point (250°C) ideal for commercial frying',
    ],
  },
  {
    icon: Package,
    tag: 'PACKAGING & FREIGHT',
    title: 'Commercial-Grade Packaging',
    body: 'Tailored for wholesale distributors, institutional caterers, and food manufacturers. Packaged in puncture-resistant 15L food-grade tins, durable HDPE jars, and bulk barrels designed to withstand long-haul freight transit without leakage.',
    specs: [
      '15L commercial tins with tamper-evident seals',
      'Durable corrugated outer cartons for stacking',
      'Batch barcode & lot tracking on every unit',
    ],
  },
]

const operationalCommitments = [
  {
    icon: Handshake,
    title: 'Farmer Support & Fair Trade',
    body: 'Direct mandi price guarantees and long-term contracts empower farming communities with transparent, reliable income.',
  },
  {
    icon: ArrowsClockwise,
    title: 'Zero-Waste Bio-Circularity',
    body: '100% of residual mustard meal (Khali) is re-purposed as protein-rich cattle feed and organic soil conditioner.',
  },
  {
    icon: Drop,
    title: 'Responsible Resource Use',
    body: 'Closed-loop cooling systems and energy-efficient motors reduce factory power consumption and eliminate water wastage.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Lot Assurance',
    body: 'Every production lot is lab-tested and accompanied by a Certificate of Analysis (COA) complying with strict FSSAI norms.',
  },
]

export default function Sustainability() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sustain-el',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )

      gsap.fromTo('.sustain-bg',
        { scale: 1.1 },
        {
          scale: 1, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          aria-hidden
          className="sustain-bg w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d2a1a]/92" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="sustain-el inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-6 font-semibold">
            <span>WHOLESALE SUPPLY & QUALITY ASSURANCE</span>
          </div>
          <h2 className="sustain-el font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            <span className="block">Engineered for Wholesale Scale.</span>
            <span className="block text-[#C59B27]">Rooted in Pure Quality.</span>
          </h2>
          <p className="sustain-el text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Supplying pure, cold-pressed kachi ghani mustard oil to distributors, wholesalers, and institutional buyers across India — with guaranteed consistency, high pungent kick, and freight-ready bulk packaging.
          </p>
        </div>

        {/* 3 Core Wholesale Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {wholesalePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="sustain-el bg-white/[0.07] border border-white/15 backdrop-blur-md p-8 md:p-9 rounded-xl hover:bg-white/[0.11] hover:border-[#C59B27]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-lg bg-[#C59B27]/15 border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27] mb-6 group-hover:scale-105 group-hover:bg-[#C59B27]/25 transition-all duration-300">
                  <pillar.icon size={28} weight="duotone" />
                </div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#C59B27] font-semibold mb-2">
                  {pillar.tag}
                </p>
                <h3 className="text-white font-display font-bold text-xl md:text-2xl mb-4 group-hover:text-[#F5B800] transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">
                  {pillar.body}
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 space-y-2.5">
                {pillar.specs.map((spec) => (
                  <div key={spec} className="flex items-start gap-2.5">
                    <CheckCircle size={16} weight="fill" className="text-[#C59B27] shrink-0 mt-0.5" />
                    <span className="text-xs text-white/80 font-medium leading-tight">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Structured Commitments & Standards Panel */}
        <div className="sustain-el mt-16 bg-white/[0.05] border border-white/15 rounded-2xl p-8 md:p-10 backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59B27] font-semibold mb-2">
              COMMITMENT TO SUSTAINABILITY & TRADE STANDARDS
            </p>
            <h3 className="text-white font-display font-bold text-2xl">
              Responsible Practices That Safeguard Tomorrow
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
            {operationalCommitments.map((item, idx) => (
              <div key={item.title} className={`flex flex-col gap-3 ${idx > 0 ? 'lg:pl-6 pt-4 sm:pt-0' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-[#C59B27]/10 border border-[#C59B27]/30 flex items-center justify-center text-[#C59B27] shrink-0">
                  <item.icon size={20} weight="duotone" />
                </div>
                <h4 className="text-white font-semibold text-base">{item.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* B2B Call to Action Strip */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/80 text-sm text-center sm:text-left">
              Looking for bulk commercial supply, 15L distributor packs, or institutional contracts?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 bg-[#C61A22] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#a5151c] transition-all duration-300 shrink-0 shadow-lg shadow-black/20"
            >
              <span>Request Wholesale Pricing</span>
              <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
