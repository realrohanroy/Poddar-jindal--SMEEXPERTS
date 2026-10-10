import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProductShowcase() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.product-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="product"
      ref={sectionRef}
      className="bg-pj-cream-dark pb-0 relative w-full"
    >
      <div className="relative w-full flex items-center">
        {/* Full width product image as background-like element */}
        <img
          src="/images/our-product-PC.png"
          alt="Poddar Jindal Products Range"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        
        {/* Absolute overlay for text and button */}
        <div className="absolute inset-0 pt-[4%] md:pt-[2%] lg:pt-[2%]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-[45%] lg:max-w-md">
              <h2 className="product-header font-display font-black text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-pj-charcoal leading-tight">
                Our Product Range
              </h2>
              <p className="product-header text-pj-brown/80 text-xs md:text-sm lg:text-lg mt-3 md:mt-5 mb-5 md:mb-8">
                Poddar Jindal Mustard Oil is available in multiple pack sizes to suit your home and business needs.
              </p>
              <a
                href="#contact"
                className="product-header inline-flex items-center justify-center bg-pj-red text-white font-semibold text-xs md:text-base px-4 py-2 md:px-6 md:py-3 rounded-sm hover:bg-pj-gold transition-colors duration-300"
              >
                View All Products →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
