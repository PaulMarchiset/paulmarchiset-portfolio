<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { watch, ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'

const menuStore = useMenuStore()

import { openHeaderAnimation, closeHeaderAnimation } from '@/animations/menuAnimation'


watch(() => menuStore.isOpen, (isOpen) => {
  if (process.server) return

  if (isOpen) {
    openHeaderAnimation({
      yOffset: window.scrollY,
      borderRadius: 20,
      duration: 0.8
    })
  } else {
    closeHeaderAnimation({
      yOffset: window.scrollY,
      duration: 0.8
    })
  }
})
</script>

<template>
    <div>
        <LayoutHeader />
        <LayoutMenu />

        <!-- Page container -->
        <div 
            id="main" 
            ref="main" 
            class="z-10 absolute top-0 w-full overflow-clip"
            style="backface-visibility: hidden;"
        >
            <div id="main-content" ref="mainContent">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<style scoped>
#main {
    scrollbar-gutter: stable;
    transform-origin: center top;
}

#main {
    transform: translateZ(0);
}
</style>