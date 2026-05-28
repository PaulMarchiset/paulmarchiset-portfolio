<script setup lang="ts">
import { components } from '~/slices'
import { useHead, useSeoMeta } from '@unhead/vue'
import { usePrismic } from '@prismicio/vue'
import { ref, onMounted } from 'vue'

const siteUrl = 'https://paulmarchiset.me'
const canonicalUrl = `${siteUrl}/photos`
const metaTitle = 'Photos - Paul Marchiset'
const metaDescription = 'Photographs by Paul Marchiset.'

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogUrl: canonicalUrl,
  ogType: 'website',
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: metaTitle,
        description: metaDescription,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', name: 'Paul Marchiset', url: siteUrl },
      }),
    },
  ],
})

const prismic = usePrismic()
const page = ref()

onMounted(async () => {
  const response = await prismic.client.getSingle('photo')
  page.value = response
})

</script>

<template>
  <section class="flex flex-col bg-(--main-white) gap-16 z-10">
   <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </section>
</template>
