<script setup lang="ts">
import { components } from '~/slices'

const prismic = usePrismic();
const { data: page } = await useAsyncData("[about]", () =>
  prismic.client.getSingle("about"),
);

useHead({
  title: 'About',
})

const about = ref(page.value)

const age = about?.data.born

</script>


<template>
  <main class="project-container">
    <section>
      <div class="z-10 capitalize absolute top-[25vh] text-white font-title pl-[10vw]">
        <h1 class="text-7xl w-min">Paul Marchiset</h1>
        <h2 class="text-3xl font-light">{{ about?.data.activity }}</h2>
      </div>
      <PrismicImage v-if="about?.data.image_presentation" :field="about.data.image_presentation" class="hero-image absolute left-0 top-0 w-full h-full object-cover p-5" />
    </section>
    <section class="grid grid-cols-8 px">
      <h2>Hi </h2>
    </section>
  </main>
</template>