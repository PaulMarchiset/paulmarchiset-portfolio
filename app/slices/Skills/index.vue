<!-- <script setup lang="ts">

import type { Content } from "@prismicio/client"

const props = defineProps(getSliceComponentProps<Content.SkillsSlice>([
  "slice",
  "index",
  "slices",
  "context",
]));

const abilities = ref([...props.slice.primary.abilities]);
const technologies = ref([...props.slice.primary.technologies]);
const softwares = ref([...props.slice.primary.softwares]);

const trackAbility = ref<HTMLElement | null>(null);
const trackTech = ref<HTMLElement | null>(null);
const trackSoftware = ref<HTMLElement | null>(null);

// independent offsets
const offsetAbility = ref(0);
const offsetTech = ref(0);
const offsetSoftware = ref(0);

// animation frame IDs
let frameAbility = 0;
let frameTech = 0;
let frameSoftware = 0;

const speed = 0.5; // px per frame

function animate(listRef = ref([]), trackRef = ref(null), offsetRef = ref(0), frameRefName = ref(0), way = 1) {
  offsetRef.value -= speed * way;

  const firstEl = trackRef.value?.children[0] as HTMLElement | undefined;
  if (firstEl) {
    const firstWidth = (firstEl.offsetWidth + 16); // add gap
    if (Math.abs(offsetRef.value) >= firstWidth) {
      // recycle first element
      listRef.value.push(listRef.value.shift());
      offsetRef.value += firstWidth * way;
    }
  }

  // continue loop
  switch (frameRefName) {
    case "ability":
      frameAbility = requestAnimationFrame(() =>
        animate(abilities, trackAbility, offsetAbility, "ability")
      );
      break;
    case "tech":
      frameTech = requestAnimationFrame(() =>
        animate(technologies, trackTech, offsetTech, "tech", -1)
      );
      break;
    case "software":
      frameSoftware = requestAnimationFrame(() =>
        animate(softwares, trackSoftware, offsetSoftware, "software")
      );
      break;
  }
}

onMounted(() => {
  frameAbility = requestAnimationFrame(() =>
    animate(abilities, trackAbility, offsetAbility, "ability")
  );
  frameTech = requestAnimationFrame(() =>
    animate(technologies, trackTech, offsetTech, "tech")
  );
  frameSoftware = requestAnimationFrame(() =>
    animate(softwares, trackSoftware, offsetSoftware, "software")
  );
});

onUnmounted(() => {
  cancelAnimationFrame(frameAbility);
  cancelAnimationFrame(frameTech);
  cancelAnimationFrame(frameSoftware);
});
</script>

<template>
  <section class="flex flex-col gap-8 items-center">
    <div class="overflow-hidden w-full ">
      <ul ref="trackAbility" class="flex gap-4 whitespace-nowrap  align-center"
        :style="{ transform: `translateX(${offsetAbility}px)` }">
        <li v-for="ability in abilities" :key="ability.id"
          class="px-6 py-2 border border-black capitalize font-sans rounded-full w-fit">
          {{ ability.name }}
        </li>
      </ul>
    </div>

    <div class="overflow-hidden w-full">
      <ul ref="trackTech" class="flex gap-4 whitespace-nowrap align-center"
        :style="{ transform: `translateX(${offsetTech}px)` }">
        <li v-for="technology in technologies" :key="technology.id"
          class="px-6 py-2 border border-black capitalize font-sans rounded-full w-fit">
          {{ technology.name }}
        </li>
      </ul>
    </div>

    <div class="overflow-hidden w-full">
      <ul ref="trackSoftware" class="flex gap-4 whitespace-nowrap align-center"
        :style="{ transform: `translateX(${offsetSoftware}px)` }">
        <li v-for="software in softwares" :key="software.id"
          class="px-6 py-2 border border-black capitalize font-sans rounded-full w-fit">
          {{ software.name }}
        </li>
      </ul>
    </div>
    
  </section>
</template> -->

<script setup lang="ts">

import type { Content } from "@prismicio/client"
const props = defineProps(getSliceComponentProps<Content.SkillsSlice>([
  "slice",
  "index",
  "slices",
  "context",
]));

</script>
<template>
  <!-- <section class="flex flex-col gap-12">
    <div class="grid grid-cols-2 gap-6 justify-center">
      <h3 class="col-start-1 row-start-1 w-full font-serif text-5xl mb-2 text-right">Soft Skills</h3>
      <ul class="col-start row-start-1 flex flex-col w-fit">
        <li v-for="ability in props.slice.primary.abilities" :key="ability.id"
          class="capitalize font-light font-sans w-fit text-xl">{{ ability.name }}</li>
      </ul>
    </div>
    <div class="grid grid-cols-2 gap-6 justify-center">
      <h3 class="col-start-1 row-start-1 w-full font-serif text-5xl mb-2 text-right">Technologies</h3>
      <ul class="col-start row-start-1 flex flex-col w-fit">
        <li v-for="technology in props.slice.primary.technologies" :key="technology.id"
          class="capitalize font-light font-sans w-fit text-xl">{{ technology.name }}</li>
      </ul>
    </div>
    <div class="grid grid-cols-2 gap-6 justify-center">
      <h3 class="col-start-1 row-start-1 w-full font-serif text-5xl mb-2 text-right">Softwares</h3>
      <ul class="col-start row-start-1 flex flex-col w-fit">
        <li v-for="software in props.slice.primary.softwares" :key="software.id"
          class="capitalize font-light font-sans w-fit text-xl">{{ software.name }}</li>
      </ul>
    </div>
  </section> -->
</template>

<style scoped>
.swiper-slide {
  width: auto;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-inline: 10vw;
}

.mySwiper {
  display: flex !important;
  flex-direction: column;
  gap: 1rem;
}
</style>