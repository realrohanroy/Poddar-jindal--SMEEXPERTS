import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { navLinks } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)

    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
    )

    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { rootMargin: '-40% 0px -50% 0px' })
    sections.forEach(s => observer.observe(s))

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 bg-[#FDFBF7] ${
          scrolled ? 'shadow-md py-1.5 md:py-2' : 'py-2 md:py-3'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 flex items-center justify-between">
          
          {/* Logo — Left */}
          <a href="#home" className="flex items-center shrink-0">
            <img
              src="/Poddar-jindal-Logo-Navbar.png"
              alt="Poddar Jindal"
              className="h-[38px] md:h-[65px] w-auto object-contain"
            />
          </a>

          {/* Desktop Nav — Center */}
          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative group transition-colors duration-200"
                >
                  <span className={`text-[15px] font-semibold tracking-tight ${
                    isActive ? 'text-[#C59B27]' : 'text-[#1a4a2e] group-hover:text-[#C59B27]'
                  }`}>
                    {link.label}
                  </span>
                  {/* Underline for active state */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#C59B27]" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Right Side — Search + Divider + CTA */}
          <div className="hidden lg:flex items-center ml-4 shrink-0">
            <button className="p-2 text-[#1a4a2e] hover:text-[#C59B27] transition-colors" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            
            <div className="w-[1px] h-6 bg-[#1a4a2e]/15 mx-5" />
            
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#C61A22] text-white text-[15px] font-semibold px-6 py-2.5 rounded-md hover:bg-[#a5151c] transition-colors"
            >
              Find Your Pack &rarr;
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <button className="p-2 text-[#1a4a2e]" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button
              className="p-2 text-[#1a4a2e]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-[2px] bg-current origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
                <span className={`block h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}/>
                <span className={`block h-[2px] bg-current origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── FEATURE STRIP ── */}
      <div
        className={`fixed left-0 right-0 z-40 bg-[#F4EAC8] transition-all duration-400 hidden lg:block ${
          scrolled ? 'top-[71px]' : 'top-[89px]'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 py-3 flex items-center justify-between w-full">
          <div className="flex items-center justify-between flex-1 pr-[8%] lg:pr-[12%]">
            {/* Item 1 */}
            <div className="flex items-center gap-3 text-[#1a4a2e]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span className="text-[14px] font-semibold">Made with care</span>
            </div>
            
            <div className="w-[1px] h-5 bg-[#1a4a2e]/20" />
            
            {/* Item 2 */}
            <div className="flex items-center gap-3 text-[#1a4a2e]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span className="text-[14px] font-semibold">From mustard seed</span>
            </div>
            
            <div className="w-[1px] h-5 bg-[#1a4a2e]/20" />

            {/* Item 3 */}
            <div className="flex items-center gap-3 text-[#1a4a2e]">
              <svg width="14" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L12 2C7.5 7.5 4 11.5 4 16c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4.5-3.5-8.5-8-14z"/>
              </svg>
              <span className="text-[14px] font-semibold">Rich, bold flavour</span>
            </div>
          </div>
          
          <a
            href="#field"
            className="text-[13px] font-semibold text-[#C59B27] hover:text-[#a37e1b] transition-colors flex items-center gap-2"
          >
            Explore the journey &darr;
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-[#1a4a2e] flex flex-col transition-all duration-400 lg:hidden ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-display font-bold hover:text-[#F5B800] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-2 bg-[#C61A22] text-white font-semibold px-8 py-3.5 rounded-md"
          >
            Find Your Pack &rarr;
          </a>
        </div>
      </div>
    </>
  )
}
