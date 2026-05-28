import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)

  return {
    provide: {
      gsap,
      ScrollTrigger,
      TextPlugin,
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof gsap
    $ScrollTrigger: typeof ScrollTrigger
    $TextPlugin: typeof TextPlugin
  }
}
