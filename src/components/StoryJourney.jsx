import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyStages } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function StoryJourney() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      // Intro text reveal
      gsap.fromTo('.journey-intro',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.journey-intro-wrap',
            start: 'top 75%',
          }
        }
      )

      if (prefersReduced) return

      // Each stage card reveal
      storyStages.forEach((stage) => {
        const card = document.querySelector(`#stage-${stage.id}`)
        if (!card) return

        // Image parallax inside card
        const img = card.querySelector('.stage-img')
        if (img) {
          gsap.fromTo(img,
            { yPercent: 8 },
            {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          )
        }

        // Text reveal
        const textEls = card.querySelectorAll('.stage-reveal')
        gsap.fromTo(textEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-pj-cream"
    >
      {/* Intro */}
      <div className="journey-intro-wrap max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 text-center">
        <h2 className="journey-intro font-display font-black text-4xl md:text-6xl lg:text-7xl text-pj-charcoal leading-tight mb-6">
          <span className="block">From a Tiny Seed</span>
          <span className="block">to Every Indian Kitchen</span>
        </h2>
        <p className="journey-intro text-pj-brown/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Every drop begins with something small — a carefully selected mustard seed.
          Follow its journey from India's fields to the oil in your kitchen.
        </p>
      </div>

      {/* Stage cards */}
      <div ref={trackRef} className="divide-y divide-pj-cream-dark/50">
        {storyStages.map((stage, i) => (
          <div
            key={stage.id}
            id={`stage-${stage.id}`}
            className={`relative overflow-hidden ${
              i % 2 === 0 ? 'bg-pj-cream' : 'bg-pj-cream-dark'
            }`}
          >
            <div className={`max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              i % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}>
              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="stage-reveal flex items-center gap-3 mb-4">
                  <span className="text-pj-gold font-mono text-xs tracking-widest">{stage.number}</span>
                  <div className="w-8 h-px bg-pj-gold/50" />
                  <span className="text-pj-brown/50 font-mono text-xs tracking-wider uppercase">{stage.label}</span>
                </div>

                <h3 className="stage-reveal font-display font-black text-3xl md:text-4xl lg:text-5xl text-pj-charcoal leading-tight mb-6">
                  {stage.heading}
                </h3>

                <p className="stage-reveal text-pj-brown/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  {stage.body}
                </p>

                {/* Tags */}
                <div className="stage-reveal flex flex-wrap gap-2">
                  {stage.tags.map(tag => (
                    <span
                      key={tag}
                      className="border border-pj-green/30 text-pj-green text-xs font-medium px-3 py-1.5 rounded-sm bg-pj-green/5"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className={`relative overflow-hidden rounded-sm aspect-[4/3] ${
                i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
              }`}>
                <img
                  src={stage.image}
                  alt={stage.label}
                  className="stage-img absolute inset-0 w-full h-full object-cover scale-110"
                  loading="lazy"
                />
                {/* Number overlay */}
                <div
                  className="absolute bottom-0 right-0 p-6 text-right"
                  style={{ background: `linear-gradient(135deg, transparent, ${stage.color}88)` }}
                >
                  <span
                    className="font-display font-black text-6xl leading-none text-white/20 select-none"
                  >
                    {stage.number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
