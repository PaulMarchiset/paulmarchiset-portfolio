<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.WorksSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

</script>

<template>
  <div class="flex flex-col lg:grid grid-cols-2 gap-4 px-4" v-if="props.slice.variation === 'default'">
    <PrismicImage :field="props.slice.primary.image_vertical" class=" rounded w-full col-start-1" />
    <PrismicImage :field="props.slice.primary.image_horizontal"
      class="col-start-2 sticky top-32 aspect-video object-cover rounded" />
  </div>
  <div class="flex flex-col lg:grid grid-cols-2 gap-4 px-4" v-if="props.slice.variation === 'videoSlide'">
    <PrismicImage :field="props.slice.primary.image_vertical" class=" rounded w-full col-start-1" />
    <video class="col-start-2 sticky top-32 aspect-video object-cover rounded" :src="props.slice.primary.video.url"
      autoplay muted loop playsinline></video>
  </div>
</template>
