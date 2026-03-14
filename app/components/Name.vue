<script setup lang="ts">
import { onMounted, ref } from "vue";

// Refs for each text
const paulRef = ref<HTMLElement | null>(null);
const marchisetRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);

onMounted(() => {
  paulRef.value?.animate(
    [
      { opacity: 0, transform: "translateY(20px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 800,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
    }
  );

  marchisetRef.value?.animate(
    [
      { opacity: 0, transform: "translateY(20px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 800,
      delay: 500,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
    }
  );

  taglineRef.value?.animate(
    [
      { opacity: 0, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 1000,
      delay: 1300,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
    }
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
