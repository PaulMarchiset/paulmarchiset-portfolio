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
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" class="container font-mono font-regular text-xl uppercase">

    <p class="z-10 h-fit self-end justify-self-start row-start-5 col-start-1 col-span-2">course aondh</p>
    <p class="z-10 h-fit self-end justify-self-start row-start-5 col-start-4 col-span-2">aftermovie</p>
    <p class="z-10 h-fit self-end justify-self-start row-start-5 col-start-7">2023</p>

    <NuxtLink class="z-10 h-fit self-end row-start-5 col-start-8 col-span-2 text-right hover-underline-animation justify-self-end">
      discover
    </NuxtLink>

    <NuxtLink class="row-start-3 row-span-5 col-start-3 col-span-4 bg-amber-200"></NuxtLink>
  </section>
</template>


<style scoped>
</style>