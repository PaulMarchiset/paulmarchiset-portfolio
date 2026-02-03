<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.AboutSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const about = props.slice.primary.about || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

</script>

<template>
  <div class="px-8 lg:ml-24 lg:px-0 lg:w-3xl">
     <span class="text-[10px] tracking-[0.4em] uppercase opacity-40 block mb-4">#ABOUT</span>
      <p class="font-medium text-xl lg:text-2xl" style="white-space: pre-wrap;">{{ about }}</p>
    </div>
</template>
