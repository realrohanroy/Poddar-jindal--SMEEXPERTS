import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { recipes } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Recipes() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.recipes-heading',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
      gsap.fromTo('.recipe-card-wrap',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.recipes-grid', start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="recipes"
      ref={sectionRef}
      className="bg-pj-cream py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="recipes-heading font-display font-black text-4xl md:text-6xl text-pj-charcoal leading-tight">
              <span className="block">Real Flavours.</span>
              <span className="block text-pj-red">Real Moments.</span>
            </h2>
            <p className="recipes-heading text-pj-brown/60 text-lg mt-4 max-w-lg">
              Poddar Jindal Mustard Oil adds a rich aroma and authentic taste to your everyday meals.
            </p>
          </div>
          <a
            href="#recipes"
            className="recipes-heading inline-flex items-center gap-2 bg-pj-red text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-red-700 hover:gap-3 transition-all duration-200 shrink-0"
          >
            Explore Recipes →
          </a>
        </div>

        {/* Category strip */}
        <div className="recipes-heading flex flex-wrap gap-3 mb-12">
          {['All Recipes', 'Traditional Indian', 'North Indian', 'Bengali', 'Pickles & Chutneys', 'Modern'].map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                i === 0
                  ? 'bg-pj-red text-white'
                  : 'border border-pj-brown/20 text-pj-brown/70 hover:border-pj-red hover:text-pj-red'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe cards */}
        <div className="recipes-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe, i) => (
            <div
              key={recipe.id}
              className={`recipe-card-wrap group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}
            >
              <div className="recipe-card bg-white rounded-sm overflow-hidden h-full">
                {/* Image */}
                <div className={`overflow-hidden relative ${i === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-card-img w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-pj-green/90 backdrop-blur-sm text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1">
                      {recipe.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-xl text-pj-charcoal group-hover:text-pj-red transition-colors duration-200">
                      {recipe.name}
                    </h3>
                    <span className="text-pj-brown/40 text-xs font-mono">{recipe.time}</span>
                  </div>
                  <p className="text-pj-brown/60 text-sm leading-relaxed mb-4">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-1 text-pj-red text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                    View Recipe
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
