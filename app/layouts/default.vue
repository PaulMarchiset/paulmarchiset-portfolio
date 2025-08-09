<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { watch } from 'vue'
import gsap from 'gsap'

const menuStore = useMenuStore()

watch(() => menuStore.isOpen, (newVal) => {
    const main = document.getElementById('main')
    const mainContent = document.getElementById('main-content')
    const offset = window.scrollY || window.pageYOffset
    const windowHeight = window.innerHeight

    console.log(offset)
    if (newVal) {
        gsap.to(main, {
            scale: 0.9,
            translateY: offset + 0.75 * windowHeight + 'px',
            borderRadius: "1rem",
            duration: 0.5,
            ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
        })
        gsap.to(mainContent, {
            translateY: -offset,
            duration: 0.25,
            ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
        })
    } else {
        gsap.to(main, {
            scale: 1,
            translateY: 0,
            borderRadius: "0",
            duration: 0.5,
            ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
        })
        gsap.to(mainContent, {
            translateY: 0,
            duration: 0.55,
            ease: "cubic-bezier(0.83, 0, 0.29, 0.99)"
        })
    }
})
</script>


<template>
    <div>
        <LayoutHeader />
        <LayoutMenu />
        <div id="main" class="z-10 absolute top-0 w-full overflow-clip">
            <div id="main-content">
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