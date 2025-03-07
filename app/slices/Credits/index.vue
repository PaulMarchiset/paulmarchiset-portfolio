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
const softwareTitle = props.slice.primary.softwareTechno_title;
console.log(softwareTitle);
const softwares = props.slice.primary.softwares?.map((software) => software.software);
const skills = props.slice.primary.skills?.map((skill) => skill.skill);

const misc = {
  title: props.slice.primary.misc?.[0]?.title,
  content: props.slice.primary.misc?.[0]?.content[0]?.type === 'paragraph' ? props.slice.primary.misc?.[0]?.content[0]?.text : '',
};

const linkTitle = props.slice.primary.link?.[0]?.title;

const link = props.slice.primary.link?.[0]?.link.text;

</script>

<template>
  <section class="px-(--spacing-project-mobile) lg:px-(--spacing-project) w-full flex flex-col gap-5 lg:gap-10  text-xl font-mono font-light capitalize">
    <div class="flex flex-col lg:grid grid-cols-4 gap-5">
      <div>
        <h3 class="font-bold w-fit">Client</h3>
        <p class="hover:italic w-fit">{{ client }}</p>
      </div>
      <div>
        <h3 class="font-bold w-fit">Year</h3>
        <p class="hover:italic w-fit">{{ year }}</p>
      </div>
      <div v-if="misc.title">
        <h3 class="font-bold w-fit">{{ misc.title }}</h3>
        <p class="hover:italic w-fit">{{ misc.content }}</p>
      </div>
    </div>
    
    <div class="flex flex-col lg:grid grid-cols-4 gap-5">
      <div>
        <h3 class="font-bold w-fit">Role</h3>
        <p class="hover:italic w-fit">{{ role }}</p>
      </div>
    <div>
    <h3 class="font-bold w-fit">{{ softwareTitle }}</h3>
    <ul>
      <li v-for="software in softwares" class="hover:italic w-fit">{{ software }}</li>
    </ul>
    </div>
    <div>
      <h3 class="font-bold w-fit">Skills</h3>
      <ul>
        <li v-for="skill in skills" class="hover:italic w-fit">{{ skill }}</li>
      </ul>
    </div>
    <div>
      <h3 class="font-bold w-fit">{{ linkTitle }}</h3>
      <NuxtLink :to="link" class="hover-underline-animation w-fit">click here!</NuxtLink>
    </div>
    </div>
  </section>
</template>
