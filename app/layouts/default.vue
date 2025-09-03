<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { openHeaderAnimation, closeHeaderAnimation } from '@/animations/menuAnimation'

const menuStore = useMenuStore()
const lenisRef = ref()

// Register GSAP plugin once
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ScrollTrigger.defaults({
    markers: false
  })
})


// Lenis + GSAP ticker integration
watchEffect((onInvalidate) => {
  if (!lenisRef.value?.lenis) return
  const lenis = lenisRef.value.lenis

  // update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update)

  // sync Lenis with GSAP's ticker
  function update(time: number) {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(update)
  gsap.ticker.lagSmoothing(0)

  onInvalidate(() => {
    gsap.ticker.remove(update)
  })


})

watchEffect(() => {
  if (lenisRef.value?.lenis) {
    console.log('Lenis initialized ✅')
  }
})

watch(() => lenisRef.value?.lenis, (lenis) => {
  window.addEventListener('load', () => {
  lenis.resize()
})
})

// Menu open/close animations (unrelated to scroll)
watch(() => menuStore.isOpen, (isOpen) => {
  if (process.server) return

  if (isOpen) {
    lenisRef.value?.lenis?.stop()
    openHeaderAnimation({
      isMobile: window.innerWidth < 768,
      yOffset: window.scrollY,
      borderRadius: 20,
      duration: 0.8
    })
  } else {
    lenisRef.value?.lenis?.start()
    closeHeaderAnimation({
      yOffset: window.scrollY,
      duration: 0.8
    })
  }
})


const router = useRouter()

onMounted(() => {
  router.afterEach(() => {
    requestAnimationFrame(() => {
      lenisRef.value?.lenis?.resize()
      ScrollTrigger.refresh()
    })
  })

  const observer = new ResizeObserver(() => {
    lenisRef.value?.lenis?.resize()
    ScrollTrigger.refresh()
  })

  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    observer.observe(mainContent)
  }
})


</script>

<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }">
    <LayoutHeader />
    <LayoutMenu />

    <div id="main" class="z-10 absolute top-0 w-full overflow-clip" style="backface-visibility: hidden;">
      <div id="main-content">
        <slot />
      </div>
    </div>
  </VueLenis>
</template>

<style scoped>
#main {
  scrollbar-gutter: stable;
  transform-origin: center top;
  transform: translateZ(0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>