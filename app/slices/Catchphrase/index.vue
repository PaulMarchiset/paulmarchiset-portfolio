<script setup lang="ts">
import type { Content } from "@prismicio/client";


const props = defineProps(
  getSliceComponentProps<Content.CatchphraseSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);


const catchphrase = props.slice.primary.catchphrase || "This is kind of a project";

</script>

<template>
  <div class="h-[50vh] lg:h-[75vh] flex items-center justify-center px-12 lg:px-20">
      <h2 class="font-serif text-4xl lg:text-6xl">{{ catchphrase }}</h2>
    </div>
</template>
