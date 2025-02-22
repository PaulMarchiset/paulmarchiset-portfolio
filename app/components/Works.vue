<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
    const animateText = (selector: string, delay: number) => {
        const textWrapper = document.querySelector(selector);
        if (textWrapper) {
            textWrapper.innerHTML = textWrapper.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
            
            gsap.fromTo(
                `${selector} .letter`,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", delay: delay / 1000 }
            );
        }
    };

    animateText(".design-text", 400);
    animateText(".web-text", 500);
    animateText(".video-text", 600);
    animateText(".photo-text", 700);
});
</script>

<template>
     <nav class="mr-4 opacity-50 row-start-3 row-span-5 col-span-3 col-end-8 flex flex-col uppercase justify-evenly font-title items-end text-5xl z-10 text-whitezero text-white leading-[88%]">
       <NuxtLink to="design" id="design" class="design-text">Design</NuxtLink>
       <NuxtLink to="web" id="web" class="web-text">web</NuxtLink>
       <NuxtLink to="video" id="video" class="video-text">video</NuxtLink>
       <NuxtLink to="photo" id="photo" class="photo-text">photo</NuxtLink>
      </nav>
</template>
