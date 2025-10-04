<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";

// Refs for each text
const paulRef = ref<HTMLElement | null>(null);
const marchisetRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  // Animate "Paul"
  tl.fromTo(paulRef.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });

  // Animate "Marchiset"
  tl.fromTo(
    marchisetRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    "-=0.3"
    // small pause after "Paul"
  );

  // Animate tagline "Creative engineer student"
  tl.fromTo(
    taglineRef.value,
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 1 },
    "+=0.25" // start after "Marchiset"
  );
});
</script>

<template>
  <div class="w-full m-auto row-start-7 row-span-2 lg:row-span-3 col-start-2 col-span-3 lg:col-start-6 lg:row-start-4 flex flex-col justify-center relative text-white z-10">
    <div class="w-fit text-7xl font-title uppercase font-stretch-condensed font-semibold leading-[88%]">
      <h1 ref="paulRef" class="w-fit opacity-0">Paul</h1>
      <h1 ref="marchisetRef" class="w-fit opacity-0">Marchiset</h1>
    </div>
    <h2 ref="taglineRef" class="font-sans font-light text-xl w-max md:w-fit opacity-0">
      Creative engineer student
    </h2>
  </div>
</template>
