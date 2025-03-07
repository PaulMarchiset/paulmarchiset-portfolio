<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.WorksSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

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

const currentImage = ref('');

</script>

<template>
  <nav
    class="mr-8 row-start-3 row-span-5 col-span-3 col-end-8 flex flex-col uppercase justify-evenly font-title items-end text-5xl z-10 text-whitezero text-white leading-[88%]">
    
    <NuxtLink 
      v-for="item in slice.primary.works" 
      :key="item.name" 
      :to="`/${item.name.toLowerCase()}`" 
      :id="item.name"
      :class="`${item.name.toLowerCase()}-text`"
      @mouseover="currentImage = item.image"
      @mouseleave="currentImage = ''"
      class="opacity-50 hover:opacity-100 transition-opacity duration-250 ease-in-out"
    >
      {{ item.name }}
    </NuxtLink>
  </nav>

  <div class="col-start-2 col-end-8 row-start-2 row-end-9 bg-cover bg-center">
    <PrismicImage :field="currentImage" class="h-full w-full object-cover" />
  </div>
</template>
