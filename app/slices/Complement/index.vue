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



onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);


    const scrollingImage = document.querySelector('.scrollingImage');
    const scrollingAnimation = document.querySelector('.scrollingAnimation');
    let bottomHeight = (scrollingAnimation ? scrollingAnimation.getBoundingClientRect().bottom : 0) - (scrollingImage ? scrollingImage.getBoundingClientRect().bottom : 0);
   console.log(bottomHeight);

   bottomHeight = bottomHeight - (bottomHeight % 5);

  ScrollTrigger.create ({
    trigger: ".scrollingImage",
    pin: true,
    start: "top 15%",
    end: `+=${bottomHeight}`,
    markers: true,
    scrub: 1,
  });
  
  console.log(bottomHeight);



});

</script>

<template>
  <section class="grid grid-cols-4 gap-5 px-(--spacing-project) mt-16 scrollingAnimation">
    <div class="col-start-1 col-span-2">
      <div class="py-24 flex items-center justify-center">
        <p class="max-w-[45ch]" style="white-space: pre-wrap;">{{ projectAbout }}</p>
      </div>
      <PrismicImage :field="props.slice.primary.img_1" class="w-full" />
    </div>
    <PrismicImage :field="props.slice.primary.img_2" class="col-start-3 col-span-2 scrollingImage" />
  </section>
</template>