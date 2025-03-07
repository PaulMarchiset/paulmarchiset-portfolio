<script setup lang="ts">
import type { Static } from 'vue'
import { components } from '~/slices'

const prismic = usePrismic()
const route = useRoute()
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('video', route.params.uid as string)
)

const title = page.value?.data.meta_title

useHead({
  title: title
})

console.log(page)


const projectName = page.value?.data.name;
const projectCategory = page.value?.data.category;
const projectImage = page.value?.data.image_presentation.url ?? '';


</script>

<template>
  <header class="h-screen flex flex-col justify-end pb-32 lg:pb-24 w-full relative">
    <div class="hero-image absolute top-0 w-full h-full">
       <img :src="projectImage" alt="" class="object-cover w-full h-full">
    </div>
    <div class="flex flex-col uppercase z-10 text-white pl-[10vw] w-fit">
      <h1 class="font-title font-semibold font-stretch-condensed text-7xl lg:text-9xl w-min leading-(--leading-title)">
        {{
          projectName }}</h1>
      <h4 class="font-mono font-light text-2xl w-fit">{{ projectCategory }}</h4>
    </div>
  </header>
  
  <SliceZone
  wrapper="main"
  :slices="page?.data.slices ?? []"
  :components="components" class="bg-(--main-white) project-container py-48"
  />
</template>

<style scoped>
.hero-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--linear-black);
}
</style>
