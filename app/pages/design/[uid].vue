<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const route = useRoute()
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('design', route.params.uid as string)
)

const title = page.value?.data.meta_title

useHead({
  title: title
})

console.log(page)


</script>


<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components" class="bg-(--main-white) project-container"
  />
</template>
