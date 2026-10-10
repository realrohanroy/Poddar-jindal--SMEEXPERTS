import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-el',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' }
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} className="bg-pj-green text-white">
      {/* Top CTA band */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="footer-el font-display font-black text-3xl md:text-4xl">
              <span className="block">Good Food Starts With</span>
              <span className="block text-pj-gold">Good Ingredients.</span>
            </p>
          </div>
          <a
            href="#contact"
            className="footer-el inline-flex items-center gap-2 bg-pj-red text-white font-semibold px-8 py-4 rounded-sm hover:bg-red-700 hover:gap-3 transition-all duration-200 shrink-0"
          >
            Discover Poddar Jindal →
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="footer-el mb-6">
              <img
                src="/Poddar-Jindal-Logo-footer.png"
                alt="Poddar Jindal"
                className="h-24 md:h-32 lg:h-40 w-auto object-contain max-w-full"
              />
            </div>
            <p className="footer-el text-white/55 text-sm leading-relaxed max-w-xs mb-6">
              Poddar Jindal Agro Mills Private Limited brings you the natural goodness of mustard oil — pure, traditional, and crafted with care.
            </p>
            <p className="footer-el text-white/40 text-xs font-mono tracking-wider">
              PURE • NATURAL • HEALTHY
            </p>

            {/* Social */}
            <div className="footer-el flex gap-3 mt-6">
              {['Facebook', 'Instagram', 'YouTube'].map(social => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-pj-gold hover:text-pj-gold transition-all duration-200 text-xs font-mono"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-el text-white/30 text-xs font-mono tracking-widest uppercase mb-6">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.label} className="footer-el">
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-pj-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products + Newsletter */}
          <div>
            <p className="footer-el text-white/30 text-xs font-mono tracking-widest uppercase mb-6">Products</p>
            <ul className="space-y-3 mb-8">
              {['Mustard Oil 500ml', 'Mustard Oil 1 Litre', 'Mustard Oil 5 Litre', 'Mustard Oil 15 Litre'].map(p => (
                <li key={p} className="footer-el">
                  <a href="#product" className="text-white/60 text-sm hover:text-pj-gold transition-colors duration-200">
                    {p}
                  </a>
                </li>
              ))}
            </ul>

            <p className="footer-el text-white/30 text-xs font-mono tracking-widest uppercase mb-3">Stay Updated</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="footer-el flex gap-0"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-xs px-3 py-2.5 focus:outline-none focus:border-pj-gold transition-colors duration-200"
              />
              <button
                type="submit"
                className="bg-pj-gold text-pj-charcoal font-semibold text-xs px-4 py-2.5 hover:bg-pj-mustard transition-colors duration-200"
              >
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="footer-el text-white/30 text-xs">
            © {currentYear} Poddar Jindal Agro Mills Private Limited. All Rights Reserved.
          </p>
          <div className="footer-el flex gap-6">
            {['Privacy Policy', 'Terms & Conditions'].map(link => (
              <a key={link} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
