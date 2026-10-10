import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { period: 'Foundation', label: 'A vision to bring pure mustard oil to every home.' },
  { period: 'Growth', label: 'Expanding with modern technology and farmer partnerships.' },
  { period: 'Today', label: 'A trusted brand with presence across India.' },
  { period: 'Tomorrow', label: 'Continuing our commitment to health, quality and sustainability.' },
]

export default function OurStory() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-el',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      )

      // Parallax on background
      gsap.fromTo('.story-bg',
        { yPercent: -10 },
        {
          yPercent: 10, ease: 'none',
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
      id="story-page"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 bg-pj-cream-dark"
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <img
          src="/images/farmer.png"
          alt=""
          aria-hidden
          className="story-bg absolute inset-0 w-full h-full object-cover scale-110"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="story-el text-pj-red font-mono text-xs tracking-widest uppercase mb-4">Our Story</p>
            <h2 className="story-el font-display font-black text-4xl md:text-5xl lg:text-6xl text-pj-charcoal leading-tight mb-8">
              <span className="block">A Legacy of Trust.</span>
              <span className="block">A Future of</span>
              <span className="block text-pj-green">Goodness.</span>
            </h2>
            <p className="story-el text-pj-brown/70 text-lg leading-relaxed mb-6">
              Poddar Jindal Agro Mills Private Limited is built on strong values, deep roots in agriculture, and a commitment to provide pure, natural and healthy mustard oil to every Indian home.
            </p>
            <p className="story-el text-pj-brown/60 leading-relaxed mb-10">
              From carefully sourced mustard seeds from India's farmlands to a rigorously controlled production process — every bottle represents our promise of purity and quality.
            </p>
            <div className="story-el flex flex-wrap gap-3">
              {['Trusted Legacy', 'Farmer First', 'Quality Driven', 'Growing Together'].map(tag => (
                <span key={tag} className="border border-pj-green/30 text-pj-green text-xs font-medium px-3 py-2 rounded-sm bg-pj-green/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — timeline + image */}
          <div className="lg:col-span-7 space-y-0">
            {/* Farmer image */}
            <div className="story-el relative aspect-[16/9] rounded-sm overflow-hidden mb-12">
              <img
                src="/images/farmer.png"
                alt="Indian farmer in mustard field"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pj-charcoal/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-display font-bold text-xl">From India's Farmlands</p>
                <p className="text-white/70 text-sm">Trusted seeds from generations of farmers</p>
              </div>
            </div>

            {/* Timeline */}
            <h3 className="story-el font-display font-bold text-2xl text-pj-charcoal mb-8">Our Journey</h3>
            <div className="story-el relative pl-8 border-l-2 border-pj-gold/30 space-y-8">
              {milestones.map((m, i) => (
                <div key={m.period} className="relative">
                  <div className="absolute -left-[1.3rem] top-1 w-3.5 h-3.5 rounded-full border-2 border-pj-gold bg-pj-cream-dark" />
                  <p className="text-pj-gold font-mono text-xs tracking-wider uppercase mb-1">{m.period}</p>
                  <p className="text-pj-charcoal font-medium">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
