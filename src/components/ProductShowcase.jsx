import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../data/content'
import { 
  Package, 
  ShieldCheck, 
  Sparkle, 
  Drop, 
  ArrowRight, 
  CheckCircle, 
  ArrowsOutSimple, 
  X,
  Buildings,
  CookingPot
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeModalProduct, setActiveModalProduct] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.product-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )

      // Package cards stagger
      gsap.fromTo('.pack-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: cardsContainerRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => {
        if (selectedCategory === '1L') return p.size === '1 Litre'
        if (selectedCategory === '0.5L') return p.size === '500 ml'
        if (selectedCategory === '5L') return p.size === '5 Litre'
        if (selectedCategory === '15L') return p.size === '15 Litre'
        return true
      })

  return (
    <section
      id="product"
      ref={sectionRef}
      className="bg-[#F8F5EE] pb-24 relative w-full overflow-hidden"
    >
      {/* ── 1. CINEMATIC FULL-WIDTH BANNER (USER ADJUSTED LAYOUT) ── */}
      <div className="relative w-full flex items-center shadow-sm">
        {/* Full width product image as background-like element */}
        <img
          src="/images/our-product-PC.png"
          alt="Poddar Jindal Products Range"
          className="w-full h-auto object-cover min-h-[320px] md:min-h-auto"
          loading="lazy"
        />
        
        {/* Absolute overlay for text and button placed above on image */}
        <div className="absolute inset-0 pt-[3%] md:pt-[2%] lg:pt-[2.5%]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-[85%] sm:max-w-[65%] md:max-w-[48%] lg:max-w-md">
              <div className="product-header inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#1a4a2e] text-[10px] md:text-xs font-mono uppercase tracking-wider mb-2 font-semibold">
                <span>04 / THE OIL</span>
                <span className="w-1 h-1 rounded-full bg-[#C59B27]" />
                <span>COMPLETE RANGE</span>
              </div>
              <h2 className="product-header font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-pj-charcoal leading-tight">
                Our Product Range
              </h2>
              <p className="product-header text-pj-brown/85 text-xs sm:text-sm lg:text-base mt-2 md:mt-4 mb-4 md:mb-6 leading-relaxed">
                One mustard oil. Made for every kitchen. Poddar Jindal Mustard Oil is available in multiple pack sizes to suit your home and business needs.
              </p>
              <div className="product-header flex flex-wrap items-center gap-2.5">
                <a
                  href="#pack-explorer"
                  className="inline-flex items-center justify-center gap-2 bg-[#C61A22] text-white font-semibold text-xs md:text-sm px-4 py-2 md:px-6 md:py-2.5 rounded-sm hover:bg-[#a5151c] transition-colors duration-300 shadow-md shadow-black/10"
                >
                  Explore Pack Sizes ↓
                </a>
                <a
                  href="#contact"
                  className="hidden sm:inline-flex items-center justify-center border border-[#1a4a2e]/30 bg-white/70 backdrop-blur-xs text-[#1a4a2e] font-semibold text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-sm hover:bg-white transition-colors duration-300"
                >
                  Wholesale Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Script callout top-right */}
        <div className="hidden lg:block absolute top-[12%] right-[8%] text-right pointer-events-none">
          <p className="font-script text-[#1a4a2e] text-2xl xl:text-3xl leading-snug drop-shadow-sm">
            <span>Same Goodness.</span><br />
            <span>Different Sizes.</span><br />
            <span className="text-[#C59B27]">For Every Home.</span>
          </p>
        </div>
      </div>

      {/* ── 2. INTERACTIVE INDIVIDUAL PACKAGES EXPLORER (1L & MULTI-LITRE PACKS) ── */}
      <div id="pack-explorer" className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#1a4a2e]/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C59B27] font-semibold mb-2">
              <Package size={16} weight="duotone" />
              <span>INDIVIDUAL PACK SPECIFICATIONS</span>
            </div>
            <h3 className="font-display font-black text-3xl md:text-4xl text-[#1a1a18]">
              Choose Your Perfect Pack
            </h3>
            <p className="text-[#1a1a18]/70 text-sm md:text-base mt-2 max-w-xl">
              From our compact 500 ml pouch and popular 1 Litre bottles to 5 Litre family jars and heavy-duty 15 Litre commercial tins.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {[
              { key: 'all', label: 'All Packs (5)' },
              { key: '1L', label: '1 Litre Packs' },
              { key: '0.5L', label: '500 ml' },
              { key: '5L', label: '5 Litre' },
              { key: '15L', label: '15 Litre Tin' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`text-xs font-medium px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.key
                    ? 'bg-[#1a4a2e] text-white shadow-sm'
                    : 'bg-white text-[#1a1a18]/70 border border-[#1a1a18]/15 hover:border-[#1a4a2e]/40 hover:text-[#1a4a2e]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="pack-card bg-white rounded-xl border border-[#1a1a18]/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Pack Visual Container */}
                <div className="relative aspect-[4/5] bg-gradient-to-b from-[#FDFBF7] to-[#F5EEDB] p-4 flex items-center justify-center overflow-hidden">
                  {/* Subtle radial warmth glow behind bottle */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,39,0.18)_0%,transparent_70%)] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#1a4a2e] text-white shadow-xs">
                      {p.size}
                    </span>
                  </div>

                  {/* Pack Type Tag */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[9px] font-semibold text-[#9A7B3A] bg-[#9A7B3A]/10 border border-[#9A7B3A]/20 px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  </div>

                  {/* Product Image with lift interaction */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="relative z-1 max-h-[85%] max-w-[85%] object-contain drop-shadow-md group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-400 ease-out"
                    loading="lazy"
                  />

                  {/* Quick Expand Button */}
                  <button
                    onClick={() => setActiveModalProduct(p)}
                    aria-label={`View specs for ${p.name} ${p.size}`}
                    className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1a4a2e] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                  >
                    <ArrowsOutSimple size={16} weight="bold" />
                  </button>
                </div>

                {/* Card Information */}
                <div className="p-5">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#9A7B3A] font-semibold mb-1">
                    {p.packType}
                  </p>
                  <h4 className="font-display font-bold text-lg text-[#1a1a18] group-hover:text-[#1a4a2e] transition-colors leading-tight mb-2">
                    {p.name} <span className="text-[#C61A22]">({p.size})</span>
                  </h4>
                  <p className="text-xs text-[#1a1a18]/70 line-clamp-2 leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {/* Key specs chips */}
                  <div className="space-y-1.5 pt-3 border-t border-[#1a1a18]/10 text-[11px] text-[#1a1a18]/80">
                    <div className="flex items-center gap-1.5">
                      <Drop size={13} weight="fill" className="text-[#C59B27] shrink-0" />
                      <span className="font-semibold text-[#1a4a2e]">Smoke Point:</span> {p.specs.smokePoint}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package size={13} weight="duotone" className="text-[#1a4a2e] shrink-0" />
                      <span className="font-semibold text-[#1a4a2e]">Packing:</span> {p.specs.caseCount.split('/')[0]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveModalProduct(p)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 px-3 rounded-md border border-[#1a4a2e]/25 text-[#1a4a2e] hover:bg-[#1a4a2e] hover:text-white transition-all duration-200 cursor-pointer group/btn"
                >
                  <span>View Specifications</span>
                  <ArrowRight size={13} weight="bold" className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. PACKAGING COMPARISON MATRIX ── */}
        <div className="mt-16 bg-white rounded-2xl border border-[#1a1a18]/10 p-6 md:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1a1a18]/10">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#9A7B3A] font-semibold mb-1">
                TECHNICAL PACK MATRIX
              </p>
              <h4 className="font-display font-bold text-xl text-[#1a1a18]">
                Packaging & Sizing Overview
              </h4>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#C61A22] hover:text-[#9e141a] transition-colors"
            >
              <span>Download Trade Catalog / Price Sheet</span>
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-[#1a1a18]/10 text-[#1a4a2e] font-semibold">
                  <th className="pb-3 pr-4">Net Volume</th>
                  <th className="pb-3 px-4">Container Format</th>
                  <th className="pb-3 px-4">Ideal Consumer / Usage</th>
                  <th className="pb-3 px-4">Carton Packaging</th>
                  <th className="pb-3 pl-4 text-right">Wholesale Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a18]/5 text-[#1a1a18]/75">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="py-3.5 pr-4 font-bold text-[#1a4a2e] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                      {p.volume}
                    </td>
                    <td className="py-3.5 px-4">{p.packType}</td>
                    <td className="py-3.5 px-4">{p.bestFor}</td>
                    <td className="py-3.5 px-4 font-mono text-xs">{p.specs.caseCount}</td>
                    <td className="py-3.5 pl-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle size={12} weight="fill" /> Ready Stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 4. COMMERCIAL & WHOLESALE HIGHLIGHT BAND ── */}
        <div className="mt-12 bg-gradient-to-r from-[#1a4a2e] to-[#0d2a1a] rounded-2xl p-8 md:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 text-[#C59B27] text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
              <Buildings size={15} weight="duotone" />
              <span>COMMERCIAL & BULK PACK SUPPLY</span>
            </div>
            <h4 className="font-display font-black text-2xl md:text-3xl leading-tight mb-2">
              Supplying 15L Tins & 5L Jars for Restaurants & Distributors
            </h4>
            <p className="text-white/75 text-sm md:text-base leading-relaxed">
              We cater to wholesale dealers, supermarket distributors, catering chains, and institutional kitchens across North and Eastern India. All commercial batches include Certificate of Analysis (COA) with guaranteed cold-pressed pungency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="#contact"
              className="w-full sm:w-auto text-center bg-[#C61A22] text-white font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-[#a5151c] transition-colors shadow-md shadow-black/20"
            >
              Request Bulk Quotation →
            </a>
            <a
              href="#quality"
              className="w-full sm:w-auto text-center border border-white/30 text-white font-medium text-sm px-6 py-3.5 rounded-md hover:bg-white/10 transition-colors"
            >
              View Quality Standards
            </a>
          </div>
        </div>

      </div>

      {/* ── 5. PACK DETAIL MODAL / QUICK-VIEW ── */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-[#1a1a18]/10 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5EEDB] hover:bg-[#ebdcb9] text-[#1a1a18] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Product Visual */}
              <div className="aspect-square bg-gradient-to-b from-[#FDFBF7] to-[#F5EEDB] rounded-xl p-6 flex items-center justify-center relative">
                <span className="absolute top-3 left-3 text-[11px] font-mono font-bold uppercase bg-[#1a4a2e] text-white px-2.5 py-1 rounded">
                  {activeModalProduct.size}
                </span>
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  className="max-h-full max-w-full object-contain drop-shadow-lg"
                />
              </div>

              {/* Product Specifications */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#9A7B3A] font-semibold mb-1">
                  {activeModalProduct.packType}
                </p>
                <h3 className="font-display font-black text-2xl text-[#1a1a18] mb-2">
                  {activeModalProduct.name}
                </h3>
                <p className="text-xs text-[#1a1a18]/70 leading-relaxed mb-4">
                  {activeModalProduct.description}
                </p>

                <div className="space-y-2 text-xs bg-[#F8F5EE] p-4 rounded-lg mb-5 border border-[#1a1a18]/10">
                  <div className="flex justify-between">
                    <span className="text-[#1a1a18]/60">Net Quantity:</span>
                    <span className="font-semibold text-[#1a4a2e]">{activeModalProduct.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1a1a18]/60">Container Material:</span>
                    <span className="font-semibold text-[#1a1a18]">{activeModalProduct.specs.container}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1a1a18]/60">Shelf Life:</span>
                    <span className="font-semibold text-[#1a1a18]">{activeModalProduct.specs.shelfLife}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1a1a18]/60">Master Carton:</span>
                    <span className="font-semibold text-[#1a1a18]">{activeModalProduct.specs.caseCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1a1a18]/60">Smoke Point:</span>
                    <span className="font-semibold text-[#C61A22]">{activeModalProduct.specs.smokePoint}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="#contact"
                    onClick={() => setActiveModalProduct(null)}
                    className="flex-1 text-center bg-[#C61A22] text-white text-xs font-semibold py-3 rounded-md hover:bg-[#a5151c] transition-colors"
                  >
                    Enquire This Size
                  </a>
                  <button
                    onClick={() => setActiveModalProduct(null)}
                    className="px-4 border border-[#1a1a18]/20 text-[#1a1a18] text-xs font-medium rounded-md hover:bg-[#F8F5EE] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

