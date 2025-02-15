<script setup lang="ts">
import type { Content } from "@prismicio/client";
import gsap from "gsap";
// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ProjectDisplaySlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);


</script>

<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" class="container font-mono font-regular text-l lg:text-xl uppercase">

    <p class="z-10 h-fit self-end justify-self-start row-start-5 col-start-1 col-span-2 font-bold lg:font-regular">course aondh</p>
    <p class="hidden z-10 h-fit self-end justify-self-start row-start-5 col-start-4 col-span-2 lg:block">aftermovie</p>
    <p class=" z-10 h-fit self-end justify-self-start row-start-5 col-start-7">2023</p>

    <NuxtLink class="hidden z-10 h-fit self-end row-start-5 col-start-8 col-span-2 text-right hover-underline-animation justify-self-end lg:block">
      discover
    </NuxtLink>
    <NuxtLink class="col-start-1 col-span-6 lg:row-start-3 lg:row-span-5 lg:col-start-3 lg:col-span-4 bg-amber-200"></NuxtLink>
  </section>
</template>

<style scoped>
.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: transform 0.25s cubic-bezier(.83, 0, .29, .99);
  transform-origin: left;
}
</style>