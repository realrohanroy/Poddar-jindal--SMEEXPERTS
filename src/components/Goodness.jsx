import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Plant, 
  SlidersHorizontal, 
  ShieldCheck, 
  Package 
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const proofPoints = [
  {
    id: 'raw-materials',
    number: '01',
    displayTitle: '01 — Raw Materials',
    title: '1. Raw materials',
    description: 'Mustard seeds undergo physical inspection on arrival at the mill, checking grain maturity, moisture content, and purity before acceptance into processing.',
    Icon: Plant,
  },
  {
    id: 'processing',
    number: '02',
    displayTitle: '02 — Processing',
    title: '2. Processing',
    description: 'Cleaned seeds are crushed using mechanical expeller presses at regulated temperatures, extracting pure oil naturally without chemical solvents.',
    Icon: SlidersHorizontal,
  },
  {
    id: 'quality-checks',
    number: '03',
    displayTitle: '03 — Quality Checks',
    title: '3. Quality checks',
    description: 'Every production lot is examined for natural pungency, colour clarity, and sediment clearance at key holding stages before transfer to packaging.',
    Icon: ShieldCheck,
  },
  {
    id: 'packaging',
    number: '04',
    displayTitle: '04 — Packaging',
    title: '4. Packaging',
    description: 'Finished oil is packed into food-grade bottles, pouches, and tins with tamper-evident sealing at our Nadbai mill to preserve fresh aroma and ensure shelf safety.',
    Icon: Package,
  },
]

export default function Goodness() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.standard-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      // Visual reveal
      gsap.fromTo(
        '.standard-visual',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.standard-visual',
            start: 'top 80%',
          },
        }
      )

      // 2x2 grid cards stagger reveal
      gsap.fromTo(
        '.standard-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.standard-grid',
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="relative bg-[#103A29] text-white py-20 md:py-28 lg:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
        
        {/* Section Header */}
        <div className="standard-header mb-10 md:mb-14">
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#C59B27] uppercase font-semibold mb-3">
            THE PODDAR-JINDAL STANDARD
          </p>
          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-[#FDFBF7] tracking-tight leading-[1.18]">
            Quality isn't a claim.<br />
            <span className="italic text-[#EDE4CE]/90">It's a process.</span>
          </h2>
          <p className="text-[#EDE4CE]/75 text-base sm:text-lg max-w-2xl leading-relaxed mt-4 font-normal">
            From the raw material to the sealed pack, quality is built into the steps that matter.
          </p>
        </div>

        {/* Dominant Processing Visual */}
        <div className="standard-visual relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 md:mb-8 bg-[#092218]">
          <img
            src="/images/processing-machinery.jpg"
            alt="Poddar Jindal mustard oil processing and extraction unit at the mill"
            className="w-full h-[260px] sm:h-[380px] md:h-[460px] object-cover object-center transform transition-transform duration-700 ease-out hover:scale-[1.01]"
            loading="lazy"
          />
        </div>

        {/* Four Evidence-Led Proof Points (2x2 Grid on Desktop) */}
        <div className="standard-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {proofPoints.map((item) => (
            <div
              key={item.id}
              className="standard-card bg-white/[0.03] border border-[#1f5636]/80 hover:border-[#C59B27]/40 rounded-xl sm:rounded-2xl p-6 sm:p-7 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-[#C59B27] mb-3.5 inline-block">
                  <item.Icon size={22} weight="regular" />
                </div>
                <h3 className="font-sans font-semibold text-white text-base sm:text-lg mb-2 tracking-normal">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
