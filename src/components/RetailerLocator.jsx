import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 'Hyderabad', 'Jaipur', 'Lucknow', 'Patna', 'Bhopal']
const states = ['Delhi', 'Maharashtra', 'West Bengal', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Rajasthan', 'Uttar Pradesh', 'Bihar', 'Madhya Pradesh']

export default function RetailerLocator() {
  const sectionRef = useRef(null)
  const [pin, setPin] = useState('')
  const [city, setCity] = useState('')
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-pj-cream py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="locator-el text-pj-red font-mono text-xs tracking-widest uppercase mb-4">Find Us</p>
            <h2 className="locator-el font-display font-black text-4xl md:text-5xl text-pj-charcoal leading-tight mb-6">
              <span className="block">Find Poddar Jindal</span>
              <span className="block">Near You</span>
            </h2>
            <p className="locator-el text-pj-brown/60 text-lg mb-8 max-w-md">
              Available at retailers and distributors across India. Use our locator to find a store near you.
            </p>

            {/* Contact info */}
            <div className="locator-el space-y-4">
              {[
                { icon: '📍', label: 'Poddar Jindal Agro Mills Private Limited, New Delhi, India' },
                { icon: '📞', label: '+91-11-XXXX XXXX' },
                { icon: '✉️', label: 'info@poddarjindal.com' },
                { icon: '🕐', label: 'Monday – Saturday, 9:00 AM – 6:00 PM' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{item.icon}</span>
                  <span className="text-pj-brown/70 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="locator-el">
            <div className="bg-white rounded-sm shadow-sm p-8 md:p-10">
              <h3 className="font-display font-bold text-2xl text-pj-charcoal mb-6">Send Us a Message</h3>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-pj-green/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a4a2e" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <p className="font-display font-bold text-xl text-pj-charcoal mb-2">Message Sent!</p>
                  <p className="text-pj-brown/60 text-sm">We'll get back to you within 1-2 business days.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-pj-red text-sm font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="block text-xs font-medium text-pj-charcoal mb-1.5">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        className="w-full border border-pj-brown/20 text-pj-charcoal placeholder:text-pj-brown/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-pj-red focus:ring-1 focus:ring-pj-red/20 transition-all duration-200"
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-pj-charcoal mb-1.5">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="How can we help you?"
                      required
                      className="w-full border border-pj-brown/20 text-pj-charcoal placeholder:text-pj-brown/30 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-pj-red focus:ring-1 focus:ring-pj-red/20 transition-all duration-200 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-pj-red text-white font-semibold py-3.5 rounded-sm hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Submit
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
