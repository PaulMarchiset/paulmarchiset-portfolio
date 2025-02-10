<script setup lang="ts">
import type { Content } from "@prismicio/client";
// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.


const props = defineProps(
  getSliceComponentProps<Content.CatchphraseSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const catchphrase = props.slice.primary.catchphrase;

console.log(catchphrase);

</script>

<template>
  <h3 class="text-4xl font-mono font-light w-3xl py-80">{{ catchphrase }}</h3>
</template>
