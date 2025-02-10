<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: page } = await useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home')
)

useHead({
  title: prismic.asText(page.value?.data.title)
})
</script>


<template>
  <!-- <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  /> -->
  <p class="text-3xl">test</p>
  <!-- <NuxtLink to="contact">About page</NuxtLink> -->
</template>