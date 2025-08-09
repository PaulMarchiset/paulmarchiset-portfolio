<script setup lang="ts">
import { components } from '~/slices'

useHead({
  title: 'Photos - Paul Marchiset',
})

const prismic = usePrismic()
const { data: page } = await useAsyncData('[photo]', () =>
  prismic.client.getSingle('photo')
)


</script>

<template>
  <section class="flex flex-col bg-(--main-white) gap-16 z-10">
   <SliceZone :slices="page?.data.slices ?? []" :components="components" />
  </section>
</template>
