import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  MapPin, 
  Phone, 
  Envelope, 
  Clock, 
  CheckCircle, 
  Sparkle, 
  ChatCircleDots
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export default function RetailerLocator() {
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.locator-el',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#F8F5EE] pt-24 md:pt-32 pb-0 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (6 cols): Contact Information & Office Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="locator-el inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#1a4a2e] text-xs font-mono tracking-widest uppercase mb-4 font-semibold">
                <ChatCircleDots size={16} weight="duotone" />
                <span>CONTACT US</span>
              </div>
              <h2 className="locator-el font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#1a1a18] leading-tight mb-3">
                Contact Us
              </h2>
              <p className="locator-el text-[#9A7B3A] font-display font-bold text-xl md:text-2xl mb-4">
                We're Here to Help
              </p>
              <p className="locator-el text-[#1a1a18]/70 text-base leading-relaxed max-w-lg">
                For product enquiries, business partnerships, distributor contracts, or any other information, feel free to reach out to us.
              </p>
            </div>

            {/* Direct Contact Info Details */}
            <div className="locator-el bg-white p-7 sm:p-9 rounded-2xl border border-[#1a1a18]/10 shadow-xs space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={20} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1a1a18] mb-0.5">Corporate Office & Mill</h4>
                  <p className="text-xs text-[#1a1a18]/70 leading-relaxed">
                    Poddar Jindal Agro Mills Private Limited<br />
                    Plot No. 12, Industrial Area, New Delhi, India
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#1a1a18]/10" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={20} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1a1a18] mb-0.5">Trade & Customer Hotline</h4>
                  <p className="text-xs text-[#1a1a18]/70 leading-relaxed">
                    +91-11-2700 XXXX / +91-98XXX XXXXX
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#1a1a18]/10" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0 mt-0.5">
                  <Envelope size={20} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1a1a18] mb-0.5">Email Support</h4>
                  <p className="text-xs text-[#1a1a18]/70 leading-relaxed">
                    info@poddarjindal.com / sales@poddarjindal.com
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#1a1a18]/10" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={20} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#1a1a18] mb-0.5">Working Hours</h4>
                  <p className="text-xs text-[#1a1a18]/70 leading-relaxed">
                    Monday – Saturday: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (6 cols): Send Us A Message Form */}
          <div className="lg:col-span-6 locator-el">
            <div className="bg-white rounded-2xl shadow-sm border border-[#1a1a18]/10 p-8 sm:p-10">
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#1a1a18] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#1a1a18]/70 mb-6 leading-relaxed">
                Interested in stocking Poddar Jindal, bulk purchases (15L / 5L), or have a question? Leave a note and our trade team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-700">
                    <CheckCircle size={36} weight="fill" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#1a1a18] mb-2">Message Sent Successfully</h4>
                  <p className="text-xs text-[#1a1a18]/70 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. A representative from Poddar Jindal Agro Mills will get back to you within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#C61A22] text-xs font-semibold hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1a1a18] mb-1.5">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      required
                      className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-4 py-3 text-xs sm:text-sm text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#1a1a18] mb-1.5">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-4 py-3 text-xs sm:text-sm text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1a1a18] mb-1.5">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-4 py-3 text-xs sm:text-sm text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-pack" className="block text-xs font-semibold text-[#1a1a18] mb-1.5">Pack Size / Nature of Inquiry</label>
                    <select
                      id="contact-pack"
                      className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-4 py-3 text-xs sm:text-sm text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                    >
                      <option value="general">General Product Inquiry</option>
                      <option value="15L">15 Litre Commercial Tin (Bulk / Catering)</option>
                      <option value="5L">5 Litre Transparent Handle Jar</option>
                      <option value="1L-bottle">1 Litre Clear PET Bottle</option>
                      <option value="1L-pouch">1 Litre Stand-Up Pouch Pack</option>
                      <option value="500ml">500 ml Pouch Pack</option>
                      <option value="distributorship">Distributorship / Dealership Application</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-semibold text-[#1a1a18] mb-1.5">Message</label>
                    <textarea
                      id="contact-msg"
                      rows={4}
                      placeholder="How can we help you?"
                      required
                      className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-4 py-3 text-xs sm:text-sm text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C61A22] hover:bg-[#a5151c] text-white font-semibold text-sm py-3.5 rounded-md transition-colors duration-200 cursor-pointer shadow-md shadow-black/10 flex items-center justify-center gap-2"
                  >
                    <span>Submit</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM GREEN TRUST STRIP (EXACT DESIGN FROM INSPIRATION image copy 2.png) ── */}
      <div className="bg-[#1a4a2e] text-white py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xl text-[#F5B800]">
              🌿
            </div>
            <p className="font-display font-bold text-sm">100% Natural</p>
            <p className="text-white/60 text-[11px]">Unrefined, cold-pressed seed goodness</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xl text-[#F5B800]">
              ♨️
            </div>
            <p className="font-display font-bold text-sm">Rich Aroma & Flavour</p>
            <p className="text-white/60 text-[11px]">Authentic pungent kick for Indian meals</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xl text-[#F5B800]">
              🛡️
            </div>
            <p className="font-display font-bold text-sm">No Added Preservatives</p>
            <p className="text-white/60 text-[11px]">Zero artificial chemicals, colours or argemone</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xl text-[#F5B800]">
              ❤️
            </div>
            <p className="font-display font-bold text-sm">Good for Every Kitchen</p>
            <p className="text-white/60 text-[11px]">Daily cooking, tempering & deep frying</p>
          </div>

        </div>
      </div>
    </section>
  )
}


