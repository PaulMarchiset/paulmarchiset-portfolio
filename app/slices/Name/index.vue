<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.NameSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section class="index-container">
    <Name class="z-10" />
    <section class="row-start-1 row-span-full col-start-1 col-span-full relative h-screen w-full">
      <div class="absolute top-0 h-full w-full">
        <picture>
          <source media="(min-width: 1024px)"
            :srcset="slice.primary.image_desktop.url + '?w=1600&auto=format,compress&q=70'" />

          <img :src="slice.primary.image_mobile.url + '?w=600&auto=format,compress'" :srcset="`
    ${slice.primary.image_mobile.url}?w=600&auto=format,compress 600w,
    ${slice.primary.image_mobile.url}?w=900&auto=format,compress 900w,
    ${slice.primary.image_mobile.url}?w=1200&auto=format,compress 1200w
  `" sizes="100vw" :alt="slice.primary.image_mobile.alt || ''" loading="eager" fetchpriority="high"
            class="hero-image" />
        </picture>
      </div>
    </section>
  </section>
</template>

<style scoped>
.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;

  animation: zoomIn 2s cubic-bezier(0.83, 0, 0.29, 0.99) forwards;
}

@keyframes zoomIn {
  0% {
    transform: scale(0);
    border-radius: 0rem;
  }

  40% {
    transform: scale(1);
    border-radius: 0rem;
  }

  50% {
    transform: scale(1);
    border-radius: 0rem;
  }

  70% {
    transform: scale(0.9);
    border-radius: 0rem;
  }

  100% {
    transform: scale(0.9);
    border-radius: 2rem;
  }
}
</style>