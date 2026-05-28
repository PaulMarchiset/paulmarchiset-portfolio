<script setup lang="ts">
import { components } from '~/slices'
import { useHead, useSeoMeta } from '@unhead/vue'
import { usePrismic } from '@prismicio/vue'
import { useRoute } from 'vue-router'

import { computed, ref, onMounted } from 'vue'

const prismic = usePrismic()
const route = useRoute()
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('project', route.params.uid as string)
)
const title = page.value?.data.name

const projectName = page.value?.data.name;
const projectDate = page.value?.data.date;
const projectCategories = page.value?.data.categories?.map((cat: { category: any }) => cat.category) || ['Project'];

const siteUrl = 'https://paulmarchiset.me'
const canonicalUrl = `${siteUrl}/project/${route.params.uid}`
const metaTitle = page.value?.data.meta_title || `${title} - Paul Marchiset`
const metaDescription = page.value?.data.meta_description
  || `${projectName} — ${projectCategories.join(', ')} project by Paul Marchiset.`
const metaImage = page.value?.data.meta_image?.url || page.value?.data.image_main?.url

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogUrl: canonicalUrl,
  ogType: 'article',
  ogImage: metaImage,
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: metaImage,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: projectName,
        url: canonicalUrl,
        dateCreated: projectDate,
        genre: projectCategories,
        image: metaImage,
        author: {
          '@type': 'Person',
          name: 'Paul Marchiset',
          url: siteUrl,
        },
      }),
    },
  ],
})

const collaborators = computed(() => {
  const items = (page.value?.data as any)?.collaborators ?? []
  return items
    .map((c: any) => ({ ...c, name: (c?.name ?? '').toString().trim() }))
    .filter((c: any) => c.name.length > 0)
})

const hasCollaborators = computed(() => collaborators.value.length > 0)


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
      <PrismicImage v-if="page?.data.image_main" :field="page?.data.image_main" class="w-full h-full object-cover object-center" />
    </header>
    <div class="flex flex-col gap-32 py-32">
      <SliceZone :slices="page?.data.slices ?? []" :components="components" class="flex flex-col gap-32 " />
      <div class="flex flex-col px-8 lg:px-16">
        <div class="flex flex-col md:flex-row gap-6 md:gap-auto  justify-between items-start md:items-center">
          <div class="flex flex-col">
            <h3 class="text-5xl lg:text-8xl font-medium">{{ projectName }}</h3>
            <div v-if="hasCollaborators" class="flex md:hidden gap-3">
              <h5 class="text-lg font-sans font-light">With
                <span v-for="(oneCollaborator, index) in collaborators" :key="`${oneCollaborator.name}-${index}`">
                  {{ oneCollaborator.name }}
                  <template v-if="Number(index) < collaborators.length - 2">, </template>
                  <template v-else-if="Number(index) === collaborators.length - 2"> and </template>
                </span>
              </h5>
            </div>
          </div>
          <PrismicLink v-if="page?.data.view_more" :field="page?.data.view_more"
            class="text-xl leading-none font-light rounded-full border text-black px-5 py-3 h-fit flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300" />
        </div>
          <div v-if="hasCollaborators" class="hidden md:flex gap-3">
            <h5 class="text-base font-sans font-light">With
              <span v-for="(oneCollaborator, index) in collaborators" :key="`${oneCollaborator.name}-${index}`">
                {{ oneCollaborator.name }}
                <template v-if="Number(index) < collaborators.length - 2">, </template>
                <template v-else-if="Number(index) === collaborators.length - 2"> and </template>
              </span>
            </h5>
          </div>
        </div>
    </div>
  </section>
</template>
