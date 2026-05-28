<script setup lang="ts">
import { components } from '~/slices'
import { useHead, useSeoMeta } from '@unhead/vue'
import { usePrismic } from '@prismicio/vue'

const prismic = usePrismic();
const { data: page } = await useAsyncData("[homepage]", () =>
  prismic.client.getSingle("homepage"),
);

const siteUrl = 'https://paulmarchiset.me'
const metaTitle = page.value?.data.meta_title || 'Paul Marchiset'
const metaDescription = page.value?.data.meta_description || 'Portfolio of Paul Marchiset, graphic designer and videographer.'
const metaImage = page.value?.data.meta_image?.url

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogUrl: siteUrl,
  ogType: 'website',
  ogImage: metaImage,
  twitterTitle: metaTitle,
  twitterDescription: metaDescription,
  twitterImage: metaImage,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Paul Marchiset',
        url: siteUrl,
        jobTitle: 'Graphic Designer & Videographer',
        sameAs: [],
      }),
    },
  ],
})

// onMounted(() => {

//   const windowWidth = window.innerWidth;
//   if (windowWidth < 1024) {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: 'scroll',
//         start: '50% 50%',
//         end: 'bottom bottom',
//         scrub: 1,
//       }
//     });
//     tl.to('scriptiner', {
//       duration: 1
//     })
//   }
// });

definePageMeta({
  theme: 'dark'
})
</script>


<template>
  <!-- <Intro /> -->
  <section class="size-full overflow-hidden bg-(--main-black)">
    <div class="z-0 flex flex-col bg-cover bg-center">
      <SliceZone :components="components" :slices="page?.data.slices ?? []" />
    </div>
  </section>
</template>