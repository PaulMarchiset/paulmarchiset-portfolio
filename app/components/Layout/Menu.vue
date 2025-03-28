<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

import gsap from 'gsap';

let topValue = "0";

onMounted(() => {
    if (window.innerWidth < 1024) {
        topValue = "100%";
    }
    else {
        topValue = "-100%"; 
    }
    const menu = document.getElementById('menu');
    // Initial state handling
    if (menuStore.isOpen) {
        console.log('open');
        gsap.to(menu, { top: 0, duration: 0.5 });
    } else {
        console.log('close');
        gsap.to(menu, { top: topValue, duration: 0.5 });
    }
});

// Watch for changes in isOpen
watch(() => menuStore.isOpen, (newVal) => {
    const menu = document.getElementById('menu');
    if (newVal) {
        console.log('open');
        gsap.to(menu, {
            top: 0,
            duration: 0.4,
            ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
            stagger: 0.1
        });
    } else {
        console.log('close');
        gsap.to(menu, {
            top: topValue,
            duration: 0.4,
            ease: "cubic-bezier(0.83, 0, 0.29, 0.99)",
            stagger: 0.1
        });
    }
});
</script>

<template>
    <nav id="menu"
        class="menu h-screen w-screen bg-(--main-white) flex flex-col justify-center gap-12 px-12 lg:px-24 lg:py-12 pb-0 lg:pb-0 uppercase z-20 font-title text-7xl font-light">
        <NuxtLink to="/project" class=" w-fit" @click="menuStore.isOpen = false">works</NuxtLink>
        <NuxtLink to="/photo" class=" w-fit" @click="menuStore.isOpen = false">photos</NuxtLink>
        <NuxtLink to="/about" class="w-fit" @click="menuStore.isOpen = false">about</NuxtLink>
        <NuxtLink to="/contact" class=" w-fit" @click="menuStore.isOpen = false">contact</NuxtLink>
    </nav>
</template>

<style scoped>
.menu {
    position: fixed;
    top: 100%
}
</style>