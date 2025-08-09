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
</script>

<template>
  <section class="h-screen flex flex-col justify-end w-full relative">
    <div class="absolute top-0 w-full h-full">
      <PrismicImage :field="slice.primary.image_mobile" class="object-cover w-full h-full block md:hidden" />
      <PrismicImage :field="slice.primary.image_desktop" class="object-cover w-full h-full hidden md:block" />
    </div>
    <div class="flex flex-col z-10 items-center justify-center w-full h-full">
      <h1 class="font-title font-light text-3xl leading-(--leading-title)">
        {{ projectName }}</h1>
    </div>
  </section>
</template>
