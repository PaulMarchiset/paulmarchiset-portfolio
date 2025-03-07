<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.VideoSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);


</script>

<template>
  <div class="grid lg:grid-cols-12 gap-5 w-full px-(--spacing-project-mobile) lg:px-12">
    <video v-if="props.slice.variation === 'default'" muted autoplay loop
      class="w-full lg:h-auto  object-cover lg:col-start-2 lg:col-span-10">
      <source :src="props.slice.primary.video.url" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <PrismicEmbed v-if="props.slice.variation === 'youtube'" :field="slice.primary.link"
      class="aspect-video object-cover w-full lg:col-start-2 lg:col-span-10" />
  </div>
</template>

<style>
iframe {
  width: 100%;
  height: 100%;
}
</style>