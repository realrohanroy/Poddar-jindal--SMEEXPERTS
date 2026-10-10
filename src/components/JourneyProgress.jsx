import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stages = ['FIELD', 'SEED', 'PRESS', 'QUALITY', 'BOTTLE', 'KITCHEN']

export default function JourneyProgress() {
  const containerRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    const triggers = []

    stages.forEach((stage, i) => {
      const sectionIds = ['field', 'seed', 'press', 'quality', 'bottle', 'kitchen']
      const sectionId = sectionIds[i]
      const el = document.getElementById(sectionId)
      if (!el) return

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => activateDot(i),
        onEnterBack: () => activateDot(i),
      })
      triggers.push(trigger)
    })

    function activateDot(activeIdx) {
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        if (i === activeIdx) {
          dot.classList.add('active')
        } else {
          dot.classList.remove('active')
        }
      })
    }

    return () => triggers.forEach(t => t.kill())
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3"
    >
      {stages.map((stage, i) => (
        <div key={stage} className="flex items-center gap-2 group">
          <span className="text-[10px] font-mono uppercase tracking-widest text-pj-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
            {stage}
          </span>
          <div
            ref={el => dotsRef.current[i] = el}
            className="journey-dot"
          />
        </div>
      ))}
    </div>
  )
}
