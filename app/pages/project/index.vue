<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: page } = await useAsyncData('projects', () =>
  prismic.client.getAllByType('project')
)

const projects = ref(page.value)


useHead({
  title: 'projects',
})

console.log(projects)


</script>

<template>
  <section class="flex flex-col relative top-[30vh] lg:top-0">
    <article v-for="project in projects" :key="project.uid"
        class="container font-mono font-regular text-xl uppercase text-white">

      <p class="z-10 h-fit lg:self-end justify-self-start lg:row-start-5 col-start-1 col-span-4 row-start-2 lg:col-span-2 font-bold lg:font-normal">{{
        project.data.name }}</p>
      <p class="hidden lg:block z-10 h-fit self-end justify-self-start row-start-5 col-start-4 col-span-2">{{
        project.data.category }}</p>
      <p class="z-10 h-fit lg:self-end justify-self-start lg:justify-self-center col-start-5 row-start-2 lg:row-start-5 lg:col-start-7">{{ project.data.year }}</p>

      <NuxtLink :to="`project/${project.uid}`"
        class="hidden lg:inline-block z-10 h-fit self-end row-start-5 col-start-7 col-span-2 text-right hover-underline-animation justify-self-end">
        discover
      </NuxtLink>

      <NuxtLink :to="`project/${project.uid}`"
        class="col-start-1 col-span-5 row-start-1 lg:row-start-2 lg:row-span-7 lg:col-start-3 lg:col-span-4 bg-amber-200 object-cover aspect-[3/2] lg:aspect-auto">
        <PrismicImage :field="project.data.image_presentation" class="h-full w-full object-cover" />
      </NuxtLink>
    </article>
  </section>
</template>

<style scoped>
.hover-underline-animation::after {
  height: 0.5px;
  background-color: white;
}
</style>