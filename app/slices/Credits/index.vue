<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.CreditsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);


const client = props.slice.primary.client?.[0]?.content;
const year = props.slice.primary.year?.[0]?.year;
const role = props.slice.primary.role?.[0]?.role;
const softwares = props.slice.primary.softwares?.map((software) => software.software);
const skills = props.slice.primary.skills?.map((skill) => skill.skill);

const linkTitle = props.slice.primary.link?.[0]?.title;

const link = props.slice.primary.link?.[0]?.link.text;

</script>

<template>
  <section class="px-(--spacing-project-mobile) lg:px-(--spacing-project) my-16 w-full flex flex-col gap-5 lg:gap-10  text-xl font-mono font-light capitalize">
    <div class="flex flex-col lg:grid grid-cols-4 gap-5">
      <div>
        <h3 class="font-bold">Client</h3>
        <p class="hover:italic">{{ client }}</p>
      </div>
      <div>
        <h3 class="font-bold">Year</h3>
        <p class="hover:italic">{{ year }}</p>
      </div>
    </div>
    
    <div class="flex flex-col lg:grid grid-cols-4 gap-5">
      <div>
        <h3 class="font-bold">Role</h3>
        <p class="hover:italic">{{ role }}</p>
      </div>
    <div>
    <h3 class="font-bold">Softwares</h3>
    <ul>
      <li v-for="software in softwares" class="hover:italic">{{ software }}</li>
    </ul>
    </div>
    <div>
      <h3 class="font-bold">Skills</h3>
      <ul>
        <li v-for="skill in skills" class="hover:italic">{{ skill }}</li>
      </ul>
    </div>
    <div>
      <h3 class="font-bold">{{ linkTitle }}</h3>
      <NuxtLink :to="link" class="hover-underline-animation">click here!</NuxtLink>
    </div>
    </div>
  </section>
</template>
