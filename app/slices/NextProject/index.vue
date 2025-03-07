<script setup lang="ts">
import type { Content } from "@prismicio/client";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.NextProjectSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

//@ts-ignore
const nextProject =  props.slice.primary.nextproject.uid;
console.log(nextProject);
const router = useRouter();

// gsap.registerPlugin(ScrollTrigger);

// onMounted(() => {
//   ScrollTrigger.create({
//     trigger: ".test",
//     start: "top 50%",
//     endTrigger: "bottom bottom",
//     end: "bottom 50%",
//     onEnter: () => router.push({ path: nextProject }),
//     markers: true,
//   });
// });

</script>

<template>
  <NuxtLink :to=nextProject class="text-4xl font-mono font-light w-3xl py-84 test">Next Project</NuxtLink>
</template>
