import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  MapPin, 
  Phone, 
  Envelope, 
  Clock, 
  MagnifyingGlass, 
  CheckCircle, 
  Sparkle, 
  Drop, 
  Flame, 
  Heart,
  Storefront
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const statesAndCities = {
  'Delhi NCR': ['New Delhi', 'North Delhi', 'South Delhi', 'Noida', 'Gurugram', 'Faridabad'],
  'Rajasthan': ['Jaipur', 'Alwar', 'Bharatpur', 'Kota', 'Jodhpur', 'Bikaner'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Meerut'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga'],
  'West Bengal': ['Kolkata', 'Howrah', 'Siliguri', 'Asansol', 'Durgapur'],
  'Haryana': ['Hisar', 'Karnal', 'Rohtak', 'Panipat', 'Ambala'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
}

const sampleRetailers = [
  { name: 'Poddar Jindal Authorized Depot', area: 'Main APMC Mandi, Lawrence Road', city: 'Delhi', state: 'Delhi NCR', type: 'Depot & Wholesale' },
  { name: 'Shree Krishna Agro Mart', area: 'Johari Bazaar', city: 'Jaipur', state: 'Rajasthan', type: 'Retail & Superstore' },
  { name: 'National Kirana Store', area: 'Aminabad Market', city: 'Lucknow', state: 'Uttar Pradesh', type: 'Superstore' },
  { name: 'Annapurna Bhandar', area: 'Burrabazar Wholesale Hub', city: 'Kolkata', state: 'West Bengal', type: 'Wholesale Distributor' },
  { name: 'Kalyan Grocery & Provisions', area: 'Fraser Road', city: 'Patna', state: 'Bihar', type: 'Retail Store' },
]

export default function RetailerLocator() {
  const sectionRef = useRef(null)
  const [selectedState, setSelectedState] = useState('Delhi NCR')
  const [selectedCity, setSelectedCity] = useState('New Delhi')
  const [pinCode, setPinCode] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [searchTriggered, setSearchTriggered] = useState(false)

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

  const handleStateChange = (e) => {
    const st = e.target.value
    setSelectedState(st)
    setSelectedCity(statesAndCities[st][0])
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTriggered(true)
  }

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
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="locator-el inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C59B27]/15 border border-[#C59B27]/30 text-[#1a4a2e] text-xs font-mono tracking-widest uppercase mb-3 font-semibold">
            <Storefront size={16} weight="duotone" />
            <span>FIND PODDAR JINDAL NEAR YOU</span>
          </div>
          <h2 className="locator-el font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#1a1a18] leading-tight mb-4">
            Contact Us & Store Locator
          </h2>
          <p className="locator-el text-[#1a1a18]/70 text-base md:text-lg leading-relaxed">
            For product enquiries, wholesale partnerships, distributor contracts, or finding your nearest retailer across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7 cols): Retailer Search & Contact Information */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Retailer Finder Box */}
            <div className="locator-el bg-white p-6 sm:p-8 rounded-2xl border border-[#1a1a18]/10 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={22} weight="duotone" className="text-[#C61A22]" />
                <h3 className="font-display font-bold text-xl text-[#1a1a18]">
                  Find an Authorized Retailer or Depot
                </h3>
              </div>
              <p className="text-xs text-[#1a1a18]/70 mb-6">
                Select your state and city or enter your 6-digit PIN code to locate nearest grocery stores and wholesale depots stocking Poddar Jindal Mustard Oil.
              </p>

              <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div>
                  <label htmlFor="state-select" className="block text-[11px] font-mono text-[#1a1a18]/70 uppercase mb-1">State</label>
                  <select
                    id="state-select"
                    value={selectedState}
                    onChange={handleStateChange}
                    className="w-full bg-[#FDFBF7] border border-[#1a1a18]/20 rounded-md p-2.5 text-xs text-[#1a1a18] focus:border-[#1a4a2e] focus:outline-none"
                  >
                    {Object.keys(statesAndCities).map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="city-select" className="block text-[11px] font-mono text-[#1a1a18]/70 uppercase mb-1">City / Hub</label>
                  <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#1a1a18]/20 rounded-md p-2.5 text-xs text-[#1a1a18] focus:border-[#1a4a2e] focus:outline-none"
                  >
                    {statesAndCities[selectedState].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="pincode-input" className="block text-[11px] font-mono text-[#1a1a18]/70 uppercase mb-1">PIN Code (Optional)</label>
                  <div className="flex gap-1.5">
                    <input
                      id="pincode-input"
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 110006"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#1a1a18]/20 rounded-md p-2.5 text-xs text-[#1a1a18] focus:border-[#1a4a2e] focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Search retailers"
                      className="bg-[#1a4a2e] hover:bg-[#123620] text-white px-3.5 rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    >
                      <MagnifyingGlass size={16} weight="bold" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Retailer Search Results */}
              <div className="pt-5 border-t border-[#1a1a18]/10 space-y-3">
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#9A7B3A] font-semibold">
                  STORES & DEPOTS IN {selectedState.toUpperCase()} — {selectedCity.toUpperCase()}
                </p>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {sampleRetailers.map((r, i) => (
                    <div key={i} className="bg-[#FDFBF7] border border-[#1a1a18]/10 p-3 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#1a4a2e]">{r.name}</p>
                        <p className="text-[#1a1a18]/60 text-[11px]">{r.area}, {r.city}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C59B27]/15 text-[#9A7B3A] border border-[#C59B27]/30 font-semibold shrink-0">
                        {r.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Contact Info Card */}
            <div className="locator-el bg-white p-6 sm:p-8 rounded-2xl border border-[#1a1a18]/10 shadow-xs">
              <h3 className="font-display font-bold text-lg text-[#1a1a18] mb-4">
                Corporate Office & Manufacturing Unit
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0">
                    <MapPin size={16} weight="bold" />
                  </div>
                  <div>
                    <strong className="block text-[#1a1a18]">Registered Mill & Office:</strong>
                    <span className="text-[#1a1a18]/70">Poddar Jindal Agro Mills Private Limited, New Delhi & Agro Processing Hub, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0">
                    <Phone size={16} weight="bold" />
                  </div>
                  <div>
                    <strong className="block text-[#1a1a18]">Phone / Trade Hotline:</strong>
                    <span className="text-[#1a1a18]/70">+91-11-2700 XXXX / +91-98XXX XXXXX</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0">
                    <Envelope size={16} weight="bold" />
                  </div>
                  <div>
                    <strong className="block text-[#1a1a18]">Email Enquiries:</strong>
                    <span className="text-[#1a1a18]/70">sales@poddarjindal.com / info@poddarjindal.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a4a2e]/10 text-[#1a4a2e] flex items-center justify-center shrink-0">
                    <Clock size={16} weight="bold" />
                  </div>
                  <div>
                    <strong className="block text-[#1a1a18]">Working Hours:</strong>
                    <span className="text-[#1a1a18]/70">Monday – Saturday: 9:00 AM – 6:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Send Us A Message Form */}
          <div className="lg:col-span-5 locator-el">
            <div className="bg-white rounded-2xl shadow-sm border border-[#1a1a18]/10 p-8 sm:p-10">
              <h3 className="font-display font-black text-2xl text-[#1a1a18] mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#1a1a18]/70 mb-6 leading-relaxed">
                Interested in stocking Poddar Jindal, bulk purchases (15L / 5L), or have a question? Leave a note and our trade team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-700">
                    <CheckCircle size={32} weight="fill" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#1a1a18] mb-1">Inquiry Received</h4>
                  <p className="text-xs text-[#1a1a18]/70 max-w-xs mx-auto">
                    Thank you. A representative from Poddar Jindal Agro Mills will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-[#C61A22] text-xs font-semibold hover:underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1a1a18] mb-1">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Ramesh Jindal"
                      required
                      className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-3.5 py-2.5 text-xs text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#1a1a18] mb-1">Phone Number</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+91 98XXX XXXXX"
                        required
                        className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-3.5 py-2.5 text-xs text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1a1a18] mb-1">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-3.5 py-2.5 text-xs text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-pack" className="block text-xs font-semibold text-[#1a1a18] mb-1">Pack Size of Interest</label>
                    <select
                      id="contact-pack"
                      className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-3.5 py-2.5 text-xs text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e]"
                    >
                      <option value="all">All Sizes / General Inquiry</option>
                      <option value="15L">15 Litre Commercial Tin (Bulk / Catering)</option>
                      <option value="5L">5 Litre Transparent Handle Jar</option>
                      <option value="1L-bottle">1 Litre Clear PET Bottle</option>
                      <option value="1L-pouch">1 Litre Stand-Up Pouch Pack</option>
                      <option value="500ml">500 ml Pouch Pack</option>
                      <option value="distributor">Distributorship / Dealership Application</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-semibold text-[#1a1a18] mb-1">Message or Requirements</label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      placeholder="Describe your requirement, quantity, or city..."
                      required
                      className="w-full border border-[#1a1a18]/20 bg-[#FDFBF7] rounded-md px-3.5 py-2.5 text-xs text-[#1a1a18] focus:outline-none focus:border-[#1a4a2e] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#C61A22] hover:bg-[#a5151c] text-white font-semibold text-xs py-3.5 rounded-md transition-colors duration-200 cursor-pointer shadow-md shadow-black/10"
                  >
                    Submit Enquiry →
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. BOTTOM GREEN TRUST STRIP (EXACT DESIGN FROM INSPIRATION image copy 2.png) ── */}
      <div className="bg-[#1a4a2e] text-white py-8 border-t border-white/10">
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

