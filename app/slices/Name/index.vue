<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.NameSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section class="index-container">
    <Name class="hidden lg:flex" />
    <section class="block lg:hidden relative h-screen w-full">
      <Name class="absolute top-[60vh] lg:relative flex lg:hidden z-10" />
      <div class="hero-image absolute top-0 h-full w-full">
        <PrismicImage :field="slice.primary.image" class="object-cover w-full h-full"/>
      </div>
    </section>
  </section>
</template>
