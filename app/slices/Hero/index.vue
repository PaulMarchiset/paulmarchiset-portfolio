<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.HeroSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const projectName = props.slice.primary.name;
const projectCategory = props.slice.primary.category;
</script>

<template>
  <header class="h-screen flex flex-col justify-end pb-32 lg:pb-24 w-full relative">
    <div class="hero-image absolute top-0 w-full h-full">
      <PrismicImage :field="slice.primary.imghero" class="object-cover w-full h-full" />
    </div>
    <div class="flex flex-col uppercase z-10 text-white pl-[10vw] w-fit">
      <h1 class="font-title font-semibold font-stretch-condensed text-7xl lg:text-9xl w-min leading-(--leading-title)">{{
        projectName }}</h1>
      <h4 class="font-mono font-light text-2xl w-fit">{{ projectCategory }}</h4>
    </div>
  </header>
</template>

<style scoped>
.hero-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--linear-black);
}
</style>
