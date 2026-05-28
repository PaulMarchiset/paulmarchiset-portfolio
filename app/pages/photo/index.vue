<script setup lang="ts">
import { components } from '~/slices'
import { useHead, useSeoMeta } from '@unhead/vue'
import { usePrismic } from '@prismicio/vue'
import { computed } from 'vue'

const prismic = usePrismic()
const { data: page } = await useAsyncData('photo', () =>
  prismic.client.getSingle('photo')
)

const siteUrl = 'https://paulmarchiset.me'
const canonicalUrl = `${siteUrl}/photos`

const metaTitle = computed(
  () => page.value?.data.meta_title || 'Photos - Paul Marchiset'
)
const metaDescription = computed(
  () => page.value?.data.meta_description || 'Photographs by Paul Marchiset.'
)
const metaImage = computed(() => page.value?.data.meta_image?.url || undefined)

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogUrl: canonicalUrl,
  ogType: 'website',
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
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: metaTitle.value,
          description: metaDescription.value,
          url: canonicalUrl,
          isPartOf: { '@type': 'WebSite', name: 'Paul Marchiset', url: siteUrl },
        })
      ),
    },
  ],
})
</script>

<template>
  <section class="flex flex-col bg-(--main-white) gap-16 z-10">
   <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </section>
</template>
