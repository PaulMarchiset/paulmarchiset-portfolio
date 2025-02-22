<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.BigImageSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <PrismicImage v-if="slice.variation === 'default'" :field="slice.primary.imgbig" class=" lg:px-(--spacing-project) w-full lg:h-auto lg:aspect-(--bigImageRatio) object-cover"/>
  <PrismicEmbed v-else :field="slice.primary.video" class="aspect-video object-cover w-full lg:px-12"/>
</template>

<style>
iframe {
  width: 100%;
  height: 100%;
}
</style>