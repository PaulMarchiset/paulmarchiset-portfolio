<script setup lang="ts">
import { components } from '~/slices'
import { useHead } from '@unhead/vue'
import { usePrismic } from '@prismicio/vue'
import { ref, onMounted } from 'vue'

useHead({
  title: 'Photos - Paul Marchiset',
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
