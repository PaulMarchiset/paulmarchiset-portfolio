<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.ContactWhiteSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <footer
    v-if="slice.variation == 'default'"
    class="relative bottom-0 w-full flex items-center justify-center bg-(--main-white) text-black pt-64">
    <NuxtLink to="/contact" class="text-[28vw] leading-[0.4] capitalize">Contact</NuxtLink>
  </footer>
  <footer
    v-if="slice.variation == 'black'"
    class="relative bottom-0 w-full flex items-center justify-center bg-black text-white pt-64">
      <NuxtLink to="/contact" class="text-[28vw] leading-[0.4] capitalize">Contact</NuxtLink>
    </footer>
</template>
