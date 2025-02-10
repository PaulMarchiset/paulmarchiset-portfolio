<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

import gsap from 'gsap';


</script>

<template>
    <nav id="menu" class="menu fixed top-0 left-0 h-screen w-screen bg-(--main-white) flex flex-col justify-center gap-12 px-24 uppercase z-20 font-title text-9xl font-light"
            v-if="menuStore.isOpen">
            <NuxtLink to="/" class=" w-fit" @click="menuStore.isOpen = false">home</NuxtLink>
            <NuxtLink to="/about" class="w-fit" @click="menuStore.isOpen = false">about</NuxtLink>
            <NuxtLink to="/contact" class=" w-fit" @click="menuStore.isOpen = false">contact</NuxtLink>
        </nav>
</template>