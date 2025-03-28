<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.AllProjectsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const prismic = usePrismic()
const { data: page } = await useAsyncData('projects', () =>
  prismic.client.getAllByType('project')
)

const projects = ref(page.value)

</script>

<template>
  <section class="flex flex-col relative top-[30vh] lg:top-0 pb-48">
    <article v-for="project in projects" :key="project.uid"
      class="container font-mono font-regular uppercase text-white">

      <div class="col-start-2 row-start-2 col-span-3 flex flex-col lg:row-start-5 lg:col-start-1 lg:col-span-4 lg:grid grid-cols-4 lg:gap-5">
        <p
          class="text-xl z-10 h-fit lg:self-end justify-self-start col-span-2 ">
          {{
            project.data.name }}</p>
        <p
          class="text-l lg:text-xl  z-10 h-fit lg:self-end justify-self-start col-start-4">
          {{
            project.data.category }}</p>
      </div>
        <p
          class="text-l lg:text-xl  z-10 h-fit lg:self-end justify-self-start lg:justify-self-center col-start-1 row-start-2 lg:row-start-5 lg:col-start-7">
          {{ project.data.year }}</p>

      <NuxtLink :to="`project/${project.uid}`"
        class="hidden lg:inline-block z-10 h-fit text-xl  self-end row-start-5 col-start-7 col-span-2 text-right hover-underline-animation justify-self-end">
        discover
      </NuxtLink>

      <NuxtLink :to="`project/${project.uid}`"
        class="col-start-1 col-span-5 row-start-1 lg:row-start-2 lg:row-span-7 lg:col-start-3 lg:col-span-4 bg-amber-200 object-cover aspect-[3/2] lg:aspect-auto">
        <PrismicImage :field="project.data.image_presentation" class="h-full w-full object-cover" />
      </NuxtLink>

      <Arrow class="row-start-2 col-start-5 justify-self-end lg:hidden" />

    </article>
  </section>
</template>

<style scoped>
.hover-underline-animation::after {
  height: 0.5px;
  background-color: white;
}
</style>
