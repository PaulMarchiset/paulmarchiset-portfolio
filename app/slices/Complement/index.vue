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
if (props.slice.variation === 'video') {
  const projectVideo = props.slice.primary.video.url
  console.log(projectVideo)
}

</script>

<template>
  <section
    class="flex flex-col lg:grid grid-cols-4 gap-10 lg:gap-5 px-(--spacing-project-mobile) lg:px-(--spacing-project) mt-16 scrollingAnimation">
    <div class="flex flex-col gap-16 lg:block col-start-1 col-span-2">
      <div class="lg:py-24 flex items-center justify-center">
        <p class="max-w-[45ch]" style="white-space: pre-wrap;">{{ projectAbout }}</p>
      </div>
      <PrismicImage :field="props.slice.primary.img_1" class="w-full" />
    </div>
    <PrismicImage v-if="props.slice.variation === 'default'" :field="props.slice.primary.img_2"
      class="col-start-3 col-span-2 sticky top-12" />
    <video v-if="props.slice.variation === 'video'" muted autoplay loop>
      <source :src="props.slice.primary.video.url" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>
</template>