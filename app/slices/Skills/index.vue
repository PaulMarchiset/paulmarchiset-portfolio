<script setup lang="ts">
import type { Content } from "@prismicio/client";
const props = defineProps(getSliceComponentProps<Content.SkillsSlice>(["slice", "index", "slices", "context"]));
</script>
<template>
  <section class="flex flex-col lg:grid grid-cols-2 gap-16 px-8 lg:px-12">
    
    <div class="flex flex-col gap-12 justify-center">
      <div class="flex flex-col items-start lg:flex-row justify-between w-full">
        <h3 class="w-fit font-sans text-xl font-light">Technologies:</h3>
        <ul class="flex flex-wrap gap-x-2 opacity-75 lg:w-1/2">
          <li v-for="(technology, i) in props.slice.primary.technologies" :key="technology.id" class="capitalize font-light font-sans text-xl">
            {{ technology.name }}<span v-if="i < props.slice.primary.technologies.length - 1">,</span>
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-start lg:flex-row justify-between w-full">
        <h3 class="w-fit font-sans text-xl font-light">Softwares:</h3>
        <ul class="flex flex-wrap gap-x-2 opacity-75 lg:w-1/2">
          <li v-for="(software, i) in props.slice.primary.softwares" :key="software.id" class="capitalize font-light font-sans text-xl">
            {{ software.name }}<span v-if="i < props.slice.primary.softwares.length - 1">,</span>
          </li>
        </ul>
      </div>
      <div class="flex flex-col items-start lg:flex-row justify-between w-full">
        <h3 class="w-fit font-sans text-xl font-light">Soft Skills:</h3>
        <ul class="flex flex-wrap gap-x-2 opacity-75 lg:w-1/2">
          <li v-for="(ability, i) in props.slice.primary.abilities" :key="ability.id" class="capitalize font-light font-sans text-xl">
            {{ ability.name }}<span v-if="i < props.slice.primary.abilities.length - 1">,</span>
          </li>
        </ul>
      </div>
      
    </div>
    <PrismicImage :field="props.slice.primary.image" class="w-full h-full object-cover object-center" />
  </section>
</template>
