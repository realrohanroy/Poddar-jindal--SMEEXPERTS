import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { recipes } from '../data/content'
import { Clock, Users, ArrowRight, X, CookingPot, Fire } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  'All Recipes',
  'Traditional Indian Recipes',
  'Regional Specialties',
  'Everyday Indian',
  'Pickles & Chutneys',
  'Snacks & Appetizers'
]

export default function Recipes() {
  const sectionRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('All Recipes')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

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
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.recipes-grid', start: 'top 75%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const filteredRecipes = activeCategory === 'All Recipes'
    ? recipes
    : recipes.filter(r => r.category === activeCategory)

  return (
    <section
      id="recipes"
      ref={sectionRef}
      className="bg-[#FDFBF7] py-24 md:py-32 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#1a1a18]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C61A22] font-semibold mb-2">
              <CookingPot size={16} weight="duotone" />
              <span>CULINARY HERITAGE</span>
            </div>
            <h2 className="recipes-heading font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#1a1a18] leading-tight">
              <span className="block">Real Flavours.</span>
              <span className="block text-[#C61A22]">Real Moments.</span>
            </h2>
            <p className="recipes-heading text-[#1a1a18]/70 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
              Poddar Jindal Mustard Oil adds its distinctive sharp aroma, golden warmth, and soulful pungency to regional Indian cooking.
            </p>
          </div>

          <a
            href="#recipes"
            className="recipes-heading inline-flex items-center gap-2 bg-[#C61A22] text-white font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-[#a5151c] transition-all duration-200 shrink-0 shadow-md shadow-black/10"
          >
            Explore All Recipes →
          </a>
        </div>

        {/* Category Filter Strip */}
        <div className="recipes-heading flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1a4a2e] text-white shadow-xs'
                  : 'bg-white border border-[#1a1a18]/15 text-[#1a1a18]/70 hover:border-[#1a4a2e]/40 hover:text-[#1a4a2e]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Cards Grid */}
        <div className="recipes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe, i) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="recipe-card-wrap group cursor-pointer bg-white rounded-xl border border-[#1a1a18]/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual */}
                <div className="overflow-hidden relative aspect-[16/10] bg-[#F5EEDB]">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#1a4a2e]/90 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded">
                      {recipe.category}
                    </span>
                  </div>

                  {/* Cook time & serves overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={14} weight="bold" /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} weight="bold" /> {recipe.serves}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-[#1a1a18] group-hover:text-[#C61A22] transition-colors duration-200 mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-[#1a1a18]/70 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Chef Mustard Oil Tip */}
                  <div className="bg-[#F8F5EE] border border-[#1a1a18]/10 rounded-lg p-3 text-[11px] text-[#1a1a18]/80 leading-relaxed">
                    <span className="font-bold text-[#1a4a2e]">Mustard Oil Touch:</span> {recipe.tip}
                  </div>
                </div>
              </div>

              {/* View recipe link */}
              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-[#1a1a18]/10 flex items-center justify-between text-[#C61A22] text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Read Full Recipe & Cooking Method</span>
                  <ArrowRight size={14} weight="bold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-[#1a1a18]/10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRecipe(null)}
              aria-label="Close recipe modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F5EEDB] hover:bg-[#ebdcb9] text-[#1a1a18] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="relative aspect-[16/8] rounded-xl overflow-hidden mb-6 bg-[#F5EEDB]">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C59B27] font-semibold">
                    {selectedRecipe.category}
                  </span>
                  <h3 className="font-display font-black text-2xl md:text-3xl text-white">
                    {selectedRecipe.name}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#1a1a18]/70 border-b border-[#1a1a18]/10 pb-4 mb-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock size={16} weight="duotone" className="text-[#C61A22]" />
                Cook Time: <strong>{selectedRecipe.time}</strong>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users size={16} weight="duotone" className="text-[#1a4a2e]" />
                Servings: <strong>{selectedRecipe.serves}</strong>
              </span>
            </div>

            <p className="text-sm text-[#1a1a18]/80 leading-relaxed mb-6">
              {selectedRecipe.description}
            </p>

            <div className="bg-[#F8F5EE] border border-[#1a4a2e]/20 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1a4a2e] font-bold mb-2">
                <Fire size={16} weight="duotone" className="text-[#C61A22]" />
                <span>HOW TO USE PODDAR JINDAL MUSTARD OIL</span>
              </div>
              <p className="text-xs text-[#1a1a18]/80 leading-relaxed">
                {selectedRecipe.tip}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <a
                href="#product"
                onClick={() => setSelectedRecipe(null)}
                className="inline-flex items-center gap-2 bg-[#C61A22] text-white font-semibold text-xs px-5 py-2.5 rounded-md hover:bg-[#a5151c] transition-colors"
              >
                <span>Find Suitable Pack (1L / 5L)</span>
                <ArrowRight size={13} weight="bold" />
              </a>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="border border-[#1a1a18]/20 px-4 py-2.5 rounded-md text-xs font-medium text-[#1a1a18] hover:bg-[#F8F5EE] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

