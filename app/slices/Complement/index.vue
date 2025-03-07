<script setup lang="ts">
import type { Content } from "@prismicio/client";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.ComplementSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const projectAbout = props.slice.primary.about;


</script>

<template>
  <section
    class="flex flex-col lg:grid grid-cols-4 gap-10 lg:gap-5 px-(--spacing-project-mobile) lg:px-(--spacing-project) scrollingAnimation">
    <div class="flex flex-col gap-16 col-start-1 col-span-2">
      <div class="flex items-center justify-center">
        <p class="max-w-[45ch] text-xl" style="white-space: pre-wrap;">{{ projectAbout }}</p>
      </div>
      <PrismicImage :field="props.slice.primary.img_1" class="w-full" />
    </div>
    <PrismicImage :field="props.slice.primary.img_2"
      class="col-start-3 col-span-2 sticky top-12 aspect-video object-cover" />
  </section>
</template>