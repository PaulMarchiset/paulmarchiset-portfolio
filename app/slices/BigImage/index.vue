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
  <PrismicImage :field="slice.primary.imgbig" class="lg:px-(--spacing-project) w-full lg:h-auto lg:aspect-(--bigImageRatio) object-cover"/>
</template>