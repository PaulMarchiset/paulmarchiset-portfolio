<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const route = useRoute()
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('project', route.params.uid as string)
)

const title = page.value?.data.name

useHead({
  title: title + ' - Paul Marchiset',
})

console.log(page)


const projectName = page.value?.data.name;
const projectDate = page.value?.data.date;
const projectCategories = page.value?.data.categories?.map(cat => cat.category) || ['Project'];


</script>

<template>
  <section class="bg-(--main-white) text-black z-10">
    <header class="flex flex-col pt-[60vh] gap-12">
      <div class="flex flex-col px-8 lg:px-24">
        <h1
          class="font-title uppercase text-balance font-stretch-condensed font-semibold text-7xl lg:text-9xl leading-(--leading-title)">
          {{ projectName }}</h1>
        <div class="flex gap-24">
          <p class="text-lg font-sans font-light">©{{ projectDate }}</p>
          <ul class="flex flex-col">
            <li class="text-lg font-sans font-light" v-for="category in projectCategories"
              :key="category || 'default-category'">{{ category }}</li>
          </ul>
        </div>
      </div>
      <PrismicImage :field="page?.data.image_main" class="w-full h-full object-cover object-center" />
    </header>
    <div class="flex flex-col gap-32 py-32">
      <SliceZone :slices="page?.data.slices ?? []" :components="components" class="flex flex-col gap-32 " />
      <div class="flex flex-col md:flex-row gap-6 md:gap-auto px-8 lg:px-16 justify-between items-start md:items-center">
        <h3 class="text-5xl lg:text-8xl font-medium">{{ projectName }}</h3>
        <PrismicLink v-if="page?.data.view_more.link_type != 'Any'" :field="page?.data.view_more" class="text-xl leading-none font-light rounded-full border text-black px-5 py-3 h-fit flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300" />
      </div>
    </div>
  </section>
  <LayoutFooter />
</template>
