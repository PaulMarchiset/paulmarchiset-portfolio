<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { ref, onMounted } from "vue";

defineProps(
  getSliceComponentProps<Content.NameSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 1024;
});
</script>

<template>
  <section class="index-container">
    <Name class="z-10" />
    <section class="row-start-1 row-span-full col-start-1 col-span-full relative h-screen w-full">
      <div class="absolute top-0 h-full w-full">
        <PrismicImage :field="isMobile ? slice.primary.image_mobile : slice.primary.image_desktop" class="hero-image" />
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