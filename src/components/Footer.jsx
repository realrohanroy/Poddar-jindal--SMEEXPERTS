import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../data/content'
import { 
  FacebookLogo, 
  InstagramLogo, 
  YoutubeLogo 
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_LINKS = [
  { name: 'Facebook', href: '#', Icon: FacebookLogo },
  { name: 'Instagram', href: '#', Icon: InstagramLogo },
  { name: 'YouTube', href: '#', Icon: YoutubeLogo },
]

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand (4 cols) */}
          <div className="lg:col-span-4">
            <div className="footer-el mb-5">
              <img
                src="/Poddar-Jindal-Logo-footer.png"
                alt="Poddar Jindal"
                className="h-20 md:h-28 lg:h-32 w-auto object-contain max-w-full"
              />
            </div>
            <p className="footer-el text-white/60 text-xs md:text-sm leading-relaxed max-w-sm mb-4">
              Poddar Jindal Agro Mills Private Limited brings you the natural goodness of mustard oil — pure, traditional, and crafted with care from sunlit mustard fields.
            </p>
            <p className="footer-el text-pj-gold text-xs font-mono tracking-wider font-semibold mb-6">
              PURE • NATURAL • HEALTHY
            </p>

            {/* Social */}
            <div className="footer-el flex gap-3">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-pj-gold hover:text-pj-gold hover:bg-white/5 transition-all duration-200"
                >
                  <Icon size={18} weight="fill" />
                </a>
              ))}
            </div>
          </div>

          {/* Registered Office & Mill (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <p className="footer-el text-pj-gold text-xs font-mono tracking-widest uppercase font-semibold">
              OFFICES & MILL
            </p>

            <div className="footer-el">
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-wider mb-1 font-semibold">
                Regd. Office
              </p>
              <p className="text-white/80 text-xs leading-relaxed">
                111, GF, Block-B, Pocket-6, Sector-3, Rohini, New Delhi-110085, India
              </p>
            </div>

            <div className="footer-el">
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-wider mb-1 font-semibold">
                Mill
              </p>
              <p className="text-white/80 text-xs leading-relaxed">
                Khasra No.-56, Village- Khera, Tehsil- Nadbai, District- Bharatpur, Rajasthan- 321602, India
              </p>
            </div>
          </div>

          {/* Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="footer-el text-pj-gold text-xs font-mono tracking-widest uppercase font-semibold">
              DIRECT CONTACT
            </p>

            <div className="footer-el">
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-wider mb-1 font-semibold">
                Mobile No.
              </p>
              <div className="flex flex-col gap-1 text-xs text-white/85 font-medium">
                <a href="tel:+919871593457" className="hover:text-pj-gold transition-colors">
                  +91-98715-93457
                </a>
                <a href="tel:+919811046405" className="hover:text-pj-gold transition-colors">
                  +91-98110-46405
                </a>
              </div>
            </div>

            <div className="footer-el">
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-wider mb-1 font-semibold">
                E-mail ID
              </p>
              <a
                href="mailto:poddar.jindalagromills@gmail.com"
                className="text-xs text-white/85 hover:text-pj-gold transition-colors break-all font-medium"
              >
                poddar.jindalagromills@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <p className="footer-el text-white/40 text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
              Quick Links
            </p>
            <ul className="space-y-2 text-xs">
              {navLinks.map(link => (
                <li key={link.label} className="footer-el">
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-pj-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
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
