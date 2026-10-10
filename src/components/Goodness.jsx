import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { goodness } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Goodness() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.goodness-heading',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.goodness-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.goodness-grid', start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="relative bg-pj-green overflow-hidden py-24 md:py-32"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="goodness-heading font-display font-black text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            <span className="block">Naturally Rich.</span>
            <span className="block text-pj-gold">Traditionally Loved.</span>
          </h2>
          <p className="goodness-heading text-white/60 text-lg max-w-xl mx-auto">
            The natural qualities that make Poddar Jindal Mustard Oil a trusted choice in Indian kitchens.
          </p>
        </div>

        {/* Cards */}
        <div className="goodness-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-transparent">
          {goodness.map((item, i) => (
            <div
              key={item.title}
              className="goodness-card bg-white/5 border border-white/10 p-8 md:p-10 group hover:bg-white/10 transition-colors duration-400 rounded-sm"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-pj-gold/20 flex items-center justify-center text-2xl mb-6 group-hover:bg-pj-gold/30 transition-colors duration-300">
                {item.icon}
              </div>

              {/* Number */}
              <p className="text-pj-gold/30 font-mono text-6xl font-black leading-none mb-4 select-none">
                {String(i + 1).padStart(2, '0')}
              </p>

              <h3 className="text-white font-display font-bold text-xl mb-3 group-hover:text-pj-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="mt-16 pt-16 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '100%', label: 'Pure Mustard Oil' },
            { value: '0', label: 'Added Preservatives' },
            { value: '5+', label: 'Pack Sizes Available' },
            { value: '✓', label: 'Hygienic Processing' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-black text-4xl md:text-5xl text-pj-gold mb-2">{stat.value}</p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
