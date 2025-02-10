<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic()
const { data: page } = await useAsyncData('designs', () =>
  prismic.client.getAllByType('design')
)

const designs = ref(page.value)


useHead({
  title: 'Designs',
})

console.log(designs)


</script>

<template>
  <section class="flex flex-col">
    <article v-for="design in designs" :key="design.uid" class="container font-mono font-regular text-xl uppercase text-white">

      <p class="z-10 h-fit self-end justify-self-start row-start-5 col-start-1 col-span-2">{{ design.data.meta_title }}</p>
      <p class="z-10 h-fit self-end justify-self-start row-start-5 col-start-4 col-span-2">{{ design.data.category }}</p>
      <p class="z-10 h-fit self-end justify-self-start row-start-5 col-start-7">{{ design.data.year }}</p>

      <NuxtLink :to="`design/${design.uid}`"
        class="z-10 h-fit self-end row-start-5 col-start-8 col-span-2 text-right hover-underline-animation justify-self-end">
        discover
      </NuxtLink>

      <NuxtLink :to="`design/${design.uid}`" class="row-start-3 row-span-5 col-start-3 col-span-4 bg-amber-200 object-cover">
        <PrismicImage :field="design.data.image_presentation" class="h-full w-full object-cover"/>
      </NuxtLink>
    </article>
  </section>
</template>