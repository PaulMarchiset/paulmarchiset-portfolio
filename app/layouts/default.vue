<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { watch } from 'vue'
import gsap from 'gsap'

const menuStore = useMenuStore()

// -----------------------------------------
// ----- OLD VERSION OF WATCH FUNCTION -----
// -----------------------------------------

// watch(() => menuStore.isOpen, (newVal) => {
//     const main = document.getElementById('main')
//     const mainContent = document.getElementById('main-content')
//     const offset = window.scrollY || window.pageYOffset
//     const windowHeight = window.innerHeight

//     console.log(offset)
//     if (newVal) {
//         gsap.to(main, {
//             scale: 0.9,
//             translateY: offset + 0.75 * windowHeight + 'px',
//             borderRadius: "1rem",
//             duration: 0.5,
//             ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
//         })
//         gsap.to(mainContent, {
//             translateY: -offset,
//             duration: 0.25,
//             ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
//         })
//     } else {
//         gsap.to(main, {
//             scale: 1,
//             translateY: 0,
//             borderRadius: "0",
//             duration: 0.5,
//             ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
//         })
//         gsap.to(mainContent, {
//             translateY: 0,
//             duration: 0.55,
//             ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
//         })
//     }
// })

const main = ref<HTMLElement | null>(null)
const mainContent = ref<HTMLElement | null>(null)
let tl: gsap.core.Timeline | null = null


const EASE = "cubic-bezier(0.83, 0, 0.29, 0.99)"
const DURATION = 0.5

watch(() => menuStore.isOpen, (isOpen) => {
  if (!main.value || !mainContent.value) return

  const offset = window.scrollY || window.pageYOffset
  const vh = window.innerHeight

  tl?.kill()
  tl = gsap.timeline({ defaults: { ease: EASE }, overwrite: 'auto' })

  if (isOpen) {
    tl.set(main.value, { transformOrigin: "50% 0%" }) // pivot from top
      .to(main.value, {
        scale: 0.9,
        y: offset + 0.9 * vh,
        borderRadius: "1rem",
        duration: DURATION
      }, 0) // start together
      .to(mainContent.value, {
        y: -offset,
        duration: DURATION
      }, 0)
  } else {
    tl.to(main.value, {
        scale: 1,
        y: 0,
        borderRadius: "0",
        duration: DURATION
      }, 0)
      .to(mainContent.value, {
        y: 0,
        duration: DURATION
      }, 0)
  }
}, { immediate: true })

// onBeforeUnmount(() => tl?.kill())
</script>


<template>
    <div>
        <LayoutHeader />
        <LayoutMenu />
        <div id="main" ref="main" class="z-10 absolute top-0 w-full overflow-clip">
            <div id="main-content" ref="mainContent">
                <slot />
            </div>
        </div>
    </div>
</template>


<style>
#main {
    scrollbar-gutter: stable;
}
</style>



