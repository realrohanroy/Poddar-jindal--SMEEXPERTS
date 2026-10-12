import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StoryJourney from './components/StoryJourney'
import ProductShowcase from './components/ProductShowcase'
import Goodness from './components/Goodness'
import Recipes from './components/Recipes'
import OurStory from './components/OurStory'
import Sustainability from './components/Sustainability'
import RetailerLocator from './components/RetailerLocator'
import Footer from './components/Footer'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  // Custom cursor (desktop with fine pointer only)
  useEffect(() => {
    // Completely disable on mobile and touch devices
    if (window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const dot = document.createElement('div')
    const ring = document.createElement('div')
    dot.className = 'cursor-dot'
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100
    let animId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX - 4 + 'px'
      dot.style.top = mouseY - 4 + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX - 16 + 'px'
      ring.style.top = ringY - 16 + 'px'
      animId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      const isMobile = window.innerWidth <= 1024 || window.matchMedia('(pointer: coarse)').matches
      if (isMobile) {
        dot.style.display = 'none'
        ring.style.display = 'none'
      } else {
        dot.style.display = 'block'
        ring.style.display = 'block'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      if (animId) cancelAnimationFrame(animId)
      dot.remove()
      ring.remove()
    }
  }, [])

  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <StoryJourney />
      <ProductShowcase />
      <Goodness />
      <Recipes />
      <OurStory />
      <Sustainability />
      <RetailerLocator />
      <Footer />
    </div>
  )
}
