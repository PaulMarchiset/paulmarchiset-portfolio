// animations/header.ts
import gsap from 'gsap'

// Custom ease function
function customEase(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
}

export function openHeaderAnimation({
  isMobile = false,
  yOffset = 0,
  borderRadius = 25,
  duration = 1.5
} = {}) {
  gsap.set('#main-content', { y: -yOffset})
  gsap.set('#main', { y: yOffset, pointerEvents: 'none'})
  gsap.to('#main', {
    borderRadius,
    y: isMobile ? yOffset + 0.85 * window.innerHeight : yOffset + 0.9 * window.innerHeight,
    scaleX: 0.96,
    scaleY: 0.96,
    duration,
    ease: customEase
  })
}

export function closeHeaderAnimation({
  yOffset = 0,
  duration = 1.5
} = {}) {
  gsap.to('#main', {
    borderRadius: 0,
    y: yOffset,
    scaleX: 1,
    scaleY: 1,
    duration,
    ease: customEase,
    onComplete: () => {
      gsap.set('#main-content', { clearProps: 'all' })
      gsap.set('#main', { clearProps: 'all' })
    }
  })
}
