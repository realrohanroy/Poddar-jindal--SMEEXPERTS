import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    icon: '🌾',
    title: 'Responsible Sourcing',
    body: 'We source mustard seeds from trusted farmers, building long-term relationships with agricultural communities across India.',
  },
  {
    icon: '⚙️',
    title: 'Responsible Production',
    body: 'Our production process prioritises hygiene, efficiency, and waste reduction at every stage.',
  },
  {
    icon: '📦',
    title: 'Responsible Packaging',
    body: 'We use packaging designed for safe storage and minimal environmental impact across all our product sizes.',
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
        <div className="absolute inset-0 bg-pj-green/88" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="sustain-el font-display font-black text-4xl md:text-6xl text-white leading-tight mb-6">
            <span className="block">Committed to a</span>
            <span className="block text-pj-gold">Healthier Tomorrow</span>
          </h2>
          <p className="sustain-el text-white/60 text-lg max-w-xl mx-auto">
            We are committed to sustainable practices that protect the environment, support farmers and ensure a healthier future for generations to come.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-transparent">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="sustain-el bg-white/10 border border-white/20 backdrop-blur-sm p-10 hover:bg-white/15 transition-colors duration-400 group rounded-sm">
              <div className="text-4xl mb-6">{pillar.icon}</div>
              <h3 className="text-white font-display font-bold text-xl mb-4 group-hover:text-pj-gold transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>

        {/* Support icons */}
        <div className="sustain-el mt-16 pt-16 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {['Support to Farmers', 'Environment Friendly Practices', 'Responsible Resource Use', 'Building a Greener Future'].map(label => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-pj-gold/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-pj-gold" />
              </div>
              <p className="text-white/60 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
