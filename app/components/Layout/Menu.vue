<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

import gsap from 'gsap';

</script>

<template>
    <nav id="menu"
        class="menu h-screen w-full bg-(--main-white) flex flex-col justify-center gap-12 px-12 lg:px-24 lg:py-12 pb-0 lg:pb-0 capitalize fixed top-0 z-0 font-serif text-7xl font-light">
        <NuxtLink to="/project" class=" w-fit" @click="menuStore.isOpen = false">works</NuxtLink>
        <NuxtLink to="/photo" class=" w-fit" @click="menuStore.isOpen = false">photos</NuxtLink>
        <NuxtLink to="/about" class="w-fit" @click="menuStore.isOpen = false">about</NuxtLink>
        <NuxtLink to="/contact" class=" w-fit" @click="menuStore.isOpen = false">contact</NuxtLink>
    </nav>
</template>